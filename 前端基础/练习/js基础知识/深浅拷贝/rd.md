### 浅拷贝
浅拷贝是我们写项目时，经常要使用的一个方法，那么什么是浅拷贝呢，这里我们给浅拷贝一个定义？

自己创建一个新的对象，来接受你要重新复制或引用的对象值。如果对象属性是基本的数据类型，复制的就是基本类型的值给新对象；但如果属性是引用数据类型，复制的就是内存中的地址，如果其中一个对象改变了这个内存中的地址，肯定会影响到另一个对象。

简言之，就拷贝对象的第一层。

#### 我们来看看有哪些方法可以实现浅拷贝

##### 方法一： Object.assgin() 是 ES6 提供的方法
> Object.assign() 方法用于将所有**可枚举属性**的值从一个或多个源对象分配到目标对象。它将返回目标对象。- [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

```js
Object.assign(target, ...sources)
```

我们来几个例子看下
```js
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };
// 返回目标对象
const returnedTarget = Object.assign(target, source)

target === returnedTarget  // ==> true
```

如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。后面的源对象的属性将类似地覆盖前面的源对象的属性。
```js
const obj = { a: 1 };
const copy = Object.assign({a: 5}, obj);
console.log(copy.a); // 1 
```

如果源值是一个对象的引用，它仅仅会复制其引用值。只拷贝第一层
```js
const obj = { a: 1, b: {c: 2} };
const copy = Object.assign({a: 3}, obj);
obj.b.c = 4
console.log(copy.b.c) // 4
```

继承属性和不可枚举属性是不能拷贝的,参考下MDN的例子
```js
const obj = Object.create({foo: 1}, { // foo 是个继承属性。
    bar: {
        value: 2  // bar 是个不可枚举属性。
    },
    baz: {
        value: 3,
        enumerable: true  // baz 是个自身可枚举属性。
    }
});
// bar 默认是不能枚举的，所以只能拷贝baz这个属性
const copy = Object.assign({}, obj);
console.log(copy); // { baz: 3 }
```
拷贝 symbol 类型的属性
```js
const o1 = { a: 1 };
const o2 = { [Symbol('foo')]: 2 };
const obj = Object.assign({}, o1, o2); 
console.log(obj) // { a: 1, [Symbol(foo)]: 2 }
```
拷贝访问器

```js
const obj = {
  foo: 1,
  get bar() {
    return 2;
  }
};

let copy = Object.assign({}, obj);
console.log(copy); // { foo: 1, bar: 2 } copy.bar的值来自obj.bar的getter函数的返回值
```
通过以上的例子，我们总结一下使用 object.assign 方法的几点需要注意：
- 它不会拷贝对象的继承属性；
- 它不会拷贝对象的不可枚举的属性；
- 可以拷贝 Symbol 类型的属性。

##### 扩展运算符方式

扩展运算符的语法为：
```js
let cloneObj = { ...obj }
```

```js
/* 对象的拷贝 */
let obj = {a:1,b:{c:1}}
let obj2 = {...obj}
obj.a = 2
console.log(obj)  //{a:2,b:{c:1}} 
console.log(obj2); //{a:1,b:{c:1}}
obj.b.c = 2
console.log(obj)  //{a:2,b:{c:2}} 
console.log(obj2); //{a:1,b:{c:2}}
/* 数组的拷贝 */
let arr = [1, 2, 3];
let newArr = [...arr]; //跟arr.slice()是一样的效果
```
扩展运算符 和 object.assign 有同样的缺陷，也就是实现的浅拷贝的功能差不多，但是如果属性都是基本类型的值，使用扩展运算符进行浅拷贝会更加方便。

##### concat 拷贝数组
concat 拷贝数组也仅实现了浅拷贝，所以连接一个含有引用类型的数组时，需要注意修改原数组中的元素的属性，因为它会影响拷贝之后连接的数组。
```js
let arr = [1, 2, 3];
let newArr = arr.concat();
newArr[1] = 100;
console.log(arr);  // [ 1, 2, 3 ]
console.log(newArr); // [ 1, 100, 3 ]
```

##### slice 拷贝数组
slice仅仅是数组的方法，仅能对数组进行浅拷贝
```js
let arr = [1, 2, {val: 4}];
let newArr = arr.slice();
newArr[2].val = 1000;
console.log(arr);  //[ 1, 2, { val: 1000 } ]
```

通过以上的举例，我们列举了几种实现浅拷贝的方法，浅拷贝的局限就是它只能拷贝一层对象，如果存在对象的嵌套，那么浅拷贝将不能去递归的拷贝。

接下来，我们手动来实现一个浅拷贝。
我们首先分析一下实现思路：
- 对基础类型做一个最基本的一个拷贝
- 对引用类型开辟一个新的存储，并且拷贝一层对象属性。

```js
function shallowClone (target) {
    if (typeof target === 'object' && target !== null)  {
        let cloneobj = Array.isArray(target) ? [] : {}
        for(key in target) {
            if (target.hasOwnProperty(key)) {
                cloneobj[key] = target[key]
            }
        }
        return cloneobj
    } else {
        // 基本类型的直接返回
        return target
    }
}
```

#### 深拷贝

浅拷贝只是创建了一个新的对象，复制了原有对象的基本类型的值，而引用数据类型只拷贝了一层属性，再深层的还是无法进行拷贝。深拷贝则不同，对于复杂引用数据类型，其在堆内存中完全开辟了一块内存地址，并将原有的对象完全复制过来存放。

特点就是：这两个对象是相互独立、不受影响的，彻底实现了内存上的分离。

那么接下来，我们看看实现深拷贝的方法有哪些？

##### 方法一： JSON.stringify

 JSON.stringify把一个对象序列化成为 JSON 的字符串，并将对象里面的内容转换成字符串，最后再用 JSON.parse() 的方法将JSON 字符串生成一个新的对象

 ```js
 let obj1 = { a:1, b:[1,2,3] }
let str = JSON.stringify(obj1)；
let obj2 = JSON.parse(str)；
console.log(obj2);   //{a:1,b:[1,2,3]} 
obj1.a = 2；
obj1.b.push(4);
console.log(obj1);   //{a:2,b:[1,2,3,4]}
console.log(obj2);   //{a:1,b:[1,2,3]}
 ```
但是JSON.stringify还存在以下问题：

- 拷贝的对象的值中如果有函数、undefined、symbol 这几种类型，经过 JSON.stringify 序列化之后的字符串中这个键值对会消失；
- 拷贝 Date 引用类型会变成字符串；
- 无法拷贝不可枚举的属性；
- 无法拷贝对象的原型链；
- 拷贝 RegExp 引用类型会变成空对象；
- 对象中含有 NaN、Infinity 以及 -Infinity，JSON 序列化的结果会变成 null；
- 无法拷贝对象的循环应用，即对象成环 (obj[key] = obj)。


```js
function Obj() { 
  this.func = function () { alert(1) }; 
  this.obj = {a:1};
  this.arr = [1,2,3];
  this.und = undefined; 
  this.reg = /123/; 
  this.date = new Date(0); 
  this.NaN = NaN;
  this.infinity = Infinity;
  this.sym = Symbol(1);
} 
let obj1 = new Obj();
Object.defineProperty(obj1,'innumerable',{ 
  enumerable:false,
  value:'innumerable'
});
console.log('obj1',obj1);
let str = JSON.stringify(obj1);
let obj2 = JSON.parse(str);
console.log('obj2',obj2);
```