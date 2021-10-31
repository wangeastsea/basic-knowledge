class EventEmitter {
    constructor() {
        this.events = {}
    }
    on(name, fn) {
        if (!this.events[name]) {
            this.events[name] = []
        }
        this.events[name].push(fn)
        return this
    }
    emit(name, ...args) {
        // 做一个浅拷贝, 这里如果不做浅拷贝，会导致 某些函数调用的时候被遗漏
        const cbs = this.events[name].slice()
        if (!cbs) {
            console.warn(`${name} event is not registered.`);
            return this;
        }
        cbs.forEach(cb => {
            cb.apply(this, args)
        })
        return this
    }
    off(name, fn) {
        // 全部清理
        if (!fn) {
            this.events[name] = null
        } else  {
            this.events[name] = this.events[name].filter(item => item !== fn)
        }
    }
    once(name, fn) {
        let wrap = function (...args) {
            this.off(name, wrap)
            fn.apply(this, args)
        }
        this.on(name, wrap)
        return this
    }
}


let arr = [1,2,3,4,5,6,7,8]
arr.forEach((item, index) => {
    if (index === 3) {
        arr.splice(3, 1)
    }
    console.log(item);
}) 