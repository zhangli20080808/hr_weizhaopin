import Vue from 'vue'
import Router from 'vue-router'

import Home from 'components/home'

import List from 'components/List'

import listDetail from 'components/list_detail'

import Apply from 'components/Apply'

import addResume from 'components/microresume/add.vue'
import preview from 'components/microresume/preview.vue'
import results from 'components/microresume/results.vue'

Vue.use(Router)

Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}

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
    },
    {
      path:'/addResume',
      name:'addResume',
      component:addResume
    },
    {
      path:"/preview",
      name:'preview',
      component:preview
    },
    {
      path:'/results',
      name:'results',
      component:results
    }
  ]
})
