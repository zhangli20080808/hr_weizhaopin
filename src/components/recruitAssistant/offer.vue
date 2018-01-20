<template>
  <div class="offer-wrap">
     <tab :line-width=0 active-color="#5AA2E7">
      <tab-item selected @on-item-click="onItemClick">全部</tab-item>
      <tab-item @on-item-click="onItemClick">待发offer</tab-item>
      <tab-item @on-item-click="onItemClick">待接收offer</tab-item>
      <tab-item @on-item-click="onItemClick">待入职</tab-item>
      <tab-item @on-item-click="onItemClick">已入职</tab-item>
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
                <div class="state" v-if="tabIndex == 0">{{item.joinStatus | parseStatus}}</div>

              </div>
              <div class="middle-box">
                <p class="base-info"><span>{{item.interBirthday | parseAge}}岁</span><span>{{item.eduStr}}</span><span>{{item.workYearStr}}</span></p>
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
          methods:['hasSentOfferRecords','awaitSentOfferRecords','awaitReceiveOfferRecords','awaitEntryOfferRecords','getHasHiredList'],

      }
  },
  created(){
    this.options = urlParse()
    this.code = this.options.code
    if(!localStorage.userInfo){
      this.getCodeUrl()
    }
    this.getOfferList(0)
  },
  methods:{
    onItemClick (index) {
      this.tabIndex = index
      this.resultList = []
      this.getOfferList(index)

    },
    //微信内访问移动端页面，获取codeUrl；若返回的codeUrl不为空，则需要前端请求codeUrl地址，获取到code值
    getCodeUrl(){
      var _this = this;
      var method = "account/aijuAssistantAutoLogin";
      var param = {
        redirectUri: 'https://aijuhr.com/miniRecruit/#/offer?companyId=' + _this.companyId,
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
                urlType:'offer',
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
    //offer list
    getOfferList(index) {
      var _this = this;
      var method = "TalentPool/" + _this.methods[index];
      var param = JSON.stringify({
        companyId:_this.companyId,
        pageNum: 1,
        pageSize: 10,
      });
      var successd = function (response) {
        let res = response.data;

        if (res.code == 0) {
           _this.showMore = false 
           if(index == 0 || index == 1 || index == 2){
              _this.resultList = _this.resultList.concat(res.data.awaitSentOfferRecords)
           }else if(indx == 3){
              _this.resultList = _this.resultList.concat(res.data.awaitEntryOfferRecords)
           }else if(indx == 4){
              _this.resultList = _this.resultList.concat(res.data.hasHiredList)
           }    
               
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
        if(item.interviewerId && item.interviewerId != -1){
            this.$router.push({
            name: 'resumeDetail',
            query: {
              companyId: this.companyId,
              interviewerId: item.interviewerId,
            },
            params: {
              interviewerId: item.id
            }
          })
        }  
      },
  },
  filters:{
    // 0.待发送offer 1.待接收offer 2.已接受offer（待入职） 3.已经入职 4.表示offer无效5.表示放弃入职
    parseStatus(val){
      switch(val){
        case 0:
          return '待发offer';
         case 1:
          return '待接收offer';
         case 2:
          return '待入职';
         case 3:
          return '已入职';
         case 4:
          return 'offer无效';
         case 5:
          return '放弃入职';
        default:
          return '其他'
      }
    }
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

.offer-wrap{
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
      width:2.32rem;
      height: 2.47rem;
      margin:2.3rem auto .6rem;
      overflow: hidden;
      background: url("../../common/image/no-result.png") no-repeat;
      background-size: 100%;
    }
    p{
      font-size: .28rem;
      color: #B2B2B2;
    }
  }
  
}

</style>


