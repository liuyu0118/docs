## 环境搭建

本次我们采用 vite 构建 react 项目

```sh
npm init vite
```

![init](../../public//react/init.png)

### 目录介绍

- public 公共目录
- src
  - assets 静态资源
  - App.css 根组件样式
  - App.tsx 根组件
  - index.css 全局 css 文件
  - main.tsx 全局 tsx 文件
  - vite-env.d.ts 声明文件
- .eslintrc.cjs eslint 配置文件
- .gitignore git 忽略文件
- index.html 入口文件 index.html
- package.json 项目依赖模块文件
- tsconfig.json ts 配置文件
- tsconfig.node.json vite-ts 配置文件
- vite.config.ts vite 配置文件

#### FAQ：

- public 公共目录和 src 下的 assets 静态资源有什么区别？

  答：public 目录中的资源编译之后会存放到根目录，不会被编译；而静态资源 assets 是会随着项目一起打包。

- 为什么 main.tsx 的`document.getElementById('root')!`需要加`!`?

  答：因为`document.getElementById('root')`返回值可能为空，`!`是非空断言。

### 命令介绍

#### package.json

在`package.json`文件中的`scripts`是一些执行命令，他会先在 node_modules 的`.bin`中去找，没有就会去全局去找，再没有就会去环境变量中寻找，再没有就会报错。

```json
"dev": "vite",//启动开发模式项目
"build": "tsc && vite build", //打包构建生产包
"lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",//代码检查
"preview": "vite preview" //预览模式
```
