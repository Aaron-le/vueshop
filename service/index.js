const Koa = require('koa')
const app = new Koa()
const {connect, initSchema} = require('./database/init.js')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')

const Router = require('koa-router')
let userApi = require('./appApi/userApi')
let router = new Router()
router.use('/user', userApi.routes())
app.use(bodyParser())
app.use(cors())

app.use(router.routes())
app.use(router.allowedMethods())

;(async () => {
  await connect()
  initSchema()
  // const User = mongoose.model('user')
  // let onePerson = new User({
  //   userName: 'aaron444',
  //   passWord: '123456'
  // })
  // onePerson.save().then(() => {
  //   console.log('插入成功')
  // })
  // let userOne = await User.findOne({})
  // console.log(userOne)
})()

app.use(async (ctx) => {
  ctx.body = 'hello'
})

app.listen(3000, () => {
  console.log('server is starting at port 3000')
})
