import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
// 网站元数据配置
export default defineConfig({
    //网站部署的路径。默认为根目录 /
    //如果你的代码仓库是xxx.github.io，则base应设为'/'
    //如果你的代码仓库是xxx.github.io/xxx，则base应设为'/xxx/'。例如若配置为目录 /vitepress/ 则需要部署到项目的vitepress目录中。
    //另外如果配置为非根目录，则图片的访问路径也要改变。例如从 /aaa.png -> /vitepress/aaa.png
    base: '/',
    lang: 'zh-CN',
    title: "Shuyx Blog", //网站名称 类似<title>网址名称</title>
    description: "Shuyx Blog 是一个基于 VuePress 的静态博客网站。",  //网站描述 类似<meta name="description" content="网站描述">
    //favicon图标
    head: [
      ['link',{ rel: 'icon', href: '/favicon.ico'}],
    ],
    // 站点地图
    sitemap: {
      hostname: 'https://你的网址.com',
    },
    //主题相关配置
    themeConfig: {
      //头部导航栏
      nav: [
        { text: '🏠️ 首页', link: '/' },
        { text: '🗂️ 分类',link: '/pages/views/ArticleCategory.md'},
        { text: '🏷️ 标签',link: '/pages/views/ArticleTag.md'},
        { text: '📑 归档',link: '/pages/views/Archives.md'},
        { text: '🧭 导航',link: '/pages/views/NavigationWebsite.md'},
        {
          text: '🍉 关于',
          items: [
            { text: '关于我', link: '/blogs/个人项目/关于我.md' },
            { text: 'Github', link: 'https://github.com/suichentree' },
            { text: 'Gitee', link: 'https://gitee.com/suichentree' },
            { text: '微信', link: 'https://weixin.qq.com/' },
            { text: '掘金', link: 'https://juejin.cn/user/xxxxxx' },
            { text: 'CSDN', link: 'https://blog.csdn.net/xxxx' },
          ]
        },
      ],
      // 头部导航栏的logo,会默认读取public目录下的logo.png文件。
      logo: '/logo.png',
      // 头部导航栏的标题
      siteTitle: 'Shuyx Blog',
      // 头部导航栏的社交链接部分
      socialLinks: [
        { icon: 'github', link: 'https://github.com/suichentree' },
        {
          icon: {
            svg: '<svg t="1721906075888" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2472" width="256" height="256"><path d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m284.8 313.6c0 12.8-12.8 25.6-25.6 25.6H416c-41.6 0-76.8 35.2-76.8 76.8v243.2c0 12.8 12.8 25.6 25.6 25.6h240c41.6 0 76.8-35.2 76.8-76.8v-12.8c0-12.8-12.8-25.6-25.6-25.6H480c-12.8 0-25.6-12.8-25.6-25.6v-64c0-12.8 12.8-25.6 25.6-25.6h291.2c12.8 0 25.6 12.8 25.6 25.6v144c0 92.8-76.8 169.6-169.6 169.6H252.8c-12.8 0-25.6-12.8-25.6-25.6V412.8C227.2 310.4 310.4 224 416 224h355.2c12.8 0 25.6 12.8 25.6 25.6v64z" fill="#B32225" p-id="2473"></path></svg>'
          },
          link: 'https://gitee.com/suichenTree'
        }
      ],
      //手机端深浅模式默认显示 Appearance,可自定义
      darkModeSwitchLabel: '日夜模式',
      //头部导航栏的本地搜索框
      search: {
        provider: 'local',
        options: {
          translations: {
            button: {
              buttonText: "搜索文档",
              buttonAriaLabel: "搜索文档",
            },
            modal: {
              noResultsText: "无法找到相关结果",
              resetButtonTitle: "清除查询条件",
              footer: {
                selectText: "选择",
                navigateText: "切换",
              },
            },
          },
        },
      },
      //主页的页脚
      footer: {
        message: 'Released under the MIT License.',
        // 自动更新时间
        copyright: `Copyright © 2017-${new Date().getFullYear()} present shuyx`,
        // 带有备案号的文本
        // copyright: `Copyright © 2017-${new Date().getFullYear()} 备案号：<a href="https://beian.miit.gov.cn/" target="_blank">*****号</a>`,
      },
      //文章展示页面的右侧的大纲目录
      outline: {
        level: [1, 6], // 显示 h1 到 h6 的标题
        label: '文章大纲目录' // 文字显示
      },

      //文章展示页面的底部的 Carbon 广告展示，暂时不用
      // carbonAds: {
      //   code: 'your-carbon-code',
      //   placement: 'your-carbon-placement',
      // },

      //注释侧边栏，暂时不用
      // sidebar: [
      //   {
      //     text: 'Examples',
      //     items: [
      //       { text: 'Markdown Examples', link: '/markdown-examples' },
      //       { text: 'Runtime API Examples', link: '/api-examples' }
      //     ]
      //   }
      // ],

      //多语言
      locales: {
        //默认为中文
        root: {
          label: '简体中文',
          lang: 'Zh_CN',
        },
        en: {
          label: 'English',
          lang: 'en',
          link: '/en/',
        },
      },

      // 404页配置
      notFound:{ 
        title: '未找到页面，迷路了~',
        quote: '请检查地址是否正确，或当前页面未开通，点击下方按钮返回首页',
        linkText: '返回首页'
      },
      // 自定义markdown配置
      markdown:{
        image: {
          // 开启图片懒加载
          lazyLoading: true,
          // 代码块显示行数
          lineNumbers: true,
        },
      }
    }
})
