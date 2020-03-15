// var cc  = [1,3,4,34,5,34,6].sort(function (a,b) {
//   return b-a
// })
// console.log(cc)


// var isType = function (type) {
//   return function (obj) {
//     return Object.prototype.toString.call(obj) === '[object ' + type + ']'
//   }
// }
// var isString = isType('String')
// var isArray = isType('Array')
// console.log(isArray([]))

// Function.prototype.after = function () {
//   console.log(this)
// }
// function aa () {
// }
// aa.after()


// 面向切面编程
// Function.prototype.before = function (beforefn) {
//   var _self = this
//   return function () {
//     beforefn.apply(this)
//      _self.apply(this)
//   }
// }
// Function.prototype.after = function (afterfn) {
//   var _self = this
//   return function () {
//     _self.apply(this)
//     afterfn.apply(this)
//   }
// }

// var func = function () {
//   console.log(2)
// }

// func = func.before(function () {console.log(1)}).after(function () {console.log(3)})

// func()


// 高阶函数的其他应用
// 1函数的柯里化
// var cost = (function (){
//   var args = []
//   return function () {
//     if(arguments.length === 0) {
//       var money = 0
//       for(var i = 0; i< args.length; i++) {
//         money += args[i]
//       }
//       return money
//     } else {
//       [].push.apply(args, arguments)
//     }
//   }
// })()
// cost(100)
// cost(10000)
//2 函数的柯里化
// var  cost = (function () {
//   var money = 0
//   return function () {
//     for(var i = 0; i < arguments.length; i++) {
//       money += arguments[i]
//     }
//     return money
//   }
// })()

// var currying = function (fn) {
//   var args = []
//   return function () {
//     if(arguments.length === 0) {
//       return fn.apply(this, args)
//     } else {
//       [].push.apply(args, arguments)
//     }
//   }
// }

// var cost = currying(cost)
// cost(100)
// cost(100)
// cost(300)
// console.log(cost())

// (function () {
//   Array.prototype.push.call(arguments, 123,34,45)
//   console.log(arguments)
// })(1,2,3,4,45)


// uncurrying
// Function.prototype.uncurrying = function () {
//   var self = this
//   return function () {
//     var obj = Array.prototype.shift.call(arguments)
//     return self.apply(obj, arguments)
//   }
// }

// var push = Array.prototype.push.uncurrying()
// var cc = (function () {
//   push(arguments, 5)
//   console.log(arguments)
// })(1,2,3,4)


// var ary = ['push', 'shift', 'forEach']
// for (var i = 0; i< ary.length; i++) {
//   var fn = ary[i]
//   Array[fn] = Array.prototype[fn].uncurrying()
// }
// var obj = {
//   'length': 3,
//   '0': 1,
//   '1': 2,
//   '2': 3
// }
// Array.push(obj, 4)
// console.log(obj.length)
// console.log(obj)
// var first = Array.shift(obj)
// console.log(first)
// console.log(obj)

// Array.prototype.push.call(obj, 5)
// console.log(obj)
// console.log(Object.prototype.toString.call(obj))
// Array.forEach(obj, function (i, n) {
//   console.log(i)
// })

// [1,3,3,4,4].forEach(i => {
//   console.log(i)
// });
// var fn = function (name) {
//   console.log(this)
//   console.log(name)
// }
// // Function.prototype.call.apply(fn, [window, 'sven'])
// Function.prototype.call.apply(fn, [{name: 'donghai'}, 3])
// var b = {'length': '1', '0': 1}
// Array.prototype.push.call(b, 1,2,4,67)
// console.log(b)


// var dd = function () {
//   if (true) {
//     dd = function () {
//       console.log('我在内部被改变了')
//     }
//   }
//   dd() // 递归调用
// }
// dd()

function aa (name) {
  console.log(123)
  aa(name)
}