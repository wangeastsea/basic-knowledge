/**
 * @param {number[]} nums
 * @return {number}
 */

//  输入: [2,2,1]
//  输出: 1
 var singleNumber = function(nums) {
    let len = nums.length
    let map = {}
    for (let i = 0; i < len; i++) {
        if (map[nums[i]]) {
            map[nums[i]]++
        } else {
            map[nums[i]] = 1
        }
    }
    for (let k in map)  {
        if (map[k] ===1) {
            res = k
            break
        }
    }
    return res
}
let num =  [2,2,1]
console.log(singleNumber(num)); 

// 异或运算，两数相同为0， 不同为1

/**
交换律：a ^ b ^ c <=> a ^ c ^ b

任何数于0异或为任何数 0 ^ n => n

相同的数异或为0: n ^ n => 0
*/

// 骚， 牛逼
function singleNumber(nums) {
    let single = 0
    for (let i = 0 ; i< nums.length; i++) {
        single ^= nums[i]
    }
    return single
}