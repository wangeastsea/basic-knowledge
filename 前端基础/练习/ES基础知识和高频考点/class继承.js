class Animal {
    constructor(name) {
        this.name = name
    }
    eat () {
        console.log(`${this.name} eat`)
    }
}

class Dog extends Animal {
    constructor (name) {
        super(name)
    }
    say () {
        console.log(`${this.name} say`)
    }
}

const dog = new Dog('哈斯琪')
dog.eat()
dog.say()
