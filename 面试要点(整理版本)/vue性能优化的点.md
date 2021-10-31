- 路由懒加载
- keep-alive 缓存页面
- 使用v-show 复用dom
- v-for 遍历 避免使用 v-if
- 长列表性能优化
    ```js
    export defalut {
        data: () => ({
            users: []
        }),
        async create() {
            const users = await axios.get('/api/users')
            // 不会改变的数据，不需要响应式化
            this.users = object.freeze(users)
        }
    }
    ```

Vue2 和 vue3 的区别：
- vue3 增加了tree Shakking
```js
import {nextick} from 'vue'
next(() => {
    
})
```
