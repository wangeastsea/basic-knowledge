// 一句话，就是实现2个对象的完全隔离

/**
 * 浅拷贝只是创建了一个新的对象，复制了原有对象的基本类型的值，而引用数据类型只拷贝了一层属性，再深层的还是无法进行拷贝。
 * 深拷贝则不同，对于复杂引用数据类型，其在堆内存中完全开辟了一块内存地址，并将原有的对象完全复制过来存放。
 * 
 *  将一个对象从内存中完整地拷贝出来一份给目标对象，并从堆内存中开辟一个全新的空间存放新对象，
 *   且新对象的修改并不会改变原对象，二者实现真正的分离。
 */

//  方法一：乞丐版（JSON.stringify）

// JSON.stringify() 是目前开发过程中最简单的深拷贝方法，其实就是把一个对象序列化成为 JSON 的字符串，
// 并将对象里面的内容转换成字符串，
// 最后再用 JSON.parse() 的方法将JSON 字符串生成一个新的对象


/** 
let obj1 = { a:1, b:[1,2,3] }
let str = JSON.stringify(obj1)
let obj2 = JSON.parse(str)
console.log(obj2)  //{a:1,b:[1,2,3]} 
obj1.a = 2
obj1.b.push(4)
console.log(obj1)  //{a:2,b:[1,2,3,4]}
console.log(obj2)  //{a:1,b:[1,2,3]}

*/
/**
 * 缺陷： 
 - 拷贝的对象的值中如果有函数、undefined、symbol 这几种类型，经过 JSON.stringify 序列化之后的字符串中这个键值对会消失；
 - 拷贝 Date 引用类型会变成字符串；
 - 无法拷贝不可枚举的属性；
 - 无法拷贝对象的原型链；
 - 拷贝 RegExp 引用类型会变成空对象；
 - 对象中含有 NaN、Infinity 以及 -Infinity，JSON 序列化的结果会变成 null；
 - 无法拷贝对象的循环应用，即对象成环 (obj[key] = obj)。
 */
// 基础版本

 let obj1 = {
     a: {
         b: 1
     }
 }

 function deepClone(obj) {
     let cloneObj = {}
     for(let key in obj) {
         if (typeof obj[key] === 'object') {
             // 递归拷贝
            cloneObj[key] = deepClone(obj[key])
         } else {
             cloneObj[key] = obj[key]
         }
     }
     return cloneObj
 }


 /**
  * 问题：
    - 这个深拷贝函数并不能复制不可枚举的属性以及 Symbol 类型的属性值；
    - 这种方法只是针对普通的引用类型的值做递归复制，而对于 Array、Date、RegExp、Error、Function 这样的引用类型并不能正确地拷贝；
    - 对象的属性里面成环，即循环引用没有解决
  * 
  */

/**
 * 需要怎么做：
- 针对能够遍历对象的不可枚举属性以及 Symbol 类型，我们可以使用 Reflect.ownKeys 方法；
    Reflect.ownKeys方法用于返回对象的所有属性，基本等同于Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和。
- 当参数为 Date、RegExp 类型，则直接生成一个新的实例返回
- 利用 Object 的 getOwnPropertyDescriptors 方法可以获得对象的所有属性，以及对应的特性，顺便结合 Object 的 create 方法创建一个新对象，并继承传入原对象的原型链；
- 利用 WeakMap 类型作为 Hash 表，因为 WeakMap 是弱引用类型，可以有效防止内存泄漏（你可以关注一下 Map 和 weakMap 的关键区别，这里要用 weakMap），
    作为检测循环引用很有帮助，如果存在循环，则引用直接返回 WeakMap 存储的值。
    WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。
    weakMap的设计目的：
    它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。
    因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。
    也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。
 */

// demo:
function Obj() { 
    this.func = function () { alert(1) }
    this.sym = Symbol(1)
    this[Symbol.for('baz')] = 3
}
let nobj = new Obj();
Object.defineProperty(nobj,'innumerable',{ 
  enumerable:false,
  value:'innumerable'
});
// console.log(Object.getOwnPropertySymbols(nobj));
// console.log(Object.getOwnPropertyNames(nobj));
console.log(Reflect.ownKeys(nobj))
// console.log(Object.getOwnPropertyDescriptors(nobj));
/**
{
    func: {
      value: [Function],
      writable: true,
      enumerable: true,
      configurable: true
    },
    sym: {
      value: Symbol(1),
      writable: true,
      enumerable: true,
      configurable: true
    },
    innumerable: {
      value: 'innumerable',
      writable: false,
      enumerable: false,
      configurable: false
    },
    [Symbol(baz)]: { value: 3, writable: true, enumerable: true, configurable: true }
  }
   */

  


// 开始动手实现啦
const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && (obj!== null )
// TODO
function deepClone (obj, hash = new WeakMap()) {
    // 处理日期对象
    if(obj.constructor === Date) {
        return new Date(obj)
    }
    // 处理正则构造函数 RegExp
    if (obj.constructor === RegExp) {
        return new RegExp(obj)
    }
    if (hash.has(obj)) {
        return has.get(obj)
    }
    let allDesc = Object.getOwnPropertyDescriptors(obj)
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create
    // 这里是简单的浅拷贝，先把obj的所有属性拷贝到cloneObj上，然后递归进行深层次的拷贝，同时也拷贝了obj的原型
    let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)
    hash.set(obj, cloneObj)
    for(let key of Reflect.ownKeys(obj)) {
        if (isComplexDataType(obj[key]) &&  typeof obj[key] !== 'function') {
            // 开始递归拷贝
            cloneObj[key] = deepClone(obj[key], hash)
        } else {
            // 基本类型的，是值拷贝
            cloneObj[key] = obj[key]
        }
    }
    return cloneObj
}
let cloneO = deepClone1(nobj)
console.log(cloneO)