let bar = {
    a: 1,
    b: function () {
        console.log(this.a);
    }
}

console.log(bar.b());