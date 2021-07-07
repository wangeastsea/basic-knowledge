#### 第一版 实现一个的同步执行promise
```js
class WPromise {
    status = 'pendding'
    value = ''
    reason = ''
    constructor(fn) {
        // fn promise执行器,同步执行
        fn(this.resolve.bind(this), this.reject.bind(this))
    }
    resolve(val) {
        // 状态只能改变一次
        if (this.status === 'pendding') {
            this.status = 'resolved'
            this.value = val
        }
    }
    reject(reason) {
        if (this.status === 'pendding') {
            this.status = 'rejected'
            this.reason = reason
        }
    }
    then(onFuifilled, onRejected) {
        if (this.status === 'resolved') {
            onFuifilled(this.value)
        }    
        if (this.status === 'rejected') {
            onRejected(this.value)
        }
    }
}

```
测试🌰
```js
let aa = new WPromise((resolve, reject) => {
    resolve(1)
}).then((res) => {
    console.log(res)
})
```
#### 实现一个异步执行的promise
```js
class WPromise {
    status = 'pendding'
    value = ''
    reason = ''
    // 成功的回调
    onFuifilledCallBack = []
    // 失败的回调
    onRejectedCallBack = []
    constructor(fn) {
        // fn promise执行器,同步执行
        fn(this.resolve.bind(this), this.reject.bind(this))
    }
    resolve(val) {
        // 状态只能改变一次
        if (this.status === 'pendding') {
            this.status = 'resolved'
            this.value = val
            while(this.onFuifilledCallBack.length>0) {
                this.onFuifilledCallBack.shift()(this.value)
            }
        }
    }
    reject(reason) {
        if (this.status === 'pendding') {
            this.status = 'rejected'
            this.reason = reason
            while(this.onRejectedCallBack) {
                this.onRejectedCallBack.shift()(this.value)
            }
        }
    }
    then(onFuifilled, onRejected) {
        if (this.status === 'resolved') {
            onFuifilled(this.value)
        }    
        if (this.status === 'rejected') {
            onRejected(this.value)
        }
        if (this.status === 'pendding') {
            this.onFuifilledCallBack.push(onFuifilled)
            this.onRejectedCallBack.push(onRejected)
        }
    }
}
```
测试🌰
```js
// 目前then还不能调用，我们马上解决这个问题
let aa = new WPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(1)
    }, 1000)
}).then((res) => {
    console.log(res)
})
```
#### 实现promise的链式调用，then返回的也是一个promise
能够把上一个promise的返回值，传递给下一个promise
```js
class WPromise {
    status = 'pendding'
    value = ''
    reason = ''
    // 成功的回调
    onFuifilledCallBack = []
    // 失败的回调
    onRejectedCallBack = []
    constructor(fn) {
        // fn promise执行器,同步执行
        fn(this.resolve.bind(this), this.reject.bind(this))
    }
    resolve(val) {
        // 状态只能改变一次
        if (this.status === 'pendding') {
            this.status = 'resolved'
            this.value = val
            while(this.onFuifilledCallBack.length>0) {
                this.onFuifilledCallBack.shift()(this.value)
            }
        }
    }
    reject(reason) {
        if (this.status === 'pendding') {
            this.status = 'rejected'
            this.reason = reason
            while(this.onRejectedCallBack.length>0) {
                this.onRejectedCallBack.shift()(this.reason)
            }
        }
    }
    then(onFuifilled, onRejected) {
        let promise2 = new WPromise((resolve, reject) => {
            if (this.status === 'resolved') {
                let x = onFuifilled(this.value)
                resolve(x)
            }    
            if (this.status === 'rejected') {
                let x = onRejected(this.reason)
                resolve(x)
            }
            if (this.status === 'pendding') {
                this.onFuifilledCallBack.push((val) => {
                    let x = onFuifilled(val)
                    resolve(x)
                })
                this.onRejectedCallBack.push((reason) => {
                    let x = onRejected(reason)
                    console.log('error', x)
                    resolve(x)
                })
            }
        })
        return promise2
    }
}
```

```js
let aa = new WPromise((resolve, reject) => {
    setTimeout(() => {
        reject(new Error('报错啦'))
    }, 1000)
}).then((res) => {
    console.log('then1')
    return res 

}, (reason) => {
    console.log('resaon', reason)
    return 2
}).then((res) => {
    console.log('then2')
    console.log(res)
    return 3
}).then((res) => {
    console.log('then3')
    console.log(res)
})
```

#### 判断死循环的存在&透传&代码优化&全局捕获错误
```js
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
            // 透传处理
            onFuifilled = isFunction(onFuifilled) ? onFuifilled : val => val
            onRejected = isFunction(onRejected) ? onRejected : reason => {throw reason}
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
function resolvePromise(promise2, x , resolve, reject){
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
```
demo:
```js
// TypeError: Chaining cycle detected for promise #<Promise>
let p1 = cc.then((val) => {
    console.log(val);
    // 之所以可以获取到aa,onFuifilled一定是异步的情况
    return p1
})

p1.then(() => {}, (reason) => {
    console.log(reason.message);
})

```
下面是一个具有迷惑性的例子，好好看下
这2个例子的区别是什么，下面这个例子并不会报循环引用的问题
因为p1此时返回的是最后一个then生成的promise，跟第一个then是不同的promise
```js
let p1 = cc.then((val) => {
    console.log(val);
    // 之所以可以获取到aa,onFuifilled一定是异步的情况
    return p1
}).then(() => {}, (reason) => {
    console.log(reason.message);
})

```
透传例子
```JS
cc.then().then().then().then((res) => {
    console.log(res);
})

```


