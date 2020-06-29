let target = {
    name: 'target'
}
/**
 * set 接受4个参数
 * 1： trapTarget 用于接收属性的对象(代理的目标)
 * 2：key要写入的属性键值
 * ３：value被写入属性的值
 * ４： receiver 操作发生的对象(代理对象本身)
 */
// 代理
let proxy = new Proxy(target, {
    set(trapTarget, key, value,receiver) {
        console.log('receiver', receiver)
        console.log('trapTarget', trapTarget)
        if (!trapTarget.hasOwnProperty(key)) {
            if (isNaN(value)) {
                throw new TypeError('KEY MUST BE NUMBER')
            }
        }
        // 反射
        return Reflect.set(trapTarget, key, value, receiver)
    }
})
proxy.count = 1
console.log(proxy.count)
console.log(target.count)
proxy.name = 'proxy'
console.log(proxy.name)
console.log(target.name)

/**
 * TODO：解读
 * 定义了一个代理，来验证添加到target的新属性。
 * 当执行proxy.count = 1时，set陷阱被调用，此时
 * Traptarget的值是target，即是代理的目标
 * key 是 'count',value等于1
 * receiver等于proxy（代理对象本身）
 */

 /**
  * get陷阱接收3个参数
  * 1： trapTarget: 被读取属性的源对象，（代理的目标）
  * 2：key 要读取的属性键
  * 3： receiver 操作发生的对象（一般是代理）
  */
 