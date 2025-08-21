<template>
  <div class="nav-container">
    <!-- 页面标题 -->
    <h1 class="page-title">常用导航合集</h1>

    <!-- 遍历所有分类 -->
    <div v-for="(category, index) in NavData" :key="index" class="category-section">
      <!-- 分类标题 -->
      <h2 class="category-title">
        <span class="category-icon">📌</span>
        {{ category.title }}
      </h2>

      <!-- 网站卡片网格 -->
      <div class="site-grid">
        <!-- 遍历分类下的网站 -->
        <a
          v-for="(site, siteIdx) in category.items"
          :key="siteIdx"
          :href="site.link"
          target="_blank"
          class="site-card"
          :title="site.desc || '点击访问'"
        >
          <div class="card-content">
            <!-- 网站图标（支持普通图片和SVG） -->
            <div class="site-icon-wrap">
              <!-- 图片加载成功时显示 -->
              <img
                v-if="typeof site.icon === 'string'"
                :src="site.icon"
                alt="site-icon"
                class="site-icon"
                @error="handleIconError"
              />
              <!-- 图片加载失败时显示 -->
              <span
                v-if="typeof site.icon === 'string'"
                class="no-icon"
              >
                暂无icon
              </span>
            </div>

            <!-- 网站信息 -->
            <div class="site-info">
              <h3 class="site-name">{{ site.title }}</h3>
              <p v-if="site.desc" class="site-desc">{{ site.desc }}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { NavData } from './navigation_data.js'; // 导入导航数据

// 处理图片加载失败事件
const handleIconError = (e) => {
  const img = e.target;
  const noIconSpan = img.nextElementSibling; // 获取相邻的span元素
  // 隐藏图片，显示替代文字
  img.style.display = 'none';
  noIconSpan.style.display = 'flex';
};
</script>

<style scoped>
.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.page-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  text-align: center;
  margin-bottom: 2.5rem;
  position: relative;
}

.page-title::after {
  content: '';
  display: block;
  width: 80px;
  height: 3px;
  background: var(--vp-c-primary);
  margin: 12px auto 0;
}

.category-section {
  margin-bottom: 3rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.category-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.category-icon {
  color: var(--vp-c-primary);
  font-size: 1.2em;
}

/* 新增：替代文字样式 */
.no-icon {
  display: none; /* 默认隐藏 */
  width: 36px;
  height: 36px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider-light);
  background: var(--vp-c-bg-soft);
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2px;
}


.site-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
}

.site-card {
  display: block;
  text-decoration: none;
  background: var(--vp-c-bg-soft-up);
  border-radius: 10px;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider-light);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.site-card:hover {
  transform: translateY(-4px);
  border-color: var(--vp-c-primary-light);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.card-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.site-icon-wrap {
  min-width: 36px;
  height: 36px;
}

.site-icon {
  width: 36px;
  height: 36px;
  object-fit: contain;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.site-svg-icon {
  width: 36px;
  height: 36px;
  fill: var(--vp-c-text-1);
}

.site-info {
  flex: 1;
}

.site-name {
  font-size: 1.125rem;
  color: var(--vp-c-text-1);
  margin: 0 0 0.25rem;
  font-weight: 500;
}

.site-desc {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.4;
}
</style>