import Vue from 'vue'
import Router from 'vue-router'
import ShopIndex from '@/components/pages/ShopIndex'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ShopIndex',
      component: ShopIndex
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
