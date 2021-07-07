import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Teacher from '@/components/Teacher'
import Pupil from '@/components/Pupil'
import Admin from '@/components/Admin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/teacher',
      name: 'Teacher',
      component: Teacher
    },
    {
      path: '/pupil',
      name: 'Pupil',
      component: Pupil
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    }
  ]
})
