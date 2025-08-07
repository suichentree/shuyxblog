<template>
  <el-container>
    <el-row class="row-bg" justify="center">
      <el-col :span="20">
        <el-row class="row-bg">
          <el-col :span="16" style="padding: 0px 10px;">
            <!--文章列表-->
            <ArticleList/>
          </el-col>
          <el-col :span="8" style="padding: 0px 10px;">
            <AuthorInfo/>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-container>
</template>
<script setup>
import { ref } from 'vue'
import headimg from '/public/logo.png'
import ArticleList from './ArticleList.vue';
import AuthorInfo from './AuthorInfo.vue';

const activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
.el-header {
  height: 10vh;
}
.el-main {
  height: 90vh;
  padding: 0px;
  background: url('@/assets/bg.2cfdbb33.svg') center/cover no-repeat;
  text-align: center;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-card__body {
  padding: 10px;
}
.el-card__header {
  padding: 10px;
}
.el-footer {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
