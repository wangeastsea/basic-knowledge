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

// var reverseList2 = function (head) {
//     if (head === null || head.next ===null) {
//         return head
//     }
//     const newHead = reverseList2(head.next)
//     head.next.next = head
//     head.next = null
//     return newHead
// }




