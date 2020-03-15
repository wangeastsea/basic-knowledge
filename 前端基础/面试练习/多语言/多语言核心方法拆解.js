// 多语言核心方法拆解分析
function isObj(x) {
    const type = typeof x
    return x !== null && (type === 'object' || type === 'function')
}
function isDef(value) {
    return value !== undefined && value !== null
}
// 深拷贝
const { hasOwnProperty } = Object.prototype

function assignKey(to, from, key) {
    const val = from[key]

    if (!isDef(val)) {
        return
    }

    if (!hasOwnProperty.call(to, key) || !isObj(val)) {
        to[key] = val
    } else {
        to[key] = deepAssign(Object(to[key]), from[key])
    }
}

function deepAssign(to, from) {
    Object.keys(from).forEach(key => {
        assignKey(to, from, key)
    })

    return to
}

function add (messages={}) {
    let msg = {
        zhCHS: {
            test: {
                a: '简体',
                b: '美丽'
            }
        },
        zhCHT: {
            test: {
                a: '繁体',
                b: '美麗'
            }
        }
    }
   return  deepAssign(msg, messages)
}


let message = {
    zhCHS: {
        info: {
            a: '简体',
            b: '美丽'
        }
    },
    zhCHT: {
        info: {
            a: '繁体',
            b: '美麗'
        }
    }
}
let info = add(message)

console.log(info)


