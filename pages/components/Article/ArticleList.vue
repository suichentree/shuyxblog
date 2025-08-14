<template>
  <div>
    <!-- 文章列表 -->
    <div class="article-items">
      <!--文章卡片-->
      <div v-for="article in articles" :key="article.id" class="custom-card">
        <div class="card-content">
          <!-- 左侧文本区域 -->
          <div class="article-text">
            <!-- 标题 -->
            <h3 class="article-title">{{ article.title }}</h3>
            <!-- 元数据 -->
            <div class="article-meta">
              <!-- 作者 -->
              <span class="meta-item">
                <span class="meta-icon">👤</span>
                <span class="meta-text">suichentree</span>
              </span>
              <!-- 日期 -->
              <span class="meta-item">
                <span class="meta-icon">📅</span>
                <span class="meta-text">{{ article.date }}</span>
              </span>
              <!-- 分类 -->
              <span class="meta-item">
                <span class="meta-icon">🗂️</span>
                <span v-for="category in article.categories" class="meta-text">{{ category }}</span>
              </span>
            </div>
            <!-- 摘要 -->
            <p class="article-excerpt">{{ article.excerpt }}</p>
            <!-- 标签 -->
            <div class="article-tags">
              <span v-for="tag in article.tags" class="tag-item">
                <span class="meta-icon">🏷️</span>{{ tag }}
              </span>
            </div>
          </div>
          <!-- 右侧图片区域 -->
          <div class="article-image">
            <img :src="article.cover" alt="Article cover" class="cover-image">
          </div>
        </div>
      </div>
    </div>
    <!-- 分页区域 -->
    <div class="pagination">
      <button class="page-btn prev-btn" :disabled="currentPage === 1">上一页</button>
      <span class="page-info">第 {{ currentPage }} 页 / 共 {{ totalPages }} 页</span>
      <button class="page-btn next-btn" :disabled="currentPage === totalPages">下一页</button>
    </div>
  </div>
</template>

<script setup>
import { ref,computed } from 'vue';
//引入统计数据
import { data as rawData } from '/utils/statistics.data.js'
const blogData = ref(rawData); // 使用ref包装原始数据
console.log(blogData.value)

//文章数据 articles 计算属性
const articles = computed(() => {
  // 确保blogData存在
  if (blogData.value) {
    // 处理文章数据
    return blogData.value.articles.map((element, index) => ({
      id: index,                      //文章id
      title: element.title,           //文章标题
      date: format_date(element.date),//日期
      // excerpt: element.excerpt,       //摘要
      excerpt: '本文详细介绍了Vue3组合式API的使用方法，包括setup函数、响应式数据、生命周期钩子等核心概念...',       //摘要
      cover: random_cover_image(),    //封面图
      categories: element.categories, //分类
      tags: element.tags              //标签
    }));
  }
});

// 模拟文章数据
const articles111111111111 = ref([
  {
    id: 1,
    title: 'Vue3组合式API完全指南',
    date: '2023-10-15',
    views: 1245,
    excerpt: '本文详细介绍了Vue3组合式API的使用方法，包括setup函数、响应式数据、生命周期钩子等核心概念...',
    tags: [
      { id: 101, name: 'Vue' },
      { id: 102, name: '前端' },
      { id: 103, name: 'JavaScript' }
    ],
    cover: '/public/cover4.png'
  }
]);






// 分页数据
const currentPage = ref(1);
const totalPages = ref(5);

//格式化日期
function format_date(date_string){
  return date_string.split('T')[0];;
}
// 随机返回一个封面图片
function random_cover_image(){
  // 文章封面cover数组，可根据实际图片添加或修改
  let cover_image_urls = [
    '/public/cover1.jpg',
    '/public/cover2.jpg',
    '/public/cover3.jpg',
    '/public/cover4.png',
    '/public/cover5.jpeg',
    '/public/cover6.jpeg',
  ];
  let randomIndex = Math.floor(Math.random() * cover_image_urls.length);
  return cover_image_urls[randomIndex];
}




</script>
<style scoped>

/* 文章列表容器 */
.article-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* 自定义卡片样式 */
.custom-card {
  border: 2px solid #f0f0f0;
  border-radius: 15px;
  transition: all 0.3s ease;
}

.custom-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* 卡片内容区域 - 使用flex实现左右布局 */
.card-content {
  display: flex;
  width: 100%;
  height: 100%; /* 确保内容容器占满卡片高度 */
}

/* 左侧文本区域 */
.article-text {
  flex: 15;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

/* 文章标题 */
.article-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  text-align: left;
}

/* 元数据区域 */
.article-meta {
  display: flex;
  gap: 15px;
  color: #888;
  font-size: 13px;
}
/* 元数据项 */
.meta-item {
  display: flex;
  align-items: center;
  gap: 5px;
}
/* 元数据图标 */
.meta-icon {
  font-size: 14px;
}

/* 文章摘要 */
.article-excerpt {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
  flex: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: left;
}

/* 标签区域 */
.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
/* 标签项 */
.tag-item {
  background-color: #f0f0f0;
  color: #666;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  transition: all 0.3s;
}

/* 右侧图片区域 */
.article-image {
  flex: 9;
  display: flex;
  flex-direction: column;
}
/* 封面图片 */
.cover-image {
  width: auto;
  height: 100%;
  object-fit: cover; /* 保持比例填充容器 */
}


/* 分页样式 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 30px;
}

.page-btn {
  padding: 8px 16px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 6px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.page-btn:hover:not(:disabled) {
  background-color: #e0e0e0;
  color: #333;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  color: #666;
  font-size: 14px;
}
</style>