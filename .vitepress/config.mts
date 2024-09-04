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
      { text: "react", link: "/pages/react/index.md" },
      {
        text: "教程",
        items: [
          { text: "VitePress", link: "/pages/tutorials/vitepress.md" },
          { text: "Markdown", link: "/pages/tutorials/markdown.md" },
        ],
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
