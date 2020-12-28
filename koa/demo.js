// const { createCipher } = require('crypto')
// const Koa = require('koa')
// const app = Koa()
// app.use((ctx, next) => {
//     ctx.body = [
//         {
//             name: 'tom'
//         }
//     ]
//     next()
// })

// app.use((ctx,next) => {
//     if (ctx.url === '/html') {
//         ctx.type = 'text/html;charset=utf-8'
//         ctx.body = `<b>我的名字是:${ctx.body[0].name}</b>`
//     }
// })
// app.listen(3000)



// const http = require('http')
// const server = http.createServer((req, res) => {
//     res.writeHead(200)
//     res.end('hello,world!')
// })

// server.listen(3000, () => {
//     console.log('3000')
// })


// getter 和setter例子

// const kaikeba= {
//     info:{ name: '开课吧', desc: '开课吧真不不错' },
//     get name(){ return this.info.name },
//     set name(val) {
//         console.log('new name is'+val)
//         this.info.name = val    
//     }
// }
// console.log(kaikeba.name)
// kaikeba.name='kaikeba'
// console.log(kaikeba.name)



const add = (x,y) => x+y
const square = z => z * z 
// const fn = (x,y) => square(add(x,y))
// console.log(fn(1,2))

// const compose = (fn1, fn2) => (...args) => fn2(fn1(...args))
// const fn = compose(add, square)


// 多个函数组合

// const compose = (...[first, ...other]) => (...args) => {
//     let ret = first(...args)
//     other.forEach(fn => {
//         ret = fn(ret)
//     })
//     return ret
// }
// const fn = compose(add, square) 
// console.log(fn(1,2))


async function fn1(next) {
    console.log('fn1')
    await next()
    console.log('end fn1')
}

async function fn2(next) {
    console.log('fn2')
    await delay()
    await next()
    console.log('end fn2')
}

function fn3(next) {
    console.log('fn3')
}


function delay () {
    return new Promise((resolve,reject) =>{
        setTimeout(() => {
            resolve()
        }, 2000)
    })
}


function compose(middlewares) {
    return function () {
        return dispatch(0)
        function dispatch (i) {
            let fn = middlewares[i]
            if (!fn) {
                return Promise.resolve()
            }
            return Promise.resolve(
                fn(function next () {
                    // promise完成后，再执⾏下⼀个
                    return dispatch(i+1)
                })
            )
        }
    }
}

const middlewares = [fn1, fn2, fn3]
const finalFn = compose(middlewares)
finalFn()