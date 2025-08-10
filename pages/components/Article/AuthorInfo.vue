<template>
    <!-- 作者信息卡片 -->
    <div class="custom-card author-card">
      <div class="card-content">
        <img 
          :src="author.avatar" 
          alt="Author Avatar" 
          class="author-avatar"
        >
        <div class="author-profile">
          <h3 class="author-name">{{ author.name }}</h3>
          <p class="author-bio">{{ author.bio }}</p>
          <div class="author-stats">
            <div class="stat-item">
              <span class="stat-value">{{ author.articleCount }}</span>
              <span class="stat-label">文章</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ author.tagCount }}</span>
              <span class="stat-label">标签</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ author.viewCount }}</span>
              <span class="stat-label">访问</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 文章分类卡片 -->
    <div class="custom-card category-card">
      <div class="card-header">
        <h3 class="card-title">文章分类</h3>
      </div>
      <div class="card-content">
        <ul class="category-list">
          <li v-for="category in categories" :key="category.id" class="category-item">
            <a :href="'/category/' + category.slug" class="category-link">
              {{ category.name }}
              <span class="category-count">({{ category.count }})</span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- 标签云卡片 -->
    <div class="custom-card tag-card">
      <div class="card-header">
        <h3 class="card-title">标签云</h3>
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

/* 基础卡片样式 - 完全自定义，不依赖element-plus */
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

/* 作者卡片样式 */
.author-card .card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 30px 20px;
}

.card-header {
  padding: 15px 20px;
  border-bottom: 1px solid #f0f0f0;
}
.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}
.card-content {
  padding: 20px;
}

.author-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #f5f5f5;
  margin-bottom: 15px;
  transition: transform 0.3s ease;
}

.author-avatar:hover {
  transform: scale(1.05);
}

.author-name {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 10px;
}

.author-bio {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 20px;
  padding: 0 10px;
}

.author-stats {
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.stat-label {
  font-size: 12px;
  color: #999;
}

/* 分类列表样式 */
.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-item {
  padding: 8px 0;
  border-bottom: 1px dashed #f0f0f0;
}

.category-item:last-child {
  border-bottom: none;
}

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

.category-count {
  background-color: #f5f5f5;
  color: #999;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
}

/* 标签云样式 */
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

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