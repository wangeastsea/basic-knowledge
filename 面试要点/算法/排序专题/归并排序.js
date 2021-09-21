function mergeSort(arr) {
    let len = arr.length
    if (len <=1) {
        return arr
    }
    let mid = Math.floor(len/2)
    let leftArr = mergeSort(arr.slice(0, mid))
    let rightArr = mergeSort(arr.slice(mid, len))
    return mergeHandle(leftArr, rightArr)
}

function mergeHandle(arr1, arr2) {
    let i = 0 
    let j = 0 
    let len1 = arr1.length
    let len2 = arr2.length
    let res = []
    while(i<len1 && j <len2) {
        if (arr1[i] > arr2[j]) {
            res.push(arr2[j])
            j++
        } else {
            res.push(arr1[i])
            i++
        }
    }
    if (i<len1) {
        return res.concat(arr1.slice(i))
    } else {
        return res.concat(arr2.slice(j))
    }
}


console.log(mergeSort([5,6,2,3,4,5])); 