// 防抖，防止触发频繁，
// - 每次触发点是在timeout这个时间段之后触发，
// - 如果是在这个时间段之前，就取消timeout时间，并重新计时
let debounce = function (fn, wait) {
    let self = this
    let args 
    let timer
    function debouncer(...arg) {
        // 如果执行到这里还有timer，则表示在这个时间段之前，应该立即取消，并重新计时
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
        args = arg
        return new Promise((resolve,reject) => {
            timer = setTimeout(async () => {
                try {
                    let result = await fn.apply(self, args)
                    resolve(result)
                } catch (e) {
                    reject(e)
                }
            } , wait)
        })
    }
    function cancel () {
        clearTimeout(timer)
        timer = null
    }
    function flush () {
        fn.apply(self, args)
    }
    debouncer.cancel = cancel
    debouncer.flush =  flush
    return debouncer
}

debounce(function () {
    console.log('input.....')
}, 300)