// 参考：https://kaiwu.lagou.com/course/courseInfo.htm?courseId=601#/detail/pc?id=6175
// 浅拷贝的定义
// 自己创建一个新的对象，来接受你要重新复制或引用的对象值。如果对象属性是基本的数据类型，复制的就是基本类型的值给新对象；
// 但如果属性是引用数据类型，复制的就是内存中的地址，如果其中一个对象改变了这个内存中的地址，肯定会影响到另一个对象。

// 浅拷贝包含的方法：

// 1:object.assign  该方法的第一个参数是拷贝的目标对象，后面的参数是拷贝的来源对象（也可以是多个来源）。


let target = {};
let source = { a: { b: 1 } };
Object.assign(target, source);
console.log(target); // { a: { b: 1 } };

/**
 * 注意点：
 * - 它不会拷贝对象的继承属性；
 * - 它不会拷贝对象的不可枚举的属性；
 * - 可以拷贝 Symbol 类型的属性。
 */
 let obj1 = { a:{ b:1 }, sym:Symbol(1)};
 Object.defineProperty(obj1, 'innumerable' ,{
     value:'不可枚举属性',
     enumerable:false
 });
 let obj2 = {};
 Object.assign(obj2,obj1)
 obj1.a.b = 2;
 console.log('obj1',obj1);
 console.log('obj2',obj2);
 
//  方法二：扩展运算符方式

/* 对象的拷贝 */

let obj = {a:1,b:{c:1}}
let obj2 = {...obj}
obj.a = 2
console.log(obj)  //{a:2,b:{c:1}} console.log(obj2); //{a:1,b:{c:1}}
obj.b.c = 2
console.log(obj)  //{a:2,b:{c:2}} console.log(obj2); //{a:1,b:{c:2}}
/* 数组的拷贝 */
let arr = [1, 2, 3];
let newArr = [...arr]; //跟arr.slice()是一样的效果

/**
 * 扩展运算符 和 obj陷，也就是实现的浅拷贝的功能差不多，ect.assign 有同样的缺
 * 但是如果属性都是基本类型的值，使用扩展运算符进行浅拷贝会更加方便。
 */


//  方法三：concat 拷贝数组
/**
 * 数组的 concat 方法其实也是浅拷贝，所以连接一个含有引用类型的数组时，需要注意修改原数组中的元素的属性，因为它会影响拷贝之后连接的数组。
 * 不过 concat 只能用于数组的浅拷贝，使用场景比较局限。代码如下所示。
 */

 let arr = [1, 2, 3]
 // 返回一个拷贝对象
 let newArr = arr.concat();
 newArr[1] = 100;
 console.log(arr);  // [ 1, 2, 3 ]
 console.log(newArr); // [ 1, 100, 3 ]
 
//  方法四：slice 拷贝数组
/**
 * slice 方法也比较有局限性，因为它仅仅针对数组类型。slice 方法会返回一个新的数组对象，
    这一对象由该方法的前两个参数来决定原数组截取的开始和结束，是不会影响和改变原始数组的。
 */
    let arr = [1, 2, {val: 4}];
    let newArr = arr.slice();
    newArr[2].val = 1000;
    console.log(arr);  //[ 1, 2, { val: 1000 } ]

    // 从上面的代码中可以看出，这就是浅拷贝的限制所在了——它只能拷贝一层对象。如果存在对象的嵌套，
    // 那么浅拷贝将无能为力。因此深拷贝就是为了解决这个问题而生的，它能解决多层对象嵌套问题，
    // 彻底实现拷贝

    // 手动实现一个浅拷贝

    /**
     *  - 对基础类型做一个最基本的一个拷贝；
     *  - 对引用类型开辟一个新的存储，并且拷贝一层对象属性。
     */

function shallowClone (target) {
    if (typeof target === 'object' && target!==null) {
        const cloneTarget = Array.isArray(target) ? [] : {}
        for(let prop in target) {
            if (target.hasOwnproperty(prop)) {
                cloneTarget[prop] = target[prop]
            }
        }
        return cloneTarget
    } else {
        return target
    }
}





function shallowCopy (target) {
    if (typeof target === 'object' & target !== null) {
        let cloneObj = Array.isArray(target) ? [] : {}
        Object.keys(target).forEach(key => {
            if (target.hasOwnproperty(key)) {
                cloneObj[key] = target[key]
            }
        })
        return cloneTarget
    } else {
        return  target
    }
}


function isComplexDataType (obj) {
    return (typeof obj === 'object' || typeof obj === 'function') || obj !== null
}

function deepClone(target, hash = new hashMap()) {
    if (target.constructor ===  Date ) {
        return new Date(target)
    }
    if (target.constructor === RegExp) {
        return new RegExp(target)
    }
    if (hash.has(target)) {
        return hash.get(target)
    }
    let allDesc = Object.getOwnPropertyDescriptors(target)
    let cloneObj = Object.create(target.prototype, allDesc)
    hash.set(target, cloneObj)
    for(let key of Reflect.ownKeys()) {
        if (isComplexDataType(target[key]) && typeof target[key] !== 'function') {
            cloneObj[key] = deepClone(target[key], hash)
        } else {
            cloneObj[key] = target[key]
        }
    }
    return cloneObj
}