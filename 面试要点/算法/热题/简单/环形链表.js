/**
 * @param {ListNode} head
 * @return {boolean}
 */
// 破坏了链表的结构，面试过不去
 var hasCycle = function(head) {
    while(head) {
        if (head.flag) {
            return true
        }
        head.flag = true
        head = head.next
    }
    return false
};


var hasCycle2 = function (head) {
    if (head == null || head.next === null) {
        return false 
    }
    let slow = head
    let fast = head.next
    while(slow !== fast) {
        if (fast === null || fast.next === null) {
            return false
        }
        slow = slow.next
        fast = fast.next.next
    } 
    return true
}