// 思想：从一组数据中第一个开始，依次比较，找到最小的元素，跟第一的位置交换，然后一次类推
var arr = [23,34,56,12,456,67,2,10,567,875,45,38,1,0,6,5.5,4.3]
// var arr = ['d','x','c','b', 'a']
function selectSort (arr) {
  for(var i = 0; i < arr.length; i++) {
    var min = i
    for (var j = i+1; j < arr.length; j++) {
      if(arr[j] < arr[min]) {
        swap(arr, j, min)
      }
    }
  }
  return arr 
}

console.log(selectSort(arr))
// 交换数组中2个元素的位置
function swap (arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
  return arr
}


// console.log(swap([1,2,3,4], 1,3))