// let promise1 = new Promise((resolve, reject) => {
//     resolve('json')
// }).then((res) => {
//     console.log(res);
// })
class MockPromise {
    constructor(fn) {
        this.status = "pending"
        this.value = undefined
        this.fulFilledList = []
        fn(this.resolve.bind(this))
    }
    resolve (val) {
        // 延迟执行，提前注册
        setTimeout(() => {
            if (this.status !== 'pending') {
                return 
            } 
            this.status = 'fulfilled'
            this.value = val
            this.fulFilledList.forEach(item => item(val))
            this.fulFilledList = []
        }, 0)
    }
    then (onFuilfilled, onRejected) {
        const {value, status} = this
        return new MockPromise((onNextFulfilled, onNextRejected) => {
            function onFinalFulfilled(val) { 
                if (typeof onFuilfilled !== 'function') {
                    // 如果onFulfilled 不是函数，跳过
                    onNextFulfilled(val)
                } else {
                    const res = onFuilfilled(val)
                    if (res && typeof res.then === 'function') { 
                        // res 是一个promise
                        res.then(onNextFulfilled)
                    } else  {
                        // res 是非promise的话，则直接执行下一个onNextFulfilled
                        onNextFulfilled(res)
                    }
                }
            }
            switch(status) { 
                case 'pending': { 
                    this.fulFilledList.push(onFinalFulfilled)
                    break;
                }

            }
        })
    }
    catch(onRejected) {
        return this.then(null, onRejected)
    }
    static all(list) {
        return new MockPromise((resolve, reject) => {
            let count = 0 
            const values = []
            for(const [i , MockPromiseInstance] of list.entries()) {
                MockPromiseInstance.then(
                    res => {
                        values[i] = res
                        count++
                        if (count === list.length) {
                            resolve(values)
                        }
                    },
                    err => {
                        reject(err) 
                    }
                )
            } 
        })
    }
    static resolve(val) {
        return new MockPromise((resolve) => {
            resolve(val)
        })
    }
}

let promise1 = new MockPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('json')
    }, 0)
}).then((res) => {
    console.log(res);
    return '123'
}).then(res => {
    console.log(res);
})