import { createContentLoader } from 'vitepress'

//统计blogs目录中的所有md文件中的各个数据
export default createContentLoader("blogs/**/*.md", {
    transform(raw){
        //定义blogData对象
        const blogData = {
            articles: [],           //所有的文章数据
            tags: [],               //所有的标签数据,及其标签对应的文章数量
            categories: [],         //所有的分类数据,及其分类对应的文章数量
            tagsSumCount:0,         //所有的标签数据的总数
            categoriesSumCount:0,   //所有的分类数据的总数
            articlesSumCount:0,     //所有的文章数据的总数
        };
        //遍历raw数组
        raw.forEach(({ url, frontmatter }) => {
            //若md文件存在frontmatter
            if(frontmatter){
                // 标签
                if (frontmatter.tags) {
                    frontmatter.tags.forEach((tag) => {
                        let existingTag = blogData.tags.find(t => t.name === tag);
                        if (existingTag) {
                            existingTag.count++;
                        } else {
                            blogData.tags.push({
                                name: tag,
                                count: 1
                            });
                        }
                    });
                }
                // 分类
                if (frontmatter.categories) {
                    frontmatter.categories.forEach((category) => {
                        let existingCategory = blogData.categories.find(c => c.name === category);
                        if (existingCategory) {
                            existingCategory.count++;
                        } else {
                            blogData.categories.push({
                                name: category,
                                count: 1
                            });
                        }
                    });
                }
                //组装文章数据
                blogData.articles.push({
                    title: frontmatter.title,           //文章标题
                    tags: frontmatter.tags,           //文章标签
                    categories: frontmatter.categories,   //文章分类
                    url,                                   //文章url
                    date: frontmatter.date,             //文章创建日期
                    lastUpdated: frontmatter.lastUpdated, //文章最后更新日期
                    metadata:frontmatter,               //文章的元数据
                });
            }
        });
        //标签总数
        blogData.tagsSumCount = blogData.tags.length;
        //分类总数
        blogData.categoriesSumCount = blogData.categories.length;
        //文章总数
        blogData.articlesSumCount = blogData.articles.length;
        //对blogData.articles数据按照日期进行降序排序
        blogData.articles.sort((a, b) => b.date - a.date);
        //返回blogData对象
        return blogData;
    },
});






