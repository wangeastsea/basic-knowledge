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


// 方法2: 时间控制 
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


// 更精准的时间控制

// function throttle4(fn, interval) {
//     let timer = null
//     let startTime = Date.now()
//     return function (...args) {
//         let curTime = Date.now()
//         let remainning = interval - (curTime - startTime)
//         clearTimeout(timer)
//         if (remainning > interval) {
//             startTime = Date.now()
//             fn.apply(this, args)
//         } else {
//             timer = setTimeout(() => {
//                 fn.apply(this,  args)
//             }, remainning)
//         }
//     }
// }