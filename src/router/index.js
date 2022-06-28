import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StartView from '../views/StartView.vue'
import FinishView from '../views/FinishView.vue'
import ExamView from '../views/ExamView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/start',
    name: 'start',
    component: StartView
  },
  {
    path: '/exam',
    name: 'exam',
    component: ExamView
  },
   {
    path: '/finish',
    name: 'finish',
    component: FinishView
  },
  {
    path: '/login',
    name: 'login',
    component: function(){
      return import(/* webpackChunkName: "about" */ '../views/auth/LoginView.vue')
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
