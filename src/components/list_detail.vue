<template>
  <div id="list_detail">

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

        </div>
      </nav>
    </header>

    <div class="container">
      <div class="detail_des">
        <div class="tips hidden-xs">
          <ul class="tips_nav">
            <li class="nav_item">招聘首页</li>
            <span class="icon">></span>
            <li class="nav_item">职位列表</li>
            <span class="icon1">></span>
            <li class="nav_item">职位详情</li>
          </ul>
        </div>
      </div>

      <div class="detail_show">
       <div class="content">
         <div class="title">商业数据分析部署工程师[电商方向]</div>
         <div class="text">
           <span class="des">杭州/全职</span><span class="price">8K-10K</span>
         </div>
         <div class="p_time">发布时间：2017.09.21</div>
       </div>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        detail: [
          {name: '城市运营经理', address: '杭州/全职', salary: '8K-10K', time: '2017.09.21', id: 1,des:'职位描述'},
          {name: '产品经理', address: '杭州/全职', salary: '8K-10K', time: '2017.09.21', id: 2,des:'职位描述'},
          {name: 'web前端', address: '杭州/全职', salary: '8K-10K', time: '2017.09.21', id: 3,des:'职位描述'}
        ],
        id: this.$route.params.id,
      }
    },
    created(){
      console.log(this)
    }

  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  #list_detail

    header
      height 80px;
      line-height 80px;
      .navbar-sample
        background-color: #fff;
        border-color: #f5f5f5;
        margin-bottom: 0;
        top: 0;
        width: 100%;
        z-index: 1000;
        .navbar-header
          height 84px

        .navbar-brand
          height: 80px;
    .container
      .detail_des
        background :#fff
        position :relative
        height :52px
        line-height :52px
        border-bottom :1px solid #E5E9F2
        margin-top :20px

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
            .icon1{
              display: inline-block
              float: left
              width: 6px
              height: 12px
              margin: 0 10px
              color: #99A9BF
            }
            .nav_item
              float: left
              font-size: 14px
              width: 56px
              height: 16px
              text-align: center
              color: #99A9BF
              &:nth-child(1), &:nth-child(3)
                color: #5AA2E7


      .detail_show {
        height: 114px
        background :#fff
        padding: 21px 0 18px 24px
        margin-bottom: 20px
        border-bottom: 1px solid #E5E9F2
        .title {
          font-size: 18px
          color: #1F2D3D
          margin-bottom: 14px
        }
        .text {
          height: 14px
          line-height: 14px
          .des {
            display: inline-block
            font-size: 14px
            color: #475669
            margin-right: 23px
          }
          .price {
            display: inline-block
            font-size: 16px
            color: #F96868
          }
        }
        .p_time {
          margin-top: 23px
          font-size: 14px
          color: #99A9BF
        }
      }

</style>
