// function throttleSim(fn, delay) {
//     let timer = null
//     return function() {
//         let context = this,
//             args = arguments
//         if (!timer) {
//             timer = setTimeout(() => {
//                 fn.apply(context, args)
//                 timer = null
//             }, delay)
//         }
//     }
// }

// setInterval(throttleSim(() => {console.log('1234')}), 2000)

function transNumToThousandMark(num) {
    return num && num.toString()
        .replace(/\d+/, function(s){
             return s.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
         })
}

console.log(transNumToThousandMark(233534.2345))

