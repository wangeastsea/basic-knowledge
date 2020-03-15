// const MONTH_DAY = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
// const s = 1000
// const m = 60 * s 
// const h = m * 60
// const D = h * 24
// const M = (Month) => {
//     return D * MONTH_DAY[Month]
// }
// const Y = D * 365
// // 单位对应的单位值
// const RANGE_MAP = { 
//     '秒': () => s,
//     '分钟': () => m,
//     '小时': () => h,
//     '天': () => D,
//     '个月': M,
//     '年': () => Y
// }
// const timeDiff = function(t1, t2) {
//     debugger
//     let timeRange = new Date(t2).getTime() - new Date(t1).getTime()
//     const month = new Date().getMonth()
//     // let lastU = timeRange > 0 ? '前' : '后' // 判断是之前还是之后
//     timeRange = Math.abs(timeRange)
//     let uKey = '秒', uint = 1000
//     // 确定时间方位
//     Object.keys(RANGE_MAP).every(key => {
//         if (RANGE_MAP[key](month) <= timeRange) {
//             uint = RANGE_MAP[key](month) // 当前的
//             uKey = key
//             return true
//         }
//         return false
//     })
//     return parseInt(timeRange / uint) + uKey
// }

// console.log(timeDiff('2015-2-27 12:23:45', '2015-2-27 12:25:04'))
// async function jack () {
//     let aaa = await rose()
//     console.log(aaa)
// }
// function rose () {
//   return new Promise((resolve,reject)=>{
//         setTimeout(()=> {
//             resolve('123')
//         }, 1000)
//         console.log("promise1")
       
//     }).then((values)=>{
//         console.log(values)
//         new Promise((resolve,reject)=>{
//             console.log("promise2")
//             resolve('456')
//         }).then((values)=>{
//             console.log('我输出了'+values)
//             return values
//         }).then((values)=>{
//             console.log("then23")
//             return values
//         })
//     }).then(()=>{
//         console.log('sdfaksdjfkasdjf')
//     })
// }

// jack()

// setTimeout(function(){console.log('1122222222221')},0);
// new Promise(function(resolve,reject){
//    console.log("2222");//此处还没有执行异步操作，执行异步操作及执行回调函数，在promise中即then中的回调
//   resolve();
// }).then(function(){console.log('3333')})
// console.log("44444")

// 同时在嵌套异步操作中，会将嵌套的异步加入到下次的微任务队列中，以此类推（如嵌套的promise）
// setTimeout(()=> {console.log('12435345')},0)
// new Promise(function(resolve,reject){
//     resolve();
//   }).then(function(){
//         console.log("111");
//         new Promise(function(resolve,reject){
//         resolve();
//         }).then(() => {
//             console.log('666')
//         }).then(() => {
//             console.log('777')
//         }).then(()=> {
//             console.log('888')
//         })
//   }).then(function(){ console.log("222");})
   
//   new Promise( function(resolve,reject){
//       resolve();
//   }).then(function(){ console.log("33333");}).then(()=> {console.log('999')})


// let thenable = {
// 	then: function(resolve, reject) {
// 		setTimeout(function(){
// 			console.log('Promise');
// 			resolve('resolved');
// 		})
// 	}
// };

// Promise.resolve(thenable).then(val=>console.log(val));

// console.log('我是同步任务');

// setTimeout(function(){
// 	console.log('event loop')
// })


function executor(resolve, reject) {
    let rand = Math.random();
    console.log(1)
    console.log(rand)
    if (rand > 0.5)
        resolve()
    else
        reject()
  
}
var p0 = new Promise(executor);

var p1 = p0.then((value) => {
    console.log("succeed-1")
    return new Promise(executor)
})


var p3 = p1.then((value) => {
    console.log("succeed-2")
    return new Promise(executor)
})

var p4 = p3.then((value) => {
    console.log("succeed-3")
    return new Promise(executor)
})


p4.catch((error) => {
    console.log("error")
})

setTimeout(() => {console.log('时间完成')}, 0)

console.log(2)