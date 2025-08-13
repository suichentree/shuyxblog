import { createContentLoader } from 'vitepress'

//统计blogs目录中的所有md文件中的各个数据
export default createContentLoader("blogs/**/*.md", {
    transform(raw){
        //定义blogData对象
        const blogData = {
            articles: [],           //所有的文章数据
            tags: [],               //所有的标签数据
            categories: [],         //所有的分类数据
            everyCategoryCount: {}, //每个分类的文章数量
        };
        //遍历raw数组
        //url为md文件对应的页面映射路径
        //frontmatter为md文件的frontmatter数据
        //excerpt为md文件的摘要数据
        raw.forEach(({ url, frontmatter, excerpt }) => {
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
            blogData.articles.push({
                title: frontmatter.title,
                url,
                excerpt,
                date: frontmatter.date,
                frontmatter,
            });
        });
        //去重blogData.tags数据
        blogData.tags = removeDuplicates(blogData.tags);
        //去重blogData.categories数据
        blogData.categories = removeDuplicates(blogData.categories);
        //对blogData.articles数据按照日期进行降序排序
        blogData.articles.sort((a, b) => b.date - a.date);
        //打印blogData对象
        console.log(blogData);
        //返回blogData对象
        return blogData;
    },
});


//去除重复数据
function removeDuplicates(arr) {
    return [...new Set(arr)];
}



