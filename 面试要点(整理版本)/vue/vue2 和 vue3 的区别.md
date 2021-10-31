vue2 的问题：
- Mixin 造成的代码混乱，容易发生命名冲突
- vue 的类型约束是用的是flow, 集成TS不友好，使用装饰器的写法增加了心智负担。
- Vue2.x实现双向数据绑定原理，是通过es5的 Object.defineProperty，是必须先知道想要拦截和修改的key是什么，所以vue2对于新增的属性无能为力，比如无法监听属性的添加和删除、数组索引和长度的变更，vue2的解决方法是使用Vue.set(object, propertyName, value) 等方法向嵌套对象添加响应式。

vue3 的优点：

- vue3支持vue2的大多数特性，实现对vue2的兼容
- vue3具有的composition API实现逻辑模块化和重用
- 增加了新特性，如Teleport组件，全局API的修改和优化。例如for循环和if的优先级
- Vue3.x使用了ES2015的更快的原生proxy 替代 Object.defineProperty，Proxy可以理解成，在对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。。Proxy可以直接监听对象而非属性，并返回一个新对象，具有更好的响应式支持。


区别：
- Object.defineProperty 与proxy
- options API 和 composition API
- vue3是TS实现的，所有对于TS支持的优化
- 生命周期不同

beforeCreate -> 请使用 setup()
created -> 请使用 setup()
beforeMount -> onBeforeMount
mounted -> onMounted
beforeUpdate -> onBeforeUpdate
updated -> onUpdated
beforeDestroy -> onBeforeUnmount
destroyed -> onUnmounted
errorCaptured -> onErrorCaptured
其他的都类似，最关键的是 beforeCreate 和created 被 setup() 替代

- 入口文件的写法
```js
// vue2写法
// vue2全局配置的修改，会修改Vue对象的属性
// 在不同的app中，共享一份有着不同配置的Vue对象，也变得非常困难
import Vue from 'vue'
import App from './App.vue'
Vue.config.xx=xx
Vue.use(...)
Vue.mixin(...)

new Vue({
  render:h=>h(app)
}).$mount('#app')

// vue3写法
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(APP) // 创建一个app实例
app.config.xx=xx  // 在实例上修改配置，不会发生冲突
app.use(...)
app.mixin(...)
app.mount('#app')
```