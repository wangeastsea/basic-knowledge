// 数据结构如下：
//  event = {
//    listen: function () {}, // 订阅一个事件
//    trigger: function() {}, // 触发一个事件
//    clientList: {           // 监听事件列表
//      key1: [fn,fn,fn...],
//      key2: [fn...]
//    },
      // remove： function() {} // 移除订阅的事件
//   }
var event = {
  clientList: {},
  listen: function (key, fn) {
    if(!this.clientList[key]) {
      this.clientList[key] = []
    }
    this.clientList[key].push(fn)
  },
  trigger: function () {
    var key = Array.prototype.shift.call(arguments)
    var fns = this.clientList[key]
    if (!fns || fns.length === 0) {
      return false
    }
    for (var i = 0; i < fns.length; i++) {
      var fn  = fns[i]
      fn.apply(this, arguments)
    }
  },
  remove: function (key, fn) {
    var fns = this.clientList[key]
    if (!fns) { // 未定义或为null，即没有人订阅
      return false
    } 
    // 如果没有传入具体的回调函数，表示取消key对应的所有订阅
    if (!fn) {
      fns && (fns.length = 0) // 清空数组
    }
    for (var i = fns.length-1; i >= 0; i--) {
      if(fns[i] === fn) {
        fns.splice(i, 1)
      }
    }
  }
}

var installEvent = function (obj) {
  for (var key in event) {
    obj[key] = event[key]
  }
} 

var salesOffices ={}
installEvent(salesOffices)
salesOffices.listen('squareMeter88', fn1 = function (price) {
  console.log('价格='+ price)
})

salesOffices.listen('squareMeter88', fn2 = function (price) {
  console.log('价格='+ price)
})

salesOffices.remove('squareMeter88', fn1)
salesOffices.trigger('squareMeter88', 60000)