/**
 * 0-1背包问题
 * @param {Number} N 物品总数
 * @param {Number} W 背包容量
 * @param {Array} wt 物品重量数组
 * @param {Array} values 物品价值数组
 * @returns Number 背包能装的最大价值
 */
function Knapsack(N, W, wt, values) {
    let dp = Array.from(new Array(N+1), () => new Array(W+1).fill(0))
    console.log(dp);
    for(let i = 1 ; i <= N; i++ ) {
        for(let w = 1; w <= W; w++) {
            if(w - wt[i-1]< 0) {
                // 不放入背包
                dp[i][w] = dp[i-1][w]
            } else {
                dp[i][w] = Math.max(
                    // 状态转移方程
                    // 把第i个物品放进背包
                    dp[i-1][w - wt[i-1]] + values[i-1],
                    // 不放入第i个物品
                    dp[i-1][w]
                )
            }
        }
    }
    return dp[N][W]
}

function Knapsack2(n, c, w, value) {
    // dp是动态规划的状态保存数组
    const dp = (new Array(c+1)).fill(0)  
    // res 用来记录所有组合方案中的最大值
    let res = -Infinity
    for(let i=1;i<=n;i++) {
        for(let v=c;v>=w[i];v--) {
            // 写出状态转移方程
            dp[v] = Math.max(dp[v], dp[v-w[i]] + value[i])
            // 即时更新最大值
            if(dp[v] > res) {
                res = dp[v]
            }
        }
    }
    return res
}


console.log(Knapsack(7, 12, 
    [2,4,6,2,8,3,9], 
    [100,900,300, 40, 50, 100, 200, 20]))








const lengthOfLIS = function(nums) {
    const len = nums.length
    if (!len) {
        return 0
    }
    // 初始化数组里面每一个索引位的状态值
    const dp = (new Array(len)).fill(1)
    let maxLen = 1
    // 从第二个元素开始遍历数组
    for(let i = 1; i<len;i++)  {
        for(let j = 0; j<i; j++) {
            if (nums[j] <  nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1)
            }
        }
        if (dp[i] > maxLen) {
            maxLen = dp[i]
        }
    }
    return maxLen
}

// console.log(lengthOfLIS([1,3,2,4,6,7,4]));