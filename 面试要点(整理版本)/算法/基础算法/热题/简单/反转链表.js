/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
 var reverseList = function(head) {
    let pre = null
    let cur = head
    while(cur !== null) {
        let next = cur.next
        cur.next = pre
        pre = cur
        cur = next
    }
    return pre
};



function reverseLinkedlist (head) {
    let prev = head
    let cur = head.next
    while(cur) {
        let next = cur.next
        cur.next = prev
        prev = cur
        cur = next
    }
    return pre
}



