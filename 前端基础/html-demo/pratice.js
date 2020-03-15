// function test (resolve, reject) {
//   var num = Math.random() * 2 
//   console.log(num)
//   if(num < 1) {
//     setTimeout(()=> {
//       resolve(12)
//     }, 1000)
//   } else {
//     setTimeout(() => {
//       reject(6)
//     }, 1000)
//   }
// }

//  new Promise(test).then((result) => {
//   return new Promise((resolve,reject) => {
//     console.log('p1 ' + result)
//     setTimeout(resolve, 1000, result*result)
//   })
//  }).then((result) => {
//   return new Promise((resolve,reject) => {
//     console.log('p2 ' + result)
//     setTimeout(resolve, 1000, result + result)
//   })
//  }).then((result) => {
//    return new Promise((resolve, reject) => {
//      console.log('p1 ' + result)
//      setTimeout(resolve, 1000, result * result)
//    })
//  }).then((result) => {
//    console.log('finally '+ result)
//  }).catch((result) => {
//    console.log(result)
//  })




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

// var p1 = new Promise((resolve, reject) => {
//   setTimeout(reject, 100, 'p11')
// })
// var p2 = new Promise((resolve, reject) => {
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


// try{
//   throw new Error('asdf') 
// }catch (e) {
//   console.log(e.message)
// }


// 异步函数
// function resolveAfter2Seconds() {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve('help1234556');
//     }, 2000);
//   });
// }

// var ss = (async function asyncCall() {
//   console.log('calling');
//   var result = await resolveAfter2Seconds();
//   console.log(result);
//   throw new Error('我错了')
//   // expected output: "resolved"
// }())

// asyncCall();
// ss.then((result) => {
//   console.log(result)
// }).catch((error) => {
//   console.log(error.message)
// })

// function resolveAfter2Seconds(x) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(x)
//     },2000)
//   })
// }

// var c = resolveAfter2Seconds(10)
// c.then(result => {console.log(result)})
// async function add1(x) {
//   var a = await resolveAfter2Seconds(20)
//   var b = await resolveAfter2Seconds(30)
//   return x+a+b
// }

// add1(10).then(v => {
//   console.log(v)
// })


// async function add2 (x) {
//   var a  = resolveAfter2Seconds(20)
//   var b = resolveAfter2Seconds(30)
//   return x + await a + await b
// }
// add2(10).then(v => {
//   console.log(v)
// })

// console.log(Object.getPrototypeOf(async function () {}).constructor)


// 异步函数表达式
/*异步函数表达式 与 异步函数语句非常相似,语法也基本相同。 
它们之间的主要区别在于异步函数表达式可以省略函数名称来创建一个匿名函数。
另外,异步函数表达式还可以用在 IIFE(立即执行函数表达式*/
// function resolveAfter2Seconds(x) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(x);
//     }, 2000);
//   });
// };
// var add1 = async function (x) {
//   var a = await resolveAfter2Seconds(20);
//   var b = await resolveAfter2Seconds(30);
//   return x + a + b;
// }
// add1(10).then((result) => {
//   console.log(result)
// })

// (async function(x) {
//   var a = resolveAfter2Seconds(20)
//   var b = resolveAfter2Seconds(30)
//   return  x + await a + await b
// })(10).then(result => {
//   console.log(result)
// })

// console.log(Object.getPrototypeOf(async function (){}).constructor)

// function resolveAfter2Seconds(x) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(x);
//     }, 2000);
//   });
// }
// var AsyncFunction = Object.getPrototypeOf(async function() {}).constructor
// var a = new AsyncFunction('a', 
//                           'b', 
//                           'return await resolveAfter2Seconds(a) + await resolveAfter2Seconds(b)')
// a(10, 20).then(result => {console.log(result)})
// function resolveAfter2Seconds(x) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(x);
//     }, 2000);
//   });
// }

// var AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;
// var a = new AsyncFunction('a',
//   'b',
//   'return await resolveAfter2Seconds(a) + await resolveAfter2Seconds(b);');
// a(10, 20).then(v => {
//   console.log(v); // 4 秒后打印 30
// });

// var regex = /(chrome)\/([\w.]+)/
// console.log(regex.exec(navigator.userAgent.toLowerCase()))


let Person = {}
let temp = null
Object.defineProperty(Person, 'name', {
  get: function () {
    return temp
  },
  set: function (val) {
    temp = val
  }
})
Person.name = 'donghai'
console.log(Person.name)