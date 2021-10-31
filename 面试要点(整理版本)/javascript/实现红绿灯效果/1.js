// 要求使用一个div实现红绿灯效果，把一个圆形div按照绿色3S， 黄色1S， 红色 2S，这样的循环改变颜色。

const MAP = {
    'green': 3000,
    'yellow': 1000,
    'red': 2000
}


function delay(duration) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, duration)
    })
}

async function changeColor (color) {
    document.getElementById('light').style.backgroundColor = color
    await delay(MAP[color])
}

// async function run() {
//     while(1) {
//         await changeColor('green', 3000)
//         await changeColor('yellow', 1000)
//         await changeColor('red', 2000)
//     }
// }

async function run() {
    // await changeColor('green', 3000)
    // await changeColor('yellow', 1000)
    // await changeColor('red', 2000)
    for(let key in MAP) {
        await changeColor(key)
    }
    run()
}

run()