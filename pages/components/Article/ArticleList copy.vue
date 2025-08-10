<template>
  <el-space :fill="true" wrap>
    <!-- 减小卡片内边距和尺寸 -->
    <el-card v-for="i in 10" :key="i" :body-style="{ padding: '10px 16px'}" class="article-card">
      <el-row :gutter="16" >
        <!-- 调整布局比例为15:9 --> 
        <el-col :span="15">
          <!-- 优化标题样式 -->
          <h3 class="article-title">文章标题示例 {{i}}</h3>
          <div class="article-meta">
            <el-text type="secondary" class="meta-content">
              <span class="meta-item">
                <el-icon size="14"><UserFilled /></el-icon>
                <span class="meta-text">suichentree</span>
              </span>
              <span class="meta-item">
                <el-icon size="14"><Timer /></el-icon>
                <span class="meta-text">2024/03/18</span>
              </span>
            </el-text>
          </div>
          <!-- 优化摘要文本 -->
          <p class="article-excerpt">
            这是文章摘要内容，简要介绍文章主题和核心观点，吸引用户点击阅读全文...
          </p>
           <div class="article-tags">
            <el-tag type="primary" size="small" class="tag-item">Java</el-tag>
            <el-tag size="small" class="tag-item">编程</el-tag>
          </div>
        </el-col>
        <el-col :span="9">
          <!-- 优化图片样式和尺寸 -->
          <el-image
            class="article-image"
            src="http://116.62.199.48:9000/weblog/c89cc6b66f0341c0b7854771ae063eac.jpg"
            fit="cover"
            preview-teleported
          />
        </el-col>
      </el-row>
    </el-card>
    <div class="pagination-container">
      <el-pagination background layout="prev, pager, next, jumper" :total="1000" />
    </div>
  </el-space>
</template>
<script setup>
  
</script>
<style scoped>
.article-card {
  border-radius: 10px;
  transition: all 0.3s ease;
  overflow: hidden;
  max-width: 800px; /* 限制卡片最大宽度 */
  margin: 0 auto; /* 居中显示 */
}

.article-card:hover {
  transform: translateY(-3px); /* 减小悬停效果 */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}

.article-title {
  font-size: 1.2rem; /* 减小标题字号 */
  margin-bottom: 8px;
  color: #2c3e50;
  font-weight: 600;
  line-height: 1.4;
}

.meta-text {
  font-size: 0.8rem; /* 减小元数据字号 */
}

.meta-icon {
  margin-left: 12px;
}

.article-excerpt {
  color: #555;
  margin: 8px 0;
  font-size: 0.9rem; /* 调整摘要字号 */
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-tags {
  margin-top: 10px;
}

.article-image {
  width: 100%;
  height: 140px; /* 减小图片高度 */
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* 图片添加轻微阴影 */
  transition: transform 0.3s ease;
}

.article-image:hover {
  transform: scale(1.02); /* 图片悬停放大效果 */
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.article-title,
.article-meta,
.article-excerpt,
.article-tags {
  text-align: left; /* 确保所有文本左对齐 */
}

.tag-item {
  margin-right: 8px; /* 标签之间添加8px间距 */
  margin-bottom: 4px; /* 垂直方向也添加少量间距 */
}

.article-meta {
  text-align: left; /* 确保左对齐 */
  margin-bottom: 10px;
  padding: 4px 0;
}

.meta-content {
  display: flex; /* 使用flex布局排列元素 */
  align-items: center; /* 垂直居中对齐 */
  font-size: 0.8rem;
  color: #666;
}

.meta-item {
  display: flex;
  align-items: center;
  margin-right: 16px; /* 元素之间添加间距 */
}

.meta-item .el-icon {
  margin-right: 4px; /* 图标与文本间距 */
  color: #999;
}
</style>