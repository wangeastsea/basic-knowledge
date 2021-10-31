/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {TreeNode}
 */
 var mergeTrees = function(root1, root2) {
    if (!root1 || !root2) {
        return root1 || root2
    }
    let root = new TreeNode(root1.val + root2.val, null, null)
    root.left = mergeTrees(root1.left, root2.left)
    root.right = mergeTrees(root1.right, root2.right)
    return root
};

// let str = "{{ msg }}"
// const reg = /\{\{(.+?)\}\}/;
// key = str.match(reg)[1].trim()
// console.log(RegExp.$1);