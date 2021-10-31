var getIntersectionNode = function(headA, headB) {
    if (headA === null || headB === null) {
        return null
    }
    let set = new Set()
    while(headA) {
        set.add(headA)
        headA = headA.next
    }
    while(headB) {
        if (set.has(headB)) {
            return headB
        }
        headB = headB.next
    }
    return null
};