## uniapp 打包定位失效

> 问题描述：在使用 uniapp 开发 app 时，发现真机调试时定位没有问题，打包上线后定位功能失效。

![uni](../../public//work/uniapp.png)

当`manifest.json`使用如上配置时，系统定位在打包后并没有生效，这里使用的是高德定位对安卓 app 进行处理

![uni](../../public//work/peizhi.png)

如上图所示，我们需要用到高德用户名和相关 key，在这里我们需要在[高德开放平台](https://lbs.amap.com/)申请`appkey_android`，在控制台=>我的应用中添加相关的 key

![uni](../../public//work/key.png)

![uni](../../public//work/yun.png)

这里使用的是原生 APP 云打包。

- key 的名称可以随便取
- 服务平台根据自己的需求添加
- 发布版本安全码 SHA1：点击[如何获取](https://lbs.amap.com/faq/android/map-sdk/create-project/43112)，进入后这里需要安装 java jdk，配置好全局变量后，在证书文件（.keystore）所在的文件下打开`cmd`窗口输入`keytool -list -v -keystore zqt.keystore`后，再输入证书密码（对应证书私钥密码），就可以获取到`SHA1`码。
- PackageName：对应打包时的包名（这里就是 Android 包名）。

## 图片预加载

场景：H5 页面，用户在点击 Tab 不同位置时，需要切换对应 Tab 容器的背景图。

使用`requestIdleCallback`与`window.onload`实现

```js
function autoPreloadImages() {
  // 使用 require.context 动态获取指定文件夹及其子文件夹下的所有图片
  // require.context(目录, 是否递归, 匹配文件的正则表达式)
  const files = require.context('../../assets/img', true, /^./.*pre-.*.(png|jpe?g|gif|webp)$/i);

  // 调用 files.keys() 获取匹配的文件路径数组，并通过 files(key) 获取每个文件的实际 URL
  const urls = files.keys().map(key => files(key));

  // 检查浏览器是否支持 requestIdleCallback 方法
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      preloadImages(urls);
    });
  } else {
    // 如果浏览器不支持 requestIdleCallback，则使用 window.onload 事件作为后备方案
    window.addEventListener('load', event => {
      preloadImages(urls);
    });
  }

  // 定义图片预加载函数
  function preloadImages(urls) {
    urls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }
}
```

## 手写 promise

```js
const { error } = require("console");

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
//添加到微任务
function runMicrotask(fn) {
  if (typeof queueMicrotask === "undefined") {
    queueMicrotask(fn);
  } else if (
    typeof process === "object" &&
    typeof process.nextTick === "function"
  ) {
    //node环境
    process.nextTick(fn);
  } else if (typeof MutationObserver === "Object") {
    const text = document.createTextNode("");
    const observer = new MutationObserver(fn);
    observer.observe(text, {
      characterData: true,
    });
    text.data = "1";
  } else {
    setTimeout(fn);
  }
}
class MyPromise {
  #state = PENDING;
  #value;
  #handlers = [];
  constructor(executor) {
    const resolve = (v) => {
      this.#setState(FULFILLED, v);
    };
    const reject = (v) => {
      this.#setState(REJECTED, v);
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  #setState(state, value) {
    if (this.#state !== PENDING) return;
    this.#value = value;
    this.#state = state;
    this.#runTask();
  }
  #runTask() {
    runMicrotask(() => {
      this.#handlers.forEach((cb) => cb());
      this.#handlers = [];
    });
  }
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handlers.push(() => {
        const cb = this.#state === FULFILLED ? onFulfilled : onRejected;
        const res = typeof cb === "function" ? cb(this.#value) : this.#value;
        //判断是否是是promise
        if (typeof res?.then == "function") {
          res.then(resolve, reject);
        } else {
          resolve(res);
        }
      });
      if (this.#state !== PENDING) {
        this.#runTask();
      }
    });
  }
  //catch方法不是promise a+规范 而是es6
  catch(onRejected) {
    return this.then(null, onRejected);
  }
}

const p = new MyPromise((resolve, reject) => {
  reject("完成");
});
```

## 性能优化

**1、启用前端缓存**

缓存范围：有哈希值的文件设置强缓存即可。没有哈希值的文件（比如 index.html）设置协商缓存，缓存主要针对静态资源

缓存可以解决的问题

- 减少不必要的网络传输，节约带宽。
- 更快的页面加载速度。
- 减少服务器负载。

缺点：占内存（有些缓存会被存到内存中）

**强制缓存（强缓存）基于 Cache-control**

浏览器判断请求的目标资源有效命中强缓存，如果命中，则可以直接从内存中读取目标资源，无需与服务器做任何通讯

`Cache-control`的属性：

- max-age 客户端资源的缓存时长。
- s-maxage 代理服务器的缓存时长。
- no-cache 表示是强制进行协商缓存。
- no-store 是表示禁止任何缓存策略。
- public 表示资源即可以被浏览器缓存也可以被代理服务器缓存。
- private 表示资源只能被浏览器缓存。

注：public 表示资源在客户端和代理服务器都可以被缓存，private 则表示资源只能在客户端被缓存，拒绝资源在代理服务器缓存，如果这两个属性值都没有被设置，则默认为 private，public 和 private 也是一组互斥属性。他们两个不能同时出现在响应头的 cache-control 字段中。

**协商缓存 （ETag）**

实现协商缓存就需要设置`no-cache`

`ETag`是通过比较指纹（文件的唯一哈希值）实现协商缓存

流程：

- 第一次请求某资源的时候，服务端读取文件并计算出文件指纹，将文件指纹放在响应头的 etag 字段中跟资源一起返回给客户端。
- 第二次请求某资源的时候，客户端自动从缓存中读取出上一次服务端返回的 ETag 也就是文件指纹。并赋给请求头的 if-None-Match 字段，让上一次的文件指纹跟随请求一起回到服务端。
- 服务端拿到请求头中的 is-None-Match 字段值（也就是上一次的文件指纹），并再次读取目标资源并生成文件指纹，两个指纹做对比。如果两个文件指纹完全吻合，说明文件没有被改变，则直接返回 304 状态码和一个空的响应体并 return。如果两个文件指纹不吻合，则说明文件被更改，那么将新的文件指纹重新存储到响应头的 ETag 中并返回给客户端

**2、开启 GZIP 压缩**

这里以`vite+vue`项目为例

安装插件

```sh
npm install vite-plugin-compression --save-dev
```

配置

```ts
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import compression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    vue(),
    compression({
      // 压缩算法，可以选择 'gzip' 或 'brotli'
      algorithm: "gzip",
      // 是否压缩所有文件，默认值为 false
      verbose: true,
      // 只压缩超过这个大小的文件，单位为字节
      threshold: 10240,
      // 最小文件大小
      minRatio: 0.8,
    }),
  ],
});
```

以上配置完成后要确保你所用的服务器能正确处理 gzip 文件

**3、代码层面**

- 使用函数节流和函数防抖
- 减少重排和重绘
- 尽量使用 CSS 完成动画效果
- 使用懒加载、骨架屏
- ......
