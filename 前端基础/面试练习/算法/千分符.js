// 零宽断言： （?=exp） 匹配表达式exp前面的代码

// function exchange(num) {
//     num += '' //转成字符串
//     if (num.length <= 3) {
//         return num
//     }

//     num = num.replace(/\d{1,3}(?=(\d{3})+$)/g, (v) => {
//         debugger
//         console.log(v)
//         return v + ','
//     })
//     return num
// }

// console.log(exchange(1234567))



// 只有正则表达式使用了表示全局检索的 "g" 标志时，该属性才会起作用。
// lastIndex 被设置为紧随最近一次成功匹配的下一个位置。

var str = 'googlex'
var reg = /o/g
console.log(reg.test(str), reg.lastIndex)
console.log(reg.test(str), reg.lastIndex)
console.log(reg.test(str), reg.lastIndex)