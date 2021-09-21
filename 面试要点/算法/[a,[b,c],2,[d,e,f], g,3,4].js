//  输入 [a,[b,c],2,[d,e,f], g,3,4]
//  输出： a,b,c,2,d,e,f,g,3,4

let arr  = ['a',['b','c'],2,['d','e','f', ['j', 'h']], 'g',3,4]
// 方法一： 递归
// function flat (arr) {
//     let res = []
//     let len = arr.length
//     for(let i =0 ; i< len ; i++) {
//         if (arr[i] instanceof Array) {
//             res = res.concat(flat(arr[i]))
//         } else {
//             res.push(arr[i])
//         }
//     }
//     return res
// }

// console.log(flat(arr));

// 方法二： toString

// console.log(arr.toString().split(','));
// console.log(arr.join(','));

// 方法三： 迭代器

Array.prototype[Symbol.iterator] = function () {
    // console.log(this);
    let arr = [].concat(this)
    let getFirst = function (arr) {
        let first = arr.shift()
        return first
    }
    return {
        next: function () {
            let item = getFirst(arr)
            if (item) {
                return {
                    value: item,  // 这里发生了隐式类型转换
                    done: false
                }
            } else {
                return {
                    value: undefined,
                    done: true
                }
            }
        }
    }
}


function flat1 (arr) {
    let r = []
    for(let i of arr) {
        r.push(i)
    }
    // return r
    return r.join(',')
}

console.log(flat1(arr)); 
