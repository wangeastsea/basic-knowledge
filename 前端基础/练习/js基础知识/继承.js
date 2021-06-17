// 首先要明白 原型 实例 构造函数 3者之间的关系

// 实例是通过new构造函数生成的
// 实例的的__proto__ 指向了原型
// 构造函数的protoType指向了原型
// 原型的constructor属性指向了构造函数

// JS几种继承的总结
/**
 * 1: 原型链继承
 * 缺点：引用属性被所有子类共用了
 */
function parent1 () {
    this.name = 'parent'
    this.play = [1,2,3]
}
function child1 () {
    this.type = 'child'
}

child1.prototype = new parent1()

let c1 = new child1()
let c2 = new child1()
c1.play.push(4)
// console.log(c2.play) // [ 1, 2, 3, 4 ]

/**
 * 2: 构造函数继承，（借助call 调用父类的构造函数，从而继承父类的属性）
 * 确定： 没法继承父类原型的属性
 */
function Parent2 () {
    this.name = 'parent2'
}
Parent2.prototype.getName = function () {
    return this.name
}
function Child2 () {
    Parent2.call(this)
    this.type = 'child2'
}
let c3 = new Child2()
// console.log('child.getName', c3.getName())  // 报错

/**
 * 3: 组合继承（结合原型链继承和构造函数继承）
 * 可以解决上述的2个问题，但是父类的构造函数被重复执行了，造成的结果就是：
 * 子类的对象有一份父类对象的拷贝，子类的原型上也存在一份父类的拷贝。多构造一次，就多一次性能的开销
 */
function Parent3 () {
    this.name = 'parent3'
    this.play = [1,2,3]
}
Parent3.prototype.getName = function () {
    return this.name
}
function Child3 () {
    Parent3.call(this)
    this.type = 'Child3'
}
Child3.prototype = new Parent3()

let c4 = new Child3()
let c5 = new Child3()
// console.log('c4', c4.play.push(4))
// console.log('c5', c5.play) 

/**
 * 4: 原型式继承
 * lett B = Object.create(A) : 创建了一个对象B，对象B 的 __proto__ 指向了 A对象， A是一个新对象（B）原型的对象。
 * 缺点： 公用了父类的所有属性。
 */
let Parent4 =  {
    name: 'parent4',
    play:  [1,2,3],
    getName: function () {
        return this.name
    }
}
let c6 = Object.create(Parent4)
let c7 = Object.create(Parent4)
c6.name = 'c6'
// console.log(c6.name === c6.getName()) 

// console.log('c6', c6.play.push(4))
// console.log('c7', c7.play) // c7 [ 1, 2, 3, 4 ]

/**
 * 5: 寄生式继承
 * 这种方式也是利用了原型式继承，所有会有原型式继承的优缺点，但是会在父类的基础上添加更多的方法。
 */

 let Parent5 =  {
    name: 'parent5',
    play:  [1,2,3],
    getName: function () {
        return this.name
    }
}
function clone (source) {
    let clone = Object.create(source)
    clone.getPlay = function () {
        return this.play
    }
    return clone
}

let c8 = clone(Parent5)
// console.log(c8.getPlay())
// console.log(c8.getName())

/**
 * 6: 寄生（使用了原型式）组合式（构造函数+原型链）继承
 */


function clone (parent, child) {
    child.prototype = Object.create(parent.prototype)
    // 调整子类构造函数指向
    child.prototype.constructor = child
}
function Parent6()  {
    this.name =  'parent6',
    this.play =  [1,2,3],
    this.getName =  function () {
        return this.name
    }
}
Parent6.prototype.getPlay = function () {
    return this.play
}

function child6() {
    Parent6.call(this)
    this.name = 'child6'
}

clone(Parent6, child6)

let c9 = new child6()
console.log(c9.getPlay())

// function clone (parent, child) {
//     // 这里改用 Object.create 就可以减少组合继承中多进行一次构造的过程
//     child.prototype = Object.create(parent.prototype);
//     child.prototype.constructor = child;
//   }

//   function Parent6() {
//     this.name = 'parent6';
//     this.play = [1, 2, 3];
//   }
//    Parent6.prototype.getName = function () {
//     return this.name;
//   }
//   function Child6() {
//     Parent6.call(this);
//     this.friends = 'child5';
//   }

//   clone(Parent6, Child6);

//   Child6.prototype.getFriends = function () {
//     return this.friends;
//   }

//   let person6 = new Child6();
//   console.log(person6);
//   console.log(person6.getName());
//   console.log(person6.getFriends());