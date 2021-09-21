class eventEmitter {
    constructor() {
        this.eventMap = {}
    }
    on (fnName, cb) {
        if (!this.eventMap[fnName]) {
            this.eventMap[fnName] = []
        }
        this.eventMap[fnName].push(cb)
    }
    emit(fnName, ...params) {
        if(this.eventMap[fnName]) {
            let fns = this.eventMap[fnName].slice()
            //删除 this.eventMap[fnName]里的东西， 不影响fns
            fns.forEach(cb => cb.apply(this, params))
        }
    }
    off(fnName, cb) {
        if (this.eventMap[fnName]) {
           let deleteIndex = this.eventMap[fnName].indexof(cb)
           if (deleteIndex !== -1) {
               this.eventMap[fnName].splice(deleteIndex, 1)
           }
        }
    }
    once(fnName, cb) {
        // 遇事不决，封一层
        let wrapper = () => {
            cb.apply(this, arguments)
            this.off(fnName, wrapper)
        }
        this.on(fnName, wrapper)
    }
}
