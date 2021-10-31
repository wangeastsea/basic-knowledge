Parse HTML 任务在执行过程中会遇到一系列的子过程，比如在解析页面的过程中遇到了 JavaScript 脚本，那么就暂停解析过程去执行该脚本，等执行完成之后，再恢复解析过程。然后又遇到了样式表，这时候又开始解析样式表……直到整个任务执行完成。

异步回调是指回调函数在主函数之外执行，一般有两种方式：
- 第一种是把异步函数做成一个任务，添加到信息队列尾部；
- 第二种是把异步函数添加到微任务队列中，这样就可以在当前任务的末尾处执行微任务了。

![image.png](https://upload-images.jianshu.io/upload_images/5016475-b3ba17520fd096f0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/840)


```js

 function GetWebData(URL){
    /**
     * 1:新建XMLHttpRequest请求对象
     */
    let xhr = new XMLHttpRequest()

    /**
     * 2:注册相关事件回调处理函数 
     */
    xhr.onreadystatechange = function () {
        switch(xhr.readyState){
          case 0: //请求未初始化
            console.log("请求未初始化")
            break;
          case 1://OPENED
            console.log("OPENED")
            break;
          case 2://HEADERS_RECEIVED
            console.log("HEADERS_RECEIVED")
            break;
          case 3://LOADING  
            console.log("LOADING")
            break;
          case 4://DONE
            if(xhr.status == 200||xhr.status == 304){
                console.log(xhr.responseText);
                }
            console.log("DONE")
            break;
        }
    }

    xhr.ontimeout = function(e) { console.log('ontimeout') }
    xhr.onerror = function(e) { console.log('onerror') }

    /**
     * 3:打开请求  true 是发起异步请求
     */
    xhr.open('Get', URL, true);//创建一个Get请求,采用异步


    /**
     * 4:配置参数
     * 
     * 我们还可以通过xhr.responseType = "text"来配置服务器返回的格式，将服务器返回的数据自动转换为自己想要的格式，如果将 responseType 的值设置为 json，那么系统会自动将服务器返回的数据转换为 JavaScript 对象格式。
     */
    xhr.timeout = 3000 //设置xhr请求的超时时间
    xhr.responseType = "text" //设置响应返回的数据格式
    xhr.setRequestHeader("X_TEST","time.geekbang")

    /**
     * 5:发送请求
     */
    xhr.send();
}
```

XMLHttpRequest 的回调函数主要有下面几种：
- ontimeout，用来监控超时请求，如果后台请求超时了，该函数会被调用；
- onerror，用来监控出错信息，如果后台请求出错了，该函数会被调用；
- onreadystatechange，用来监控后台请求过程中的状态，比如可以监控到 HTTP 头加载完成的消息、HTTP 响应体消息以及数据加载完成的消息等。




结合此图来看：
![image.png](https://upload-images.jianshu.io/upload_images/5016475-b3ba17520fd096f0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/840)

渲染进程会将请求发送给网络进程，然后网络进程负责资源的下载，等网络进程接收到数据之后，就会利用 IPC（Inter-Process Communication）来通知渲染进程；渲染进程接收到消息之后，会将 xhr 的回调函数封装成任务并添加到消息队列中，等主线程循环系统执行到该任务的时候，就会根据相关的状态来调用对应的回调函数

#### ajax的跨域问题：
CORS http://www.ruanyifeng.com/blog/2016/04/cors.html
全称是"跨域资源共享"（Cross-origin resource sharing）。
![image.png](https://upload-images.jianshu.io/upload_images/5016475-4c11e4e9450e3f7f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/840)

测试代码：
```js

var xhr = new XMLHttpRequest()
var url = 'https://time.geekbang.org/'
function handler() {
    switch(xhr.readyState){
        case 0: //请求未初始化
        console.log("请求未初始化")
        break;
        case 1://OPENED
        console.log("OPENED")
        break;
        case 2://HEADERS_RECEIVED
        console.log("HEADERS_RECEIVED")
        break;
        case 3://LOADING  
        console.log("LOADING")
        break;
        case 4://DONE
        if(this.status == 200||this.status == 304){
            console.log(this.responseText);
            }
        console.log("DONE")
        break;
    }
}
   
function callOtherDomain() {
  if(xhr) {    
    xhr.open('GET', url, true)
    xhr.onreadystatechange = handler
    xhr.send();
  }
}
callOtherDomain()
```


#### 补充 之 HTTP混合内容
HTTPS 混合内容是 HTTPS 页面中包含了不符合 HTTPS 安全要求的内容，比如包含了 HTTP 资源，通过 HTTP 加载的图像、视频、样式表、脚本等，都属于混合内容。

![](https://upload-images.jianshu.io/upload_images/5016475-8288de2e3417627c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

使用ajax是无法访问的，会报错，但是在网页中是可以访问的。