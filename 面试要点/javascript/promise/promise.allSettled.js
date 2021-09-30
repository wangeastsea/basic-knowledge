// （头条）用promise.all实现一个promise.allSettled(具体是让失败了也输出结果)。
Promise.allSettled = function (promises) {
    return Promise.all(Array.from(promises).map(
        item => Promise.resolve(item).then(
            res => {
                return {
                    status: 'fuifilled',
                    value: res
                }
            },
             e => {
                 return {
                     status: 'rejected',
                     reason: e
                 } 
             }
        )
    ))
}

let promises = [Promise.reject('reject'), Promise.resolve('success')]
let p =  Promise.allSettled(promises)
p.then((res) => {
    console.log(res);
})
