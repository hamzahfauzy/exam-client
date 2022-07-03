import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StartView from '../views/StartView.vue'
import FinishView from '../views/FinishView.vue'
import ExamView from '../views/ExamView.vue'
import LoginView from '../views/auth/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: (to,from,next) => {
      var user = window.localStorage.getItem('token')
      if(user == null)
        next({'name':'login'})
      else
        next();
    }
  },
  {
    path: '/start/:id',
    name: 'start',
    component: StartView,
    beforeEnter: (to,from,next) => {
      var user = window.localStorage.getItem('token')
      if(user == null)
        next({'name':'login'})
      else
        next();
    }
  },
  {
    path: '/exam/:id',
    name: 'exam',
    component: ExamView,
    beforeEnter: (to,from,next) => {
      var user = window.localStorage.getItem('token')
      if(user == null)
        next({'name':'login'})
      else
        next();
    }
  },
   {
    path: '/finish',
    name: 'finish',
    component: FinishView,
    beforeEnter: (to,from,next) => {
      var user = window.localStorage.getItem('token')
      if(user == null)
        next({'name':'login'})
      else
        next();
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    beforeEnter: (to,from,next) => {
      var user = window.localStorage.getItem('token')
      if(user != null)
        next({'name':'home'})
      else
        next();
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
