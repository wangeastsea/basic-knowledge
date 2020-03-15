class MyPromise {
    constructor(fn) {
        this.successList = []
        this.failList = []

        fn(() => {
            // resolve 函数
            fsm.resolve(this)
        }, () => { 
            // reject 函数
            fsm.reject(this)
        })
    }
    then(successFn, failFn) {
        this.successList.push(successFn)
        this.failList.push(failFn)
    }
}
function loadImg(src) {
    const promise = new MyPromise(function (resolve, reject) {
        var img = document.createElement('img')
        img.onload = function () {
            resolve(img)
        }
        img.onerror = function () {
            reject()
        }
        img.src = src
    })
    return promise
}
var src = 'http://www.imooc.com/static/img/index/logo_new.png'
var result = loadImg(src)
console.log(result)
result.then(function (img) {
    console.log(img)
    console.log('success 1')
}, function () {    
    console.log('failed 1')
})
result.then(function (img) {
    console.log('success 2')
}, function () {    
    console.log('failed 2')
})