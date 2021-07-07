function checkAge (min) {
    return function (age) {
        return min> age
    }
}

const checkAge = (min) => (age => min > age)