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
import customResume from 'components/microresume/customResume.vue'
import preview from 'components/microresume/preview.vue'
import results from 'components/microresume/results.vue'
import loginResume from 'components/microresume/loginResume.vue'

//微信
import positionList from 'components/position/positionList';
import aboutUs from 'components/wxIndex/aboutUs';
import developmentHistoryPage from 'components/wxIndex/developmentHistoryPage';


import productIntroductionDeatil from 'components/wxIndex/productIntroductionDeatil';
import teamwork from 'components/wxIndex/teamwork';
import onlinePosition from 'components/wxIndex/onlinePosition';

//简历
import resumePreview from 'components/resume/preview';
import information from 'components/resume/information';
import selfIntroduction from "components/resume/selfIntroduction";
import work from "components/resume/work";
import language from 'components/resume/language';
import skill from "components/resume/skill";
import personalLink from "components/resume/personalLink";
import aspiration from "components/resume/aspiration";
import project from "components/resume/project";
import education from "components/resume/education";
import certificate from "components/resume/certificate";
import awards from "components/resume/awards";

//招聘助手
import raPositionList from 'components/recruitAssistant/positionList';
import raPositionDetail from 'components/recruitAssistant/positionDetail';
import candidate from 'components/recruitAssistant/candidate';
import offer from 'components/recruitAssistant/offer';
import raLogin from 'components/recruitAssistant/login';
import resumeDetail from 'components/resume/resumeDetail';
//PC端简历
import pcLogin from "components/pcresume/pcLogin";
import login from "components/pcresume/login";
import pcResume from "components/pcresume/pcResume";

//个人中心
import favourite from 'components/personal/favourite';
import jobRecord from 'components/personal/jobRecord';
import personal from 'components/personal/personal';
import jobRecordDetail from 'components/personal/jobRecordDetail';
import authentification from 'components/personal/authentification';
import authentification_gzh from 'components/personal/authentification_gzh';
import authentificationResult from 'components/personal/authentificationResult';


//创建简历
import createResume from "components/microresume/createResume"

//offer审批
import approvalList from 'components/approval/approvalList';
import approvalDetail from 'components/approval/approvalDetail';


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
      path: '/customResume',
      name: 'customResume',
      component: customResume
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
      path: '/developmentHistoryPage',
      name: 'developmentHistoryPage',
      component: developmentHistoryPage
    },
    {
      path: '/productIntroductionDeatil',
      name: 'productIntroductionDeatil',
      component: productIntroductionDeatil
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
      path:'/raLogin',
      name:'raLogin',
      component:raLogin
    },
    {
      path:'/resumeDetail',
      name:'resumeDetail',
      component:resumeDetail
    },
    {
      path:'/information',
      name:'information',
      component:information
    },
    {
      path:'/selfIntroduction',
      name:'selfIntroduction',
      component:selfIntroduction
    },
    {
      path:'/work',
      name:'work',
      component:work
    },
    {
      path:'/language',
      name:'language',
      component:language
    },
    {
      path:'/skill',
      name:'skill',
      component:skill
    },
    {
      path:'/personalLink',
      name:'personalLink',
      component:personalLink
    },
    {
      path:'/aspiration',
      name:'aspiration',
      component:aspiration
    },
    {
      path:'/project',
      name:'project',
      component:project
    },
    {
      path:'/education',
      name:'education',
      component:education
    },
    {
      path:'/certificate',
      name:'certificate',
      component:certificate
    },
    {
      path:'/awards',
      name:'awards',
      component:awards
    },
    {
      path:'/pc',
      name:'pcLogin',
      component:pcLogin,
      children:[
        {
          path:'/pc/login',
          name:'login',
          component:login
        },
        {
          path:'/pc/pcResume',
          name:'pcResume',
          component:pcResume
        }
      ]
    },
    {
      path:'/createResume',
      name:'createResume',
      component:createResume,
    },{
      path:'/approvalList',
      name:'approvalList',
      component:approvalList
    },
    {
      path:'/approvalDetail',
      name:'approvalDetail',
      component:approvalDetail
    },
  ]
})
