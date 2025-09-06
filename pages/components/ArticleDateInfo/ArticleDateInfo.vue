
<template>
  <div class="fdate"> 
    <div v-if="frontmatter.categories">
      🗂️ 文章分类：
      <span v-for="category in frontmatter.categories">{{ category }} &nbsp;</span>
    </div>
  </div>
  <div class="fdate">
    <div v-if="frontmatter.tags">
      🏷️ 文章标签： 
      <span v-for="tag in frontmatter.tags">{{ tag }} &nbsp;</span>
    </div>
  </div>
  <div class="fdate">📝 文章创建时间： {{ format_date(frontmatter.date) }} </div>
  <div class="fdate">🔥 文章最后更新时间：{{ format_date(frontmatter.lastUpdated) }}</div>
</template>
<script setup>
import { useData } from 'vitepress'
const { frontmatter } = useData()

//格式化日期
function format_date(date_string){
  if (date_string) {
    return date_string.split('T')[0];
  }else{
    return "暂无";
  }
}
</script>
<style>
.fdate {
  font-size: 15px;
  color: #7f7f7f;
  margin-right: 10px;
}
</style>