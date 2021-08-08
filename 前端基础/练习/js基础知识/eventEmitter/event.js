class EventEmitter {
    constructor() {
        this.eventName = {}
    }
    // 触发事件
    emit(eName, ...args) {
        if (this.eventName[eName]) {
            this.eventName[eName].forEach(fn => fn.apply(this, args))
        }
        return this
    }
    // 绑定事件
    on(eName, fn) {
        if (!this.eventName[eName]) {
            this.eventName[eName] = []
        }
        this.eventName[eName].push(fn)
        return this
    }
    once(eName, fn) {
        const func =(...args) => {
            fn.apply(this. args)
            this.off(eName, func)
        }
        this.on(eName, func)
        return this
    }
    off(eName, fn) {    
        if (this.eventName[eName]) {
            this.eventName[eName] = this.eventName[eName].filter(item  =>  item !== fn)
        }
    }
}