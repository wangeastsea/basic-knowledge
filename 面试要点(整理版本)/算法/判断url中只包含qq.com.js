// https://www.qq.com/a/b

function checkQQ(url) {
    let reg = /^(http:\/\/[^=]+\.qq\.com)($|[\?\/])/
    return reg.test(url)
}
console.log(checkQQ('http://www.qq.com/a/b'));


