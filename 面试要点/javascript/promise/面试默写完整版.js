
const PENDING = 'pending'
const FULFILLED = 'FULFILLED'
const REJECTED = 'rejected'

class MockPromise {
    // 每次在这里创建新的实例的时候，都会重置回调数组为空
    FULFILLED_CALLBACK_LIST = []
    REJECTED_CALLBACK_LIST = []
    // 维护一个内部的_status变量
    _status = PENDING
    constructor (fn) {
        this.status = PENDING
        this.value = null
        this.reason = null
        try {
            fn(this.resolve.bind(this), this.reject.bind(this))
        } catch (e) {
            this.reject(e)
        }
    }
    get status () {
        return this._status
    }
    set status (newStatus) {
        this._status = newStatus
        switch(newStatus) {
            case FULFILLED: {
                this.FULFILLED_CALLBACK_LIST.forEach(cb => { cb(this.value) })
                break;
            }
            case REJECTED: {
                this.REJECTED_CALLBACK_LIST.forEach(cb => {
                    cb(this.reason)
                })
                break;
            }
        }
    }
    resolve (value) {
        if(this.status === PENDING) {
            this.value = value
            this.status = FULFILLED
        }
    }
    reject(reason) {
        if (this.status = PENDING) {
            this.reason = reason 
            this.status = REJECTED
        }
    }
    then (onFulfilled, onRejected) {
        // 透传的处理
        const realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled: value => value
        const realOnRejected = typeof onRejected === 'function' ? onRejected: reason => reason
        const promise2 = new MockPromise((resolve, reject) => {
            const fulfilledMicrotask = () => {
                queueMicrotask(() => {
                    try {   
                        const x = realOnFulfilled(this.value) 
                        this.resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
            const rejectedMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        const x = realOnRejected(this.reason)
                        this.resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
            switch(this.status) {
                case FULFILLED: {
                    fulfilledMicrotask()
                    break;
                }
                case REJECTED: {
                    rejectedMicrotask()
                    break;
                }
                case PENDING: {
                    this.FULFILLED_CALLBACK_LIST.push(fulfilledMicrotask)
                    this.REJECTED_CALLBACK_LIST.push(rejectedMicrotask)
                }
            }
        })
        return promise2
    }
    resolvePromise(promise2, x, resolve, reject) {
        if (promise2 === x) {
            return reject(new TypeError('Chaining cycle detected for promise'))
        }
        if (x instanceof MockPromise) {
            // 如果 x 为 Promise ，则使 Promise2 接受 x 的状态
            // 也就是继续执行x，如果执行的时候拿到一个y，还要继续解析y
            queueMicrotask(() => {
                x.then((y) => {
                    this.resolvePromise(promise2, y, resolve, reject)
                }, reject)
            })
        } else if ( typeof x === 'object' || typeof x === 'function') {
            if (x === null) {
                return resolve(x)
            }
            let then = null
            try {
                then = x.then
            } catch (e) {
                 // 如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise
                 return reject(e)
            }
            if(typeof then === 'function') {
                let called = false
               try {
                   // 如果then是函数，将x作为函数的作用域this调用
                    then.call(
                        x, 
                        (y) => {
                            if (called) return 
                            called = true
                            this.resolvePromise(promise2, y ,resolve, reject)
                        },
                        (r) => {
                            if (called) return 
                            called = true
                            reject(r)
                        }
                    )
               } catch (e) {
                   if (called) return 
                   reject(e)
               }
            } else {
                 // 如果 then 不是函数，以 x 为参数执行 promise
                 resolve(x)
            }
        } else {
            resolve(x)
        }
    }
}



/**
 * 测试 1 : 透传测试
 */
// let p = new MockPromise((resolve, reject) => {
//     resolve(1)
// })
// p.then((val) => {
//     console.log(val)
//     return 2
// }).then(null).then(null).then((val) => {
//     console.log(val);
// })


/**
 * 异步测试 通过
 */
// new MockPromise((resolve, reject) => {
//     setTimeout(() => {
//         console.log(1);
//         resolve(2)
//     }, 1000)
// }).then((res) => {
//     console.log(res);
// })

/**
 *  验证then函数的同步性
 */
// new Promise((resolve, reject) => {
//     resolve(3)
// }).then((res) => {
//     console.log(res);
// }) 

// console.log(4);


/**
 *  验证  如果 Promise2 和 x 指向同一对象，以 TypeError 为据因拒绝执行 newPromise
 */

// let one = new MockPromise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(1)
//     }, 1000)
// })
// // 这种就是 x === promise2的情况，应该直接报错，防止死循环，因为返回的一直都是cc
// let cc = one.then((val)=> {
//     // 因为这段逻辑是异步执行的，所有已经存在cc，可以使用。
//     return cc
// })
// cc.then((res) => {
//     console.log('res', res)
// },(reason) => {
//     console.log(reason);
// } )

/**
 * thenable 的使用
 */
// let one  = new MockPromise((resolve,reject) => {
//     setTimeout(() => {
//         resolve(1)
//     }, 1000)
// })
// one.then((val) => {
//     console.log(val);
//     return {
//         then: function (resolve ,reject) {
//             resolve(2)
//             reject('error')
//         }
//     }
// }).then((res) => {
//     console.log(res);
// }).then(() => {}, (e) => {
//     console.log(e);
// })