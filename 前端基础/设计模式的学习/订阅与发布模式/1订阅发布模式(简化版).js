// 简化版
var salesOffices = {}
salesOffices.clientList = []
//（买房者订阅的买房信息）订阅
salesOffices.listen = function (fn) {
  this.clientList.push(fn)
}
//（售楼处）发布
salesOffices.trigger = function () {
  for (let i = 0; i < this.clientList.length; i++) {
    let fn = this.clientList[i]
    fn.apply(this, arguments)
  }
}

//_________________________调用__________________________
// 小明订阅的信息
salesOffices.listen(function (price, squareMeter) {
  console.log('价格=' + price)
  console.log('squareMeter=' + squareMeter)
})
// 小红订阅的信息
salesOffices.listen(function (price, squareMeter) {
  console.log('价格=' + price)
  console.log('squareMeter=' + squareMeter)
})
salesOffices.trigger(30000, 180)
salesOffices.trigger(30000, 120)