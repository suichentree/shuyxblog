// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'

//引入样式美化css
import './beautiful.css'

//引入看板娘插件
import { useLive2d } from 'vitepress-theme-website'
//引入不蒜子计数插件
import { inBrowser } from 'vitepress'
import busuanzi from 'busuanzi.pure.js'
//引入路由进度条插件
import { NProgress } from 'nprogress-v2/dist/index.js' // 进度条组件
import 'nprogress-v2/dist/index.css' // 进度条样式


//引入文章日期组件
import ArticleDateInfo from '/pages/components/ArticleDateInfo/ArticleDateInfo.vue'
//引入回到顶部组件
import Backtotop from '/pages/components/Backtotop/Backtotop.vue'
//引入站点数据统计组件
import DataPanel from '/pages/components/DataPanel/DataPanel.vue'
//引入贡献统计日历图组件
import D3ContributionCalendar from "/pages/components/D3ContributionCalendar/D3ContributionCalendar.vue";
//引入自定义的Hero组件
import Hero from "/pages/components/Hero/Hero.vue";
//引入自定义的首页组件
import HomePage from '/pages/HomePage.vue'


/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  setup() {
    //看板娘
    useLive2d({
      enable: true,
      model: {
        url: 'https://raw.githubusercontent.com/iCharlesZ/vscode-live2d-models/master/model-library/hibiki/hibiki.model.json'
      },
      display: {
        position: 'right',
        width: '135px',
        height: '300px',
        xOffset: '35px',
        yOffset: '5px'
      },
      mobile: {
        show: true
      },
      react: {
        opacity: 0.8
      }
    })
  },
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots

      // 指定组件使用doc-before插槽
      'doc-before': () => h(ArticleDateInfo),
      // 指定组件使用layout-bottom插槽
      'layout-bottom': () => h(Backtotop),
      // 指定组件使用home-hero-after插槽
      'home-hero-after': () => h(Hero),
      // 指定组件使用home-features-after插槽
      'home-features-after': () => [
        h(D3ContributionCalendar),
        h(DataPanel),
        h(HomePage),
      ],
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
    //全局注册各个插件
    if (inBrowser) {
      NProgress.configure({ showSpinner: false })
      router.onBeforeRouteChange = () => {
        NProgress.start() // 开始进度条显示
      }
      router.onAfterRouteChanged = () => {
         busuanzi.fetch({ async: true })  //不蒜子监听计数
         NProgress.done() // 停止进度条显示
      }
    }
  },
}
