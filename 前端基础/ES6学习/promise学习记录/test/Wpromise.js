function Wpromise (executor) {
    let self = this
    self.value = undefined
    self.reason = undefined
    self.status = "pending"
    self.onFulfiledCallback = []
    self.onRejectedCallback = []
    function resolve(value) {
        if (self.status === "pending") {
            self.value = value 
            self.status = 'resolved'
            self.onFulfiledCallback.forEach(fn => fn())
        }
    }
    function reject(reason) {
        if (self.status === "pending") {
            self.reason = reason
            self.status = 'rejected'
            self.onRejectedCallback.forEach(fn => fn())
        }
    }
    try {
        executor(resolve, reject)
    } catch (e) {
        reject(e)
    }
}

Wpromise.prototype.then = function (fulfilled, rejected) {
    let self = this
    if (self.status === 'resolved') {
        fulfilled(self.value)
    }
    if (self.status === 'rejected') {
        rejected(self.reason)
    }
    if (self.status === 'pending') {
        self.onFulfiledCallback.push(() => {
            fulfilled(self.value)
        })
        self.onRejectedCallback.push(() => {
            rejected(self.value)
        })
    }
}

module.exports = Wpromise