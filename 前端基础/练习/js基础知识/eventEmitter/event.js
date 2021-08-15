
// 实现一个简单的eventEmitter, 所有操作都是同步的。
class EventEmitter {
    constructor(options = {}) {
        this.events = {}
        this.maxListeners = options.maxListeners || Infinity
    }
    // 触发事件
    emit(eName, ...args) {
        if (this.events[eName]) {
            this.events[eName].forEach(fn => fn.apply(this, args))
        }
        return this
    }
    // 绑定事件
    on(eName, fn) {
        // 针对某一个事件名的最大监听数
        if ( this.maxListeners !== Infinity && this.events[eName].length > this.maxListeners) {
            console.warn(`${eName} is reached max listeners`)
            return this
        }
        if (!this.events[eName]) {
            this.events[eName] = []
        }
        this.events[eName].push(fn)
        return this
    }
    once(eName, fn) {
        // 包装一个函数，用完即焚
        const func =(...args) => {
            fn.apply(eName, args)
            this.off(eName, func)
        }
        // 用完即焚
        this.on(eName, func)
        return this
    }
    off(eName, fn) {    
        if (!fn) {
            this.events[eName] = null
        } else {
            this.events[eName] = this.events[eName].filter(item  =>  item !== fn)
        }
        return this
    }
}