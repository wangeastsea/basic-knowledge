// 2 中场景

// --build -d open-account -d open-account-hk -i yasdfasdfjkjskdf


// --build -d --all -i 


let msg = [ 
'--build',
'-d',
'aasdfasdf',
'-d',
'asdfasdfasdf',
'-i',
'asdfasdfasdf'
]

let cmg = msg.join(' ')

console.log(cmg)
// --build -d open-account -d open-account-hk -i yasdfasdfjkjskdf
let reg1 = /\-\-build\s(\-d\s\w+\s)+\-i\s\w+$/g
// --build -d --all -i 
let reg2 = /\-\-build\s\-\-all\s\-i\s\w+$/g

if (reg1.test(cmg) || reg2.test(cmg)) {
  console.log("通过")
}