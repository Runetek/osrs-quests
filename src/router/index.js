import Vue from 'vue'
import Router from 'vue-router'
import Explorer from '@/components/Explorer'
import Ye from '@/components/Ye'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Ye
    },
    {
      path: '/quest/:slug',
      name: 'Quest',
      component: Explorer,
      props: true
    }
  ]
})
