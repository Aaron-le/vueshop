const Router = require('koa-router')
const mongoose = require('mongoose')
const fs = require('fs')
let router = new Router()
// 数据库添加商品信息
router.get('/insertGoodsInfo', async (ctx) => {
  fs.readFile('./data_json/newGoods.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err)
    }
    let newData = JSON.parse(data)
    let count = 0
    const Goods = mongoose.model('Goods')
    newData.map((value, index) => {
      let newGoods = new Goods(value)
      newGoods.save().then(() => {
        count++
        console.log('导入成功' + count)
      }).catch(err => {
        console.log(err)
      })
    })
  })
  ctx.body = '开始导入数据'
})

// 数据库添加商品分类
router.get('/insertCategory', async (ctx) => {
  fs.readFile('./data_json/category.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err)
    }
    let newCateData = JSON.parse(data)
    let count = 0
    const Category = mongoose.model('category')
    newCateData.RECORDS.map((value, index) => {
      let newCategory = new Category(value)
      newCategory.save().then(() => {
        count++
        console.log('插入category成功' + count)
      }).catch(err => {
        console(err)
      })
    })
  })
  ctx.body = '插入category中~~'
})

// 数据库插入二级分类
router.get('/insertCateGorySub', async (ctx) => {
  fs.readFile('./data_json/category_sub.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err)
    }
    let newSubData = JSON.parse(data)
    let count = 0
    const CategorySub = mongoose.model('categorySub')
    newSubData.RECORDS.map((value, index) => {
      let newCategorySub = new CategorySub(value)
      newCategorySub.save().then(() => {
        count++
        console.log('插入二级分类成功' + count)
      }).catch(err => {
        console.log(err)
      })
    })
  })
  ctx.body = '正在插入二级分类中~~~'
})

// 商品详情接口
router.post('/getGoodsDetail', async (ctx) => {
  let goodsId = ctx.request.body.goodsId
  let Goods = mongoose.model('Goods')
  await Goods.findOne({ID: goodsId}).exec().then(async (result) => {
    ctx.body = {code: 200, message: result}
  }).catch(err => {
    console.log(err)
    ctx.body = {code: 500, data: err}
  })
})

// 获取商品大类接口
router.get('/getCategoryList', async (ctx) => {
  try {
    const Category = mongoose.model('category')
    let result = await Category.find().exec()
    ctx.body = {
      code: 200,
      msg: result
    }
  } catch (err) {
    console.log(err)
    ctx.body = {
      code: 500,
      msg: err
    }
  }
})

// 获取商品小类接口
router.post('/getCategorySubList', async (ctx) => {
  try {
    let categoryId = ctx.request.body.categoryId
    // let categoryId = 1
    const CategorySub = mongoose.model('categorySub')
    let result = await CategorySub.find({MALL_CATEGORY_ID: categoryId}).exec()
    ctx.body = {
      code: 200,
      msg: result
    }
  } catch (err) {
    console.log(err)
    ctx.body = {
      code: 500,
      msg: err
    }
  }
})

// 通过小类获取商品接口
router.get('/getGoodsListBycategory', async (ctx) => {
  try {
    // let categorySubId = ctx.request.body.categorySubId
    let categorySubId = '2c9f6c946016ea9b016016f79c8e0000'
    const Goods = mongoose.model('Goods')
    let result = await Goods.find({SUB_ID: categorySubId}).exec()
    ctx.body = {
      code: 200,
      msg: result
    }
  } catch (err) {
    console.log(err)
    ctx.body = {
      code: 500,
      msg: err
    }
  }
})

module.exports = router
