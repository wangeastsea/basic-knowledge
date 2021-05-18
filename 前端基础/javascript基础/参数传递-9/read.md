
> https://github.com/mqyqingfeng/Blog/issues/10

在《JavaScript高级程序设计》第三版 4.1.3，讲到传递参数：
> ECMAScript中所有函数的参数都是按值传递的。

什么是按值传递呢？

> 也就是说，把函数外部的值复制给函数内部的参数，就和把值从一个变量复制到另一个变量一样。

```js
var value = 1;
function foo(v) {
    v = 2;
    console.log(v); //2
}
foo(value);
console.log(value) // 1

```
当传递 value 到函数 foo 中，相当于拷贝了一份 value，假设拷贝的这份叫 _value，函数中修改的都是 _value 的值，而不会影响原来的 value 值。

### 引用传递？
```js
var obj = {
    value: 1
};
function foo(o) {
    o.value = 2;
    console.log(o.value); //2
}
foo(obj);
console.log(obj.value) // 2
```
```js
var obj = {
    value: 1
};
function foo(o) {
    o = 2;
    console.log(o); //2
}
foo(obj);
console.log(obj.value) // 1
```
如果 JavaScript 采用的是引用传递，外层的值也会被修改呐，这怎么又没被改呢？所以真的不是引用传递吗？

这就要讲到其实还有第三种传递方式，叫按共享传递。

`而共享传递是指，在传递对象的时候，传递对象的引用的副本。`

所以修改 o.value，可以通过引用找到原值，但是直接修改 o，并不会修改原值。所以第二个和第三个例子其实都是按共享传递。

**参数如果是基本类型是按值传递，如果是引用类型按共享传递。**