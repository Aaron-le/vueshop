import Vue from 'vue'
import Router from 'vue-router'
import ShopIndex from '@/components/pages/ShopIndex'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ShopIndex',
      component: ShopIndex
    }
  ]
})
