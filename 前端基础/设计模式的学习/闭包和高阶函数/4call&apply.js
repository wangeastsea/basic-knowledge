// console.log(Math.max(1, 2, 3, 34, 45))
// console.log(Math.max.apply(null, [1, 2, 3, 4, 5, 6, 199]))

// Function.prototype.bind = function (obj) {
//   var self = this
//   return function () {
//     return self.apply(obj, arguments)
//   }
// }
// var obj = {name: 'wangdonghai'}
// var func = function () {
//   console.log(this.name)
// }.bind(obj)
// func(123)

// console.log([1,2,3,4].slice())

// function aa () {
//   console.log([].slice.call(arguments))
// }
// aa(2,3,4,5,5)


// bind完整版 , 预先填入一些参数
// Function.prototype.bind = function () {
//   var self = this
//   // 获取绑定对象
//   var obj =[].shift.call(arguments)
//   var args = [].slice.call(arguments)
//   return function () {
//     return self.apply(obj, [].concat.call(args, [].slice.call(arguments)))
//   }
// }

// var obj = {
//   name: 'wangdonghai'
// }
// var func = function (a, b, c, d) {
//   console.log(this.name)
//   console.log(a,b,c,d)
// }.bind(obj, 1, 2)
// func(3, 4)

// // 借用其他对象的方法
// var A = function (name) {
//   this.name = name
// } 
// var B = function () {
//   A.apply(this, arguments)
// }
// B.prototype.getName = function () {
//   console.log(this.name)
// }
// var b = new B ('wangdonghai')
// b.getName()

// 第二种使用场景：
// (function () {
//   [].push.call(arguments, 1,2,3)
//   console.log(arguments)
// })(1,3)

// var a = {}
//  Array.prototype.push.call(a, 'first')
// console.log(a.length)
// console.log(a[0])