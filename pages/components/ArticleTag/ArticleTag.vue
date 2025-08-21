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
          <span>{{ tag.name }}</span>
          <span class="count" :style="{ backgroundColor: tag.color }">
            {{ tag.count }}
          </span>
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
import { getRandomBrightColor } from '/utils/common.js'
const blogData = ref(rawData); // 使用ref包装原始数据

// 初始化时标签数据
const tags = ref(blogData.value.tags.map(tag => ({
  ...tag,
  //生成颜色并存储到标签对象中
  color: getRandomBrightColor()
})));

// 检查是否已存在"全部"标签，不存在时再添加
if (!tags.value.find(cat => cat.name === '全部')) {
  tags.value.unshift({
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
const activeTag = ref(queryName.value);

// 点击分类时，将当前分类设置为 activeTag
function selectTag(tag) {
  activeTag.value = tag === activeTag.value ? '全部' : tag;
}

</script>
<style scoped>
.container{
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: auto;
  max-width: 1152px;
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
  padding: 2px;
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