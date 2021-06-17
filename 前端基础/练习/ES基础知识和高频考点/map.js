// keys()：返回键名的遍历器。
// values()：返回键值的遍历器。
// entries()：返回所有成员的遍历器。
// forEach()：遍历 Map 的所有成员
const map = new Map()
map.set('aaa', 100)
map.set('bbb', 200)
 
for (let [a,b] of map.entries()) {
    console.log(a,b)
}