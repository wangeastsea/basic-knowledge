/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
 var isPalindrome = function(head) {
    if (head === null && head.next === null) {
        return false
    }
    let vals = []
    while(head) {
        vals.push(head.val)
        head = head.next
    }
    let len = vals.length
    for(let i = 0 ; i < len; i++) {
        if (vals[i] !== vals[len - 1 -i]) {
            return false
        }
     }
     return true
};