## 编写自己的脚手架

什么是脚手架？我们常见的如：`vue-cli` `Angular CLI` `Create React App`

> 编写自己的脚手架是指创建一个定制化的工具，用于快速生成项目的基础结构和代码文件，以及提供一些常用的命令和功能。通过编写自己的脚手架，可以定义项目的目录结构、文件模板，管理项目的依赖项。

编写自己的脚手架需要用到下面的一些库

- `commander`：是一个用于构建命令行工具的 npm 库。它提供了一种简单而直观的方式来创建命令行接口，并处理命令行参数和选项。可以轻松定义命令、子命令、选项和帮助信息。它还可以处理命令行的交互，使用户能够与你的命令行工具进行交互。
- `inquirer`：是一个强大的命令行交互工具，用于与用户进行交互和收集信息。它提供了各种丰富的交互式提示（如输入框、选择列表、确认框等），可以帮助你构建灵活的命令行界面。通过 Inquirer，你可以向用户提出问题，获取用户的输入，并根据用户的回答采取相应的操作。
- `ora`：是一个用于在命令行界面显示加载动画的 npm 库。如旋转器、进度条等。
- `download-git-repo`：是一个用于下载 Git 仓库的 npm 库。

## 简单实现

这个注释`#!/usr/bin/env node`用于告诉操作系统用 node 解释器去执行这个文件，而不是显式调用。

```index.js
#!/usr/bin/env node
//告诉操作系统我执行命令的时候 帮我用node去执行这个文件
import { program } from "commander";
import fs from "node:fs";
import inquirer from "inquirer";
import { checkPath, downloadTemp } from "./utils.js";
//读取package.json文件的version信息
const json = JSON.parse(fs.readFileSync("./package.json"));
program.version(json.version);
program
  .command("create <projectName>") //脚手架执行的命令，这里表示创建一个项目 例如: test-cli create vue-js
  .alias("c")
  .description("创建项目")
  .action((projectName) => {
    inquirer
      .prompt([
        {
          type: "input", //输入  input输入 confirm确认框 list选择框 checkbox多选框
          name: "projectName", //返回值的key
          message: "请输入项目名", //描述
          default: projectName, //默认值
        },
        {
          type: "confirm",
          name: "isTS",
          message: "是否选用TypeScript模板",
        },
      ])
      .then((res) => {
        if (checkPath(res.projectName)) {
        } else {
          if (res.isTS) {
            downloadTemp("ts", res.projectName);
          } else {
            downloadTemp("js", res.projectName);
          }
        }
      });
  });
program.parse(process.argv);
```

```utils.js
import fs from "node:fs";
import download from "download-git-repo";
import ora from "ora";
//检查路径
export const checkPath = (path) => {
  if (fs.existsSync(path)) {
    return true;
  }
  return false;
};
//下载模板
const spinner = ora("下载中...");
export const downloadTemp = (branch, project) => {
  return new Promise((resolve, reject) => {
    spinner.start();
    download(
      `direct:https://gitee.com/liuyu-123-ui/vue-template.git#${branch}`,
      project,
      { clone: true },
      function (err) {
        if (err) {
          reject(err);
          console.log(err);
        }
        resolve();
        spinner.succeed("下载完成");
      }
    );
  });
};
```

在 package.json 中添加一下命令，执行`test-cli`这个命令就会运行对应路径的文件，在使用这个命令之前，需要使用`npm link`生成软连接，这样就可以全局执行`test-cli`这个命令

```package.json
  "bin": {
    "test-cli": "src/index.js"
  },
```

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/42ec6fd96ec949eaaffafdf311398006~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5oOz6KaB5Y676ZW_5a6J:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTcyMzY1MzQ5NTQ2Nzg4MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726133647&x-orig-sign=kOFRcPCoyz1zpOth2Vy9S3R3v6o%3D)

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/854ce7f1cf474d69a230885da9e7ceea~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5oOz6KaB5Y676ZW_5a6J:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTcyMzY1MzQ5NTQ2Nzg4MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1726133647&x-orig-sign=%2FvIzPF3Zr9%2BX3e3TuN9dx6AQ3Qo%3D)

至此我们便有了自己的脚手架
