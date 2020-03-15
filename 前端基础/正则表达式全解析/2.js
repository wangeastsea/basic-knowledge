function handleEmail (email) {
    // let regArr = email.match(/\b\w+(?=@)/)
    let emailArr = email.split('@')
    let prefix = emailArr[0]
    if (prefix.length > 6) {
        let hidePrefix = prefix.replace(/(\w{3})(\w+)(\w{3})\b/g, ($0, $1, $2, $3) => {
            let arr = []
            for(let i = 0; i < $2.length; i++ ) {
                arr.push('*')
            }
            return $1 + arr.join('') + $3
        })
        return hidePrefix + '@' + emailArr[1]
    } else {
        return email
    }
}
function handlePhone (number) {
    let num = number.replace(/(\d{3})\d{4}(\d{4})/g, ($0, $1, $2) => {
        return $1+'****'+$2
    })
    return num
}

console.log(handleEmail('2322128087@icloud.com'))

