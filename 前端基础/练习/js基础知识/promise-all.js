let one = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1)
    }, 1000)
})
// 这种就是 x === promise2的情况，应该直接报错
let cc = one.then((val)=> {
    console.log(val)
    return cc
})
console.log(cc)


// let  two = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(2)
//     }, 2000)
// })


// let  three = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(3)
//     }, 3000)
// })

// let four = 4


// function promiseAll(promiseArr) {
//     return new Promise((resolve, reject) => {
//         if (!Array.isArray(promiseArr)) {
//             reject(new Error('请传入数组'))
//         }
//         let promiseNums = promiseArr.length
//         const res = []
//         let counter = 0
//         for(let i = 0; i < promiseNums; i++) {
//             Promise.resolve(promiseArr[i]).then((value) => {
//                 counter++
//                 res[i] = value
//                 if (counter === promiseNums) {
//                     resolve(res)
//                 }
//             })
//         }
//     }) 
// }

// promiseAll([one, two, three, four]).then(res => {
//     console.log('res==>', res)
// })

// Promise.all([one, two, three, four]).then(res => {
//     console.log('res =>', res)
// })
