// @fronze class Foo {
    // @configurable(false)
    // @Enumerable(false)
    // method() {}
    // @throttle(500)
    // expensiveMethod() {}
// }
/**
 * 为类添加静态属性
 */
@testable
class MyTestableClass {

}
// target 是 MyTestabelClass 本身
// 装饰器的第一个参数就是所要装饰的目标类
function testable(target){
    target.isTestable = true
}
console.log(MyTestableClass.isTestable)

// 为装饰器加参数，修改装饰器的行为
// 装饰器本质就是编译时执行的函数
function testable(isTestable) {
    return function (target) {
        target.isTestable = isTestable
    }
}
// @testable(true)
// class MyTestabelClass {}
// MyTestableClass.isTestable === true

// @testable(false)
// class MyTestabelClass{}
// MyTestableClass.isTestable === false 

/***
 * 为类添加实例属性,可以添加到原型上
 */

 function testable (target) {
     target.prototype.isTestable = true
 }

 @testable
 class MyTestabelClass{}

 let obj = new MyTestableClass()
 obj.isTestable

//  ————————————————————————————————

function mixins(...list) {
    return function (target) {
        Object.assign(target.prototype, ...list)
    }
}
const Foo = {
    foo() {
        console.log('foo')
    }
}
@mixins(Foo)
class MyClass{}
let obj = new MyClass()
obj.foo()

