function getMostAppearedNumber(arr) {
    // TODO
    if (!arr.length) return 
    if (arr.length ===1) return arr[0]
    let map = {}
    let maxName 
    let maxNum = 0
    arr.forEach(item => {
        map[item] ? map[item]+1: map[item] =1
    })
    for(let r in map){
      if (map[r] > maxNum) {
          maxNum = map[r]
          maxName = r
      }
    } 	
    return maxName
  }