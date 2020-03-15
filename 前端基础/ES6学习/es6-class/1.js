let PersonClass = class PersonClass2 {
    constructor(name) {
        this.name = name
    }
    sayName () {
        console.log(this.name)
    }
}
let v1 = new PersonClass()
// console.log(v1.sayName())


o = Object.create(Object.prototype, {
    foo: {
        writable: true,
        configurable: true,
        value: 'hello'
    },
    bar: {
        configurable: false,
        get: function() { return 10; },
        set: function(value) {
            // console.log('Setting `o.bar` to', value);
        }
    }
})
// console.log(o.bar)



function MyArray () {
    console.log(this)
    console.log(Array.apply(null, arguments))
}
MyArray.call(this, 1,2,3,4,5)

