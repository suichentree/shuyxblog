<template>
  <div class="category-container">
    <div class="category-title">文章分类</div>
    <div class="category-list">
      <div v-for="category in categories" :key="category.id" class="category-item">
        <a :href="'/category/' + category.slug" class="category-link">
          {{ category.name }}
          <span class="category-count">({{ category.count }})</span>
        </a>
      </div>
    </div>
  </div>
  <div class="category-container">
    此处是具体的文章卡片
  </div>
</template>

<script setup>
const categories = [
  { id: 1, name: '前端', slug: 'frontend', count: 12 },
  { id: 2, name: 'Vue', slug: 'vue', count: 8 },
  { id: 3, name: 'JavaScript', slug: 'javascript', count: 5 }
]
</script>

<style scoped>
.category-container {
  margin-bottom: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.category-title {
  font-size: 18px;
  color: #333;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.category-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.category-item {
  background: #f5f5f5;
  border-radius: 4px;
  transition: all 0.3s;
}

.category-item:hover {
  background: #e9e9e9;
}

.category-link {
  display: block;
  padding: 8px 12px;
  color: #333;
  text-decoration: none;
}

.category-count {
  color: #666;
  font-size: 12px;
  margin-left: 4px;
}
</style>