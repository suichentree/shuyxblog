// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'

//引入样式美化css
import './beautiful.css'

//引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//引入文章日期组件
import ArticleDate from '/pages/components/ArticleDate/ArticleDate.vue'
//引入首页文章组件
import HomeArticle from '/pages/components/HomeArticle/HomeArticle.vue'
//引入回到顶部组件
import Backtotop from '/pages/components/Backtotop/Backtotop.vue'


/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots

      // 指定文章日期组件使用doc-before插槽
      'doc-before': () => h(ArticleDate),
      // 指定首页文章组件使用home-features-after插槽
      'home-features-after': () => h(HomeArticle),
      // 指定组件使用doc-footer-before插槽
      'doc-footer-before': () => h(Backtotop),
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
    //全局注册ElementPlus
    app.use(ElementPlus)
  }
}
