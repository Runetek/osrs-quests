import Vue from 'vue'
import Router from 'vue-router'
import Explorer from '@/components/Explorer'
import Random from '@/components/Random'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Random
    },
    {
      path: '/quest/:slug',
      name: 'Quest',
      component: Explorer,
      props: true
    }
  ]
})
