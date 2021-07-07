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
    // 闭包的使用
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

