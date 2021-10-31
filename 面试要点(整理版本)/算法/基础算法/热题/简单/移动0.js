/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
 var moveZeroes = function(nums) {
    let len = nums.length
    let i = 0 
    let j = len-1
    while(i<=j) {
        if (nums[i] === 0) {
            for(let k  = i ; k< j; k++) {
                nums[k] = nums[k+1]
            }
            nums[j] = 0
        } else {
            i++
        }
        if (nums[j] === 0) {
            j--
        }
    }
    return nums
};

let cc = moveZeroes([0,0,1])
console.log(cc);