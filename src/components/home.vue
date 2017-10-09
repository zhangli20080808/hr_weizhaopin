<template>
  <div class="home">
    <!--导航-->
    <header class="hidden-xs">
      <nav class="navbar navbar-sample" role="navigation">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">
              <img src="../common/image/logo.png" alt="">
            </a>
          </div>

          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <li class="active"><a href="#">首页</a></li>
              <li><a href="#1F" name="1F">招聘信息</a></li>
              <li><a href="#2f" name="2f">公司介绍</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right nav_search">
              <li>
                <div class="search">
                  <input type="text" placeholder="职位关键词" class="search_content">
                  <span class="submit"><i></i></span>
                </div>
              </li>
            </ul>

          </div>
        </div>
      </nav>
    </header>

    <!--轮播-->
    <div class="main_ad">
      <div class="carousel-inner1">
        <!--我们的data属性来保存我们要的数据,没有任何功能-->
        <div class="item ">
          <div class="item_text">
            <div class="title">寻找未来互联网精英
            </div>
            <div class="des">你的舞台,你的精彩</div>
          </div>
        </div>
      </div>
    </div>

    <a name="1F"></a>
    <!--公司简介-->
    <div class="s_company">
      <div class="c_img"></div>
      <div class="text">杭州针尖科技有限公司</div>
      <p class="text1">客户第一、拥抱变化、团队合作、激情、诚信、敬业成长、共赢业成长</p>
      <p class="text2">地址：杭州市西湖区文一路公元里7幢6楼</p>
      <div class="line"></div>


      <ul class="icon_list clearfix">
        <li>
          <div class="grid-content bg-purple">
            <i class="icon1"></i><span>500-5000人</span>
          </div>
        </li>
        <li>
          <div class="grid-content bg-purple-light">
            <i class="icon2"></i><span>天使轮</span>
          </div>
        </li>
        <li>
          <div class="grid-content bg-purple">
            <i class="icon3"></i><span>电子技术/半导体/集成电路</span>
          </div>
        </li>
      </ul>


    </div>

    <!--招聘职位-->
    <div class="s_recruit">
      <div class="container">
        <div class="title">
          <div class="text">招聘职位
            <span class="line"></span>
          </div>
        </div>
        <el-row :gutter="20" class="list_content">
          <el-col :span="8" :xs="12" :sm="8" :md="8" :lg="8" v-for="item in product" :key="item.id">
            <div class="grid-content bg-purple" @click="join">
              <div class="content">
                <p class="des">{{item.des}}</p>
                <span class="text">{{item.text}}</span>
                <span class="num">{{item.num}}</span>
              </div>
            </div>
          </el-col>
        </el-row>


      </div>
    </div>

    <!--公司介绍-->
    <a name="2F"></a>
    <div class="intro_c">
      <div class="title">
        <div class="text">公司介绍
          <span class="line"></span>
        </div>
      </div>

      <div class="intro_c_con container">
        <div class="img"></div>
        <div class="intro_text">
          <p>杭州爱聚科技有限公司（目前A轮，千万美金）成立于2012年4月，由前淘宝资深小二马国良、姜涛及UT斯达康戚华平联合创立，团队核心成员均来自阿里巴巴、UT、 人人网、金蝶等知名企业。
          </p> 　　
          <p>公司对外产品品牌——电商宝，专注电商财务数据管理软件产品的研发，多项产品已荣获国家软件著作权证书。
          </p>
          <p>目前已经覆盖淘宝、天猫、京东、贝贝网、蘑菇街、唯品会、卷皮等二十多个主流电商平台，国内首家支持全渠道多店铺财务数据管理SaaS模式，拥有商家用户超过40多万，日处理千万订单量，亿级订单金额。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        product: [
          {id:1,des: '产品类',text:'在招职位',num:'32'},
          {id:2,des: '产品类1',text:'在招职位',num:'32'},
          {id:3,des: '产品类2',text:'在招职位',num:'32'},
          {id:4,des: '产品类3',text:'在招职位',num:'32'},
        ]
      }
    },
    methods: {
      join() {
        this.$router.push({
          path: `/list`
        })
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  .home {
    background :#fff
    header {
      height 80px
      line-height 80px
      .navbar-sample {
        background-color: #fff
        border-color: #f5f5f5
        margin-bottom: 0
        top: 0
        width: 100%
        z-index: 1000
        .navbar-header {
          height 84px
        }
        .navbar-brand {
          height: 80px
        }
        .navbar-nav {
          margin-left: 74px
          li {
            margin-right: 10px
            a {
              color: #1F2D3D
              line-height: 50px
              font-size: 16px
              &:hover {
                background #fff
                border-bottom: 1px solid #5AA2E7
              }
            }
          }
        }
        .nav_search {
          .search {
            .search_content {
              width 230px
              height 40px
              border: 1px solid #C0CCDA
              position: relative
              outline: none
              color: #99A9BF
              font-size: 12px
              padding: 14px 0 13px 16px
            }
            .submit {
              position: absolute
              display inline-block
              right: 0
              top: 21px
              width 40px
              height 40px
              background: url(../common/image/search.png) no-repeat center
            }
          }
        }
      }
    }

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
              font-size 60px
              font-family: "SourceHanSansCN-Light"
              margin-bottom 44px
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
      text-align: center
      background: #F7F7F7
      padding-top: 31px
      .c_img {
        width: 180px
        height: 180px
        display: inline-block
        text-align: center
        background: url(../common/image/com_logo.png) no-repeat center
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
        padding:0 0.1rem
        li{
          display :inline-block
          margin:0 80px
        }
        .icon1 {
          background url(../common/image/icon1.png) no-repeat center
          display: inline-block
          width: 15px
          height: 15px
          margin-right: 27px
          @media screen and (max-width: 768px) {
            margin-right: 5px
          }
        }
        .icon2 {
          background url(../common/image/icon2.png) no-repeat center
          display: inline-block
          width: 15px
          height: 15px
          margin-right: 27px
          @media screen and (max-width: 768px) {
            margin-right: 5px
          }
        }
        .icon3 {
          background url(../common/image/icon3.png) no-repeat center
          display: inline-block
          width: 15px
          height: 15px
          margin-right: 27px
          @media screen and (max-width: 768px) {
            margin-right: 5px
          }
        }
      }
    }

    .s_recruit {
      padding-top: 112px
      padding-bottom: 90px
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
          width: 123px
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
          &:nth-child(3n) {
            margin-right: 10px
          }
          .content {
            line-height: 36px
            margin: auto
            text-align: center
            .des {
              font-size: 18px
              color: #1F2D3D
            }
            .text {
              font-size: 14px
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
        margin-bottom: 48px
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

  @media all and (max-width: 768px) {
    .home {
      padding-top :0.9rem
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
                font-family: "SourceHanSansCN-Light"
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
          background: url(../common/image/com_logo.png) no-repeat center
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
          line-height: 1.5
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
            display: inline-block;
            margin: 0
            padding-right: 3px
            box-sizing: border-box
          }
          span {
            display: inline-block
            font-size: 10px
            vertical-align: top
          }
          .icon1 {
            background url(../common/image/icon1.png) no-repeat center
            display: inline-block
            width: 15px
            height: 15px
            margin-right: 0.05rem
            margin-bottom: 0.2rem
            vertical-align: middle
          }
          .icon2 {
            background url(../common/image/icon2.png) no-repeat center
            display: inline-block
            width: 15px
            height: 15px
            margin-right: 0.05rem
            margin-bottom: 0.2rem
            vertical-align: middle
          }
          .icon3 {
            background url(../common/image/icon3.png) no-repeat center
            display: inline-block
            width: 15px
            height: 15px
            margin-right: 0.05rem
            margin-bottom: 0.2rem
            vertical-align: middle
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
                vertical-align: super
              }
              .num {
                font-size: 0.5rem
                color: #5aa2e7
                display: inline-block
                margin-top: -0.03rem
                margin-left: 0.1rem
                float: right
              }
            }
          }
        }
      }

      .intro_c {
        padding: 0 0.3rem
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
          padding: 0.14rem 0.14rem 0.37rem 0.1rem
          margin-top: 0.45rem
          margin-bottom: 0.48rem
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
              line-height: 2
              text-indent: 30px
            }
            p:nth-child(1) {
              margin-top: 29px
            }

          }
        }

      }

    }
  }
</style>
