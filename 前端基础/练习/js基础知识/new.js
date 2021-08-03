// 模拟一个new 操作符

/**
 * 我们先看下如何使用，以及new的特征，我们只要实现了这些特征，是不是就模拟了new的实现了
 * - 一个继承aninmal的对象cat被创建
 * - cat.__proto__ 指向了 aninmal.prototype
 * - this指向了这个新创建的对象cat
 * - 返回cat
 * - 返回新对象
 *   - 如果构造函数没有显示的返回值，则返回this
 *   - 如果构造函数显式的返回值，返回的是基本类型， 如 number，string，boolean, 则返回的还是this, 注意返回null,也是返回this
 *   - 如果构造函数显式返回的是对象，如 {name: 1}, 则返回这个对象{name: 1}
 *  */

// function aninmal (name, actions) {
//     this.name = name
//     this.actions = actions
//     this.sayName = function () {
//         console.log('myname :>> ', this.name) 
//     }
//     return null
// }

// let cat = new aninmal('cat', ['eat', 'cat-walk'])
// console.log(cat)

// 第一版
// function newAction() {
//     let newObj = {}
//     let constructor = Array.prototype.slice.call(arguments, 0, 1)
//     let args = Array.prototype.slice.call(arguments, 1)
//     newObj.__proto__ = constructor.prototype
//     let returnObj = constructor.call(newObj, args)
//     // 基本类型
//     if (typeof returnObj !== 'undefined' && typeof returnObj !== 'object') {
//         return newObj
//     } else if (typeof returnObj === null) {
//         return newObj
//     } else {
//         return returnObj
//     }
// }
// 优化版
// function newAction() {
//     let newObj = new Object()
//     // let constructor = Array.prototype.shift.call(arguments)
//     let constructor = [].shift.call(arguments)
//     newObj.__proto__ = constructor.prototype
//     let returnObj = constructor.apply(newObj, arguments)
//     // null 可处理，可不处理吧。
//     return typeof returnObj === 'object' ? returnObj : newObj
// }

// let cat = newAction(aninmal, 'cat', 'eat')
// console.log(cat)
// let cc = new aa()
// console.log(cc.constructor === aa, cc)


// function _new(ctor, ...args) {
//     if (typeof ctor !== 'function') {
//         throw 'ctor must be a function'
//     }
//     let obj = new Object()
//     // obj.__proto__.__proto__ === ctor.prototype 
//     obj.__proto__ = Object.create(ctor.prototype)
//     let res = ctor.apply(obj, [...args])
//     let isObject = typeof res === 'object' && res !== null
//     let isFunction = typeof res === 'function'
//     return isObject || isFunction ? res : obj
// }

// let cc = _new(aa)
// console.log(cc.constructor === aa, cc)


/**
 * call & apply 的实现
 */
// function bb(bbb) {
//     this.bb = 123
//     console.log(bbb)
//     return this
// }
// let obj = {aa: 123}
// let cc = bb.call(obj, 456)

// // obj.fn = function () {this.bb = 123 }
// console.log(cc)

// Function.prototype.call = function (context, ...args) {
//     var context = context || window
//     // 当前需要被调用的函数
//     context.fn = this
//     var result = context.fn(...args)
//     delete context.fn
//     return result
// }
// function bb(bbb) {
//     this.bb = 123
//     console.log(bbb)
//     return this
// }
// let obj = {aa: 456}
// let cc = bb.call(obj, 456)

// obj.fn = function () {this.bb = 123 }
// console.log(cc)

// Function.prototype.apply = function (context, args) {
//     var context = context || window
//     // 当前需要被调用的函数
//     context.fn = this
//     var result = context.fn(...args)
//     delete context.fn
//     return result
// }
// function bb(a,b,c) {
//     this.bb = 123
//     console.log('params==>', a,b,c) // 456
//     return this
// }
// let obj = {aa: 456}
// let cc = bb.apply(obj, [3,4,5]) 
// console.log(cc)
/**
 * 
 * @param {*} context 
 * @param  {...any} args 
 *  function aa () {this.aa = 123}
 *  let cc = aa.bind({bb: 789}, 4,5,6)
 *  let dd = new cc()  
 */
// Function.prototype.bind = function(context, ...args) {
//     if (typeof this !== 'function') {
//         throw new Error('this must be a function')
//     }
//     var self = this // this ==> aa 
//     var fbound = function () { // fbound ==> cc
//         self.apply(this instanceof self ? this : context, args.concat(Array.prototype.slice.call(arguments)))
//     }
//     // this 有原型对象， 怎返回的函数，不能丢失this原型链对象上的属性
//     if (this.prototype) {
//         // fbound.prototype.__proto__ === this.prototype
//         fbound.prototype = Object.create(this.prototype)
//     }
//     return fbound
// }





// let name = 'jack'
// function getPerson (gender) {
//     console.log(this.name)
//     console.log('gender===>', gender)
// }
// let obj = {
//     name: 'rose'
// }
// let sayName = getPerson.bind(obj, 'male')
// sayName()


Function.prototype.bind = function (context, ...bindArgs) {
    // 不是函数绑定直接报错
    if (typeof this !== 'function') {
        throw new Error('this must be a function')
    }
    // 调用函数
    let fn = this
    let fbound = function(...args) {
        args = [...bindArgs, ...args]
        // 看下面的关键点，来理解这一句代码
        return fn.apply(this instanceof fn ? this : context, args)
    }
    // this 是当前被绑定的函数
    // 关键点：this 有原型对象，返回的函数不能丢失this原型链对象上的属性
    if (this.prototype) {
        fbound.prototype = Object.create(this.prototype)
    }
    return fbound
}


function rose (gender, hobby) {
    this.gender = gender
    this.hobby = hobby
    console.log('name==>', this.name)
    console.log('this==>', this)
    return this
}
let jack = {
    name:'jack'
}
let extendRose = rose.bind(jack, 'female',  ['swimming', 'football'])
// let person = new extendRose()  
console.log(extendRose())
// console.log(person)
