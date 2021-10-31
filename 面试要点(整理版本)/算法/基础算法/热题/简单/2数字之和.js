
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 * https://leetcode-cn.com/problems/two-sum/
 */
 var twoSum = function(nums, target) {
    let len = nums.length
    let map = {}
    let res = []
    for(let i = 0 ; i < len ;i++) {
        let val = target - nums[i]
        if (map[val] !== undefined) {
            res =  [map[val], i]
        } else {
            map[nums[i]] = i
        }
    }
    return res
};


console.log(twoSum([2,7,11,15], 9)); 