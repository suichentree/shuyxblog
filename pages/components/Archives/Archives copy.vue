<template>
  <div class="archives-container">
    <!-- 左右分栏主容器 -->
    <div class="main-content">
      <!-- 左侧文章内容区 -->
      <div class="articles-section">
        <!-- 年份内容块 -->
        <div 
          v-for="year in sortedYears" 
          :key="year" 
          :id="'year-' + year" 
          class="year-block"
        >
          <h2 class="year-title">
            <span class="year-dot"></span> {{ year }}年（共{{ yearTotal[year] }}篇）
          </h2>
          
          <!-- 月份分组 -->
          <div 
            v-for="(month, index) in sortedMonths(year).value" 
            :key="index" 
            class="month-section"
          >
            <h3 class="month-title">{{ month }}月</h3>
            
            <!-- 文章列表 -->
            <div class="article-list">
              <div 
                v-for="article in groupedArticles[year][month]" 
                :key="article.url" 
                class="article-item"
              >
                <a :href="article.url" class="article-link">
                  <span class="article-title">{{ article.title }}</span>
                  <time class="article-date">{{ formatDate(article.date) }}</time>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧时间轴 -->
      <div class="timeline-section">
        <div class="timeline-sticky">
          <h3 class="timeline-title">文章时间轴</h3>
          <div class="year-tags">
            <button 
              v-for="year in sortedYears" 
              :key="year" 
              :class="{ active: selectedYear === year }"
              @click="handleYearClick(year)"
              class="year-tag"
            >
              {{ year }}年
              <span class="year-count">（{{ yearTotal[year] }}）</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { data as rawData } from '/utils/statistics.data.js';

// 基础数据处理
const blogData = ref(rawData);
const articles = computed(() => blogData.value.articles || []);

// 安全文章数据（确保url存在）
const safeArticles = computed(() => {
  return articles.value.map(article => ({
    ...article,
    url: article.url || `/article/${encodeURIComponent(article.title)}` // 无url时生成默认链接
  }));
});

// 时间分组（年-月）
const groupedArticles = computed(() => {
  const groups = {};
  safeArticles.value.forEach(article => {
    const date = new Date(article.date);
    if (isNaN(date.getTime())) return; // 跳过无效日期
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    if (!groups[year]) groups[year] = {};
    if (!groups[year][month]) groups[year][month] = [];
    groups[year][month].push(article);
  });
  return groups;
});

console.log("groupedArticles.value", groupedArticles.value);

// 年份倒序排序
const sortedYears = computed(() => {
  return Object.keys(groupedArticles.value)
    .map(Number)
    .filter(year => !isNaN(year))
    .sort((a, b) => b - a);
});

console.log("sortedYears.value", sortedYears.value);

// 月份倒序排序
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
      Object.values(groupedArticles.value[year] || {}).flat().length
    ])
  );
});

// 交互状态管理
const selectedYear = ref(null);

// 处理年份点击（滚动定位）
const handleYearClick = (year) => {
  selectedYear.value = year;
  const target = document.getElementById(`year-${year}`);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// 日期格式化
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};
</script>

<style scoped>
.archives-container {
  margin: 10px auto;
  padding: 20px;
  width: 80%;
}

.main-content {
  display: flex;
  gap: 32px;
}

/* 左侧文章内容区 */
.articles-section {
  flex: 16; /* 占4/5宽度 */
  margin-bottom: 40px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.year-block {
  padding: 20px;
}

.year-title {
  font-size: 24px;
  color: #2c3e50;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.year-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #3eaf7c;
  flex-shrink: 0;
}

.month-title {
  font-size: 18px;
  color: #34495e;
  margin: 16px 0 12px;
  padding-left: 12px;
  border-left: 3px solid #3eaf7c;
}

.article-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.article-item {
  padding: 12px 16px;
  background: #f8f9fa;
  border-radius: 6px;
  transition: all 0.3s;
}

.article-item:hover {
  background: #eef0f2;
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

/* 右侧时间轴 */
.timeline-section {
  flex: 8; /* 占1/5宽度 */
  min-width: 200px;
}

.timeline-sticky {
  position: sticky;
  top: 40px; /* 滚动时距离顶部40px固定 */
}

.timeline-title {
  font-size: 18px;
  color: #2c3e50;
  margin-bottom: 16px;
}

.year-tags {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.year-tag {
  width: 100%;
  padding: 10px 12px;
  background: #f8f9fa;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-align: left;
  transition: all 0.3s;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.year-tag:hover {
  background: #eef0f2;
}

.year-tag.active {
  background: #3eaf7c;
  color: white;
  font-weight: 600;
}

.year-count {
  font-size: 12px;
  color: #7f8c8d;
}

.year-tag.active .year-count {
  color: #ffffffcc;
}
</style>