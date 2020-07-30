function f1 (arg) {
    console.log('f1>>>', arg + 'a')
    return arg
}

function f2 (arg) {
    console.log('f2>>>', arg + 'b')
    return arg
}


function f3 (arg) {
    console.log('f3>>>', arg + 'c' )
    return arg
}

const funcs = [f1,f2,f3]

// f1(f2(f3('1111')))



var isType = function(type) {
    return function(obj) {
      return Object.prototype.toString.call(obj) === `[object ${type}]`
    }
  }
  

const fn = function (arg) {
    funcs.reverse().reduce((cur, fun) => {
        cur = fun(cur)
        return cur
    },arg)
}
fn('111111')
