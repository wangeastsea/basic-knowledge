// left, root, right

const inorder = function (root) {
    const res = []
    if (!root) {
        return res
    }
    let stack = []
    let cur = root
    while(cur || stack.length) {
        while(cur) {
            stack.push(cur)
            cur = cur.left
        }
        let cur = stack.pop()
        res.push(cur.val)
        cur = cur.right
    }
    return res
}