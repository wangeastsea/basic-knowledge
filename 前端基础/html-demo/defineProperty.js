myObject = {}
let name = "wangdonghai"
Object.defineProperty(myObject, 'name', {
  get () {
    return name
  },
  set (value) {
    name = value
    console.log('我执行了')
  }
})

console.log(myObject.name)
myObject.name = 'jack'