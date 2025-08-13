import matter from "gray-matter";
import fs from "fs-extra";

/**
 * 获取 posts 目录下所有 Markdown 文件的路径
 * @returns {Promise<string[]>} - 文件路径数组
 */
const getPostMDFilePaths = async () => {
  try {
    // 获取所有blogs目录下的 md 文件路径
    let paths = await globby(["blogs/**/*.md"], {
      ignore: ["node_modules", "pages", ".vitepress", "README.md"],
    });
    // 过滤路径，只包括 'posts' 目录下的文件
    return paths.filter((item) => item.includes("posts/"));
  } catch (error) {
    console.error("获取文章路径时出错:", error);
    throw error;
  }
};

/**
 * 基于 frontMatter 日期降序排序文章
 * @param {Object} obj1 - 第一篇文章对象
 * @param {Object} obj2 - 第二篇文章对象
 * @returns {number} - 比较结果
 */
const compareDate = (obj1, obj2) => {
  return obj1.date < obj2.date ? 1 : -1;
};
const comparePostPriority = (a, b) => {
  if (a.top && !b.top) {
    return -1;
  }
  if (!a.top && b.top) {
    return 1;
  }
  return compareDate(a, b);
};

/**
 * 获取所有文章，读取其内容并解析 front matter
 */
export const getAllPosts = async () => {
  try {
    // 获取所有 Markdown 文件的路径
    let paths = await getPostMDFilePaths();
    // 读取和处理每个 Markdown 文件的内容
    let posts = await Promise.all(
      paths.map(async (item) => {
        try {
          // 读取文件内容
          const content = await fs.readFile(item, "utf-8");
          // 文件的元数据
          const stat = await fs.stat(item);
          // 获取文件创建时间和最后修改时间
          const { birthtimeMs, mtimeMs } = stat;
          // 解析 front matter
          const { data } = matter(content);
          const { title, date, categories, description, tags, top, cover } = data;
          // 计算文章的过期天数
          const expired = Math.floor(
            (new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24),
          );
          // 返回文章对象
          return {
            id: generateId(item),
            title: title || "未命名文章",
            date: date ? new Date(date).getTime() : birthtimeMs,
            lastModified: mtimeMs,
            expired,
            tags,
            categories,
            description,
            regularPath: `/${item.replace(".md", ".html")}`,
            top,
            cover,
          };
        } catch (error) {
          console.error(`处理文章文件 '${item}' 时出错:`, error);
          throw error;
        }
      }),
    );
    // 根据日期排序文章
    posts.sort(comparePostPriority);
    return posts;
  } catch (error) {
    console.error("获取所有文章时出错:", error);
    throw error;
  }
};


console.log(getAllPosts());
