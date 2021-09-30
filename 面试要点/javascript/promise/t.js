
const PENDING = "pending"
const FULFILLED = "fulfilled"
const REJECTED = "rejected"
class MockPromise {
    _status = PENDING
    fulfilledCallbacks = []
    rejectedCallbacks = []
    constructor(execute) {
        this.value = null
        this.reason = null
        try {
            execute(this.resolve.bind(this), this.reject.bind(this))
        } catch (error) {   
            this.reject(error)
        }
    }
    get status () {
        return this._status
    }
    set status (newStatus) {
        this._status = newStatus
        switch(newStatus) {
            case FULFILLED: {
                this.fulfilledCallbacks.forEach(cb => cb())
                break
            }
            case REJECTED: {
                this.rejectedCallbacks.forEach(cb => cb())
            }
        }
    }
    resolve(value) {
        if (this.status === PENDING) {
            this.value = value
            this.status = FULFILLED
        }
    }
    reject(resaon) {
        if (this.status === PENDING) {
            this.resaon = resaon
            this.status = REJECTED
        }
    }
    then(onFulfilled, onRejected) {
        let onRealFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
        let onRealRejected = typeof onRejected === 'function' ? onRejected: reason => reason
        let promise2 = new MockPromise((resolve, reject) => {
            const fulfilledMictask =  () =>  {
                queueMicrotask(() => {
                    try {
                        let x = onRealFulfilled(this.value)
                        this.resolvePromise(promise2, x ,resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            const rejectedMictask = () =>  {
                queueMicrotask(() => {
                    try {
                        let x = onRealRejected(this.resaon)
                        this.resolvePromise(promise2, x ,resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            switch(this.status) {
                case FULFILLED: {
                    fulfilledMictask()
                    break
                }
                case REJECTED: {
                    rejectedMictask()
                    break
                }
                case PENDING: {
                    this.fulfilledCallbacks.push(fulfilledMictask)
                    this.rejectedCallbacks.push(rejectedMictask)
                }
            }
        })
        return promise2
        
    }
    resolvePromise(promise2, x, resolve, reject) {
        if (promise2 === x) {
            return reject(new Error('this promise has cycle'))
        }
        if (x instanceof MockPromise) {
            x.then(
                y => {
                    this.resolvePromise(promise2, y, resolve, reject)
                },
                e => {
                    reject(e)
                }
            )
        } else if  (typeof x === 'object' || typeof x === 'function') {
            if (x === null) {
                resolve(x)
            }
            let then = null
            try {
                then = x.then
            } catch (error) {
                reject(error)
            }
            if (typeof then === 'function') {
                let called = false
                try {
                    then.call(
                        x, 
                        (y) => {
                             called = true
                             this.resolvePromise(promise2, y , resolve ,reject)
                        },
                        (e) => {
                            called = true
                            reject(e)
                        }
                    )
                } catch (error) {
                    if (called) return 
                    reject(error)
                }
            } else {
                resolve(x)
            }
        } else {
            resolve(x)
        }
    }   
    static resolve(val) {
        return MockPromise((resolve) => {
            this.resolve(val)
        })
    }
    static all(promiseList) {
        return new MockPromise((resolve ,reject) => {
            if (!Array.isArray(promiseList)) {
                return reject(new Error('参数必须是一个数组'))
            }
            let len = promiseList.length
            let counter = 0
            let res = []
            for ( let [index, instance] of promiseList.entries()) {
                MockPromise.resolve(instance).then(
                    value => {
                        res[index] = value
                        counter++
                        if (counter === len) {
                            resolve(res)
                        }
                    },
                    error => {
                        reject(error)
                    }
                )     
            }

        })
    }
}


let p = new MockPromise((resolve ,reject) => {
    setTimeout(() => {
        resolve(2)
    }, 2000)
})

p.then((res) => {
    console.log(res);
})

p.then((res) => {
    console.log(res);
})

p.then((res) => {
    console.log(res);
})

p.then((res) => {
    console.log(res);
})