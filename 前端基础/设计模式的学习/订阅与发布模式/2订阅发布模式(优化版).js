// 数据结构如下：
//  salesOffices = {
//    listen: function () {}, // 订阅一个事件
//    trigger: function() {}, // 触发一个事件
//    clientList: {           // 监听事件列表
//      key1: [fn,fn,fn...],
//      key2: [fn...]
//    }
//   }


var salesOffices = {}
salesOffices.clientList = {}
// 订阅一个事件（函数），当发布的时候，执行这个事件
salesOffices.listen = function (key, fn) {
  if(!this.clientList[key]) {
    this.clientList[key] = []
  }
  this.clientList[key].push(fn)
}
// 发布
salesOffices.trigger = function () {
  var key = Array.prototype.shift.call(arguments) // 取出第一个参数
  var fns = this.clientList[key]
  if(!fns || fns.length === 0) { // 如果没有此消息，则返回
    return false
  }
  for (var i = 0; i< fns.length; i++) {
    fns[i].apply(this, arguments)
  }
}
// 测试
salesOffices.listen('squareMeter88', function (price) {
  console.log('价格:' + price)
})
salesOffices.listen('squareMeter110', function (price) {
  console.log('价格:' + price)
})
salesOffices.trigger('squareMeter88', 200000)
salesOffices.trigger('squareMeter110', 300000)
