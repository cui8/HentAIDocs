import { defineConfig } from 'vitepress'
import { sidebar, nav } from './configs/index'

// TDesign
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/", // 网站部署的路径，默认根目录
  lang: 'zh-CN',
  title: "Hent AI 文档", // 标签页主标题
  titleTemplate: '', // 标签页副标题
  description: "Hent AI 帮助文档", // 网站描述，用于 SEO
  head: [
    ['link',{ rel: 'icon', href: '/favicon.ico'}], // fav 图标
  ],
  appearance: true, // 默认浅色且开启切换
  lastUpdated: true, // 开启最后更新时间
  markdown:{
    lineNumbers:true
  },
  themeConfig: {
    logo: '/favicon.ico', // 导航栏 logo
    siteTitle: 'Hent AI', // 导航栏标题
    // 本地搜索
    search: {
      provider: 'local'
    },
    // 页脚
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2001-2024present 💖 由兜兜风维护',
    },
    // 页面目录 / 大纲
    outline: {
      level: [2, 4], // 显示 2-6 级标题，等价于使用关键字 deep
      label: '页面导航' // 文字显示
    },
    // 最后更新时间配置
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      },
    },
    // 自定义上下页名
    docFooter: { 
      prev: '上一页',
      next: '下一页',
    },
    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/' },
      { icon: 'x', link: 'https://twitter.com/' },
      { icon: 'discord', link: 'https://discord.com/' },
    ],
    // 手机端深浅模式文字修改
    darkModeSwitchLabel: '深浅模式',

    // https://vitepress.dev/reference/default-theme-config
    // nav: [
    //   { text: '首页', link: '/' },
    //   { text: '前端体系', link: '/pages/前端/阶段四：热门框架/1. Vue/1. Vue2基础' }
    // ],
    nav,

    // 侧边栏配置
    sidebar,
    // 侧边栏文字更改 (移动端)
    sidebarMenuLabel: '目录',
    // 返回顶部文字修改
    returnToTopLabel: '返回顶部',
  },
  vite: {
    plugins: [
      // 通过插件按需引用使用 TDesign
      AutoImport({
        resolvers: [TDesignResolver({
          library: 'vue-next'
        })],
      }),
      Components({
        resolvers: [TDesignResolver({
          library: 'vue-next'
        })],
      }),
    ],
  },
})
