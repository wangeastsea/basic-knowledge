对于每个执行上下文，都有三个重要属性：

- 变量对象(Variable object，VO)
- 作用域链(Scope chain)
- this

### 作用域链
当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。

### 让我们以一个函数的创建和激活两个时期来讲解作用域链是如何创建和变化的。
函数的作用域在函数定义的时候就决定了。
这是因为函数有一个内部属性 [[scope]]，当函数创建的时候，就会保存所有父变量对象到其中，你可以理解 [[scope]] 就是所有父变量对象的层级链，但是注意：[[scope]] 并不代表完整的作用域链！

🌰 创建
```js
function foo() {
    function bar() {
        ...
    }
}
```
函数创建时，各自的[[scope]]为：
```js
foo.[[scope]] = [
  globalContext.VO
];

bar.[[scope]] = [
    fooContext.AO,
    globalContext.VO
];
```
🌰 激活
当函数激活时，进入函数上下文，创建 VO/AO 后，就会将活动对象添加到作用链的前端。
这时候执行上下文的作用域链，我们命名为 Scope：

```js
Scope = [AO].concat([[Scope]]);
```
**至此，作用域链创建完毕。**

### 捋一捋
通过以下🌰 ：我们描述下函数执行上下文中作用域链和变量对象的创建过程：
```js
var scope = "global scope";
function checkscope(){
    var scope2 = 'local scope';
    return scope2;
}
checkscope();
```
- checkscope 函数被创建，保存作用域链到 内部属性[[scope]]
```js
checkscope.[[scope]] = [
    globalContext.VO
];
```
- 执行 checkscope 函数，创建 checkscope 函数执行上下文，checkscope 函数执行上下文被压入执行上下文栈
```js
ECStack = [
    checkscopeContext,
    globalContext
];
```
- checkscope 函数并不立刻执行，开始做准备工作，第一步：复制函数[[scope]]属性创建作用域链
```js
checkscopeContext = {
    Scope: checkscope.[[scope]],
}
```
- 第二步：用 arguments 创建活动对象，随后初始化活动对象，加入形参、函数声明、变量声明
```js
checkscopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope2: undefined
    }，
    Scope: checkscope.[[scope]],
}
```
- 第三步：将活动对象压入 checkscope 作用域链顶端
```js
checkscopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope2: undefined
    },
    Scope: [AO, [[Scope]]]
}
```
- 准备工作做完，开始执行函数，随着函数的执行，修改 AO 的属性值
```js
checkscopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope2: 'local scope'
    },
    Scope: [AO, [[Scope]]]
}
```
- 查找到 scope2 的值，返回后函数执行完毕，函数上下文从执行上下文栈中弹出
```js
ECStack = [
    globalContext
];
```
疑点解答： 
checkscope函数创建的时候，保存的是根据词法所生成的作用域链，checkscope执行的时候，会复制这个作用域链，作为自己作用域链的初始化，然后根据环境生成变量对象，然后将这个变量对象，添加到这个复制的作用域链，这才完整的构建了自己的作用域链。