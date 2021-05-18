const { resolveNaptr } = require("dns")
const { resolve } = require("path")

let aa = new Promise((resolve, reject) => {
    resolve('123')
})

// aa.then((value) => {}, (reason) => {
//     return new Promise((resolve, reject) => {
//         return resolve(reason)
//     })
// }).then((res) => {
//     console.log(res)
// })

// aa.then(() => {
    // throw 'error'
// }).then(() => {}, (err)=> {console.log(err)})


// 多级promise嵌套
aa.then((res) => {
    return new Promise((resolve) => {
        resolve('123')
    }).then((res2) => {
        return new Promise((resolve) => {
            resolve('9293')
        }).then((res) => {
            return res
        })
    }) 
}).then((res) => {
    console.log(res)
})