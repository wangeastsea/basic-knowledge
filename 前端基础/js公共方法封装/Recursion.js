
var obj = [
    {
        key1: [
            {
                key1: [
                    {'key1': null}
                ],
                name: 'qiuwei'
            }
        ],
        name: 'donghai'
    },
    {
        key1: [
            {
                key1: [
                    {'key1': null}
                ],
                name: 'qiuwei1'
            },
            {
                key1: [
                    {'key1': null}
                ],
                name: 'qiuwei1'
            }
        ],
        name: 'donghai1'
    }
]


function addDisabled(arr) {
    arr.forEach(item => {
        if (typeof item.key1 === 'object' && item.key1 !== null) {
            item.disabled = true
            addDisabled(item.key1)
        } else {
            item.disabled = true
        }
    })
    return arr
}
var result = addDisabled(obj)
console.log(result)