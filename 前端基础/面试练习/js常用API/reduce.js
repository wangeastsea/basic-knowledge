// var people = [
//     { name: 'Alice', age: 21 },
//     { name: 'Max', age: 20 },
//     { name: 'Jane', age: 20 }
//   ];
  
//   function groupBy(objectArray, property) {
//     return objectArray.reduce(function (acc, obj) {
//       var key = obj[property];
//       if (!acc[key]) {
//         acc[key] = [];
//       }
//       acc[key].push(obj);
//       return acc;
//     }, {});
//   }
  
//   var groupedPeople = groupBy(people, 'age');
//   console.log(groupedPeople)
  // groupedPeople is:
  // { 
  //   20: [
  //     { name: 'Max', age: 20 }, 
  //     { name: 'Jane', age: 20 }
  //   ], 
  //   21: [{ name: 'Alice', age: 21 }] 
  // }


// let arr = [1,2,1,2,3,5,4,5,3,4,4,4,4];
// let result = arr.sort().reduce((init, current)=>{
//     if(init.length===0 || init[init.length-1]!==current){
//         init.push(current);
//     }
//     return init;
// }, []);
// console.log(result); //[1,2,3,4,5]

// const EventEmitter = require('events')
// class EE extends EventEmitter {}
// const yy = new EE()

// yy.on('event', () => console.log('粗大事啦'))
// setTimeout(() => console.log('0 毫秒后到期的定时器回调'), 0)
// setTimeout(() => console.log('100 毫秒后到期的定时器回调'), 100)
// setImmediate(() => console.log('immediate 立即回调'))
// process.nextTick(() => console.log('process.nextTick 的回调'))

// Promise.resolve().then(() => {
//   yy.emit('event')
//   process.nextTick(() => console.log('process.nextTick 的回调'))
//   console.log('promise 第一次回调')
// })
// .then(() => console.log('promise 第二次回调'))
