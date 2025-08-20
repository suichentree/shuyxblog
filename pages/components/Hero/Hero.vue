<template>
    <div class="main">
      <img :src="headimg" style="width: 200px; border-radius: 50%" />
      <div class="title">
        Shuyx Blog
      </div>
      <!-- 打字机效果容器 -->
      <div>
        <span class="typed-container" ref="container"></span>
      </div>
    </div>
</template>
<script setup>
import { onMounted, ref, onUnmounted } from 'vue'
import Typed from 'typed.js' // 导入 typed.js
//图片
const headimg = ref('/public/logo.png')

const container = ref(null)
const typedInstance = ref(null)
onMounted(() => {
  // 初始化 typed.js 实例
  typedInstance.value = new Typed(container.value, {
    strings: [
        "海里的咸鱼 (;-_-)ᴇᴍᴍᴍ。绝不温水煮青蛙。",
        "人生如逆水行舟，不变则退。",
        "历史是不断螺旋上升或螺旋下降的，人也是，人是可以改变的。",
        "不经历困难，怎知自己的潜力与能力。第一步是最重要的。",
        "纸上得来终觉浅，绝知此事要躬行。——— 陆游《冬夜读书示子聿》",
        "好记性不如烂笔头。",
        "种一棵树最好的时间是十年前,其次是现在。",
        "路漫漫其修远兮，吾将上下而求索 —— 屈原",
        "在寻找成功的过程中，人往往会变得面目全非，而人最大的失败，就是失去自我。 ——《蛊真人》",
    ],
    typeSpeed: 150,         // 打字速度（毫秒/字符）
    backSpeed: 150,          // 回退速度（毫秒/字符）
    loop: true,             // 是否循环播放
    startDelay: 2000,        // 开始前的延迟时间（毫秒）
    backDelay: 3000,       // 每段文字打完后的暂停时间（毫秒）
    // 可添加更多配置（如显示HTML、光标样式等）
    showCursor: true, // 显示光标
    cursorChar: '|', // 光标字符
    autoInsertCss: true,
    smartBackspace: true, // 智能回退（只删除与下一段不同的字符）
    shuffle: true, // 随机打乱文本顺序
  })
})

// 组件卸载时销毁实例，避免内存泄漏
onUnmounted(() => {
  if (typedInstance) {
    typedInstance.destroy()
  }
})

</script>
<style scoped>
.main {
  height: 90vh;
  background: url('/public/bg.svg') center/cover no-repeat;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap:20px;
  align-items: center;
  justify-content: center;
}
.title {
  font-size: 2rem;
  font-weight: 500;
}

/* 自定义光标和文本样式 */
.typed-container {
  font-size: 1.2rem;
  font-weight: 500;
  min-height: 1.5em; /* 防止文本切换时容器高度跳动 */
}

/* 光标样式 */
.typed-cursor {
  color: var(--vp-c-primary); /* 使用 VitePress 主题色 */
  animation: blink 0.7s infinite;
}

@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}
</style>