<template>
  <div class="panel">
      <div class="container">
          <div class="pagination">
            <button class="page-btn" :disabled="currentPage === 1"  @click="prevPage" >
              上一页
            </button>
            <span>第 {{ currentPage }} 页 / 共 {{ totalPages }} 页 （共 {{ props.total }} 篇）</span>
            <button
              class="page-btn"
              :disabled="currentPage >= totalPages"
              @click="nextPage"
            >
              下一页
            </button>
            <span>跳至</span>
            <input
              class="jump-input"
              type="number"
              v-model.number="inputPage"
              min="1"
              :max="totalPages"
              @keydown.enter="jumpToPage"
            >
            <button class="jump-btn" @click="jumpToPage">确定</button>
          </div>
      </div>
  </div>
</template>
<script setup>
import { ref, watch, computed } from 'vue';

// 更新props定义，接收文章总数和每页大小
const props = defineProps({
  currentPage: {
    type: Number,
  },
  total: {
    type: Number,
  },
  pageSize: {
    type: Number,
  }
});

// 向父组件发送事件
const emit = defineEmits(['update:currentPage']);
//计算总页数
const totalPages = computed(() => {
  if (!props.total || !props.pageSize) return 1;
  return Math.ceil(props.total / props.pageSize);
});

// 输入框页码
const inputPage = ref(props.currentPage);
// 监听父组件的currentPage变化，同步到inputPage
watch(
  () => props.currentPage,
  (newVal) => {
    inputPage.value = newVal;
  },
  { immediate: true }
);

// 上一页
const prevPage = () => {
  if (props.currentPage > 1) {
    emit('update:currentPage', props.currentPage - 1);
  }
};
// 下一页
const nextPage = () => {
  if (props.currentPage < totalPages.value) {
    emit('update:currentPage', props.currentPage + 1);
  }
};

// 跳转页面
const jumpToPage = () => {
  let page = Number(inputPage.value);
  // 输入验证
  if (isNaN(page) || page < 1) page = 1;
  if (page > totalPages.value) page = totalPages.value;
  // 更新页码
  emit('update:currentPage', page);
};
</script>
<style scoped>
.panel {
    margin: 20px;
}

.container {
    background-color: var(--vp-c-bg-soft);
    border-radius: 10px;
    width: 100%;
    min-height: 32px;
    max-width: 1152px;
    margin-left: auto;
    margin-right: auto;
    transition: transform 0.3s;
}
.container:hover {
    transform: translateY(-5px);
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding:10px;
}

/* 分页按钮 */
.page-btn {
  padding: 10px;
  border-radius: 6px;
  transition: all 0.3s ease;
}
.page-btn:hover:not(:disabled) {
  background-color: #42b983;
}
.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 跳转输入框 */
.jump-input {
  padding: 5px;
  border: 2px solid #ddd;
  border-radius: 5px;
  text-align: center;
}

/* 跳转按钮 */
.jump-btn {
  padding: 6px;
  background-color: #42b983;
  color: white;
  border-radius: 5px;
}
.jump-btn:hover {
  background-color: #359469;
}

</style>