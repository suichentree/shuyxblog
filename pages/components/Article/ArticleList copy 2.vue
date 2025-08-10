<template>
  <div class="article-list-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <div v-for="article in articles" :key="article.id" class="article-item">
          <el-card class="article-card" :body-style="{ padding: '0' }">
            <el-row class="article-row" :gutter="0">
              <!-- 左侧文本区域 -->
              <el-col :span="15" class="article-text-container" style="padding: 20px;">
                <h3 class="article-title">{{ article.title }}</h3>
                <div class="article-meta">
                  <span class="meta-item">
                    <User v-if="article.authorAvatar" class="meta-icon" />
                    <span class="meta-text">{{ article.author }}</span>
                  </span>
                  <span class="meta-item">
                    <Calendar class="meta-icon" />
                    <span class="meta-text">{{ article.date }}</span>
                  </span>
                  <span class="meta-item">
                    <Search class="meta-icon" />
                    <span class="meta-text">{{ article.views }} 阅读</span>
                  </span>
                </div>
                <p class="article-excerpt">{{ article.excerpt }}</p>
                <div class="article-tags">
                  <el-tag
                    v-for="tag in article.tags"
                    :key="tag.id"
                    class="custom-tag"
                    :type="getRandomTagType()"
                  >
                    {{ tag.name }}
                  </el-tag>
                </div>
              </el-col>
              <!-- 右侧图片区域 -->
              <el-col :span="9" class="article-image-container" style="height: 100%; padding: 0;">
                <el-image
                  :src="article.cover"
                  alt="Article cover"
                  fit="cover"
                  class="article-image"
                  style="width: 100%; height: 100%; object-fit: cover;"
                />
              </el-col>
            </el-row>
          </el-card>
        </div>
      </el-col>
    </el-row>

    <!-- 分页组件 -->
    <div class="pagination-container">
      <el-pagination background layout="prev, pager, next, jumper" :total="1000" />
    </div>
  </div>
</template>

<script setup>
import { User, Calendar, Search } from '@element-plus/icons-vue';
import { ref } from 'vue';

// 模拟文章数据
const articles = ref([
  {
    id: 1,
    title: 'Vue3组合式API完全指南',
    author: 'suichentree',
    date: '2023-10-15',
    views: 1245,
    excerpt: '本文详细介绍了Vue3组合式API的使用方法，包括setup函数、响应式数据、生命周期钩子等核心概念...',
    tags: [
      { id: 101, name: 'Vue' },
      { id: 102, name: '前端' },
      { id: 103, name: 'JavaScript' }
    ],
    cover: 'http://116.62.199.48:9000/weblog/c89cc6b66f0341c0b7854771ae063eac.jpg'
  },
  {
    id: 1,
    title: 'Vue3组合式API完全指南',
    author: 'suichentree',
    date: '2023-10-15',
    views: 1245,
    excerpt: '本文详细介绍了Vue3组合式API的使用方法，包括setup函数、响应式数据、生命周期钩子等核心概念...',
    tags: [
      { id: 101, name: 'Vue' },
      { id: 102, name: '前端' },
      { id: 103, name: 'JavaScript' }
    ],
    cover: 'http://116.62.199.48:9000/weblog/c89cc6b66f0341c0b7854771ae063eac.jpg'
  },
  {
    id: 1,
    title: 'Vue3组合式API完全指南',
    author: 'suichentree',
    date: '2023-10-15',
    views: 1245,
    excerpt: '本文详细介绍了Vue3组合式API的使用方法，包括setup函数、响应式数据、生命周期钩子等核心概念...',
    tags: [
      { id: 101, name: 'Vue' },
      { id: 102, name: '前端' },
      { id: 103, name: 'JavaScript' }
    ],
    cover: 'http://116.62.199.48:9000/weblog/c89cc6b66f0341c0b7854771ae063eac.jpg'
  },
  // 更多文章数据...
]);

// 分页相关数据
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(articles.value.length);

// 分页方法
const handleSizeChange = (val) => {
  pageSize.value = val;
};

const handleCurrentChange = (val) => {
  currentPage.value = val;
};

// 随机标签类型
const tagTypes = ['primary', 'success', 'warning', 'info', 'danger'];
const getRandomTagType = () => {
  return tagTypes[Math.floor(Math.random() * tagTypes.length)];
};
</script>

<style scoped>
.article-list-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.article-item {
  margin-bottom: 25px;
}

.article-card {
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.article-row {
  height: 240px;
}

.article-text-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.article-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #333;
  transition: color 0.3s;
  text-align: left;
}

.article-title:hover {
  color: #409eff;
}

.article-meta {
  display: flex;
  margin-bottom: 15px;
  color: #888;
  font-size: 13px;
  text-align: left;
}

.meta-item {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.meta-icon {
  margin-right: 5px;
  font-size: 14px;
}

.meta-text {
  line-height: 1;
}

.article-excerpt {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: left;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  text-align: left;
}

.custom-tag {
  transition: all 0.2s;
  border-radius: 4px;
}

.custom-tag:hover {
  transform: translateY(-2px);
}

.article-image-container {
  height: 100%;
  overflow: hidden;
}

.article-image {
  transition: transform 0.5s ease;
  border-radius: 0 8px 8px 0;
}

.article-card:hover .article-image {
  transform: scale(1.03);
}

.pagination-container {
  margin-top: 30px;
  text-align: center;
}
</style>