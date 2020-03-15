
// 数字单位转换，过单位临界值，自动转换单位  临界值（ 万 亿）
// num 只支持整数 
function translateNum (param_number) {
  // 没有超过万的，直接显示
  let Num = {"num": 0, "unit": ''}
  let number = Number(param_number)
  if (number < 10000) {
    Num.num = number
    return Num
  } else if (100000000 > number && number > 10000) {
    Num.num = number / 10000
    Num.unit = '万'
   return  Num
  } else if (number >= 100000000) {
    // 超过亿的以亿为单位
    Num.num = number / 100000000
    Num.unit = '亿'
    return Num
  }
}
let cc = translateNum()
cc