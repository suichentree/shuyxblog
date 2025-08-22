<!-- HomePage页面用于在首页展示文章列表和文章信息组件页面。 -->
<template>
    <div class="panel">
      <div class="container">
          <div class="row">
              <div class="col-18">
                <!--文章列表部分-->
                <ArticleList/>
              </div>
              <div class="col-6">
                <!-- 文章信息部分 -->
                <AuthorInfo/>
              </div>
          </div>
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
    margin: 20px;
}
.container {
    border-radius: 8px;
    width: 100%;
    min-height: 32px;
    max-width: 1152px;
    margin-left: auto;
    margin-right: auto;
}

/* Flex布局实现行排列 */
.row {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}
.col-18 {
    flex: 0 0 calc(75% - 10px);
}
.col-6 {
    flex: 0 0 calc(25% - 10px);
}

/* 移动端适配（屏幕≤768px） */
@media (max-width: 768px) {
    .row {
        flex-direction: column; /* 改为垂直排列 */
    }
    .col-18, .col-6 {
        flex: 0 0 100%; /* 宽度占满 */
    }
}
</style>
