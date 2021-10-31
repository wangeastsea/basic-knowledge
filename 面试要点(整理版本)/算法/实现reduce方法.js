// reduce 方法

// function reduce(arr,callback,initValue) {
//     let flag = !Array.isArray(arr) || !arr.length || typeof callback !=='function'
//      if(flag){
//        throw new Error('参数报错')
//      }else{
//     //  判断有没有初始值
//       let isValue = initValue ===0 ? (!initValue) : (!!initValue)
//       let reduceValue = isValue ? initValue : arr[0]
//     //  判断其实相加的值
//       for (let index =isValue ? 0 : 1; index < arr.length; index++) {
//         reduceValue = callback(reduceValue, arr[index],index, arr)
//       }
//       return reduceValue
//      }
     
//   }
//   console.log(reduce(arr,(x,y)=>x+y))  //15
Array.prototype.reduce = function(callback,prev){
  // this 代表这个源数组
  for(let i=0 ;i < this.length; i++){
      if(prev===undefined){
          prev = callback(this[i],this[i+1],i+1,this)
          i++
      }else{
          prev = callback(prev,this[i],i,this)
      }
  } 
  return prev
}
