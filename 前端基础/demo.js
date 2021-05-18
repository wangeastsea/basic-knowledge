// // 思路解决： 
// // 如果e.target是在.yx-main中时，不能阻止滚动，但是如果e.target 在.yx-main之外时，需要禁止滚动
// document.body.addEventListener('touchmove', function (e) {
//     if(!isScroll(e.target)) {
//         e.preventDefault();
//     }
// }, {passive:false})

// // 返回true 可以滑动
// function isScroll (ele) {
//     let yxContainerDom = document.querySelector('.yx-container')
//     let yxMainDom = document.querySelector('.yx-main')
//     // 使用了yx-container组件,并且ele是在main之内的元素，则可以滑动
//     if (yxMainDom && yxContainerDom && yxMainDom.contains(ele)) {
//         return true
//     } else if (!yxContainerDom && !yxMainDom) {
//         // 如果没有使用yx-container组件，不能阻止滚动
//         return true
//     } else {
//         // 其他情况，可能就是使用了yx-container，但是操作元素不在.yx-main之内，则不可以滚动
//         return false
//     }
// }

let aa = function () {
    return new Promise((resolve,reject) => {
        resolve()
    })
}
    
async function init () {

    try {
        let cc = await aa()
        console.log('cc',cc)
    } catch (e) {
        console.log('e')
        console.log(e)
    }
}

init()