const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()

router.get('/', async (ctx) => {
  ctx.body = 'user接口首页'
})
router.post('/register', async (ctx) => {
  ctx.body = ctx.request.body
  const User = mongoose.model('user')
  let newUser = new User(ctx.request.body)
  await newUser.save().then(() => {
    ctx.body = {
      code: 200,
      msg: '注册成功'
    }
  }).catch(error => {
    ctx.body = {
      code: 500,
      msg: error
    }
  })
})

module.exports = router
