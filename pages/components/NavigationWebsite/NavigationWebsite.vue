<template>
  <div class="nav-container">
    <h1 class="page-title">常用导航合集</h1>
    <div class="main-wrapper">
      <!-- 左侧目录侧边栏 -->
      <div class="sidebar">
        <div class="sidebar-sticky">
          <div class="sidebar-title">导航目录</div>
          <nav class="toc">
            <a
              v-for="(category, index) in NavData"
              :key="index"
              :href="'#category-' + index"
              class="toc-item"
              :class="{ active: activeIndex === index }"
              @click="activeIndex = index"
            >
              {{ category.title }}
            </a>
          </nav>
        </div>
      </div>
      <!-- 右侧主内容 -->
      <div class="main-content">
        <div
          v-for="(category, index) in NavData"
          :key="index"
          class="category-section"
          :id="'category-' + index"
        >
          <div class="category-title">
            <span>📌</span>
            <span>{{ category.title }}</span>
          </div>
          <div class="site-grid">
            <a
              v-for="(site, siteIdx) in category.items"
              :key="siteIdx"
              :href="site.link"
              target="_blank"
              class="site-card"
              :title="site.desc || '点击访问'"
            >
              <div class="card-content">
                <div class="site-icon-wrap">
                  <img
                    v-if="typeof site.icon === 'string'"
                    :src="site.icon"
                    alt="site-icon"
                    class="site-icon"
                    @error="handleIconError"
                  />
                  <span v-if="typeof site.icon === 'string'" class="no-icon">🚫</span>
                </div>
                <div class="site-info">
                  <span class="site-name">{{ site.title }}</span>
                  <p v-if="site.desc" class="site-desc">{{ site.desc }}</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { NavData } from './navigation_data.js';
import { ref, onMounted, onUnmounted } from 'vue';

// 当前激活的目录索引（响应式变量）
const activeIndex = ref(0);

// 处理图标加载失败
const handleIconError = (e) => {
  const img = e.target;
  const noIconSpan = img.nextElementSibling;
  img.style.display = 'none';
  noIconSpan.style.display = 'flex';
};

</script>

<style scoped>
/* 全局容器 */
.nav-container {
  max-width: 1152px;
  margin: 0 auto;
  padding: 20px;
}

/* 页面标题 */
.page-title {
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  margin: 20px;
}

/* 左右分栏布局 */
.main-wrapper {
  display: flex;
  gap: 20px;
}

/* 左侧侧边栏 */
.sidebar {
  flex: 6;
}
.sidebar-sticky {
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  position: sticky;  /* 目录粘性定位 */
  top: 10%;        /* 距离顶部固定 */
  padding: 10px;
  overflow-y: auto;  /* 内容过长时滚动 */
}
.sidebar-title {
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: 600;
}

/* 目录项样式 */
.toc {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.toc-item {
  padding: 5px;
}
.toc-item.active {
  background: var(--vp-c-brand-1);
  color: white;
  font-weight: 500;
}

/* 右部分容器 */
.main-content{
  flex: 18;
}
/* 右侧分类内容 */
.category-section {
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;
}
.category-title {
  font-weight: 600;
  margin-bottom: 10px;
}

/* 网站卡片网格 */
.site-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 10px;
}
.site-card {
  display: block;
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
  padding: 10px;
  text-decoration: none;
  transition: all 0.3s ease;
}
.site-card:hover {
  transform: translateY(-4px);
}


/* 卡片内容 */
.card-content {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
.site-icon-wrap {
  flex-shrink: 0;
}
/* 网址icon */
.site-icon {
  width: 36px;
  height: 36px;
  object-fit: contain;
}
/* 网址icon(暂无icon的情况) */
.no-icon {
  display: none; /* 默认隐藏 */
  width: 36px;
  height: 36px;
  background: var(--vp-c-bg-soft);
  font-size: 15px;
  align-items: center;
  justify-content: center;
  text-align: center;
}
/* 网址信息部分的样式 */
.site-info {
  flex: 1;
}
.site-name {
  font-size: 20px;
  font-weight: 500;
}
.site-desc {
  font-size: 15px;
  margin-top: 10px;
}




/* 移动端适配 */
@media (max-width: 768px) {
  .nav-container {
    padding: 10px;
  }

  .page-title {
    font-size: 25px;
    margin: 10px 0;
  }

  .main-wrapper {
    flex-direction: column;
    gap: 20px;
  }

  .sidebar {
    flex: none;
    width: 100%;
    margin-bottom: 20px;
  }

  .sidebar-sticky {
    position: static;
    top: auto;
    max-height: none;
  }

  .toc {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: start;
    gap: 10px;
    margin-top: 10px;
  }

  .toc-item {
    padding: 5px;
    border: 2px solid var(--vp-c-default-soft);
    border-radius: 5px;
    white-space: nowrap;
  }

  .site-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 10px;
  }

  .site-name {
    font-size: 15px;
  }

  .site-desc {
    font-size: 12px;
  }

  .card-content {
    gap: 10px;
  }

  .site-icon-wrap {
    flex-shrink: 0;
  }

  .site-icon {
    width: 36px;
    height: 36px;
  }
}
</style>