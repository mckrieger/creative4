import Vue from 'vue'
import Router from 'vue-router'
import Board from '@/components/Board'
import Splash from '@/components/Splash'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Splash',
      component: Splash
    },
    {
      path: '/game',
      name: 'Board',
      component: Board
    }
  ]
})
