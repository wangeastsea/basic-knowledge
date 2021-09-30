// https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/
/**
 * @param {number[]} prices
 * @return {number}
 */

let arr = [7,1,5,3,6,4]
// 超过时间了，事件复杂度过大
var maxProfit = function(prices) {
    let len = prices.length
    let max = -Infinity
    for (let i = 0 ; i < len-1; i++) {
        for (let j = i+1; j< len; j++) {
            let val = prices[j] - prices[i] 
            if (val > max) {
                max = val
            }
        }
    }
    return max < 0 ? 0 : max
};

console.log(maxProfit(arr));





























let arr = [7,1,5,3,6,4]
// 好方法， 背， 要学会一次遍历，做缓存。 一次遍历的过程中，不断的去更新最小值和最大收益值。
var maxProfit1 = function (arr) {
    let minPrice = Infinity
    let maxprofit = 0
    for(let i = 0 ; i< arr.length; i++) {
        if (arr[i] < minPrice) {
            minPrice = arr[i]
        }
        if (arr[i] - minPrice > maxprofit) {
            maxprofit = arr[i] - minPrice
        }
    }
    return maxprofit
}