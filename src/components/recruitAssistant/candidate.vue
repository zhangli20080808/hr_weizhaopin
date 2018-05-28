<template>
  <div class="candidate-wrap" v-show="showOuterWrap">
     <tab class="tab-list" :line-width=0 active-color="#5AA2E7">
       <tab-item v-for="(item,index) in statuList" :key="index"  :selected="index == 0" @on-item-click="onItemClick">{{item}}</tab-item>
    </tab>
    <scroller lock-x ref="scrollerBottom" height="-44" @on-scroll-bottom="loadMore" :scroll-bottom-offst="200" v-if="resultList && resultList.length > 0" >
      <div class="resume-list-wrap">
        <div class="resume-item" v-for="(item,index) in resultList" :key="index" @click="selectItem(item)" :data-id="item.id">
           <div class="avatar">
              <img v-if="!item.headImg" src="../../common/image/default_avatar2.png" alt="头像">
              <img v-else :src="item.headImg" alt="头像">
           </div>
           <div class="content">
              <div class="top-box">
                <div class="name">{{item.name}}
                  <img v-if="item.sex == 1" src="../../common/image/sex_male.png" alt="sex">
                  <img v-else-if="item.sex == 2" src="../../common/image/sex_female.png" alt="sex">
                </div>
                <div class="state" :class="{'red-state':item.processStatus == 6}" v-if="tabIndex == 0">{{item.processStatus | parseStatus}}</div>

              </div>
              <div class="middle-box">
                <p class="base-info">
                  <span v-if="item.birthday">{{item.birthday | gloBirthday}}</span>
                  <span v-if="item.educationLev">{{item.educationLev | gloEducationLev}}</span>
                  <span v-if="item.workYear">{{item.workYear}}年</span>
                </p>
                <!-- <p class="company">杭州爱聚科技有限公司</p> -->
              </div>
              <div class="bottom-box">
                <label class="label" for="">应聘</label>
                <span class="position-name">{{item.positionName}}</span>
              </div>
           </div>
        </div>
      </div>
      <load-more v-show="showMore" tip="加载更多"></load-more>
      <footer-logo></footer-logo>
    </scroller>
    <div class="no-result" v-else>
       <div class="img-box"></div>
       <p>暂无数据</p>
    </div>
    <loading v-show="showLoading"></loading>
  </div>
</template>


<script>
 import loading from '../../components/base/loading/loading2.vue'
 import FooterLogo from '../../components/base/footerLogo.vue'
 import { urlParse } from '../../common/js/index.js'

  import {
    Scroller,
    LoadMore,
     Tab, TabItem
  } from 'vux'

export default {
  components: {
    Scroller,
    LoadMore,
     Tab,
    TabItem,
    FooterLogo,
    loading
  },
  data(){
      document.title = '候选人';
      return {
          options:null,
          code:'',
          companyId:this.$route.query.companyId || '',
          showOuterWrap:false,
          showMore:false,
          showLoading:false,
          onFetching:false,
          countMap:{},
          countMapkeys:['allCount','filterCount','toBeReceivedCount','haveReceivedCount','eliminateCount'],
          tabIndex:0,
          resultList:[],
          interviewInfoList:[],
          pageNum:1,
          pageSize:10,   
          page:{},
          statuList:['全部','待筛选','待接收面试','已接收面试','淘汰'],
      }
  },
  created(){
    this.options = urlParse()
    this.code = this.options.code
    this.getCodeUrl()
        
  },
  methods:{
    onItemClick (index) {
      this.tabIndex = index;
      this.resultList = []
      this.interviewInfoList = []
      this.pageNum = 1
      this.showLoading = true
      this.newApi(index)
    },
    //微信内访问移动端页面，获取codeUrl；若返回的codeUrl不为空，则需要前端请求codeUrl地址，获取到code值
    getCodeUrl(){
      var _this = this;
      var method = "account/aijuAssistantAutoLogin";
      var param = {
        redirectUri: 'https://aijuhr.com/miniRecruit/#/candidate',
        // redirectUri:'http://localhost:8088/#/candidate',
        code:_this.code
      };
      var successd = function (response) {
        let res = response.data;
        if (res.code == "0") {
            //登录成功
            _this.showOuterWrap = true
            _this.companyId = res.data.companyId
           localStorage.userInfo = JSON.stringify(res.data);
           
           _this.showLoading = true
           _this.newApi(0)
        }else if(res.code == "2018"){
            //微信授权登录
             location.href = res.data.codeUrl
        } else if(res.code == "2019"){
            //登录失败，请尝试账号登录                  
            _this.$router.push({
              path: `/raLogin`,
              name: 'raLogin',
              params: {
                urlType:'candidate',
                openId:res.data
              },
              query: {
                // companyId: _this.companyId,
              }
          })
        }
      }
      _this.$webHttp(method, param, successd);
    },
    newApi:function(state){
       var _this = this;
      var method = "queryResume/getCandidateListWithCondition";
      var param = JSON.stringify({
        companyId:_this.companyId,
        pageNum: _this.pageNum,
        pageSize: _this.pageSize,
        conditionNum:state,        //conditionNum:0，全部；1，待筛选；2，待接收；3，已接收；4，淘汰
      });
      var successd = function (response) {      
        _this.showLoading = false
        _this.showMore = false
        _this.onFetching = false
        let res = response.data;
        if (res.code == 0) {
            _this.page =  res.data.page;
            _this.countMap = res.data.countMap
            if(res.data.interviewInfoList){
               _this.resultList = _this.resultList.concat(res.data.interviewInfoList)
            }
        }
      }
      var error = function(response){
        let res = response.data;
        if(res.code == 400){
          //登录超时，重新登录
            _this.getCodeUrl()
        }else{
          console.log(res.code,res.message)
        }
      }
      _this.$http(method, param, successd, error);
    },
    //load more
    loadMore(e){
      if (this.onFetching || !this.page.hasNext || this.resultList.length == this.page.totalCount) {
          // do nothing
        } else {
          this.onFetching = true
          setTimeout(() => {
            this.pageNum++
            this.showMore = true
            this.newApi(this.tabIndex)
            this.$nextTick(() => {
              this.$refs.scrollerBottom.reset()
            })
         }, 0)     
       }
    },
     /**
       * 跳转至简历详情
       */
      selectItem(item) {
        if(item.id && item.id != -1){
          this.$router.push({
            name: 'resumeDetail',
            query: {
              companyId: this.companyId,
              interviewerId: item.id,
            },
            params: {
              interviewerId: item.id,
              processStatus: this.tabIndex == 0 ? this.$options.filters['parseStatus'](item.processStatus) : this.statuList[this.tabIndex]
            }
         })
        }   
      },
  },
  filters:{
    //
    parseStatus(val){
      switch(val){
         case 1:
         case 2:
         case 3:
          return '已接收面试';
         case 6:
          return '淘汰';
         case 13:
          return '待接收面试';
         case 11:
         case 14:
         case 17:
          return '待筛选';
        default:
          break;
      }
    }
  },
  
}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
  #app{
    height: 100%;
    background-color: #F8F8FC;
  }
 .xs-container{
    min-height:100%; 
    padding-bottom: 48px;
  }
 
.candidate-wrap .vux-tab {
  justify-content: space-around;
  border-bottom:1px solid #e5e5e5;
  // overflow-x:scroll;
  // &::-webkit-scrollbar{
  //   display: none;
  // }
  .vux-tab-item{
    // padding:0 10px;
    background: none;
    flex:none;
    width: auto;
  }
}
.mask{
  top:56px!important;
}

.candidate-wrap{
  background-color: #F8F8FC;
  // height: 100%;
  
  .resume-list-wrap{
    margin-top:12px;
    .resume-item{
      display: flex;
      justify-content: space-between;
      padding:.24rem .24rem .3rem .3rem;
      margin-bottom:.25rem;
      background-color: #ffffff;
      .avatar{
        width:1.28rem;
        height:1.28rem;
        overflow: hidden;
        margin-right:.25rem;
        border-radius: 50%;
        img{
          width:100%;
          height:100%;
          vertical-align: top;
          border-radius: 50%;
        }
      }
      .content{
        flex:1;
        padding-top:.1rem;
        .top-box{
          display: flex;
          justify-content: space-between;
          .name{
            position: relative;
            padding-right:.4rem;
            font-size:.36rem;
            line-height: .5rem;
            img{
              position: absolute;
              right:0;
              bottom:0.08rem;
              width:.28rem;
              height:.28rem;
            }
          }
          .state{
            height: .45rem;
            line-height: .45rem;
            padding-left:4px;
            padding-right:4px;
            background-color: #E8F1F8;
            font-size:.26rem;
            color: #5AA2E7;
            border-radius: 3px;
            &.red-state{
              color:#F96868;
              background-color: #FFEAEA;
            }
          }
        }
        .middle-box{
          font-size:.26rem;
          color:#9B9B9B;
          line-height: 1.5;
          .base-info{
            span{
              margin-right:.2rem;
            }
          }
          .company{
            padding-left:.35rem;
            background: url("../../common/image/industry-lg.png") left center no-repeat;
            background-size: .3rem .25rem;
          }
        }
        .bottom-box{
          display: flex;
          align-items: center;
          color: #5AA2E7;
          font-size: .26rem;
          margin-top:.2rem;
          .label{
            height: .36rem;
            line-height: .36rem;
            border-radius: .18rem;
            padding:0 .1rem;
            margin-right: .12rem;
            border:1px solid #5AA2E7;
            color: #5AA2E7;
            font-weight: normal;
          }
        }
      }
    }
  }
  .no-result{
    text-align: center;
    .img-box{
      width:2.34rem;
      height: 2.43rem;
      margin:2.3rem auto .6rem;
      overflow: hidden;
      background: url("../../common/image/no-result2.png") no-repeat;
      background-size: 100%;
    }
    p{
      font-size: .28rem;
      color: #B2B2B2;
    }
  }
  
}

</style>


