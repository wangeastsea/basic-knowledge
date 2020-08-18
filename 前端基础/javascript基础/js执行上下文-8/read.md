> https://github.com/mqyqingfeng/Blog/issues/4
变量提升的是声明，函数提升的是定义
```js
var foo = function () {

    console.log('foo1');

}

foo();  // foo1

var foo = function () {

    console.log('foo2');

}

foo(); // foo2
```
```js
function foo() {

    console.log('foo1');

}

foo();  // foo2

function foo() {

    console.log('foo2');

}

foo(); // foo2
```
### 可执行代码
> 全局代码、函数代码、eval代码

当执行到一个函数的时候，就会进行准备工作，这里的“准备工作”，让我们用个更专业一点的说法，就叫做"执行上下文(execution context)"。

### 执行上下文栈
JavaScript 引擎创建了执行上下文栈（Execution context stack，ECS）来管理执行上下文