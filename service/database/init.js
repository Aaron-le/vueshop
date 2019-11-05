const mongoose = require('mongoose')
const db = 'mongodb://localhost/koa'
const glob = require('glob')
const {resolve} = require('path')

exports.initSchema = () => {
  glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
}

exports.connect = () => {
  // 连接数据库
  mongoose.connect(db)
  let maxconnece = 0

  return new Promise((resolve, reject) => {
    // 监听断开连接
    mongoose.connection.on('disconnected', (error) => {
      console.log('数据库断开')
      if (maxconnece < 3) {
        maxconnece++
        mongoose.connect(db)
      } else {
        reject(error)
        throw new Error('数据库断开，需人为处理')
      }
    })

    mongoose.connection.on('error', (error) => {
      console.log('数据库出错')
      if (maxconnece < 3) {
        maxconnece++
        mongoose.connect(db)
      } else {
        reject(error)
        throw new Error('数据库出错，需人为处理')
      }
    })

    // 数据库连接成功后
    mongoose.connection.once('open', () => {
      console.log('******数据库已连接成功******')
      resolve()
    })
  })
}
