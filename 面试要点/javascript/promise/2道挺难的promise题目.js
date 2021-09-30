Promise.resolve().then(() => {
    console.log(0)
    // setTimeout(() => {
    //     console.log('宏任务');
    // }, 0)

    // 当执行栈为空的时候，会被推送到执行栈中。
    return Promise.resolve(4)
    // return 4
}).then(res => {
    console.log(res);
})

Promise.resolve().then(() => {
    console.log(1);
}).then(() => {
    console.log(2);
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(5);
}).then(() => {
    console.log(6);
}).then(() => {
    console.log(7);
}).then(() => {
    console.log(8);
})