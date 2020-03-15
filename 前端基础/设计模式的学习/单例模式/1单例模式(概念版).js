var Singleton = function (name) {
  this.name = name
}
Singleton.prototype.getName = function () {
  console.log(this.name)
}
Singleton.getInstance=(function(){
  var instance = null 
  return function (name) {
    if (!instance) {
      instance = new Singleton(name)
    }
    return instance
  }
})()
var a = Singleton.getInstance('wangdonghai')
console.log(a.name)
var b = Singleton.getInstance('yanfang')
console.log(b.name)


// 闭包的应用
// var func = function () {
//   var a = 1;
//   return function () {
//     a++
//     console.log(a)
//   }
// }
// var f = func()
// f()
// f()


