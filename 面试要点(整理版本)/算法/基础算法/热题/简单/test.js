
let res = []
var inorderTraversal = function(root) {
    if(!root) return []
    inorderTraversal(root.left)
    res.push(root.val)
    inorderTraversal(root.right)
    return res
};


let tree = {
    val: 1,
    left: null,
    right: null
}

console.log(inorderTraversal(tree)); 