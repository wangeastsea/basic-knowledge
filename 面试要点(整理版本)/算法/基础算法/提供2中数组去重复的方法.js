let arr = [1,2,2,3,3,4,5,6,1,1,1,7,6,6,8, 444,11]
/**
 * 方法1：
 */
let mset = new Set(arr)

let marr = Array.from(mset)
// console.log(marr);

function deleteRepeat (arr) {
    let len = arr.length
    let map = {}
    let res = []
    for(let i = 0 ; i<len; i++) {
        if (!map[arr[i]]) {
            map[arr[i]] = true 
            res.push(arr[i])
        } 
    }
    return res
}

console.log(deleteRepeat(arr));