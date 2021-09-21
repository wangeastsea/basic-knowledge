function Parent (name, age) {
    this.name = name
    this.age = age
}

let child = new Parent('jack', 18)
/**
1: 会构造一个对象，并返回这个对象
- 如果主动返回一个基本类型的变量，会直接忽略，仍返回对象
- 如果返回的是一个对象，则会返回这个对象
2: 将属性复制到这个对象上
3: 对象的__proto__ 被赋予 构造函数的prototype
*/
// fn是构造函数
function mockNew (fn, ...args) { 
    if(typeof fn !== 'function') {
        throw('ctor must be a function')
    }
    let o = new Object()
    // 判断res返回的类型
    o.__proto__ = Object.create(fn.prototype)
    let res = fn.call(o, ...args)
    if ((typeof res === Object && res !== null) || typeof res === 'function'){
        return res
    } else {
        return o
    }
}

mockNew('2')