## 开发环境搭建

本次我们采用 vite 构建 react 项目

```sh
npm init vite
```

![init](../../public//react/init.png)

**目录介绍**

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

**FAQ：**

- public 公共目录和 src 下的 assets 静态资源有什么区别？

  答：public 目录中的资源编译之后会存放到根目录，不会被编译；而静态资源 assets 是会随着项目一起打包。

- 为什么 main.tsx 的`document.getElementById('root')!`需要加`!`?

  答：因为`document.getElementById('root')`返回值可能为空，`!`是非空断言。

**package.json**

在`package.json`文件中的`scripts`是一些执行命令，他会先在 node_modules 的`.bin`中去找，没有就会去全局去找，再没有就会去环境变量中寻找，再没有就会报错。

```json
"dev": "vite",//启动开发模式项目
"build": "tsc && vite build", //打包构建生产包
"lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",//代码检查
"preview": "vite preview" //预览模式
```

## tsx 语法

什么是 jsx 语法，全称：javascript and XML，允许在 js 中编写 html 代码。tsx 就是在 jsx 的基础上添加了类型。

- 绑定变量

  ```tsx
  function App() {
    const num: number = 12;
    const fn = () => {
      return <div></div>;
    };
    const style = { width: "100px" };
    return (
      <>
        <div>{"张三" /**字符串用法 */}</div>
        <div>{num /**变量用法 */}</div>
        <div>{fn() /**函数用法 */}</div>
        <div>{new Date().getTime() /**API用法 */}</div>
        {/* 绑定class，这里必须写成className */}
        <div className="red"></div>
        {/* 绑定style */}
        <div style={{ width: "100px" }}></div>
        <div style={style}></div>
      </>
    );
  }
  ```

  - 事件绑定：使用小驼峰

  ```tsx
  function App() {
    const fn = () => {
      console.log(123);
    };
    const fnEvent = (num, e) => {
      console.log(num, e);
    };
    //正常写泛型语法会跟tsx语法冲突，他会把泛型理解成是一个元素，如<div>，解决方案后面加一个","
    const fnT = <T,>(name: T) => {
      console.log(name);
    };
    return (
      <>
        <div onClick={fn}>点击</div>
        <div onClick={(e) => fnEvent(213, e)}>点击</div>
        <div onClick={() => fnT("张三")}>点击</div>
      </>
    );
  }
  ```

  - 渲染 html 代码片段(dangerouslySetInnerHTML)

  ```tsx
  function App() {
    const html = "<div>123</div>";
    return (
      <>
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </>
    );
  }
  ```

  - 遍历 dom 元素，使用`map`

  ```tsx
  function App() {
    const arr = ["a", "b", "c", "d", "e"];
    return (
      <>
        {arr.map((item) => (
          <div>{item}</div>
        ))}
      </>
    );
  }
  ```

  - 条件语句，使用三元表达式

  ```tsx
  function App() {
    let flag: boolean = false;
    return <>{flag ? "是" : "否"}</>;
  }
  ```

## 工具

### Babel

**什么是 Babel?**

[Babel 官网](https://babeljs.io/)

[查看 AST 抽象语法树](https://astexplorer.net/)

Babel 是一个 JavaScript 编译器,提供了 JavaScript 的编译过程，能够将源代码转换为目标代码。

AST -> Transform -> Generate

**核心功能**

- 语法转换：将新版本的 JavaScript 语法转换为旧版本的语法
- Polyfill：通过引入额外的代码，使新功能在旧浏览器中可用
- JSX: 将 JSX 语法转换成普通的 JavaScript 语法
- 插件: 为 Babel 提供自定义功能

**案例**

**1. 语法转换：将新版本的 JavaScript 语法转换为旧版本的语法**

```sh
npm install --save-dev @babel/core @babel/cli @babel/preset-env
```

测试用例 1

```js
//test.js
const a = (query = 2) => 2 + query;
const b = [1, 2];
const c = [...b, 3, 4];
class Babel {}
new Babel();
```

转换代码

```js
import babel from "@babel/core";
import presetEnv from "@babel/preset-env"; //es6 => es5核心包
import fs from "node:fs";
const fscode = fs.readFileSync("./test.js", "utf8");
const { code } = babel.transform(fscode, {
  presets: [presetEnv],
});
```

转换之后的代码

```js
"use strict";
function _typeof(o) {
  "@babel/helpers - typeof";
  return (
    (_typeof =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (o) {
            return typeof o;
          }
        : function (o) {
            return o &&
              "function" == typeof Symbol &&
              o.constructor === Symbol &&
              o !== Symbol.prototype
              ? "symbol"
              : typeof o;
          }),
    _typeof(o)
  );
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    (o.enumerable = o.enumerable || !1),
      (o.configurable = !0),
      "value" in o && (o.writable = !0),
      Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return (
    r && _defineProperties(e.prototype, r),
    t && _defineProperties(e, t),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  );
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _classCallCheck(a, n) {
  if (!(a instanceof n))
    throw new TypeError("Cannot call a class as a function");
}
var a = function a() {
  var query =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
  return 2 + query;
};
var b = [1, 2];
var c = [].concat(b, [3, 4]);
var Babel = /*#__PURE__*/ _createClass(function Babel() {
  _classCallCheck(this, Babel);
});
new Babel();
```

测试用例 2

```js
//test.js
const x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter((x) => x % 2 === 0);
const y = Object.assign({}, { name: 1 });
```

转换代码

```js
import babel from "@babel/core";
import presetEnv from "@babel/preset-env"; //es6 => es5核心包
import fs from "node:fs";
const fscode = fs.readFileSync("./test.js", "utf8");
const { code } = babel.transform(fscode, {
  //useBuiltIns 有两个参数 entry 和 usage
  //entry 手动引入
  //usage 会根据配置的浏览器兼容，以及你代码中用到的 API 来进行 polyfill，实现了按需添加
  //corejs 3 是corejs的版本
  presets: [[presetEnv, { useBuiltIns: "usage", corejs: 3 }]],
});
```

转换之后的代码

```js
"use strict";
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.to-string.js");
var x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(function (x) {
  return x % 2 === 0;
});
var y = Object.assign(
  {},
  {
    name: 1,
  }
);
```

**2. 代码转换 react jsx**

测试用例

```jsx
//test.jsx
import { createRoot } from "react-dom/client";
const App = () => {
  return <div>我是谁？？？？？</div>;
};
createRoot(document.getElementById("root")).render(<App />);
```

要支持转换需要添加一个预设

```sh
npm install @babel/preset-react -D
```

转换代码

```js
import babel from "@babel/core";
import presetEnv from "@babel/preset-env"; //es6 => es5核心包
import fs from "node:fs"; //支持jsx
import react from "@babel/preset-react";
const fscode = fs.readFileSync("./test.jsx", "utf8");
const { code } = babel.transform(fscode, {
  presets: [[presetEnv, { useBuiltIns: "usage", corejs: 3 }], react],
});
```

转换之后的代码

```js
"use strict";

var _client = require("react-dom/client");
var App = function App() {
  return /*#__PURE__*/ React.createElement(
    "div",
    null,
    "\u6211\u662F\u8C01\uFF1F\uFF1F\uFF1F\uFF1F\uFF1F"
  );
};
(0, _client.createRoot)(document.getElementById("root")).render(
  /*#__PURE__*/ React.createElement(App, null)
);
```

**3. 编写 Babel 插件**

测试用例

```js
//test.js
const a = (params = 2) => params + 2;
```

箭头函数转普通函数插件

```js
import babel from "@babel/core";
import fs from "node:fs";
const fscode = fs.readFileSync("./test.js", "utf8");
//types 包含了各种ast方法
const transformFunction = ({ types: t }) => {
  return {
    name: "transformFunction",
    visitor: {
      //匹配箭头函数
      ArrowFunctionExpression(path) {
        const { node } = path;
        //实现箭头函数转普通函数
        //async params body
        const arrowFunction = t.functionExpression(
          null, //null表示匿名函数
          node.params,
          t.blockStatement([t.returnStatement(node.body)]), //body需要转换
          node.async
        );
        path.replaceWith(arrowFunction);
      },
    },
  };
};
const { code } = babel.transform(fscode, {
  plugins: [transformFunction],
});
```

转换之后的代码

```js
const a = function (params = 2) {
  return params + 2;
};
```

### SWC

**什么是 SWC** 【[SWC 官网](https://swc.rs/)】

SWC 既可用于编译，也可用于打包。对于编译，它使用现代 JavaScript 功能获取 JavaScript / TypeScript 文件并输出所有主流浏览器支持的有效代码。

SWC 在单线程上比 Babel 快 20 倍，在四核上快 70 倍。

简单点来说 swc 实现了和 babel 一样的功能，但是它比 babel 快。

**核心功能**

- JavaScript/TypeScript 转换 可以将现代 JavaScript（ES6+）和 TypeScript 代码转换为兼容旧版 JavaScript 环境的代码。这包括语法转换（如箭头函数、解构赋值等）以及一些 polyfill 的处理
- 模块打包 SWC 提供了基础的打包功能，可以将多个模块捆绑成一个单独的文件
- SWC 支持代码压缩和优化功能，类似于 Terser。它可以对 JavaScript 代码进行压缩，去除不必要的空白、注释，并对代码进行优化以减小文件大小，提高加载速度
- SWC 原生支持 TypeScript，可以将 TypeScript 编译为 JavaScript
- SWC 支持 React 和 JSX 语法，可以将 JSX 转换为标准的 JavaScript 代码。它还支持一些现代的 React 特性

**案例**

```sh
npm install @wsc/core -D
```

**1. 将新版本的 JavaScript 语法转换为旧版本的语法**

测试用例

```js
const a = (query = 2) => 2 + query;
const b = [1, 2];
const c = [...b, 3, 4];
class Babel {}
new Babel();
const x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter((x) => x % 2 === 0);
const y = Object.assign({}, { name: 1 });
```

转换代码

```js
import swc from "@swc/core";
const result = swc.transformFileSync("./test.js", {
  jsc: {
    target: "es5",
    parser: {
      syntax: "ecmascript",
    },
  },
});
```

转换后代码

```js
function _array_like_to_array(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _array_without_holes(arr) {
  if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _class_call_check(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _iterable_to_array(iter) {
  if (
    (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null) ||
    iter["@@iterator"] != null
  )
    return Array.from(iter);
}
function _non_iterable_spread() {
  throw new TypeError(
    "Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}
function _to_consumable_array(arr) {
  return (
    _array_without_holes(arr) ||
    _iterable_to_array(arr) ||
    _unsupported_iterable_to_array(arr) ||
    _non_iterable_spread()
  );
}
function _unsupported_iterable_to_array(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _array_like_to_array(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _array_like_to_array(o, minLen);
}
var a = function () {
  var query =
    arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 2;
  return 2 + query;
};
var b = [1, 2];
var c = _to_consumable_array(b).concat([3, 4]);
var Babel = function Babel() {
  "use strict";
  _class_call_check(this, Babel);
};
new Babel();
var x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(function (x) {
  return x % 2 === 0;
});
var y = Object.assign(
  {},
  {
    name: 1,
  }
);
```

**2. 代码转换 react jsx**

测试用例

```js
import { createRoot } from "react-dom/client";
const App = () => {
  return <div>我是谁？？？？？</div>;
};
createRoot(document.getElementById("root")).render(<App />);
```

转换代码

```js
import swc from "@swc/core";
const result = swc.transformFileSync("./app.jsx", {
  jsc: {
    target: "es5",
    parser: {
      syntax: "ecmascript",
      jsx: true,
    },
  },
});
```

转换后代码

```js
import { createRoot } from "react-dom/client";
var App = function () {
  return /*#__PURE__*/ React.createElement("div", null, "我是谁？？？？？");
};
createRoot(document.getElementById("root")).render(
  /*#__PURE__*/ React.createElement(App, null)
);
```

## 原理

[React 源码解析](https://pomb.us/build-your-own-react/)

**虚拟 DOM(Virtual DOM)**

Virtual DOM 就是用 JavaScript 对象去描述一个 DOM 结构，虚拟 DOM 不是直接操作浏览器的真实 DOM，而是首先对 UI 的更新在虚拟 DOM 中进行，再将变更高效地同步到真实 DOM 中。

优点

- 性能优化：直接操作真实 DOM 是比较昂贵的，尤其是当涉及到大量节点更新时。虚拟 DOM 通过减少不必要的 DOM 操作，主要提现在 diff 算法的复用操作，其实也提升不了多少性能。
- 跨平台性：虚拟 DOM 是一个与平台无关的概念，它可以映射到不同的渲染目标，比如浏览器的 DOM 或者移动端(`React Native`)的原生 UI。

**实现简易虚拟 DOM**

- React.createElement：用于生成虚拟 DOM 树，返回一个包含 type（元素类型）和 props（属性和子元素）的对象。 children 可以是文本或其他虚拟 DOM 对象。
- React.createTextElement：用于处理文本节点，将字符串封装成虚拟 DOM 对象。
- 将虚拟 DOM 转化为实际 DOM 元素。 使用递归的方式渲染所有子元素。 最后将生成的 DOM 节点插入到指定的容器中

```js
const React = {
  createElement(type, props, ...children) {
    return {
      type,
      props: {
        ...props,
        children: children.map((child) =>
          typeof child === "object" ? child : React.createTextElement(child)
        ),
      },
    };
  },
  createTextElement(text) {
    return {
      type: "TEXT_ELEMENT",
      props: {
        nodeValue: text,
        children: [],
      },
    };
  },
};
```

**React Fiber**

Fiber 是 React 16 引入的一种新的协调引擎，用于解决和优化 React 应对复杂 UI 渲染时的性能问题

示例：[未使用 fiber 版本](https://claudiopro.github.io/react-fiber-vs-stack-demo/stack.html) [使用 fiber 版本](https://claudiopro.github.io/react-fiber-vs-stack-demo/fiber.html)

**Fiber 的作用**

为了解决 React15 在大组件更新时产生的卡顿现象，React 团队提出了 Fiber 架构，并在 React16 发布，将 同步递归无法中断的更新 重构为 异步的可中断更新

实现了 4 个具体目标

- 可中断的渲染：Fiber 允许将大的渲染任务拆分成多个小的工作单元（Unit of Work），使得 React 可以在空闲时间执行这些小任务。当浏览器需要处理更高优先级的任务时（如用户输入、动画），可以暂停渲染，先处理这些任务，然后再恢复未完成的渲染工作。
- 优先级调度：在 Fiber 架构下，React 可以根据不同任务的优先级决定何时更新哪些部分。React 会优先更新用户可感知的部分（如动画、用户输入），而低优先级的任务（如数据加载后的界面更新）可以延后执行。
- 双缓存树（Fiber Tree）：Fiber 架构中有两棵 Fiber 树——current fiber tree（当前正在渲染的 Fiber 树）和 work in progress fiber tree（正在处理的 Fiber 树）。React 使用这两棵树来保存更新前后的状态，从而更高效地进行比较和更新。
- 任务切片：在浏览器的空闲时间内（利用 requestIdleCallback 思想），React 可以将渲染任务拆分成多个小片段，逐步完成 Fiber 树的构建，避免一次性完成所有渲染任务导致的阻塞。
