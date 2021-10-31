
function swap (arr, i ,j ) {
    [arr[i], arr[j]] = [arr[j], arr[i]]
} 
function bubbleSort(arr) {
    let len = arr.length
    let flag 
    for(let i = 0; i<len; i++) {
        flag = false
        for(let j = 0 ; j <len - i -1; j++) {
            if (arr[j+1] < arr[j]) {
                swap(arr, j+1, j)
                flag = true
            }
        }
        if (flag === false) {
            return arr
        }
    }
    return arr
 }

 console.log(bubbleSort([4,3,6,7,8]));
