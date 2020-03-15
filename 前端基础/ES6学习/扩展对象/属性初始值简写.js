// 1
// function createPerson(name, age) {
//     return {
//         name,
//         age
//     }
// }
//
// console.log(createPerson('jack', 134))

//2
// var person = {
//     name: 'jack',
//     sayName () {
//         console.log(this.name)
//     },
//     gender: 12
// }

// 可计算属性名
// let suffix = ' name'
// let  person = {
//     ["first" + suffix]: 'jack',
//     ["last" + suffix]: 'rose'
// }
// console.log(person['first name'])

// Object.is() 方法
console.log(Object.is({}, {}))
// Object.assign()
// let receiver = {}
// Object.assign(receiver, {type: 'js', name: 'file.js'}, {type: 'css'})
// console.log(receiver.type)
// console.log(receiver.name)
// 不能合并访问器属性
// let receiver2 = {}
// let suppier2 = {
//     get name () {
//         return 'file.js'
//     }
// }
// Object.assign(receiver2, suppier2)
// let descriptor = Object.getOwnPropertyDescriptor(receiver2, 'name')
// console.log(descriptor)
// console.log(receiver2.name)


// 重复的对象字面量属性
// let person = {
//     name: 'jack',
//     name: 'rose'
// }
// console.log(person.name)
//
// // 自有属性枚举顺序
// let obj = {a: 1, 0: 1, c: 1, 2: 1, b: 1, 1: 1}
// obj.d = 1
// console.log(Object.getOwnPropertyNames(obj).join(''))

// Object.getPrototypeOf()   Object.setPrototypeOf()
