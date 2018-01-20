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

//个人中心
import favourite from 'components/personal/favourite';
import jobRecord from 'components/personal/jobRecord';
import personal from 'components/personal/personal';
import jobRecordDetail from 'components/personal/jobRecordDetail';
import authentification from 'components/personal/authentification';
import authentification_gzh from 'components/personal/authentification_gzh';
import authentificationResult from 'components/personal/authentificationResult';


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
      path: '/addResume',
      name: 'addResume',
      component: addResume
    },
    {
      path: "/preview",
      name: 'preview',
      component: preview
    },
    {
      path: '/results',
      name: 'results',
      component: results
    },
    {
      path: '/loginResume',
      name: 'loginResume',
      component: loginResume
    },
    {
      path: '/positionList',
      name: 'positionList',
      component: positionList
    },
    {
      path: '/about',
      name: 'about',
      component: aboutUs
    },
    {
      path: '/teamwork',
      name: 'teamwork',
      component: teamwork
    },
    {
      path: '/interpolate',
      name: 'interpolate',
      component: interpolate
    },
    {
      path: '/sceneh5',
      name: 'sceneh5',
      component: sceneh5
    },
    {
      path: '/onlinePosition',
      name: 'onlinePosition',
      component: onlinePosition
    },
    {
      path: '/resumePreview',
      name: 'resumePreview',
      component: resumePreview
    },
    {
      path: '/jobRecord',
      name: 'jobRecord',
      component: jobRecord
    },
    {
      path: '/favourite',
      name: 'favourite',
      component: favourite
    },
    {
      path: '/personal',
      name: 'personal',
      component: personal
    },
    {
      path: '/jobRecordDetail',
      name: 'jobRecordDetail',
      component: jobRecordDetail
    },
    {
      path: '/authentification',
      name: 'authentification',
      component: authentification
    },
    {
      path: '/authentification_gzh',
      name: 'authentification_gzh',
      component: authentification_gzh
    },
    {
      path: '/authentificationResult',
      name: 'authentificationResult',
      component: authentificationResult
    }
  ]
})
