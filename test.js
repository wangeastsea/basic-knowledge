// const getUaValue = key => {
//     const getUrlParam = name => {
//         const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
//         const loc = decodeURIComponent(window.location.search);
//         const r = loc.substr(1).match(reg);
//         if (r != null) return unescape(r[2]);
//         return null;
//     };

//     const reg = new RegExp(`(^|\\s)${key}\\/[^\\s]+`);
    
//     const match = ua.match(reg);
//     let value = match ? match[0].split('/')[1] : getUrlParam(key);
//     value = value || '';
//     return value;
// };

// let ua = 'Mozilla/5.0 (Linux; Android 10; Redmi K20 Pro Build/QKQ1.190825.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/83.0.4103.101 Mobile Safari/537.36 appVersion/5.2.0 softwareVersion/29 platform/yxzq-android model/29 uuid/eb6db9203f7051c0 appId/com.usmart.stock.debug nt/n1 systemVersion/10 sp/中国联通 channelId/yx inviteChannelId/ tn/18006001449 environment/uat appType/2 langType/1 skinType/white stockColorType/2'

// console.log(getUaValue('langType')