const fs = require('fs')

// 读取数据
fs.readFile('./data_json/goods.json', 'utf8', function (err, data) {
  if (err) {
    console.log(err)
  }
  let newData = JSON.parse(data)
  let i = 0
  let pushData = []
  //   遍历筛选数据
  newData.RECORDS.map(function (value, index) {
    if (value.IMAGE1) {
      i++
      pushData.push(value)
    }
  })
  console.log(i)

  //   写入数据
  fs.writeFile('./data_json/newGoods.json', JSON.stringify(pushData), (err) => {
    if (err) {
      console.log('写入失败')
    } else {
      console.log('写入成功')
    }
  })
})
