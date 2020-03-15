// 数据结构
// person = {
//   subscriptList: {
//     'key1': [fun1,fun2...],
//     'key2': [funa,funb...]
//   },
//   'listen': function () {},
//   'trigger': function () {}
// }
var person = {}
person.subscriptList = {}

// 订阅
person.listen = function (key, fun) {
  if(!this.subscriptList[key]) {
    this.subscriptList[key] = []
  }
  this.subscriptList[key].push(fun)
}

//发布
person.trigger = function (key) {
  var fns = this.subscriptList[key]
  if(!fns || fns.length === 0) {
    return false
  }
  for (var i = 0; i < fns.length; i++ ) {
    fns[i]()
  }
}


person.listen('go', function () {console.log('开始走')})
person.listen('go', function () {console.log('走起来')})
person.trigger('go')
