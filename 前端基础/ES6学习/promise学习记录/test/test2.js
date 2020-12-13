let promise = new Promise((resolve, reject) => {
    resolve('123')
})


let promise2 = promise.then((res) => {
    throw new Error('err')
    return new Promise((resolve, reject) => {
        resolve('lalal')
    }).then((res) => {
        return res
    })
}).then((res) => {
    return res
}).then((res) => {
    return res
})
promise2.then((res) => {
    console.log(res)
})