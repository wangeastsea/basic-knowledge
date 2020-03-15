var xhr = new XMLHttpRequest()
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            console.log(xhr.responseText)
        }
    }
}
xhr.open('GET', '/api', false)
xhr.send(null)

// 有两处状态码需要说明。xhr.readyState是浏览器判断请求过程中各个阶段的，
// xhr.status是 HTTP 协议中规定的不同结果的返回状态说明


// xhr.readyState的状态码说明：

// 0 -代理被创建，但尚未调用 open() 方法。
// 1 -open() 方法已经被调用。
// 2 -send() 方法已经被调用，并且头部和状态已经可获得。
// 3 -下载中， responseText 属性已经包含部分数据。
// 4 -下载操作已完成

// xhr.status即 HTTP 状态码，有 2xx 3xx 4xx 5xx 这几种，比较常用的有以下几种
// 200 正常
// 3xx
// 301 永久重定向。如http://xxx.com这个 GET 请求（最后没有/），就会被301到http://xxx.com/（最后是/）
// 302 临时重定向。临时的，不是永久的
// 304 资源找到但是不符合请求条件，不会返回任何主体。
// 如发送 GET 请求时，head 中有If-Modified-Since: xxx（要求返回更新时间是xxx时间之后的资源），如果此时服务器 端资源未更新，则会返回304，即不符合要求
// 404 找不到资源
// 5xx 服务器端出错了
// 看完要明白，为何上述代码中要同时满足xhr.readyState == 4和xhr.status == 200