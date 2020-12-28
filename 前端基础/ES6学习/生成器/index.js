function* generatorFn() {}

const g = generatorFn()

console.log(g === g[Symbol.iterator]())


function* generatorFn(initial) {  
    console.log(initial);    
    console.log(yield);   
    console.log(yield); 
}  
let generatorObject = generatorFn('foo');
generatorObject.next('bar');  //foo 
generatorObject.next('baz');  //baz 
generatorObject.next('qux');  // qux