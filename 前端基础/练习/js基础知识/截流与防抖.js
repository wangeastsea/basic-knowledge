// 第一次会触发的情况
// function throttle(fn, delay) {
//     let last = 0
//     return function () {
//         let now = Date.now()
//         let context = this
//         let args = arguments
//         // 缺点是： 第一次就会触发， 因为第一次last ===0 ,导致 now 是一定大于 delay的，所以第一次必须触发
//         if (now - last > delay) {
//             last = Date.now()
//             fn.apply(context, args)
//         }
//     }
// }

// 第一次也是延迟执行, 但是用户最后一次操作，也会延迟执行。而我们想要的操作是：当用户最后一次操作的前后时间小于interval时候，就取消执行。
// function throttle(fn, interval) {
//     let timer = null
//     return function () {
//         let context = this
//         let args = arguments
//         if (!timer) {
//           let timer = setTimeout(() => {
//                 fn.apply(context, args)
//                 timer = null
//             }, interval)
//         }
//     }
// }


// TODO完善版：