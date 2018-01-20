<template>
  <div class="candidate-wrap">
     <tab :line-width=0 active-color="#5AA2E7">
      <tab-item selected @on-item-click="onItemClick">全部</tab-item>
      <tab-item @on-item-click="onItemClick">待筛选</tab-item>
      <tab-item @on-item-click="onItemClick">待接收面试</tab-item>
      <tab-item @on-item-click="onItemClick">已接收面试</tab-item>
      <tab-item @on-item-click="onItemClick">淘汰</tab-item>
    </tab>
    <scroller lock-x ref="scrollerBottom" height="-44" @on-scroll-bottom="loadMore" v-if="resultList && resultList.length > 0">
      <div class="resume-list-wrap">
        <div class="resume-item" v-for="(item,index) in resultList" @click="selectItem(item)">
           <div class="avatar">
              <img v-if="!item.headImg" src="../../common/image/default_avatar.png" alt="头像">
              <img v-else :src="item.headImg" alt="头像">
           </div>
           <div class="content">
              <div class="top-box">
                <div class="name">{{item.name}}<img src="../../common/image/sex_male.png" alt="sex"></div>
                <div class="state"></div>

              </div>
              <div class="middle-box">
                <p class="base-info"><span>26岁</span><span>{{item.eduStr}}</span><span>{{item.workYearStr}}</span></p>
                <!-- <p class="company">杭州爱聚科技有限公司</p> -->
              </div>
              <div class="bottom-box">
                <label class="label" for="">应聘</label>
                <span class="position-name">{{item.positionName}}</span>
              </div>
           </div>
        </div>


      </div>
      <load-more v-show="showLoadMore" tip="正在加载"></load-more>
      <footer-logo></footer-logo>
          <!-- <loading v-show="showLoading"></loading> -->
    </scroller>
    <div class="no-result" v-else>
       <div class="img-box"></div>
       <p>暂无数据</p>
    </div>
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
      return {
          options:null,
          code:'',
          companyId:this.$route.query.companyId || '',
          showLoadMore:false,
          showLoading:true,
          tabIndex:0,
          resultList:[],
          resultListArr:[
            {

            }
          ],

      }
  },
  created(){
    this.options = urlParse()
    this.code = this.options.code
    if(!localStorage.userInfo){
      this.getCodeUrl()
    }
    this.getAll('1,3,6')
  },
  methods:{
    onItemClick (index) {
      this.tabIndex = index;
      this.resultList = []
      switch(index){
        case 0:
        case 4:
         if(index == 0){
             this.getAll('1,3,6')
          }else{
             this.getAll('6')
          }
          break;
        case 1:
          this.getSpareRepo()
          break;
        case 2:
        case 3:
          if(index == 2){
             this.getInterviewRepo(1)
          }else{
             this.getInterviewRepo(2)
          }
         
          break;
      }
    },
    //微信内访问移动端页面，获取codeUrl；若返回的codeUrl不为空，则需要前端请求codeUrl地址，获取到code值
    getCodeUrl(){
      var _this = this;
      var method = "account/aijuAssistantAutoLogin";
      var param = {
        redirectUri: 'https://aijuhr.com/miniRecruit/#/candidate?companyId=' + _this.companyId,
        code:_this.code
      };
      var successd = function (response) {
        let res = response.data;
         console.log(res)
        if (res.code == "0") {
            //登录成功
           localStorage.userInfo = JSON.stringify(res.data);
        
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
                companyId: _this.companyId,
              }
          })
        }
      }
      _this.$webHttp(method, param, successd);
    },
    //全部和淘汰
    getAll(processStr) {
      var _this = this;
      var method = "queryResume/queryAllRepo";
      var param = JSON.stringify({
        companyId:_this.companyId,
        pageNum: 1,
        pageSize: 10,
        keyWord:"",
        parameter:JSON.stringify({
          sex:'',
          resumeStatus:'',
          resumeFrom:'',
          workYearLow:'',
          workYearHigh:'',
          educationLev:'',
          interviewTimeType:'',
          talentRepoNo:0,
          processStr:processStr,
        }),
      });
      var successd = function (response) {
        let res = response.data;

        if (res.code == 0) {
            _this.resultList = _this.resultList.concat(res.data.resultList)
            // _this.resultList = []
            _this.showMore = false     
        }
      }
      _this.$http(method, param, successd);
    },
    //筛选 
    getSpareRepo() {
      var _this = this;
      var method = "queryResume/queryNewOrSpareRepo";
      var param = JSON.stringify({
        companyId:_this.companyId,
        pageNum: 1,
        pageSize: 10,
        processStatus:2,
        keyWord:"",
        parameter:JSON.stringify({
          sex:'',
          resumeStatus:'',
          resumeFrom:'',
          workYearLow:'',
          workYearHigh:'',
          educationLev:'',
          interviewTimeType:'',
        }),
      });
      var successd = function (response) {
        let res = response.data;

        if (res.code == 0) {
           _this.resultList = _this.resultList.concat(res.data.resultList)
            _this.showMore = false     
        }
      }
      _this.$http(method, param, successd);
    },
    //待接收面试和已接收面试
    getInterviewRepo(statu) {
      var _this = this;
      var method = "queryResume/queryInterviewRepo";
      var param = JSON.stringify({
        companyId:_this.companyId,
        pageNum: 1,
        pageSize: 10,
        processStatus:statu,     //1-待接收，2-已接收
        keyWord:"",
        parameter:JSON.stringify({
          sex:'',
          resumeStatus:'',
          resumeFrom:'',
          workYearLow:'',
          workYearHigh:'',
          educationLev:'',
          interviewTimeType:'',
        }),
      });
      var successd = function (response) {
        let res = response.data;

        if (res.code == 0) {
           _this.resultList = _this.resultList.concat(res.data.resultList)
            _this.showMore = false     
        }
      }
      _this.$http(method, param, successd);
    },
    //load more
    loadMore(e){
      console.log("loadmore")
      console.log(e)
      this.showLoadMore = true;
    },
     /**
       * 跳转至简历详情
       */
      selectItem(item) {
        this.$router.push({
          name: 'resumeDetail',
          query: {
            companyId: this.companyId,
            interviewerId: item.id,
          },
          params: {
            interviewerId: item.id
          }
        })
      },
  },
  
}
</script>

<style >
#app{
  height: 100%;
  background-color: #F8F8FC;
}
</style>

<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
 
.vux-tab {
  justify-content: space-around;
  border-bottom:1px solid #e5e5e5;
  .vux-tab-item{
    background: none;
    flex:none;
    width: auto;
  }
}

.candidate-wrap{
  // background-color: #F8F8FC;
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
        img{
          width:100%;
          height:100%;
          vertical-align: top;
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


