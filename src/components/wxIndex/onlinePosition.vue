<template>
  <div class="onlinePosition">
    <div class="personal_header">
      <img :src="tuijianObj.headImg" alt="">
      <h2>{{tuijianObj.nickname}}</h2>
      <div class="header_right">
        <p v-if="tuijianObj.haveGzh==1&&tuijianObj.isSubscribe==0" @click="showTuijianDialog=true;"><span class="vux-1px-r">关注</span></p>
        <p v-if="tuijianObj.haveGzh==1&&tuijianObj.isSubscribe==1"><span class="vux-1px-r">已关注</span></p>
        <p @click="recommendedSchedule"> &nbsp;我的</p>
        <h6 v-if="tuijianObj.haveGzh==1&&tuijianObj.isSubscribe==0&&tag" @click="choseTag"><span>关注公众号获取职位分享动态</span></h6>
      </div>
    </div>
    <div>
      <scroller lock-x ref="scrollerBottom" height="-95">
        <div class="list_content">
          <img src="../../common/image/banner_online.png" alt="" width="100%" height="100%">
          <div class="no_result" v-show="!list.length">
            <div class="img"></div>
            <div class="text">暂无在招职位</div>
          </div>
          <dl class="position_detail" v-for="item in list" @click="selectItem(item)">
            <dt>
              <!-- <span class="urgent" v-if="list.isUrgent==1">急招</span> -->
              <img src="../../components/images/urgent2.png" alt="" width="35px" class="img" v-if="item.isUrgent==1">
              <span class="position_name">{{item.positionName}}</span>
            </dt>
            <dd class="position_detail_money">
              <span>{{filter(item.workCity)}}</span>
              <span>{{item.positionType == 1 ? '全职' : item.positionType == 2 ? '兼职' : '实习'}}</span>
              <span v-if="item.showSalaryType==2">{{item.positionSalaryLowest}}-{{item.positionSalaryHighest}}</span>
              <span v-else>{{item.positionSalaryLowest}}K-{{item.positionSalaryHighest}}K</span>
              <!-- <div class="position_list_right">{{item.views}}人看过</div> -->
            </dd>
            <dd class="position_detail_date">
              <span>发布时间 : &nbsp;{{item.createTime}}</span> &nbsp;
              <em>浏览次数 : {{item.views}}次</em>
            </dd>
          </dl>
          <div class="footer_icon" v-show="list.length>4">
            <a href="https://aijuhr.com">
              <div class="img_detail"></div>
            </a>
          </div>
        </div>
      </scroller>
      <div class="about_online">
        <div class="us" @click="getIndex">关于我们</div>
        <div class="online_p" :class="{'activeColor':active}">在招职位</div>
      </div>
    </div>

    <div v-transfer-dom>
      <x-dialog v-model="showTuijianDialog" class="dialog-demo">
        <div @click="showTuijianDialog=false" style="text-align:right;padding-right:5px;padding-top:5px;height:32px;">
          <span class="vux-close" style="color:#2C2D31;font-weight:600;vertical-align:top;"></span>
        </div>
        <div class="img-box">
          <img :src="tuijianObj.companyGzh.qrcodeUrl" style="width:165px" v-if="tuijianObj.haveGzh==1">
          <p style="font-size:.28rem;font-weight:400;color:#888;margin-bottom:20px;">长按关注</p>
        </div>
      </x-dialog>
    </div>
    <!--<loading v-show="!list.length"></loading>-->
  </div>
</template>

<script>
  import loading from '../../components/base/loading/loading2.vue'

  import {
    Scroller,
    LoadMore,
    TransferDomDirective as TransferDom,
    XDialog
  } from 'vux'

  export default {
    data(){
      return {
        companyId: this.$route.query.companyId,
        list: [],
        active: true,
        showMore: false,
        tuijianObj:{//个人顶部通栏
          nickname:'',
          isSubscribe:0,
          headImg:null,
          haveGzh:1,
          companyGzh:{
            accountName:'',
            qrcodeUrl:''
          }
        },
        tag:true,
        fansId:this.$route.query.fansId,
        showTuijianDialog:false,
      }
    },
    methods: {
      getOnlinePosition() {
        var _this = this;
        var method = "companyWeb/getWeWebsitePositionByCategoryId";
        var param = JSON.stringify({
          type: 2,
          // companyId:this.companyId
          id: this.$route.query.id
        });
        var successd = function (res) {
          if (res.data.code == 0) {
            _this.list = res.data.data

          }
        }
        _this.$http(method, param, successd);
      },
      getIndex(){
        this.$router.push({
          name: 'about',
          query: {
            companyId: this.companyId,
            weWebsiteId: this.$route.query.id
          }
        })
      },
      selectItem(item) {
        this.$router.push({
          name: 'listDetail',
          query: {
            companyId: this.companyId,
            positionId: item.id
          },
          params: {
            companyId: this.companyId,
            id: item.id
          }
        })
      },
      filter(item){
        return item.split(',')[1]
      },
      onScrollBottom () {
        if (this.onFetching) {
          // do nothing
        } else {
          this.onFetching = true
//          if (this.config.pageSize < this.config.totalCount) {
//            this.config.pageSize += 5
//            this.showMore = true
//            this.getOnlinePosition()
//          } else {
////            this.showMore = false
//          }
          setTimeout(() => {
            this.$nextTick(() => {
            })
            this.onFetching = false
          }, 2000)
        }
      },
      recommendedSchedule(){
        // location.href="https://aijuhr.com/miniRecruit/#/personal?companyId="+this.companyId;
        this.$router.push({
          name:'personal',
          query:{companyId:this.companyId}
        })
      },
      choseTag(){
        this.tag=!this.tag;
      },
      getUserInfo(){
        var self=this;
        var method="weixin/getUserInfo",
            param={
              companyId:self.companyId,
              fansId:self.fansId
            },
            successd=function(res){
              res.data.headImg=res.data.headImg?res.data.headImg:'https://aijuhr.com/images/yidong/head_wx.png';
              self.tuijianObj=res.data;
              if(self.tuijianObj.headImg == ''||self.tuijianObj.headImg == null){
                    self.tuijianObj.headImg = 'https://aijuhr.com/images/yidong/head_wx.png'
                  }
                };
        self.$webHttp(method,param,successd);
      },
      userAuthUrl(){
        var self=this;
        var method="weixin/userAuthUrl",
            param={
              scope:'snsapi_userinfo',
              pageFrom:5,
              companyId:self.companyId
            },
            successd=function(res){
              if(res.data.userSession==0){
                location.href=res.data.userAuthUrl;
              }else{
                if(res.data.fansId){
                  self.fansId=res.data.fansId;
                }
              }
              self.getUserInfo();
            };
        self.$webHttp(method,param,successd);
      }
    },
    created(){
      this.companyId = this.$route.query.companyId
      this.$nextTick(() => {
        this.getOnlinePosition();
        if(!this.fansId){
          this.userAuthUrl();
        }else{
          this.getUserInfo();
        }
      })
    },
    components: {
      Scroller,
      LoadMore,
      loading,
      XDialog
    },
    directives:{
      TransferDom
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .onlinePosition {
    background-color: #F8F8FC;
    padding-bottom: 0.86rem
    .list_content {
      .no_result{
        padding :30px;
        width 100%;
        height :200px;
        padding-top :120px;
        .text{
          color :#999;
          font-size :14px;
          text-align :center;
          padding-top :10px;
        }
        .img{
          margin :0 auto;
          width :64px;
          height :63px;
          background: url(../../common/image/no-result.png)no-repeat center;
          background-size :cover;
        }

      }
      .footer_icon {
        height: 0.89rem;
        line-height: 0.89rem;
        text-align: center;
        .img_detail {
          display: inline-block;
          vertical-align: middle;
          width: 106px;
          height: 15px;
          background: url(../../common/image/footLogo2.jpg) no-repeat center;
          background-size: 103px auto;
        }
      }
    }
    .banner_img {
      img {
        width: 100%;
        height: 100%;
      }
    }
    .position_detail {
      padding: 12px 15px;
      font-size: 0.28rem;
      background-color: #fff;
      margin-top: 12px;
      clear: both;
      &::before {
        border-top: none;
      }
      dt {
        line-height: 0.48rem;
        height: 0.48rem;
        margin-bottom: 10px;
        font-size: 0.34rem;
        color: #222;
        img {
          display: inline-block;
          vertical-align: middle;
          line-height: 24px;
        }
        .position_name {
          display: inline-block;
          vertical-align: middle;
          width:calc(100% - 50px);
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        .position_detail_right {
          float: right;
          font-size: 0.26rem;
          font-weight: 500;
          color: #FDA732;
        }

      }
      .position_detail_money {
        margin-bottom: 6px;
        color: #666;
        span {
          margin-right: 2px;
          background-color: #f5f5f5;
          padding: 3px 5px;
          border-radius: 2px;
          color: #999999;
          font-size: 0.26rem;
        }
      }
      .position_detail_date {
        color: #999;
        font-size: 0.26rem;
        margin-bottom: 0;
        em {
          font-style: normal;
        }
      }
    }
    .about_online {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      display: flex;
      height: 0.98rem;
      font-size: 0.34rem;
      line-height: 0.98rem;
      background: #fff;
      z-index: 1000;
      border-top: 1px solid #e5e5e5;
    }

    .about_online .us {
      text-align: center;
      flex: 1;
      border-right: 1px solid #e5e5e5;
    }

    .about_online .online_p {
      text-align: center;
      flex: 1;
    }

    .activeColor {
      color: #5AA2E7;
    }

  }
</style>
