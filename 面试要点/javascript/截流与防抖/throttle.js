// 方法1: 标识位置
function throttle1(fn, interval = 0) {
    let isExcute = true
    return function (...args) {
        if (isExcute) {
            fn.apply(this, args)
            isExcute = false
            setTimeout(() => {
                isExcute = true
            }, interval)
        }
    }
}


// 方法2: 时间控制 , 第一次就会执行
function throttle2 (fn, interval) {
    let last = 0 
    return function (...args) {
        let now = Date.now()
        if (now - last > interval) {
            last = Date.now()
            fn.apply(this, args)
        }
    }
}

// timer  
/**
 *  定时器的实现，尾截流，不会立即执行函数，而是delay之后才执行
 *  最后一次停止触发后， 因为delay的定时器，还是最后执行一次。
 * @param {*} fn 
 * @param {*} interval 
 * @returns 
 */
function throttle3(fn, interval) {
    let timer = null
    return function (...args) {
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, args)
                clearTimeout(timer)
                timer = null
            }, interval)
        }
    }
}


// 更精准的时间控制， 时间戳 + 定时器
// 可以实现，首截流和尾截流
function throttle4(fn, interval) {
    let timer = null
    let startTime = 0
    return function (...args) {
        let curTime = Date.now()
        let remainning = interval - (curTime - startTime)
        clearTimeout(timer)
        if(remainning <= 0) {
            fn.apply(this, args)
            // 只要执行一次，就要更新一次开始时间
            startTime = Date.now()
        } else {
            timer = setTimeout(() => {
                fn.apply(this, args)
                // 只要执行一次，就要更新一次开始时间
                startTime = Date.now()
            }, remainning)
        }
    }
}









