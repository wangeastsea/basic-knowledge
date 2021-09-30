var addTwoNumbers = function(l1, l2) {
    let l1_value = ""
    let l2_value = ""
    while(l1) {
        l1_value += l1.val
        l1 = l1.next
    }
    while(l2) {
        l2_value +=l2.val
        l2 = l2.next
    }
    l1_value = l1_value.split("").reverse().join("")
    l2_value = l2_value.split("").reverse().join("")
    let value = parseInt(l1_value) + parseInt(l2_value)
    let nodeList = value.toString().split("").reverse()
    let head = new ListNode(nodeList[0])
    let pre = head
    for(let i = 1 ; i < nodeList.length; i++) {
        pre.next = new ListNode(nodeList[i])
        pre = pre.next
    }
    return head
};

function ListNode(val, next) {
      this.val = (val===undefined ? 0 : val)
      this.next = (next===undefined ? null : next)
}


let one = {
    val: 9,
    next: {
        val: 9,
        next: {
            val: 9,
            next: {
                val: 9,
                next: {
                    val: 9,
                    next: {
                        val: 9,
                        next: {
                            val: 9,
                            next : null
                    }
                }
            }
        }
    }
}
}

let two = {
    val: 9,
    next: {
        val: 9,
        next: {
            val: 9,
            next: {
                val: 9,
                next: null
            }
        }
    }
}

console.log(addTwoNumbers(one, two))