<template>

  <!--模板-->
  <div class="g-container" id="aboutUs">
    <div class="company-profile">
      <div class="g-card profile-header">
        <!--banner-->
        <div class="header-section banner">
          <img src="" class="banner-image" alt="">
        </div>
        <!---->
        <div class="header-section header-main">
          <div class="header-icon"><img src="" alt="" class="icon-image"></div>
          <div class="header-info">
            <div class="template-company">
              <h3 class="info-title">杭州啊你家</h3>
              <div class="description">是我啊</div>
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
                    员工故事
                </h3>
                </div>
                <!--slide-->
                <div class="vertical-list">
                  <div class="gamma-type-0">
                    <div style="overflow: hidden; display: block; position: relative;">
                      <div class="slide">
                        <div class="list-item">
                          <div class="inner">
                            <div class="g-flex">
                              <div class="gamma-left">
                                <span class="link-image"></span>
                              </div>
                              <div class="g-column gamma-right">
                                <div class="gamma-right-height">
                                  <span>AA个</span>
                                  <div class="gamma-description">

                                    被评为“全国十佳校外基础教育培训机构”

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
                  <div class="swiper-container">
                    <div class="swiper-wrapper">
                      <div class="swiper-slide">
                        <div class="media">
                          <img class="response-img" src="//aiiju.com/img/aijv_mobile/img/index-banner-1.png" alt=""  width="100%" >

                        </div>
                        <div class="title g-oneline-text">
                          嘎嘎但是共商国是共商国是
                      </div>
                      </div>
                      <div class="swiper-slide">
                        <div class="media">
                          <img class="response-img" src="//aiiju.com/img/aijv_mobile/img/index-banner-2.png" alt="" width="100%" >
                        </div>
                        <div class="title g-oneline-text">
                          2
                      </div>
                      </div>
                      <div class="swiper-slide">
                        <div class="media">
                          <img class="response-img" src="//aiiju.com/img/aijv_mobile/img/index-banner-3.png" alt="" width="100%" >
                        </div>
                        <div class="title g-oneline-text">
                          3
                        </div>
                      </div>
                    </div>
                    <!-- Add Pagination -->
                    <div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets">
                      <span class="swiper-pagination-bullet"></span>
                      <span class="swiper-pagination-bullet"></span>
                      <span class="swiper-pagination-bullet"></span>
                    </div>
                  </div>
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
                  <h3 class="gm-card-title">
                    我们的团队
                </h3>
                </div>
                <!--slide-->
                <div class="slides" style="height: 237px">
                  <div class="swiper-container-2">
                    <div class="swiper-wrapper">
                      <div class="swiper-slide">
                        <div class="media">
                          <img class="response-img" src="//aiiju.com/img/aijv_mobile/img/index-banner-1.png" alt=""  width="100%" >

                        </div>
                        <div class="title g-oneline-text">
                          嘎嘎但是共商国是共商国是
                      </div>
                      </div>
                      <div class="swiper-slide">
                        <div class="media">
                          <img class="response-img" src="//aiiju.com/img/aijv_mobile/img/index-banner-2.png" alt="" width="100%" >
                        </div>
                        <div class="title g-oneline-text">
                          2
                      </div>
                      </div>
                      <div class="swiper-slide">
                        <div class="media">
                          <img class="response-img" src="//aiiju.com/img/aijv_mobile/img/index-banner-3.png" alt="" width="100%" >
                        </div>
                        <div class="title g-oneline-text">
                          3
                      </div>
                      </div>
                    </div>
                    <!-- Add Pagination -->
                    <div id="swiper-pagination" class=" swiper-pagination swiper-pagination-clickable swiper-pagination-bullets ">
                      <span class="swiper-pagination-bullet"></span>
                      <span class="swiper-pagination-bullet"></span>
                      <span class="swiper-pagination-bullet"></span>
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
</template>

<script>
   export default {
       data(){
           return{}
       },
     methods:{

     },
     created(){
       this.$nextTick(()=>{

       })
     }

   }

</script>

<style scoped>
  @import "../../common/stylus/swiper.css";
  .g-container{
    position: relative;
    z-index: 2;
    background-color: #f1f5f8;
    border: 0;
    outline: 0;
  }
  .g-oneline-text{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 94%;
  }
  .g-column{flex: 1}
  .header-section{position: relative}
  .g-container .company-profile{
    position: relative;
    border-radius: 1px;
    border-bottom: 1px solid white;
  }
  .g-container .company-profile .g-card{
    margin: 8px 0;
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #e8f0f8;
    border-width: 1px 0;
  }
  .g-container .company-profile .profile-header{
    border-top-width: 0;
    margin-top: 0;
  }
  .g-container .company-profile .g-card .banner{
    overflow: hidden;
    background-color: #f1f5f8;
  }
  .g-container .company-profile .g-card .banner .banner-image{
    display: block;
    position: relative;
    height: 0;
    width: 100%;
    background-size: cover;
    padding-bottom: 48%;
    background-image: url(//cdn.moseeker.com/upload/logo/b35f38ba-7c42-410a-8af3-4b60d296675e.png);
  }

  .g-container .company-profile .g-card .header-main{
    padding-top: 44px;
    padding-bottom: 20px;
  }
  .g-container .company-profile .g-card .header-main .header-icon{
    overflow: hidden;
    position: absolute;
    width: 60px;
    height: 60px;
    top: -44px;
    left: 50%;
    margin-left: -30px;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 hsla(0,1%,84%,.5);
    z-index: 1;

  }
  .g-container .company-profile .g-card .header-main .header-icon .icon-image{
    width: 88px;
    height: 88px;
    border-radius: 50%;
    border: 0;
    z-index: 1;
  }
  .g-container .company-profile .g-card .header-main .header-info{
    font-style: normal;
    text-align: center;
    /* margin-top: 0.282857rem; */
    /* z-index: -12; */
    /* margin: 0 auto; */

  }
  .g-container .company-profile .g-card .header-main .header-info .template-company{}
  .g-container .company-profile .g-card .header-main .header-info .template-company .info-title{
    font-size: 18px;
    font-weight: 300;
    color: #4b525c;
    margin-left: auto;
    margin-right: auto;
    line-height: 1;
  }
  .g-container .company-profile .g-card .header-main .header-info .template-company .description{
    font-weight: 300;
    padding-left: 0.14rem;
    padding-right: 0.141429rem;
    white-space: pre-line;
    font-size: 0.28rem;
  }
  .g-container .cards .g-card{     margin: 8px 0;
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #e8f0f8;
    border-width: 1px 0; }
  .g-container .cards .g-card .gm-card{ padding-bottom: 0.282857rem; }
  .g-container .cards .gm-card-offset {
    margin-left: 0.562857rem;
    margin-right: 0.562857rem;}
  .g-container .cards .gm-card-offset .gm-card-header{
    overflow: hidden;
    padding: 20px 0;
    line-height: 1;
  }
  .g-container .cards .gm-card-offset .gm-card-header .gm-card-title{
    font-size: 0.24rem;
    margin: 0;
    font-weight: 700;
  }
  .g-container .cards .vertical-list{}
  .g-container .cards .vertical-list .gamma-type-0{}
  .g-container .cards .vertical-list .gamma-type-0 .slide{
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
  .g-container .cards .vertical-list .gamma-type-0 .slide .list-item{
    margin-bottom: 0.6rem;
  }
  .g-container .cards .vertical-list .gamma-type-0 .slide .list-item .inner{font-size: 14px}
  .g-container .cards .vertical-list .gamma-type-0 .slide .list-item .inner .g-flex{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: relative;
  }
  .g-container .cards .vertical-list .gamma-type-0 .slide .list-item .inner .g-flex .gamma-left{
    overflow: hidden;
  }
  .g-container .cards .vertical-list .gamma-type-0 .slide .list-item .inner .g-flex .gamma-left .link-image{
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

  .g-container .cards .vertical-list .gamma-type-0 .slide .list-item .inner .g-flex .gamma-right{
    overflow: hidden;
    -webkit-box-flex: 2;
    -ms-flex-positive: 2;
    flex-grow: 2;
    padding-left: 14px;
  }
  .g-container .cards .vertical-list .gamma-type-0 .slide .list-item .inner .g-flex .gamma-right .gamma-description{}
  .g-container .cards .vertical-list .gamma-type-0 .slide .list-item .inner .g-flex .gamma-right .gamma-right-height{
    max-height: 77.9px;
    overflow: hidden;
    position: relative;
  }
  .g-container .cards .vertical-list .gamma-type-0 .slide .list-item .inner .g-flex .gamma-right .gamma-right-height span{
    margin-bottom: 10px;
    display: inline-block;
    padding-top: 2px;
  }

  .g-container .cards .vertical-list .gamma-type-0 .slide .list-item .inner .g-flex .gamma-right .gamma-right-height .gamma-description{
    color: #262626;
    line-height: 14px;
    z-index: 0;
  }

  .g-container .cards .vertical-list .gamma-type-0 .slide .list-item .inner .g-flex .gamma-right .gamma-title {
    text-decoration: none;
    color: #66a4f9;
    margin-bottom: 2px;
  }
  .g-container .cards .vertical-list{}
  .g-container .cards .vertical-list{}
  .g-container .cards .vertical-list{}
  .g-container footer{
    position: relative;
    width: 100%;
  }
  .g-container footer{
    height: 32px;
    background: #F7F7F7;
    width: 100%;
    line-height: 32px;
  }
  .g-container footer .title{
    height: 32px;
    line-height: 32px;
    color: #999999;
    font-size: 14px;
    background-size: 100%;
    background: url(../../common/image/footLogo.png)no-repeat center;
  }

  .swiper-container, .swiper-container-2 {height: 237px;position: relative}
  .swiper-container .swiper-wrapper{}
  .swiper-container .swiper-wrapper .swiper-slide{  }
  .swiper-container .swiper-wrapper .swiper-slide .media，.swiper-container－2 .swiper-wrapper .swiper-slide .media{ height: 150px }
  .swiper-container .swiper-wrapper .swiper-slide .title{ font-size: 14px;color: #abb4c3;font-weight: 400;line-height: 20px; margin-top: 10px;  }
  .swiper-container-2 .swiper-wrapper .swiper-slide .title{ font-size: 14px;color: #abb4c3;font-weight: 400;line-height: 20px; margin-top: 10px;  }
  .swiper-container .swiper-wrapper .swiper-slide .media .response-img{display: block;position: relative;width: 100%;height: 100%;background-color: #f2f2f2; }
  .swiper-container-2 .swiper-wrapper .swiper-slide .media .response-img{display: block;position: relative;width: 100%;height: 100%;background-color: #f2f2f2; }

</style>
