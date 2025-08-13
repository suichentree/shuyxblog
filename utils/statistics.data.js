// 统计各种数据

//统计blogs目录中的所有md文件中的各个数据
export default createContentLoader("blogs/**/*.md", {
    transform(raw){
        //定义blogData对象
        const blogData = {
            posts: [],
            tags: [],
            categories: [],
            everyCategoryCount: {},
        };
        //遍历raw数组
        raw.forEach(({ url, frontmatter, excerpt }) => {
            if (frontmatter.publish == undefined || frontmatter.publish) {
                if (frontmatter.tags) blogData.tags.push(...frontmatter.tags);
                if (frontmatter.categories) {
                blogData.categories.push(...frontmatter.categories);
                frontmatter.categories.forEach((category) => {
                    if (blogData.everyCategoryCount[category]) {
                    blogData.everyCategoryCount[category]++;
                    } else {
                    blogData.everyCategoryCount[category] = 1;
                    }
                });
                }
                blogData.posts.push({
                    title: frontmatter.title,
                    url,
                    excerpt,
                    date: frontmatter.date,
                    frontmatter,
                });
            }
        });
        //去重blogData.tags数据
        blogData.tags = removeDuplicates(blogData.tags);
        //去重blogData.categories数据
        blogData.categories = removeDuplicates(blogData.categories);
        //对blogData.posts数据按照日期进行降序排序
        blogData.posts.sort((a, b) => b.date.time - a.date.time);
        return blogData;
    },
});


//去除重复数据
function removeDuplicates(arr) {
    return [...new Set(arr)];
}


console.log(blogData);
