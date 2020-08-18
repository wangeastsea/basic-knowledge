> https://github.com/mqyqingfeng/Blog/issues/8
Reference由以下3部分组成：
- base value
- referenced name
- strict reference

`base value` 就是属性所在的对象或者就是 EnvironmentRecord，它的值只可能是 undefined, an Object, a Boolean, a String, a Number, or an environment record 其中的一种。

`referenced name 就是属性的名称`
```js
var foo = 1;

// 对应的Reference是：
var fooReference = {
    base: EnvironmentRecord,
    name: 'foo',
    strict: false
};
```
```js
var foo = {
    bar: function () {
        return this;
    }
};
 
foo.bar(); // foo

// bar对应的Reference是：
var BarReference = {
    base: foo,
    propertyName: 'bar',
    strict: false
};
```

规范中还提供了获取 Reference 组成部分的方法，比如 GetBase 和 IsPropertyReference。

- GetBase 返回 reference 的 base value。
- IsPropertyReference  简单的理解：如果 base value 是一个对象，就返回true。
- GetValue:  一个用于从 Reference 类型获取对应值的方法
 ```js
 var foo = 1;

var fooReference = {
    base: EnvironmentRecord,
    name: 'foo',
    strict: false
};

GetValue(fooReference) // 1;
 ```
 GetValue 返回对象属性真正的值，但是要注意：
 `调用 GetValue，返回的将是具体的值，而不再是一个 Reference`

 ### 如何确定this的值
 - 计算 MemberExpression 的结果赋值给 ref
 - 判断 ref 是不是一个 Reference 类型
    - 2.1 如果 ref 是 Reference，并且 IsPropertyReference(ref) 是 true, 那么 this 的值为 GetBase(ref)
    - 2.2 如果 ref 是 Reference，并且 base value 值是 Environment Record, 那么this的值为 ImplicitThisValue(ref)
    - 2.3 如果 ref 不是 Reference，那么 this 的值为 undefined


### 具体分析
MemberExpression :
- PrimaryExpression // 原始表达式 可以参见《JavaScript权威指南第四章》
- FunctionExpression // 函数定义表达式
- MemberExpression [ Expression ] // 属性访问表达式
- MemberExpression . IdentifierName // 属性访问表达式
- new MemberExpression Arguments // 对象创建表达式

```js
function foo() {
    console.log(this)
}

foo(); // MemberExpression 是 foo

function foo() {
    return function() {
        console.log(this)
    }
}

foo()(); // MemberExpression 是 foo()

var foo = {
    bar: function () {
        return this;
    }
}

foo.bar(); // MemberExpression 是 foo.bar
```
`所以简单理解 MemberExpression 其实就是()左边的部分。`

#### 判断 ref 是不是一个 Reference 类型
```js
var value = 1;

var foo = {
  value: 2,
  bar: function () {
    return this.value;
  }
}

//示例1
console.log(foo.bar());
//示例2
console.log((foo.bar)());
//示例3
console.log((foo.bar = foo.bar)());
//示例4
console.log((false || foo.bar)());
//示例5
console.log((foo.bar, foo.bar)());
```

##### 🌰 foo.bar()
var Reference = {
  base: foo,
  name: 'bar',
  strict: false
};

> 2.1 如果 ref 是 Reference，并且 IsPropertyReference(ref) 是 true, 那么 this 的值为 GetBase(ref)

该值是 Reference 类型，那么 IsPropertyReference(ref) 的结果是多少呢？
前面我们已经铺垫了 IsPropertyReference 方法，如果 base value 是一个对象，结果返回 true。
base value 为 foo，是一个对象，所以 IsPropertyReference(ref) 结果为 true。
```
this = GetBase(ref)
```


```js
var value = 1;

var foo = {
  value: 2,
  bar: function () {
    return this.value;
  }
}

//示例1
console.log(foo.bar()); // 2
//示例2
console.log((foo.bar)()); // 2
//示例3
console.log((foo.bar = foo.bar)()); // 1
//示例4
console.log((false || foo.bar)()); // 1
//示例5
console.log((foo.bar, foo.bar)()); // 1
```
以上是在非严格模式下的结果，严格模式下因为 this 返回 undefined，所以示例 3 会报错。


🌰
```js
function foo() {
    console.log(this)
}
foo(); 
```
```js
var fooReference = {
    base: EnvironmentRecord,
    name: 'foo',
    strict: false
};
```
MemberExpression 是 foo，解析标识符，查看规范 10.3.1 Identifier Resolution，会返回一个 Reference 类型的值：
> 2.1 如果 ref 是 Reference，并且 IsPropertyReference(ref) 是 true, 那么 this 的值为 GetBase(ref)
因为 base value 是 EnvironmentRecord，并不是一个 Object 类型，还记得前面讲过的 base value 的取值可能吗？ 只可能是 undefined, an Object, a Boolean, a String, a Number, 和 an environment record 中的一种。
> 2.2 如果 ref 是 Reference，并且 base value 值是 Environment Record, 那么this的值为 ImplicitThisValue(ref)
base value 正是 Environment Record，所以会调用 ImplicitThisValue(ref)

查看规范 10.2.1.1.6，ImplicitThisValue 方法的介绍：该函数始终返回 undefined。

所以最后 this 的值就是 undefined。