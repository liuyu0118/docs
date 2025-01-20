import { defineConfig } from "vitepress";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/docs/",
  title: "柒文档",
  description: "A VitePress Site",
  head: [["link", { rel: "icon", href: "/docs/head.svg" }]],
  vite: {
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    },
  },
  themeConfig: {
    outlineTitle: "目录",
    outline: [2,2],
    sidebar: [],
    aside: "left",
    nav: [
      // {
      //   text: '简历',
      //   link: '/pages/curriculumVitae.md',
      // },
      {
        text: "框架",
        items: [
          // {
          //   text: "react",
          //   items: [{ text: "教程", link: "/pages/react/index.md" }],
          // },
          {
            text: "vue",
            items: [
                // { text: "源码", link: "/pages/vue/index.md" },
                { text: "组件", link: "/pages/vue/component.md" }
            ],
          },
        ],
      },
      { text: "构建工具", items: [
          // {
          //   text:'webpack',items:[
          //     { text: "插件", link:  "/pages/vite/plugin.md" },
          //     { text: "vite", link: "/pages/vite/index.md" },
          //   ]
          // },
          {
            text:'vite',items:[
              { text: "插件", link:  "/pages/vite/plugin.md" },
              { text: "实践", link: "/pages/vite/index.md" },
            ]
          }
        ],
      },
      { text: "css", link: "/pages/css/index.md" },
      { text: "javascript", items: [
          { text: "随笔", link:  "/pages/js/new.md" },
          { text: "typescript", link: "/pages/js/typescript.md" },
        ],
      },
      {
        text: "node",
        items: [
          { text: "node基础", link: "/pages/node/nodejs.md" },
          { text: "mysql基础", link: "/pages/node/mysql.md" },
          { text: "脚手架", link: "/pages/node/scaffold.md" },
        ],
      },
      {
        text: "教程",
        items: [
          { text: "VitePress", link: "/pages/tutorials/vitepress.md" },
          { text: "Markdown", link: "/pages/tutorials/markdown.md" },
        ],
      },
      {
        text: "问题/工作",
        link: "/pages/work/index.md",
      }
    ],
    // 设置搜索框的样式
    search: {
      provider: "local",
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
    socialLinks: [{ icon: "github", link: "https://github.com/liuyu0118" }],
  },
});
