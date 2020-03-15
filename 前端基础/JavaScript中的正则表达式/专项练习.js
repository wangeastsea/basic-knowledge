let a = /\d{20}/;
console.log("123456789".match(/\d{3,5}?/g));
console.log("12345678".replace(/\d{3,6}?/g, "X"));
console.log("wangdonghai".replace(/g|h/g, "X"));
console.log("2018-11-18".replace(/(\d{4})-(\d{2})-(\d{2})/g, "$2/$3/$1"));

console.log("jdokrr".replace(/(?:jd)(ok)(rr)/g, "$2/$1"))
