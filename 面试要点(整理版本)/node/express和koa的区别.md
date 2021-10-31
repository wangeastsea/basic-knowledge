Express 框架出来比较久了，它在 Node.js 初期就是一个热度较高、成熟的 Web 框架，并且包括的应用场景非常齐全。同时基于 Express，也诞生了一些场景型的框架，常见的就如上面我们提到的 Nest.js 框架。

随着 Node.js 的不断迭代，出现了以 await/async 为核心的语法糖，Express 原班人马为了实现一个高可用、高性能、更健壮，并且符合当前 Node.js 版本的框架，开发出了 KOA 框架。

### 差异
- Express 封装、内置了很多中间件，比如 connect 和 router ，而 KOA 则比较轻量，开发者可以根据自身需求定制框架；
- Express 是基于 callback 来处理中间件的，而 KOA 则是基于 await/async；
- 在异步执行中间件时，Express 并非严格按照洋葱模型执行中间件，而 KOA 则是严格遵循的。


koa 的中间件原理：
```js
return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
```


### 多进程分发策略：

主进程接收所有的请求， 通过一定的负载均衡策略分发到不同的node.js子进程中
#### 主进程监听一个端口， 子进程不监听端口， 通过主进程分发请求到子进程  ->  cluster模式
##### 问题一： cluster是如何做到多个进程监听一个端口的
        eventEmitter,完成主子进程间的绑定，并且只监听一个端口，采用IPC通信
##### 问题二： node.js 是如何做负载均衡请求分发的
    
####  主进程和子进程分别监听不同端口，通过主进程分发请求到子进程

### PM2原理
PM2 是守护进程管理器，可以帮助管理和保持应用进程
```
npm install pm2@latest -g
yarn global add pm2
pm2 start app.js
pm2 list
```

### 如何分析内存泄漏
- heapdump 内存快照的工具
- chrome dev tools 中的 memory Profiles



