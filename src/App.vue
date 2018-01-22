<template>
  <div id="app">
    <navHeader :homeData="homeData" :seller="seller" @search="searchDetail" :companyId="companyId" v-if="!navHide"
               @toIndex="ToHome"></navHeader>

    <!-- <transition :name="transitionName"> -->
      <router-view :homeData="homeData" ></router-view>
    <!-- </transition> -->
  </div>
</template>

<script>
  import navHeader from './components/base/nav'
  import loading from './components/base/loading/loading.vue'
  import Axios from "axios";
  import Util from './common/js/util.js';
  
  export default {
    name: 'app',
    data() {
      return {
        transitionName:'slide-left',
        seller: {
          logoUrl: '',
          isSearch: false,
          search: '',
          s_log_back: ''
        },
        all:'',
        companyId: (() => {
          let queryParam = this.urlParse();
          if(queryParam.companyId){
              return queryParam.companyId;
          }else if(localStorage.userInfo){
              return JSON.parse(localStorage.userInfo).companyId;
          }
          
        })(),
        homeData: {
          s_log_back: '',
          //banner
          img_list: [],
          img_list_1: '',
          //公司logo模块
          bigLogo: '',
          num: 0,
          kindt: 0,
          website: '',
          companyName:'',
          options: [{
            value: 1,
            label: '0-50'
          }, {
            value: 2,
            label: '50-100'
          }, {
            value: 3,
            label: '100-500'
          }, {
            value: 4,
            label: '500-1000'
          }, {
            value: 5,
            label: '1000人以上'
          }],
          s_options: [{
            value: 1,
            label: '天使轮'
          }, {
            value: 2,
            label: 'A轮'
          }, {
            value: 3,
            label: 'B轮'
          }, {
            value: 4,
            label: 'C轮'
          }, {
            value: 5,
            label: 'D轮'
          }, {
            value: 6,
            label: '上市'
          }, {
            value: 7,
            label: '未融资'
          }],

          form: {
            title: '',
            subTitle: '',
            company_name: '',
            company_p: '',
            company_address: '',
            recruit: '',
            choose: '',
            isSearch: false,
            intro: ''
          },
          customName1: '',
          customName2: '',
          //职位招聘
          wzpPositionList: [],
          //公司介绍
          content: '',
          searchList: ''
        },
        navHide:false,
      }
    },
    components: {
      navHeader,
      loading
    },
    methods: {
      getSignature(){
      var self=this;
      Axios.post(Util.wxSignature,'url='+encodeURIComponent(location.href.split('#')[0]))
      .then(function(res){
        self.$wechat.config({
          debug:false,
          appId:res.data.appid,
          timestamp:res.data.timestamp,
          nonceStr:res.data.noncestr,
          signature:res.data.signature,
          jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'translateVoice',
            'startRecord',
            'stopRecord',
            'onVoiceRecordEnd',
            'playVoice',
            'onVoicePlayEnd',
            'pauseVoice',
            'stopVoice',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'closeWindow',
            'scanQRCode',
            'chooseWXPay',
            'openProductSpecificView',
            'addCard',
            'chooseCard',
            'openCard'
          ]
        });
      });
    },
      //获取url参数
      urlParse() {

        let url = window.location.href;
        let obj = {};
        let reg = /[?&][^?&]+=[^?&]+/g;
        let arr = url.match(reg);
        if (arr) {
          arr.forEach((item) => {
            let tempArr = item.substring(1).split('=');
            let key = decodeURIComponent(tempArr[0]);

            let val = decodeURIComponent(tempArr[1]);

            obj[key] = val;
          });
        }
        return obj;
      },
      //微招聘首页信息
      _getIndexInfo() {
        var _this = this;
        var method = "miniRecruit/getWzpIndexInfo";
        var param = JSON.stringify({
          companyId: _this.companyId,
          type: 2
        });
        var successd = function (res) {
          if (res.data.code == 0) {
            _this.seller.logoUrl = res.data.data.wzpCompany.logoUrl
            _this.seller.isSearch = res.data.data.miniRecruit.isSearch === 1 ? true : false
            _this.seller.s_log_back = res.data.data.wzpCompany.companyUrl


            _this.homeData.s_log_back = res.data.data.wzpCompany.companyUrl
            _this.homeData.img_list_1 = res.data.data.fileInfoList ? res.data.data.fileInfoList[0].url : _this.imageUrl3

            _this.homeData.content = res.data.data.wzpCompany.description
            _this.homeData.bigLogo = res.data.data.wzpCompany.companyHeadImg
            _this.homeData.wzpPositionList = res.data.data.recruitmentCountList.result
            _this.homeData.form.subTitle = res.data.data.miniRecruit.subTitle
            _this.homeData.form.title = res.data.data.miniRecruit.title
            _this.homeData.customName1 = res.data.data.miniRecruit.customName1
            _this.homeData.customName2 = res.data.data.miniRecruit.customName2
            _this.homeData.wzpCompanyid = res.data.data.wzpCompany.id
            _this.homeData.form.website = res.data.data.wzpCompany.domain
            _this.homeData.form.company_p = res.data.data.wzpCompany.companyValues
            _this.homeData.form.company_address = res.data.data.wzpCompany.address
            _this.homeData.form.company_name = res.data.data.wzpCompany.name
            _this.homeData.companyName = res.data.data.wzpCompany.name
//
            _this.homeData.num = res.data.data.wzpCompany.dimensions
            _this.homeData.kindt = res.data.data.wzpCompany.status
            _this.homeData.website = res.data.data.wzpCompany.domain

            _this.homeData.content = res.data.data.wzpCompany.description
          }
        }
        _this.$http(method, param, successd);
      },
      searchDetail(val){
        this.searchDetail(val)
      },
      //首页职位搜索功能
      searchDetail(val) {
        this.searchList = val
        this.all = '全部'
        this.$router.push({
          path: `/list`,
          name: 'List',
          query: {
            companyId: this.companyId,
          },
          params: {
            searchList: this.searchList,
            all:this.all
          }
        })
      },
      ToHome(val){
        this.$router.push({
          path: `/`,
          query: {
            companyId: val,
          }
        })
      }
    },
    mounted(){
      this.getSignature();
      let path = this.$route.path;
      if(path.indexOf('/pc/')==-1 && path.indexOf('raPositionList')==-1 && path.indexOf('candidate')==-1 && path.indexOf('offer')==-1 && path.indexOf('raLogin')==-1){
        this.$nextTick(() => {
          this._getIndexInfo()
          this.all = ''
        })
        this.navHide=false;
      }else{
        this.navHide=true;
      }
    },
    watch:{
      $route(to, from) {
        let isBack = this.$router.isBack;
        if (isBack) {
          this.transitionName = 'slide-right'
        } else {
          this.transitionName = 'slide-left'
        }
        this.$router.isBack = false;
        //判断需不需要展示头部nav
        if(to.path.indexOf('/pc/')==-1 && to.path.indexOf('raPositionList')==-1 && to.path.indexOf('candidate')==-1 && to.path.indexOf('offer')==-1 && to.path.indexOf('raLogin')==-1){
          is.$nextTick(() => {
            this._getIndexInfo()
            this.all = ''
          })
          this.navHide=false;
        }else{
          this.navHide=true;
        }
      }
    }
  }

</script>
<style lang="less">
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/close';
  .vux-close:before, .vux-close:after{height: 2px;}
  .search .weui-icon-clear{display: none !important}
  .search .weui-search-bar{background-color: #f8f8fc;}
</style>
<style lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/mixin.styl"
  @import "common/stylus/base.styl"
  [v-cloak] {
    display: none;
  }

  .el-button--primary {
    background: #5AA2E7;
    border-color: #5AA2E7;
    color: #fff;
  }

  @media all and (max-width: 768px) {
    body{
      font-size:.32rem;
    }

    body .el-cascader-menus {
      /*top: 166px!important;*/
    }

    body .el-cascader-menus .el-cascader-menu {
      min-width: 135px !important;
    }

    body .el-select-dropdown {
      /*top: 166px!important;*/
      min-width: 135px !important;
    }

    body .choose-kind {
      font-size: 0.28rem;
    }

    body .choose-kind .weui-dialog {
      .title {
        padding-top: 17px;
        padding-bottom: 17px;
        font-size: 16px;
        padding-left: 15px;
        padding-right: 15px;
        font-weight: bold;
        color: #090a0b;
        text-align: left
        border-bottom: 1px solid #dddfe3

      }
      .img-box {
        padding-left: 15px !important
        padding-right: 15px !important
        height: auto !important
        max-height: 300px !important
        .btn-kind {
          position: relative;
          display: block;
          width: 100%;
          height: 40px;
          padding: 0 15px;
          font-size: 0.28rem;
          line-height: 40px;
          text-align: left;
          background-color: #fff;
          border-radius: 2px;
          border: none
          outline: none
          span {
            &:first-child {
              display: inline-block;
              vertical-align: top;
              max-width: 80%;
            }
          }
        }
      }
      .vux-close {
        display: inline-block
        padding-left: 15px;
        padding-right: 15px;
        width: 100%;
        height: 40px;
        line-height: 40px
        text-align: center;
        border-top: 1px solid #dddfe3
        color: #5c6170
      }

    }

    #app {
      .slide-left-enter, .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(50px, 0);
        transform: translate(50px, 0);
      }
      .slide-left-leave-active, .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(-50px, 0);
        transform: translate(-50px, 0);
      }
      .child-view {
        width:100%;
        transition: all .8s cubic-bezier(.55,0,.1,1);
      }
    }
    /*弹窗*/
    .cares{
      .care-content{
        .box-inner{
          overflow: hidden;
          border-radius: 4px;
          background: #fff;
          padding: 10px;
          .box-header{
            position: relative;
            min-height: 16px;
            .close{
              position: absolute;
              right: 0;
              top: 0;
              font-size: 18px;
            }
          }
          .box-body{
            text-align: center;
            padding-top: 16px;
            margin-bottom: 20px;
            color: #787e85;
            .follow{
              position: relative;
              overflow: hidden;
              .img{
                display: block;
                width: 4.6rem;
                height: 4.6rem;
                margin: 0 auto;
              }
              .text{
                font-size: 14px;
              }
            }
          }
        }
      }
    }
  }
</style>
