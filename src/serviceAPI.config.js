const BASEURL = 'https://www.easy-mock.com/mock/5ae2eeb23fbbf24d8cd7f0b6/SmileVue/'
const LOCALURL = 'http://localhost:3000/'
const url = {
  getShoppingMallInfo: BASEURL + 'index',
  getGoodsInfo: BASEURL + 'getGoodsInfo',
  registerUser: LOCALURL + 'user/register', // 用户注册接口
  login: LOCALURL + 'user/login', // 用户登录接口
  getGoodsDetail: LOCALURL + 'goods/getGoodsDetail', // 用户登录接口
  getCategoryList: LOCALURL + 'goods/getCategoryList', // 得到大类信息
  getCategorySubList: LOCALURL + 'goods/getCategorySubList', // 得到小类信息
  getGoodsListBycategory: LOCALURL + 'goods/getGoodsListBycategory' // 得到小类商品信息
}

module.exports = url
