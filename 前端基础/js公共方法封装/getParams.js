// function getParams (field, url)  {
//         let param = {},
//         splitArray = url.split('?'),
//         searchLocation =
//             splitArray.length <= 1 ? '' : splitArray[1].split('#')[0],
//         searchParams = searchLocation.split('&'),
//         value,
//         key
//     for (var i = 0, leni = searchParams.length; i < leni; i++) {
//         key = searchParams[i].split('=')[0]
//         value = searchParams[i].split('=')[1]
//         if (!key) {
//             continue
//         }
//         param[key] = value
//     }
//     return field ? param[field] : param
// }
// let url = 'https://m-sit.yxzq.com/webapp/open-account/apply.html#/step/6?auth=fail&errorCode=123&errorMessage=123'
// console.log(getParams('authw', url))


// function getUrlParam  (name)  {
//     const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
//     const loc = decodeURIComponent(window.location.search)
//     const r = loc.substr(1).match(reg)
//     if (r != null) return unescape(r[2])
//     return null
// }
// console.log(getUrlParam('https://m-sit.yxzq.com/webapp/open-account/apply.html#/step/6?auth=fail&errorCode=123&errorMessage=123'))
// const reg = new RegExp('(^|&)' + 'errorCode' + '=([^&]*)(&|$)')
// let aa = '?auth=fail&errorCode=123&errorMessage=123'.match(reg)
// console.log(aa)
// let url ='https://m-sit.yxzq.com/webapp/open-account/apply.html#/step/6?auth=fail&errorCode=123&errorMessage=123'
// let pos = url.indexOf('?')
// let search = decodeURIComponent(url.substr(pos+1))
// let r = search.match('(^|&)' + 'auth' + '=([^&]*)(&|$)')
// console.log(r[2])

function getUrlParam(name, URL = '') {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    let loc = ''
    let r
    let pos
    if (URL && URL.indexOf('?') !== -1) {
        pos = URL.indexOf('?')
        loc = decodeURIComponent(URL.substr(pos + 1))
        r = loc.match(reg)
        if (r != null) return r[2]
    } else {
        loc = decodeURIComponent(window.location.search)
        r = loc.substr(1).match(reg)
        if (r != null) return r[2]
    }
    console.log('走到了这里')
    return null
}
 let aa = getUrlParam('auth' ,'https://m1-uat.yxzq.com/webapp/open-account/apply.html#/step/6?auth=fail&errorCode=310446&errorMessage=%E6%B4%BB%E4%BD%93%E8%AF%86%E5%88%AB%E6%9D%83%E5%A8%81%E6%95%B0%E6%8D%AE%E6%A0%A1%E9%AA%8C%E5%A4%B1%E8%B4%A5%EF%BC%81')
 console.log(aa)