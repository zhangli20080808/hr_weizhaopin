<template>
  <div class="home" v-cloak="" v-show="homeData">
    <!--导航-->

    <!--轮播-->
    <div class="main_ad" v-show="homeData.img_list_1">
      <div class="carousel-inner1">
        <!--我们的data属性来保存我们要的数据,没有任何功能-->
        <div class="item " :style="bgStyle">
          <!--<img :src="homeData.img_list_1" alt="">-->
          <div class="item_text">
            <div class="title">{{homeData.form.title}}

            </div>
            <div class="des">{{homeData.form.subTitle}}</div>
          </div>
        </div>
      </div>
    </div>
    <!--公司简介-->
    <div class="s_company">
      <img class="c_img" v-show="homeData.bigLogo" :src="homeData.bigLogo">
      <div class="text">{{homeData.form.company_name}}</div>
      <p class="text1">{{homeData.form.company_p}}</p>
      <p class="text2">{{homeData.form.company_address}}</p>
      <div class="line"></div>


      <ul class="icon_list clearfix">
        <li>
          <div class="grid-content bg-purple">
            <i class="icon1"></i><span>{{options[homeData.num - 1] ? options[homeData.num - 1].label : ''}}</span>
          </div>
        </li>
        <li>
          <div class="grid-content bg-purple-light">
            <i
              class="icon2"></i><span>{{s_options[homeData.kindt - 1] ? s_options[homeData.kindt - 1].label : ''}}</span>
          </div>
        </li>
        <li>
          <div class="grid-content bg-purple">
            <i class="icon3"></i><span>{{homeData.website}}</span>
          </div>
        </li>
      </ul>

    </div>

    <!--招聘职位-->
    <div id="1F" class="s_recruit" v-show="homeData.wzpPositionList">
      <div class="container">
        <div class="title">
          <div class="text" v-if="homeData.customName1">{{homeData.customName1}}

            <span class="line"></span>
          </div>
        </div>
        <el-row :gutter="20" class="list_content">
          <el-col :span="8" :xs="12" :sm="8" :md="8" :lg="8" v-for="item in homeData.wzpPositionList"
                  :key="item.categoryId">
            <div class="grid-content bg-purple" @click="SelectTo(item)">
              <div class="content">
                <p class="des">{{item.name}}</p>
                <span class="text">在招职位</span>
                <span class="num">{{item.recruitmentNum}}</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <!--公司介绍-->
    <div class="intro_c" id="2F" v-if="homeData.content">
      <div class="title" v-if="homeData.customName2">
        <div class="text">{{homeData.customName2}}

          <span class="line"></span>
        </div>
      </div>

      <div class="intro_c_con container">
        <!--<div class="img"></div>-->
        <div class="intro_text" v-html="homeData.content">
        </div>
      </div>
    </div>
    <footerNav></footerNav>
  </div>
</template>
<script>
  import footerNav from './base/foot'
  export default {
    data() {
      return {
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
        wzpCompanyid: 2,
        companyId: (() => {
          let queryParam = this.urlParse();
          return queryParam.companyId;
        })(),
        categoryId: 0,
        list: [],
        searchPage: {},
        config: {
          pageSize: 9,
          pageNum: 1,
          totalCount: 1
        },
        posId:0
      }
    },
    props: {
      homeData: {
        type: Object
      }
    },
    methods: {
      goSearch() {
        this.searchDetail()

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
      SelectTo(item) {
        this.categoryId = item.categoryId
        localStorage.setItem('posId',this.categoryId)
        this.selectSearch(this.categoryId)
      },
      selectSearch(item) {
        var _this = this;
        var method = "promotionPage/positionList";
        var param = JSON.stringify({
          pageNum: _this.config.pageNum,
          pageSize: _this.config.pageSize,
          companyId: _this.companyId,
          categoryId: item,
          workCity: ''
        });

        var successd = function (res) {
          if (res.data.code == 0) {
            _this.list = res.data.data.positionList
            _this.$router.push({
              path: `/list`,
              name: 'List',
              params: {
                list: _this.list,
                config: _this.config
              },
              query: {
                companyId: _this.companyId,
              }
            })
          }
        }
        _this.$http(method, param, successd);
      },
    },
    computed: {
      bgStyle() {
        return `background-image:url(${this.homeData.img_list_1})`
      }
    },
    components:{
      footerNav
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  .home {
    background: #fff
    .main_ad {
      .carousel-inner1 {
        .item {
          background: url(../common/image/banner.png) no-repeat
          width: 100%
          height 478px
          background-position: center center
          background-size: cover
          position: relative

          img {
            width: 100%
            height: 100%
          }
          .item_text {
            position: absolute
            width: 540px
            height: 134px
            top: 50%
            left: 50%
            margin-left: -270px
            margin-top: -67px
            color: #fff
            text-align: center

            .title {
              font-size: 60px
              margin-bottom 44px
              font-weight: 200
            }
            .des {
              font-size: 24px
              font-weight: 200
            }
          }
        }
      }
    }

    .s_company {
      width: 100%
      text-align: center
      background: #F7F7F7
      padding-top: 31px
      .c_img {
        width: 180px
        height: 180px
        display: inline-block
        text-align: center
        position: relative
      }
      .text {
        margin-top: 22px
        font-size: 16px
        color: #1F2D3D
      }
      .text1, .text2 {
        color: #475669
        font-size: 14px
        margin-top: 30px
        margin-bottom: 36px
      }
      .line {
        width: 100%
        height: 1px
        background: #E0E6ED
      }
      .icon_list {
        height: 66px
        line-height 66px
        padding: 0 0.1rem
        font-size: 16px;
        li {
          display: inline-block
          margin: 0 80px
          span {
            vertical-align: middle
          }
        }
        .icon1 {
          background url(../common/image/Shape.png) no-repeat center
          display: inline-block
          width: 24px
          height: 24px
          margin-right: 27px
          background-size: 65%
          vertical-align: middle
          @media screen and (max-width: 768px) {
            margin-right: 5px
          }
        }
        .icon2 {
          background url(../common/image/Shape65.png) no-repeat center
          display: inline-block
          width: 24px
          height: 24px
          margin-right: 27px
          background-size: 65%
          vertical-align: middle
          @media screen and (max-width: 768px) {
            margin-right: 5px
          }
        }
        .icon3 {
          background url(../common/image/industry.png) no-repeat center
          display: inline-block
          width: 24px
          height: 24px
          margin-right: 27px
          background-size: 65%
          vertical-align: middle
          @media screen and (max-width: 768px) {
            margin-right: 5px
          }
        }
      }
    }

    .s_recruit {
      padding-top: 50px
      padding-bottom: 20px
      .line {
        width: 100%
        height: 1px
        background: #e0e6ed
      }
      .title {
        color: #1F2D3D
        font-size: 20px
        text-align: center
        .text {
          position: relative
          width: 100%
          height: 30px
          display: inline-block
          margin: 0 auto
          font-size: 30px
          .line {
            position: absolute
            bottom: -24px
            left: 50%
            display: block
            height: 2px
            width: 80px
            background: #5AA2E7
            margin-left: -40px
          }
        }
      }
      .list_content {
        margin-top: 101px
        .grid-content {

          width: 100%
          height: 158px
          margin-bottom: 30px
          border: 1px solid #5AA2E7
          display: flex
          cursor :pointer
          &:nth-child(3n) {
            margin-right: 10px
          }
          .content {
            line-height: 36px
            margin: auto
            text-align: center
            .des {
              font-size: 20px
              color: #1F2D3D
            }
            .text {
              font-size: 16px
              color: #475669
              display: inline-block
              vertical-align: super
            }
            .num {
              font-size: 40px
              color: #5AA2E7
              display: inline-block
              margin-top: 8px
              margin-left: 6px
            }
          }
        }

      }
    }

    .intro_c {
      padding-bottom: 60px;
      .title {
        color: #1F2D3D
        font-size: 20px
        text-align: center
        .text {
          position: relative
          width: 100%
          height: 30px
          display: inline-block
          margin: 0 auto
          font-size: 30px
          .line {
            position: absolute
            bottom: -24px
            left: 50%
            display: block
            height: 2px
            width: 80px
            background: #5AA2E7
            margin-left: -40px
          }
        }

      }
      .intro_c_con {
        padding: 20px
        margin-top: 60px
        margin-bottom: 0
        border: 1px solid #E0E6ED
        .intro {
        }
        .img {
          max-width: 100%
          height: 424px
          background: url(../common/image/intro.png) no-repeat center
          background-size: cover
        }
        .intro_text {
          font-size: 16px
          color: #475669
          p {
            line-height: 2
            img {
              max-width: 100%
              display: block
            }
          }
          p:nth-child(1) {
            text-indent: 30px
          }
          p:nth-child(2) {
            text-indent: 30px
          }
        }
      }

    }
  }

  @media all and (max-width: 767px) {
    .home {
      .main_ad {
        height 2.74rem
        .carousel-inner1 {
          .item {
            background: url(../common/image/banner.png) no-repeat
            width: 100%
            height 2.74rem
            background-position: center center
            background-size: cover
            position: relative
            img {
              width: 100%
              height: 100%
            }
            .item_text {
              position: absolute
              width: 100%
              height: 2rem
              top: 50%
              left: 50%
              margin-left: -50%
              color: #fff
              text-align: center
              margin-top: -1rem

              .title {
                font-size: 0.6rem
                margin-bottom: 0.44rem
                margin-top: 0.4rem
              }
              .des {
                font-size: 0.24rem
              }
            }
          }
        }
      }
      .s_company {
        width: 100%
        text-align: center
        background: #F7F7F7
        padding-top: 0.3rem
        .c_img {
          width: 1.8rem
          height: 1.8rem
          display: inline-block
          text-align: center
          /*background: url(../common/image/com_logo.png) no-repeat center*/
          background-size: cover
          position: relative
        }
        .text {
          margin-top: 0.22rem
          font-size: 0.28rem
          color: #1F2D3D
        }
        .text1, .text2 {
          color: #475669
          font-size: 0.22rem
          margin-top: 0.3rem
          margin-bottom: 0.26rem
          line-height: 0.7
        }
        .line {

          display: none
        }
        .icon_list {
          display: inline-block
          width: 100%
          height: 0.66rem
          line-height: 0.66rem
          margin: 0
          li {
            margin: 0
            padding-right: 3px
            box-sizing: border-box
          }
          span {
            display: inline-block
            font-size: 10px
            vertical-align: middle
          }
          .icon1 {
            background url(../common/image/Shape.png) no-repeat center
            display: inline-block
            width: 24px
            height: 24px
            vertical-align: middle
            background-size: 67%
          }
          .icon2 {
            background url(../common/image/Shape65.png) no-repeat center
            display: inline-block
            width: 24px
            height: 24px
            vertical-align: middle
            background-size: 67%
          }
          .icon3 {
            background url(../common/image/industry.png) no-repeat center
            display: inline-block
            width: 24px
            height: 24px
            vertical-align: middle
            background-size: 67%
          }
        }
      }
      .s_recruit {
        padding-top: 0.77rem
        padding-bottom: 0.06rem
        background: #fff
        .line {
          width: 100%
          height: 1px
          background: #e0e6ed
        }
        .title {
          color: #1F2D3D
          font-size: 0.30rem
          text-align: center
          .text {
            position: relative
            width: 100%
            height: 0.6rem
            line-height: 0.6rem
            display: inline-block
            margin: 0 auto
            font-size: 0.30rem
            .line {
              position: absolute
              bottom: -0.2rem
              width: 10%
              left: 50%
              display: block
              height: 0.04rem
              background: #5AA2E7
              margin-left: -5%
            }
          }
        }
        .list_content {
          margin-top: 0.72rem
          .grid-content {

            width: 100%
            height: 1.58rem
            margin-bottom: 0.3rem
            border: 1px solid #5AA2E7
            display: flex
            &:nth-child(3n) {
              margin-right: 0.2rem
            }
            .content {
              line-height: 0.72rem
              margin: auto
              text-align: center
              .des {
                font-size: 0.28rem
                color: #1F2D3D
              }
              .text {
                font-size: 0.22rem
                color: #475669
                display: inline-block
                vertical-align: top
              }
              .num {
                font-size: 0.5rem
                color: #5aa2e7
                display: inline-block
                margin-top: -0.03rem
                margin-left: -0.2rem
                float: none
                vertical-align: top
              }
            }
          }
        }
      }

      .intro_c {
        padding: 0 0.3rem 0.18rem
        .title {
          color: #1F2D3D
          font-size: 0.3rem
          text-align: center
          padding: 0.3rem
          .text {
            position: relative
            width: 100%
            height: 0.6rem
            line-height: 0.6rem
            display: inline-block
            margin: 0 auto
            font-size: 0.3rem
            .line {
              position: absolute
              bottom: -0.2rem
              width: 10%
              left: 50%
              display: block
              height: 0.04rem
              background: #5AA2E7
              margin-left: -5%
            }
          }

        }
        .intro_c_con {
          width: 100%;
          padding: 0.14rem 0.14rem 0.37rem 0.1rem
          margin-top: 0.45rem
          border: 1px solid #E0E6ED
          .intro {
          }
          .img {
            width: 100%
            height: 212px
            background: url(../common/image/intro.png) no-repeat center
            background-size: cover
          }
          .intro_text {
            font-size: 14px
            color: #475669
            p {
              img {
                width: 100% !important
              }
            }
            p {
              line-height: 2
              text-indent: 30px
            }
            p:nth-child(1) {
              margin-top: 0.16rem
            }

          }
        }

      }

    }
  }

  @media (min-width: 768px) and (max-width: 992px) {
    .home {
      background: #fff

      .main_ad {
        .carousel-inner1 {
          .item {
            background: url(../common/image/banner.png) no-repeat
            width: 100%
            height 300px
            background-position: center center
            background-size: cover
            position: relative

            img {
              width: 100%
              height: 100%
            }
            .item_text {
              position: absolute
              width: 540px
              height: 134px
              top: 50%
              left: 50%
              margin-left: -270px
              margin-top: -67px
              color: #fff
              text-align: center
              letter-spacing: 8px;
              .title {
                font-size: 30px
                margin-bottom: 44px
              }
              .des {
                font-size: 24px
              }
            }
          }
        }
      }

      .s_company {
        width: 100%
        height: 465px
        text-align: center
        background: #F7F7F7
        padding-top: 31px
        .c_img {
          width: 180px
          height: 180px
          display: inline-block
          text-align: center
          /*background: url(../common/image/com_logo.png) no-repeat center*/
          position: relative
        }
        .text {
          margin-top: 22px
          font-size: 18px
          color: #1F2D3D
        }
        .text1, .text2 {
          color: #475669
          font-size: 14px
          margin-top: 30px
          margin-bottom: 36px
        }
        .line {
          width: 100%
          height: 1px
          background: #E0E6ED
        }
        .icon_list {
          display: inline-block
          height: 66px
          line-height 66px
          li {
            display: inline-block
            margin: 0 20px
            font-size: 14px
            vertical-align: top
          }
          .icon1 {
            background url(../common/image/icon1.png) no-repeat center
            display: inline-block
            width: 15px
            height: 15px
            margin-right: 27px
            vertical-align: middle
          }
          .icon2 {
            background url(../common/image/icon2.png) no-repeat center
            display: inline-block
            width: 15px
            height: 15px
            margin-right: 27px
            vertical-align: middle
          }
          .icon3 {
            background url(../common/image/icon3.png) no-repeat center
            display: inline-block
            width: 15px
            height: 15px
            margin-right: 27px
            vertical-align: middle
          }
        }
      }

      .s_recruit {
        padding-top: 60px
        padding-bottom: 20px
        background: #fff
        .line {
          width: 100%
          height: 1px
          background: #e0e6ed
        }
        .title {
          color: #1F2D3D
          font-size: 0.20rem
          text-align: center
          .text {
            position: relative
            width: 100%
            height: 0.6rem
            line-height: 0.6rem
            display: inline-block
            margin: 0 auto
            font-size: 0.20rem
            .line {
              position: absolute
              bottom: -0.2rem
              width: 10%
              left: 50%
              display: block
              height: 2px
              background: #5AA2E7
              margin-left: -5%
            }
          }
        }
        .list_content {
          margin-top: 0.72rem
          .grid-content {

            width: 100%
            height: 1rem
            margin-bottom: 0.3rem
            border: 1px solid #5AA2E7
            display: flex
            &:nth-child(3n) {
              margin-right: 0.2rem
            }
            .content {
              line-height: 0.36rem
              margin: auto
              text-align: center
              .des {
                font-size: 0.18rem
                color: #1F2D3D
              }
              .text {
                font-size: 0.14rem
                color: #475669
                display: inline-block
                vertical-align: middle
              }
              .num {
                font-size: 0.25rem
                color: #5aa2e7
                display: inline-block
                margin-top: -0.03rem
                margin-left: -0.1rem
                vertical-align: middle
              }
            }
          }
        }
      }

      .intro_c {
        padding: 0 0.3rem 0.58rem;
        .title {
          color: #1F2D3D
          font-size: 20px
          text-align: center
          .text {
            position: relative
            width: 123px
            height: 30px
            display: inline-block
            margin: 0 auto
            font-size: 20px
            .line {
              position: absolute
              bottom: -24px
              left: 50%
              display: block
              height: 2px
              width: 80px
              background: #5AA2E7
              margin-left: -40px
            }
          }

        }
        .intro_c_con {
          width: 100%
          padding: 20px
          margin-top: 60px
          margin-bottom: 0
          border: 1px solid #E0E6ED
          .intro {
          }
          .img {
            width: 100%
            height: 424px
            background: url(../common/image/intro.png) no-repeat center
            background-size: cover
          }
          .intro_text {
            font-size: 14px
            color: #475669
            p {
              line-height: 2
            }
            p:nth-child(1) {
              text-indent: 30px
              margin-top: 29px
            }
            p:nth-child(2) {
              text-indent: 30px
            }
          }
        }

      }
    }
  }


</style>
