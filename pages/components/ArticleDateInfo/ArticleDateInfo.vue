
<template>
  <span class="fdate">📝 文章创建时间： {{ format_date(frontmatter.date) }} 🔥 文章最后更新时间：{{ format_date(frontmatter.lastUpdated) }}</span>
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