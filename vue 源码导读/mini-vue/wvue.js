function observe (obj) {
    if (typeof obj !== 'object' || obj === null) {
        // 希望传入的是obj
        return 
    }
    // 创建Observer实例
    new Observer(obj)
}

function defineReactive(obj, key, val) {
    // 递归
    observe(val)
    // 创建一个Dep和当前key一一对应
    const dep = new Dep()
    
    // 对传入obj进行访问拦截
    Object.defineProperty(obj, key, {
        get() {
            console.log('get ' + key);
            // 依赖收集在这里
            Dep.target && dep.addDep(Dep.target)
            return val
        },
        set(newVal) {
            if (newVal !== val) {
                console.log('set ' + key + ':' + newVal);
            // 如果传入的newVal依然是obj，需要做响应化处理
                observe(newVal)
                val = newVal
            // 通知更新
                dep.notify()
            }
        }
    })
}
//  创建WVue构造函数
class WVue {
    constructor(options) {
        // 保存选项
        this.$options = options
        this.$data = options.data
        // 做响应式处理
        observe(this.$data)
        // 做参数代理，将$data上的属性，代理到vm实例上，方便访问。
        proxy(this, '$data')
        // 创建编译器
        new Compiler(options.el, this)
    }
}
// 根据对象类型决定如何做响应化
class Observer {
    constructor(value) {
        this.value = value
        // 判断其类型
        if (typeof value === 'object') {
            this.walk(value)
        }
    }
    // 对象数据响应化
    walk (obj) {
        Object.keys(obj).forEach(key => {
            defineReactive(obj, key, obj[key])
        })
    }
}

//做参数代理，将$data上的属性，代理到vm实例上，方便访问。
// 代理函数，方便用户直接访问$data中的数据
function proxy(vm, sourceKey) {
    // vm[sourceKey]就是vm[$data]
    Object.keys(vm[sourceKey]).forEach(key => {
      // 将$data中的key代理到vm属性中
        Object.defineProperty(vm, key, {
        get() {
            return vm[sourceKey][key]
        },
        set(newVal) {
            vm[sourceKey][key] = newVal
        }
        })
    })
}

// 模板编译
// 编译器
// 递归遍历dom树
// 判断节点类型，如果是文本，则判断是否是插值绑定
// 如果是元素，则遍历其属性判断是否是指令或事件，然后递归子元素
class Compiler {
    // el是宿主元素
    // vm是WVue实例
    constructor(el,vm ) {
        // 保存WVue实例
        this.$vm = vm
        this.$el = document.querySelector(el)
        if (this.$el) {
            // 开始编译
            this.compile(this.$el)
        }
    }
    compile(el) {
        const childNodes = el.childNodes
        Array.from(childNodes).forEach(node => {
            // 元素类型
            if(this.isElement(node)) {
                // console.log("编译元素" + node.nodeName);
                this.compileElement(node)
                //插值类型
            } else if (this.isInterpolation(node)) {
                // console.log("编译插值文本" + node.textContent);
                this.compileText(node)
            }
            if (node.childNodes && node.childNodes.length> 0) {
                // 递归遍历子节点
                this.compile(node)
            }
        })
    }
    isElement(node) {
        return node.nodeType === 1
    }
    isInterpolation(node) {
        // 首先是文本标签，其次内容是{{xxx}}
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }
    compileText(node) {
        // TODO 这里是什么原因
        console.log(RegExp.$1)
        // 获取插值里的值
        // node.textContent = this.$vm[RegExp.$1]
        this.update(node, RegExp.$1, 'text')
    }
    compileElement (node) {
        // 节点是元素
        // 遍历其属性列表
        let nodeAttrs = node.attributes
        Array.from(nodeAttrs).forEach(attr => {
             // 规定：指令以w-xx="oo"定义 w-text="counter"
            let attrName = attr.name // // k-xx k-text
            let exp = attr.value // oo counter
            if (this.isDirective(attrName)) {
                let dir = attrName.substring(2) // xx text
                //指令一定是作用于当前node的， 执行指令
                this[dir] && this[dir](node, exp)
            }
        })
    }
    //判断是否是指令
    isDirective (attr) {
        return attr.indexOf('w-') === 0
    }
    text(node, exp) {
        // node.textContent = this.$vm[exp]
        this.update(node, exp, 'text')
    }
    html(node,exp) {
        // node.innerHTML = this.$vm[exp]
        this.update(node, exp, 'html')
    }
    // 更新函数作用：
    // 1.初始化
    // 2.创建Watcher实例（在编译阶段）
    update (node, exp, dir) {
        // 指令对应更新函数xxUpdater
        const fn = this[dir+'Updater']
        fn && fn(node, this.$vm[exp])
        new watcher(this.$vm, exp, function(val) {
            // 更新处理，封装一个更新函数，可以更新对应dom元素
            fn && fn(node, val)
        })
    }
    textUpdater(node ,val) {
        node.textContent = val
    }
    htmlUpdater(node, val) {
        node.innerHTML = val
    }
}

// 依赖收集的实现
// vue2.0 一个依赖key对应一个dep,每一个依赖key对应一个wathcer,一个dep对应多个watcher
// 实现思路：
/**
* 1. defineReactive时为每一个key创建一个Dep实例
* 2. 初始化视图时读取某个key，例如name1，创建一个watcher1
* 3. 由于触发name1的getter方法，便将watcher1添加到name1对应的Dep中 
* 4. 当name1更新，setter触发时，便可通过对应Dep通知其管理所有Watcher更新
 */

 // 观察者:保存更新函数，值发生变化调用更新函数
// 监听器：负责更新视图，创建watcher， 触发getter，进行依赖收集
class watcher {
    constructor(vm, key, undateFn) {
        // wvue实例
        this.vm = vm
        // 依赖key
        this.key = key
        // 更新函数
        this.updateFn = undateFn
        // Dep.target静态属性上设置为当前watcher实例
        Dep.target = this
        //此时触发getter，同步执行收集工作
        this.vm[this.key]
        // setter 执行完,收集完毕，清空Dep.target
        Dep.target = null
    }
    update () {
        this.updateFn.call(this.vm, this.vm[this.key])
    }
}

// 声明Dep，依赖，管理某个key相关所有Watcher实例
class Dep {
    constructor() {
        this.deps = []
    }
    // 这里的dep就是一个watcher,简单理解就是一个插值对应一个watcher
    addDep (dep) {
        this.deps.push(dep)
    }
    //执行每一个watcher的更新方法
    notify () {
        this.deps.forEach(dep => dep.update())
    }
}