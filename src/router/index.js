import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Ye from '@/components/Ye'
import Quest from '@/components/Quest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/search',
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
