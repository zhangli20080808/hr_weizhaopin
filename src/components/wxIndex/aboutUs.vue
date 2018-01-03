<template>

  <!--模板-->
  <div class="g-container" id="aboutUs">
      <div class="company-profile" v-show="preCompanyWebsite.name">
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
      <div class="cards" v-show="preCompanyMemorabilia.length">
        <div class="card-type-1">
          <div class="g-card">
            <div class="template-card">
              <div class="template-complex">
                <div class="gm-card-offset">
                  <div class="gm-card-header">
                    <h2 class="gm-card-title">
                      <span class="pos_ware"></span>
                      <span class="text">发展历程</span>
                    </h2>
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
        <div class="card-type-2" v-show="WorkEnvironment.length">
          <div class="g-card">
            <div class="template-card">
              <div class="template-complex">
                <div class="gm-card-offset">
                  <div class="gm-card-header">
                    <h2 class="gm-card-title vux-1px-b">
                      <span class="env_img"></span>
                      <span class="text">办公环境</span>
                    </h2>
                  </div>
                  <!--slide-->
                  <div class="slides" style="height: 239px">
                    <swiper :options="swiperOption2" ref="mySwiper">
                      <!-- slides -->
                      <swiper-slide v-for="(item,index) in WorkEnvironment" :key="item.id" @click.native="app(index)">
                        <div class="media" style="height: 180px">
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
        <div class="card-type-3"  v-show="preWorkTeam.length">
          <div class="g-card" style="margin-bottom: 0">
            <div class="template-card">
              <div class="template-complex">
                <div class="gm-card-offset">
                  <div class="gm-card-header">
                    <h2 class="gm-card-title vux-1px-b">
                      <span class="team_icon"></span>
                      <span class="text">我们的团队</span>
                      <div class="allR">
                        <span class="info" @click="teamworkDeatil">查看更多信息</span>
                        <span class="icon"></span>
                      </div>
                    </h2>
                  </div>
                  <!--slide-->
                  <div class="slides" style="height: 239px" @click="teamworkDeatil">
                    <swiper :options="swiperOption" ref="mySwiper">
                      <!-- slides -->
                      <swiper-slide v-for="(item,index) in preWorkTeam" :key="item.id" class="swiper_slide">
                        <div class="media" style="height: 180px">
                          <img :src="item.imageUrl" alt="" style="width: 100%;height: 100%">
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
      <div class="footer_icon" v-show="preCompanyWebsite.name">
        <div class="img_detail"></div>
      </div>
      <div class="about_online" v-show="preCompanyWebsite.name">
        <div class="us" :class="{'activeColor':active}">关于我们</div>
        <div class="online_p" @click="getPosition">在招职位</div>
      </div>

    <!--<loading></loading>-->
    <!--关注弹窗-->
    <div v-transfer-dom class="cares">
      <x-dialog v-model="careQrcode" class="care-content">
        <div class="box-inner">
          <div class="box-header">
            <span class="close" @click="careQrcode=false">x</span>
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

  import loading from '../../components/base/loading/loading2.vue'
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
          autoplay: true,
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
          lists: []
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
        code: '',
        active: true
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
            document.title = res.data.data.companyName;
            self.getSignature();
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
        if (!queryParam.code) {
          return
        }
        this.code = queryParam.code
        return this.code;
      },
      //
      getWeWebsitePosition(){
        var self = this;
        var method = "companyWeb/getWeWebsitePosition",
          param = JSON.stringify({type: 2}),
          successd = function (res) {
            console.log(res.data)
            self.lists = res.data.data
          };
        self.$http(method, param, successd);
      },
      getPosition(){
        this.$router.push({
          name: 'onlinePosition',
          query: {
            companyId: this.companyId
          }
        })
      }
    },
    created(){
      this.$nextTick(() => {
        this.getCode()
        this.getCompanyDetail();
        this.getShareTitleInfo();
//        this.getWeWebsitePosition();
        window.scrollTo(0, 1);
        window.scrollTo(0, 0);
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
      XDialog,
      loading
    },
    directives: {
      TransferDom
    },

  }

</script>
<style lang="less">
  @import '~vux/src/styles/1px.less';

</style>
<style scoped>
  @import "../../common/stylus/swiper.css";
  @import "../../components/css/main.css";

  .g-container {
    position: relative;
    z-index: 2;
    background-color: #F8F8FC;
    border: 0;
    outline: 0;
    padding-bottom: 0.98rem;
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
    line-height: 0.8;
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
    width: 135px;
    background-color: transparent;
    color: #979797;
    border-color: #979797;
    border-radius: 37px;
    font-size: 0.32rem;
  }

  .social-btn {
    width: 135px;
    background-color: #66a4f9;
    border-color: #66a4f9;
    color: #fff;
    border-radius: 37px;
    font-size: 0.32rem;
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
    display: block;
    right: 0;
    top: 0;
    font-size: 25px;
    width: 20px;
    height: 20px;
    line-height: 20px;
  }

  .g-container .company-profile {
    position: relative;
    border-radius: 1px;
  }
  .g-container .footer_icon{
    height: 0.89rem;
    line-height: 0.89rem;
    text-align: center;
  }
  .g-container .footer_icon .img_detail{
    display: inline-block;
    vertical-align: middle;
    width: 106px;
    height: 15px;
    background: url(../../common/image/footLogo2.jpg)no-repeat center;
    background-size: 103px auto;
  }
  .g-container .company-profile .g-card {
    margin: 8px 0;
    overflow: hidden;
    background-color: #fff;
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
    padding-bottom: 10px;
  }

  .g-container .company-profile .g-card .header-main .header-icon {
    overflow: hidden;
    position: absolute;
    width: 92px;
    height: 92px;
    top: -44px;
    left: 50%;
    margin-left: -44px;
    z-index: 1;
    background-color: #fff;
    box-shadow: 0 4px 4px 0 hsla(0, 1%, 84%, .5);
    border-radius: 50%;
  }

  .g-container .company-profile .g-card .header-main .header-icon .icon-image {
    width: 92px;
    height: 92px;
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
    margin-top: 10px;
    margin-bottom: 8px;
  }

  .g-container .company-profile .g-card .header-main .header-info .template-company .action .btn-text {
    font-size: 0.32rem;
  }

  .g-container .cards .g-card {
    margin: 12px 0;
    overflow: hidden;
    background-color: #fff;
  }

  .g-container .cards .g-card .gm-card {
    padding-bottom: 0.282857rem;
  }

  .g-container .cards .gm-card-offset {
    margin-left: 0.32rem;
    margin-right: 0.32rem;
  }

  .g-container .cards .gm-card-offset .gm-card-header {
    overflow: hidden;
    padding: 0 0 15px 0;
    line-height: 1;
  }

  .g-container .cards .gm-card-offset .online_pos {
    padding-bottom: 0;

  }

  .g-container .cards .gm-card-offset .gm-card-header .gm-card-title {
    font-size: 0.32rem;
    font-weight: 400;
    color: #000;
    position: relative;
    height: 49px;
    line-height: 49px;
  }
  .g-container .cards .gm-card-offset .gm-card-header .gm-card-title .allR{
    font-size: 0.26rem;
    color: #9a9fac;
    display: inline-block;
    float: right;
  }
  .g-container .cards .gm-card-offset .gm-card-header .gm-card-title .allR .info{
    display: inline-block;
    vertical-align: middle;
  }
  .g-container .cards .gm-card-offset .gm-card-header .gm-card-title .allR .icon{
    display: inline-block;
    background: url(../../common/image/Backicon.png) no-repeat center;
    width: 10px;
    height: 15px;
    background-size: 50%;
    vertical-align: middle;
  }


  .g-container .cards .gm-card-offset .gm-card-header .gm-card-title .pos_ware {
    display: inline-block;
    vertical-align: middle;
    width: 17px;
    height: 17px;
    background: url(../../common/image/process.png) no-repeat center;
    background-size: cover;
  }

  .g-container .cards .gm-card-offset .gm-card-header .gm-card-title .env_img {
    display: inline-block;
    vertical-align: middle;
    width: 17px;
    height: 17px;
    background: url(../../common/image/env_img.png) no-repeat center;
    background-size: cover;
  }
  .g-container .cards .gm-card-offset .gm-card-header .gm-card-title .team_icon {
    display: inline-block;
    vertical-align: middle;
    width: 18px;
    height: 15px;
    background: url(../../common/image/team_icon.png) no-repeat center;
    background-size: cover;
  }


  .g-container .cards .gm-card-offset .gm-card-header .gm-card-title .text {
    display: inline-block;
    vertical-align: middle;
    height: 24px;
    line-height: 24px;
    margin-left: 3px
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
    color: #999;
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

  .swiper-container-horizontal > .swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction {
    bottom: 64px;
    left: 0;
    width: 100%;
  }

  .position_list {
    padding: 12px 0;
    font-size: 0.28rem;
    background-color: #fff;
    margin: 0px 0;
  }

  .position_list .position_name {
    display: inline-block;
    vertical-align: middle;
    font-size: 0.34rem;
    color: #222;
  }

  .position_list dt {
    line-height: 0.48rem;
    height: 0.48rem;
    margin-bottom: 6px;
    font-size: 0.26rem;
    color: #222;
  }

  .position_list_right {
    float: right;
    font-size: 0.8125rem;
    font-weight: 500;
    color: #FDA732;
  }

  .position_list dd {
    margin-bottom: 6px;
  }

  .position_list_money {
    color: #666;
  }

  .position_list_money span {
    margin-right: 2px;
    background-color: #e5e5e5;
    padding: 3px 5px;
    border-radius: 2px;
    color: #999999;
    font-size: 0.26rem;
  }

  .position_list_money .position_list_right {
    color: #46BE8A;
  }

  .position_list .position_list_date {
    color: #999;
    font-size: 0.26rem;
    margin-bottom: 0;
  }

  .position_list_date em {
    font-style: normal;
  }

  .about_online {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    display: flex;
    height: 0.98rem;
    font-size: 0.34rem;
    line-height: 0.98rem;
    background: #fff;
    z-index: 1000;
    border-top:1px solid #e5e5e5;
  }

  .about_online .us {
    text-align: center;
    flex: 1;
    border-right: 1px solid #e5e5e5;
  }

  .about_online .online_p {
    text-align: center;
    flex: 1;
  }

  .activeColor {
    color: #5AA2E7;
  }

</style>
<style>
  #aboutUs .cares .care-content .weui-dialog {
    max-width: 251px !important;
  }

  .swiper-pagination-bullet-active {
    background: #fff !important;
    opacity: 1;
  }

  .swiper-pagination-bullet {
    background: #ccc;
    opacity: 1;
  }
</style>
