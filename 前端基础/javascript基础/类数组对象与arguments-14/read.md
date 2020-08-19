> https://github.com/mqyqingfeng/Blog/issues/14
#### 类数组对象
> 拥有一个 length 属性和若干索引属性的对象

```js
var array = ['name', 'age', 'sex'];

var arrayLike = {
    0: 'name',
    1: 'age',
    2: 'sex',
    length: 3
}
```
```js
// 读写
console.log(array[0]); // name
console.log(arrayLike[0]); // name

array[0] = 'new name';
arrayLike[0] = 'new name';
```

```js
// 长度
console.log(array.length); // 3
console.log(arrayLike.length); // 3
```

```js
// 遍历
for(var i = 0, len = array.length; i < len; i++) {
   ……
}
for(var i = 0, len = arrayLike.length; i < len; i++) {
    ……
}

```
那类数组对象可以使用数组的方法吗？比如：
```js
arrayLike.push('4');
```
然而上述代码会报错: arrayLike.push is not a function
所以终归还是类数组呐……

#### 调用数组方法
如果类数组就是任性的想用数组的方法怎么办呢？
既然无法直接调用，我们可以用 Function.call 间接调用：
```js
var arrayLike = {0: 'name', 1: 'age', 2: 'sex', length: 3 }

Array.prototype.join.call(arrayLike, '&'); // name&age&sex

Array.prototype.slice.call(arrayLike, 0); // ["name", "age", "sex"] 
// slice可以做到类数组转数组

Array.prototype.map.call(arrayLike, function(item){
    return item.toUpperCase();
}); 
// ["NAME", "AGE", "SEX"]
```
#### 类数组转数组
在上面的例子中已经提到了一种类数组转数组的方法，再补充三个：
```js
var arrayLike = {0: 'name', 1: 'age', 2: 'sex', length: 3 }
// 1. slice
Array.prototype.slice.call(arrayLike); // ["name", "age", "sex"] 
// 2. splice
// array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
Array.prototype.splice.call(arrayLike, 0); // ["name", "age", "sex"] 
// 3. ES6 Array.from
Array.from(arrayLike); // ["name", "age", "sex"] 
// 4. apply
Array.prototype.concat.apply([], arrayLike)
```
> array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
splice() 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。
如果 deleteCount 被省略了，或者它的值大于等于array.length - start(也就是说，如果它大于或者等于start之后的所有元素的数量)，那么start之后数组的所有元素都会被删除。


说到类数组对象，Arguments 对象就是一个类数组对象。在客户端 JavaScript 中，一些 DOM 方法(document.getElementsByTagName()等)也返回类数组对象。

#### Arguments对象
Arguments 对象只定义在函数体中，包括了函数的参数和其他属性。在函数体中，arguments 指代该函数的 Arguments 对象。

```js
function foo(name, age, sex) {
    console.log(arguments);
}

foo('name', 'age', 'sex')
```
![image.png](https://upload-images.jianshu.io/upload_images/5016475-b055ea08fc10848f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

 - length属性
```js
function foo(b, c, d){
    console.log("实参的长度为：" + arguments.length)
}

console.log("形参的长度为：" + foo.length)

foo(1)

// 形参的长度为：3
// 实参的长度为：1
```
- callee属性
Arguments 对象的 callee 属性，通过它可以调用函数自身。
```js
var data = [];

for (var i = 0; i < 3; i++) {
    (data[i] = function () {
       console.log(arguments.callee.i) 
    }).i = i;
}

data[0]();
data[1]();
data[2]();

// 0
// 1
// 2
```
#### arguments 和对应参数的绑定 

```js
function foo(name, age, sex, hobbit) {

    console.log(name, arguments[0]); // name name

    // 改变形参
    name = 'new name';

    console.log(name, arguments[0]); // new name new name

    // 改变arguments
    arguments[1] = 'new age';

    console.log(age, arguments[1]); // new age new age

    // 测试未传入的是否会绑定
    console.log(sex); // undefined

    sex = 'new sex';

    console.log(sex, arguments[2]); // new sex undefined

    arguments[3] = 'new hobbit';

    console.log(hobbit, arguments[3]); // undefined new hobbit

}

foo('name', 'age')
```
传入的参数，实参和 arguments 的值会共享，当没有传入时，实参与 arguments 值不会共享
除此之外，以上是在非严格模式下，如果是在严格模式下，实参和 arguments 是不会共享的。

#### 传递参数
将参数从一个函数传递到另一个函数
```js
// 使用 apply 将 foo 的参数传递给 bar
function foo() {
    bar.apply(this, arguments);
}
function bar(a, b, c) {
   console.log(a, b, c);
}

foo(1, 2, 3)
```

### 强大的ES6
使用ES6的 ... 运算符，我们可以轻松转成数组。
```js
function func(...arguments) {
    console.log(arguments); // [1, 2, 3]
}

func(1, 2, 3);
```

arguements 使用场景包括
如果要总结这些场景的话，暂时能想到的包括：

参数不定长
函数柯里化
递归调用
函数重载
...