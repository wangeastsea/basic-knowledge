// https://leetcode-cn.com/problems/majority-element/submissions/
/**
 * @param {number[]} nums
 * @return {number}
 */
 var majorityElement = function(nums) {
    let map = {}
    let pivot = Math.floor(nums.length/2)
    for(let i = 0 ; i < nums.length; i++) {
        if (!map[nums[i]]) {
            map[nums[i]] = 1
            continue
        } 
         map[nums[i]]++
    }

    for (let key in map) {
        if (map.hasOwnProperty(key) && map[key] > pivot) {
            return key
        }
    }
};
// console.log(majorityElement([3,2,3]));



var majorityElement1 = function(nums) {
    nums.sort((a,b ) => a-b)
    let pivot = nums[Math.floor(nums.length/2)]
    return pivot
};

console.log(majorityElement1([3,2,3]));