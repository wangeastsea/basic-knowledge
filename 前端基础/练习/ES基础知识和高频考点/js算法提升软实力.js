// 实现flat(arr) => a,b,c,2,d,e,f,g,3,4 或 a-b-c-2-d-e-f-g-3-4
let arr = ['a', ['b', 'c'], 2, ['d', 'e', 'f'], 'g' , 3, 4]
// 方法一，递归来实现
// function flat (arr) {
//     let flatArr = []
//     let each = function (arr) {
//         arr.forEach((item) => {
//             if (item instanceof Array) {
//                 each(item)
//             } else {
//                 flatArr.push(item)
//             }
//         })
//     }
//     each(arr)
//     return flatArr.join(',')
// }
// console.log(flat(arr))
//——————————————————————————————————————————————————————————————————————————————
//方法二，格式转换来实现 ， 数组转化为字符串，先调用valueOf 方法，然后调用toString方法
// [1,2,3,4,[345,34,34,89,[234536],[2345345234]]].join(',')
// "1,2,3,4,345,34,34,89,234536,2345345234"
// 注意不要污染原型
// let flat = function (arr) {
//     let toString = Array.prototype.toString
//     Array.prototype.toString = function () {
//         return this.join('-')
//     }
//     let result = arr + ''
//     Array.prototype.toString = toString
//     return result
// }
// console.log(flat(arr))

//——————————————————————————————————————————————————————————————————————————————
// 方法3，使用valueof方法来实现
// function flat (arr) {
//     Array.prototype.valueOf = function () {
//         return this.join(',')
//     }
//     return arr + ''
// }
// console.log(flat(arr))
//——————————————————————————————————————————————————————————————————————————————
// 方法4，使用遍历器来实现
// 标准：
// 1： 必须在其原型有一个symbol.iterator的遍历器
// 2：必须返回一个next函数
// 3：next函数必须返回{value: item, done: false} 或 {done: false}

Array.prototype[Symbol.iterator] = function () {
    let arr = [].concat(this)
    let getFirst = function (arr) {
        return arr.shift()
    }
    return {
        next: function () {
            let item = getFirst(arr)
            if (item) {
                return {
                    value: item,
                    done: false
                }
            } else {
                return {
                    done: true
                }
            }
        }
    }
}
function flat (arr) {
    let r = []
    for(let i of arr) {
        r.push(i)
    }
    return r.join('-')
}
console.log(flat(arr))
