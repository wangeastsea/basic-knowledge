// var a = [1, [2, [3, 4, 5]]];
// function flatten(arr) {
//     let result = [];

// for(let i = 0; i < arr.length; i++) {
//     if(Array.isArray(arr[i])) {
//         result = result.concat(flatten(arr[i]));
//     } else {
//         result.push(arr[i]);
//     }
// }
//     return result;
// }
// flatten(a);  //  [1, 2, 3, 4，5]

// 深入理解递归的思想
// result [1] [2] [3,4,5] ==> [1].concat([2,3,4,5])


// 方法4

// var arr = [1, [2, [3, 4]]];

// function flatten(arr) {

//     return arr.toString().split(',');

// }

// console.log(flatten(arr)); //  [1, 2, 3, 4]


// // 方法5
// var arr = [1, [2, [3, 4]]];
// function flatten(arr) {
//     return arr.flat(Infinity);
// }
// console.log(flatten(arr)); 


// let arr = [1, [2, [3, [4, 5]]], 6];
// function flatten(arr) {
//     let str = JSON.stringify(arr);
//     str = str.replace(/(\[|\])/g, '');
//     console.log('str1===>', str)
//     str = '[' + str + ']';
//     console.log('str2===>', str)
//     return JSON.parse(str); 
// }
// console.log(flatten(arr));
// console.log(JSON.parse("[1,2,3,4,5]"))

// 数据去重复 [1,2,3,4,4,4,4,3,3,3,2] => [1,2,3,4]

let c = [1,2,3,4,4,4,4,3,3,3,2]
function notRepeat (repeatArr) {
    let res = []
    for(let i of repeatArr) {
        if (!res.includes(i)) {
            res.push(i)
        }
    }
    return res
}
console.log(notRepeat(c))