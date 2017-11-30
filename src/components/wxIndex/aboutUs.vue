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
              <h3 class="info-title">{{preCompanyWebsite.name}}</h3>
              <div class="description">{{preCompanyWebsite.slogan}}</div>
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
                        <img :src="item.imageUrl"  alt="" width="100%" height="100%">
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
                        <img :src="item.imageUrl" alt="" width="100%" height="100%" >
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
  </div>
</template>

<script>

  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import footerNav from '../../components/base/foot'


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
        },
        companyId: (() => {
          let queryParam = this.urlParse();
          return queryParam.companyId;
        })(),
      }
    },
    methods: {
      app(index){
        console.log(index);
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
          companyId : _this.companyId
        });
        var successd = function (res) {
          if (res.data.code == 0) {
            console.log(res.data.data)
            _this.preCompanyWebsite = res.data.data.CompanyWebsite
            _this.preWorkTeam = res.data.data.WorkTeam
            _this.WorkEnvironment = res.data.data.WorkEnvironment
            _this.preCompanyMemorabilia = res.data.data.CompanyMemorabilia
          }
        }
        _this.$http(method, param, successd);
      },
      teamworkDeatil(){
          this.$router.push({
            name:'teamwork',
            path:'/teamwork',
            query:{
              companyId:this.companyId,
              WorkTeam:this.WorkTeam
            }
          })
      }
    },
    created(){
      this.$nextTick(() => {
        this.getCompanyDetail()
        console.log(this.companyId)
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
      footerNav
    }

  }

</script>

<style scoped >
  @import "../../common/stylus/swiper.css";

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

  .g-container .company-profile {
    position: relative;
    border-radius: 1px;
    border-bottom: 1px solid white;
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
  }

  .g-container .company-profile .g-card .header-main .header-info .template-company .description {
    font-weight: 300;
    padding-left: 0.14rem;
    padding-right: 0.141429rem;
    white-space: pre-line;
    font-size: 14px;
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
