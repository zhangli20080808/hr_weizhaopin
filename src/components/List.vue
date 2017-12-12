<template>
  <div id="s_list">
    <!--搜索-->
    <div class="container">

      <div class="search hidden-xs hidden-sm">
        <div class="detail_des">
          <el-breadcrumb separator="/" class="tips">
            <el-breadcrumb-item :to="{ path: '/' ,query:{ companyId: this.companyId}}" class="tips_1">招聘首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>职位列表</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="search_go">
          <input placeholder="职位关键词" class="search_content" v-model="Search" @keyup.enter="search">
          <span class="submit" @click="search">搜索</span>
        </div>
      </div>
      <!--职位列表-->
      <!--back-->
      <!-- <div class="back visible-xs  hidden-sm hidden-lg">
        <i class="icon" @click="back"></i>
        <h2 class="title">在招职位</h2>
      </div> -->

      <div class="list-form hidden-xs">

        <el-form ref="form" :model="form" label-width="80px">

          <el-form-item class="form_address">
            <i class="address_icon"></i>
            <el-cascader
              :options="workCityLists"
              v-model="form.address"
              @change="change"
              placeholder="全部工作地点"
            ></el-cascader>
          </el-form-item>

          <el-form-item class="form_kind">
            <i class="kind_icon"></i>
            <el-select v-model="form.kind" placeholder="请选择职位分类" @change="selectKind" v-show="selectK">
              <el-option :label="item.name" :value="item.categoryId" v-for="item in selectK" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="all">
            <el-button type="primary" @click="findAll" class="hidden-xs">查询所有</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="job-filter hidden-xs hidden-sm hidden-lg">
        <div class="job-filter__row">
          <div class="mobile-text-input job-filter__search-input">
            <div class="mobile-text-input__wrapper text  ">
              <span class="icon icon-search mobile-text-input__icon  "></span>
              <span class="mobile-text-input__label   "></span>
              <input type="search" class="mobile-text-input__input" placeholder="请输入关键字" v-model="Search">
            </div>
          </div>
        </div>
        <!--下拉查询-->
        <!--<div class="job-filter__row">-->
        <!--<div class="list-form">-->

        <!--<el-form ref="form" :model="form" label-width="80px">-->

        <!--<el-form-item class="form_address">-->
        <!--<i class="address_icon"></i>-->
        <!--<el-cascader-->
        <!--:options="workCityLists"-->
        <!--v-model="form.address"-->
        <!--@change="change"-->
        <!--placeholder="请选择地点"-->
        <!--&gt;</el-cascader>-->
        <!--</el-form-item>-->

        <!--<el-form-item class="form_kind">-->
        <!--<i class="kind_icon"></i>-->
        <!--<el-select v-model="form.kind" placeholder="请选择职位分类" @change="selectKind">-->
        <!--<el-option :label="item.name" :value="item.id" v-for="item in selectK" :key="item.id"></el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item class="all">-->
        <!--<el-button type="primary" @click="findAll" class="hidden-xs">查询所有</el-button>-->
        <!--</el-form-item>-->
        <!--</el-form>-->
        <!--</div>-->
        <!--</div>-->
      </div>

      <div class="list hidden-xs">
        <div class="list_content" v-show="list.length">
          <el-row :gutter="20" class="">
            <el-col :span="8" :xs="24" :sm="12" :md="8" :lg="8" v-for="item in list" :key="item.id"
            >
              <div class="grid-content bg-purple" @click="selectItem(item)">
                <div class="title">{{item.positionName}}</div>
                <div class="text">
                  <span
                    class="des hidden-xs">{{getCity(item.workCity)}}/{{item.positionType === 1 ? '全职' : item.positionType === 2 ? '兼职' : '实习'
                    }}</span>
                  <span class="des visible-xs"><i class=""></i>{{getCity(item.workCity)}}</span>
                  <span class="price">{{item.positionSalaryLowest}}k-{{item.positionSalaryHighest}}k</span>
                  <span
                    class="mp_time visible-xs">{{item.positionType === 1 ? '全职' : item.positionType === 2 ? '兼职' : '实习'
                    }}</span>
                  <p class="p_time hidden-xs">发布时间：{{filter(item.posiPublishTime)}}</p>
                </div>

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
      </div>
    </div>
    <div class="footer hidden-xs">
      <footer>
        <div class="title"></div>
      </footer>
    </div>

    <div class="result hidden-sm hidden-lg">
      <scroller lock-x height="-38" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom">

        <ul class="job-list__list">
          <div class="job-filter hidden-sm hidden-lg ">
            <!--搜索-->
            <div class="job-filter__row">
              <div class="mobile-text-input job-filter__search-input">
                <div class="mobile-text-input__wrapper text  ">
                  <span class="icon icon-search mobile-text-input__icon  "></span>
                  <span class="mobile-text-input__label   "></span>
                  <input type="search" class="mobile-text-input__input" placeholder="请输入关键字" v-model="Search">
                </div>
              </div>
            </div>

            <div class="job-filter__row">
              <div class="mobile-text-input job-filter__selector">
                <div class="mobile-text-input__wrapper">
                  <span class="icon address_icon mobile-text-input__icon  "></span>
                  <span class="mobile-text-input__label   "></span>
                  <input type="text" class="mobile-text-input__input" placeholder="" v-model="address"
                         onfocus="this.blur()" @click="chooseAll">
                </div>
              </div>
              <div class="mobile-text-input job-filter__selector">
                <div class="mobile-text-input__wrapper">
                  <span class="icon icon-work mobile-text-input__icon  "></span>
                  <span class="mobile-text-input__label   "></span>
                  <input type="text" class="mobile-text-input__input" placeholder="" v-model="form.name"
                         onfocus="this.blur()" @click="choseKind">
                </div>
              </div>
            </div>
          </div>
          <div class="contant-list" v-if="list.length">
            <li v-for="item in list" @click="selectItem(item)">
              <div class="job-list-item">
                <div class="title">
                  <span class="prior" v-if="item.isUrgent == 1">[急招]&nbsp;</span>
                  <span class="text">{{item.positionName}}</span>
                </div>
                <div class="details">
              <span class="misc">
                <span class="secondary">{{getCity(item.workCity)}}</span>
                <span class="secondary">{{item.positionSalaryLowest}}k-{{item.positionSalaryHighest}}k</span>
                <span
                  class="secondary">{{item.positionType === 1 ? '全职' : item.positionType === 2 ? '兼职' : '实习'}}</span>
              </span>
                </div>
                <div class="secondary-details">
              <span class="opened-at">
                <span>发布时间：</span>
                <span>{{filter(item.posiPublishTime)}}</span>
                <span style="margin-left: 10px">浏览次数: &nbsp;{{item.views}}</span>
              </span>
                </div>
              </div>
            </li>
          </div>
          <load-more tip="loading" v-if="showMore"></load-more>
          <loading v-show="!list"></loading>
        </ul>
      </scroller>
    </div>
    <!--职能类型-->
    <div v-transfer-dom>
      <x-dialog v-model="showScrollBox" class="choose-kind" v-if="selectK">
        <p class="title">职能类型</p>
        <div class="img-box" style="height:100px;padding:15px 0;overflow:scroll;-webkit-overflow-scrolling:touch;">
          <button class="btn-kind" @click="getAll">全部职能类型</button>
          <button class="btn-kind" v-for="item in selectK" @click="getKind(item)">{{item.name}}</button>
        </div>
        <div @click="showScrollBox=false">
          <span class="vux-close">取消</span>
        </div>
      </x-dialog>
    </div>
    <!--全部工作地点-->
    <div v-transfer-dom>
      <x-dialog v-model="addressAll" class="choose-kind" v-if="addressAll">
        <p class="title">工作地点 </p>
        <div class="img-box" style="height:100px;padding:15px 0;overflow:scroll;-webkit-overflow-scrolling:touch;">
          <button class="btn-kind" @click="getAllAddress">全部工作地点</button>
          <button class="btn-kind" v-for="item in workCity" @click="getAddress(item)">{{item}}</button>
        </div>
        <div @click="addressAll=false">
          <span class="vux-close">取消</span>
        </div>
      </x-dialog>
    </div>
    <!--底部-->
    <div class="footer hidden-sm hidden-lg">
      <footer>
        <a href="https://aijuhr.com">
          <div class="title"></div>
        </a>
      </footer>
    </div>
    <!--<router-view></router-view>-->
    <loading v-show="!list.length"></loading>
  </div>

</template>


<script>
  import allcity from '../common/js/allcity'
  import loading from './base/loading/loading.vue'
  import scroll from  '../components/base/scroll.vue'
  import footerNav from '../components/base/foot.vue'

  import {
    XDialog,
    Scroller,
    Divider,
    Spinner,
    XButton,
    Group,
    Cell,
    LoadMore,
    TransferDomDirective as TransferDom
  } from 'vux'

  export default {
    data() {
      document.title="在招职位";
      return {
        showMore: false,
        pullup: true,
        showList1: true,
        scrollTop: 0,
        onFetching: false,
        bottomCount: 20,
        beforeScroll: true,
        logoUrl: '',
        showScrollBox: false,
        addressAll: false,
        form: {
          address: [],
          kind: 0,
          name: '全部职能类型',
          pKind: 0
        },
        item: '',
        config: {
          pageSize: 6,
          pageNum: 1,
          totalCount: 1
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
        list_search: [],
        address: '全部工作地点',
        workCity: [],
      }
    },
    methods: {
      selectItem(item) {
        this.$router.push({
          name: 'listDetail',
          query: {
            companyId: this.companyId,
            positionId:item.id,
          },
          params: {
            id: item.id
          }
        })
        if (!this.$route.params.all) {
            return
        }else {
          this.form.kind = localStorage.setItem('cate', item.categoryId)
          localStorage.setItem('cateName', item.categoryName)
        }
      },
      change(item) {
        this.item = item[1]
        this.positionList()
      },
      filter(item){
        return item.substr(0, 10)
      },
      backIndex() {
        this.$router.push({
          path: `/`,
          query: {
            companyId: this.companyId,
          }
        })
      },
      selectKind(item) {
        this.form.kind = item
        if (document.documentElement.clientWidth < 768) {
          return
        } else {
          this.positionList()
        }
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
        this.form.address = []
        this.form.kind = ''
        this.item = ''
        this.positionList()
      },
      getCity(item){
        return item.split(',')[1]
      },
      //职位列表页
      positionList() {
        if (document.documentElement.clientWidth < 768) {
          this.config.pageNum = 1
        }
        var _this = this;
        var method = "promotionPage/positionList";
        var param = JSON.stringify({
          pageNum: _this.config.pageNum,
          pageSize: _this.config.pageSize,
          companyId: _this.companyId,
          type:2,
          categoryId: _this.form.kind ? `${_this.form.kind}` : '',
          workCity: _this.item ? `${_this.item}` : ''
        });
        var successd = function (res) {
          if (res.data.code == 0) {
            _this.list = _this._genResult(res.data.data)
            _this.config.totalCount = res.data.data.count
          }
        }
        _this.$http(method, param, successd);
      },
      _genResult(data){
        let ret = []
        if (data.positionList) {
          ret = ret.concat(data.positionList)
        }
        return ret
      },
      //职位分类
      getPositionCategoryList() {
        var _this = this;
        var method = "miniRecruit/getWzpIndexInfo";
        var param = JSON.stringify({
          companyId: this.companyId,
          type: 2
        });
        var successd = function (res) {
          if (res.data.code == 0) {
            _this.selectK = res.data.data.recruitmentCountList.result
          }
        }
        _this.$http(method, param, successd);
      },
      //城市分类
      getCityList() {
        var _this = this;
        var method = "miniRecruit/getRecruitingWorkCityList";
        var param = JSON.stringify({
          companyId: this.companyId,
          type: 2
        });
        var successd = function (res) {
          if (res.data.code == 0) {
            _this.workCity = res.data.data

          }
        }
        _this.$http(method, param, successd);
      },
      //数组去重
      filterAddress(item){
        item.forEach((address) => {

        })
      },
      //职位搜索
      goSearch(val) {
        this.form.address = [];
        this.form.kind = '';
        var _this = this;
        var method = "miniRecruit/searchRecruitPosition";
        var param = JSON.stringify({
          companyId: _this.companyId,
          key: val,
          pageNum: _this.config.pageNum,
          pageSize: _this.config.pageSize,
        });
        var successd = function (res) {
          if (res.data.code == 0) {
              console.log(res.data.data)
            _this.list = res.data.data.recruitPositionList
          }
        }
        _this.$http(method, param, successd);
      },
      search(){
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
      },
      back() {
        this.$router.goBack()
//        console.log(this.$router)
//
        this.$router.push({
          path: '/',
          name: 'home',
          query: {
            companyId: this.companyId,
          }
        })
      },
      choseKind(){
        this.showScrollBox = true
      },
      chooseAll(){
        this.addressAll = true
      },
      getKind(item){
          localStorage.clear()
        this.form.kind = item.categoryId
        this.form.name = item.name
        this.positionList()
        this.showScrollBox = false
      },
      getAll(){
        this.form.kind = ''
        this.showScrollBox = false
        this.positionList()
        this.form.name = '全部职能类型'
      },
      getAllAddress(){
        this.item = []
        this.form.kind = ''
        this.positionList()
        this.addressAll = false
        this.address = '全部工作地点'
      },
      getAddress(item){
        this.item = item.split(',')[1]
        this.positionList()
        this.addressAll = false
        this.address = this.item
      },
      onScrollBottom () {
        if (this.onFetching) {
          // do nothing
        } else {
          this.onFetching = true
          if (this.config.pageSize < this.config.totalCount) {
            this.config.pageSize += 5
            this.showMore = true
            this.positionList()
          } else {
            this.showMore = false
          }
          setTimeout(() => {
            this.$nextTick(() => {
            })
            this.onFetching = false
          }, 2000)
        }
      },

    },
    directives: {
      TransferDom
    },

    mounted() {

    this.$nextTick(()=>{
      console.log(this.$route)
      let showAll = this.$route.params.showAll
      let posId = localStorage.getItem('posId')
      let posName = localStorage.getItem('posName')
      let cateName = localStorage.getItem('cateName')
      if (this.$route.query.companyId) {
        this.companyId = this.$route.query.companyId
      }
      if (this.$route.params.search === '' && this.$route.params.all !== '') {
        this.positionList()
      } else if (this.$route.params.search) {
        this.Search = this.$route.params.search
      }
      this.getPositionCategoryList()
      this.transitionCityLists()
      this.getCityList()

      this.form.kind = Number(posId)
      if (this.form.kind !== 0) {
        this.form.name = posName
        this.positionList()
      } else {
        let cate = localStorage.getItem('cate')
        this.form.kind = cate
        this.form.name = '全部职能类型'
        if (cate) {
          this.form.name = cateName
          this.positionList()

        }
      }
      if (!this.$route.params.all) {
        this.positionList()
      }
      if (this.$route.params.searchList) {
        this.Search = this.$route.params.searchList
      }
    })

    },
    components: {
      loading,
      Scroller,
      Divider,
      Spinner,
      XButton,
      Group,
      Cell,
      LoadMore,
      scroll,
      XDialog,
      footerNav
    },
    watch: {
      Search(val){
        this.form.name = '全部职能类型'
        this.goSearch(val)
      }
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
          color: #5c6170;
          .search_content {
            display: table
            width: 426px;
            height: 47px;
            line-height: 47px
            border: 1px solid #5AA2E7;
            position: relative;
            outline: none;
            color: #5c6170;
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
          color: #5c6170 999
          font-size: 28px
          margin: 0 auto
          background: url(../common/image/footer_logo.png) no-repeat center
        }
      }
    }
  }

  @media all and (max-width: 767px) {
    #s_list {
      background: #f1f5f8
      height: 100%
      width: 100%
      position: fixed
      top: 0
      left: 0
      right: 0
      bottom: 0
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
              color: #5c6170;
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
        .list {
          background: #fff
          width: 100%;
          position: relative
          height: 100%
          overflow: hidden
          padding-bottom: 0
          .list_content {
            width: 100%
            border-bottom: none
            display: block;
            padding: 0 0.52rem;

            .grid-content {
              height: 1.4rem
              line-height: 0.7rem
              margin-bottom: 0
              border: none
              border-left: none
              border-right: none
              background: #fff;
              padding: 0.08rem 0 0 0;
              border-b-1px(#dddfe3)
              .title {
                font-size: 0.30rem;
                color: #5c6170;
                margin-bottom: 0.02rem;
                padding-left: 0.1rem
              }
              .text {
                height: 0.28rem
                line-height: 0.28rem
                font-size: 0.26rem
                .des {
                  display: inline-block
                  float: left
                  font-size: 0.28rem
                  color: #666
                  height: 14px
                  line-height: 14px
                  padding-left: 0.1rem;
                  vertical-align: middle
                  position: relative
                  margin-right: 10px;
                  padding-right: 10px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  border-right: 1px solid #f4f4f6;
                  .address_icon {
                    display: inline-block
                    vertical-align: top
                    position: absolute
                    width: 22px
                    height: 14px
                    top: 0
                    left: 0
                    background: url(../common/image/address.png) no-repeat center
                    background-size: 50%
                  }
                }
                .price {
                  display: inline-block
                  float: left
                  font-size: 0.28rem
                  height: 14px
                  line-height: 14px
                  color: #666
                  vertical-align: middle
                  position: relative
                  margin-right: 10px;
                  padding-right: 10px;
                  border-right: 1px solid #f4f4f6;
                  .salary_icon {
                    display: inline-block
                    position: absolute
                    width: 26px
                    height: 14px
                    line-height: 14px
                    top: 0
                    left: 0
                    background: url(../common/image/salary.png) no-repeat center
                    background-size: 50%
                  }
                }
                .mp_time {
                  display: inline-block
                  float: left
                  font-size: 0.28rem
                  color: #666
                  vertical-align: middle
                  margin-top: 0
                  height: 14px
                  line-height: 14px
                  position: relative
                  margin-right: 10px;
                  padding-right: 10px;
                  border-right: 1px solid #f4f4f6;

                  .time_icon {
                    display: inline-block
                    position: absolute
                    width: 26px
                    height: 14px
                    top: 0
                    left: 0
                    background: url(../common/image/time_icon.png) no-repeat center
                    background-size: 50%
                  }
                }
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
                color: #5c6170 999
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

        .loading-container {
          position: absolute
          width: 100%
          top: 50%
          transform: translateY(-50%)
        }
        .back {
          position: fixed;
          left: 0;
          top: 0;
          right: 0;
          z-index: 1;
          height: 1.12rem;
          padding-left: 20px;
          padding-right: 20px;
          background-color: #64b5f6;
          color: rgba(9, 10, 11, 1);
          .icon {
            display: inline-block
            width: 39px
            height: 34px
            position: absolute
            left: 0.2rem
            top: 0.18rem
            background: url(../common/image/back.png) no-repeat center
            background-size: 50%
          }
          .title {
            width: 100%
            height: 1.12rem;
            line-height: 1.12rem;
            color: #fff
            font-size: 0.34rem
            margin-left: 0.6rem
          }
        }

      }
      .result {
        height: 100%
        overflow: hidden
        .job-list__list {
          margin: 0;
          background: #f1f5f8;
          list-style: none;
          .job-filter {
            padding: 5px 12px 18px 12px;
            background-color: #fff;
            .job-filter__row {
              display: -webkit-box;
              display: -moz-box;
              display: -webkit-flex;
              display: -ms-flexbox;
              display: box;
              display: flex;
              .list-form {
                margin-top: 0.2rem
                height: 1rem
                line-height: 1rem
                .el-form {
                  height: 0.8rem;
                  line-height: 0.8rem;
                  color: #5c6170
                  font-size: 0.28rem
                  background: #fff
                  .form_address {
                    display: inline-block
                    width: 50%
                    float: left
                    position: relative
                    .address_icon {
                      position: absolute
                      top: 0.08rem
                      display: inline-block
                      background: url(../common/image/address_city.png) no-repeat center
                      width: 22px
                      height: 28px
                      z-index: 1
                      background-size: 50%
                    }
                    .el-form-item__content {
                      margin-left: 15px !important
                      margin-bottom: 0
                      .el-input {
                        border-b-1px(#E5E9F2)
                        .el-input__icon {
                          display: none
                        }
                        .el-input__inner {
                          border: none;
                          text-align: center;
                          line-height: 0.36rem
                          font-size: 0.28rem
                          color: #5c6170 !important
                          &::placeholder {
                            color: #5c6170
                            font-size: 0.28rem
                          }
                        }
                      }
                      .el-cascader__label {
                        padding: 0 10px 0 30px;
                        color: #5c6170
                        font-size: 0.28rem
                      }
                    }
                  }
                  .form_kind {
                    display: inline-block
                    width: 50%
                    float: right
                    margin-bottom: 0 !important
                    position: relative
                    .kind_icon {
                      display: inline-block
                      position: absolute
                      top: 6px
                      background: url(../common/image/other.png) no-repeat center
                      width: 27px
                      height: 23px
                      background-size: 50%
                      z-index: 1
                    }
                    .el-form-item__content {
                      margin-right: 15px !important
                      .el-select {
                        border-b-1px(#E5E9F2)
                        .el-input {
                          .el-input__icon {
                            display: none
                          }
                          .el-input__inner {
                            border: none
                            text-align: center;
                            line-height: 0.36rem
                            font-size: 0.28rem
                            color: #5c6170 !important
                            padding-right: 0
                            &::placeholder {
                              color: #5c6170
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }

              .mobile-text-input {
                width: 100%;
                padding: 0 16px;
                display: inline-block;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                .mobile-text-input__wrapper {
                  position: relative;
                  display: -webkit-box;
                  display: -moz-box;
                  display: -webkit-flex;
                  display: -ms-flexbox;
                  display: box;
                  display: flex;
                  height: 40px;
                  padding: 0 2px 0 2px;
                  margin-top: 10px;
                  line-height: 40px;
                  font-size: 12px;
                  border-bottom: 1px solid #dddfe3;
                  -webkit-transition: color 0.2s;
                  -moz-transition: color 0.2s;
                  -o-transition: color 0.2s;
                  -ms-transition: color 0.2s;
                  transition: color 0.2s;
                  -webkit-box-align: end;
                  -moz-box-align: end;
                  -o-box-align: end;
                  -ms-flex-align: end;
                  -webkit-align-items: flex-end;
                  align-items: flex-end;
                  .icon-search {
                    display: inline-block
                    -moz-box-flex: 0;
                    -o-box-flex: 0;
                    box-flex: 0;
                    -webkit-flex: none;
                    -ms-flex: none;
                    flex: none;
                    vertical-align: top;
                    width: 30px;
                    font-size: 15px;
                    height: 40px
                    line-height: 40px;
                    color: #9a9fac;
                    margin-left: -0.20rem;
                    -webkit-transition: color 0.2s;
                    -moz-transition: color 0.2s;
                    -o-transition: color 0.2s;
                    -ms-transition: color 0.2s;
                    transition: color 0.2s;
                    background: url(../common/image/search_list.png) no-repeat center
                    background-size: 50%
                  }
                  .address_icon {
                    display: inline-block
                    -moz-box-flex: 0;
                    -o-box-flex: 0;
                    box-flex: 0;
                    -webkit-flex: none;
                    -ms-flex: none;
                    flex: none;
                    vertical-align: top;
                    width: 30px;
                    font-size: 15px;
                    height: 40px
                    line-height: 40px;
                    color: #9a9fac;
                    margin-left: -0.10rem;
                    -webkit-transition: color 0.2s;
                    -moz-transition: color 0.2s;
                    -o-transition: color 0.2s;
                    -ms-transition: color 0.2s;
                    transition: color 0.2s;
                    background: url(../common/image/address_city.png) no-repeat center
                    background-size: 40%

                  }

                  .icon-work {
                    display: inline-block
                    -moz-box-flex: 0;
                    -o-box-flex: 0;
                    box-flex: 0;
                    -webkit-flex: none;
                    -ms-flex: none;
                    flex: none;
                    vertical-align: top;
                    width: 30px;
                    font-size: 15px;
                    height: 40px
                    line-height: 40px;
                    color: #9a9fac;
                    margin-left: -0.10rem;
                    -webkit-transition: color 0.2s;
                    -moz-transition: color 0.2s;
                    -o-transition: color 0.2s;
                    -ms-transition: color 0.2s;
                    transition: color 0.2s;
                    background: url(../common/image/other.png) no-repeat center
                    background-size: 50%

                  }

                  .mobile-text-input__label {
                    position: absolute;
                    top: -2px;
                    margin-top: 0;
                    font-size: 15px;
                    color: #9a9fac;
                    -webkit-transition: all 0.2s;
                    -moz-transition: all 0.2s;
                    -o-transition: all 0.2s;
                    -ms-transition: all 0.2s;
                    transition: all 0.2s;
                    pointer-events: none;
                    font-size: 15px;
                    height: 40px;
                  }
                  .mobile-text-input__input {
                    width: 100%
                    padding: 0;
                    vertical-align: top;
                    border: none;
                    font-size: 0.28rem;
                    height: 40px;
                    color: #5c6170;
                    outline: none
                    line-height: 20px;
                    padding-left: 0.18rem;
                    &::placeholder {
                      color: #5c6170;
                    }
                  }
                }
              }
              .job-filter__selector {
                -webkit-box-flex: 1;
                -moz-box-flex: 1;
                -o-box-flex: 1;
                box-flex: 1;
                -webkit-flex: 1;
                -ms-flex: 1;
                flex: 1;
                padding: 0 10px;
              }
            }
          }
          .contant-list {
            background :#f1f5f8;
          }
          .job-list-item {
            /*border-bottom: 1px solid #f4f4f6;*/
            display: block;
            padding: 12px 26px;
            background: #ffffff;
            margin :8px 0;
            .title {
              font-size: 15px;
              font-weight: bold;
              margin-bottom: -18px;
              color: #5c6170;
              .prior {
                color: #ff8054;
              }
              .text {
                font-weight:bold;
              }
            }
            .details {
              display: inline-box;
              display: inline-flex;
              width: 100%;
              color: #5c6170;
              .misc {
                display: inline-block
                font-size: 0.26rem
                .secondary {
                  margin-right: 10px;
                  padding-right: 10px;
                  &:not(:last-of-type) {
                    border-right: 1px solid #f4f4f6;
                  }
                }
              }
            }
            .secondary-details {
              margin-top: 10px;
              font-size: 13px;
              color: #9a9fac;
              overflow: hidden;
            }
          }
        }

      }
      .footer {
        position: fixed
        width: 100%
        bottom: 0
        left: 0
        footer {
          height: 0.64rem
          background: #F7F7F7
          width: 100%
          line-height: 0.64rem
          .title {
            height: 0.64rem !important
            line-height: 0.64rem !important
            text-align: center !important
            color: #999999 !important
            font-size: 0.14rem !important
            background: url(../common/image/footLogo.png) no-repeat center !important
            background-size: 100% !important
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
              color: #5c6170;
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
