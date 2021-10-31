function swap (arr, i ,j ) {
    [arr[i], arr[j]] = [arr[j], arr[i]]
} 

function selectSort(arr) {
    let len = arr.length
    for(let i = 0 ; i < len-1; i++) {
        let minIdex = i
        for(let j = i ; j<len; j++) {
            if (arr[j] < arr[minIdex]) {
                minIdex = j
            } 
        }
        if (minIdex !== i ) {
            swap(arr, minIdex, i )
        }
    }
    return arr
}   

console.log(selectSort([1,4,5,5,3,3,7,2,2]));

