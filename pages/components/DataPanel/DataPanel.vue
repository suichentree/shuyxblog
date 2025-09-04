<template>
    <div class="panel">
        <div class="container">
            <section class="grid">
                <span class="text">
                    本站总访问量
                    <span id="busuanzi_value_site_pv" class="font-bold">--</span> 次
                </span>
                <!-- 随机显示动图 -->
<!--                <img :src="currentGif"  alt="heart" width="150" height="150" style="object-fit: contain;" />-->
                <!-- 随机显示动图（调整图片为自适应） -->
                <img :src="currentGif" alt="heart" style="object-fit: contain; max-width: 150px; width: 80%;" />
                <span class="text">
                    本站访客数
                    <span id="busuanzi_value_site_uv" class="font-bold">--</span> 人次
                </span>
            </section>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';

// 定义动图URL数组，可根据实际图片添加或修改
const gifUrls = [ 
  '/cat.gif', // 会默认读取public目录下的静态文件
  '/pikaqiu_run.gif',
];
// 当前显示的动图URL
const currentGif = ref('');

onMounted(() => {
  // 随机选择一个动图URL
  const randomIndex = Math.floor(Math.random() * gifUrls.length);
  currentGif.value = gifUrls[randomIndex];
});

</script>
<style scoped>
.panel {
    margin: 20px;
}

.container {
    background-color: var(--vp-c-bg-soft);
    border-radius: 8px;
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

.grid {
    font-weight: 500;
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 12px;
    padding-right: 12px;
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    display: grid;
    gap: 12px; /* 统一间距 */
}

.text {
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-align: center; /* 文字居中，适配小屏幕 */
}

/* 移动端适配（屏幕宽度 ≤ 768px） */
@media (max-width: 768px) {
    .grid {
        grid-template-columns: 1fr; /* 移动端单列 */
    }
    .text {
        font-size: 0.75rem; /* 缩小字体 */
    }
    img {
        max-width: 120px; /* 缩小动图尺寸 */
    }
}
</style>