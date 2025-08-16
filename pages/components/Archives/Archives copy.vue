<template>
  <div class="archives-container">
    <!-- 时间线容器 -->
    <div class="timeline">
      <!-- 按年份分组遍历 -->
      <div v-for="(yearGroup, year) in groupedArticles" :key="year" class="timeline-year">
        <!-- 年份标题 -->
        <h2 class="year-title">{{ year }}</h2>
        <!-- 月份时间线项 -->
        <div v-for="(monthGroup, month) in yearGroup" :key="month" class="timeline-item">
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <!-- 月份标题 -->
            <h3 class="month-title">{{ month }}月</h3>
            <!-- 文章列表 -->
            <div class="article-list">
              <div v-for="article in monthGroup" :key="article.url" class="article-item">
                <a :href="article.url" class="article-link">
                  {{ article.title }}
                  <span class="article-date">{{ formatDate(article.date) }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { data as rawData } from '/utils/statistics.data.js';

// 获取已排序的文章数据（statistics.data.js已按日期降序排序）
const blogData = ref(rawData);
const articles = computed(() => blogData.value?.articles || []);

// 按「年-月」分组文章
const groupedArticles = computed(() => {
  const groups = {};
  articles.value.forEach(article => {
    const date = new Date(article.date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月份从0开始，+1转为1-12
    // 初始化年份分组
    if (!groups[year]) groups[year] = {};
    // 初始化月份分组
    if (!groups[year][month]) groups[year][month] = [];
    // 添加文章到对应分组
    groups[year][month].push(article);
  });
  return groups;
});

// 格式化日期（仅保留月-日）
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};
</script>

<style scoped>
.archives-container {
  display: flex;
  flex-direction: column;
  max-width: 70%;
  padding: 20px;
  margin: auto;
}

.timeline {
  position: relative;
  padding: 20px 0;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  left: 24px;
  width: 2px;
  height: 100%;
  background: #e5e7eb;
}

.timeline-year {
  margin-bottom: 40px;
}

.year-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-left: 20px;
  margin-bottom: 20px;
}

.timeline-item {
  position: relative;
  margin-bottom: 24px;
  padding-left: 60px;
}

.timeline-marker {
  position: absolute;
  top: 8px;
  left: 16px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #3eaf7c;
  border: 2px solid #fff;
}

.timeline-content {
  background: #fff;
  padding: 16px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.month-title {
  font-size: 18px;
  color: #333;
  margin-bottom: 12px;
}

.article-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.article-item {
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.article-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
  text-decoration: none;
  transition: color 0.3s;
}

.article-link:hover {
  color: #3eaf7c;
}

.article-date {
  font-size: 12px;
  color: #888;
}
</style>