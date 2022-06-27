import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: () => import('../views/Cadastro.vue')
  },
  {
    path: '/app',
    name: 'app',
    component: () => import('../views/Principal.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  hash: false,
  mode: 'history',
  routes,
})

export default router
