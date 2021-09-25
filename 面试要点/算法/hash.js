// 罗马数字转数字
// 'I' : 1,
// 'V' : 5
// 'X' : 10


// IV: 4
// Ⅰ、Ⅱ、Ⅲ、Ⅳ、Ⅴ、Ⅵ、Ⅶ、Ⅷ、Ⅸ、Ⅹ、Ⅺ、Ⅻ……
// 1  2   3  4   5  6  7  8   9  10  11  12
function romanToInt(s) {
   let Map = { 'I' : 1,'V' : 5, 'X' : 10 }
   let res = 0
   let max = 0
   let len = s.length
   while(len>0) {
    let num = Map[s[len-1]]
    if (max > num) {
        res -= num
        len--
        continue
    }
    max = num
    res +=num
    len--
   }
   return res
}   

console.log(romanToInt('IV'))
console.log(romanToInt('VI'))