// // 单例模式
// // 执行一次之后，就返回一个匿名函数
// var getSingle = function (fn) {
//     var ret
//     return function () {
//         return ret || (ret = fn.apply(this, arguments))
//     }
// }

// // getScript其实是一个函数，执行以后，每次返回的是同一个script对象
// var getScript = getSingle(function () {     
//     return document.createElement('script')
// })
// //当执行第一次时，就会执行匿名函数，并赋值ret，下次判断ret有值了就直接返回
// var script1 = getScript()
// var script2 = getScript()

// console.log(script1 === script2)
let data = {
    name: 'doghai',
    gender: 'male',
    address: '1232435'
}

Object.keys(data).forEach((key) => {
    reactive(data, key, data[key])
})


function  reactive (data, key ,value) {
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: false,
        get () {
            console.log('触发getter啦，返回的值',value)
            return value
        },
        set (newV) {
            if (value !== newV) {
                console.log('触发setter啦',value);
                console.log('新值是', newV)
                vaule = newV
            }
        }
    })
} 

console.log(data.name)

data.name = 'rose'


