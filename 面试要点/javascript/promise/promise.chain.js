// 实现一个链式调用
function promiseCreator1() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(1);
            resolve()
        }, 1000)
    }) 
  }
  
  function promiseCreator2() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(2);
            resolve()
        }, 2000)
    }) 
  }
  
  const promiseCreatorList = [
    promiseCreator1,
    promiseCreator2,
  ];



// new Promise.resolve(promiseCreator1()).then(() => {
//     return promiseCreator2()
// })


// 实现一个 promise chain
function promiseChain (promiseCreatorList) {
    promiseCreatorList.reduce((previousPromise, nextPromsise) => {
        return previousPromise.then(() => nextPromsise())
    }, Promise.resolve())
}

// promiseChain(promiseCreatorList)


function promiseChain2(promiseCreatorList) {
    let pre = Promise.resolve()
    for(let item of promiseCreatorList) {
       pre  =  pre.then(() => item())
    }
}

promiseChain2(promiseCreatorList)