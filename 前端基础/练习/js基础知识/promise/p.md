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