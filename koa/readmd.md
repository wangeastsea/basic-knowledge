# koa 
一个简单的例子

```
const { createCipher } = require('crypto')
const Koa = require('koa')
const app = Koa()
app.use((ctx, next) => {
    ctx.body = [
        {
            name: 'tom'
        }
    ]
    next()
})

app.use((ctx,next) => {
    if (ctx.url === '/html') {
        ctx.type = 'text/html;charset=utf-8'
        ctx.body = `<b>我的名字是:${ctx.body[0].name}</b>`
    }
})
app.listen(3000)
```

## koa 中间件机制

Koa中间件机制：Koa中间件机制就是函数式组合概念 Compose的概念，将⼀组需要顺序执⾏的函数复合为⼀个函数，外层函数的参数实际是内层函数的返回值。洋葱圈模型可以形象表示这种机制，是源码中的精髓和难点。也是运用了递归的机制。


## koa原理

### context
- koa为了了能够简化API，引⼊上下文context概念，将原始请求对象req和响应对象res封装并挂载到context上，并且在context上设置getter和setter，从⽽而简化操作

### koa 中间件规范

- ⼀个async函数
- 接收ctx和next两个参数
- 任务结束需要执⾏next

### 中间件常⻅任务
- 请求路由
- 路由
- 日志
- 静态文件服务

### router
```js
const Koa=require('./kkb')
const Router=require('./router')
const app=new Koa()
const router=new Router()
router.get('/index', async ctx=> { ctx.body='index page'})

router.get('/post', async ctx=> { ctx.body='post page' })

router.get('/list', async ctx=> { ctx.body='list page'})

router.post('/index', async ctx=> { ctx.body='post page'})
// 路路由实例例输出⽗父中间件 router.routes()
app.use(router.routes())
```

### 静态⽂文件服务koa-static
- 配置绝对资源⽬录地址，默认为static
- 获取文件或者⽬录信息
- 静态文件读取
- 返回