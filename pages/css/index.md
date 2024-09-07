## clip-path

在 css3 属性中，使用 clip-path 可以帮我们完成很多动态效果，自己也实现了一下 ，完成了一些动画效果，大家可以参考一下：

源码如下

```vue
<template>
  <div class="main">
    <div class="contentL">
      <div class="box1">
        <img class="img" src="/public/images/cat.png" alt="" />
      </div>
      <div class="box2">
        <img class="img" src="/public/images/cat1.png" alt="" />
      </div>
    </div>
    <div class="contentR">
      <div class="box3">
        <img class="img" src="/public/images/bridge.png" alt="" />
        <h1 class="text">This is the bridge in my hometown</h1>
      </div>
      <div class="box4">
        <div class="box5">
          <img class="img1" src="/public/images/mountain.png" alt="" />
          <img class="img2" src="/public/images/bridge.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="tsx" setup></script>
<style lang="scss" scoped>
.main {
  width: 100vw;
  height: 100vh;
  display: flex;
  .contentL {
    flex: 1;
    background-color: #eaedf7;
    .box1 {
      margin: 0 auto;
      width: 400px;
      height: 400px;
      background-color: black;
      .img {
        width: 400px;
        height: 400px;
        display: block;
        background-color: black;
        transition: 0.5s;
        clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
      }
    }
    .box2 {
      margin: 0 auto;
      margin-top: 29px;
      width: 400px;
      height: 400px;
      background-color: black;
      .img {
        width: 400px;
        height: 400px;
        background-color: black;
        animation: wink 3s infinite;
        clip-path: ellipse(50% 20% at 50% 50%);
        @keyframes wink {
          15% {
            clip-path: ellipse(50% 1% at 50% 50%);
          }
          30% {
            clip-path: ellipse(50% 20% at 50% 50%);
          }
          45% {
            clip-path: ellipse(50% 1% at 50% 50%);
          }
          60% {
            clip-path: ellipse(50% 40% at 50% 50%);
          }
        }
      }
    }
  }
  .box1:hover .img {
    clip-path: polygon(100% 0%, 100% 100%, 0% 100%, 0% 0%);
  }
  .contentR {
    flex: 2;
    .box3 {
      height: 50%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      background-color: #ebf6f7;
      position: relative;
      .img {
        display: block;
        height: 350px;
      }
      .text {
        color: white;
        position: absolute;
        top: 100px;
        transition: 1s;
        clip-path: inset(100% 0% 0% 0%);
      }
    }
    .box3:hover .text {
      clip-path: inset(0% 0% 0% 0%);
    }
    .box4 {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      height: 50%;
      background-color: #c1e4e9;
      .box5 {
        height: 200px;
        width: 500px;
        overflow: hidden;
        display: flex;
      }
      .img1 {
        width: 500px;
        height: 200px;
      }
      .img2 {
        width: 500px;
        height: 200px;
        transition: 1s;
        transform: translateX(-100%);
        clip-path: polygon(0 0, 0% 100%, 0% 50%);
        animation: offsetX 2s infinite;
      }
      // .box5:hover .img2 {
      //   clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 0 50%, 0% 0%);
      // }
      @keyframes offsetX {
        0% {
          clip-path: polygon(0 0, 18% 50%, 0 100%, 0% 100%, 0 50%, 0% 0%);
        }
        100% {
          clip-path: polygon(100% 0, 100% 52%, 100% 100%, 0 100%, 0 50%, 0 0);
        }
      }
    }
  }
}
</style>
```

下面是代码效果<br>

![PixPin_2024-04-08_15-53-55.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/19c68951783b4dbab9b582e9f9be58e7~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2560&h=1347&s=1799383&e=gif&f=78&b=d4e8ef)
