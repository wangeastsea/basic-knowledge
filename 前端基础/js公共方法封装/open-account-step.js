function two (infoStatus) {
    let sum = 1
    for (let i = 1; i <= 8; i++) {
        // 当前完成第几位
        if ((infoStatus & sum) === 0) {
            return i
        }
        sum *= 2
    }
    return 0
}
// console.log(two(15))

function two1 (infoStatus) {
    let sum = 1
    let map = {}
    for (let i = 1; i <= 8; i++) {
        // 当前完成第几位
        map[i] = (infoStatus & sum) !== 0
        sum *= 2
    }
    return map
    
}
function transNum(infoEditStatus) {
    let sum = 1
    for (let i = 1; i <= 6; i++) {
        // 返回到还没有完成的那一步
        if ((infoEditStatus & sum) === 0) {
            return i
        }
        sum *= 2
    }
}



console.log(two1(255))