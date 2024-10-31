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


