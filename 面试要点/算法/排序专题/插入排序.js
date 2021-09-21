function swap (arr, i ,j ) {
    [arr[i], arr[j]] = [arr[j], arr[i]]
} 

function insertSort(arr) {
    let len = arr.length
    for(let i = 1; i< len; i++) {
        let j = i 
        let temp = arr[i]
        while(j > 0 && arr[j-1] > temp) {
            arr[j] = arr[j-1]
            j--
        }
        arr[j] = temp
    }
    return arr
}

console.log(insertSort([5,6,7,2,4,651,3]));