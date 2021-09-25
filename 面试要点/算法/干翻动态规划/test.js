function Knapsack(n, c, wt, values) {
    let dp = createTwoArray(n,c)
    // console.log(dp);
    for(let i = 1 ; i <= n; i++ ) {
        for(let w = 1; w <= c; w++) {
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
    return dp[n][c]
}

function createTwoArray (n, c) {
    let arr = []
    for(let i = 0 ; i<=n; i++) {
        arr[i] = []
        for(let j = 0 ; j<= c; j++) {
            if( i ===0 || j ===0)
            arr[i][j] = 0
        }   
    }
    return arr
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


function main(v,w,W){
    var n = v.length;
    var c = [];
    var use = [];
    for(var i = 0; i <= n ; i++){
        c[i] = [];
        use[i] = 0;
        for(var j = 0; j <= W ; j++){
            if(i == 0 || j == 0){
                c[i][j] = 0;
            }
        }
    }
     
    v.unshift(0); //第0件物品，价值为0
    w.unshift(0); //第0件物品，重量为0
    for(var i = 1; i <= n; i++){
        for(var j = 1; j <= W; j++ ){
            if(j < w[i]){
                c[i][j] = c[i-1][j];
            }else{
                c[i][j] = Math.max(c[i-1][j],c[i-1][j-w[i]]+v[i]);
            }
             
        }
    }
     
    //逆向获取加入的物品
    var j = W;
    for(var i = n; i > 0; i--){
        if(c[i][j] > c[i-1][j]){
            use[i] = 1;
            j=j-w[i];
        }
    }
     
    console.log(use);
     
    return c[n][W];
}

// console.log(Knapsack2(8,1000, 
//     [20,40,60,200,400,40,30,90], 
//     [100,900,300, 40, 50, 100, 200, 20]))


// console.log(main(
//     [100,900,300, 40, 50, 100, 200, 20],
//     [20,40,60,200,400,40,30,90],
//     1000
//      ));





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

console.log(lengthOfLIS([1,3,2,4,6,7,4]));