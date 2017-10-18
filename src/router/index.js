import Vue from 'vue'
import Router from 'vue-router'

import Home from 'components/home'

import List from 'components/List'

import listDetail from 'components/list_detail'

import Apply from 'components/Apply'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/list/:id',
      name: 'listDetail',
      component: listDetail
    },
    {
      path: '/apply/:id',
      name: 'apply',
      component: Apply
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
