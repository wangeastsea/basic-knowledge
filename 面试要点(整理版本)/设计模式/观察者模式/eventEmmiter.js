// 全局事件总线的特点

// 全局事件总线的特点——所有事件的发布/订阅操作，必须经由事件中心，禁止一切“私下交易”
/**
 *  this.bus.$on('someEvent', func)
    this.bus.$emit('someEvent', params)
 */

class EventEmitter {
    constructor() {
        this.eventManage = {}
    }
    // 触发监听事件
    emit(fnName, ...params) {    
        if (!this.eventManage[fnName]) return 
        const eventManage = this.eventManage[fnName].slice()
        eventManage.forEach((cb) => {
            cb(...params)
        })
    }
    off(fnName, cb) {
        if (!this.eventManage[fnName]) return 
        let callbacks = this.eventManage[fnName]
        let index = callbacks.indexOf(cb)
        if (index !== -1)  {
            callbacks.splice(index, 1)
        }
    }
    // 注册监听事件
    on(fnName, cb) {
        if (!this.eventManage[fnName]) {
            this.eventManage[fnName] = []
        } 
        this.eventManage[fnName].push(cb)
    }
    once(fnName, cb) {
        let middleCb = (...params) => {
            fnName(...params)
            this.off(fnName, middleCb)
        }
        this.on(fnName, middleCb)
    }
}

