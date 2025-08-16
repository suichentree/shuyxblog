<!-- HomePage页面用于在首页展示各个不同组件页面。例如文章列表，文章信息，以及其他组件页面。 -->
<template>
    <div class="panel">
      <div class="container">
          <el-row :gutter="20">
              <el-col :span="18">
                <!--文章列表-->
                <ArticleList/>
              </el-col>
              <el-col :span="6">
                <!-- 文章信息 -->
                <AuthorInfo/>
              </el-col>
          </el-row>
      </div>
    </div>
</template>
<script setup>
//引入文章列表和作者信息组件
import ArticleList from '/pages/components/ArticleList/ArticleList.vue';
import AuthorInfo from '/pages/components/AuthorInfo/AuthorInfo.vue';
</script>
<style scoped>
.panel {
    margin-top: 20px;
    margin-bottom: 20px;
}

.container {
    border-radius: 8px;
    width: 100%;
    min-height: 32px;
    max-width: 1152px;
    margin-left: auto;
    margin-right: auto;
}
</style>
