<template>
  <div class="container">
    <!-- 时间轴区域 -->
    <div class="timeline-content">
      <div class="timeline-sticky">
          <h3 class="timeline-title">文章时间轴</h3>
          <div class="time-tags">
            <div v-for="year in sortedYears" :key="year">
              <a 
                :href="`#year-${year}`"
                 class="time-tag"
                :class="{ active: selectedYear === year }"
                @click="handleYearClick(year)"
              >
                <span>{{ year }}年</span>
                <span>{{ yearTotal[year] }} 篇 </span>
              </a>
            </div>
          </div>
      </div>
    </div>
    <!-- 文章区域-->
    <div class="article-content">
        <!-- 年份内容块 -->
        <div 
          v-for="year in sortedYears" 
          :key="year" 
          :id="'year-' + year" 
          class="year-content"
        > 
          <!--年份标题-->
          <div class="year-title">
            📅 <span>{{ year }}年（共{{ yearTotal[year] }}篇）</span>
          </div>
          <!-- 月份 -->
          <div v-for="(month, index) in sortedMonths(year)" :key="index">
            <h3 class="month-title">{{ month }}月 </h3>
            <!-- 文章 -->
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
//处理统计数据
const blogData = ref(rawData);
const articles = computed(() => blogData.value.articles);

//将文章数据按照年份和月份进行分组处理并返回为一个对象
//对象格式示例
//{
//  2025: {
//    01: [article1, article2],
//    02: [article3]
//  },
//  2024: {
//    01: [article4]
//  }
//  。。。。。。。。。。。
//}
const groupedArticles = computed(() => {
    const groups = {};
    //遍历文章数据
    articles.value.forEach(article => {
      //读取文章的date数据
      let date = new Date(article.date);
      if (isNaN(date.getTime())){
        //跳过无效date数据
        return;
      }else{
        //获取年份
        let year = date.getFullYear();
        //获取月份
        let month = String(date.getMonth() + 1).padStart(2, '0');
        //如果groups对象中对应年份不存在，则创建
        if (!groups[year]) groups[year] = {};
        //如果groups对象中对应月份不存在，则创建
        if (!groups[year][month]) groups[year][month] = [];
        //将文章添加到对应月份数组中
        groups[year][month].push(article);
      }
    });
    return groups;
});

// 按groupedArticles数据中提取年份，并按降序排序成一个年份数组
// [2025, 2024, 2023,........]
const sortedYears = computed(() => {
  return Object.keys(groupedArticles.value)
    .map(Number)
    .filter(year => !isNaN(year))
    .sort((a, b) => b - a);
});

// 计算每个年份的文章总数,返回一个对象
// { "2016": 3, "2017": 3,"2018": 9, "2019": 12,。。。。。}
const yearTotal = computed(() => {
  return Object.fromEntries(
    sortedYears.value.map(year => [
      year, 
      Object.values(groupedArticles.value[year] || {}).flat().length
    ])
  );
});

// 传入年份，根据年份获取该年份中所有的月份（降序）组成的数组
// 示例：sortedMonths(2025) => ["12", "08", "07", "03","01"]
function sortedMonths(year){
  const yearData = groupedArticles.value[year];
  if (!yearData) return []; 
  return Object.keys(yearData)
    .map(Number)
    .sort((a, b) => b - a)
    .map(m => String(m).padStart(2, '0'));
}

// 交互状态管理
const selectedYear = ref(null);

// 年份点击方法
const handleYearClick = (year) => {
  selectedYear.value = year;
};

// 日期格式化
const formatDate = (dateStr) => {
  let date = new Date(dateStr);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};
</script>

<style scoped>
.container {
  margin: 10px auto;
  display: flex;
  flex-direction: row;
  width: 70%;
  gap: 20px;
}

/* 左侧时间轴 */
.timeline-content {
  flex: 8;
  position: relative; /* 为时间线定位 */
}

.timeline-sticky{
  padding: 10px;
  /* sticky定位实现滚动时保持位置 */
  position: sticky;
  top: 50%;
  transform: translateY(-50%);
  background-color: var(--vp-c-bg-soft);
  border-radius: 10px;
}

/* 时间轴标题 */
.timeline-title {
  font-weight: 800;
  padding: 10px;
  text-align: center;
}

/* 年份容器 */
.time-tags {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* 年份按钮 */
.time-tag {
  padding: 10px;
  border: 2px solid var(--vp-c-default-soft);
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  transition: all 0.3s;
}

/* 年份按钮-悬停状态 */
.time-tag:hover {
  transform: translateX(5px);
}
/* 年份按钮-激活状态 */
.time-tag.active {
  background: #3eaf7c;
  color: #f0f0f0;
}


/* 右侧文章内容区 */
.article-content {
  flex: 16;
}

/* 年份内容 */
.year-content{
  background-color: var(--vp-c-bg-soft);
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 10px;
}

/* 年份标题 */
.year-title {
  padding: 10px;
  font-size: 25px;
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
  padding: 10px;
  border-left: 3px solid #3eaf7c;
}

.article-list {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.article-item {
  padding: 10px;
  border: 2px solid var(--vp-c-default-soft);
  border-radius: 5px;
  transition: all 0.3s;
}
.article-item:hover {
  background-color: #3eaf7c;
}

.article-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .container {
    width: 95%;
    flex-direction: column;
    gap: 15px;
  }

  .timeline-content,
  .article-content {
    flex: none;
    width: 100%;
  }

  .timeline-sticky {
    position: static;
    transform: none;
    margin-bottom: 20px;
  }

  .year-title {
    font-size: 20px;
    padding: 8px 5px;
  }

  .month-title {
    font-size: 16px;
    padding: 8px 5px;
  }

  .article-link {
    font-size: 13px;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }

  .time-tag {
    padding: 8px 10px;
    font-size: 13px;
  }
}
</style>