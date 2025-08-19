<template>
  <div class="container">
    <!-- 时间轴 -->
    <div class="timeline-content">
      <div class="timeline-sticky">
        <h3 style="font-size: 18px;color: #2c3e50;padding: 10px;">文章时间轴</h3>
        <div class="year-tags">
          <button 
            v-for="year in sortedYears" 
            :key="year" 
            :class="{ active: selectedYear === year }"
            @click="handleYearClick(year)"
            class="year-tag"
          >
            <span>{{ year }}年</span>
            <span>{{ yearTotal[year] }} 篇 </span>
          </button>
        </div>
      </div>
    </div>
    <!-- 文章区域-->
    <div class="main-content">
        <!-- 年份内容块 -->
        <div 
          v-for="year in sortedYears" 
          :key="year" 
          :id="'year-' + year" 
          style="padding: 10px;"
        >
          <h2 class="year-title">
            <span class="year-dot"></span> 
            <span style="font-size: 24px;">{{ year }}年（共{{ yearTotal[year] }}篇）</span>
          </h2>
          <!-- 月份分组 -->
          <div v-for="(month, index) in sortedMonths(year).value" :key="index">
            <h3 class="month-title">{{ month }}月 </h3>
            <!-- 文章列表 -->
            <div class="article-list">
              <div 
                v-for="article in groupedArticles[year][month]" 
                :key="article.url" 
                class="article-item"
              >
                <a :href="article.url" class="article-link">
                  <span>{{ article.title }}</span>
                  <span>{{ formatDate(article.date) }}</span>
                </a>
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

// 基础数据处理
const blogData = ref(rawData);
const articles = computed(() => blogData.value.articles || []);

// 时间分组（年-月）
const groupedArticles = computed(() => {
  const groups = {};
  articles.value.forEach(article => {
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
.container {
  margin: 10px auto;
  display: flex;
  flex-direction: row;
  width: 80%;
  gap: 20px;
}

/* 左侧时间轴 */
.timeline-content {
  flex: 8; 
}

.timeline-sticky {
  position: sticky;
  top: 50%; /* 关键修改：相对于视口顶部50% */
  transform: translateY(-50%); /* 关键修改：自身高度的50%向上偏移，实现垂直居中 */
  padding: 10px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  max-height: 90vh; /* 可选：限制最大高度为视口高度的90%，防止内容过长溢出 */
  overflow-y: auto; /* 可选：内容过长时显示滚动条 */
}

.year-tags {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.year-tag {
  padding: 10px;
  background: #f8f9fa;
  border-radius: 6px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  transition: all 0.3s;
}

.year-tag:hover {
  background: #eef0f2;
  transform: translateX(4px);
}

.year-tag.active {
  background: #3eaf7c;
  color: white;
  font-weight: 600;
}

/* 右侧文章内容区 */
.main-content {
  flex: 16;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.year-title {
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
  margin: 10px;
  padding-left: 12px;
  border-left: 3px solid #3eaf7c;
}

.article-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.article-item {
  padding: 10px;
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
  font-size: 16px;
}


</style>