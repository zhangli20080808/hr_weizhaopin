<template>
  <div id="s_list">
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
    <!--搜索-->
    <div class="container">
      <div class="search">
        <div class="tips hidden-xs hidden-sm">
          <ul class="tips_nav">
            <li class="nav_item" @click="backIndex">招聘首页</li>
            <span class="icon">></span>
            <li class="nav_item">职位列表</li>
          </ul>
        </div>
        <div class="search_go">
          <input type="search" placeholder="职位关键词" class="search_content">
          <span class="submit">搜索</span>
        </div>
      </div>
      <!--职位列表-->
      <!--choose-->
      <div class="list-form">
        <el-form ref="form" :model="form" label-width="80px">

          <el-form-item class="form_address">
            <el-select v-model="form.address"  @change="change" placeholder="请选择地点">
              <el-option v-for="item in selectChose" :label="item.name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="form_kind">
            <el-select v-model="form.kind" placeholder="请选择职位分类">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>

        </el-form>
      </div>
      <Scroll class="list" :data="list" v-loading="!list" element-loading-text="拼命加载中">
        <!--list-->
        <div class="list_content" >
          <el-row :gutter="20">
            <el-col :span="8" :xs="24" :sm="12" :md="8" :lg="8" v-for="item in list" :key="item.id"
            >
              <div class="grid-content bg-purple" @click="selectItem(item)">
                <div class="title">{{item.name}}</div>
                <div class="text">
                  <span class="des">{{item.address}}</span><span class="price">{{item.salary}}</span>
                </div>
                <div class="p_time">发布时间：{{item.time}}</div>
              </div>
            </el-col>
          </el-row>

        </div>

      </Scroll>

    </div>
  </div>

</template>


<script>
  import Scroll from './base/scroll.vue'
  import allData from '../common/js/allcity'
  export default {
    data() {
      return {
        form: {
          address: '',
          kind: ''
        },
        fileList: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }]
        ,
        list: [
          {name: '城市运营经理', address: '杭州/全职', salary: '8K-10K', time: '2017.09.21', id: 1},
          {name: '产品经理', address: '杭州/全职', salary: '8K-10K', time: '2017.09.21', id: 2},
          {name: 'web前端', address: '杭州/全职', salary: '8K-10K', time: '2017.09.21', id: 3},
          {name: '城市运营经理', address: '杭州/全职', salary: '8K-10K', time: '2017.09.21', id: 4},
          {name: '城市运营经理', address: '杭州/全职', salary: '8K-10K', time: '2017.09.21', id: 5},
          {name: '城市运营经理', address: '杭州/全职', salary: '8K-10K', time: '2017.09.21', id: 6},
          {name: '城市运营经理', address: '杭州/全职', salary: '8K-10K', time: '2017.09.21', id: 6},
          {name: '城市运营经理', address: '杭州/全职', salary: '8K-10K', time: '2017.09.21', id: 6},
          {name: '城市运营经理', address: '杭州/全职', salary: '8K-10K', time: '2017.09.21', id: 6},
          {name: '城市运营经理', address: '杭州/全职', salary: '8K-10K', time: '2017.09.21', id: 6},
          {name: '城市运营经理', address: '杭州/全职', salary: '8K-10K', time: '2017.09.21', id: 6},
          {name: '城市运营经理', address: '杭州/全职', salary: '8K-10K', time: '2017.09.21', id: 6},
          {name: '城市运营经理', address: '杭州/全职', salary: '8K-10K', time: '2017.09.21', id: 6},
          {name: '城市运营经理', address: '杭州/全职', salary: '8K-10K', time: '2017.09.21', id: 6}
        ],
        selectChose:allData.province
      }
    },
    methods: {
      selectItem(item) {
        this.$router.push({
          path: `/list/${item.id}`,
          name: 'listDetail',
          params: {
            id: item.id,
            name: item.name,
            address: item.address,
            salary: item.salary,
            time: item.time
          }
        })
      },
      change(item){
      },
      backIndex() {
        this.$router.push({
          path: `/`
        })
      },
    },
    components: {
      Scroll
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/mixin.styl"

  #s_list {
    background: #F7F7F7
    height: 100%
    overflow: hidden
    header {
      height 80px;
      line-height 80px;
      .navbar-sample {
        background-color: #fff;
        border-color: #f5f5f5;
        margin-bottom: 0;
        top: 0;
        width: 100%;
        z-index: 1000;
        .navbar-header {
          height 84px
        }
        .navbar-brand {
          height: 80px;
        }
      }
    }

    .container {
      .search {
        width: 100%;
        height: 109px;
        position: relative;
        .tips {
          position: absolute
          left: 0
          top: 23px
          height: 16px
          line-height: 16px
          .tips_nav {
            .icon {
              display: inline-block
              float: left
              width: 6px
              height: 12px
              font-size: 16px;
              margin: 0 10px
              color: #99A9BF
            }
            .nav_item {
              float: left
              font-size: 16px
              height: 16px
              text-align: center
              color: #99A9BF
              &:first-child {
                color: #5AA2E7
              }
            }
          }
        }
        .search_go {
          width: 485px;
          height: 47px;
          background: yellow;
          position: absolute;
          left: 50%;
          top: 50%;
          margin-left: -25%;
          margin-top: -23px;
          .search_content {
            display :table
            width: 426px;
            height 47px;
            line-height: 47px
            border: 1px solid #5AA2E7;
            position: relative;
            outline: none;
            color: #99A9BF;
            font-size: 14px;
            padding: 18px 0 15px 14px
            &::placeholder{
              color :#99a9bf
            }
          }
          .submit {
            position: absolute;
            display inline-block
            width: 59px;
            height: 47px;
            right: 0;
            top: 0;
            line-height: 47px
            text-align: center

            font-size: 14px
            color: #ffff
            background: #5AA2E7
            &:hover {
              background: #66AEF3
            }
          }
        }
      }
      .list-form {
        height: 76px;
        line-height: 76px;
        background: #fff;
        color: #99a9bf;
        font-size: 14px;
        .form_address {
          display: inline-block
          margin-bottom: 0
          .el-form-item__content {
            margin-left: 29px !important

          }
        }
        .form_kind {
          display: inline-block
          .el-form-item__content {
            margin-left: 16px !important
          }
        }
      }
      .list {
        background: #fff
        width: 100%;
        .list_content {
          width: 100%
          padding: 0 20px
          .grid-content {
            height: 114px
            padding: 20px 0 20px 16px
            margin-bottom: 20px
            border :1px solid #E5E9F2
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

        }
        .page {
          height: 41px
          line-height: 41px
          margin-bottom: 15px
        }
      }
    }
  }

  @media all and (max-width: 767px) {
    #s_list {
      background: #fff
      height: 100%
      width: 100%
      position :fixed
      top :0
      bottom :0
      left :0
      right :0
      padding-bottom :0.1rem
      padding-top: 0.9rem
      .container {
        padding: 0
        margin: 0
        .search {
          width: 100%;
          position: relative;
          margin: 0 auto;
          height :1.82rem
          font-family :"HiraginoSansGB-W3"
          background :#f7f7f7;
          .search_go {
            width: 92%;
            height: 0.9rem;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-top: -0.45rem
            margin-left: -46%
            .search_content {
              width: 100%;
              display :table
              height: 0.9rem;
              border: 1px solid #5AA2E7;
              position: relative;
              outline: none;
              color: #99A9BF;
              font-size: 14px;
              padding: 0.16rem 0 0.17rem 0.29rem;
              &::placeholder{
                color :#99a9bf
              }
            }
            .submit {
              position: absolute
              display inline-block
              width: 1.10rem
              height: 0.9rem
              line-height :0.9rem
              right: 0
              top: 0
              text-align: center

              font-size: 0.28rem
              color: #ffff
              background: #5AA2E7
              &:hover {
                background: #66AEF3
              }
            }
          }
        }
        .list-form {
          .el-form{
            height: 1.5rem
            line-height: 1.5rem
            color: #99A9BF
            font-size: 0.28rem
            background :#fff
            padding-top :0.4rem
            border-b-1px(#E5E9F2)
          }
          .el-form-item__content {
            .el-select {
              .el-input {
                .el-input__inner {
                  line-height: 0.36rem
                  font-size: 0.24rem
                }
              }
            }
          }
          .form_address {
            display: inline-block
            width: 50%
            float: left
            .el-form-item__content {
              margin-left: 15px !important
              margin-bottom: 0
            }
          }

          .form_kind {
            display: inline-block
            width: 50%
            float: right
            .el-form-item__content {
              margin-right: 15px !important
            }
          }

        }

        .list {
          background: #fff
          width: 100%;
          position :fixed
          top: 4.24rem;
          right :0
          left :0
          bottom :0
          overflow :hidden
          .list_content {
            width: 100%
            padding: 0
            .grid-content {

              height: 2.28rem
              padding: 0.4rem 0 0.4rem 0.32rem
              margin-bottom: 0
              border :none
              border-left: none
              border-right: none
              border-b-1px(#E5E9F2)

              .title {
                font-size: 0.28rem;
                color: #5AA2E7;
                margin-bottom: 0.2rem;
              }
              .text {
                height: 0.28rem
                line-height: 0.28rem
                .des {
                  display: inline-block
                  font-size: 0.24rem
                  color: #475669
                  margin-right: 0.46rem
                  vertical-align :middle
                }
                .price {
                  display: inline-block
                  font-size :0.26rem
                  color: #F96868
                  vertical-align :middle
                }
              }
              .p_time {
                margin-top: 0.46rem
                font-size: 0.24rem
                color: #99A9BF
              }
            }

          }
          .page {
            height: 0.82rem
            line-height: 0.82rem
            margin-bottom: 0
          }
        }

      }
    }
  }

  @media (min-width: 768px) and (max-width: 920px){
    #s_list {
      background: #fff
      height: 100%
      width: 100%
      position :fixed
      top :0
      bottom :0
      left :0
      right :0
      padding-bottom :10px
      .container {
        width :100%
        padding: 0
        margin: 0
        .search {
          width: 100%;
          position: relative;
          margin: 0 auto;
          height :1.42rem
          font-family :"HiraginoSansGB-W3"
          background :#f7f7f7;
          .search_go {
            width: 92%;
            height: 60px
            position: absolute;
            left: 50%;
            top: 50%;
            margin-top: -30px
            margin-left: -46%
            .search_content {
              width: 100%;
              display :table
              height: 60px
              border: 1px solid #5AA2E7;
              position: relative;
              outline: none;
              color: #99A9BF;
              font-size: 14px;
              padding: 18px 0 15px 14px
              &::placeholder{
                color :#99a9bf
              }
            }
            .submit {
              position: absolute
              display inline-block
              width: 1.10rem
              height: 60px
              line-height :60px
              right: 0
              top: 0
              text-align: center

              font-size: 24px
              color: #ffff
              background: #5AA2E7
              &:hover {
                background: #66AEF3
              }
            }
          }
        }

        .list-form {
          height: 76px;
          line-height: 76px;
          background: #fff;
          color: #99a9bf;
          font-size: 14px;
          .form_address {
            display: inline-block
            margin-bottom: 0
            .el-form-item__content {
              margin-left: 29px !important

            }
          }
          .form_kind {
            display: inline-block
            .el-form-item__content {
              margin-left: 16px !important
            }
          }
        }
        .list {
          background: #fff
          width: 100%;
          position :fixed
          top: 300px
          right :0
          left :0
          bottom :0
          overflow :hidden
          .list_content {
            width: 100%
            padding: 0 20px
            .grid-content {
              height: 114px
              padding: 20px 0 20px 16px
              margin-bottom: 20px
              border :1px solid #E5E9F2
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
                  vertical-align :middle
                }
                .price {
                  display: inline-block
                  font-size: 16px
                  color: #F96868
                  vertical-align :middle
                }
              }
              .p_time {
                margin-top: 23px
                font-size: 14px
                color: #99A9BF
              }
            }

          }
          .page {
            height: 41px
            line-height: 41px
            margin-bottom: 15px
          }
        }
      }
    }
  }



</style>
