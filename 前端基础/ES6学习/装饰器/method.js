const { log } = require("console")

class Person {
    @readonly
    name () {
        return `${this.first} ${this.last}`
    }
}
/***
 * target: 类的原型为 Person.prototype,本意是装饰类的实例
 * 但是实例还没有生成，所以只能装饰类的原型
 * name: 所要装饰的属性名
 * descriptor: 该属性的描述对象
 */
function readonly (target, name, descriptor) {
    /**
     * descriptor 对象的原来的值：
     * {
     *      value: specifiedFunction,
     *      enumerable: false,
     *      configurable: true,
     *      writable: true
     * }
     */
    descriptor.writable = false
    return descriptor
}

readonly(Person.prototype, 'name', descriptor)
// 类似于
// Object.defineProperty(Person.prototype, 'name', descriptor)

/**
 * 是该属性不可遍历
 */
class Person {
    @nonenumerable 
    get kidCount () {
        return this.children.length
    }
}
function nonenumerable(target,name,descriptor) {
    descriptor.enumerable = false
    return descriptor
}

class Math {
    @log
    add(a,b) {
        return a+b
    }
}
function log(target, name, descriptor) {
    let oldVaule = descriptor.value
    descriptor.value = function () {
        console.log(`Calling ${name} with`, arguments)
        return oldVaule.apply(this, arguments)
    }
}

const math = new Math()
math.add(2,4)

/**
 * 一个方法有多个装饰器是怎么执行的
 * 会像剥洋葱一样，先从外到内，然后由内向外执行
 */
function dec(id) {
    console.log('evaluated', id)
    return (target, property, descriptor) => console.log('executed', id)
}

class Example {
    @dec(1)
    @dec(2)
    method(){}
}
// evaluated 1
// evaluated 2
// executed 2
// executed 1
