<template>

  <!--模板-->
  <div class="g-container" id="aboutUs">
    <div class="personal_header">
      <img :src="tuijianObj.headImg" alt="">
      <h2>{{tuijianObj.nickname}}</h2>
      <div class="header_right">
        <p v-if="tuijianObj.haveGzh==1&&tuijianObj.isSubscribe==0" @click="careQrcode=true;" class="vux-1px-r">关注</p>
        <p v-if="tuijianObj.haveGzh==1&&tuijianObj.isSubscribe==1" class="vux-1px-r">已关注</p>
        <p @click="recommendedSchedule"> &nbsp;我的</p>
        <h6 v-if="tuijianObj.haveGzh==1&&tuijianObj.isSubscribe==0&&tag" @click="choseTag"><span>关注公众号获取职位分享动态</span></h6>
      </div>
    </div>
    <div class="company-profile">
      <div class="g-card profile-header">
        <!--banner-->
        <div class="header-section banner">
          <img :style="bgStyle" class="banner-image" alt="">
        </div>
        <!---->
        <div class="header-section header-main" v-show="preCompanyWebsite.logoUrl">
          <div class="header-icon"><img :src="preCompanyWebsite.logoUrl" alt="" class="icon-image"></div>
          <div class="header-info">
            <div class="template-company">
              <h3 class="info-title g-oneline-text">{{preCompanyWebsite.name}}</h3>
              <div class="description">{{preCompanyWebsite.slogan}}</div>
              <!-- <div class="action" v-if="isAuthorization!==0">
                <div class="g-ghost-btn" @click="goCare"
                     :class="{'social-btn':isAuthorization==2,'g-ghost-white-btn':isAuthorization==1}"
                     v-show="isAuthorization">
                  <div class="btn-text">
                    {{isAuthorization == 1 ? '已关注' : '关注'}}

                  </div>
                </div>
              </div> -->
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
                <div class="gm-card-header online_pos">
                  <h2 class="gm-card-title">
                    <span class="pos_ware"></span>
                    <span class="text">公司信息</span>
                  </h2>
                </div>
                <!--slide-->
                <ul>
                  <li class="vertical-list vux-1px-t">
                    <div class="name">
                      <span class="mainName">{{companyInfo.companyName}}</span>
                      <span class="address" @click="toMainMap"></span>
                    </div>
                    <div class="shortName" v-if="companyInfo.companyShortName">({{companyInfo.companyShortName}})</div>
                    <div class="address" v-if="companyInfo.address || companyInfo.region"><span
                      class="address_icon"></span><span
                      class="text">{{companyInfo.region}}{{companyInfo.address}}</span></div>
                    <div class="tel"><span class="tel_icon"></span><span class="text">{{companyInfo.phone}}</span></div>
                  </li>
                  <li class="vertical-list vux-1px-t" v-for="(item,index) in branchCompanyList">
                    <div class="name">
                      <span class="mainName">{{item.companyName}}</span>
                      <span class="address" @click="toMap(item)"></span>
                    </div>
                    <div class="shortName">({{item.companyShortName}})</div>
                    <div class="address"><span class="address_icon"></span><span
                      class="text">{{filter(item.region)}}{{item.address}}</span></div>
                    <div class="tel"><span class="tel_icon"></span><span class="text">{{item.branchPhone}}</span></div>
                  </li>

                </ul>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-type-1">
        <div class="g-card">
          <div class="template-card">
            <div class="template-complex">
              <div class="gm-card-offset">
                <div class="gm-card-header">
                  <h2 class="gm-card-title vux-1px-b">
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
      <div class="card-type-3" v-show="preWorkTeam.length&&preWorkTeam.length!=0">
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
    <div class="about_online">
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
        isAuthorization: '',
        code: '',
        active: true,
        branchCompanyList: [],
        companyInfo: {
          phone: "",
          address: "",
          companyImg: "",
          companyName: "",
          region: "",
        },
        latitude:'',
        longitude:'',
        companyName:'',
        detailAddress:'',
        address:'',

        tuijianObj:{//个人顶部通栏
          nickname:'',
          isSubscribe:0,
          headImg:null,
          haveGzh:1,
          companyGzh:{
            accountName:'',
            qrcodeUrl:''
          }
        },
        tag:true,
        fansId:this.$route.query.fansId,
        latitude: '',
        longitude: '',
        companyName: '',
        detailAddress: '',
        address: ''
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
        var method = "companyWeb/getCompanyDetail";
        var param = JSON.stringify({
          type: 2,
          companyId: _this.companyId
        });
        var successd = function (res) {
          if (res.data.code == 0) {
            _this.preCompanyWebsite = res.data.data.CompanyWebsite;
            _this.preWorkTeam = res.data.data.WorkTeam;
            _this.WorkEnvironment = res.data.data.WorkEnvironment;
            _this.preCompanyMemorabilia = res.data.data.CompanyMemorabilia
          }
        }
        _this.$http(method, param, successd);
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
              });
              //使用微信内置地图查看位置接口
//              self.$wechat.openLocation({
//                latitude: self.latitude, // 纬度，浮点数，范围为90 ~ -90
//                longitude:  self.longitude, // 经度，浮点数，范围为180 ~ -180。
//                name: self.companyName , // 位置名
//                address: self.detailAddress, // 地址详情说明
//                scale: 18, // 地图缩放级别,整形值,范围从1~28。默认为最大
//                infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
//              });

            })
          })
      },
      //获取内置地图信息接口
      getSignature2(){
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
              //使用微信内置地图查看位置接口
              self.$wechat.openLocation({
                latitude: self.latitude, // 纬度，浮点数，范围为90 ~ -90
                longitude: self.longitude, // 经度，浮点数，范围为180 ~ -180。
                name: self.companyName, // 位置名
                address: self.detailAddress, // 地址详情说明
                scale: 18, // 地图缩放级别,整形值,范围从1~28。默认为最大
                infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
              });
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
      },
      //微信内访问移动端页面，获取codeUrl；若返回的codeUrl不为空，则需要前端请求codeUrl地址，获取到code值
      getCodeUrl(){
        var _this = this;
        var method = "subscribeWeChat/getCodeUrl";
        var param = JSON.stringify({
          type: 2,
          companyId: _this.companyId,
          redirectUri: 'https://aijuhr.com/miniRecruit/#/about?companyId=' + _this.companyId + '',
          code: _this.code
        });
        var successd = function (res) {
          if (res.data.data.codeUrl == '') {

          } else {
            location.href = res.data.data.codeUrl
          }
        }
        _this.$http(method, param, successd);
      },
      toCare(){

        var _this = this;
        var method = "subscribeWeChat/subscribeCompanyWeChat";
        var param = JSON.stringify({
          type: 2, companyId: _this.companyId, code: _this.code
        });
        var successd = function (res) {
          _this.getCompanyDetail()
          _this.isAuthorization = res.data.data.subcribeStatus;
          _this.officilQrcodeUrl = res.data.data.officilQrcodeUrl;
        }
        _this.$http(method, param, successd);
      },
      //查询公司信息
      getMainCompanyInfo(){

        var _this = this;
        var method = "user/getCompanyInfo";
        var param = JSON.stringify({
          type: 2, companyId: _this.companyId
        });
        var successd = function (res) {
          if (res.data.code == 0) {
            _this.companyInfo.companyName = res.data.data.companyName;
            _this.companyInfo.companyShortName = res.data.data.companyShortName;
            _this.companyInfo.companyName = res.data.data.companyName;
            _this.companyInfo.region = res.data.data.region;
            _this.companyInfo.phone = res.data.data.phone;
            _this.longitude = parseFloat(res.data.data.longitude);
            _this.latitude = parseFloat(res.data.data.latitude);
            _this.companyName = res.data.data.companyName;
            _this.companyInfo.address = res.data.data.address;
            _this.detailAddress = _this.companyInfo.region + _this.companyInfo.address;
          }
        }
        _this.$http(method, param, successd);
      },
      //查询分公司列表信息
      getBranchCompanyInfo(){
        var _this = this;
        var method = "user/getBranchCompanyInfo";
        var param = JSON.stringify({
          type: 2, companyId: _this.companyId
        });
        var successd = function (res) {
          if (res.data.code == 0) {
            _this.branchCompanyList = res.data.data
          }
        }
        _this.$http(method, param, successd);
      },
      filter(item){
        let list = item.split(',').join('')
        return list;
      },
      toMainMap(){
        this.getMainCompanyInfo()

        this.getSignature2()
      },
      toMap(item){
        this.latitude = parseFloat(item.latitude);
        this.longitude = parseFloat(item.longitude);
        this.companyName = item.companyName;
        this.detailAddress = item.region + item.address;
        this.getSignature2()
      },

      //
      recommendedSchedule(){
        // location.href="https://aijuhr.com/miniRecruit/#/personal?companyId="+this.companyId;
        this.$router.push({
          name:'personal',
          query:{company:this.companyId}
        })
      },
      choseTag(){
        this.tag=!this.tag;
      },
      getUserInfo(){
        var self=this;
        var method="weixin/getUserInfo",
            param={
              companyId:self.companyId,
              fansId:self.fansId
            },
            successd=function(res){
              self.tuijianObj=res.data;
            };
        self.$webHttp(method,param,successd);
      },
      userAuthUrl(){
        var self=this;
        var method="weixin/userAuthUrl",
            param={
              scope:'snsapi_userinfo',
              pageFrom:4,
              companyId:self.companyId
            },
            successd=function(res){
              if(res.data.userSession==0){
                location.href=res.data.userAuthUrl;
              }else if(res.data.userSession==0){
                self.fansId=res.data.fansId;
              }
              self.getUserInfo();
            };
        self.$webHttp(method,param,successd);
      }
    },
    created(){
      this.$nextTick(() => {
        this.getCode();
        // this.getCodeUrl();
        this.toCare();
        this.getShareTitleInfo();
        this.getMainCompanyInfo();
        this.getBranchCompanyInfo();
        if(!this.fansId){
          this.userAuthUrl();
        }else{
          this.getUserInfo();
        }
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
    color: #ccc;
    border-color: #ccc;
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

  .g-container .footer_icon {
    height: 0.89rem;
    line-height: 0.89rem;
    text-align: center;
  }

  .g-container .footer_icon .img_detail {
    display: inline-block;
    vertical-align: middle;
    width: 106px;
    height: 15px;
    background: url(../../common/image/footLogo2.jpg) no-repeat center;
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
    color: #999;
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

  .g-container .cards .gm-card-offset .gm-card-header .gm-card-title .allR {
    font-size: 0.26rem;
    color: #9a9fac;
    display: inline-block;
    float: right;
  }

  .g-container .cards .gm-card-offset .gm-card-header .gm-card-title .allR .info {
    display: inline-block;
    vertical-align: middle;
  }

  .g-container .cards .gm-card-offset .gm-card-header .gm-card-title .allR .icon {
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
    font-size: 0;
    margin: 0.3rem 0;
  }

  .g-container .cards .vertical-list:nth-child(1) {
    margin-top: 0;
  }

  .g-container .cards .vertical-list .name {
    width: 100%;
    display: inline-block;
    font-size: 17px;
    height: 0.48rem;
    line-height: 0.48rem;
    margin-top: 0.3rem;
  }

  .g-container .cards .vertical-list .name .mainName {
    display: inline-block;
    vertical-align: middle;
  }

  .g-container .cards .vertical-list .name .address {
    float: right;
    width: 0.82rem;
    height: 0.44rem;
    background: url(../../common/image/address_icon3.png) no-repeat center;
    background-size: 50%;
  }

  .g-container .cards .vertical-list .shortName {
    font-size: 13px;
    color: #999999;
    margin: 4px 0;
  }

  .g-container .cards .vertical-list .address {
    font-size: 13px;
    color: #A9A9A9;
    position: relative;
    padding-left: 0.3rem;
  }

  .g-container .cards .vertical-list .address .address_icon {
    display: inline-block;
    position: absolute;
    left: -4px;
    top: -1px;
    width: 0.34rem;
    height: 0.48rem;
    background: url(../../common/image/address_icon2.png) no-repeat center;
    background-size: 50%;
  }

  .g-container .cards .vertical-list .address .text {
    display: inline-block;
    vertical-align: middle;
    height: 0.48rem;
    line-height: 0.48rem;
  }

  .g-container .cards .vertical-list .tel {
    position: relative;
    padding-left: 0.3rem;
    font-size: 13px;
    color: #999;
    margin-bottom: 0.3rem;
  }

  .g-container .cards .vertical-list .tel .tel_icon {
    display: inline-block;
    position: absolute;
    left: -6px;
    top: 0px;
    width: 0.44rem;
    height: 0.44rem;
    background: url(../../common/image/tel.png) no-repeat center;
    background-size: 45%;
  }

  .g-container .cards .vertical-list .tel .text {
    display: inline-block;
    vertical-align: middle;
    height: 0.48rem;
    line-height: 0.48rem;
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
    color: #999;
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
    border-top: 1px solid #e5e5e5;
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
