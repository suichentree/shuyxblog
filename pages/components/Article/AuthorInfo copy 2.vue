<template>
  <!--作者信息-->
  <el-space fill wrap class="author-info-container">
    <!-- 作者头像卡片 -->
    <el-card class="author-card" shadow="hover">
      <div class="author-profile">
        <img :src="avatarImg" class="author-avatar" />
        <h3 class="author-name">suichentree</h3>
        <div class="author-stats">
          <span class="stat-item">文章 251</span>
          <el-divider direction="vertical" />
          <span class="stat-item">标签 63</span>
        </div>
      </div>
    </el-card>

    <!-- 文章分类卡片 -->
    <el-card class="category-card" shadow="hover">
      <template #header>
        <el-text class="card-header">
          <el-icon class="header-icon"><ElementPlus /></el-icon>
          分类
        </el-text>
      </template>
      <ul class="category-list">
        <li v-for="i in 10" :key="i" class="category-item">
          <a
            href="https://element-plus.org"
            target="_blank"
            class="category-link"
          >
            <span class="category-name">前端</span>
            <el-tag class="category-count" type="primary" effect="dark">16</el-tag>
          </a>
        </li>
      </ul>
    </el-card>

     <!-- 文章标签卡片 -->
    <el-card class="tag-card" shadow="hover">
      <template #header>
        <el-text class="card-header">
          <el-icon class="header-icon"><ElementPlus /></el-icon>
          标签
        </el-text>
      </template>
      <el-space wrap class="tag-container">
        <el-tag 
          v-for="i in 10" 
          :key="i" 
          class="custom-tag" 
          effect="light" 
          :type="getRandomTagType()"
        > 
          111 
        </el-tag>
      </el-space>
    </el-card>
  </el-space>
</template>
<script setup>
import avatarImg from '/public/logo.png'

// 定义标签颜色类型数组
const tagTypes = ['primary', 'success', 'warning', 'danger', 'info', 'secondary', 'dark']

// 随机获取标签颜色类型的方法
const getRandomTagType = () => {
  return tagTypes[Math.floor(Math.random() * tagTypes.length)]
}

</script>
<style scoped>
.author-info-container {
  gap: 20px;
}

/* 作者卡片样式 */
.author-card {
  border-radius: 12px;
  transition: all 0.3s ease;
  overflow: hidden;
  min-width: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}

.author-profile {
  text-align: center;
  padding: 15px 20px;
  width: 100%;
}


.author-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid #f0f0f0;
  margin-bottom: 15px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.author-card:hover .author-avatar {
  transform: scale(1.05);
}

.author-name {
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: #333;
}

.author-stats {
  display: flex;
  justify-content: center;
  gap: 15px;
  color: #666;
  font-size: 0.9rem;
}

.stat-item {
  display: flex;
  align-items: center;
}

/* 分类卡片样式 */
.category-card, .tag-card {
  border-radius: 12px;
  transition: all 0.3s ease;
  min-width: 280px;
}

.card-header {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
}

.header-icon {
  margin-right: 8px;
  color: #409eff;
}

.category-list {
  list-style: none;
  padding: 5px 0;
  margin: 0;
}

.category-item {
  padding: 8px 10px;
  margin-bottom: 8px;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.category-item:hover {
  background-color: #f5f7fa;
}

.category-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  color: #333;
}

.category-name {
  transition: color 0.2s ease;
}

.category-link:hover .category-name {
  color: #409eff;
}

.category-count {
  border-radius: 12px;
}

/* 标签卡片样式 */
.tag-container {
  padding: 5px 0;
}

.custom-tag {
  border-radius: 16px;
  padding: 4px 12px;
  margin: 6px 4px;
  font-size: 0.85rem;
  transition: all 0.2s ease;
}

.custom-tag:hover {
  transform: translateY(-2px);
}
</style>
