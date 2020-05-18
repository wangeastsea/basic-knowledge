

Function.prototype.bind  = function (context, ...res) {
    let self = this
    context = context
    args = res
    return function () {
        return self.apply(context, [...args, ...arguments])
    }
}



var obj = {
    name: 'jack',
}
var func = function (a,b,c,d) {
    console.log(this.name) // jack
    console.log(a,b,c,d)  // 输出 [1,2,3,4]
}.bind(obj, 1,2)

func(3,4)
