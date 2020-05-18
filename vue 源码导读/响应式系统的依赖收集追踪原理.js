class Dep {
    constructor () {
        this.subs = [];
    }

    addSub (sub) {
        this.subs.push(sub);
    }

    notify () {
        this.subs.forEach((sub) => {
            sub.update();
        })
    }
}

class Watcher {
    constructor () {
        Dep.target = this;
    }

    update () {
        console.log("视图更新啦～");
    }
}

function observer (value) {
    if (!value || (typeof value !== 'object')) {
        return;
    }

    Object.keys(value).forEach((key) => {
        defineReactive(value, key, value[key]);
    });
}

function defineReactive (obj, key, val) {
    const dep = new Dep();

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter () {
            dep.addSub(Dep.target);
            return val;
        },
        set: function reactiveSetter (newVal) {
            if (newVal === val) return;
            val = newVal;
            dep.notify();
            console.log('dep', dep)
        }
    });
}

class Vue {
    constructor(options) {
        this._data = options.data;
        observer(this._data);
        new Watcher();
        console.log('render~', this._data.test);
        console.log('render2', this._data.jack)
    }
}

let o = new Vue({
    data: {
        test: "I am test.",
        jack: 'rose'
    }
});
o._data.test = "hello,test.";
o._data.jack = "hello, rose"

Dep.target = null;

// 一个对象属性对应一个dep，一个dep对应多个watcher(一个对象属性可能再多个标签使用，那么就会有对应多个watcher，这些watcher都会放入到这个对象属性唯一对应的dep中)，
// 这是Vue1.0的实现，但数据过大时，就会有很多个watcher，就会出现性能问题；所以在Vue2.0中引入的VDOM，给每个vue组件绑定一个watcher，
// 这个组件上的数据的dep中都包含有该watcher，当该组件数据发生变化时，就会通知watcher触发update方法，生成VDOM，和旧的VDOM进行比较，
// 更新改变的部分，极大的减少了watcher的数量，优化了性能；（所以，在Vue2.0中是一个组件对应一个watcher）

// Dep => key 的依赖者容器； Watcher => 依赖者(组件 / 实例)；
// 1.实例Vue的时候，将data对象传入observer(观察者)函数中为data对象的所有key定义行为(调defineReactive函数)；
// 2.在为每个key定义行为的时候，为每个key都实例了一个Dep；
// 3.当new Watcher 的时候，Dep的矛头(原本为null)将指向该Watcher实例；
// 4.调key的get的时候，将该Watcher实例放入Dep实例当中；
// 5.调key的set的时候，触发Dep实例中所有Watcher实例的更新方法；

