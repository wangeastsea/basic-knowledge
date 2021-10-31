// https://leetcode-cn.com/problems/symmetric-tree/

/**
 * @param {TreeNode} root
 * @return {boolean}
//  */
//  我们可以实现这样一个递归函数，通过「同步移动」两个指针的方法来遍历这棵树，pp 指针和 qq 指针一开始都指向这棵树的根，
//  随后 pp 右移时，qq 左移，pp 左移时，
//  qq 右移。每次检查当前 pp 和 qq 节点的值是否相等，如果相等再判断左右子树是否对称。
 var isSymmetric = function(root) {
    const check = function (p, q) {
        if (!p && !q) return true
        if (!p || !q) return false
        if (p.val === q.val && check(p.left, q.right) && check(p.right, q.left)) {
            return true
        }
    }
    check(root, root)
};


// 迭代： 
var isSymmetric2 = function (root) {
    const check = function (l, r) {
        const q = []
        q.push(l)
        q.push(r)
        while(q.length) {
            l = q.shift()
            r = q.shift()
            if (!l && !r) continue
            if ((!l || !r) || l.val !== r.val) return false

            q.push(l.left)
            q.push(r.right)
            q.push(l.right)
            q.push(r.left)
        }
        return true
    }
    return check(root, root)
}