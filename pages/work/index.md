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

## 中文输入法导致的高频事件
>场景：根据输入框的内容去后台进行模糊查询便于用户选择，实现：直接监听输入框的input事件进行模糊查询，在这种方式下英文是没有问题的，但是中文就会有bug，在输入过程中就触发了查询，这显然是不行的。
![search](../../public//work/search.png)

这里就需要使用合成事件`compositionstart` `compositionend`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<input type="text">

<script>
    let isCompleted = false;
    const input = document.querySelector('input');
    function search() {
        console.log('inputvalue===>', input.value)
    }
    input.addEventListener('input',()=>{
        if (isCompleted) return
        search()
    })
    input.addEventListener('compositionstart',()=>{
        console.log('开始')
        isCompleted = true
    })
    input.addEventListener('compositionend',()=>{
        console.log('结束')
        isCompleted = false
        search()
    })
</script>
</body>
</html>
```

## 大文件上传
>分片+多线程
```js
//main.js
const input = document.querySelector('input[type="file"]');
input.onchange = async function (e) {
    const file = e.target.files[0]
    console.time('chunks')
    const chunks = await cutFile(file)
    console.timeEnd('chunks')
    console.log(chunks)
}
//设置分片大小 1M
const CHUNK_SIZE = 1024 * 1024
//获取线程
const THREAD_COUNT = navigator.hardwareConcurrency || 4
function cutFile(file) {
    return new Promise(resolve => {
        //分为多少片
        const chunkCount = Math.ceil(file.size / CHUNK_SIZE)
        //每个进程的片数
        const threadCount = Math.ceil(chunkCount / THREAD_COUNT)
        //总分片数
        const result = []
        //已经完成的次数
        let finishCount = 0
        for (let i = 0; i < THREAD_COUNT; i++) {
            const worker = new Worker('./worker.js',{
                type:'module'
            });
            const start = i * threadCount
            //超出边界处理
            let end =(i + 1) * threadCount
            if (end > chunkCount)  end = chunkCount
            worker.postMessage({
                file,
                CHUNK_SIZE,
                start,
                end
            })
            worker.onmessage = (e) => {
                //按照顺序添加
                for (let i=start; i < end; i++) {
                    result[i] = e.data[i - start]
                }
                worker.terminate()
                finishCount++
                //判断所有线程是否完成
                if (finishCount === THREAD_COUNT){
                    resolve(result)
                }

            }
        }
    })
}
```
```js
//worker.js
function createChunk(file,index,size) {
    return new Promise((resolve, reject) => {
        const start = index * size
        const end = start + size
        const fileReader = new FileReader()
        const blob = file.slice(start, end)
        fileReader.onload = (e)=>{
            resolve({
                start,
                end,
                index,
                blob
            })
        }
        fileReader.readAsArrayBuffer(blob)
    })
}
onmessage = async function (e) {
    const {
        file,
        CHUNK_SIZE,
        start,
        end
    } = e.data
    const proms =[]
    for (let i = start; i < end; i++) {
        proms.push(createChunk(file,i,CHUNK_SIZE))
    }
    const chunks = await Promise.all(proms)
    postMessage(chunks)
}
```


