> call() 方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法。
```js
var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

bar.call(foo); // 1
```
warning: 
- call 改变了 this 的指向，指向到 foo
- bar 函数执行了


如何模拟：
- *第一步*
```js
var foo = {
    value: 1,
    bar: function() {
        console.log(this.value)
    }
};

foo.bar(); // 1
```
- 将函数设为对象的属性
- 执行该函数
- 删除该函数
```js
// 第一步
foo.fn = bar
// 第二步
foo.fn()
// 第三步
delete foo.fn
```
**第一版的 call 函数**
```js
Function.protoType.call2 = function (context) {
    context.fn = this
    context.fn()
    delete context.fn
}
var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

bar.call2(foo); // 1
```

- *第二步* call 函数还能给定参数执行函数

```js
var foo = {
    value: 1
};

function bar(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value);
}

bar.call(foo, 'kevin', 18);
// kevin
// 18
// 1
```
```js
// 以上个例子为例，此时的arguments为：
// arguments = {
//      0: foo,
//      1: 'kevin',
//      2: 18,
//      length: 3
// }
// 因为arguments是类数组对象，所以可以用for循环
var args = [];
for(var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']');
}

// 执行后 args为 ["arguments[1]", "arguments[2]"]
```
**第二版的 call 函数**
```js
// 第二版
Function.prototype.call2 = function(context) {
    context.fn = this;
    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }
    eval('context.fn(' + args +')');
    delete context.fn;
}

// 测试一下
var foo = {
    value: 1
};

function bar(name, age) {
    console.log(name)
    console.log(age)
    console.log(this.value);
}

bar.call2(foo, 'kevin', 18); 
// kevin
// 18
// 1
```

- *第三步* 需要注意2个点
    - this 参数可以传 null，当为 null 的时候，视为指向 window
    ```js
    var value = 1;

    function bar() {
        console.log(this.value);
    }

    bar.call(null); // 1
    ```
    - 函数是可以有返回值的！
    ```js
    var obj = {
        value: 1
    }

    function bar(name, age) {
        return {
            value: this.value,
            name: name,
            age: age
        }
    }

    console.log(bar.call(obj, 'kevin', 18));
    // Object {
    //    value: 1,
    //    name: 'kevin',
    //    age: 18
    // }

    ```

    **第三版的 call 函数**
```js
// 第三版
Function.prototype.call2 = function (context) {
    var context = context || window;
    context.fn = this;

    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }

    var result = eval('context.fn(' + args +')');

    delete context.fn
    return result;
}

// 测试一下
var value = 2;

var obj = {
    value: 1
}

function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}

bar.call2(null); // 2

console.log(bar.call2(obj, 'kevin', 18));
// 1
// Object {
//    value: 1,
//    name: 'kevin',
//    age: 18
// }
```

****
**apply 实现的最终版本**
```js
Function.prototype.apply = function (context, arr) {
    var context = Object(context) || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    }
    else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }

    delete context.fn
    return result;
}
```
```js
var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

bar.apply(foo) // 1
```
