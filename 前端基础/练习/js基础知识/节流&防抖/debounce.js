// 代码2
const debounce = (func, wait = 0) => {

    let timeout = null
    let args
    function debounced(...arg) {
      args = arg
      if(timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      // 以Promise的形式返回函数执行结果
      return new Promise((res, rej) => {
        timeout = setTimeout(async () => {
          try {
            const result = await func.apply(this, args)
            res(result)
          } catch(e) {
            rej(e)
          }
        }, wait)
      })
    }
    // 允许取消
    function cancel() {
      clearTimeout(timeout)
      timeout = null
    }
    // 允许立即执行
    function flush() {
      cancel()
      return func.apply(this, args)
  
    }
    debounced.cancel = cancel
    debounced.flush = flush
    return debounced
  }
  

function debounce2 (fn, wait = 0) {
  let timeout = null
  return function () {
    // 如果已经存在定时器，说明是在wait间隔之内触发的，需要重新计时
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    // let self = this
    let args = Array.prototype.slice.call(arguments)
    timeout = setTimeout(() => {
      fn.call(this, ...args)
    }, wait)
  }
}


