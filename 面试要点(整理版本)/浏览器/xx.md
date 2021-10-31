 ### 渲染机制
- 什么是docType以及作用
    DTD（document type definition, 文档类型定义）规定了浏览器使用哪种方式来解析文档，以及切换浏览器模式。 
    docType 是用来声明文档的类型 和DTD规范的。验证文件的合法性。如果文件不合法，则解析时会报错。
    <!DOCTYPE html>
- 浏览器的渲染过程    

    ![image.png](https://upload-images.jianshu.io/upload_images/5016475-51489f18eb1dc281.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 重排Reflow
    -  概念：Dom 结构中，每一个元素都有自己的盒子，这些需要浏览器根据各种样式
    来计算，并根据计算结果将元素放到它该出现的位置，此过程叫做reflow。
    - 触发条件
        - 增加，删除，修改dom节点时，会触发 Reflow 和 repaint
        - 当移动dom的位置，或者加一个动画
        - 修改css 位置属性时
        - 当resize 窗口时
        - 当修改网页的默认字体时
- 重绘 repaint
    - 概念： 位置信息不变，但是涉及到颜色的改变
    - 触发：  css 颜色的改动等
- 布局layout
 ### js运行机制
参见极客时间 浏览器原理，多啃几遍
 ### 页面性能
 提升页面的性能有哪些？
 - 资源压缩合并，减少http请求
 - 非核心代码异步加载
    - 异步加载的方式有哪些
        - 动态脚本加载 
            动态创建dom节点
        - defer
        - async
    - 异步加载的区别
        - defer 是在html解析完成之后执行的，如果多个，则按照加载顺序依次执行。
        - async 是在加载完之后立即执行，如果多个，执行顺序和加载顺序无关。
 - 使用浏览器缓存
    - 缓存的分类
        - 强缓存
            - Expires  绝对时间 （可能跟客户端时间不一致，所以不准确）
            - Cache-Control  Cache-Control： max-age = 3600 (s) 相对时间
            - 同时存在与请求时，Cache-Control的优先级大于Expires
        - 协商缓存
            - Last-Modified(服务端下发) if-Modified-Since(浏览器请求时携带到请求头里)
            - Etag(hash值，内容的变化)  If-None-Match(浏览器请求时携带到请求头里)
    - 缓存的原理
 - 使用cdn 
 - 预解析dns
 ```
 a标签默认是打开了预解析的，如果页面的协议是https的，浏览器是默认关闭的，
 通过这句话，是强制打来预解析
 <meta http-equiv="x-dns-prefetch-control" content="on">
 <!-- 开启预解析 -->
 <link rel="dns-prefetch" href="//host_name_to_prefetch.com">
 ```

 ### 错误监控
 - 前端错误分类
    - 即时运行错误： 代码错误
    - 资源加载错误
 - 错误的捕获方式
    - 即时运行错误捕获方式
        - try catch
        - window.onerror
    - 资源加载序错误
        - object.onerror imgDom.onerror（这里阻止了冒泡，所以window.onerror不执行，但是捕获可以 ）
        - performance.getEntries() 间接获取加载失败的方式
        - Error 事件捕获  捕获阶段可以触发错误，但是冒泡阶段不能触发
            ```html
            <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>错误监控</title>
                    <script>
                        window.addEventListener('error', (e) => {
                            console.log(e)
                        }, true)
                    </script>

                </head>
                <body>
                    <script src="//baid.com/tes/1"></script>
                </body>
                </html>
            ```
        - 如果跨域的JS运行错误，可以捕获到吗？错误提示是什么？该怎么处理？
        答： 所有跨域JS的错误，都是 script error
        ![image.png](https://upload-images.jianshu.io/upload_images/5016475-0d0dde51d3eb3ae7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/640)
        解决方法： 
         - 在script标签增加 crossorigin 属性
         - 设置js资源响应头Access-Control-Allow-Origin: * (在服务器做的)
  
  
  
  TODO： 补充  
 - 上报错误的基本原理
    - 采取Ajax 通信上报
    - 利用Image对象上报
        ```html
        <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>上报</title>
            </head>
            <body>
                <script>
                    (new Image()).src = "http://baidu.com/testjs?r=sfdasdf"
                </script>
            </body>
            </html>
        ```


# 浏览器的命题方向：
https://cloud.tencent.com/developer/article/1610536
