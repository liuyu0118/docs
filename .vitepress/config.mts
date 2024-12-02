import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/docs/",
  title: "柒文档",
  description: "A VitePress Site",
  head: [["link", { rel: "icon", href: "/docs/head.svg" }]],
  themeConfig: {
    outlineTitle: "目录",
    outline: [2, 6],
    sidebar: [],
    aside: "left",
    nav: [
      {
        text: "框架",
        items: [
          {
            text: "react",
            items: [{ text: "教程", link: "/pages/react/typescript.md" }],
          },
          {
            text: "vue",
            items: [{ text: "组件", link: "/pages/vue/typescript.md" }],
          },
        ],
      },
      { text: "vite", link: "/pages/vite/typescript.md" },
      { text: "css", link: "/pages/css/typescript.md" },
      { text: "javascript", items: [
          { text: "new", link:  "/pages/js/new.md" },
          { text: "typescript", link: "/pages/js/typescript.md" },
        ],},
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
        text: "面试",
        link: "/pages/interview/typescript.md",
      },
      {
        text: "问题",
        link: "/pages/work/typescript.md",
      },
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
