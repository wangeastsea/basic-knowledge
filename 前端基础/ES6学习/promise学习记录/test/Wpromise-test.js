let Wpromise = require('./self.js')

let promise = new Wpromise(function(resolve,reject){
    // console.log('我是会被立即执行的哟')
    setTimeout(() => {
        resolve('lala')
    }, 1000)
    // reject('I am sorry, I was wrong')
    // throw new Error('我错了')
})

// promise的实例都有then方法
promise.then((data)=>{ // 成功的回调
    console.log('1111===>',data)
},(error)=>{ // 失败的回调
    console.log('e1===>',error)
})

promise.then((data) => {
    console.log('2222===>',data)
}, (error) => {
    console.log('e2==>', error)
})

promise.then((data) => {
    return new Wpromise((resolve, reject) => {
            resolve('我是内部嵌套的promise，我还有then')
    }).then((res) => {
            
    })
}, (error) => {
    console.log('e2==>', error)
}).then((res) => {
}) 
