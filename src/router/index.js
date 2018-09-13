import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HelloWorldDetail from '@/components/HelloWorldDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/cardDetail',
      name: 'HelloWorldDetail',
      component: HelloWorldDetail
    }    
  ]
})
