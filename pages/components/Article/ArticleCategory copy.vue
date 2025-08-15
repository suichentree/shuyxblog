<template>
  <div class="container">
    <div class="category-content">
        <div v-for="category in categories" class="category-item">
          <a :href="'/category/'">
            {{ category.name }}
            <span class="category-count" :style="{ backgroundColor: getRandomBrightColor() }">
              {{ category.count }}
            </span>
          </a>
        </div>
    </div>
    <div>
      <ArticleList :filter-category="activeCategory" />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
//引入文章列表组件
import ArticleList from './ArticleList.vue';
//引入统计数据
import { data as rawData } from '/utils/statistics.data.js'
const blogData = ref(rawData); // 使用ref包装原始数据

//分类数据
const categories = ref([
  //模拟数据展示
  // { name: '前端开发', count: 18 },
]);
categories.value = blogData.value.categories;

const activeCategory = ref('all'); // 默认显示所有文章

function selectCategory(id) {
  activeCategory.value = id;
}

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
    '#3eaf7c', // 深绿色
    '#8e44ad', // 深紫色
    '#499cef', // 深蓝色
    '#dcba33', // 黄色
    '#e67e22', // 棕色
    '#16a085', // 深青色
    '#2980b9', // 深蓝色
    '#95a6b8', // 浅蓝色
  ];
  // 随机获取数组中的颜色
  const randomIndex = Math.floor(Math.random() * colorArray.length);
  return colorArray[randomIndex];
}
</script>

<style scoped>

.container{
  display: flex;
  flex-direction: column;
  max-width: 70%;
  margin: auto;
}

.category-content{
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin:20px;
  gap: 10px;
}

.category-item {
  border: 1px solid #f0f0f0;
  padding: 8px;
  border-radius: 5px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}
.category-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.category-count {
  display: inline-block;
  width: 24px;
  line-height: 24px;
  text-align: center;
  color: white;
  border-radius: 4px;
  margin-left: 4px;
  font-size: 15px;
}




</style>