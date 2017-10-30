<template>
  <div id="s_list">
    <!--搜索-->
    <div class="container">
      <div class="search">
        <div class="detail_des hidden-xs hidden-sm">
          <el-breadcrumb separator="/" class="tips">
            <el-breadcrumb-item :to="{ path: '/' ,query:{ companyId: this.companyId}}" class="tips_1">招聘首页



            </el-breadcrumb-item>
            <el-breadcrumb-item>职位列表</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="search_go">
          <input placeholder="职位关键词" class="search_content" v-model="Search" @keyup.enter="goSearch">
          <span class="submit" @click="goSearch">搜索</span>
        </div>
      </div>
      <!--职位列表-->
      <!--choose-->

      <div class="list-form">
        <el-form ref="form" :model="form" label-width="80px">

          <el-form-item class="form_address">
            <el-cascader
              :options="workCityLists"
              v-model="form.address"
              @change="change"
              placeholder="请选择地点"
            ></el-cascader>
          </el-form-item>

          <el-form-item class="form_kind">
            <el-select v-model="form.kind" placeholder="请选择职位分类" @change="selectKind">
              <el-option :label="item.name" :value="item.id" v-for="item in selectK" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="all">
            <el-button type="primary" @click="findAll" class="hidden-xs">查询所有</el-button>
          </el-form-item>
        </el-form>
      </div>
      <Scroll class="list" :data="list" v-loading="!list" element-loading-text="拼命加载中">
        <!--list-->
        <div class="list_content" v-show="list.length">
          <el-row :gutter="20">
            <el-col :span="8" :xs="24" :sm="12" :md="8" :lg="8" v-for="item in list" :key="item.id"
            >
              <div class="grid-content bg-purple" @click="selectItem(item)">
                <div class="title">{{item.positionName}}</div>
                <div class="text">
                  <span
                    class="des">{{getCity(item.workCity)}}/{{item.positionType === 1 ? '全职' : item.positionType === 2 ? '兼职' : '实习'
                    }}</span><span class="price">{{item.positionSalaryLowest}}k-{{item.positionSalaryHighest}}k</span>
                </div>
                <div class="p_time">发布时间：{{filter(item.posiPublishTime)}}</div>
              </div>
            </el-col>
          </el-row>

          <div class="list_page hidden-xs">
            <el-pagination layout="prev, pager, next"
                           :total="config.totalCount"
                           :current-page="config.pageNum"
                           :page-size="config.pageSize"
                           @size-change="changePageSize"
                           @current-change="changePageNum"
            >
            </el-pagination>
          </div>
        </div>
      </Scroll>
    </div>
    <div class="footer hidden-xs">
      <footer>
        <div class="title"></div>
      </footer>
    </div>
  </div>

</template>


<script>
  import Scroll from './base/scroll.vue'
  import allcity from '../common/js/allcity'
  export default {
    data() {
      return {
        logoUrl: '',
        form: {
          address: [],
          kind: ''
        },
        item: [],
        config: {
          pageSize: 9,
          pageNum: 1,
          totalCount: 0
        },
        selectK: [
          {
            "id": 1,  //分类的id
            "isDefault": 1, //1:默认分类 2:用户创建的分类
            "name": "产品类" //分类名称
          },
          {
            "id": 2,
            "isDefault": 1,
            "name": "技术类"
          }],
        fileList: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }]
        ,
        list: [],
        positionType: [{
          name: '全职',
          value: 0
        }, {
          name: '兼职',
          value: 1
        }, {
          name: '实习',
          value: 2
        }],
        Search: '',
        workCityLists: [],
        companyId: 0,
        list_search: []
      }
    },
    methods: {
      selectItem(item) {
        this.$router.push({
          path: `/list/${item.id}`,
          name: 'listDetail',
          query: {
            companyId: this.companyId,
          },
          params: {
            id: item.id
          }
        })
      },
      change(item) {
        this.item = item
        this.selectOne()
      },
      selectOne() {
        var _this = this;
        var method = "promotionPage/positionList";
        var param = JSON.stringify({
          pageNum: _this.config.pageNum,
          pageSize: _this.config.pageSize,
          companyId: _this.companyId,
          categoryId: _this.form.kind,
          workCity: String(_this.item[1])
        });
        var successd = function (res) {
          if (res.data.code == 0) {
            _this.list = res.data.data.positionList
          }
        }
        _this.$http(method, param, successd);
      },
      filter(item){
        return item.substr(0, 10)
      },
      selectOne2() {
        var _this = this;
        var method = "promotionPage/positionList";
        var param = JSON.stringify({
          pageNum: _this.config.pageNum,
          pageSize: _this.config.pageSize,
          companyId: _this.companyId,
          categoryId: _this.form.kind,
          workCity: ''
        });
        console.log(param)
        var successd = function (res) {
          if (res.data.code == 0) {
            _this.list = res.data.data.positionList
          }
        }
        _this.$http(method, param, successd);
      },
      backIndex() {
        this.$router.push({
          path: `/`,
          query: {
            companyId: this.companyId,
          }
        })
      },
      selectKind() {
        this.selectSearch()
      },
      //处理省市
      transitionCityLists() {
        let provinces = allcity.province,
          citys = allcity.city;
        for (let j = 0; j < provinces.length; j++) {
          let item = provinces[j]
          item.value = item.name
          item.label = item.name
          item.children = citys[item.id]
        }
        for (let k in citys) {
          let city = citys[k]
          for (let i = 0; i < city.length; i++) {
            let item = city[i]
            item.value = item.name
            item.label = item.name
          }
        }
        this.workCityLists = provinces;
      },
      findAll(){
        this.positionList()
      },
      getCity(item){
        return item.split(',')[1]
      },
      //职位列表页
      positionList() {
        var _this = this;
        var method = "promotionPage/positionList";
        var param = JSON.stringify({
          pageNum: _this.config.pageNum,
          pageSize: _this.config.pageSize,
          companyId: _this.companyId,
          categoryId: '',
          workCity: ''
        });
        var successd = function (res) {
          if (res.data.code == 0) {
            console.log(res.data)
            _this.list = res.data.data.positionList
            _this.config.totalCount = res.data.data.count
            _this.config.pageNum = res.data.data.param.pageNum
            _this.config.pageSize = res.data.data.param.pageSize
          }
        }
        _this.$http(method, param, successd);
      },
      //职位分类
      getPositionCategoryList() {
        var _this = this;
        var method = "recruitPosition/getPositionCategoryList";
        var param = JSON.stringify({
          companyId: this.companyId,
          type: 2
        });


        var successd = function (res) {
          if (res.data.code == 0) {
            _this.selectK = res.data.data
          }
        }
        _this.$http(method, param, successd);
      },
      //职位分类下拉搜索
      selectSearch() {
        if (this.form.address == '') {
          this.selectOne2()
        } else {
          this.selectOne()
        }

      },
      //职位搜索
      goSearch() {
        this.form.address = [];
        this.form.kind = '';
        var _this = this;
        var method = "miniRecruit/searchRecruitPosition";
        var param = JSON.stringify({
          companyId: _this.companyId,
          key: _this.Search,
          pageNum: _this.config.pageNum,
          pageSize: _this.config.pageSize,
        });
        var successd = function (res) {
          if (res.data.code == 0) {
            console.log(res.data.data)
            _this.list = res.data.data.recruitPositionList
            _this.config.totalCount = res.data.data.page.totalCount
            _this.config.pageNum = res.data.data.page.pageNum
            _this.config.pageSize = res.data.data.page.pageSize
          }
        }
        _this.$http(method, param, successd);
      },
      changePageSize(pageSize) {
        this.config.pageSize = pageSize;
        this.config.pageNum = 1;
        this.positionList()
      },
      changePageNum(pageNum) {
        this.config.pageNum = pageNum;
        this.positionList()
      }
    },

    mounted() {

      if (this.$route.query.companyId) {
        this.companyId = this.$route.query.companyId
      }
      this.transitionCityLists()
      this.getPositionCategoryList()
      if (this.$route.params.searchList) {
        this.list = this.$route.params.searchList
        this.config.pageNum = this.$route.params.searchPage.pageNum
        this.config.pageSize = this.$route.params.searchPage.pageSize
        this.config.totalCount = this.$route.params.searchPage.totalCount
        return
      }
      if (this.$route.params.list) {
        this.list = this.$route.params.list
        this.config.pageNum = this.$route.params.config.pageNum
        this.config.pageSize = this.$route.params.config.pageSize
        this.config.totalCount = this.$route.params.config.totalCount
      } else {
        this.positionList()
      }

    },
    watch: {
      list(newList, oldList){
      }
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
          .tips_1 {
            .el-breadcrumb__item__inner, .el-breadcrumb__item__inner a, .el-breadcrumb__separator {
              color: #5AA2E7
            }
          }
        }
        .search_go {
          width: 485px;
          height: 47px;
          position: absolute;
          left: 50%;
          top: 50%;
          margin-left: -25%;
          margin-top: -23px;
          color: #333;
          .search_content {
            display: table
            width: 426px;
            height: 47px;
            line-height: 47px
            border: 1px solid #5AA2E7;
            position: relative;
            outline: none;
            color: #333;
            font-size: 14px;
            padding: 18px 0 15px 14px
            &::placeholder {
              color: #99a9bf
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
        .all {
          display: inline-block
          margin-left: -53px
        }
      }
      .list {
        background: #fff
        width: 100%;
        padding-bottom: 60px;
        .list_content {
          width: 100%
          padding: 0 20px
          .list_page {
            text-align: center
          }
          .grid-content {
            height: 126px
            padding: 20px 0 20px 16px
            margin-bottom: 20px
            border: 1px solid #E5E9F2
            cursor: pointer;
            .title {
              font-size: 20px
              color: #1F2D3D
              margin-bottom: 16px
              &:hover {
                color: #5aa2e7
              }
            }
            .text {
              height: 14px
              line-height: 14px
              .des {
                display: inline-block
                font-size: 16px
                color: #475669
                margin-right: 23px
              }
              .price {
                display: inline-block
                font-size: 18px
                color: #F96868
              }
            }
            .p_time {
              margin-top: 23px
              font-size: 16px
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
    .footer {
      footer {
        height: 100px
        line-height: 100px
        background: #F7F7F7
        width: 100%
        .title {
          width: 100%
          height: 100px
          line-height: 100px
          color: #999999
          font-size: 28px
          margin: 0 auto
          background: url(../common/image/footer_logo.png) no-repeat center
        }
      }
    }
  }
  @media all and (max-width: 767px) {
    #s_list {
      background: #fff
      height: 100%
      width: 100%
      position: fixed
      top: 0
      bottom: 0
      left: 0
      right: 0
      padding-bottom: 0.1rem
      .container {
        padding: 0
        margin: 0
        .search {
          width: 100%;
          position: relative;
          margin: 0 auto;
          height: 1.82rem
          .search_go {
            width: 92%;
            height: 0.88rem;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-top: -0.44rem
            margin-left: -46%
            border: 1px solid #5AA2E7;
            .search_content {
              width: 100%;
              display: block
              height: 0.44rem;
              line-height: 0.5rem
              border: none;
              position: absolute;
              outline: none;
              color: #333;
              font-size: 0.28rem;
              padding: 0 0 0 0.22rem;
              margin: 0.22rem 0;
              &::placeholder {
                color: #99a9bf
              }
            }
            .submit {
              position: absolute
              display inline-block
              width: 1.10rem
              height: 0.88rem
              line-height: 0.88rem
              right: 0
              top: 0
              text-align: center
              font-weight: 200

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
          .el-form {
            height: 1.1rem
            line-height: 1.1rem
            color: #99A9BF
            font-size: 0.28rem
            background: #fff
            border-b-1px(#E5E9F2)
            .form_address {
              display: inline-block
              width: 50%
              float: left
              .el-form-item__content {
                margin-left: 15px !important
                margin-bottom: 0
                .el-input {
                  .el-input__inner {
                    line-height: 0.36rem
                    font-size: 0.24rem
                  }
                }
              }
            }
            .form_kind {
              display: inline-block
              width: 50%
              float: right
              .el-form-item__content {
                margin-right: 15px !important
                .el-select {
                  .el-input {
                    .el-input__inner {
                      line-height: 0.36rem
                      font-size: 0.24rem
                    }
                  }
                }
              }
            }
          }
        }

        .list {
          background: #fff
          width: 100%;
          position: fixed
          top: 3.04rem;
          right: 0
          left: 0
          bottom: 0
          overflow: hidden
          padding-bottom: 0
          .list_content {
            width: 100%
            padding: 0
            .grid-content {

              height: 2.28rem
              padding: 0.4rem 0 0.4rem 0.32rem
              margin-bottom: 0
              border: none
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
                  vertical-align: middle
                }
                .price {
                  display: inline-block
                  font-size: 0.26rem
                  color: #F96868
                  vertical-align: middle
                }
              }
              .p_time {
                margin-top: 0.46rem
                font-size: 0.24rem
                color: #99A9BF
              }
            }

          }
          .footer {
            position: relative
            width: 100%
            bottom: -0.46rem
            footer {
              height: 1rem
              background: #F7F7F7
              width: 100%
              line-height: 1px
              .title {
                height: 1rem
                line-height: 1rem
                text-align: center
                color: #999999
                font-size: 0.14rem
                background: url(../common/image/footer_logo.png) no-repeat center
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

  @media (min-width: 768px) and (max-width: 992px) {
    #s_list {
      background: #fff
      height: 100%
      width: 100%
      position: fixed
      top: 0
      bottom: 0
      left: 0
      right: 0
      padding-top: 66px
      padding-bottom: 10px
      .container {
        width: 100%
        padding: 0
        margin: 0
        .search {
          width: 100%;
          position: relative;
          margin: 0 auto;
          background: #fff;
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
              display: table
              height: 60px
              border: 1px solid #5AA2E7;
              position: relative;
              outline: none;
              color: #333;
              font-size: 14px;
              padding: 18px 0 15px 14px
              &::placeholder {
                color: #99a9bf
              }
            }
            .submit {
              position: absolute
              display inline-block
              width: 110px
              height: 60px
              line-height: 60px
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
          position: fixed
          top: 260px
          right: 0
          left: 0
          bottom: 0
          overflow: hidden
          padding: 10px 10px
          .list_content {
            width: 100%
            padding: 0 20px
            .grid-content {
              height: 114px
              padding: 20px 0 20px 16px
              margin-bottom: 20px
              border: 1px solid #E5E9F2
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
                  vertical-align: middle
                }
                .price {
                  display: inline-block
                  font-size: 16px
                  color: #F96868
                  vertical-align: middle
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
