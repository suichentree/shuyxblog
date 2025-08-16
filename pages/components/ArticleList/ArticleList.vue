<template>
  <div>
    <!-- 文章列表 -->
    <div class="article-items">
      <!--文章卡片-->
      <div v-for="article in currentArticles" class="custom-card"  @click="navigateToArticle(article.url)">
        <div class="card-content">
          <!-- 左侧文本区域 -->
          <div class="article-text">
            <!-- 标题 -->
            <h3 class="article-title">{{ article.title }}</h3>
            <!-- 元数据 -->
            <div class="article-meta">
              <!-- 作者 -->
              <span class="meta-item">
                <span class="meta-icon">👤</span>
                <span class="meta-text">suichentree</span>
              </span>
              <!-- 日期 -->
              <span class="meta-item">
                <span class="meta-icon">📅</span>
                <span class="meta-text">{{ article.date }}</span>
              </span>
              <!-- 分类 -->
              <span class="meta-item">
                <span class="meta-icon">🗂️</span>
                <span v-for="category in article.categories" class="meta-text">{{ category }}</span>
              </span>
            </div>
            <!-- 标签 -->
            <div class="article-tags">
              <span v-for="tag in article.tags" class="tag-item">
                <span class="meta-icon">🏷️</span>{{ tag }}
              </span>
            </div>
          </div>
          <!-- 右侧图片区域 -->
          <div class="article-image">
            <img :src="article.cover" alt="Article cover" class="cover-image">
          </div>
        </div>
      </div>
    </div>
    <!-- 引入分页组件 -->
    <Pagination
      v-model:currentPage="currentPage"
      :total="total"
      :pageSize="pageSize"
    />
  </div>
</template>

<script setup>
import { ref,computed} from 'vue';
// 导入分页组件
import Pagination from '/pages/components/Pagination/Pagination.vue';
//引入统计数据
import { data as rawData } from '/utils/statistics.data.js'
const blogData = ref(rawData); // 使用ref包装原始数据
console.log(blogData.value)

// 接收父组件传递的过滤条件
const props = defineProps({
  filterCategory: {
    type: String,
  },
  filterTag: {
    type: String,
  }
});

//获取文章数据并转换为指定的对象格式
const articles = computed(() => {
  // 确保blogData存在
  if (blogData.value.articles) {
    // 转换文章数据
    let articleList =  blogData.value.articles.map(element => ({
      url: element.url,               //文章url
      title: element.title,           //文章标题
      date: format_date(element.date),//日期
      cover: random_cover_image(),    //封面图
      categories: element.categories || [], //分类
      tags: element.tags || []             //标签
    }));

    //模拟的文章数据展示
    // {
    //   url: '/article/1',
    //   title: 'xxxxxxxxx',
    //   date: '2025-10-15',
    //   tags: ["项目","Vue3","前端"],
    //   categories: ["项目"],
    //   cover: '/public/cover4.png'
    // }

    // 如果有过滤条件，则对文章数据进行过滤 (排除"全部")
    if (props.filterCategory && props.filterCategory != "全部") {
      articleList = articleList.filter(article => 
        article.categories.includes(props.filterCategory)
      );
      //每次重新过滤文章数据都将当前页设置为1
      currentPage.value = 1;
    }

    // 如果有过滤条件，则对文章数据进行过滤 (排除"全部")
    if (props.filterTag && props.filterTag != "全部") {
      articleList = articleList.filter(article => 
        article.tags.includes(props.filterTag)
      );
      //每次重新过滤文章数据都将当前页设置为1
      currentPage.value = 1;
    }

    return articleList;
  }else{
    console.log('没有文章数据')
  }
});

// 计算出当前页的文章数据
const currentArticles = computed(() => {
  if (!articles.value) return [];
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return articles.value.slice(start, end);
});

//当前页
const currentPage = ref(1);
//每页显示的文章数量，默认10条
const pageSize = ref(10);
//总文章数量
const total = computed(() => {
  return articles.value.length
});


//格式化日期
function format_date(date_string){
  return date_string.split('T')[0];;
}
// 随机返回一个封面图片
function random_cover_image(){
  // 文章封面cover数组
  let cover_image_urls = [
    '/public/cover1.jpg',
    '/public/cover2.jpg',
    '/public/cover3.jpg',
    '/public/cover4.png',
    '/public/cover5.jpeg',
    '/public/cover6.jpeg',
  ];
  let randomIndex = Math.floor(Math.random() * cover_image_urls.length);
  return cover_image_urls[randomIndex];
}

const navigateToArticle = (url) => {
  if (url) {
    // 使用原生JavaScript实现页面跳转
    window.location.href = url;
    // 如需在新标签页打开，可使用：
    // window.open(url, '_blank');
  }
};

</script>
<style scoped>
/* 文章列表容器 */
.article-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
/* 自定义卡片样式 */
.custom-card {
  border: 2px solid #f0f0f0;
  border-radius: 15px;
  transition: all 0.3s ease;
}
.custom-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* 卡片内容区域 - 使用flex实现左右布局 */
.card-content {
  display: flex;
  width: 100%;
}

/* 左侧文本区域 */
.article-text {
  flex: 16;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: auto;
  padding: 20px;
}

/* 文章标题 */
.article-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  text-align: left;
}

/* 元数据区域 */
.article-meta {
  display: flex;
  gap: 15px;
  color: #888;
  font-size: 13px;
}
/* 元数据项 */
.meta-item {
  display: flex;
  align-items: center;
  gap: 5px;
}
/* 元数据图标 */
.meta-icon {
  font-size: 14px;
}

/* 标签区域 */
.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

/* 标签项 */
.tag-item {
  background-color: #f6f6f7;
  color: #666;
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 12px;
  transition: all 0.3s;
}

/* 右侧图片区域 */
.article-image {
  flex: 8;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
}

/* 封面图片 */
.cover-image {
  width: 100%;
  height: auto;
  object-fit: cover; /* 保持比例填充容器 */
  border-radius: 8px;
}

</style>