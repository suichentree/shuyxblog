<template>
  <div class="container">
    <div class="content">
      <div 
        v-for="tag in tags" 
        :key="tag.name" 
        class="item"
        :class="{ 'active': activeTag === tag.name }"
        @click="selectTag(tag.name)"
      >
        <a href="javascript:void(0)">
          {{ tag.name }}
          <span class="count" :style="{ backgroundColor: getRandomBrightColor() }">
            {{ tag.count }}
          </span>
        </a>
      </div>
    </div>
    <div>
      <ArticleList :filter-tag="activeTag" />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import ArticleList from '/pages/components/ArticleList/ArticleList.vue';
import { data as rawData } from '/utils/statistics.data.js'
const blogData = ref(rawData); // 使用ref包装原始数据

const tags = ref(blogData.value.tags);
// 新增：检查是否已存在"全部"标签，不存在时再添加
if (!tags.value.find(cat => cat.name === '全部')) {
  tags.value.unshift({
    name: '全部',
    count: blogData.value.articlesSumCount
  });
}

//默认选择全部分类
const activeTag = ref('全部');
// 点击分类时，将当前分类设置为 activeTag
function selectTag(tag) {
  activeTag.value = tag === activeTag.value ? '全部' : tag;
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

.content{
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin:20px;
  gap: 10px;
  flex-wrap: wrap; /* 允许子元素换行 */
}

.item {
  border: 1px solid #f0f0f0;
  padding: 8px;
  border-radius: 5px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}
.item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.count {
  display: inline-block;
  width: 24px;
  line-height: 24px;
  text-align: center;
  color: white;
  border-radius: 4px;
  margin-left: 4px;
  font-size: 15px;
}

.active {
  background-color: #3eaf7c;
  color: #f0f0f0;
}

</style>