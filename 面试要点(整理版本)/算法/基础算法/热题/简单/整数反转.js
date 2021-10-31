var reverse = function(x) {
    let str = x.toString()
    if (str.length === 1) {
        return str
    }
    let res = ""
    for(let i = str.length -1 ; i >= 0; i--) {
        if (isNaN(str[i])) {
            res = str[i] + res
        } else {
            if (str[i]) {
                res += str[i]
            }
        }
        
        
    }
    if (res < -Math.pow(2, 31) || res > Math.pow(2, 31 ) -1) {
        res = 0
    }
    return res
};


console.log(reverse(123))