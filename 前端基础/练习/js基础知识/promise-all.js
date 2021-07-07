// let one = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(1)
//     }, 1000)
// })

// setInterval(() => {
//     one.then((res) => {
//         console.log(res)
//     })
// }, 1000);

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



// https://www.cnblogs.com/xiangzhong/p/11355252.html


// let one = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(1)
//     }, 1000)
// })
// let cc = one.then((val)=> {
//     console.log(val)
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(cc)
//         }, 1000)
//     })
// })
// console.log(cc)
// setTimeout(() => {
//     // 一直处于pending,并没有报死循环的错误
//     console.log(cc)
// }, 5000)

function aa () {
    console.log('aa')
}
var aa = 0


console.log(typeof aa)