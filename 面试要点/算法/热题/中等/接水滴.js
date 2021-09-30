// 暴力求解

function trap(height = []) {
    let len = height.length
    if (len <= 2 ) {
        return 0
    }
    let res = 0
    for(let i = 1 ; i< len-1 ; i++) {
        let lmax = 0
        let rmax = 0

        for(let j = i; j<len;j++) {
            rmax = Math.max(rmax, height[j])
        }

        for (let j = i ;  j >=0; j--) {
            lmax = Math.max(lmax, height[j])
        }
        
        res+=Math.min(lmax, rmax) - height[i]
    }   
    return res
}



// 缓存方法

function trap1(height = []) {
    if (height.length <= 2) {
        return 0
    } 
    const n = height.length
    let res = 0
    let l_max = new Array(n)
    let r_max = new Array(n)

    l_max[0] = height[0]
    r_max[n-1] = height[n-1]

    for(let i = 1; i<n; i++) {
        l_max[i] = Math.max(height[i], l_max[i-1])
    }
    for (let i = n-2; i>=0; i--) {
        r_max[i] = Math.max(height[i], r_max[i+1])
    }
    for(let i = 1 ; i < n - 1; i++) {
        res += Math.min(l_max[i], r_max[i]) - height[i]
    }
    return res
}


// 双指针 
function trap3 (height = []) {
    let len = height.length
    if (len <=2) {
        return 0
    }
    let left = 0 
    let right = len - 1
    let l_max = height[0]
    let r_max = height[len-1]
    let res = 0
    while(left <= right) {
        l_max = Math.max(l_max, height[left])
        r_max = Math.max(r_max, height[right])

        if (l_max < r_max) {
            res += l_max - height[left]
            left++
        } else {
            res += r_max - height[right]
            right--
        }
    }
    return res
}






console.log(trap3([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))