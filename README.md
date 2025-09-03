# shuyxblog

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D14.0.0-green.svg)
![VitePress](https://img.shields.io/badge/vitepress-%5E1.0.0-yellow.svg)

## ✨ 项目介绍
基于 VitePress 构建的个人博客系统，采用自定义主题设计，提供优雅的阅读体验和丰富的功能特性。支持文章分类、标签管理、图片预览、响应式布局等现代化博客功能。

![blog_20250903175403904.png](/blogs/blog_img/blog_20250903175403904.png)

## 🚀 核心功能
- **自定义页面和样式**：精心设计的UI界面，支持深色/浅色模式切换
- **文章管理**：分类与标签双重维度组织内容
- **图片预览**：点击图片可放大预览，支持键盘导航
- **响应式设计**：完美适配桌面端与移动端
- **性能优化**：静态页面生成，加载速度快
- **SEO友好**：自动生成sitemap和结构化数据

## 🛠️ 技术栈
- **构建工具**：VitePress
- **前端框架**：Vue 3
- **样式方案**：CSS/SCSS
- **部署工具**：GitHub Pages

## 📦 安装教程

### 前置要求
- Node.js ≥ 14.0.0
- npm / yarn / pnpm

### 安装步骤
1. 克隆仓库
```bash
git clone https://gitee.com/yourusername/shuyxblog.git
cd shuyxblog
```

2. 安装依赖
```bash
npm install
# 或
yarn install
```

3. 本地开发
```bash
npm run docs:dev
```

4. 构建生产版本
```bash
npm run docs:build
```

## 📝 使用指南

### 创建文章
在 `blogs/` 目录下创建 `.md` 文件，使用 Markdown 格式编写文章。

### 文章配置

在文章头部添加 Frontmatter 配置：
```yaml
---
title: 文章标题
date: 2025-01-01
description: 文章描述
categories: [分类1, 分类2]
tags: [标签1, 标签2]
---
```

### 主题配置

修改 `.vitepress/config.js` 文件自定义博客设置，包括导航、侧边栏、页脚等。

### 部署网站

1. 构建生成静态文件
```bash
npm run docs:build
```

2. 部署到 GitHub Pages
```bash
npm run docs:deploy
```

## 📞 联系方式
- 作者：shuyx
- Gitee: [suichenTree](https://gitee.com/suichenTree)

## 🙏 鸣谢
- [VitePress](https://vitepress.vuejs.org/)
- [Vue.js](https://vuejs.org/)