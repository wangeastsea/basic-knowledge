function add(a, b) {
    return a + b
}
function square(a) {
    return a * a
}
function plusOne(c) {
    return c + 1
}
let addSquarePlusOne = composite(add, square, plusOne)

function composite(...args) {
    return function (...arguments) {
        return args.reduce((res, cur) => {
            return cur(typeof res === 'function' ? res.apply(res, arguments) : res)
        })
    }
}

function composite2(...args) {
    return function (...arguments) {
        const init = args[0].apply(null, arguments)
        return args.slice(1).reduce((res, cur) => {
            return cur(init)
        },init)
    }
}



console.log(addSquarePlusOne(1, 2)); 