// var regex  = /ab{2,5}c/g;
// var string = "abc abbbc abbbbbc   abbbbbbc"
// console.log(string.match(regex))

// var reg = /a[1-3]b/g;
// var string = 'a0b a1b a2b a3b a4b';
// console.log(string.match(reg))

//惰性匹配
// var reg = /\d{2,5}?/g
// var string = "123 1234 12345   123456"
// console.log(string.match(reg))


// 多选分支,默认是惰性模式
// var reg = /good|nice/g
// var str = "good ideam,nice try."
// console.log(str.match(reg))

// var reg = /good|goodbye/g
// var str = "goodbye"
// console.log(str.match(reg))

// var reg = /goodbye|good/g
// var str = "goodbye"
// console.log(str.match(reg))


// 匹配时间   23:59   02:07
// var reg = /^([01][0-9]|[2][0-3]):[0-5][0-9]/
// console.log(reg.test("23:59"))

// var reg = /id=".*?"/
// var string = '<div id="container" class="main"></div>'
// console.log(string.match(reg)[0])
// 优化版
// 排除字符组 [^abc], 排除a,b,c 之外的任意一个字符
// var reg = /id="[^"]*"/

// （） 【】 ｜ [^]

// var result = "I\nlove\njavascript".replace(/^|$/gm, '#')
// console.log(result)


// var result = 'hello'.replace(/(?!l)/g, '#')
// console.log(result)

// var reg = /(?!^)(?=(\d{3})+$)/g
// var res = '123456789'.replace(reg, ',')
// console.log(res)

// function format(num) {
//     return num.toFixed(2).replace(/\B(?=(\d{3})+\b)/g, ",").replace(/^/, "$ ")
// }
// console.log(format(1888))
// let reg = /(?=.*[a-z])(?=.*[0-9])^[0-9A-Za-z]{6,12}$/
// console.log(reg.test('ewrwewes3s'))

// var reg = /(\d{4})-(\d{2})-(\d{2})/
// var str = '2017-06-12'
// reg.test(str)
// console.log(RegExp.$1)
// console.log(RegExp.$2)
// console.log(RegExp.$3)



// var str = `1990年01月01日`
// var d = str.replace( /(\d+)年(\d+)月(\d+)日/, "$1-$2-$3")
// console.log(d)

// var re = /(\w+)\s(\w+)/;
// var str = "John Smith";
// var newstr = str.replace(re, "$2, $1");
// // Smith, John
// console.log(newstr);

// 分组
// var reg = /(\d{4})-(\d{2})-(\d{2})/
// var str = '2019-12-14'
// // var res = str.replace(reg, "$2/$3/$1")
// var res = str.replace(reg, ()=> {
//     return RegExp.$2 + '/' + RegExp.$3 + '/' + RegExp.$1
// })
// console.log(res)

// 反向引用
// let reg = /(\d)+ \1/
// console.log(reg.test("12345 1"))
// console.log(reg.test("123456 6"))

// 非捕获括号
// var regex = /(?:ab)+/g
// var str = "ababa abbb ababab"
// console.log(str.match(regex))

// function trim (str) {
//     return str.replace(/^\s+|\s+$/g, '')
// }
// console.log(trim(" foobar "))

// function titleize (str) {
//     return str.toLowerCase().replace(/(?:^|\s)\w/g,(c) => {
//         console.log(typeof c)
//         return c.toUpperCase()
//     })
// }
// console.log(titleize('my name is wangodnghai'))

// function camelize (str) {
//     return str.replace(/[-_\s]+(.)?/g, (match, c) => {
//         console.log('match',match)
//         console.log('c', c)
//         return c ? c.toUpperCase() : ''
//     })
// }
// console.log(camelize('-_moz - transform '))