import Vue from 'vue'
import Router from 'vue-router'

import Home from 'components/home'

import List from 'components/List'

import listDetail from 'components/list_detail'

import Apply from 'components/Apply'

//内部推荐
import interpolate from 'components/interpolate'

//场景H5
import sceneh5 from 'components/sceneh5';

import addResume from 'components/microresume/add.vue'
import preview from 'components/microresume/preview.vue'
import results from 'components/microresume/results.vue'
import loginResume from 'components/microresume/loginResume.vue'

//微信
import positionList from 'components/position/positionList';
import aboutUs from 'components/wxIndex/aboutUs';
import teamwork from 'components/wxIndex/teamwork';
import onlinePosition from 'components/wxIndex/onlinePosition';

//简历
import resumePreview from 'components/resume/preview';

//招聘助手
import raPositionList from 'components/recruitAssistant/positionList';
import raPositionDetail from 'components/recruitAssistant/positionDetail';
import candidate from 'components/recruitAssistant/candidate';
import offer from 'components/recruitAssistant/offer';
import login from 'components/recruitAssistant/login';
import resumeDetail from 'components/resume/resumeDetail';


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
      path: '/listDetail',
      name: 'listDetail',
      component: listDetail
    },
    {
      path: '/apply',
      name: 'apply',
      component: Apply
    },
    // {
    //   path: '*',
    //   redirect: '/'
    // },
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
    },
    {
      path:'/loginResume',
      name:'loginResume',
      component:loginResume
    },
    {
      path:'/positionList',
      name:'positionList',
      component:positionList
    },
    {
      path:'/about',
      name:'about',
      component:aboutUs
    },
    {
      path:'/teamwork',
      name:'teamwork',
      component:teamwork
    },
    {
      path:'/interpolate',
      name:'interpolate',
      component:interpolate
    },
    {
      path:'/sceneh5',
      name:'sceneh5',
      component:sceneh5
    },
    {path:'/onlinePosition',
      name:'onlinePosition',
      component:onlinePosition
    },
    {
      path:'/resumePreview',
      name:'resumePreview',
      component:resumePreview
    },
    {
      path:'/raPositionList',
      name:'raPositionList',
      component:raPositionList
    },
    {
      path:'/raPositionDetail',
      name:'raPositionDetail',
      component:raPositionDetail
    },
    {
      path:'/candidate',
      name:'candidate',
      component:candidate
    },
    {
      path:'/offer',
      name:'offer',
      component:offer
    },
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path:'/resumeDetail',
      name:'resumeDetail',
      component:resumeDetail
    },
  ]
})
