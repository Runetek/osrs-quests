import Vue from 'vue'
import Router from 'vue-router'
import Ye from '@/components/Ye'
import Quest from '@/components/Quest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Search',
      component: Ye
    },
    {
      path: '/quest/:slug',
      name: 'Quest',
      component: Quest,
      props: true
    }
  ]
})
