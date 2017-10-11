<template>
  <div id="list_detail">

    <!--导航-->
    <header class="hidden-xs hidden-sm">
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

        </div>
      </nav>
    </header>

    <div class="container">
      <div class="detail_des hidden-xs hidden-sm">
        <div class="tips ">
          <ul class="tips_nav">
            <li class="nav_item" @click="backIndex">招聘首页</li>
            <span class="icon">></span>
            <li class="nav_item" @click="backSec">职位列表</li>
            <span class="icon1">></span>
            <li class="nav_item">职位详情</li>
          </ul>
        </div>
      </div>

      <div class="detail_show">
        <div class="content">
          <div class="title">{{apple.name}}</div>
          <div class="text">
            <span class="des">{{apple.address}}</span><span class="price">{{apple.salary}}</span>
          </div>
          <div class="p_time">发布时间：{{apple.time}}</div>

          <div class="post_share">
            <el-button type="primary" @click="join">申请职位</el-button>
            <el-button>分享职位</el-button>
          </div>
        </div>
      </div>

      <div class="detail_text">
        <div class="detail_content">
          职位描述：
          1、负责内容管理、营销管理平台的规划、设计，围绕业务目标定义核心需求，推动产品需求落地；
          2、理解和挖掘内容服务的结构化信息处理需求，对分类体系和标签体系进行规划和设计；
          3、参与针对患者或大众的医学产品设计，并与 UI 设计师、开发工程师紧密合作，保证产品的上线和迭代效率；
          4、与产品运营合作，推动运营流程标准化，提供运营效率，达成业务增长目标；
          5、定义、分析和跟踪产品指标，会使用数据指导产品迭代。

          任职条件：
          1、能熟练使用 Axure RP、Sketch、MindManager 等工具设计产品原型，撰写产品需求文档；
          2、自我驱动，责任心强，以结果为导向，具有优秀的「执行力」；
          3、良好的洞察力和严密的逻辑思维能力；
          4、本科以上学历。

          优先条件：
          1、有 CMS系统相关产品设计经验，有营销管理产品平台设计经验；
          2、面向大众 App 产品经验优先；
          3、热爱互联网产品，有微信公众号/微博或其他自媒体/社区运营经验；


          任职条件：
          1、能熟练使用 Axure RP、Sketch、MindManager 等工具设计产品原型，撰写产品需求文档；
          2、自我驱动，责任心强，以结果为导向，具有优秀的「执行力」；
          3、良好的洞察力和严密的逻辑思维能力；
          4、本科以上学历。

          优先条件：
          1、有 CMS系统相关产品设计经验，有营销管理产品平台设计经验；
          2、面向大众 App 产品经验优先；
          3、热爱互联网产品，有微信公众号/微博或其他自媒体/社区运营经验；
        </div>
      </div>

    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        id: this.$route.params.id,
        name: this.$route.params.name,
        salary: this.$route.params.salary,
        address: this.$route.params.address,
        time: this.$route.params.time,
        apple: {}
      }
    },
    created() {
      this._getDetail()
      this.apple = {
        id: this.id,
        name: this.name,
        salary: this.salary,
        address: this.address,
        time: this.time
      }
    },

    methods: {
      //处理边界情况的一些常用手段 如果用户在这个地方不小新刷新了
      _getDetail() {
        if (!this.name) {
          this.$router.push({
              path: `/list/${this.id}`
            }
          )
          return
        }
      },
      join() {
        this.$router.push({
          path: `/apply/${this.id}`,
          name: 'apply',
          params: {
            id: this.id,
            name: this.name,
            address: this.address,
            salary: this.salary,
            time: this.time
          }
        })
      },
      backIndex() {
       this.$router.push({
         path: `/`
       })
      },
      backSec(){
        this.$router.push({
          path: `/list`
        })
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/mixin.styl"
  #list_detail

    header
      height 80px
      line-height 80px
      .navbar-sample
        background-color: #fff
        border-color: #f5f5f5
        margin-bottom: 0
        top: 0
        width: 100%
        z-index: 1000
        .navbar-header
          height 84px

        .navbar-brand
          height: 80px
    .container
      .detail_des
        background: #fff
        position: relative
        height: 52px
        line-height: 52px
        border-bottom: 1px solid #E5E9F2
        margin-top: 20px

        .tips
          position: absolute
          left: 23px
          top: 19px
          height: 16px
          line-height: 16px
          .tips_nav
            .icon
              display: inline-block
              float: left
              width: 6px
              height: 12px
              margin: 0 10px
              color: #5AA2E7
              font-size: 16px
            .icon1
              display: inline-block
              float: left
              width: 6px
              height: 12px
              margin: 0 10px
              font-size: 16px
              color: #99A9BF
            .nav_item
              float: left
              font-size: 14px
              width: 56px
              height: 16px
              text-align: center
              color: #99A9BF
              &:nth-child(1), &:nth-child(3)
                color: #5AA2E7
      .detail_show
        height: 114px
        background: #fff
        padding: 21px 0 18px 24px
        margin-bottom: 20px
        border-bottom: 1px solid #E5E9F2
        .content
          position: relative
          .post_share
            position: absolute
            width: 222px
            height: 40px
            line-height: 40px
            right: 166px
            top: 0
          .title
            font-size: 18px
            color: #1F2D3D
            margin-bottom: 14px
          .text
            height: 14px
            line-height: 14px
            .des
              display: inline-block
              font-size: 14px
              color: #475669
              margin-right: 23px
            .price
              display: inline-block
              font-size: 16px
              color: #F96868
          .p_time
            margin-top: 23px
            font-size: 14px
            color: #99A9BF
      .detail_text
        background: #fff
        height: 100%
        padding: 19px 0 29px 23px

  @media all and (max-width: 767px)
    #list_detail
      background: #fff
      position: absolute
      bottom: 0
      top: 0
      right: 0
      left: 0
      padding-top: 0.9rem
      .container
        padding: 0
        margin: 0
        .detail_des
          background: #fff
          position: relative
          height: 52px
          line-height: 52px
          border-b-1px(#E5E9F2)
          margin-top: 20px

          .tips
            position: absolute
            left: 23px
            top: 19px
            height: 16px
            line-height: 16px
            .tips_nav
              .icon
                display: inline-block
                float: left
                width: 6px
                height: 12px
                margin: 0 10px
                color: #5AA2E7
              .icon1
                display: inline-block
                float: left
                width: 6px
                height: 12px
                margin: 0 10px
                color: #99A9BF
              .nav_item
                float: left
                font-size: 14px
                width: 56px
                height: 16px
                text-align: center
                color: #99A9BF
                &:nth-child(1), &:nth-child(3)
                  color: #5AA2E7
        .detail_show
          height: 3.16rem
          background: #f7f7f7
          padding: 0.37rem 0 0.3rem 0.30rem
          border-bottom: 1px solid #E5E9F2
          margin-bottom: 0

          .content
            position: relative
            .post_share
              position: relative
              width: 222px
              height: 0.8rem
              line-height: 0.8rem
              left: 0
              margin-top: -0.1rem
              .el-button
                display: inline-block
                vertical-align: top
            .title
              font-size: 0.28rem
              color: #1F2D3D
              margin-bottom: 0
            .text
              height: 0.25rem
              line-height: 0.25rem
              margin-top: 0.25rem
              .des
                display: inline-block
                font-size: 0.24rem
                color: #475669
                margin-right: 0.36rem
                vertical-align: middle
              .price
                display: inline-block
                font-size: 0.26rem
                vertical-align: middle
                color: #F96868
            .p_time
              height: 0.23rem
              line-height: 0.23rem
              font-size: 0.24rem
              color: #99A9BF
              margin-bottom: 0.38rem
              margin-top: 0.5rem
        .detail_text
          background: #fff
          height: 100%
          font-size: 14px
          padding: 0.39rem 0.32rem 1.05rem 0.27rem

  @media (min-width: 768px) and (max-width: 920px)
    #list_detail
      padding-top :84px

      header
        height 80px
        line-height 80px
        .navbar-sample
          background-color: #fff
          border-color: #f5f5f5
          margin-bottom: 0
          top: 0
          width: 100%
          z-index: 1000
          .navbar-header
            height 84px

          .navbar-brand
            height: 80px
      .container
        .detail_des
          background: #fff
          position: relative
          height: 52px
          line-height: 52px
          border-bottom: 1px solid #E5E9F2
          margin-top: 20px

          .tips
            position: absolute
            left: 23px
            top: 19px
            height: 16px
            line-height: 16px
            .tips_nav
              .icon
                display: inline-block
                float: left
                width: 6px
                height: 12px
                margin: 0 10px
                color: #5AA2E7
                font-size: 16px
              .icon1
                display: inline-block
                float: left
                width: 6px
                height: 12px
                margin: 0 10px
                font-size: 16px
                color: #99A9BF
              .nav_item
                float: left
                font-size: 14px
                width: 56px
                height: 16px
                text-align: center
                color: #99A9BF
                &:nth-child(1), &:nth-child(3)
                  color: #5AA2E7
        .detail_show
          height: 114px
          background: #fff
          padding: 21px 0 18px 24px
          margin-bottom: 20px
          border-bottom: 1px solid #E5E9F2
          .content
            position: relative
            .post_share
              position: absolute
              width: 222px
              height: 40px
              line-height: 40px
              right: 166px
              top: 0
            .title
              font-size: 18px
              color: #1F2D3D
              margin-bottom: 14px
            .text
              height: 14px
              line-height: 14px
              .des
                display: inline-block
                font-size: 14px
                color: #475669
                margin-right: 23px
                vertical-align :middle
              .price
                display: inline-block
                font-size: 16px
                color: #F96868
                vertical-align :middle
            .p_time
              margin-top: 23px
              font-size: 14px
              color: #99A9BF
        .detail_text
          background: #fff
          height: 100%
          padding: 19px 0 29px 23px

</style>
