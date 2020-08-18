let f;
let o = 10;
function a(o) {
    if (!f) {
        f = () => {
            console.log('console f', o);
        }
    } else {
        console.log('f true', o);
    }
    o+= 1;
    f();
}
a(1); 
a(5);
