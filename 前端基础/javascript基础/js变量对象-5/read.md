>JavaScript深入之变量对象
 https://github.com/mqyqingfeng/Blog/issues/5
### 变量对象

变量对象是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明。

### 全局上下文
全局上下文中的变量对象就是全局对象！
- 可以通过 this 引用，在客户端 JavaScript 中，全局对象就是 Window 对象。
```
console.log(this);
```
- 全局对象是由 Object 构造函数实例化的一个对象。
```
console.log(this instanceof Object);
```
- 预定义了一堆，嗯，一大堆函数和属性。
```
// 都能生效
console.log(Math.random());
console.log(this.Math.random());
```
- 作为全局变量的宿主。
```
var a = 1;
console.log(this.a);
```
- 客户端 JavaScript 中，全局对象有 window 属性指向自身。
```
var a = 1;
console.log(window.a);

this.window.b = 2;
console.log(this.b);
```

### 函数上下文
在函数上下文中，我们用活动对象(activation object, AO)来表示变量对象。
活动对象是在进入函数上下文时刻被创建的，它通过函数的 arguments 属性初始化。arguments 属性值是 Arguments 对象。

### 执行过程
执行上下文的代码会分成两个阶段进行处理：分析和执行，我们也可以叫做：
- 进入执行上下文
- 代码执行

##### 进入执行上下文
当进入执行上下文时，这时候还没有执行代码，
变量对象会包括：
- 函数的所有形参 (如果是函数上下文)
    - 由名称和对应值组成的一个变量对象的属性被创建
    - 没有实参，属性值设为 undefined
- 函数声明
    - 由名称和对应值（函数对象(function-object)）组成一个变量对象的属性被创建
    - 如果变量对象已经存在相同名称的属性，则完全替换这个属性
- 变量声明
    - 由名称和对应值（undefined）组成一个变量对象的属性被创建；
    - 如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性


🌰说明：
```js
function foo(a) {
  var b = 2;
  function c() {}
  var d = function() {};

  b = 3;

}

foo(1);
```
在进入执行上下文后，这时候的 AO 是：
```js
AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: undefined,
    c: reference to function c(){},
    d: undefined
}
```
在代码执行阶段，会顺序执行代码，根据代码，修改变量对象的值
```js
AO = {
    arguments: {
        0: 1,
        length: 1
    },
    a: 1,
    b: 3,
    c: reference to function c(){},
    d: reference to FunctionExpression "d"
}
```
### 总结：
- 全局上下文的变量对象初始化是全局对象
- 函数上下文的变量对象初始化只包括 Arguments 对象(js文件执行之前吧)
- 在进入执行上下文时会给变量对象添加形参、函数声明、变量声明等初始的属性值（函数执行之前吧）
- 在代码执行阶段，会再次修改变量对象的属性值(函数执行的时候)


```js
console.log(foo);

function foo(){
    console.log("foo");
}

var foo = 1;
```
`结果： 会打印函数，而不是 undefined `
这是因为在进入执行上下文时，首先会处理函数声明，其次会处理变量声明，如果如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性。