import { createContentLoader } from 'vitepress'

//统计blogs目录中的所有md文件中的各个数据
export default createContentLoader("blogs/**/*.md", {
    transform(raw){
        //定义blogData对象
        const blogData = {
            articles: [],           //所有的文章数据
            tags: [],               //所有的标签数据,
            categories: [],         //所有的分类数据
            everyCategoryCount: {}, //分类的文章数量,存放每个分类和分类对应的文章数量
            everyTagCount: {},      //存放每个标签和标签对应的文章数量
        };
        //遍历raw数组
        raw.forEach(({ url, frontmatter, excerpt }) => {
            // 标签
            if (frontmatter.tags) {
                blogData.tags.push(...frontmatter.tags);
                frontmatter.tags.forEach((tag) => {
                    if (blogData.everyTagCount[tag]) {
                        blogData.everyTagCount[tag]++;
                    } else {
                        blogData.everyTagCount[tag] = 1;
                    }
                });
            }
            // 分类
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
            //文章
            blogData.articles.push({
                title: frontmatter.title,
                tags: frontmatter.tags,
                categories: frontmatter.categories,
                url,
                excerpt,
                date: frontmatter.date,
                metadata:frontmatter,
            });
        });
        //去重blogData.tags数据
        blogData.tags = removeDuplicates(blogData.tags);
        //去重blogData.categories数据
        blogData.categories = removeDuplicates(blogData.categories);
        //对blogData.articles数据按照日期进行降序排序
        blogData.articles.sort((a, b) => b.date - a.date);
        //返回blogData对象
        return blogData;
    },
});


//去除重复数据
function removeDuplicates(arr) {
    return [...new Set(arr)];
}



