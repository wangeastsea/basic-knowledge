class Stack {
    constructor() {
        this.items = []
    }
    push(element) {
        this.items.push(element)
    }
    pop() {
        this.items.pop()
    }
    peek() {
        return this.items[this.items.length-1]
    }
    isEmpty() {
        return !!this.items.length
    }   
    clear() {
        this.items = []
    }
    size() {
        return this.items.length
    }
}

// 判断有效口号 [] [{[{}]}]  {[}]

function isValid (str) {    
    let map = {
        '{': '}',
        '[': ']', 
        '(': ')'
    }
    let stack = []
    for(let i = 0 ; i< str.length; i++) {
        if (map[str[i]]) {
            stack.push(map[str[i]])
        } else {
            if (stack[stack.length -1] === str[i]) {
                stack.pop()
            } else {
                return false
            }
        }
    }
    return !stack.length
}
console.log(isValid('[[[]]]]]]]'));