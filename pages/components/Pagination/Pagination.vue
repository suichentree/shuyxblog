<template>
  <div class="pagination-container">
    <div class="pagination">
      <button
        class="page-btn prev-btn"
        :disabled="currentPage === 1"
        @click="prevPage"
      >
        上一页
      </button>
      <span class="page-info">
        第 {{ currentPage }} 页 / 共 {{ props.totalPages }} 页
      </span>
      <button
        class="page-btn next-btn"
        :disabled="currentPage >= props.totalPages"
        @click="nextPage"
      >
        下一页
      </button>
      <div class="jump-container">
        <span>跳至</span>
        <input
          type="number"
          v-model.number="inputPage"
          min="1"
          :max="props.totalPages"
          @keydown.enter="jumpToPage"
        >
        <button class="jump-btn" @click="jumpToPage">确定</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';

// 更新props定义，接收文章总数和每页大小
const props = defineProps({
  currentPage: {
    type: Number,
  },
  totalPages: {
    type: Number,
  },
  pageSize: {
    type: Number,
  }
});

// 向父组件发送事件
const emit = defineEmits(['update:currentPage']);
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
  if (props.currentPage < props.totalPages) {
    emit('update:currentPage', props.currentPage + 1);
  }
};

// 跳转页面
const jumpToPage = () => {
  let page = Number(inputPage.value);
  // 输入验证
  if (isNaN(page) || page < 1) page = 1;
  if (page > props.totalPages) page = props.totalPages;
  // 更新页码
  emit('update:currentPage', page);
};
</script>
<style scoped>
.pagination-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.pagination {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.page-btn {
  padding: 8px 16px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 6px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.page-btn:hover:not(:disabled) {
  background-color: #42b983;
  color: white;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #cccccc;
}

.page-info {
  color: #333;
  font-size: 14px;
  padding: 0 5px;
}

.jump-container {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 10px;
}

.jump-container input {
  width: 60px;
  padding: 6px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
}

.jump-btn {
  padding: 6px 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.jump-btn:hover {
  background-color: #359469;
}

</style>