// demo
function say (name) {
    this.name = name
    this.say = 'hello'
    console.log(this);
    console.log(this.name + ' say ' +this.say);
}

// say.apply(this, ['jack'])

// say.call(this, 'jack')

let bindSay = say.bind(this, 'jack')
// bindSay()

let cc = new bindSay()

console.log(cc instanceof bindSay);
cc.say

function mockApply(context, params) {
    if (typeof this !== 'function') {
        throw new Error('this must be a function')
    }
    context = context || window
    context.fn = this
    let res = context.fn(...params)
    delete context.fn
    return res
}

// 使用proxy 改写
function mockCall(context, ...params) {
    if (typeof this !== 'function') {
        throw new Error('this must be a function')
    }
    // 获取调用函数
    context = context || window
    context.fn = this
    let res = context.fn(...params)
    delete context.fn
    return res
}

// ????? 重点理解复习bind实现原理
// // bind 有一点需要特别注意的点
function mockBind(context, ...args) {
    if (typeof this !== 'function') {
        throw new Error('this must be a function')
    }
    // 保存当前调用函数
    let self = this
    // 返回的函数
    let fbound = function () {
        // 如果是通过new， 则此this 的原型链上跟self是可以链接上的
        self.apply(this instanceof self ? this : context,  args.concat(Array.prototype.slice.call(arguments)))
    }
    // 如果this有原型，fbound继承这个原型
    // 因为new一个bind过生成的新函数时候，必须的条件是要继承原函数的原型。
    if (this.prototype) {
        fbound.prototype = Object.create(this.prototype)
        console.log(fbound.prototype.constructor);
    }
    return fbound
}