const PENDING = "pending"
const REJECTED = "rejected"
const FULFILLED = "fulfilled"

class MockPromise {
    _status = PENDING
    fulfilledCallbacks = []
    rejectedCallbacks = []
    constructor(executor) {
        this.value = null
        this.reason = null
        try {
            executor(this.resolve.bind(this), this.reject.bind(this))
        } catch (error) {
            this.reject(error)
        }
    }
    get status() {
        return this._status
    }
    set status (newStatus) {
        this._status = newStatus
        switch(newStatus) {
            case FULFILLED: {
                this.fulfilledCallbacks.forEach(cb => cb())
                break;
            }
            case REJECTED: {
                this.rejectedCallbacks.forEach(cb => cb())
                break;
            }
        }
    }
    resolve(value) {
        if (this.status === PENDING) {
            this.value = value
            this.status = FULFILLED
        }
    }
    reject(reason) {
        if (this.status === PENDING) {
            this.reason = reason
            this.status = REJECTED
        }
    }
    isFunction(param) {
        return typeof param === 'function';
    }
    then(onFulfilled, onRejected) {
        const realOnFulfilled = this.isFunction(onFulfilled) ? onFulfilled : (value) => {
            return value
        }
        const realOnRejected = this.isFunction(onRejected) ? onRejected : (reason) => {
            throw reason;
        };
        const promise2 = new MockPromise((resolve, reject) => {
            let fulfillMicroTask = () => {
                    queueMicrotask(() => {
                        try {
                            let x = realOnFulfilled(this.value)
                            this.resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    })
            }
            let rejectedMicroTask = () => {
                    queueMicrotask(() => {
                        try {
                            let x = realOnRejected(this.reason)
                            this.resolvePromise(promise2, x, resolve, reject)  
                        } catch (error) {
                            reject(error)
                        }
                    })
            }
            switch(this.status) {
                case FULFILLED: {
                    fulfillMicroTask()
                    break
                }
                case REJECTED: {
                    rejectedMicroTask()
                    break
                }
                case PENDING: {
                    this.fulfilledCallbacks.push(fulfillMicroTask)
                    this.rejectedCallbacks.push(rejectedMicroTask)
                }
            }
        })
        return promise2
    }
    catch (onRejected) {
        return this.then(null, onRejected)
    }
    resolvePromise(promise2, x , resolve, reject) {
        if (x === promise2) {
            return reject(new error('the promise has cycle'))
        }
        if (x instanceof MockPromise) {
            queueMicrotask(() => {
                x.then(
                    y => {
                        this.resolvePromise(promise2, y , resolve, reject)
                    },
                    e => {
                        reject(e)
                    }
                )
            })
        } else if (typeof x === 'object' || typeof x === 'function') {
            if (x === null) {
                return resolve(x)
            }
            let then
            try {
                then = x.then
            } catch (error) {
                return reject(error)
            }
            if (typeof then === 'function') {
                let called = false
                try {
                    then.call(x, 
                        (y) => {
                            if (called) return 
                            called = true
                            this.resolvePromise(promise2, y , resolve, reject)
                        },
                        (e) => {
                            if (called) return 
                            called = true
                            reject(e)
                        }
                    )
                } catch (error) {
                    if (called) return 
                    called = true
                    reject(error)
                }
            } else {
                resolve(x)
            }
        } else {
            resolve(x)
        }
    }
    static all(list) {
        return new MockPromise((resolve, reject) => {
            if (!Array.isArray(list)) {
                return reject(new Error('参数必须是数组'))
            }
            let counter = 0 
            let res = []
            let len = list.length
            for(let i =0 ; i< len; i++) {
                list[i].then((value) => {
                    counter++
                    res[i] = value
                    if (counter === list.length) {
                        resolve(res)
                    }
                }, (error) => {
                    reject(error)
                })
            }
        })
    }
    static resolve(value) {
        if (value instanceof MockPromise) {
            return value
        }
        return new MockPromise((resolve) => {
            resolve(value)
        })
    }
    static reject(reason) {
        return new MockPromise((resolve, reject) => {
            reject(reason)
        }) 
    }
    static allSettled(list) {
        let promiseList = Array.from(list).map(item => {
            return MockPromise.resolve(item).then(
                (res) => {
                    return {
                        status: 'success',
                        value: res
                    }
                },
                (error) => {
                    return {
                        status: 'error',
                        reason: error
                    }
                }
            )
        })
        return MockPromise.all(promiseList)
    }
    static race(list) {
        return new MockPromise((resolve, reject) => {
            let len = list.length
            if (length === 0) {
                return resolve()
            } else {
                for(let i = 0 ; i < len; i++) {
                    len.then(
                        (value)=> {
                        return resolve(value)
                        },
                        (reason) => {
                            return reject(reason)
                        }
                    )
                }
            }
        } )
    }
}


let p1 = new MockPromise((resolve) => {
    resolve('111')
})
let p2 = new MockPromise((resolve) => {
    setTimeout(() => {
        resolve('222')
    }, 2000)
})
let p3 = new MockPromise((resolve) => {
    resolve('333')
})

let p4 = new MockPromise((resolve, reject) => {
    setTimeout(() => {
        reject('error')
    }, 1000)
})

MockPromise.allSettled([p1,p2,p3, p4]).then(e => {
    console.log(e);
})
// MockPromise.all([p1, p2, p3]).then(res => {
//     console.log(res);
// }).catch((e) => {
//     console.log(e);
// })

