var f = fun()
function handle(res){
    if (res.done) return 
    res.value.then(function (data) {
        // 递归调用
        handle(f.next(data))
    })
}

handle(f.next())