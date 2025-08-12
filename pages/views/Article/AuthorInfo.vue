<template>
    <!-- 作者信息卡片 -->
    <div class="custom-card">
      <!-- 卡片头部 -->
      <div class="card-header">
        <h3 class="card-title">博客信息</h3>
      </div>
      <!-- 卡片内容 -->
      <div class="card-content">
        <!-- 头像 -->
        <img 
          :src="author.avatar" 
          alt="Author Avatar" 
          class="author-avatar"
        >
        <!-- 博客信息 -->
        <div>
          <h3 style="font-size: 18px;font-weight: 600;margin-bottom: 10px;">{{ author.name }}</h3>
          <p  style="font-size: 14px;margin-bottom: 10px;">{{ author.bio }}</p>
          <!-- 博客统计数据 -->
          <!-- flex容器，子元素居中 -->
          <div style="display: flex;justify-content: center;gap: 20px;font-size: 14px;">
            <!-- flex容器，子元素垂直居中 -->
            <div style="display: flex;flex-direction: column;">
              <span>{{ author.articleCount }}</span>
              <span>文章</span>
            </div>
            <div style="display: flex;flex-direction: column;">
              <span>{{ author.tagCount }}</span>
              <span>标签</span>
            </div>
            <div style="display: flex;flex-direction: column;">
              <span>{{ author.viewCount }}</span>
              <span>访问</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 文章分类卡片 -->
    <div class="custom-card">
      <div class="card-header">
        <h3 class="card-title">文章分类</h3>
      </div>
      <div class="card-content">
          <div v-for="category in categories" :key="category.id" class="category-item">
            <a :href="'/category/' + category.slug" class="category-link">
              {{ category.name }}
              <span class="category-count">({{ category.count }})</span>
            </a>
          </div>
      </div>
    </div>

    <!-- 标签云卡片 -->
    <div class="custom-card tag-card">
      <div class="card-header">
        <h3 class="card-title">文章标签</h3>
      </div>
      <div class="card-content">
        <div class="tag-cloud">
          <span 
            v-for="tag in tags" 
            :key="tag.id" 
            class="tag-item" 
            :style="{ fontSize: tag.size + 'px', backgroundColor: tag.color }"
          >
            <a :href="'/tag/' + tag.slug" class="tag-link">{{ tag.name }}</a>
          </span>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// 模拟作者数据
const author = ref({
  name: 'suichentree',
  avatar: '/public/logo.png',
  bio: '前端开发工程师，热爱分享技术心得和学习经验',
  articleCount: 42,
  tagCount: 28,
  viewCount: 15680
});

// 模拟分类数据
const categories = ref([
  { id: 1, name: '前端开发', slug: 'frontend', count: 18 },
  { id: 2, name: 'Vue', slug: 'vue', count: 12 },
  { id: 3, name: 'JavaScript', slug: 'javascript', count: 8 },
  { id: 4, name: 'CSS', slug: 'css', count: 4 }
]);

// 模拟标签数据
const tags = ref([
  { id: 101, name: 'Vue3', slug: 'vue3', size: 16, color: '#42b983' },
  { id: 102, name: 'TypeScript', slug: 'typescript', size: 14, color: '#007acc' },
  { id: 103, name: 'CSS3', slug: 'css3', size: 15, color: '#2965f1' },
  { id: 104, name: 'Webpack', slug: 'webpack', size: 13, color: '#8dd6f9' },
  { id: 105, name: 'Vite', slug: 'vite', size: 14, color: '#646cff' },
  { id: 106, name: 'React', slug: 'react', size: 12, color: '#61dafb' },
  { id: 107, name: '性能优化', slug: 'performance', size: 13, color: '#f0db4f' },
  { id: 108, name: '组件设计', slug: 'component', size: 15, color: '#b87333' }
]);
</script>

<style scoped>

/* 基础卡片样式  */
.custom-card {
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  margin-bottom: 20px;
}
.custom-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* 卡片头部样式 */
.card-header {
  padding: 15px 20px;
  border-bottom: 1px solid #f0f0f0;
}
/* 卡片头部标题样式 */
.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

/* 卡片内容样式 */
.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 10px 20px;
}

/* 作者头像样式 */
.author-avatar {
  width: 50%;
  height: auto;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #f5f5f5;
}

/* 文章分类列表项区域的样式 */
.category-item {
  width: 90%;
  padding: 8px 0px;
  border-bottom: 1px dashed #ccc;
}

/* 列表项链接文本样式 */
.category-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
}
.category-link:hover {
  color: #42b983;
}

/* 列表项分类数量样式 */
.category-count {
  background-color: #f5f5f5;
  color: #999;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
}

/* 文章标签卡片样式 */
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
/* 文章标签项样式 */
.tag-item {
  padding: 4px 10px;
  border-radius: 20px;
  transition: all 0.3s;
}
.tag-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.tag-link {
  color: white;
  text-decoration: none;
  font-size: 13px;
}
</style>