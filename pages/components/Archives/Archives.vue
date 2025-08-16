<template>
  <div class="archives-container">
    <div class="header-section">
      <h1 class="archives-title">📚 文章归档</h1>
      <p class="archives-desc">按时间线整理所有历史文章，快速定位目标内容</p>
    </div>

    <div class="timeline">
      <!-- 年份分组（倒序） -->
      <div 
        v-for="year in sortedYears" 
        :key="year" 
        class="timeline-year"
      >
        <!-- 年份标题（可折叠） -->
        <button 
          class="year-toggle" 
          @click="toggleYearExpand(year)"
          :aria-expanded="isYearExpanded(year)"
        >
          <span class="year-marker"></span>
          <span class="year-text">
            {{ year }}年 <span class="year-count">（{{ yearTotal[year] }}篇）</span>
          </span>
          <span class="toggle-icon">{{ isYearExpanded(year) ? '−' : '+' }}</span>
        </button>

        <!-- 月份内容（折叠动画） -->
        <Transition name="slide">
          <div v-show="isYearExpanded(year)" class="year-content">
            <!-- 月份分组（倒序） -->
            <div 
              v-for="(month, index) in sortedMonths(year).value" 
              :key="index" 
              class="month-section"
            >
              <h3 class="month-title">
                <span class="month-dot"></span> {{ month }}月
              </h3>
              
              <!-- 文章列表 -->
              <div class="article-list">
                <div v-if="groupedArticles[year]" 
                  v-for="(month, index) in sortedMonths(year).value" 
                  :key="index" 
                  class="month-section">
                  <a :href="'article.url'" class="article-link">
                    <span class="article-title">{{ 'article.title' }}</span>

                    <time class="article-date">{{ formatDate('article.date') }}</time>

                  </a>
                </div>
                <div v-else class="no-articles">该年份暂无文章</div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { data as rawData } from '/utils/statistics.data.js';

// 基础数据处理
const blogData = ref(rawData);
const articles = computed(() => blogData.value.articles);

console.log(articles.value);



// 安全文章数据（确保url存在）
const safeArticles = computed(() => {
  return articles.value.map(article => ({
    ...article
  }));
});

console.log(safeArticles.value);

// 时间分组（年-月） with validation
const groupedArticles = computed(() => {
  const groups = {};
  safeArticles.value.forEach(article => {
    const date = new Date(article.date);
    // Validate date
    if (isNaN(date.getTime())) {
      console.error(`Invalid date format for article: ${article.title}`);
      return; // Skip invalid dates
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    if (!groups[year]) groups[year] = {};
    if (!groups[year][month]) groups[year][month] = [];
    groups[year][month].push(article);
  });
  return groups;
});

console.log("groupedArticles.value", groupedArticles.value);

// 年份倒序排序 with NaN filtering
const sortedYears = computed(() => {
  return Object.keys(groupedArticles.value)
    .map(Number)
    .filter(year => !isNaN(year)) // Remove invalid years
    .sort((a, b) => b - a);
});

console.log("sortedYears.value", sortedYears.value);


// 月份倒序排序（修正打印逻辑）
const sortedMonths = (year) => computed(() => {
  const yearData = groupedArticles.value[year];
  if (!yearData) return []; 
  return Object.keys(yearData)
    .map(Number)
    .sort((a, b) => b - a)
    .map(m => String(m).padStart(2, '0'));
});

console.log("sortedMonths.value", sortedMonths.value);

// 年份文章总数
const yearTotal = computed(() => {
  return Object.fromEntries(
    sortedYears.value.map(year => [
      year, 
      Object.values(groupedArticles.value[year]).flat().length
    ])
  );
});

// 折叠状态管理
const expandedYears = ref(new Set());
const toggleYearExpand = (year) => {
  expandedYears.value.has(year) 
    ? expandedYears.value.delete(year) 
    : expandedYears.value.add(year);
};
const isYearExpanded = (year) => expandedYears.value.has(year);

// 日期格式化（YYYY-MM-DD）
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};
</script>

<style scoped>
.archives-container {
  max-width: 1152px;
  margin: 0 auto;
  padding: 40px 24px;
}

.header-section {
  margin-bottom: 40px;
  padding: 0 16px;
}

.archives-title {
  font-size: 28px;
  color: #2c3e50;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.archives-desc {
  font-size: 16px;
  color: #7f8c8d;
}

.timeline {
  border-left: 2px solid #e5e7eb;
  margin-left: 16px;
  padding-left: 24px;
}

.timeline-year {
  margin-bottom: 24px;
}

.year-toggle {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: #fff;
  border: 1px solid #f0f2f5;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.year-toggle:hover {
  background: #f8f9fa;
  border-color: #e6e9ed;
  transform: translateX(4px);
}

.year-marker {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #3eaf7c;
  border: 2px solid #fff;
  position: absolute;
  left: -31px;
  top: 50%;
  transform: translateY(-50%);
  box-shadow: 0 0 0 2px #3eaf7c33;
}

.year-text {
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 8px;
}

.year-count {
  font-size: 14px;
  color: #7f8c8d;
  font-weight: 400;
}

.toggle-icon {
  font-size: 20px;
  color: #7f8c8d;
}

.year-content {
  margin-top: 16px;
  padding-left: 12px;
}

.month-section {
  margin-bottom: 32px;
}

.month-title {
  font-size: 18px;
  color: #34495e;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.month-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #3eaf7c;
}

.article-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.article-card {
  padding: 12px 16px;
  background: #fff;
  border-radius: 6px;
  border: 1px solid #f0f2f5;
  transition: all 0.3s;
}

.article-card:hover {
  background: #f8f9fa;
  border-color: #e6e9ed;
  transform: translateX(4px);
}

.article-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #2c3e50;
  text-decoration: none;
  font-size: 15px;
}

.article-title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.article-date {
  color: #7f8c8d;
  font-size: 14px;
  margin-left: 16px;
  flex-shrink: 0;
}

/* 折叠动画优化 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-in-out;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.slide-enter-to,
.slide-leave-from {
  max-height: 1000px;
  opacity: 1;
  transform: translateY(0);
}
</style>