function exchange(num) {
  num += ''; //转成字符串
  // 保留小数点后面的位数
  let numArr = num.split('.')
  if (numArr[0].length <= 3) {
    return num;
  }
  docBeforeNum = numArr[0].replace(/\d{1,3}(?=(\d{3})+$)/g, (v1) => {
    return v1 + ','
  })
  return docBeforeNum + '.' + numArr[1]
}

console.log(exchange(12345.67))