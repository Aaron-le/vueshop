const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()

router.get('/', async (ctx) => {
  ctx.body = 'user接口首页'
})

// 注册接口
router.post('/register', async (ctx) => {
  // ctx.body = ctx.request.body
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
// 登录接口
router.post('/login', async (ctx) => {
  let loginUser = ctx.request.body
  let userName = loginUser.userName
  let password = loginUser.passWord

  // 引入model
  const User = mongoose.model('user')
  await User.findOne({userName: userName}).exec().then(async (result) => {
    if (result) {
      let newUser = new User()
      await newUser.comparePassword(password, result.passWord)
        .then((isMatch) => {
          ctx.body = {
            code: 200,
            msg: isMatch
          }
        })
        .catch(err => {
          ctx.body = {
            code: 500,
            msg: err
          }
        })
    } else {
      ctx.body = {
        code: 500,
        msg: '用户名不存在'
      }
    }
  }).catch((err) => {
    ctx.body = {
      code: 500,
      msg: err
    }
  })
})

module.exports = router
