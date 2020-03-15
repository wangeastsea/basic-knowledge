let book = {
    'title': '123',
    'year': '2001',
    'releaseDate': new Date(2019,2,8)
}

let bookJson = JSON.stringify(book)
console.log(bookJson)