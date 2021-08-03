const throttle = (func, wait = 0, execFirstCall) => {

    let timeout = null
  
    let args
  
    let firstCallTimestamp
  
  
  
  
  
    function throttled(...arg) {
  
      if (!firstCallTimestamp) firstCallTimestamp = new Date().getTime()
  
      if (!execFirstCall || !args) {
  
        console.log('set args:', arg)
  
        args = arg
  
      }
  
      if (timeout) {
  
        clearTimeout(timeout)
  
        timeout = null
  
      }
  
      // 以Promise的形式返回函数执行结果
  
      return new Promise(async(res, rej) => {
  
        if (new Date().getTime() - firstCallTimestamp >= wait) {
  
          try {
  
            const result = await func.apply(this, args)
  
            res(result)
  
          } catch (e) {
  
            rej(e)
  
          } finally {
  
            cancel()
  
          }
  
        } else {
  
          timeout = setTimeout(async () => {
  
            try {
  
              const result = await func.apply(this, args)
  
              res(result)
  
            } catch (e) {
  
              rej(e)
  
            } finally {
  
              cancel()
  
            }
  
          }, firstCallTimestamp + wait - new Date().getTime())
  
        }
  
      })
  
    }
  
    // 允许取消
  
    function cancel() {
  
      clearTimeout(timeout)
  
      args = null
  
      timeout = null
  
      firstCallTimestamp = null
  
    }
  
    // 允许立即执行
  
    function flush() {
  
      cancel()
  
      return func.apply(this, args)
  
    }
  
    throttled.cancel = cancel
  
    throttled.flush = flush
  
    return throttled
  
  }




  // 标识位版本
  function throttle1 (fn, interval = 0) {
    let isExecute = true
    return function (...args) {
      if (isExecute) {
        fn.apply(this, args)
        isExecute = false
        setTimeout(() => {
          isExecute = true
        }, interval) 
      }
    }
  }
  // 
  function throttle2(fn, delay = 0) {
    let timer = null
    return function() {
        let context = this,
            args = arguments
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(context, args)
                clearTimeout(timer) //总是干掉事件回调
                timer = null
            }, delay)
        }
    }
}

function throttle3(fn, delay=0) {
  let last = 0
  return function () {
      let now = Date.now()
      let context = this
      let args = arguments
      
      if (now - last > delay) {
          last = Date.now()
          fn.apply(context, args)
      }
  }
}
  


function throttle4(fn, interval = 0) {
  let timer = null
  return function () {
      let args = arguments
      if (!timer) {
        timer = setTimeout(() => {
              fn.apply(this, args)
              clearTimeout(timer)
              timer = null
          }, interval)
      }
  }
}

function throttle5(fn, interval) {
  let timer = null
  let startTime = Date.now()
  return function () {
      let curTime = Date.now()
      let remainning = interval - (curTime - startTime)
      let context = this
      let args = arguments
      clearTimeout(timer)
      // 操作已过剩余时间，立即执行
      if (remainning <=0) {
          // 重新计时
          startTime = Date.now()
          fn.apply(context, args)
      } else {
          timer = setTimeout(() => {
              fn.apply(context, args)
          }, remainning)
      }
  }
}