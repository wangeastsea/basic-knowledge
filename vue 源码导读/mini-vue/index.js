// tes1
// let obj1 = {
//     person: {
//         name: 'jack'
//     }
// }

// Object.defineProperty(obj1, 'preson', {
//     get () {
//         return  obj1[person]
//     },
//     set (val) {
//         console.log('走起啊')
//         obj1[person] = val
//     }
// })

// console.log(obj1.person)

// obj1.person.name = 'rose'
// console.log(obj1.person)

// test 2 嵌套的对象并不会出发setter

// function defineReactive(obj, key, val) { 
//     Object.defineProperty(obj, key, {
//         get() { console.log(`get ${key}:${val}`); return val },
//         set(newVal) { 
//             if (newVal !== val) { 
//                 console.log(`set ${key}:${newVal}`);
//                 val = newVal 
//             } 
//         } 
//     }) 
// }

// function observe(obj) { 
//     if (typeof obj !== 'object' || obj == null) { 
//         return 
//     }
//     Object.keys(obj).forEach(key => { 
//         defineReactive(obj, key, obj[key]) 
//     }) }
    
    
// const obj = {foo:'foo',bar:'bar',baz:{a:1}}
// observe(obj)

// // obj.foo = 'gender'
// // console.log(obj.foo)

// obj.baz.a = 'rose'

// test3 解决新值是对象的情况

function defineReactive(obj, key, val) { 
    Object.defineProperty(obj, key, {
        get() { console.log(`get ${key}:${val}`); return val },
        set(newVal) { 
            if (newVal !== val) { 
                // observe(newVal)
                console.log(`set ${key}:${newVal}`);
                val = newVal 
            } 
        } 
    }) 
}

function observe(obj) { 
    if (typeof obj !== 'object' || obj == null) { 
        return 
    }
    Object.keys(obj).forEach(key => { 
        defineReactive(obj, key, obj[key]) 
    }) 
}
    
    
const obj = {foo:'foo',bar:'bar', baz: {gender: 'male'}}
observe(obj)
obj.baz = {name: 'jack'}
console.log(obj.baz.name)