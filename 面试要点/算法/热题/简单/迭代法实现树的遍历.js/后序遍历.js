const postorder = function (root) {
    let res = []
    if (!root) {
        return res
    }
    let stack = []
    stack.pust(root)
    while(stack.length) {
        let cur = stack.pop()
        res.unshift(cur.val)
        if (cur.left) {
            stack.push(cur.left)
        }
        if (cur.right) {
            stack.push(cur.right)
        }
    }
    return res
}