function forEach (array, fn) {
    for(let i = 0; i< array.length; i++) {
        fn(array[i],i)
    }
}

forEach([1,2,3,4], (item) => {
    console.log(item)
})

function filter(array, fn) {
    let aa = []
    for(let i = 0; i< array.length; i++) {
         if(fn(array[i],i)) {
             aa.push(array[i])
         }
    }
    return aa
}

let cc = filter([2,3,4,4,5,5,6,6], (item, i) => {
    return item % 2 === 0
})

console.log(cc);

//模仿 map, every, some

function some (array, fn) {
    let flag = false
    for(let i = 0; i< array.length; i++) {
        if ((fn(array[i],i))) {
            flag = true
            break
        }  
   }
   return flag
}

let dd = some([1,2,4,4,4,5], (item) => {
    return item > 3
})

console.log('some',dd);

function every(array, fn) {
    let flag = true
    for(let i = 0; i< array.length; i++) {
        if (!(fn(array[i],i))) {
            flag = false
            break
        }  
   }
   return flag
}

let ff = every([1,2,4,4,4,5], (item) => {
    return item > 0
})
console.log('every', ff);

function map (array, fn) {
    let dd = []
    for(let i = 0; i< array.length; i++) { 
        dd.push(fn(array[i], i))
    }
    return dd
}

let ee = [1,2,3,4].map(item => {
    return item * 2
})
console.log('map', ee);