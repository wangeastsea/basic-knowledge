// 背诵 https://leetcode-cn.com/problems/symmetric-tree/
var maxDepth = function(root) {
    if (!root) {
        return 0
    }
    let leftHeight = maxDepth(root.left) 
    let rightHeight = maxDepth(root.right)
    return Math.max(leftHeight, rightHeight) + 1
};