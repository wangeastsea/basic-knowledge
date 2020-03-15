var cc = 100
function aa () {
  console.log(cc)
}

function bb () {
  var cc = 120
  aa()
}

bb()