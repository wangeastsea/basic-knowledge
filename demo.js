
/**
 * 柯里化： 首先函数会接受一些参数，接受这些参数之后，函数并不会立即求值。而是继续返回另一个函数。
 * 刚才传入的参数在闭包里被保存了起来。待函数被真正需要求值的时候，之前传入的参数会一起进行求值。
 *  */ 



// var cost = (function () {
//     var args = []
//     return function () {
//         if(arguments.length === 0) {
//             var money = 0
//             for(var i = 0, l= args.length;i<l;i++) {
//                 money +=args[i]
//             }
//             return money
//         } else {
//             [].push.apply(args, arguments)
//         }
//     }
// })()
// cost(100)
// cost(100)
// cost(100, 200)
// console.log(cost())



// var currying = function (fn) {
//     let args = []
//     return function () {
//         if (arguments.length === 0) {
//             // this是什么，一块求值
//             return fn.apply(this, args)
//         } else {
//             // 将参数放入args当中
//             [].push.apply(args, arguments)
//             // 返回这个匿名函数，用于下次计算
//             // return arguments.callee
//         }
//     } 
// }

// // cost 本身是一个立即执行函数，返回一个函数，并保存了money变量 
// let cost = (function () {
//     let money = 0
//     return function () {
//         let l = arguments.length
//         for (let i = 0; i < l;i++) {
//             money += arguments[i]
//         }
//         return money
//     }
// })()

// cost = currying(cost)

// cost(100)
// cost(200)
// cost(300)
// cost(400)
// console.log(cost())


// Function.prototype.uncurrying = function () {
//     // self是调用函数  Array.prototype.push
//     let self = this
//     return function () {
//         // 解析出绑定的对象
//         var obj = Array.prototype.shift.call(arguments)
//         return self.apply(obj, arguments)
//     }
// }
// var push = Array.prototype.push.uncurrying()

// (function () {
//     push(arguments, 4)
//     console.log(arguments)
// })(1,2,3)

// Function.prototype.uncurrying = function () {
//     var self = this
//     return function () {
//         return Function.prototype.call.apply(self,arguments)
//     }
// }


// 什么是函数的柯里化与非柯里化


// let str = '--build -d open-account-hk -d open-account -i asdfasdfasdf'
// let mat = str.match(/(?<=\-d\s)[\w-]+\b/g)

// console.log(mat)

// #!/usr/bin/env node
const fs = require('fs')
const glob = require('glob')
const childProcess = require('child_process')
// let spawnSync = require('child_process').spawnSync
// 使用同步方法spawnSync执行jest，测试的结果在result.status中，通过为0，不通过为1
// var result = spawnSync('./node_modules/.bin/jest', ['test'])
// if (result.status) {
//     console.log('Commit Abort!Test failure.')
//     process.exit(result.status)
// }

// const branch = childProcess
//     .execSync('git rev-parse --abbrev-ref HEAD')
//     .toString()
//     .replace(/\s+/, '')

// let commitMsg = fs.readFileSync('./.git/COMMIT_EDITMSG', 'utf8')
// console.log('当前分支是：', branch)
// // 目前commit 信息校验，只包括这3个分支
// const branchsMustChecked = ['dev', 'sit', 'uat']

// console.log('当前提交信息是：', commitMsg)
// const reg = /--build\s(-d\s[\w-]+\s)+-i.+/g
// const regAll = /--build\s--all\s-i.+$/g

// if (branchsMustChecked.includes(branch)) {
//     // --build -d open-account -i 注释模式
//     if (reg.test(commitMsg)) {
//         let singlePages = commitMsg.match(/(?<=-d\s)[\w-]+\b/g)
//         for (let i = 0; i < singlePages.length; i++) {
//             let isExit = isExitPages(`./src/pages/${singlePages[i]}/**/main.js`)
//             if (!isExit) {
//                 console.error(
//                     '\033[41;37m Incorrect information committed,the single page does not exist,please check and commit again.\033[41;37m'
//                 )
//                 process.exit(1)
//             } else {
//                 console.log('Committed information passed')
//             }
//         }
//     }
//     // --build --all -i 注释模式
//     else if (regAll.test(commitMsg)) {
//         console.log('Committed information passed')
//     } else {
//         console.error(
//             '\033[41;37m Incorrect information committed, please check and commit again.\033[41;37m'
//         )
//         process.exit(1)
//     }
// }

// function isExitPages(globPath) {
//     return glob.sync(globPath).length > 0
// }
