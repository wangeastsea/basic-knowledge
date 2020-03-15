//直观感受promise 

// function test(resolve, reject) {
//   var num = Math.random() * 2
//   console.log(num)
//   if (num < 1) {
//     setTimeout(() => {
//       resolve(12)
//     }, 1000)
//   } else {
//     setTimeout(() => {
//       reject(6)
//     }, 1000)
//   }
// }

// new Promise(test).then((result) => {
//   return new Promise((resolve, reject) => {
//     console.log('p1 ' + result)
//     setTimeout(resolve, 1000, result * result)
//   })
// }).then((result) => {
//   return new Promise((resolve, reject) => {
//     console.log('p2 ' + result)
//     setTimeout(resolve, 1000, result + result)
//   })
// }).then((result) => {
//   return new Promise((resolve, reject) => {
//     console.log('p3 ' + result)
//     setTimeout(resolve, 1000, result * result)
//   })
// }).then((result) => {
//   console.log('finally ' + result)
// }).catch((result) => {
//   console.log(result)
// })

// promise 的解析器会立即执行，然后才执行后续流程中的代码
// let promise = new Promise(function (resolve, reject) {
//   console.log('Promise')
//   resolve()
// }) 
// promise.then(function () {
//   console.log('Resolved')
// })
// console.log('hi')

// let thenable = {
//   then: function (resolve, reject) {
//     resolve(45)
//   }
// }
// let p1 = Promise.resolve(thenable)
// p1.then(function (value) {
//   console.log(value)
// })


// let promise = new Promise(function(resolve, reject) {
//   throw new Error('fuck you!')
// })
// promise.catch(function(value) {
//   console.log(value.message)
// })
// 相当于这种形式
// let promise = new Promise(function (resolve, reject) {
//   try {
//     throw new Error('fuck you')
//   } catch (error) {
//     reject(error)
//   }
// })
// promise.catch(function (error) {
//   console.log(error.message)
// })
//全局的promise 拒绝处理
// node.js 开启调试模式

// let rejected
// process.on('unhandledRejection', function(reason, promise){
//   console.log(reason.message)
//   console.log(rejected === promise)
// })
// rejected = Promise.reject(new Error('fuck'))

// let rejected
// process.on('rejectionHandled', function (promise) {
//   console.log(rejected === promise)
// })
// let rejected = Promise.reject(new Error('fuck error'))
// setTimeout(function () {
//   rejected.catch(function (value) {
//     console.log(value.message)
//   })
// }, 1000)




// 使用promise封装ajax
// function ajax (method, url, data) {
//  var xhr =  new XMLHttpRequest()
//  return new Promise((resolve, reject) => {
//   xhr.onreadystatechange = () => {
//     if(xhr.readyState === 4) {
//       if(xhr.state === 200) {
//         resolve(xhr.responseText)
//       } else {
//         reject(xhr.status)
//       }
//     }
//   }
//  })
//  xhr.open(method, url)
//  xhr.send(data)
// }



// promise.race方法的使用例子
// var p1 = new Promise((resolve, reject) => {
//   console.log('1234')
//   setTimeout(reject, 100, 'p11')
// })
// var p2 = new Promise((resolve, reject) => {
//   console.log('56758')
//   setTimeout(resolve, 300, 'p22')
// })

// Promise.race([p1, p2]).then((results) => {
//   console.log(results)
// }, (error) => {
//   console.log(error)
// })


// var p1 = new Promise((resolve, reject) => {
//   reject('error')
// })
// var p2 = Promise.resolve(p1)
// console.log(p1 === p1)
// p1.catch((error) => {
//   console.log(error)
// })
// p2.catch((error) => {
//   console.log(error)
// })
// console.log(Promise.race([]))


// new Promise((resolve, reject) => {
//     console.log('Initial');

//     resolve();
//   })
//   .then(() => {
//     throw new Error('Something failed');
//     // 出错就不回再向下执行
//     console.log('Do this');
//   })
//   .catch(() => {
//     console.log('Do that');
//   })
//   .then(() => {
//     console.log('Do this whatever happened before');
//   });

  // function aa () {
  //   setTimeout(()=>{console.log(bb.name)}, 1000)
  // }


// 在promise中，只要用到了决议的值，就会等待决议，否则还是会同步执行
// new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log('123')
//     resolve('s1')
//   }, 2000)
// }).then((value) => {
//   console.log('返回的值：')
//   throw new Error('something faild')
// }).catch((err) => {
//   console.log(err.message)
// })
// 谁赋值谁优先, 赋值不会变量提升

// let arr = ['a', 'b', 'c']
// let it = arr[Symbol.iterator]()
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())
// console.log(it.next())

// new Promise((resolve, reject) => {
//   // throw new Error('错误信息')
//     throw new Error("错误信息")
// })
// .then(value => {
//   console.log(value+ 'world')
// })
// .catch(error => {
//   console.log('ErrorAAAa:', error.message)
// })
// .then(()=> {
//   console.log('123')
// })


// new Promise((resolve) => {
//   resolve('12345')
// })
// .then((value) => {
//   console.log('fuckman')
//   console.log(value)
// })
// .then(() => {
//   console.log('shit')
// })
// .catch((err) => {
//   console.log(err.message)
// })




// var obj = {a: 100, b: 200}
// for(var item in obj) {
//   console.log(item)
// }
// console.log(item)
// const obj = {a: 100, b:200}
// for(let item in obj) {
//   console.log(item)
// }
// console.log(item)

var data = {
  name: 'jack',
  gender: 'male'
}
let temp = null
Object.defineProperty(data, 'name', {
  get () {
    return temp
  },
  set (name) {
    temp = name
    console.log(temp)
  }
})

// let Person = {}
// let temp = null
// Object.defineProperty(Person, 'name', {
//   get: function () {
//     return temp
//   },
//   set: function (val) {
//     temp = val
//   }
// })
// Person.name = 'jack'
// console.log(Person.name)