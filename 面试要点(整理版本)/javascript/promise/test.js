const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'



class MockPromise {
    fulfilledCallbacks = []
    rejectedCallbacks = []
    _status = PENDING
    constructor(executor) {
        this.status = PENDING
        try {  
            executor(this.resolve.bind(this), this.reject.bind(this))
        } catch (error) {
            thie.reject(error)
        }
    }
    get status () {
        return this._status
    }
    set status (newStatus) {
        this._status = newStatus
        switch(newStatus) {
            case FULFILLED: {
                this.fulfilledCallbacks.forEach(cb => { cb(this.value) })
                break
            }
            case REJECTED: {
                this.rejectedCallbacks.forEach(cb => {cb(this.reason)})
            }
        }
    }
    resolve(value) {
        if(this.status === PENDING) {
            this.value = value
            this.status = FULFILLED
        }
    }
    reject(reason) {
        if(this.status === PENDING) {
            this.reason = reason
            this.status = REJECTED
        }
    }

    then(onFulfilled, onRejected) {
        let  realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
        let realOnRejected = typeof onRejected === 'function' ? onRejected: reason => reason
        let promise2 = new MockPromise((resolve, reject) => {
            const fulfilledMicrotask = () => {
                queueMicrotask(() => {
                    try { 
                        const x = realOnFulfilled(this.value)
                        this.resolvePromsie(promise2, x , resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            const rejectedMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        const  x = realOnRejected(this.reason)
                        this.resolvePromsie(promise2, x , resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            switch(this.status) {
                case FULFILLED: {
                    fulfilledMicrotask()
                    break
                }
                case REJECTED: {
                    rejectedMicrotask()
                    break
                }
                case PENDING: {
                    this.fulfilledCallbacks.push(fulfilledMicrotask)
                    this.rejectedCallbacks.push(rejectedMicrotask)
                }
            }
        })  
        return promise2
    }
    resolvePromsie(promise2, x, resolve, reject) {
        if (promise2 === x) {
            reject(new Error('the promise has a cycle'))
        }
        if (x instanceof MockPromise) {
            queueMicrotask(() => {
                x.then((y) => {
                    this.resolvePromsie(promise2, y ,resolve, reject)
                }, reject)
            })
        } else if (typeof x === 'object' || typeof x === 'function') {
            if (x === null) {
                resolve(x)
            }
            let then = null
            try {
                then = x. then
            } catch (error) {
                reject(error)
            }
            if (typeof then === 'function') {
                let called = false
                try {
                    then.call(x, (y) => {
                        if (called) return 
                        called = true
                        this.resolvePromsie(promise2, y ,resolve, reject)
                    }, (r) => {
                        if (called) return 
                        called = true
                        reject(r)
                    })                   
                } catch (error) {
                    if (called) return 
                    reject(error)
                }
            } else {
                resolve(XSLTProcessor)
            }
        } else {
            resolve(x)
        }
    }
    catch(onRejected) {
        return this.then(null, onRejected)
    }
    static all(list) {
        return new MockPromise((resolve, reject) => {
            if (!Array.isArray(list)) {
                return reject(new Error('传入的必须是数组'))
            }
            const values = []
            let count = 0
            for(const [i, MockPromiseInstance] of list.entries()) {
                MockPromise.resolve(MockPromiseInstance).then(res => {
                    values[i] = res
                    count++
                    if (count === list.length) {
                        resolve(values)
                    }
                }, err=> {
                    // 只要报错，就全部报错
                    reject(err)
                })
            }
        })
    }
    static resolve(val) {
        return new MockPromise((resolve, reject) => {
            resolve(val)
        })
    }
    static race(list) {
        return new MockPromise((resolve, reject) => {
            for(const [i , mockInstance] of list.entries()) {
                mockInstance.then(res => {
                    resolve(res)
                }, err => {
                    reject(err)
                })
            }
        })
    } 
}


let p = new MockPromise((resolve,reject) => {
    setTimeout(() => {
        resolve(1)
    })
}).then((res) => {
    console.log(res)
    return 2
}).then (res => {
    console.log(res)
}) 