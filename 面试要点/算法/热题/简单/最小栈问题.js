// 维持一个递减栈。

var MinStack = function() {
    this.stack = []
    // 栈顶元素维持最小即可
    this.miniStack = []
};

/** 
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function(val) {
    this.stack.push(val)
    if (this.miniStack.length === 0 || this.miniStack[this.miniStack.length -1] >= val) {
        this.miniStack.push(val)
    }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    let top = this.stack.pop()
    if (this.miniStack[this.miniStack.length -1] === top) {
        this.miniStack.pop()
    }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stack[this.stack.length -1]
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return this.miniStack[this.miniStack.length-1]
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */