/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * 变量的解构赋值
 */

// -------------------------------------------------------------------
/**
 * 基本概念：
 *    本质上就是一种匹配模式，只要等号两边的模式相同，那么左边的变量就可以
 *    被赋予对应的值。
 * 结构赋值主要分为：
 *    1 数组的解构赋值
 *    2 对象的结构赋值
 *    3 基本类型的解构赋值
 */
// let a = 1;
// let b = 2;
// let c = 3;

// let [a, b, c] = [1, 2, 3];

// console.log(a, b, c);

// -------------------------------------------------------------------
// 1 数组的解构赋值

// let [a, [[b], c]] = [1, [[2], 3]];
// 
// console.log(a, b, c);  // 1, 2, 3

// let [, , c] = [1, 2, 3];
// 
// console.log(c); // 3

// let [x] = [];
// 
// console.log(x);  // let x; undefined

// let [y = 1] = [];
// 
// console.log(y); // 1



// -------------------------------------------------------------------
// 2 对象的解构赋值
// let {a, b} = {b: 'bbb', a: 'aaa'};
// 
// console.log(a, b);

// let {a: b} = {a: 1};
// 
// console.log(b);
// console.log(a);


// -------------------------------------------------------------------
//3 基本类型的解构赋值

// let [a, b, c, d] = '1234';
// 
// console.log(a, b, c, d);

// let {length: len} = 'miaov';
// 
// console.log(len);

// let {toString: ts} = 1;
// let {toString: bs} = true;
// 
// console.log(ts === Number.prototype.toString);
// console.log(bs === Boolean.prototype.toString);

// null 和 undefined 不能进行解构赋值

// let [a] = null;



/**
 * 数据结构 Set
 */

// -----------------------------------------------------
/**
 * 集合的基本概念：集合是由一组无序且唯一（即不能重复）的项组成的。这个数据结构使用了与有限集合相同的数学概念，应用在计算机的数据结构中。
 * 特点：key 和 value 相同，没有重复的 value。
 *
 * ES6 提供了数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
 */
// -----------------------------------------------------
// 1 如何创建一个 Set

// const s = new Set([1, 2, 3]);

// console.log(s);


// // -----------------------------------------------------
// // 2 Set 类的属性 

// console.log(s.size); // 3


// // -----------------------------------------------------
// // 3 Set 类的方法

// // 1 set.add(value) 添加一个数据，返回Set结构本身。

// s.add('a').add('b').add('c');

// console.log(s);


// // 2 set.delete(value) 删除指定数据，返回一个布尔值，表示删除是否成功。

// console.log(s.delete('a'));
// console.log(s);

// console.log(s.delete('a'));

// // 3 set.has(value) 判断该值是否为Set的成员，反回一个布尔值。

// console.log(s.has('a')); // false
// console.log(s.has(1)); // true

// // 4 set.clear() 清除所有数据，没有返回值。

// // s.clear();
// // 
// // console.log(s);

// // 5 keys() 返回键名的遍历器

// console.log(s.keys());

// // 6 values() 返回键值的遍历器

// console.log(s.values());

// // 7 entries() 返回键值对的遍历器

// console.log(s.entries());

// // 8 forEach() 使用回调函数遍历每个成员

// s.forEach(function (value, key, set) {
//   console.log(value + ' miaov');
// });

// console.log(s);

// // -----------------------------------------------------

// s.add(1);

// console.log(s);


/**
 * 数据结构 Map
 */

// -----------------------------------------------------
/**
 * 字典：是用来存储不重复key的Hash结构。不同于集合的是，字典使用的是[键，值]的形式来储存数据的。
 * 
 * JavaScript 的对象（Object:{}）只能用字符串当作键。这给它的使用带来了很大的限制。
 *
 * 为了解决这个问题，ES6提供了Map数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object结构提供了“字符串—值”的对应，Map结构提供了“值—值”的对应，是一种更完善的Hash结构实现。如果你需要“键值对”的数据结构，Map比Object更合适。。
 */

// const data1 = {};
// const data2 = {};
// 
// const obj = {};
// 
// obj[data1] = 1;
// obj[data2] = 2;
// 
// console.log(obj);

// -----------------------------------------------------
// 1 如何创建一个 Map

// const map = new Map([
//   ['a', 1],
//   ['b', 2],
//   [{ a: 1 }, 3],
//   [{ b: 2 }, 4]
// ]);

// console.log(map);

// -----------------------------------------------------
// 2 Map 类的属性 

// console.log(map.size);

// -----------------------------------------------------
// 3 Map 类的方法

// 1 set(key, value) 设置键名key对应的键值为value，然后返回整个 Map 结构。如果key已经有值，则键值会被更新，否则就新生成该键。

// map.set('miaov', 'hello').set('new', 'fq');

// console.log(map);

// 2 get(key) get方法读取key对应的键值，如果找不到 key，返回undefined。

// console.log(map.get('new'));
// console.log(map.get({}));

// 3 delete(key) 删除某个键，返回true。如果删除失败，返回false。

// console.log(map.delete('a'));
// console.log(map);

// console.log(map.delete('a'));

// 4 has(key) 方法返回一个布尔值，表示某个键是否在当前Map对象之中。

// console.log(map.has('new'));
// console.log(map.has('a'));

// 5 clear() 清除所有数据，没有返回值。

// map.clear();
// 
// console.log(map);

// 6 keys() 返回键名的遍历器

// console.log(map.keys());

// 7 values() 返回键值的遍历器

// console.log(map.values());

// 8 entries() 返回键值对的遍历器

// console.log(map.entries());

// 9 forEach() 使用回调函数遍历每个成员

// map.forEach(function (value, key, map) {
//   console.log(key + ':' + value);
// });

// -----------------------------------------------------
// Map 在使用过程中的一些注意事项：

// map.clear();

// map.set({}, 1).set({}, 2);

// console.log(map);

// map.clear();

// map.set(NaN, 1).set(NaN, 2);

// console.log(map);


/**
 * Iterator和for...of循环
 */

// ---------------------------------------------------------------
/**
 * > 基本概念：
 * 
 * 在ES6中新增了Set和Map两种数据结构，再加上JS之前原有的数组和对象，这样就有了四种数据集合，平时还可以组合使用它们，定义自己的数据结构，比如数组的成员是Map，Map的成员是对象等。这样就需要一种统一的接口机制，来处理所有不同的数据结构。
 *
 * Iterator就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署Iterator接口，就可以完成遍历操作，而且这种遍历操作是**依次**处理该数据结构的所有成员。
 *
 * Iterator遍历器的做用：
 *  - 为各种数据结构，提供一个统一的、简便的访问接口。
 *  - 使得数据结构的成员能够按某种次序排列。
 *  - ES6新增了遍历命令for...of循环，Iterator接口主要供for...of消费。
 */

// ---------------------------------------------------------------
// 1 手写 Iterator 接口

// const arr = [1, 2, 3];
// 
// function iterator(arr){
//   let index = 0;
//   return {
//     next: function (){
//       return index < arr.length ? 
//       {value: arr[index++], done: false} :
//       {value: undefined, done: true};
//     }
//   }
// }
// 
// const it = iterator(arr);
// 
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());

/* Iterator的遍历过程：
 *  - 创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
 *  - 第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。
 *  - 第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。
 *  - 不断调用指针对象的next方法，直到它指向数据结构的结束位置。
 *
 * 每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。
 */


// 2 凡是具有 Symbol.iterator 属性的数据结构都具有 Iterator 接口

// const arr = [1, 2, 3];
// const set = new Set(['a', 'b', 'c']);
// const map = new Map([['a', 1]]);

// const itArr = arr[Symbol.iterator]();
// const itSet = set[Symbol.iterator]();
// const itMap = map[Symbol.iterator]();

// console.log(itArr);
// console.log(itSet);
// console.log(itMap);


// console.log(itSet.next());
// console.log(itSet.next());
// console.log(itSet.next());
// console.log(itSet.next());

// const obj = {};

// console.log(obj[Symbol.iterator]);


/**
 * 3 具备iterator接口的数据结构都可以进行如下操作
 *  - 解构赋值
 *  - 扩展运算符
 */

// let [x, y] = set;
// 
// console.log(x, y);

// ...

// let str = 'miaov';
// 
// let arrStr = [...str];
// 
// console.log(arrStr);

// const arr2 = [{}, 1, 'a', 1, 'a', 'b', []];
// 
// console.log([...new Set(arr2)]);


// ---------------------------------------------------------------
// 4 for...of循环

// const ofArr = [1, 2, 3, 4];

// for (let i of ofArr) {
//   console.log(i);
// }

// const m = new Map();

// m.set('a', 1).set('b', 2).set('c', 3);

// for(let data of m){
//   console.log(data);
// }

// for (let [key, value] of m) {
//   console.log(key, value);
// }


/**
 * class 语法
 */

// -------------------------------------------------------
/**
 * JS语言的传统方法是通过构造函数，定义并生成新对象，是一种基于原型的面向对象系统。这种写法跟传统的面向对象语言（比如C++和Java）差异很大，很容易让新学习这门语言的人感到困惑。所以，在ES6中新增加了类的概念，可以使用 class 关键字声明一个类，之后以这个类来实例化对象。
 */

// const Miaov = function (a, b){
//   this.a = a;
//   this.b = b;
//   return this;
// };
// 
// Miaov.prototype = {
//   constructor: Miaov,
//   print: function (){
//     console.log(this.a + ' ' + this.b);
//   }
// };
// 
// 
// const miaov = new Miaov('hello', 'world').print();

// class Miaov {
//   constructor(a, b) {
//     this.a = a;
//     this.b = b;
//     return this;
//   }
//   print() {
//     console.log(this.a + ' ' + this.b);
//   }
// };

// const miaov = new Miaov('hello', 'world').print();

// console.log(typeof Miaov);


// 1 Miaov中的constructor方法是构造方法，this关键字则代表实例对象。也就是说，ES5的构造函数Miaov，对应ES6的Miaov这个类的构造方法。

// 2 Miaov这个类除了构造方法，还定义了一个print方法。注意，定义“类”的方法的时候，前面不需要加上function这个关键字，直接把函数定义放进去了就可以了。另外，方法之间不需要逗号分隔，加了会报错。

// 3 构造函数的prototype属性，在ES6的“类”上面继续存在。而且类的所有方法都定义在类的prototype属性上面。

// console.log(Miaov.prototype);

// 4 定义在类中的方法都是不可以枚举的。

// console.log(Object.keys(Miaov.prototype));

// 5 constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。

// class P { };

// const p = new P();

// console.log(p);

// 6 生成类的实例对象的写法，与ES5完全一样，也是使用new命令。如果忘记加上new，像函数那样调用Class，将会报错。

// P();



/**
 * class 的继承等相关知识
 */

// extends、 static、 super

// const canvas = document.querySelector('#canvas');
// const ctx = canvas.getContext('2d');

// const w = canvas.width = 600;
// const h = canvas.height = 400;

// class Ball {
//   constructor(x, y, r) {
//     this.x = x;
//     this.y = y;
//     this.r = r;
//     this.color = `rgb(${~~Ball.rpFn([55, 255])}, ${~~Ball.rpFn([55, 255])}, ${~~Ball.rpFn([55, 255])})`;
//     return this;
//   }
//   render(ctx) {
//     ctx.save();
//     ctx.translate(this.x, this.y);
//     ctx.fillStyle = this.color;
//     ctx.beginPath();
//     ctx.arc(0, 0, this.r, 0, 2 * Math.PI);
//     ctx.fill();
//     ctx.restore();
//     return this;
//   }
//   static rpFn(arr) { // Ball.rpFn([1, 10])
//     let max = Math.max(...arr),
//       min = Math.min(...arr);
//     return Math.random() * (max - min) + min;
//   }
// }

// const ball1 = new Ball(100, 100, 30).render(ctx);

// class SuperBall extends Ball {
//   constructor(x, y, r) {
//     // Ball.call(this, x, y, r);
//     // this.color = 'red';
//     super(x, y, r);
//     this.vy = SuperBall.rpFn([2, 4]);
//     this.g = SuperBall.rpFn([0.2, 0.4]);
//     this.a = 0;
//     return this;
//   }
//   move(ctx) {
//     // super();  // 报错

//     this.y += this.vy;
//     this.vy += this.g;

//     let current = this.vy * -0.75;

//     if (this.y + this.r >= ctx.canvas.height) {
//       this.y = ctx.canvas.height - this.r;

//       if (Math.abs(current - this.a) < 0.01) return false;

//       this.a = this.vy *= -0.75;
//     }

//     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
//     super.render(ctx);

//     return true;
//   }
// };

// // const ball1 = new SuperBall(100, 100, 30).render(ctx);

// let ball, timer;

// canvas.onclick = function (e) {
//   let x = e.offsetX, y = e.offsetY;

//   let r = ~~Ball.rpFn([25, 55]);

//   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
//   ball = new SuperBall(x, y, r).render(ctx);

//   ballMove();
// }

// function ballMove() {
//   timer = window.requestAnimationFrame(ballMove);

//   if (!ball.move(ctx)) {
//     window.cancelAnimationFrame(timer);
//   }
// }



/**
 * Symbol
 */

/**
 * 1 什么是 Symbol ?
 *  Symbol，表示独一无二的值。它是 JS 中的第七种数据类型。
 */

// 基本的数据类型： Null Undefined Number Boolean String Symbol
// 引用数据类型：Object

// let s1 = Symbol();

// let s2 = Symbol();

// console.log(typeof s1); // 'symbol'
// 
// console.log(s1 === s2);


// Symbol 函数前不能使用 new 否则会报错，原因在于 Symbol 是一个原始类型的值，不是对象。

// let s3 = new Symbol();

// console.log(s1);
// console.log(s2);

// Symbol 函数接收一个字符串作为参数，表示对Symbol的描述，主要是为了在控制台显示，或者转为字符串的时候，比较容易区分

// let s3 = Symbol('miaov');
// let s4 = Symbol('leo');
// 
// console.log(s3, s4);
// 
// 
// console.log(Symbol('momo') === Symbol('momo'));

/**
 * 2 Symbol 数据类型的转换
 */

// console.log(String(Symbol('miaov'))); // Symbol(miaov)
// console.log(Symbol('leo').toString()); // Symbol(leo)
// 
// console.log(!!Symbol()); // true
// console.log(Number(Symbol()));

// console.log(Symbol('momo') + 'pangzi');
// console.log(Symbol('momo') * 100);  不能做任何运算。


/**
 * 3 作为对象的属性名
 */

// let yyy = Symbol('yyy');
// 
// const obj = {};
// 
// obj[yyy] = 'hello';
// 
// console.log(obj);
// 
// console.log(obj[yyy]);

// let ss = Symbol('ss');
// 
// const data = {
//   [ss]: 'miaov'
// };
// 
// console.log(data);
// 
// console.log(data[ss]);

// const data = {
//   [Symbol()]: 123,
//   a: 1,
//   b: 2
// };

// console.log(data);
// console.log(data['Symbol()']);

// 不能被for...in循环遍，历虽然不能被遍历，但是也不是私有的属性，可以通过Object.getOwnPropertySymbols方法获得一个对象的所有的Symbol属性

// for (let i in data) {
//   console.log(i);
// }

// console.log(Object.getOwnPropertySymbols(data)); // [Symbol()]

// console.log(data[Object.getOwnPropertySymbols(data)[0]]);


// 4 Symbol.for() 和 Symbol.keyFor





/**
 * 数组的扩展
 */

// Array.from() 

// var lis = document.querySelectorAll('li');
// 
// // console.log(Array.isArray(lis));
// 
// var lis2 = Array.from(lis);
// 
// console.log(lis2);
// console.log(Array.isArray(lis2));


// Array.of()

// const arr = Array.of(1);
// 
// console.log(arr);


// find()  findIndex()

// const arr = [1, 2, 3, 4];
// 
// let res = arr.find(function (a){
//   return a < -100;
// });
// 
// console.log(res);

// let res = arr.findIndex(function (a){
//   return a < -200;
// });
// 
// console.log(res);


// fill()

// const arr = [1, 2, 3, 4];
// 
// arr.fill('abc', 1, 3);
// 
// console.log(arr);



/**
 * 对象的扩展
 */

// 对象的简洁表示法

// let a = 1;

// const obj = {
//   a: a
// };

// const obj = {a}
// 
// console.log(obj);

// const obj = {
//   fn: function (){
//     console.log(1);
//   },
//   fn2(){
//     console.log(2);
//   }
// }
// 
// obj.fn();
// obj.fn2();




// Object.is()

// console.log(Object.is(NaN, NaN));
// 
// console.log(Object.is(+0, -0));  //false



// Object.assign() 
// 用于对象的合并，将源对象的所有可枚举属性，复制到目标对象。

// let obj1 = { a: 1 };
// let obj2 = { a: 2, b: 3 };
// let obj3 = { c: 'abc' };

// Object.assign(obj1, obj2, obj3);

// console.log(obj1);


/**
 * 字符串的扩展
 */

// 模板字符串

// let flag = true;
// 
// let html = `<ul>
//               <li>
//                 <span>${'首页'}</span>
//                 <span></span>
//                 <span></span>
//                 <span class="${flag ? 'show' : 'hide'}"></span>
//                 <span></span>
//               </li>
//             </ul>`;
//             
// console.log(html);



/**
 * 1 repeat
 * 2 includes() startsWith() endsWith()
 */

// let str1 = 'a';
// 
// let str2 = str1.repeat(3);
// 
// console.log(str2);

// let str = 'miaov';
// 
// console.log(str.includes('ao'));  // true
// console.log(str.includes('asd'));  // false
// 
// console.log(str.startsWith('m')); // true
// console.log(str.startsWith('o')); // false
// 
// console.log(str.endsWith('ov')); // true
// console.log(str.endsWith('m')); // true




/**
 * 函数的扩展
 *  1 为函数参数指定默认值
 *  2 函数的 rest 参数
 *  3 箭头函数
 */

// ------------------------------------------------

// function fn(a, b){
//   a = a || 10;
//   b = b || 20;
//   console.log(a + b);
// }

// fn();
// fn(0, 10);

// function fn(a = 10, b = 20){
//   console.log(a + b);
// }
// 
// fn();
// fn(0, 10);


// ----------------------------------------------
//rest 参数形式为（“...变量名”），用于获取函数的多余参数，这样就不需要使用arguments对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

// function sum(){
//   var args = arguments;
//   var res = 0;
//   for(var i=0; i<args.length; i++){
//     res += args[i];
//   }
//   console.log(res);
// }
// 
// sum(1, 2, 3, 4, 5);

// function sum(a, ...arr, b){
//   var res = a;
//   for(var i=0; i<arr.length; i++){
//     res += arr[i];
//   }
//   console.log(res);
// }
// 
// sum(10, 1, 2, 3, 4, 5);

// -----------------------------------------------
// 使用“箭头”（=>）定义函数。

// const fn = a => a;
// 
// const fn2 = function (a){
//   return a;
// };
// 
// console.log(fn(1));
// console.log(fn2(2));

// const fn = (a, b) => a + b;
// 
// console.log(fn(1, 2));

// const fn = (a, b) => {
//   a = a * 2;
//   b = b * 2;
//   return a + b;
// };
// 
// console.log(fn(1, 2));

// const fn = (a, b) => ({a, b});
// 
// console.log(fn(1, 2));

// var arr = [5, 2, 3, 4, 1];

// arr.sort(function (a, b){
//   return a - b;
// });
// 
// console.log(arr);

// arr.sort((a, b) => a - b);
// 
// console.log(arr);

// 1 箭头函数体内没有自己的this对象，所以在使用的时候，其内部的this就是定义时所在环境的对象，而不是使用时所在环境的对象。

// function fn(){
//   setTimeout(function (){
//     console.log(this);
//   }, 1000);
//   setTimeout(() => {
//     console.log(this);
//   },1000);
// }
// 
// var obj = {a: 1};
// 
// fn.call(obj);

// 不能给箭头函数使用 call apply bind 去改变其内部的this指向

// 2 箭头函数体内没有arguments对象，如果要用，可以用Rest参数代替。

// function fn(){
//   setTimeout(() => {
//     console.log(arguments);
//   }, 1000)
// }
// 
// fn(1, 2, 3);

// const fn = (...arr) => arr;
// 
// console.log(fn(1, 2, 3, 4));

// 3 不可以当作构造函数，不可以使用new命令，否则会抛出一个错误。

// const Fn = (a, b) => a + b;

// const f = new Fn(1, 2);




// Promise

/**
 * 基本概念：
 *  Promise：是ES6中新增的异步编程解决方案，体现在代码中它是一个对象，
 *          可以通过 Promise 构造函数来实例化。
 *          
 *  - new Promise(cb)  ===> 实例的基本使用  Pending Resolved Rejected
 *
 *  > 两个原型方法：
 *    - Promise.prototype.then()  
 *    - Promise.prototype.catch()
 *
 *  > 两个常用的静态方法：
 *    - Promise.all()
 *    - Promise.resolve()
 */
// const imgs = [
//   'http://i1.piimg.com/1949/4f411ed22ce88950.jpg',
//   'http://i1.piimg.com/1949/5a35e8c2b246ba6f.jpg',
//   'http://i1.piimg.com/1949/1afc870a86dfec5f.jpg'
// ];

// new Promise(cb)
// Pending (进行中) ===> Resolved (已完成)
// Pending (进行中) ===> Rejected (已失败)

// const p = new Promise(function (resolve, reject){
//   const img = new Image();
//   img.src = '';
//   img.onload = function (){
//     resolve(this);
//   };
//   img.onerror = function (){
//     reject(new Error('图片加载失败'));
//   };
// });

// console.log(123);
// 
// p.then(function (img){
//   console.log('加载完成');
//   document.body.appendChild(img)
// }).catch(function (err){
//   console.log(err);
// })
// 
// console.log(456);

// function loadImg(url) {
//   const p = new Promise(function (resolve, reject) {
//     const img = new Image();
//     img.src = url;
//     img.onload = function () {
//       resolve(this);
//     };
//     img.onerror = function () {
//       reject(new Error('图片加载失败'));
//     };
//   });
//   return p;
// }

// loadImg(imgs[0]).then(function (img){
//   document.body.appendChild(img)
// })

/**
 * Promise.all 可以将多个Promise实例包装成一个新的Promise实例
 * 
 *  - 当所有Promise实例的状态都变成resolved，Promise.all的状态才会变成resolved，此时返回值组成一个数组，传递给then中的resolve函数。
 *  - 只要其中有一个被rejected，Promise.all的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。
 */

// const allDone = Promise.all([loadImg(imgs[0]), loadImg(imgs[1]), loadImg('')]);
// 
// allDone.then(function (datas){
//   datas.forEach(function(item, i) {
//     document.body.appendChild(item);
//   });
// }).catch(function (err){
//   console.log(err);
// })

// 参数是Promise实例，将不做任何修改、原封不动地返回这个实例。
// Promise.resolve(loadImg(imgs[0])).then(function (img){
//   document.body.appendChild(img);
// })

// 将对象转为Promise对象，然后就立即执行thenable对象的then方法。
// Promise.resolve({
//   then(resolve, reject){
//     const img = new Image();
//     img.src = imgs[1];
//     img.onload = function (){
//       resolve(this);
//     }
//   }
// }).then(function (img){
//   document.body.appendChild(img);
// });

// Promise.resolve('miaov').then(function (str){
//   console.log(str);
// })

// const p = Promise.resolve();

// console.log(p);












































































































































































































































































































/***/ })
/******/ ]);