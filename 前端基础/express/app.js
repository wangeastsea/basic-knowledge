let express = require('express')
let path = require('path')
let bodyParser = require('body-parser')
var app = express()
let hbs = require('hbs')
let blogData = require('./lib/blog.js')
app.set('port', process.env.PORT || 8080)
app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'html');
app.engine('html', hbs.__express)
// bodyparser设置
app.use(bodyParser.urlencoded({
  extended: true
}))
app.get('/', (req, res) => {
  res.render('index', {title: "最近文章", entries: blogData.getBlogEntries() })
})
app.get('/about', (req, res) => {
  res.render('about', {title: "自我介绍"})
})
app.get('/article/:id', (req, res) => {
  let entry = blogData.getBlogEntry(req.params.id)
  res.render('article', {title: entry.title, blog: entry})
})

// 文件上传一直没有调试成功
// app.use('/picture', require('./routers/api'))
// 设定静态文件目录，比如本地文件
// 目录为demo/public/images，访问
// 网址则显示为http://localhost:3000/images
app.use(express.static(path.join(__dirname, 'public')));
app.listen(app.get('port'));