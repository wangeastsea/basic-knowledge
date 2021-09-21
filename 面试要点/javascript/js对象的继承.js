// 面向对象的继承

// 1: 构造函数继承

function Parent1 () {
    this.name = 'parent1'
}
// 原型方法没有被继承。
Parent1.prototype.say = function () {
    console.log();
}
function Child1 () {
    Parent1.call(this)
    this.type = 'child1'
}
// 原型方法没有被继承。

// 2: 原型链继承

function Parent2 () {
    this.name = 'parent2' 
    this.eat = [1,2,3]
}

function Child2 () {
    this.type = 'child2'
}
Child2.prototype = new Parent2()
Child2.prototype.constructor = Child2


function Child3() {
    this.type = 'child3'
}
Child3.prototype = new Parent2()
Child3.prototype.constructor = Child3
// 所有子类的原型上，都会持有父类的引用属性
// 多个子类对象公共用了父类引用属性


// 3: 组合继承  原型链继承 + 构造函数继承

function Parent3 () {
    this.name = 'parent3'
    this.eat = [1,3,3,4]
}

function Child4 () {
    Parent3.call(this)
    this.type = 'child4'
}

Child4.prototype = new Parent3()

// 父类的构造函数执行了2次，浪费内存

// 4: 寄生式组合继承
function Parent4() {
    this.name  = 'parent4'
    this.eat = [1,32,4]
}
Parent4.prototype.walk = function () {
    console.log('walk');
}
function Child4 () {
    this.type = 'child4'
    Parent4.call(this)
}


Child4.prototype = Object.create(Parent4.prototype)

// let tempFunction = function() {}
// tempFunction.prototype = Parent4.prototype
// Child4.prototype = new tempFunction()

Child4.prototype.constructor = Child4
let o4 = new Child4



