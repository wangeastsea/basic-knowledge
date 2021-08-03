## new, call, apply, bind模拟实现

#### 一： 模拟new的实现
我们首先看一下new的使用

```js
function aninmal (name, actions) {
    this.name = name
    this.actions = actions
    this.sayName = function () {
        console.log('myname :>> ', this.name) 
    }
}
let cat = new aninmal('cat', ['eat', 'cat-walk'])
```
我们分析一下，new 一个对象之后，返回的是什么，以及它的内部做了哪些操作？
- 一个继承aninmal的对象cat被创建
- `cat.__proto__ === aninmal.prototype`
- 需要执行构造函数aninmal，并将this 指向新创建的对象实例cat
- 返回被一个新对象
    - 如果构造函数没有显示返回，怎返回this
    - 如果构造函数显式的返回值，返回的是基本类型， 如 number，string，boolean, 则返回的还是this, 注意返回null,也是返回this
    - 如果构造函数显式返回的是对象，如 {name: 1}, 则返回这个对象{name: 1}

通过以上分析，我们来实现一个MNew来模拟以上实现

```js   
    function isObject (obj) {
        return (typeof obj === 'object' && typeof obj !== null) || typeof obj === 'function'
    }
    function MNew () {
        // this
        let o = new Object()
        // 获取构造函数
        let FunctionConstructor = Array.prototype.shift.call(arguments)
        // this对象指向构造函数的对象
        o.__proto__ = FunctionConstructor.prototype
        // 需要执行构造函数aninmal，并将this 指向新创建的对象实例cat
        let obj = FunctionConstructor.apply(o, arguments)
        return isObject(obj) ? obj : o
    }
```
我们来一个简单的例子测试一下MNew
```js
function parent (name, gender) {
    this.name = name
    this.gender = gender
    // return null
    // function _dd () {
    //     console.log('hellow')
    // }
    // return _dd
    // 默认return this
}

let aa = mNew(parent, 'rose', 'female')
console.log(aa)

let cc = new parent('jack', 'male')
console.log(cc) 
```

#### 二：模拟call实现

> call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。 -MDN

```js
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
    // this是当前 Food 的实例，继承于Product
  Product.call(this, name, price);
  this.category = 'food';
}

console.log(new Food('cheese', 5).name);
// expected output: "cheese"
```
我们分析下，如何实现一个call
- Product函数执行了
- Product函数里的this被绑定了call的第一个参数
- Product的入参是call第一个之后的参数

```js
// 有一点值得我们思考： 在没有依赖call,apply,bind的情况下，如果修改this指向
// 这里利用对象方法的形式： 把 Product 作为 call 第一个参数this的属性，如果通过 this.Product的方法调用，那么 Product里this就被绑定了call的this
Function.prototype.call = function (context, ...args) {
    let context = context || window
    // context 是 被绑定的this
    // this 是被call 调用的方法 
    let context.fn = this
    // 被绑定的this
    let res = context.fn(...args)
    delete context.fn
    return res
}
```
我们写一个简单的例子测试下：
```js
function bb(params) {
    this.bb = 123
    console.log('params==>', params) // 456
    return this
}
let obj = {aa: 456}
let cc = bb.call(obj, 456) // {aa: 345, bb: 123}
```
#### 三： apply 模拟的实现
我们既然实现了call的实现，那么 apply实现起来就简单多了
> apply() 方法调用一个具有给定this值的函数，以及以一个数组（或类数组对象）的形式提供的参数。- MDN 

通过MDN的定义，我们发现，call和 apply 唯一的区别就是，第二个参数的形式不同
```js
fn.call(obj, p1, p2, p3)
fn.apply(obj, [p1, p2, p3])
```
同样，我们分析，下如何实现一个apply，还是以Product这个例子来说明
- Product函数执行了
- Product函数里的this被绑定了apply的第一个参数
- Product的入参是apply第一个之后的参数的数组，内部会把数组拆开

```js
Function.prototype.apply = function (this, args) {
    let context = this || window
    context.fn = this
    let res = context.fn(...args)
    delete context.fn
    return res
}
```
同样，拿刚才的例子测试下
```js
function bb(a, b, c) {
    this.bb = 123
    console.log('params==>', a, b, c) // 3,4,5
    return this
}
let obj = {aa: 456}
let cc = bb.apply(obj, [3,4,5]) // {aa: 345, bb: 123}
```

#### 四：接下来，我们来实现bind
> bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。 -MDN

先来2个简单的例子

```js
function rose (gender, hobby) {
    this.gender = gender
    this.hobby = hobby
    console.log('name==>', this.name)
    return this
}
let jack = {
    name : 'jack'
}

let extendRose = rose.bind(jack, 'female',  ['swimming', 'football'])
console.log(extendRose())  
// { name: 'jack', gender: 'female', hobby: [ 'swimming', 'football' ] }


let extendRose = rose.bind(jack, 'female',  ['swimming', 'football'])
let person = new extendRose()  
console.log(person)
// 值得注意的是： 通过构造函数返回，this仍然是rose的实例
// name==> undefined： rose 当前 name没有赋值
// rose { gender: 'female', hobby: [ 'swimming', 'football' ] }
```

```js
let name = 'jack'
function getPerson (gender) {
    console.log(this.name)
    console.log('gender===>', gender)
}
let obj = {
    name: 'rose'
}
let person = getPerson.bind(obj, 'male')
person()
// 输出: 参数被带入了被bind的新函数
// rose 成功被绑定为obj
// gender===> male
```
通过以上的例子，我们来分析一下如何模拟一个bind，我们结合rose,jack例子来说明
- rose.bind(jack, b, c)  返回一个新的函数extendRose，函数的this指向 jack, 内置参数是 b, c
- extendRose 如果是通过new来调用的，则实例对象仍是rose的实例， this指向rose的实例。

接下来，我们来实现一个bind

```js
Function.prototype.bind = function (context, ...bindArgs) {
    // 不是函数绑定直接报错
    if (typeof this !== 'function') {
        throw new Error('this must be a function')
    }
    // 调用函数
    let fn = this
    let fbound = function(...args) {
        args = [...bindArgs, ...args]
        // 看下面的关键点，来理解这一句代码
        return fn.apply(this instanceof fn ? this : context, args)
    }
    // this 是当前被绑定的函数
    // 关键点：this 有原型对象，返回的函数不能丢失this原型链对象上的属性
    if (this.prototype) {
        fbound.prototype = Object.create(this.prototype)
    }
    return fbound
}
```

