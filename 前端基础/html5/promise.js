const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

function reslovePromsie(promise2, x, resolve, reject) {

}
class JPromise {
    constructor(executor) {
        this.status = PENDING
        this.value = undefined
        this.reason = undefined
        this.onResolvedCallbacks = []
        this.onRejectedCallBacks = []
        let resolve = value => {
            if(this.status === PENDING) {
                this.status = RESOLVED
                this.value = value
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }
        let reject = reason => {
            if(this.status === PENDING) {
                this.status = REJECTED
                this.reason = reason
                this.onRejectedCallBacks.forEach(fn => fn())
            }
        }
        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }
    then(onfilfulled, onrejected) {
        let promise3 = new JPromise((resolve, reject) => {
            if(this.status === RESOLVED) {
                queueMicrotask(() => {
                    let x = onfilfulled(this.value)
                    reslovePromsie(promise3, x, resolve, reject)
                })
            }
            if(this.status === RESOLVED) {
                queueMicrotask(() => {
                    let x = onrejected(this.reason)
                    reslovePromsie(promise3, x, resolve, reject)
                })
            }
            if(this.status === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    queueMicrotask(() => {
                        let x = onfilfulled(this.value)
                        reslovePromsie(promise3, x, resolve, reject)
                    })
                })
            }
        })
        if(this.status === RESOLVED) {
            onfilfulled(this.value)
        }
        if(this.status === REJECTED) {
            onrejected(this.reason)
        }
        if(this.status === PENDING) {
            this.onResolvedCallbacks.push(() => {
                onfilfulled(this.value)
            })
            this.onRejectedCallBacks.push(() => {
                onrejected(this.reason)
            })
        }
    }
}

const p = new JPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('hello world')
    }, 1000);
})

p.then(val => {
    console.log(val)
}, err => {
    console.log(err)
})