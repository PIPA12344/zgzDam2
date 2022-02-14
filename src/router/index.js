import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const Index = () => import("@/views/damObser/index")
const routes = [
  {
    path: '/index',
    component: Index
  },
  {
    path: '/',
    redirect: '/index'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
