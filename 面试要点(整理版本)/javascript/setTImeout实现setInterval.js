// let interval = setInterval(() => {
//     console.log(1);
// }, 1000)


// setTimeout(() => {
//     console.log(1);
//     setTimeout(() => {
//         console.log(1);
//     }, 1000) 
// }, 1000)

let id
function mockInterval(cb, interval, ...args) {
    const recur = function () {
        id = setTimeout(() => {
            cb.apply(this, args)
            recur()
        }, interval) 
    }
    recur()
}

function mockClearInterval(id) {
    clearTimeout(id)
}

mockInterval((name) => {
    console.log(name);
}, 1000, 'donghai')


setTimeout(() => {
    mockClearInterval(id)
}, 5000)