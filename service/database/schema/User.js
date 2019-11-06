const mongoose = require('mongoose')
const Schema = mongoose.Schema
const objectId = Schema.Types.ObjectId
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

// 创建userSchema
const userSchema = new Schema({
  userId: objectId,
  userName: {unique: true, type: String},
  passWord: {type: String},
  creatAt: {type: Date, default: Date.now()},
  lastLoginAt: {type: Date, default: Date.now()}
}, {collection: 'user'})

userSchema.pre('save', function (next) {
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(this.passWord, salt, (err, hash) => {
      if (err) return next(err)
      this.passWord = hash
      next()
    })
  })
})

userSchema.methods = {
// 密码比对方法
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) {
          resolve(isMatch)
        } else {
          reject(err)
        }
      })
    })
  }
}

// 发布模型  映射schema到数据库
mongoose.model('user', userSchema)
