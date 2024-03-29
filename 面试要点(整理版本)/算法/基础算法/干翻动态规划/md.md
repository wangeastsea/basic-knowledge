### 此类题目的关键特征
- 要求你给出达成某个目的的解法个数
- 不要求你给出每一种解法对应的具体路径

爬楼梯问题：
```js
f(1) = 1   
f(2) = 2
```

```js
/**
* @param {number} n
* @return {number}
*/
const climbStairs = function(n) {
    // 处理递归边界
    if(n === 1) {
        return 1
    }
    if(n === 2){
        return 2
    }
    // 递归计算
    return climbStairs(n-1) + climbStairs(n-2)
};
```

但是这个解法问题比较大，丢进 OJ 会直接超时。我们一起来看看原因，回到我们上面这张树形结构图上来： 
问题： 会遇到n多重复计算。 如何规避这种问题？记忆化搜索来提效


重复计算带来了时间效率上的问题，要想解决这类问题，最直接的思路就是用空间换时间，也就是想办法记住之前已经求解过的结果。

思想：记忆化搜索
```js
const f = []
const climbStairs = function (n) {
    if (n === 1) {
        return 1
    }
    if (n ===2 ) {
        return 2
    } 
    if (f[n] === undefined) f[n] = climbStairs(n-1) + climbStairs(n-2)
    // 若f[n]已经求解过，直接返回
    return fn[n]
}
```


--》记忆化搜索转化为动态规划

动态规划则恰恰相反，是一个自底向上的过程。它要求我们站在已知的角度，通过定位已知和未知之间的关系，一步一步向前推导，进而求解出未知的值。

```js
const climbStairs = function(n) {
    const f = []
    f[1] = 1
    f[2] = 2
    // 递归，往迭代去转
    for(let i = 3; i<=n; i++) {
        f[i] = f[i-2] + f[i-1]
    }
    return f[n]
}
```

---> 从解题思路看动态规划


分治问题的核心思想是：把一个问题分解为相互独立的子问题，逐个解决子问题后，再组合子问题的答案，就得到了问题的最终解。


**动态规划的思想和“分治”有点相似。不同之处在于，“分治”思想中，各个子问题之间是独立的：
比如说归并排序中，子数组之间的排序并不互相影响。而动态规划划分出的子问题，往往是相互依赖、相互影响的。**

什么样子的题目适合使用动态规划呢？
- 最优子结构
    它指的是问题的最优解包含着子问题的最优解——不管前面的决策如何，此后的状态必须是基于当前状态（由上次决策产生）的最优决策。
    f(n)和f(n-1)、f(n-2)之间的关系印证了这一点（这玩意儿叫**状态转移方程**，大家记一下）。
- 重叠子问题
    它指的是在递归的过程中，出现了反复计算的情况。就这道题来说，图上标红的一系列重复计算的结点印证了这一点。



### 解题思路：

 **最值问题是动态规划的常见对口题型，见到最值问题，应该想到动态规划**

树形思维模型将帮助我们更迅速地定位到状态转移关系 ， 边界条件往往对应的就是已知子问题的解；
- 基于树形思维模型，结合一下记忆化搜索
- 递归往迭代那么一转


### “最值”型问题典范：如何优雅地找硬币

> 题目描述：给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。

假设 amount = 36  有cn个硬币，那么状态转移方程？
> 示例1：输入: coins = [1, 2, 5], amount = 11

输出: 3
解释: 11 = 5 + 5 + 1

- 状态转移方程：
```
f(36) = Math.min(f(36-c1) + 1, f(36-c2) + 1, ...., f(36-cn) + 1)
```

- 边界条件： 
```
f[0] = 0
```

明确了状态转移方程，明确了已知子问题的解

```js
const coinChange = function (coins, amount) {
    const f = []
    f[0] = 0
    for(let i = 1 ;i <= amount; i++) {
        f[i] = Infinity
        for(let j = 0 ; j< coins.length; j++)  {
            if (i - coin[j] >= 0) {
                f[i] = Math.min(f[i], f[i-coins[j]] + 1])
            }
        }
    }
    if (f[amount] === Infinity) {
        return -1
    }
    return f[amount]
}
```


```js
function getCoins (coins, amount) {
    const f = []
    f[0] = 0
    for (let i = 1 ; i< amount; i++) {
        f[i] = Infinity
        let arr = []
        for (let j = 0 ; j < coins.length; j++) {
            if (i - coins[j] > 0) {
                arr.push(f[i-coins[c]] + 1)
            }
        }
        f[i] = Math.min(...arr)
    }
    if (f[amount] === Infinity) {
        return -1
    }
    return f[amount]
}

```

### 0-1背包模型

> 有 n 件物品，物品体积用一个名为 w 的数组存起来，物品的价值用一个名为 value 的数组存起来；每件物品的体积用 w[i] 来表示，每件物品的价值用 value[i] 来表示。现在有一个容量为 c 的背包，问你如何选取物品放入背包，才能使得背包内的物品总价值最大？

> 注意：每种物品都只有1件


w [10, 100, 20, 30]

value [100, 200, 30, 400]

total: 400








分清楚 选择 与 状态

选择是什么： 是否选择这个物品，物品的价值是不变的。
状态： 背包的剩余容积


dp[i][w] : 对于前i个物品， 当背包的容量是w时， 可以装的最大价值的是dp[i][w] 这也是一个中间状态，是通过状态转移方程来计算出来的。

base case: 
```js
dp[0][] = dp[][0] = 0 而我们需要计算的结果是 dp[N][W] 的容积。
```

![image.png](https://upload-images.jianshu.io/upload_images/5016475-4a24af07467a0fe3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

计算 dp[i][v] 的时候，其实只需要图中标红位置的数据就可以了（这与我们前面讲解过的最优子结构特性不谋而合），也就是说未标红的地方对于 dp[i][v] 的计算来说都属于冗余数据。实际上，对于第 i 行的计算来说，只有第 i-1 行的数据是有意义的，更早的数据它都不关心。也就是说我们其实根本不需要记录所有的数据，理论上只要保留当前行和上一行的数据就足够了。



滚动数组的概念： 

固定一块存储空间，滚动更新这块存储空间的内容，确保每个时刻空间内的数据都是当前真正会用到的最新数据，从而达到节约内存的效果，这种手段就叫做滚动数组。

这一块概念依然没有理解：

我可以写出来，但是不使用滚动数组：

```js

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


```


### 经典题 - 最长上升子序列的个数
> 题目描述：给定一个无序的整数数组，找到其中最长上升子序列的长度。

```js
示例:
输入: [10,9,2,5,3,7,101,18]
```
输出: 4
解释: 最长的上升子序列是 [2,3,7,101]，它的长度是 4。

首先，题意 理解通透

通用解题思路的核心，是利用递归思想，以“倒推”为抓手，快速地明确状态与状态间的关系。

背后的思想却是一而贯之的，那就是关注到序列中元素的索引，尝试寻找不同索引对应的元素之间的关系、并以索引为线索去构造一维或二维的状态数组。
- 状态转移方程
- 边界条件 f(0) = 1

背
```js
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
```




```js 爬楼梯问题
function climbStairs(n) {
    let fn  = []
    fn[1] = 1
    fn[2] = 2
    for(let i = 3; i <= n ; i++) {
        fn[i] = fn[i-1] + fn[i-2]
    }
    return fn[n]
}
```




```js
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

```

```js
function Knapsack (N,W, wt, values) {
    let dp = Array.from(new Array(N+1), () => new Array(W+1).fill(0))
    for(let i = 0 ; i<= N; i++) {
        for(let w = 0; w<=W; w++) {
            if (w - wt[i-1] < 0) {
                dp[i][w] = dp[i-1][w]
            } else {
                dp[i][w] = Math.max(
                    dp[i-1][w-wt[i-1]] + values[i-1], dp[i-1][w])
                )
            }
        }
    }
    return dp[N][W]
}
```