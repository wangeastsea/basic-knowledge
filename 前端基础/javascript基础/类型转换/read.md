#### 对象转字符串
- 如果对象具有 toString 方法，则调用这个方法。如果他返回一个原始值，JavaScript 将这个值转换为字符串，并返回这个字符串结果。
- 如果对象没有 toString 方法，或者这个方法并不返回一个原始值，那么 JavaScript 会调用 valueOf 方法。如果存在这个方法，则 JavaScript 调用它。如果返回值是原始值，JavaScript 将这个值转换为字符串，并返回这个字符串的结果。
- 否则，JavaScript 无法从 toString 或者 valueOf 获得一个原始值，这时它将抛出一个类型错误异常。

#### 对象转数字
- 如果对象具有 valueOf 方法，且返回一个原始值，则 JavaScript 将这个原始值转换为数字并返回这个数字
- 否则，如果对象具有 toString 方法，且返回一个原始值，则 JavaScript 将其转换并返回。
- 否则，JavaScript 抛出一个类型错误异常。

```
console.log(Number({})) // NaN
console.log(Number({a : 1})) // NaN
console.log(Number([])) // 0
console.log(Number([0])) // 0
console.log(Number([1, 2, 3])) // NaN
console.log(Number(function(){var a = 1;})) // NaN
console.log(Number(/\d+/g)) // NaN
console.log(Number(new Date(2010, 0, 1))) // 1262275200000
console.log(Number(new Error('a'))) // NaN
```

`🌰分析`：
我们 Number([]) 的时候，先调用 [] 的 valueOf方法,，此时返回 []，因为返回了一个对象而不是原始值，所以又调用了 toString 方法，此时返回一个空字符串，接下来调用 ToNumber 即 Number()方法，转换为 0, 所以最后的结果为 0。

 Number([1, 2, 3]) 的时候，先调用 [1, 2, 3] 的 valueOf 方法，此时返回 [1, 2, 3]，再调用 toString 方法，此时返回 1,2,3，接下来调用 ToNumber，参照对应表，因为无法转换为数字，所以最后的结果为 NaN。