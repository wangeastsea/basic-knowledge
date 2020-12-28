const koa = require('./koa-imitate')
const Router = require('./router')
const app = new koa()
const router = new Router()

router.get('/index', async ctc => {
    console.log('index')
    ctx.body = 'index page'
})

router.get('/post', asyncctx=> { ctx.body='post page' })
router.get('/list', asyncctx=> { ctx.body='list page' })
router.post('/index', asyncctx=> { ctx.body='post page' })

const static = require('./static')
app.use(static(__dirname + './public'))

app.use(router.routes())

app.listen(3000, () => {
    console.log('3000')
})