```js
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




```js
function asyncFunc (generator) {
    let iterator = generator()
    const next = function (data) {
        let {value, done} = iterator.next(data)
        if (done) return 
        value.then(data => {
            next(data)
        })
    }
    next()
}
```




```js
function asyncFn(generator) {
    let iterator = generator()
    const next = function (data) {
        let {value ,done} = iterator.next(data)
        if (done) {
            return
        }
        value.then((data) => {
            next(data)
        })
    }
    next()
}

```