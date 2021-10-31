function Foo () {
    getName = function () {
        console.log(1);
    }
    return this
}
Foo.getName = function () {
    console.log(2);
}
Foo.prototype.getName = function () {
    console.log(3);
}

var getName = function () {
    console.log(4);
}

function getName() {
    console.log(5);
}

Foo.getName()
getName()
Foo().getName()
getName()
new Foo.getName()
new Foo().getName()
new new Foo().getName()


// 注意运算符优先级
// 考察点
// - 函数和类
// - 原型莲
// - 运算符优先级
// - 作用域
// - 变量提升
// https://coding.imooc.com/lesson/129.html#mid=9405