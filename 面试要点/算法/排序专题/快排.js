function quickSort(arr, left=0, right = arr.length-1) { 
    let len = arr.length
    if (len <=1) {
        return arr
    }
    let pivotIndex = partition(arr, left ,right)
    if (pivotIndex - 1 > left) {
        quickSort(arr, left, pivotIndex-1)
    }
    if (pivotIndex< right) {
        quickSort(arr, pivotIndex, right)
    }
    return arr
}

function partition (arr, left ,right) {
    let pivotValue = arr[Math.floor(left + (right - left) / 2)]
    let i = left
    let j = right
    while(i<=j) {
        while(arr[i] < pivotValue) {
            i++
        }
        while(arr[j] > pivotValue) {
            j--
        }
        if (i<=j) {
            swap(arr, i, j )
            i++
            j--
        }
    }
    return i 
}

function swap (arr, i , j ) {
    [arr[i], arr[j]] = [arr[j], arr[i]]
}


console.log(quickSort([5,6,7,1,3,4,5]));