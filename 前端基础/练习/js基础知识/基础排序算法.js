
/**-----------------------------------------------------------------------------------------
 * 冒泡排序只会操作相邻的两个数据。每次冒泡操作都会对相邻的两个元素进行比较，看是否满足大小关系要求。
 *  如果不满足就让它俩互换。一次冒泡会让至少一个元素移动到它应该在的位置，重复 n 次，就完成了 n 个数据的排序工作。
 * --------------------------------------------------------------------------------------------
 */

var a = [1, 3, 6, 3, 76, 23, 1, 34, 222, 6, 456, 221];
//                  i=3     i=5

//                  j=0     j = 0,1,2,3,4
//                  j=1 
//                  j=2  ==>  [1,3,3,6,76,23]
// function bubbleSort(array) {

//     const len = array.length

//     if (len < 2) return array

//     for (let i = 0; i < len; i++) {

//         for (let j = 0; j < i; j++) {

//             if (array[j] > array[i]) {

//                 const temp = array[j]

//                 array[j] = array[i]

//                 array[i] = temp

//             }

//         }   

//     }

//     return array
// }

// console.log(bubbleSort(a))  // [1, 1, 3, 3, 6, 6, 23, 34, 76, 221, 222, 456]

var a = [1, 3, 6, 3, 76, 23, 1, 34, 222, 6, 456, 221];
// 冒泡算法一：
// function bubbleSort(arr) {
//     let length = arr.length
//     if (length<2) return 
//     for(let i = 0; i< length; i++) {
//         for ( let j = 0; j < i; j++) {
//             if (arr[j] > arr [i]) {
//                 let temp = arr[i]
//                 arr[i] = arr[j]
//                 arr[j] = temp
//             }
//         }
//     }
//     return arr
// }
// 冒泡算法二：
// function bubbleSory2 (arr) {
//     let length = arr.length
//     if (length<2) return 
//     // 控制几轮，大轮
//     for(let i = 0; i < length; i++) {
//         // 提前结束的标志位
//         let flag = false
//         for (let j = 0; j < length - i - 1; j++) {
//             if (arr[j] > arr[j+1]) {
//                 let temp = arr[j+1]
//                 arr[j+1] = arr[j]
//                 arr[j] = temp
//                 // let temp = arr[j]
//                 // arr[j] = arr[j+1]
//                 // arr[j+1] = temp
//                 flag = true
//             }
//         }
//         // 如果某一轮一次交换都没有，表示都已经是有序的了，可以直接结束了。
//         if (!flag) break
//     }
//     return arr
// }
// console.log(bubbleSory2(a))


/** 快速排序
 * -------------------------------------------------------------
 * 如果要排序数组中下标从 p 到 r 之间的一组数据，我们选择 p 到 r 之间的任意一个数据作为 pivot（分区点）。
 * 我们遍历 p 到 r 之间的数据，将小于 pivot 的放到左边，将大于 pivot 的放到右边，将 pivot 放到中间。
 * 经过这一步骤之后，数组 p 到 r 之间的数据就被分成了三个部分，
 * 前面 p 到 q-1 之间都是小于 pivot 的，中间是 pivot，后面的 q+1 到 r 之间是大于 pivot 的。
 * 根据分治、递归的处理思想，我们可以用递归排序下标从 p 到 q-1 之间的数据和下标从 q+1 到 r 之间的数据，
 * 直到区间缩小为 1，就说明所有的数据都有序了。
 * -------------------------------------------------------------
 */

// var a = [1, 3, 6, 3, 23, 76, 1, 34, 222, 6, 456, 221];
// function quickSork(array) {
//     let quick = function (arr) {
//         let len = arr.length
//         if (len<2) return arr
//         // 通过向右位移一位，相当于对len/2， 取中间的位数
//         const index = Math.floor(len >> 1) 
//         const pivot = arr.splice(index,1)[0]
//         const left = []
//         const right = []
//         for (let i =0; i< arr.length; i++) {
//             if (arr[i] > pivot) {
//                 right.push(arr[i])
//             }
//             if (arr[i] < pivot) {
//                 left.push(arr[i])
//             }
//         }
//         return quick(left).concat([pivot], quick(right))
//     }
//     const result = quick(array)
//     return result
// }
// console.log('快速排序的结果', quickSork(a))

/** 选择排序
 * -----------------------------------------
 * 它的工作原理是，首先将最小的元素存放在序列的起始位置，再从剩余未排序元素中继续寻找最小元素，
 * 然后放到已排序的序列后面……以此类推，直到所有元素均排序完毕
 * -----------------------------------------
 */
// function selectSort(arr) {
//     const len = arr.length
//     let temp
//     let minIndex
//     for (let i = 0; i < len - 1; i++) {
//         minIndex = i
//         for(let j = i+1; j < len; j++) {
//             if (arr[j] <= arr[minIndex]) {
//                 minIndex = j
//             }
//         }
//         temp = arr[i]
//         arr[i] = arr[minIndex]
//         arr[minIndex] = temp
//     }
//     return arr
// }

// console.log('选择排序', selectSort(a))

/** 插入排序
 * --------------------------------------------------------------
 * 它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入，从而达到排序的效果。
 * --------------------------------------------------------------
 */

// function insertSort(array) {
//     const len = array.length
//     let current 
//     let prev
//     for(let i =1;i<len;i++) {
//         current = array[i]
//         prev = i-1
//         while(prev >=0 && array[prev] > current) {
//             array[prev + 1] = array[prev]
//             prev--
//         }
//         array[prev+1] = current
//     }
//     return array
// }
// console.log('插入排序', insertSort(a))


