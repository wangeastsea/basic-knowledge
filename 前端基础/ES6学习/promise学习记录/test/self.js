function Wpromise(executor) {
    let self = this
    self.status = 'pending'
    self.value = undefined
    self.reason = undefined
    self.onFilfilledCallbacks = []
    self.onRejectedCallbacks = []
    function resolve (value) {
        if (self.status === 'pending') {
            self.value = value
            self.status = 'resolved'
            self.onFilfilledCallbacks.forEach(fn => fn())
        }

    }
    function reject (reason) {
        if (self.status === 'pending') {
            self.resaon = reason
            self.status = 'rejected'
            self.onRejectedCallbacks.forEach(fn => fn())
        }
    }
    try {
        executor(resolve, reject)
    } catch (e) {
        reject(e)
    }
}

Wpromise.prototype.then = function (onFilfilled, onRejected) {
    let self = this
    
        return promise2 = new Wpromise((resolve,reject) => {
            if (self.status === 'resolved') { 
                try {
                    let x = onFilfilled(self.value)
                    // x 可能是一个promise 或者是一个undefine或一个值
                    resolvePromiseHandle(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            }
            if (self.sataus === 'rejected') {
                try {
                    let x = onRejected(self.reason)
                    // x 可能是一个promise 或者是一个undefine或一个值
                    resolvePromiseHandle(promise2, x, resolve, reject)
                } catch (e)  {
                    reject(e)
                }
            }
            // 异步处理呢
            if (self.status === 'pending') {
                self.onFilfilledCallbacks.push(() => {
                    try {
                        onFilfilled(self.value)
                        resolvePromiseHandle(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
                self.onRejectedCallbacks.push(() => {
                    try {
                        onRejected(self.reason)
                        resolvePromiseHandle(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
        })
    }
}
module.exports = Wpromise