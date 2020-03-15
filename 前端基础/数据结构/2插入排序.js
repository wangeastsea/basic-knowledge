// 插入排序
// 思想： 从第二个元素开始，与第一个元素比较，并交换位置，前2个排序成功，
// 然后从第3个位置开始，与前2个元素比较，并交换位置，前3个排序成功，以此类推

var arr = [4,3,67,35,378,46,34,67,34,68,46,0]

function insertSort (arr) {
  for (var i = 1; i < arr.length; i++) {
    for (var j = i; j > 0; j--) {
      if (arr[j] < arr[j-1]) {
        swap(arr, j, j-1)
      } else {
        break
      }
    }
  }
  return arr
 }

console.log(insertSort(arr))
// 交换数组中2个元素的位置
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
  return arr
}
