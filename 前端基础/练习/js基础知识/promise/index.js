const PENDDING = 'pendding'
const RESOLVED = 'resolved'
const REJECTED ='rejected'
class WPromise {
    status = PENDDING
    value = undefined
    reason = undefined
    // 成功的回调
    onFuifilledCallBack = []
    // 失败的回调
    onRejectedCallBack = []
    constructor(fn) {
        // fn promise执行器,同步执行
        try {
            fn(this.resolve.bind(this), this.reject.bind(this))
        } catch (e) {
            // 捕获执行器的错误
            this.reject(e)
        }
    }
    resolve(val) {
        // 状态只能改变一次
        if (this.status === PENDDING) {
            this.status = RESOLVED
            this.value = val
            while(this.onFuifilledCallBack.length) {
                this.onFuifilledCallBack.shift()()
            }
        }
    }
    reject(reason) {
        if (this.status === PENDDING) {
            this.status = REJECTED
            this.reason = reason
            while(this.onRejectedCallBack.length) {
                this.onRejectedCallBack.shift()()
            }
        }
    }
    // 闭包的使用 onFuifilled, onRejected是微任务，这里用 setTimeout delay =0 来模拟
    then(onFuifilled, onRejected) {
        let promise2 = new WPromise((resolve, reject) => {
            onFuifilled = isFunction(onFuifilled) ? onFuifilled : val => val
            onRejected = isFunction(onRejected) ? onRejected : reason => {throw reason }
            if (this.status === RESOLVED) {
                setTimeout(() => {
                    try {
                        let x = onFuifilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        // 捕获onFuifilled的报错，传递给下一个then失败的回调函数
                        reject(e)
                    }
                }, 0)
            }    
            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        // 捕获onFuifilled的报错，传递给下一个then失败的回调函数
                        reject(e)
                    }
                },0)
            }
            if (this.status === PENDDING) {
                this.onFuifilledCallBack.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFuifilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            // 捕获onFuifilled的报错，传递给下一个then失败的回调函数
                            reject(e)
                        }
                    }, 0)
                })
                this.onRejectedCallBack.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            // 捕获onFuifilled的报错，传递给下一个then失败的回调函数
                            reject(e)
                        }
                    },0)
                })
            }
        })
        return promise2
    }   
}
function resolvePromise(promise2, x , resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError(' TypeError: Chaining cycle detected for promise #<Promise>'))
    }
    if (x instanceof WPromise) {
        x.then(resolve, reject)
    } else {
        resolve(x)
    }
}
function isFunction(fn) {
    return typeof fn === 'function'
}

let cc = new Promise((resolve, reject) => {
    resolve(1)
})
// TypeError: Chaining cycle detected for promise #<Promise>
let p1 = cc.then((val) => {
    console.log(val);
    // 之所以可以获取到aa,onFuifilled一定是异步的情况
    return p1
})

p1.then(() => {}, (reason) => {
    console.log(reason.message);
})

// 透传
// cc.then().then().then().then((res) => {
//     console.log(res);
// })