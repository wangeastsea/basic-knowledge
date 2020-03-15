var obj = {
    name: 'wangdonghai',
    friends: ['jack', 'rose', 'bob'],
    address: {
        province: 'guangdong',
        city: 'shenzhen'
    },
    sayName: function () {
        console.log(this.name)
    }
}

// 对象或者数组浅复制的方法：
// 1:扩展运算符：
let arr1 = [10,20,30]
let donghai3 = [...arr1]
arr1.push(40)
console.log(donghai3)
// 2: concat方法
let arr2 = [10,20,30]
let donghai4 = [].concat(arr2) 
arr2.push(40)
console.log(donghai4)
// 3: 对象的的浅复制,可以复制第一层属性值
let donghai5 = Object.assign({}, obj)
console.log(donghai5)
obj.name = 'jack'
console.log(donghai5)



/**
 * 
 * 对象的浅复制
 * @param {ojects} obj 
 * @returns object
 */
function shallowCopy(obj) {
    var copyObject = {}
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) {
            copyObject[attr] = obj[attr]
        }
    }
    return copyObject
}





var donghai = shallowCopy(obj)
console.log(donghai)
donghai.friends.push('willie')
console.log(donghai)
console.log(obj)



/**
 * 
 * 对象的深度复制:引用类型对象不会出现共享
 * @param {object} obj 
 */
function deepCopy(obj) {
    // 首先判断参数是否存在以及参数是否是一个对象
    if (!obj && typeof obj !== 'object') {
        throw new Error('error params')
    }
    // 判断参数是对组类型还是对象类型
    var deepObject = Array.isArray(obj) ? [] : {}
    for (var attr in obj) {
        // 判断属性是否为元素自身的
        if (obj.hasOwnProperty(attr)) {
            // 判断属性值存在并且属性值还是为一个引用类型的值（数组或对象），则进行递归复制，直到复制到基本属性值为止
            if (obj[attr] && typeof obj[attr] === 'object') {
                deepObject[attr] = deepCopy(obj[attr]) //进行递归操作
            } else {
                // 非引用类型的值，直接进行赋值
                deepObject[attr] = obj[attr]
            }
        }
    }
    return deepObject
}
var obj = {
    name: 'wangdonghai',
    friends: ['jack', 'rose', 'bob']
}
var donghai = deepCopy()
console.log(donghai)
donghai.friends.push('willie')
console.log(donghai)
console.log(obj)
var obj = ['wangdonghai', 'male', {
    friends: ['jack', 'rose', 'bob']
}]
var donghai = deepCopy(obj)
console.log(donghai)
donghai[2].friends.push('willie')
console.log(donghai)
console.log(obj)

// JSON 序列化 parse stringify
// JSON 对象中的 stringify 可以把一个 js 对象序列化为一个 JSON 字符串，
//parse 可以把 JSON 字符串反序列化为一个 js 对象，这两个方法实现的是深拷贝
// JSON.parse(JSON.stringify(obj)) 可以进行深度拷贝，但是不能复制函数
// console.log(typeof JSON.stringify(obj))
var obj_json = JSON.parse(JSON.stringify(obj))
console.log(obj_json === obj)
obj.address.city = 'guangzhou'
obj.name = 'abc'
console.log(obj)
console.log(obj)





function clone(obj) {
    let vv = null
    if (typeof obj === 'object' && obj !== null) {
        vv = obj instanceof Array ? [] : {}
        for (let v in obj) {
            vv[v] = clone(obj[v])
        }
    } else {
        vv = obj
    }
    return vv
}