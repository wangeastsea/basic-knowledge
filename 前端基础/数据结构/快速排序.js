// 随机选择数组中的一个数 A， 以这个数为基准
// 其他数字跟这个数进行比较， 比这个数小的放在其左边， 大的放到其右边
// 经过一次循环之后， A 左边为小于 A 的， 右边为大于 A 的
// 这时候将左边和右边的数再递归上面的过程

const Arr = [85, 24, 63, 45, 17, 31, 96, 50];

function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let pivotIndex = Math.floor(arr.length / 2);
  let pivot = arr.splice(pivotIndex, 1)[0];
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  // 递归
  return quickSort(left).concat([pivot], quickSort(right));
}

console.log(quickSort(Arr));