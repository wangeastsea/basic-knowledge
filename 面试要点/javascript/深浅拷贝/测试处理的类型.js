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
 function Obj() { 
    this.func = function () { alert(1) }; 
    this.obj = {a:1};
    this.arr = [1,2,3];
    this.und = undefined; 
    this.reg = /123/; 
    this.reg1 = new RegExp('\d\d?')
    this.date = new Date(0); 
    this.NaN = NaN;
    this.infinity = Infinity;
    this.sym = Symbol(1);
    this[Symbol.for('baz')] = 3
  } 
  
  let obj1 = new Obj();
  
  Object.defineProperty(obj1,'innumerable',{ 
    enumerable:false,
    value:'innumerable'
  });
//   console.log('obj1',obj1);
  let str = JSON.stringify(obj1);
  let obj2 = JSON.parse(str);
//   console.log('obj2',obj2);
  
/** 
  obj1 {
    func: [Function],
    obj: { a: 1 },
    arr: [ 1, 2, 3 ],
    und: undefined,
    reg: /123/,
    reg1: /dd?/,
    date: 1970-01-01T00:00:00.000Z,
    NaN: NaN,
    infinity: Infinity,
    sym: Symbol(1),
    [Symbol(baz)]: 3
  }


  obj2 {
    obj: { a: 1 },
    arr: [ 1, 2, 3 ],
    reg: {},
    reg1: {},
    date: '1970-01-01T00:00:00.000Z',
    NaN: null,
    infinity: null
  }

*/


this.reg = /123/; 
this.reg1 = new RegExp('\d\d?')
// console.log(this.reg1.constructor === RegExp);
// console.log(this.reg.constructor === RegExp);
let allDesc = Object.getOwnPropertyDescriptors(obj1)
let cloneObj = Object.create(Object.getPrototypeOf(obj1), allDesc)
console.log(cloneObj.obj.a)