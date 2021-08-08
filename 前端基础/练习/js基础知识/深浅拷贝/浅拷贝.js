function shallowClone (source) {
    if (typeof source === 'object' && source !== null) {
        const target = Array.isArray(source) ? [] : {}
        for(let key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key]
            }
        }
        return target
    } else {
        return source
    }

}

// const target = { a: 1, b: 2 };
// const source = { b: 4, c: 5 };

// const returnedTarget = Object.assign(target, source)

// console.log(target === returnedTarget)

// const obj = { a: 1 };
// const copy = Object.assign({a: 5}, obj);
// console.log(copy); // { a: 1 }
// console.log(copy.a)
// console.log(copy === obj)

// const obj = { a: 1, b: {c: 2} };
// const copy = Object.assign({a: 3}, obj);
// obj.b.c = 4
// console.log(copy.b.c)


// const obj = Object.create({foo: 1}, { // foo 是个继承属性。
//     bar: {
//         value: 2  // bar 是个不可枚举属性。
//     },
//     baz: {
//         value: 3,
//         enumerable: true  // baz 是个自身可枚举属性。
//     }
// });
// console.log(obj)
// const copy = Object.assign({}, obj);
// console.log(copy); // { baz: 3 }


// const o1 = { a: 1 };
// const o2 = { [Symbol('foo')]: 2 };
// const obj = Object.assign({}, o1, o2);
// console.log(obj)

const obj = {
    foo: 1,
    get bar() {
      return 2;
    }
  };
  
// function shallowClone (target) {
//     if (typeof target === 'object' && target !== null)  {
//         let cloneobj = Array.isArray(target) ? [] : {}
//         for(key in target) {
//             if (target.hasOwnProperty(key)) {
//                 cloneobj[key] = target[key]
//             }
//         }
//         return cloneobj
//     } else {
//         return target
//     }
// }

// let aa = shallowClone(5)
// console.log(aa)


function Obj() { 
    this.func = function () { alert(1) }; 
    this.obj = {a:1};
    this.arr = [1,2,3];
    this.und = undefined; 
    this.reg = /123/; 
    this.date = new Date(0); 
    this.NaN = NaN;
    this.infinity = Infinity;
    this.sym = Symbol(1);
  } 
  let obj1 = new Obj();
  Object.defineProperty(obj1,'innumerable',{ 
    enumerable:false,
    value:'innumerable'
  });
  console.log('obj1',obj1);
  let str = JSON.stringify(obj1);
  let obj2 = JSON.parse(str);
  console.log('obj2',obj2);