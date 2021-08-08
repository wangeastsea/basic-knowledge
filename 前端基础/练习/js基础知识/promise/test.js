Promise.resolve().then(() => {
    //a
    console.log(0)
    // 
    return Promise.resolve(4)
    // return 4
}).then((res) => {
    // c
    console.log(res)
})

Promise.resolve().then(() => {
    // b
    console.log(1)
}).then(() => {
    // d
    console.log(2)
}).then(() => {
    // e 
    console.log(3)
}).then(() => {
    console.log(5)
}).then(() => {
    console.log(6)
})


// [a, b, c, d,]
// 0, 1, 4, 2, 3,4,5


// [a,b, d, ]
// 0, 1,2,3,4,5,6

/**
 * promise是微任务，会在当前宏任务的结尾执行微任务。
 * 在执行当前宏任务过程中，开始收集微任务，并且执行的顺序，放到微任务队列中。
 * 
 * 针对以上代码的执行顺序，Promise.resolve() 是按照顺序执行的，返回一个promsie。
 * promise.then() ,then里的回调就会放到微任务队列里。所按照执行顺序，首先同步执行第一个
 * Promise.resolve()，然后将a 回调函数放到微任务队列[a],然后执行第二个Promise.resolve()
 * 将b放入到微任务队列[b],此时当前宏任务执行完成，开始按照顺序执行微任务队列，微任务队列里的微任务
 * 在执行的过程中，会产生新的微任务，并放入微任务的队列尾部。所以 a 执行过程中产生了新的微任务c
 * 此时的队列是[a,b,c],执行b的过程中，产生了d微任务 => [a,b,c,d], 执行 c的过程中，产生了微任务 e
 * 
 */
