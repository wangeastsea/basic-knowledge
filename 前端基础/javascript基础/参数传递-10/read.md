
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