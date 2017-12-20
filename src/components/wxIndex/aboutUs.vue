<template>

  <!--模板-->
  <div class="g-container" id="aboutUs" v-show="preCompanyWebsite.logoUrl">
    <div class="company-profile">
      <div class="g-card profile-header">
        <!--banner-->
        <div class="header-section banner">
          <img :style="bgStyle" class="banner-image" alt="">
        </div>
        <!---->
        <div class="header-section header-main">
          <div class="header-icon"><img :src="preCompanyWebsite.logoUrl" alt="" class="icon-image"></div>
          <div class="header-info">
            <div class="template-company">
              <h3 class="info-title g-oneline-text">{{preCompanyWebsite.name}}</h3>
              <div class="description">{{preCompanyWebsite.slogan}}</div>
              <div class="action" v-if="isAuthorization!==0">
                <div class="g-ghost-btn" @click="goCare"
                     :class="{'social-btn':isAuthorization==2,'g-ghost-white-btn':isAuthorization==1}">
                  <div class="btn-text">
                    {{isAuthorization == 1 ? '已关注' : '关注'}}



                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--办公环境-->
    <div class="cards">
      <div class="card-type-1">
        <div class="g-card">
          <div class="template-card">
            <div class="template-complex">
              <div class="gm-card-offset">
                <div class="gm-card-header">
                  <h3 class="gm-card-title">
                    发展历程
                </h3>
                </div>
                <!--slide-->
                <div class="vertical-list">
                  <div class="gamma-type-0">
                    <div style="overflow: hidden; display: block; position: relative;">
                      <div class="slide">
                        <div class="list-item" v-for="item in preCompanyMemorabilia">
                          <div class="inner">
                            <div class="g-flex">
                              <div class="gamma-left">
                                <img class="link-image" :src="item.imageUrl">
                              </div>
                              <div class="g-column gamma-right">
                                <div class="gamma-right-height">
                                  <span>{{filterTime(item.date)}}</span>
                                  <div class="gamma-description">

                                    {{item.description}}










                                  </div>
                                  <div class="gamma-text-cover"></div>
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-type-2">
        <div class="g-card">
          <div class="template-card">
            <div class="template-complex">
              <div class="gm-card-offset">
                <div class="gm-card-header">
                  <h3 class="gm-card-title">
                    办公环境
                </h3>
                </div>
                <!--slide-->
                <div class="slides" style="height: 237px">
                  <swiper :options="swiperOption2" ref="mySwiper">
                    <!-- slides -->
                    <swiper-slide v-for="(item,index) in WorkEnvironment" :key="item.id" @click.native="app(index)">
                      <div class="media" style="height: 150px">
                        <img :src="item.imageUrl" alt="" width="100%" height="100%">
                      </div>
                      <div class="title g-oneline-text">
                        {{item.description}}









                      </div>
                    </swiper-slide>
                    <!-- Optional controls -->
                    <div class="swiper-pagination" slot="pagination"></div>
                    <!--<div class="swiper-button-prev" slot="button-prev"></div>-->
                    <!--<div class="swiper-button-next" slot="button-next"></div>-->
                  </swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-type-3">
        <div class="g-card">
          <div class="template-card">
            <div class="template-complex">
              <div class="gm-card-offset">
                <div class="gm-card-header">
                  <h3 class="gm-card-title" @click="teamworkDeatil">
                    我们的团队
                </h3>
                </div>
                <!--slide-->
                <div class="slides" style="height: 237px" @click="teamworkDeatil">
                  <swiper :options="swiperOption" ref="mySwiper">
                    <!-- slides -->
                    <swiper-slide v-for="(item,index) in preWorkTeam" :key="item.id">
                      <div class="media" style="height: 150px">
                        <img :src="item.imageUrl" alt="" width="100%" height="100%">
                      </div>
                      <div class="title g-oneline-text">
                        {{item.description}}










                      </div>
                    </swiper-slide>
                    <!-- Optional controls -->
                    <div class="swiper-pagination" slot="pagination"></div>
                    <!--<div class="swiper-button-prev" slot="button-prev"></div>-->
                    <!--<div class="swiper-button-next" slot="button-next"></div>-->
                  </swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footerNav></footerNav>
    <!--关注弹窗-->
    <div v-transfer-dom class="cares">
      <x-dialog v-model="careQrcode" class="care-content">
        <div class="box-inner">
          <div class="box-header">
            <span class="close iconfont" @click="careQrcode=false">&#xe612;</span>
          </div>
          <div class="box-body">
            <div class="follow">
              <img class="img" :src="officilQrcodeUrl" style="max-width:100%">
              <span class="text">长按关注</span>
            </div>
          </div>
        </div>
        <div @click="careQrcode=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>

  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import footerNav from '../../components/base/foot'
  import util from "../../common/js/util.js";
  import {
    XDialog,
    TransferDomDirective as TransferDom
  } from 'vux'
  import Axios from 'axios';
  export default {
    data(){
      return {
        //预览
        preWorkTeam: [],
        WorkEnvironment: [],
        preCompanyWebsite: [],
        preCompanyMemorabilia: [],
        swiperOption: {//以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
          // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，<br>　　　　　　　　假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
          notNextTick: true,
          // swiper configs 所有的配置同swiper官方api配置
          autoplay: 3000,
          direction: 'horizontal',
          grabCursor: false,
          setWrapperSize: true,
          autoHeight: false,
          pagination: '.swiper-pagination',
          paginationClickable: false,
          prevButton: '.swiper-button-prev',//上一张
          nextButton: '.swiper-button-next',//下一张
          mousewheelControl: false,
          // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
          debugger: true,
          loop: true,
        },
        swiperOption2: {//以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
          // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，<br>　　　　　　　　假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
          notNextTick: true,
          // swiper configs 所有的配置同swiper官方api配置
          autoplay: 2000,
          direction: 'horizontal',
          grabCursor: false,
          setWrapperSize: true,
          autoHeight: false,
          pagination: '.swiper-pagination',
          paginationClickable: false,
          prevButton: '.swiper-button-prev',//上一张
          nextButton: '.swiper-button-next',//下一张
          mousewheelControl: false,
          // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
          debugger: true,
          loop: true,
          nonceStr: true,
          shareOpenId: this.$route.query.shareOpenId || null,
          // shareOpenId:'oTNQS0ktYqzINgWc5Z9HK_1b__HA',
          openId: this.$route.query.openId || null,
          imgUrl: '',
          title: '',
          desc: '',
        },
        companyId: (() => {
          let queryParam = this.urlParse();
          return queryParam.companyId;
        })(),

        // //关注状态：0：未授权第三方开发平台，不显示按钮；1：已关注；2：未关注
        subcribeMap: {
          subcribeStatus: ''
        },
        careQrcode: false,
        //企业公众号二维码url
        officilQrcodeUrl: '',
        isAuthorization: 1,
        code:''
      }
    },
    methods: {
      app(index){
        // console.log(index);
//         this.doShowToast()
      },
      filterTime(item){
        if (item) {
          return item.substr(0, 10)
        } else {
          return '';
        }
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
      //查询微官网
      getCompanyDetail(){
        var _this = this;
        var method = "weixin/getCompanyWebDetail";
        var param = {
          companyId: _this.companyId,
          code: _this.code
        };
        var successd = function (res) {
          if (res.data.codeUrl == '') {
            _this.preCompanyWebsite = res.data.CompanyWebsite
            _this.preWorkTeam = res.data.WorkTeam
            _this.WorkEnvironment = res.data.WorkEnvironment
            _this.preCompanyMemorabilia = res.data.CompanyMemorabilia
            _this.isAuthorization = res.data.subcribeMap.subcribeStatus
            _this.officilQrcodeUrl = res.data.subcribeMap.officilQrcodeUrl
          } else {
            _this.careHref = res.data.codeUrl
            location.href = _this.careHref
          }
        }
        _this.$webHttp(method, param, successd);
      },
      teamworkDeatil(){
        this.$router.push({
          name: 'teamwork',
          path: '/teamwork',
          query: {
            companyId: this.companyId,
            WorkTeam: this.WorkTeam
          }
        })
      },
      //获取分享标题
      getShareTitleInfo(){
        var self = this;
        var method = "positionRecommend/getShareTitleInfo",
          param = JSON.stringify({reqType: 3, companyId: self.companyId}),
          successd = function (res) {
            console.log(res.data)
            self.imgUrl = res.data.data.imgUrl;
            self.title = res.data.data.title;
            self.desc = res.data.data.desc;
            document.title = res.data.data.companyName
          };
        self.$http(method, param, successd);
      },
      getSignature(){
        var self = this;
        Axios.post(util.wxSignature, 'url=' + encodeURIComponent(location.href.split('#')[0]))
          .then(function (res) {
            self.$wechat.config({
              debug: false,
              appId: res.data.appid,
              timestamp: res.data.timestamp,
              nonceStr: res.data.noncestr,
              signature: res.data.signature,
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
            self.$wechat.ready(function (res) {
              //分享给朋友
              self.$wechat.onMenuShareAppMessage({
                title: self.title,
                desc: self.desc,
                link: 'https://aijuhr.com/miniRecruit/#/about?companyId=' + self.companyId,//分享链接
                imgUrl: self.imgUrl,//分享图标
                type: '',
                dataUrl: '',
                success: function () {
                  console.log('分享成功1');
                },
                cancel: function () {
                  console.log('用户取消分享后执行的回调函数1');
                }
              });
              //分享朋友圈
              self.$wechat.onMenuShareTimeline({
                title: self.title,
                desc: self.desc,
                link: 'https://aijuhr.com/miniRecruit/#/about?companyId=' + self.companyId,//分享链接
                imgUrl: self.imgUrl,//分享图标
                success: function () {
                  console.log('分享成功2');
                },
                cancel: function () {
                  console.log('用户取消分享后执行的回调函数2');
                }
              })

            })
          })
      },
      //是否关注
      goCare(){
        if (this.isAuthorization == 1) {
          return
        }
        this.careQrcode = true
      },
      getCode(){
        let queryParam = this.urlParse();
        if(!queryParam.code){
          return
        }
        this.code = queryParam.code
        return this.code;
      }
    },
    created(){
      this.$nextTick(() => {
        this.getCode()
        this.getCompanyDetail();
        this.getSignature();
        this.getShareTitleInfo();
      })
    },
    computed: {
      bgStyle() {
        return `background-image:url(${this.preCompanyWebsite.weBannerUrl})`
      }
    },
    components: {
      swiper,
      swiperSlide,
      footerNav,
      XDialog
    },
    directives: {
      TransferDom
    },

  }

</script>

<style scoped>
  @import "../../common/stylus/swiper.css";
  @import "../../components/css/main.css";

  .g-container {
    position: relative;
    z-index: 2;
    background-color: #f1f5f8;
    border: 0;
    outline: 0;
  }

  .g-oneline-text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 94%;
  }

  .g-column {
    flex: 1
  }

  .header-section {
    position: relative
  }

  .g-ghost-btn {
    position: relative;
    display: inline-block;
    padding: 10px 3px 11px;
    margin-bottom: 0;
    font-size: 13px;
    font-weight: 400;
    line-height: 1.2;
    border-radius: 2px;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    background-color: #fff;
    border: 1px solid #66a4f9;
    -moz-appearance: none;
    -webkit-appearance: none;
    text-decoration: none;
    box-sizing: border-box;
  }

  .g-ghost-white-btn {
    width: 110px;
    background-color: transparent;
    color: #abb4c3;
    border-color: #abb4c3;
  }

  .social-btn {
    width: 110px;
    background-color: transparent;
    border-color: #66a4f9;
    color: #66a4f9;
  }

  /*弹窗*/

  .cares .care-content .box-inner {
    overflow: hidden;
    border-radius: 4px;
    background: #fff;
    padding: 10px;
  }

  .cares .care-content .box-inner .box-header {
    position: relative;
    min-height: 16px;
  }

  .cares .care-content .box-inner .box-body {
    text-align: center;
    padding-top: 16px;
    margin-bottom: 20px;
    color: #787e85;
  }

  .cares .care-content .box-inner .box-body .follow {
    position: relative;
    overflow: hidden;
  }

  .cares .care-content .box-inner .box-body .follow .img {
    display: block;
    width: 4.6rem;
    height: 4.6rem;
    margin: 0 auto;
  }

  .cares .care-content .box-inner .box-body .follow .text {
    font-size: 14px;
  }

  .cares .care-content .box-inner .box-header .close {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 18px;
  }

  .g-container .company-profile {
    position: relative;
    border-radius: 1px;
  }

  .g-container .company-profile .g-card {
    margin: 8px 0;
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #e8f0f8;
    border-width: 1px 0;
  }

  .g-container .company-profile .profile-header {
    border-top-width: 0;
    margin-top: 0;
    width: 100%;
  }

  .g-container .company-profile .g-card .banner {
    overflow: hidden;
    background-color: #f1f5f8;
  }

  .g-container .company-profile .g-card .banner .banner-image {
    display: block;
    position: relative;
    height: 0;
    width: 100%;
    background-size: cover;
    padding-bottom: 48%;
  }

  .g-container .company-profile .g-card .header-main {
    padding-top: 44px;
    padding-bottom: 20px;
  }

  .g-container .company-profile .g-card .header-main .header-icon {
    overflow: hidden;
    position: absolute;
    width: 88px;
    height: 88px;
    top: -44px;
    left: 50%;
    margin-left: -44px;
    z-index: 1;
    background-color: #fff;
    box-shadow: 0 4px 4px 0 hsla(0, 1%, 84%, .5);
    border-radius: 50%;
  }

  .g-container .company-profile .g-card .header-main .header-icon .icon-image {
    width: 88px;
    height: 88px;
    border-radius: 50%;
    border: 0;
    z-index: 1;
  }

  .g-container .company-profile .g-card .header-main .header-info {
    font-style: normal;
    text-align: center;
    margin-top: 12px;
  }

  .g-container .company-profile .g-card .header-main .header-info .template-company {
  }

  .g-container .company-profile .g-card .header-main .header-info .template-company .info-title {
    font-size: 18px;
    font-weight: 300;
    color: #4b525c;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.3;
    margin-bottom: 10px;
  }

  .g-container .company-profile .g-card .header-main .header-info .template-company .description {
    font-weight: 300;
    padding-left: 0.14rem;
    padding-right: 0.141429rem;
    white-space: pre-line;
    font-size: 14px;
    color: #abb4c3;
  }

  .g-container .company-profile .g-card .header-main .header-info .template-company .action {
    margin-top: 22px;
    margin-bottom: 8px;
  }

  .g-container .company-profile .g-card .header-main .header-info .template-company .action .g-ghost-btn .btn-text {
    font-size: 13px;
  }

  .g-container .cards .g-card {
    margin: 8px 0;
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #e8f0f8;
    border-width: 1px 0;
  }

  .g-container .cards .g-card .gm-card {
    padding-bottom: 0.282857rem;
  }

  .g-container .cards .gm-card-offset {
    margin-left: 0.562857rem;
    margin-right: 0.562857rem;
  }

  .g-container .cards .gm-card-offset .gm-card-header {
    overflow: hidden;
    padding: 20px 0;
    line-height: 1;
  }

  .g-container .cards .gm-card-offset .gm-card-header .gm-card-title {
    font-size: 14px;
    margin: 0;
    font-weight: 700;
  }

  .g-container .cards .vertical-list {
  }

  .g-container .cards .vertical-list .gamma-type-0 {
  }

  .g-container .cards .vertical-list .gamma-type-0 .slide {
    z-index: 1;
    background-color: #fff;
    position: relative;
    width: 100%;
    transition: all .5s ease;
    -webkit-animation-duration: .5s;
    animation-duration: .5s;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .g-container .cards .vertical-list .gamma-type-0 .slide .list-item {
    margin-bottom: 0.6rem;
  }

  .g-container .cards .vertical-list .gamma-type-0 .slide .list-item .inner {
    font-size: 14px
  }

  .g-container .cards .vertical-list .gamma-type-0 .slide .list-item .inner .g-flex {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: relative;
  }

  .g-container .cards .vertical-list .gamma-type-0 .slide .list-item .inner .g-flex .gamma-left {
    overflow: hidden;
  }

  .g-container .cards .vertical-list .gamma-type-0 .slide .list-item .inner .g-flex .gamma-left .link-image {
    position: relative;
    display: inline-block;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    border: 0;
    width: 2.52rem;
    height: 1.56rem;
    border-radius: 2px;
    background: #ccc;
  }

  .g-container .cards .vertical-list .gamma-type-0 .slide .list-item .inner .g-flex .gamma-right {
    overflow: hidden;
    -webkit-box-flex: 2;
    -ms-flex-positive: 2;
    flex-grow: 2;
    padding-left: 14px;
  }

  .g-container .cards .vertical-list .gamma-type-0 .slide .list-item .inner .g-flex .gamma-right .gamma-description {
  }

  .g-container .cards .vertical-list .gamma-type-0 .slide .list-item .inner .g-flex .gamma-right .gamma-right-height {
    max-height: 1.56rem;
    overflow: hidden;
    position: relative;
  }

  .g-container .cards .vertical-list .gamma-type-0 .slide .list-item .inner .g-flex .gamma-right .gamma-right-height span {
    margin-bottom: 2px;
    display: inline-block;
  }

  .g-container .cards .vertical-list .gamma-type-0 .slide .list-item .inner .g-flex .gamma-right .gamma-right-height .gamma-description {
    color: #262626;
    line-height: 0.4rem;
    z-index: 0;
  }

  .g-container .cards .vertical-list .gamma-type-0 .slide .list-item .inner .g-flex .gamma-right .gamma-title {
    text-decoration: none;
    color: #66a4f9;
    margin-bottom: 2px;
  }

  .g-container footer {
    position: relative;
    width: 100%;
  }

  .g-container footer {
    height: 32px;
    background: #F7F7F7;
    width: 100%;
    line-height: 32px;
  }

  .g-container footer .title {
    height: 32px;
    line-height: 32px;
    color: #999999;
    font-size: 14px;
    background-size: 100%;
    background: url(../../common/image/footLogo.png) no-repeat center;
  }

  .swiper-container {
    height: 237px;
    position: relative
  }

  .swiper-container .swiper-wrapper .swiper-slide .media {
    height: 150px
  }

  .swiper-container .swiper-wrapper .swiper-slide .title {
    font-size: 14px;
    color: #abb4c3;
    font-weight: 400;
    line-height: 20px;
    margin-top: 10px;
  }

  .swiper-container .swiper-wrapper .swiper-slide .media .response-img {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #f2f2f2;
  }
</style>
<style>
  #aboutUs .cares .care-content .weui-dialog {
    max-width: 251px !important;
  }
</style>
