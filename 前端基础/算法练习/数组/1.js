/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    // 先保存数组的长度
    let length = nums.length
    // 当前位置是数组的最后一个元素
    let cur = nums[length-1]
    for (let i = length-2; i > -1;i--) {
      // 如果后一个元素跟当前的元素相等，就删除后一个元素
      if (nums [i] === cur) {
        nums.splice(i+1, 1)
      } 
      cur = nums[i]
      }
    }