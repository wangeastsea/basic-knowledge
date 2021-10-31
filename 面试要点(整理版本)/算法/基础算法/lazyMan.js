

function LazyMan(name) {
    class lazyMan {
        queue = []
        constructor(name) {
            this.name = name
            this.queue.push(this.sayName.bind(this))
            setTimeout(() => {
                this.next()
            })
        }
        next() {
            let firstTask = this.queue.shift()
            if (firstTask) {
                firstTask()
            }
        }
        sayName() {
            console.log(`你好，我是${this.name}`)
            this.next()
            return this
        }
        sleep(second) {
            const task = () => {
                setTimeout(() => {
                    console.log(`我醒啦，我刚睡了${second}秒`)
                    this.next()
                }, second*1000)
            }
            this.queue.push(task)
            return this
        }
        eat(lunch) {
            const task = () => {
                console.log(`吃饭${lunch}` )
                this.next()
            }
            this.queue.push(task)
            return this
        }
        sleepFirst(second) {
            const task = () => {
                setTimeout(() => {
                    console.log(`我醒啦，我刚睡了${second}秒`)
                    this.next()
                }, second*1000)
            }
            this.queue.unshift(task)
            return this
        }
    }
    return new lazyMan(name)
}

LazyMan("Hank").sleepFirst(2).eat('lalla')
