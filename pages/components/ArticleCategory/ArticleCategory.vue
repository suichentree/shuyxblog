<template>
  <div class="container">
    <div class="content">
      <div 
        v-for="category in categories" 
        :key="category.name" 
        class="item"
        :class="{ 'active': activeCategory === category.name }"
        @click="selectCategory(category.name)"
      >
        <span>{{ category.name }}</span>
        <span class="count" :style="{ backgroundColor: category.color }">
          {{ category.count }}
        </span>
      </div>
    </div>
    <div>
      <ArticleList :filter-category="activeCategory" />
    </div>
  </div>
</template>
<script setup>
import { ref} from 'vue';
//引入文章列表组件
import ArticleList from '/pages/components/ArticleList/ArticleList.vue';
//引入js
import { data as rawData } from '/utils/statistics.data.js'
import { getRandomBrightColor } from '/utils/common.js'

// 使用ref包装原始数据
const blogData = ref(rawData);

// 初始化时标签数据
const categories = ref(blogData.value.categories.map(category => ({
  ...category,
  //生成颜色并存储到标签对象中
  color: getRandomBrightColor()
})));
// 检查是否已存在"全部"分类，不存在时再添加
if (!categories.value.find(category => category.name === '全部')) {
  categories.value.unshift({
    name: '全部',
    count: blogData.value.articlesSumCount,
    // 为"全部"标签生成颜色
    color: getRandomBrightColor()
  });
}

//获取页面链接末尾的name参数值，否则设置为全部
const queryName = ref('')
queryName.value = new URLSearchParams(window.location.search).get('name') // 获取 name 参数值
if (queryName.value === null){
  queryName.value = '全部'
}
//当前选中的分类，默认为页面链接name参数值
const activeCategory = ref(queryName.value);

// 点击分类时，将当前分类设置为 activeCategory
function selectCategory(category) {
  activeCategory.value = category === activeCategory.value ? '全部' : category;
}

</script>
<style scoped>
.container{
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: auto;
}

.content{
  display: flex;
  flex-direction: row;
  justify-content: start;
  padding:20px;
  gap: 5px;
  flex-wrap: wrap; /* 允许子元素换行 */
}

.item {
  border: 2px solid var(--vp-c-default-soft);
  padding: 5px;
  border-radius: 5px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  gap:5px
}
.item:hover {
  transform: translateY(-5px);
}

.count {
  min-width: 24px;
  border-radius: 5px;
  color: #f0f0f0;
}
.active {
  background-color: #3eaf7c;
  color: #f0f0f0;
}
</style>