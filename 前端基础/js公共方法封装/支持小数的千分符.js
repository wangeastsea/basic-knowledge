function transNumToThousandMark(num) {
    return num && num.toString()
        .replace(/\d+/, function(s){
             return s.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
         })
}

console.log(transNumToThousandMark(233534.2345))