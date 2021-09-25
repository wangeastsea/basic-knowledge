import add from './add.js'
import multiply from './multiply.js'
import {once} from 'loadsh'

const onceAdd = once(add)
const addResult = onceAdd(1, 2)
const mulResult = multiply(2, 3)

console.log(addResult)
console.log(mulResult)