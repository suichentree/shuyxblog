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
              <span>{{ author.articlesSumCount }}</span>
              <span>文章</span>
            </div>
            <div style="display: flex;flex-direction: column;">
              <span>{{ author.categoriesSumCount }}</span>
              <span>分类</span>
            </div>
            <div style="display: flex;flex-direction: column;">
              <span>{{ author.tagsSumCount }}</span>
              <span>标签</span>
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
          <div v-for="category in categories" class="category-item">
            <a :href="'/category/'" class="category-link">
              {{ category.name }}
              <span class="category-count" :style="{ backgroundColor: getRandomBrightColor() }">
                {{ category.count }}
              </span>
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
            class="tag-item" 
            :style="{ backgroundColor: getRandomBrightColor() }"
          >
            <a :href="'/tag/' + tag.slug" class="tag-link">{{ tag.name }}</a>
          </span>
        </div>
      </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
//引入统计数据
import { data as rawData } from '/utils/statistics.data.js'
const blogData = ref(rawData); // 使用ref包装原始数据

// 模拟作者数据
const author = ref({
  name: 'suichentree',
  avatar: '/public/logo.png',
  bio: '全栈开发工程师，热爱分享技术心得和学习经验',
  articlesSumCount: blogData.value.articlesSumCount,
  categoriesSumCount: blogData.value.categoriesSumCount,
  tagsSumCount: blogData.value.tagsSumCount,
});

//分类数据
const categories = ref([
  // { name: '前端开发', count: 18 },
]);
categories.value = blogData.value.categories;

//标签数据
const tags = ref([
  //  { name: 'Vue3',count: 10 },
]);
tags.value = blogData.value.tags;


//随机获取一个颜色
function getRandomBrightColor() {
  // 预定义8种适合白色文字的柔和颜色
  const colorArray = [
    '#3498db', // 蓝色
    '#2ecc71', // 绿色
    '#9b59b6', // 紫色
    '#e74c3c', // 红色
    '#f39c12', // 橙色
    '#1abc9c', // 青绿色
  ];
  // 随机获取数组中的颜色
  const randomIndex = Math.floor(Math.random() * colorArray.length);
  return colorArray[randomIndex];
}
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
  display: inline-block;
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  color: white;
  border-radius: 4px;
  margin-left: 4px;
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