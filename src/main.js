// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import { Button, Row, Col, Search, Swipe, SwipeItem, Lazyload, List, Field, NavBar } from 'vant'

import filters from '@/filters/filter'
Vue.use(Button).use(Row).use(Col).use(Search).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(Field).use(NavBar)
Vue.prototype.$http = axios
Vue.config.productionTip = false
// 全局方法Vue.filter()统一注册自定义过滤器
Object.keys(filters).forEach(key => { // 返回filters对象中属性名组成的数组
  Vue.filter(key, filters[key])
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
