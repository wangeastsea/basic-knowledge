// 题目描述：给定一个没有重复数字的序列，返回其所有可能的全排列。
// 示例：   
// 输入: [1,2,3]
// 输出: [
// [1,2,3],
// [1,3,2],
// [2,1,3],
// [2,3,1],
// [3,1,2],
// [3,2,1]
// ]

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 使用深度搜索DFS来破解
 const permute = function(nums) { 
    // 结果数组
    let res = []
    // 当前的一个排列
    let curr = []
    // 是否被访问过
    let visited = {}
    let len = nums.length
    function DFS(nth) {
        if (nth === len) {
            // slice 非常重要，防止 curr互相影响
            return res.push(curr.slice())
        }
        for(let i = 0 ; i < len ; i++ ) {
            if (!visited[nums[i]]) {
                // 加上访问了的标识
                visited[nums[i]] = 1
                curr.push(nums[i])
                // 基于当前排列，继续走深度搜索
                DFS(nth + 1)
                visited[nums[i]] = 0
                curr.pop()
            }
        }
    }
    DFS(0)
    return res
 }

 console.log(permute([1,2,3]));