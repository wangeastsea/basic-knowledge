class LinkedList {
    constructor() {
        this.length = 0
        this.head = null
    }
    // 根据索引返回节点,最后一个元素是this.length-1
    getElementAt(position) {
        if (position<0|| position>=this.length) return null
        let current = this.head
        for(let i = 0 ; i< position; i++) {
            current = current.next
        }
        return current
        
    }
    // 追加节点
    append(element) {
        let node = new Node(element)
        let end = null
        if (this.head === null) {
            this.head = node
        } else {
            end = this.getElementAt(this.length -1)
            end.next = node
        }
        this.length++
    }
    // 插入节点
    insert(position, element) {
        if (position<0|| position>=this.length) return null
        let previous = null
        let node = new Node(element)
        if (position === 0) {
            node.next = this.head
            // 重新覆盖head，重置头节点
            this.head = node
        } else {
            before = this.getElementAt(position -1)
        }
        node.next = previous.next
        previous.next = node
        this.length++
        return true
    }
    // 删除节点
    removeAt(position) {
        if (position<0|| position>=this.length) return null
        let current = this.head
        if (position ===0) {
            this.head = current.next
        } else {
            previous = this.getElementAt(position -1)
            current = previous.next
            previous.next = current.next
        }
        this.length--
        return current
    }
    // 定位节点索引
    indexOf(element) {
        let index = null
        let current = this.head
        for(let i = 0 ;i < this.length ; i++) {
            if (current.val === element) {
                index = i 
                // return 
                break
            }
            current = current.next
        }
        return index
    }
}

class Node {
    constructor(val) {
        this.val = val
        this.next = null
    }
}


let list = new LinkedList()

list.append(5)
list.append(6)
list.append(100)
// console.log(list);
console.log(list.indexOf(100)); 