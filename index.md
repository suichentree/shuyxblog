---
# https://vitepress.dev/reference/default-theme-home-page
# 首页 markdown 文件（不包括头部导航栏和侧边栏）
 
# 首页 home布局
layout: home

# 头部导航栏，默认开启，false为关闭。还需要在config.mjs中进行具体配置
navbar: true


# hero区域的配置
hero:
  # 文本
  name: "A11111"
  text: "A22222"
  tagline: My great project tagline
  # 图片
  image:
    src: /logo.png
    alt: logo.png
  actions:
    - theme: brand
      text: Markdown Examples
      link: /markdown-examples
    - theme: alt
      text: API Examples
      link: /api-examples

# features区域的配置
features:
  - icon: 📝
    title: 专注于您的内容
    details: 只需使用 Markdown 即可轻松创建精美的文档网站
  - icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path fill="#41b883" d="M24.4 3.925H30l-14 24.15L2 3.925h10.71l3.29 5.6 3.22-5.6Z"/><path fill="#41b883" d="m2 3.925 14 24.15 14-24.15h-5.6L16 18.415 7.53 3.925Z"/><path fill="#35495e" d="M7.53 3.925 16 18.485l8.4-14.56h-5.18L16 9.525l-3.29-5.6Z"/></svg>
    title: 使用 Vue 进行定制
    details: 直接在 Markdown 中使用 Vue 语法和组件，或使用 Vue 构建自定义主题
  - icon: 🚀
    title: 快速发布网站
    details: 使用静态 HTML 进行快速初始加载，使用客户端路由进行快速加载后导航
---

<!-- 引入自定义首页组件 -->
<HomePage />

<script setup>
import HomePage from '/pages/HomePage.vue'
</script>