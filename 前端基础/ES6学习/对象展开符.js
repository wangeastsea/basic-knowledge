let cc = {
  name: 'jack',
  gender: 'male'
}
console.log({ ...cc
})

let aa = function (name) {
  this.name = name
  this.init()
}


// 匿名函数this默认指向上下文对象
// aa.prototype.init = function () {
//   setTimeout(() => {
//     console.log(this) 
//     this.name = 'xiaoming'
//   }, 0)
// }

aa.prototype.init = function () {
  (()=> {
    console.log(this)
    this.name = "xiaoming"
  })()
}

// aa.prototype.init = function () {
//   setTimeout(function () {
//     console.log(this) //指向全局window
//     this.name = 'xiaoming'
//   }, 1000)
// }

var fuck = new aa('xiaowang')
console.log(fuck)
