const sum = new Function('a', 'b', 'return a + b');
// console.log(typeof sum)
// console.log(Object.getOwnPropertyDescriptors(sum))
// const child = new sum()
// console.log(child.__proto__ === sum.prototype)
console.log(typeof sum.prototype)
// console.log(sum.__proto__ === Function.prototype)
// console.log(sum(1,2))  
/**
 * 通过 new Function 构造出的函数sum, 此时的sum是函数的一个实例，通过 `typeof sum === 'function'` 可以知道sum也是一个函数。
 * 此时有 sum.__proto__ === Function.prototype， 实例sum.__proto__指向构造函数的原型Function.prototype，__proto__ 可以理解为指针，指向构造函数的原型对象。
 * 既然是函数，就可以作为构造函数，继续创建属于sum的实例。const child = new sum() ，此时有child.__proto === sum.prototype,sum.prototype 是一个空对象。
 * 注意区分： sum.prototype 和 sum.__proto__的区别。
 *  sum.prototype 是在构造函数sum 执行的过程中，赋予到sum一个prototype的属性。其 sum.prototype.__proto === Ojbect.prototype
 * sum.__proto__ 是构成函数Function的原型，sum.__proto__ === Function.prototype
 * 这2个概念不能搞乱了。这周要整理成博客。
 * 
 * 
 */
