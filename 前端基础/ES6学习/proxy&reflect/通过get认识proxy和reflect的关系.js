 /**
  * get陷阱接收3个参数
  * 1： trapTarget: 被读取属性的源对象，（代理的目标）
  * 2：key 要读取的属性键
  * 3： receiver 操作发生的对象（一般是代理）
  */
 let proxy = new Proxy({}, {
     get(trapTarget,key,receiver) {
         // 这里之所以用in操作符检查receiver而不检查targetTarget，是为了防止receiver代理含有has陷阱
         // 在这种情况下，检查trapTarget会忽略掉has陷阱，从而得到错误的结果。属性不存在会抛出一个错误，
         // 否则就是用默认行为，输出undefined
         if (!(key in receiver)) {
             throw new TypeError('属性'+key+'不存在')
         }
         return Reflect.get(trapTarget, key, receiver)
     }
 })
 // 添加一个新属性，是ok的
 proxy.name = 'proxy'
 console.log(proxy.name)
 console.log(proxy.nme)
