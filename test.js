const { throws } = require("assert")

function Wpromise (executor) {
    let self = this
    self.status = "pending"
    self.vaule = ''
    self.reason = ''
    self.onFulfilledCallback = []
    self.onRejectedCallback = []
    let resolve = function (value) {
        if (self.status === 'pending') {
            self.value = value
            self.status = 'resolved'
            self.onFulfilledCallback.forEach(fn => fn())
        }

    }
    let reject = function (reason) {
        if (self.status === 'pending') {
            self.reason = reason
            self.status = 'rejected'
            self.onRejectedCallback.forEach(fn => fn())
        }

    }
    try {
        executor(resolve,reject)
    } catch (e) {
        reject(e)
    }
}

Wpromise.prototype.then = function (onFulfiled, onRejected) {
    onFulfiled = typeof onFulfiled === 'function' ? onFulfiled : data => data
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}
    let promise2 =  new wPromise((resolve,reject) => {
        let self = this
        if (self.status === 'resolved') {
            // Todo异步的疑问点
            try {
                // x 可能是promise 或者 值
                let x =  onFulfiled(self.value)
                resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
                reject(error)
            }

        }
        if (self.status === 'rejected') {
            try {
                let x = onRejected(self.reason)
                resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
                reject(error)
            }
        }
        if (self.status === 'pending') {
            self.onFulfilledCallback.push(() => {
                try {
                    let x = onFulfiled(self.value)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            })
            self.onRejectedCallback.push(() => {
                try {
                    let x = onRejected(self.reason)
                    resolvePromise(promise2, x, resolve, reject)
                } catch(e) {
                    reject(e)
                }
            })
        }
    })
    return promise2
}

function resolvePromise (promise2, x , resolve ,reject) {
    if (x === promise2) {
        return new Error('maybe error')
    }
    let called
    // 判断X 可能是promise
    try {
        if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
            let then = x.then
            if (typeof then === 'function') {
                then.call(x, (y) => {
                    if(called) {
                        return 
                    }
                    called = true
                    //递归代码，去最后一层promise
                    resolvePromise(promise2, y, resolve, reject)
                }, err => {
                    if (called) {
                        return 
                    }
                    called = true
                    reject(err)
                })
            } else {
                // 说明是一个对象
                resolve(x)
            }
        } else {
            // 可能是一个string
            resolve(x)
        }
    } catch (e) {
        // 报错直接抛出
        if (called) return 
        called = true
        reject(e)
    }
} 