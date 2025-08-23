<template>
  <div class="nav-container">
    <!-- 页面标题 -->
    <h1 class="page-title">常用导航合集</h1>
    <!-- 左右分栏容器 -->
    <div class="main-wrapper">
      <!-- 左侧目录侧边栏 -->
      <div class="sidebar">
        <div class="sidebar-sticky">
          <div class="sidebar-title">导航目录</div>
          <nav class="toc">
            <!-- 动态生成目录项（锚点链接） -->
            <a
              v-for="(category, index) in NavData"
              :key="index"
              :href="'#category-' + index"
              class="toc-item"
            >
              {{ category.title }}
            </a>
          </nav>
        </div>
      </div>
      <!-- 右侧主内容 -->
      <div class="main-content">
        <!-- 遍历所有分类 -->
        <div
          v-for="(category, index) in NavData"
          :key="index"
          class="category-section"
          :id="'category-' + index"
        >
          <!-- 分类标题 -->
          <div class="category-title">
            <span>📌</span>
            <span>{{ category.title }}</span>
          </div>
          <!-- 网站卡片网格 -->
          <div class="site-grid">
            <!-- 遍历分类下的网站-->
            <a
              v-for="(site, siteIdx) in category.items"
              :key="siteIdx"
              :href="site.link"
              target="_blank"
              class="site-card"
              :title="site.desc || '点击访问'"
            >
              <div class="card-content">
                <!-- 图标部分-->
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
                <!-- 网站信息-->
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
import { NavData } from './navigation_data.js'; // 获取导航网址数据

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
/* 容器样式 */
.nav-container {
  max-width: 1152px;
  margin: 0 auto;
  padding: 20px;
}
/* 标题样式 */
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

/* 右部分容器 */
.main-content {
  flex: 20;  /* 左侧主内容占满剩余空间 */
}

/* 分类部分 */
.category-section {
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;
}
/* 分类标题 */
.category-title {
  font-weight: 600;
  margin-bottom: 10px;
}


/* 网站卡片的样式 */
.site-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 10px;
}
.site-card {
  display: block;
  text-decoration: none;
  background: var(--vp-c-default-soft);
  border-radius: 10px;
  padding: 10px;
  transition: all 0.3s ease;
}
.site-card:hover {
  transform: translateY(-4px);
}

/* 网址卡片区域 */
.card-content {
  display: flex;
  flex-direction: row;
  gap: 10px;
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
  color: var(--vp-c-text-2);
}


/* 左边侧边栏部分的样式 */
.sidebar {
  flex: 4;
}
.sidebar-sticky {
  position: sticky;  /* 目录粘性定位 */
  top: 10%;        /* 距离顶部固定 */
  overflow-y: auto;  /* 内容过长时滚动 */
}
.sidebar-title {
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: 600;
}

/* 目录部分 */
.toc {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.toc-item {
  padding: 5px;
}


/* 移动端适配 */
@media (max-width: 768px) {
  .nav-container {
    padding: 10px;
  }

  .page-title {
    font-size: 24px;
    margin: 15px 0;
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
    justify-content: center;
    gap: 8px;
    margin-top: 10px;
  }

  .toc-item {
    padding: 5px 10px;
    border: 1px solid var(--vp-c-default-soft);
    border-radius: 4px;
    white-space: nowrap;
  }

  .site-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 8px;
  }

  .site-name {
    font-size: 16px;
  }

  .site-desc {
    font-size: 12px;
  }

  .card-content {
    gap: 8px;
  }

  .site-icon-wrap {
    min-width: 30px;
  }

  .site-icon {
    width: 30px;
    height: 30px;
  }
}
</style>