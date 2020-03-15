function HashTable () {
  this.table = new Array(137 )
  this.simpleHash = simpleHash
  this.showDistro = showDistro
  this.put = put
}
function put(data) {
  var key = this.simpleHash(data)
  this.table[key] = data
}
function simpleHash(data) {
  var total = 0;
  for(var i =0; i < data.length; ++i) {
    total += data.charCodeAt(i)
  }
  console.log(data + '' + total)
  return total % this.table.length
}

function showDistro () {
  for(var i = 0; i < this.table.length; i++) {
    if (this.table[i] != undefined) {
      console.log(i + ":" +this.table[i])
    }
  } 
}

var someNames = ['David', 'Jennifer', 'Donnie', 'RayMond', 'cynthia', 'Mike', 'Clayton', 'Danny', 'Jonathan']
var hTable = new HashTable()
for (var i = 0; i < someNames.length; ++i) {
  hTable.put(someNames[i])
}
hTable.showDistro()
