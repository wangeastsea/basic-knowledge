// 通过闭包实现的一个判断类型的代码段
// var Type = {}
// var type = ['String', 'Array', 'Number']
// for (var i = 0; i < type.length; i++) {
//   (function (type) {
//     Type['is'+ type] = function (obj) {
//       return Object.prototype.toString.call(obj) === '[object '+ type + ']'
//     }
//   })(type[i])
// }
// console.log(Type.isArray([]))
// console.log(Type.isString('123'))

// 缓存计算,提高计算效率
// var cache = {}
// var mult = function () {
//   var args = Array.prototype.join.call(arguments, ',')
//   if(cache[args]) {
//     return cache[args]
//   }
//   var a = 1
//   for(var i = 0; i < arguments.length; i++) {
//     a = a * arguments[i]
//   }
//   return cache[args] = a
// }
// console.log(mult(1,2,3,34))
// console.log(mult(1,2,3,34))

// 转换为闭包
// var mult = (function () {
//   var cache = {}
//   return function () {
//     var args = Array.prototype.join.call(arguments, ',')
//     if (cache[args]) {
//       return cache[args]
//     }
//     var a = 1 
//     for (var i = 0; i < arguments.length; i++) {
//       a = a * arguments[i]
//     }
//     return cache[args] = a
//   }
// })()
// console.log(mult(1,3,4,4))

// 计算进行封装
// var mult = (function () {
//   var cache = {}
//   var calculate = function () {
//     var a = 1
//     for (var i = 0; i < arguments.length; i++) {
//       a = a * arguments[i]
//     }
//     return a
//   }
//   return function () {
//     var args = Array.prototype.join.call(arguments, ',')
//     if(cache[args]) {
//       return cache[args]
//     }
//     return cache[args] = calculate.apply(null, arguments)
//   }
// })()
// console.log(mult(1,2,3,4,5,89,3545656,45456,234))
// console.log(mult(1,2,3,4,5,89,3545656,45456,234))

// 使用闭包实现命令模式



