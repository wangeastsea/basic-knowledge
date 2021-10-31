function longTimeFn(time) {
    return new Promise(resolve =>{
        setTimeout(() => {
            resolve(time)
        }, time)
    })
}


asyncFun(function* () {
    let data = yield longTimeFn(1000);
    console.log(data);
    data = yield longTimeFn(2000);
    console.log(data);
    return data;
})

function asyncFun(generator) {
    let iterator = generator()
    const next = (data) => {
        let {done, value} = iterator.next(data)
        if (done) return  
        value.then(data => {
            next(data)
        })
    }
    next()
}


function asyncfn(generator) {
    let iterator = generator()
    const next = function (data) {
        let {done, value} = iterator.next(data)
        if (done) return 
        value.then(value => {
            next(value)
        })
    }
    next()
}