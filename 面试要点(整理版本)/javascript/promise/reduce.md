```js
array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
```
total	必需。初始值, 或者计算结束后的返回值。
currentValue	必需。当前元素
currentIndex	可选。当前元素的索引
arr	可选。当前元素所属的数组对象。

```js
reducer 函数接收4个参数:
Accumulator (acc) (累计器)
Current Value (cur) (当前值)
Current Index (idx) (当前索引)
Source Array (src) (源数组)

initialValue可选
作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。

arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
```

```js
const array1 = [1, 2, 3, 4];
const reducer = (previousValue, currentValue) => previousValue + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15

```


**回调函数第一次执行时，accumulator 和currentValue的取值有两种情况**：

- **如果调用reduce()时提供了initialValue，accumulator取值为initialValue，currentValue取数组中的第一个值；**

- **如果没有提供 initialValue，那么accumulator取数组中的第一个值，currentValue取数组中的第二个值。**



**如果没有提供initialValue，reduce 会从索引1的地方开始执行 callback 方法，跳过第一个索引。如果提供initialValue，从索引0开始。**

```js
[1, 2].reduce((total, cur) => {
    console.log(total, cur);
    return total + cur
})

```