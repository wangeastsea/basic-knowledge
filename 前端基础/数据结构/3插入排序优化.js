// 优化的思想是：从第二个元素开始，拿出来，
// 然后跟第一个比较，如果比第一个小，就将第一个往前移动到第二个位置，
// 并将第二个放到第一的位置，以此类推

// var arr = [3, 8, 20, 9, 23, 1, 45, 5, 235, 57, 55,55,55,43,34,0.3]
// function insertSort (arr) {
//   // 拷贝一个副本
//   var copyArr = arr.slice(0)
//   for (var i = 1; i < arr.length; i++) {
//     var deletedItem = arr[i]
//     copyArr.splice(i, 1)
//     for (var j = i - 1; j >= 0; j--) {
//       if (copyArr[j] < deletedItem) {
//         copyArr.splice(j+1, 0, deletedItem)
//         break
//       } else {
//         if (j === 0) {
//           copyArr.unshift(deletedItem)
//         }
//       }
//     }
//   } 
//    return copyArr
// }


// var arr = [23,4,65,67,78,8,89,908,34,567,21]
// function insertSort (arr) {
//   for(var i =1; i< arr.length; i++) {
//     var e = arr[i]
//     for (var j = i; j > 0; j--) {
//       if (e < arr[j-1]) {
//         arr[j] =  arr[j-1]
//        }            
//     }
//     arr[j] = e
//   }
//   return arr
// }

// console.log(insertSort(arr))