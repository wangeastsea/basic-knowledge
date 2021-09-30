/** https://leetcode-cn.com/problems/binary-tree-inorder-traversal/submissions/
 * @param {TreeNode} root
 * @return {number[]} 左 根 右 , 遇事不决，封一层
 */

 var inorderTraversal = function(root) {
    let res = []
    const inorder = (root) => {
        if(!root) return
        inorder(root.left)
        res.push(root.val)
        inorder(root.right)
    }
    inorder(root)
    return res
};

// 迭代法
