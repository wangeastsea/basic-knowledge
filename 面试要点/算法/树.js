const { node } = require("webpack")

class TreeNode  {
    constructor (val) {
        this.val = val
        this.left = null
        this.right = null
    }
}

// 实现 中序，先序，后序的遍历
let treeList = {
    val: 1,
    left: {
        val: 3,
        left: {
            val: 9,
            right: {
                val: 0
            }
        }
    },
    right: {
        val: 10,
        left: {
            val: 6,
            right: {
                val: 10
            }
        }
    }
}

// 先序遍历 根， 左， 右
function preorder (root) {
    if (!root) return 
    console.log(root.val);
    preorder(root.left)
    preorder(root.right)

}

function midorder (root) {
    if (!root)  return 
    preorder(root.left)
    console.log(root.val);
    preorder(root.right)

}
function posorder (root) {
    if (!root) return 
    preorder(root.left)
    preorder(root.right)
    console.log(root.val);
}