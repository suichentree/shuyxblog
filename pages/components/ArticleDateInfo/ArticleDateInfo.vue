<script setup>
import { useData } from 'vitepress'
const { frontmatter } = useData()
</script>
<template>
  <span v-if="frontmatter.date" class="fdate">🔥&nbsp;文章创建时间： {{ frontmatter.date }} 🔥&nbsp;文章最后更新时间：{{ frontmatter.lastUpdated }}</span>
</template>
<style>
.fdate {
  font-size: 15px;
  color: #7f7f7f;
  margin-right: 10px;
}
</style>