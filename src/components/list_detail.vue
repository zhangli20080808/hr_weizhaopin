<template>
  <div id="interpolateDetail">
    <scroller lock-x height="-50">
      <div>
        <!--     <dl class="position_detail">
          <dt>
            <span class="color_ff8054" v-if="positionInfo.isUrgent==1">[急招]</span>
            <span>{{positionInfo.positionName}}</span>
            <span class="f_r" v-if="(isInnerEmp==1&&positionInfo.rewardAmount)||recomType==2">简历悬赏{{positionInfo.rewardAmount}}</span>
          </dt>
          <dd>
            <span>{{positionInfo.workCitySpilt}}</span>
            <span>{{positionInfo.positionSalaryLowest}}K-{{positionInfo.positionSalaryHighest}}K</span>
            <span>{{positionInfo.positionType==1?'全职':positionInfo.positionType==2?'兼职':'实习'}}</span>
            <p class="f_r color_46be8a">{{positionInfo.views}}人看过</p>
          </dd>
        </dl> -->
        <dl class="position_detail vux-1px-tb" v-show="name">
          <dt>
            <!-- <span class="urgent" v-if="list.isUrgent==1">急招</span> -->
            <img src="../common/image/urgent2.png" alt="" width="35px" class="img" v-if="positionInfo.isUrgent==1">
            <span class="position_name">{{positionInfo.positionName}}</span>
          <!--<div class="position_detail_right">-->
            <!--<em></em>-->
            <!--<span>简历悬赏: <span style="font-weight:700;">{{positionInfo.rewardAmount}}</span>元</span>-->
          <!--</div>-->
          </dt>
          <dd class="position_detail_money" v-show="positionInfo.workCitySpilt">
            <span>{{positionInfo.workCitySpilt}}</span>
            <span>{{positionInfo.positionType==1?'全职':positionInfo.positionType==2?'兼职':'实习'}}</span>
            <span>{{positionInfo.positionSalaryLowest}}K-{{positionInfo.positionSalaryHighest}}K</span>
            <!-- <div class="position_list_right">{{positionInfo.views}}人看过</div> -->
          </dd>
          <dd class="position_detail_date">
            <span>发布时间 : &nbsp;{{positionInfo.createTime}}</span> &nbsp;
            <em>浏览次数 : {{positionInfo.views}}次</em>
          </dd>
        </dl>

        <!--公司简介-->
        <div class="m_s_company" @click="toCompany" v-if="name">
          <img :src="companyHeadImg" class="item-logo" alt="">
          <div class="item-desc">
            <h2 class="item-title">{{name}}</h2>
            <p class="item-info">
              <span class="item-pos">
                {{companyValues}}
              </span></p>
            <p class="item-time">
              {{address}}  | {{domain}} | {{options[status - 1] ? options[status - 1].label : ''}} | {{s_options[dimensions - 1] ? s_options[dimensions - 1].label : ''}}</p>
          </div>
        </div>
        <!-- 职位描述 -->
        <div class="split" v-show="positionInfo.positionDesc"></div>
        <div class="pos_detail" v-if="positionInfo.positionDesc">
          <h2 class="description vux-1px-tb" >
            <span class="pos_des"></span>
            <span class="text">职位描述</span>
            <div class="have_bonus"  v-if="positionInfo.rewardAmount">
              <img src="https://aijuhr.com/miniRecruit/static/img/have_bonuss.0e8cbde.png">
            </div>
          </h2>
          <div class="description_con">
            <p v-html="positionInfo.positionDesc"></p>
          </div>
        </div>
        <div class="split" v-if="positionInfo.positionTagList"></div>
        <!-- 职位福利 -->
        <div class="pos_detail" v-if="positionInfo.positionTagList">
          <h2 class="description vux-1px-tb" >
            <span class="pos_ware"></span>
            <span class="text">职位福利</span>
          </h2>
          <div class="software">
            <ul>
              <li v-for="item in positionInfo.positionTagList">{{item.name}}</li>
            </ul>
          </div>
        </div>
        <div class="split" v-show="positionInfo.positionDesc"></div>
        <!-- 相关职位推荐 -->
        <div class="pos_detail" v-show="positionInfo.similarPositions && positionInfo.similarPositions.length!=0">
          <h2 class="description vux-1px-tb">
            <span class="recommend"></span>
            <span class="text">相关职位推荐</span>
          </h2>
          <dl class="recommendList vux-1px-tb" v-for="list in positionInfo.similarPositions" @click="goDetail(list.id)">
            <dt>
              <!-- <span class="urgent" v-if="list.isUrgent==1">急招</span> -->
              <img src="../common/image/urgent2.png" alt="" width="35px" class="img"  v-if="list.isUrgent==1">
              <span class="position_name">{{list.positionName}}</span>
            <div class="position_detail_right" v-if="(positionInfo.rewardAmount&&isInnerEmp==1)||recomType==2">
            </div>
            </dt>
            <dd class="position_detail_money">
              <span>{{filter(list.workCity)}}</span>
              <span>{{list.positionType==1?'全职':list.positionType==2?'兼职':'实习'}}</span>
              <span>{{list.positionSalaryLowest}}K-{{list.positionSalaryHighest}}K</span>
              <!-- <div class="position_list_right">{{positionInfo.views}}人看过</div> -->
            </dd>
            <dd class="position_detail_date">
              <span>发布时间 : &nbsp;{{list.createTime}}</span> &nbsp;
              <em>浏览次数 : {{list.views}}次</em>
            </dd>
          </dl>
        </div>
        <div class="logo" v-show="positionInfo.positionDesc">
          <div class="logo_img"></div>

        </div>
      </div>
    </scroller>
    <div class="share_btn ">
      <div>
        <el-row :gutter="20" v-if="recomType==1 && empAuthSucc==1">
          <el-col :span="24">
            <div class="flex-demo flex-demo2" @click="shareTipShow=true">我要分享</div>
          </el-col>
        </el-row>
        <el-row  v-else>
          <el-col :span="12"><div class="flex-demo flex-demo1" @click="shareTipShow=true">
            <span class="pos_icon1"></span><span class="text">我要分享</span>
          </div></el-col>
          <el-col :span="12"><div class="flex-demo flex-demo2" @click="join">
            <span class="pos_icon2"></span><span class="text">我要投递</span></div></el-col>
        </el-row>
      </div>
    </div>
    <div class="share" v-if="shareTipShow"  @click="shareTipShow=false">
      <div class="share_tip"></div>
    </div>

    <div v-transfer-dom>
      <x-dialog v-model="dialogShared" class="dialog-demo">
        <div @click="dialogShared=false" style="text-align:right;padding-right:10px">
          <span class="vux-close" style="color:#2C2D31;font-weight:600;"></span>
        </div>
        <div class="img-box">
          <h1>分享成功</h1>
          <img :src="sharedQrcodeUrl" style="width:165px">
          <p>扫码关注 - 获取职位分享动态</p>
        </div>
      </x-dialog>
    </div>
  </div>
</template>
<script>
  import {Flexbox, FlexboxItem,querystring,XDialog,TransferDomDirective as TransferDom,Scroller} from 'vux';
  import util from "../common/js/util.js";
  import Axios from 'axios';
  export default {
    name:'interpolateDetail',
    data(){
      return{
        shareTipShow:false,
        //职位详情信息
        positionInfo:{
          isUrgent:0,
          posiPublishTime:"",
          positionDesc:"",
          positionName:"",
          positionSalaryHighest:"",
          positionSalaryLowest:"",
          positionType:1,
          rewardAmount:"",
          views:0,
          workCity:"",
          workCitySpilt:""
        },
        //分享的参数
        companyHeadImg:null,
        companyUrl:null,
        name:null,
        imgUrl:null,
        title:null,
        desc:null,
        address:'',
        companyValues:'',
        dimensions:'',
        domain:'',
        status:'',
        id:'',
        options: [{
          value: 1,
          label: '0-50'
        }, {
          value: 2,
          label: '50-100'
        }, {
          value: 3,
          label: '100-500'
        }, {
          value: 4,
          label: '500-1000'
        }, {
          value: 5,
          label: '1000人以上'
        }],
        s_options: [{
          value: 1,
          label: '天使轮'
        }, {
          value: 2,
          label: 'A轮'
        }, {
          value: 3,
          label: 'B轮'
        }, {
          value: 4,
          label: 'C轮'
        }, {
          value: 5,
          label: 'D轮'
        }, {
          value: 6,
          label: '上市'
        }, {
          value: 7,
          label: '未融资'
        }],
        //从url里拿值
        isInnerEmp:this.$route.query.isInnerEmp,//是否显示金额
        empEmail:this.$route.query.empEmail,
        pageFrom:this.$route.query.pageFrom,//2:内推详情,4:捕手详情
        recomType:this.$route.query.recomType,//1:内推,2:捕手
        positionId:this.$route.query.positionId,
        companyId:this.$route.query.companyId,
        shareFansId:this.$route.query.shareFansId,
        fansId:this.$route.query.fansId,
        empId:this.$route.query.empId,
        empAuthSucc:this.$route.query.empAuthSucc,//1:认证成功的内部员工

        accountName:'',
        sharedQrcodeUrl:'',
        dialogShared:false,
        isSubscribe:0,//用户是否关注1:已关注,0:未关注
      }
    },
    mounted(){
      document.title="职位详情";
      document.getElementById("interpolateDetail").style.minHeight=window.innerHeight-60+'px';

      setTimeout(()=>{
        this.getPositionInfo();
        this.getWzpIndexInfo();
        this.getShareTitleInfo();
        this.getPositionInfo()
      },20)
    },
    methods:{
      getSignature(){
        var self=this;
        self.$wechat.ready(function(res){
          //分享给朋友
          self.$wechat.onMenuShareAppMessage({
            title:self.title,
            desc:self.desc,
            link:'https://aijuhr.com/wx/dist/#/wx/interpolateDetail?companyId='+self.companyId
            +"&shareFansId="+(self.recomType==1?self.shareFansId:self.fansId)
            +"&positionId="+self.positionId
            +"&empId="+self.empId
            +"&pageFrom="+self.pageFrom
            +"&recomType="+self.recomType,//分享链接
            imgUrl:self.imgUrl,//分享图标
            type:'',
            dataUrl:'',
            success:function(){
              //分享成功回调
              self.sharePosition();
              self.getWeChatOfficialAccountInfo();
            },
            cancel: function () {
              console.log('用户取消分享后执行的回调函数1');
            }
          });
          //分享朋友圈
          self.$wechat.onMenuShareTimeline({
            title:self.title,
            desc:self.desc,
            link:'https://aijuhr.com/wx/dist/#/wx/interpolateDetail?companyId='+self.companyId
            +"&shareFansId="+(self.recomType==1?self.shareFansId:self.fansId)
            +"&positionId="+self.positionId
            +"&empId="+self.empId
            +"&pageFrom="+self.pageFrom
            +"&recomType="+self.recomType,//分享链接
            imgUrl:self.imgUrl,//分享图标
            success:function(){
              //分享成功回调
              self.sharePosition();
              self.getWeChatOfficialAccountInfo();
            },
            cancel: function () {
              console.log('用户取消分享后执行的回调函数2');
            }
          })
        })
      },
      getPositionInfo(){
        let self=this;
        let method="promotionPage/positionInfo",
          param=JSON.stringify({
            id:self.positionId
          }),
          successd = (res) => {
            self.positionInfo=res.data.data.positionInfo;

          };
        self.$http(method,param,successd);
      },
      getWzpIndexInfo(){
        let self=this;
        let methods="wzpCompany/getWzpCompanyInfo",
          param=JSON.stringify({
            type:2,
            companyId:self.companyId
          }),
          successd= (res) => {
            console.log(res);
            self.companyHeadImg=res.data.data.companyHeadImg;
            self.companyUrl=res.data.data.companyUrl;
            self.name=res.data.data.name;
            self.companyValues=res.data.data.companyValues;
            self.address=res.data.data.address;
            self.domain=res.data.data.domain;
            self.status=res.data.data.status;
            self.dimensions=res.data.data.dimensions;
          };
        self.$http(methods,param,successd);
      },
      toCompany(){
        location.href="https://aijuhr.com/miniRecruit/#/about?companyId="+this.companyId;
      },
      join(){
//         self.$router.push({path:'/addResume',query:{id:this.positionId,shareFansId:self.shareFansId}})
//        location.href="https://aijuhr.com/miniRecruit/#/addResume?id="+this.positionId
//          +'&shareFansId='+this.shareFansId
//          +"&companyId="+this.companyId
//          +"&recomType="+this.recomType
//          +"&fansId="+this.fansId;
        var self=this;
        if (document.body.clientWidth<550) {
          self.$router.push({path:'/addResume',query:{id:this.positionId,companyId:self.companyId}})
          return;
        }
      },
      filter(item){
        return item.split(',')[1]
      },
      //获取分享标题
      getShareTitleInfo(){
        var self=this;
        var method="positionRecommend/getShareTitleInfo",
          param=JSON.stringify({reqType:2,companyId:self.companyId,positionId:self.positionId}),
          successd=function(res){
            self.imgUrl=res.data.data.imgUrl;
            self.title=res.data.data.title;
            self.desc=res.data.data.desc;
            self.getSignature();
          };
        self.$http(method,param,successd);
      },
      sharePosition(){
        var self=this;
        var method="positionRecommend/sharePosition",
          param=JSON.stringify({
            shareFansId:self.shareFansId,
            fansId:self.fansId,
            positionId:self.positionId,
          }),
          successd=function(res){

          };
        self.$http(method,param,successd);
      },
      //分享之后调用服务号二维码
      getWeChatOfficialAccountInfo(){
        let self=this;
        let method="positionRecommend/getWeChatOfficialAccountInfo",
          param=JSON.stringify({companyId:self.companyId,type:2,fansId:self.fansId}),
          successd=function(res){
            if(res.data.data.qrcodeUrl){
              self.sharedQrcodeUrl=res.data.data.qrcodeUrl;
              self.accountName=res.data.data.accountName ;
              self.isSubscribe=res.data.data.isSubscribe;
              if(self.isSubscribe==0&&self.sharedQrcodeUrl){
                self.dialogShared=true;
              }
            }
          }
        self.$http(method,param,successd);
      },
      goDetail(positionId){
        var self=this;

        self.$router.push({
          name:'listDetail',
          query:{
            companyId:self.companyId,
            positionId:positionId,
          }
        });
        window.location.reload()
      }
    },
    components:{
      Flexbox, FlexboxItem,querystring,XDialog,Scroller
    },
    directives:{
      TransferDom
    }
  }
</script>
<style lang="less">
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/close';
  .vux-close:before, .vux-close:after{height: 2px;}
</style>

<style scoped lang="less">
  #interpolateDetail{
    background-color: #fff;padding-bottom: 60px;
    .position_detail{
      padding: 12px 15px;font-size: 0.26rem;background-color: #fff;clear: both;margin-top: 12px;
      &::before{
        border-top: none;
      }
      dt{
        line-height: 0.4rem;height: 0.4rem;margin-bottom: 10px;font-size: 0.34rem;color: #222;
        img{
          display: inline-block;
          vertical-align: middle;
          line-height: 24px;
        }
        .position_name{
          display: inline-block;
          vertical-align: middle;
        }
        .position_detail_right{
          float: right; font-size: 0.26rem;font-weight: 500;color: #FDA732;
          em{
            background: url(../common/image/money.png) no-repeat center center;display: inline-block;width: 0.26rem;height: 0.26rem;background-size: 100% 100%;vertical-align: middle;line-height: 0.875rem;margin-top:-3px;
          }
        }

      }
      .position_detail_money{
        margin-bottom: 6px;
        color: #666;
        span{
          margin-right: 2px;background-color: #e5e5e5;padding: 3px 5px;border-radius: 2px;color: #999999;font-size: .26rem;
        }
      }
      .position_detail_date{
        color: #999;font-size: 0.26rem;margin-bottom: 0;
        em{
          font-style: normal;
        }
      }
    }
    .m_s_company {
      padding: 15px;
      background: #fff;
      height: 102px;
      .item-logo {
        display: inline-block;
        float: left;
        width: 60px;
        height: 60px;
      }
      .item-desc {
        margin-left: 70px;
        height: 1.07rem;
        position: relative;
        .item-title {
          font-size: 0.34rem;
          color: #222;
          margin-bottom: 0.12rem;
          width: 80%;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 200;
          white-space: nowrap;
        }
        .item-info {
          width: 100%;
          height: 15px;
          line-height: 15px;
          .item-pos {
            font-size: 0.26rem;
            float: left;
            width: 80%;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #999
          }
        }
        .item-time {
          font-size: 0.26rem;
          color: #999
        }
      }
    }
    .company_link{
      padding: 15px;
      position: relative;
      &::before{
        border-top: none;
      }
      dt{
        width: 60px;height: 60px;float: left;
        img{
          width: 60px;height: 60px;
        }
      }
      dd{
        margin-left: 70px;
        p{
          line-height: 30px;color: #5c6170;font-size: 0.26rem;
        }
        h6{
          font-size: 0.24rem;font-weight: 400;color: #9a9fac;line-height: 30px;
        }
        .iconfont{font-size: 12px;}
        .company_link_i{
          transform:rotate(270deg);-ms-transform:rotate(270deg);-moz-transform:rotate(270deg);-webkit-transform:rotate(270deg);-o-transform:rotate(270deg);position:absolute;right: 10px;top: 50%;margin-top:-5px;color: #bdc0c9;
        }
      }
    }
    .pos_detail{
      padding: 0 15px;
      clear: both;
      .description{
        font-size: 0.34rem;font-weight: 400;color: #000;position: relative;height: 49px;line-height: 49px;
        &::before{
          border-top: none;
        }
        .pos_des{
          display: inline-block;
          vertical-align: middle;
          width: 15px;
          height: 17px;
          background: url("../assets/img/describe.png")no-repeat center;
          background-size: cover;
        }
        .text{
          display: inline-block;
          vertical-align: middle;
          height: 24px;
          line-height: 24px;
          margin-left: 3px;
        }
        .pos_ware{
          display: inline-block;
          vertical-align: middle;
          width: 15px;
          height: 17px;
          background: url("../assets/img/welfare.png")no-repeat center;
          background-size: cover;
        }
        .recommend{
          display: inline-block;
          vertical-align: middle;
          width: 17px;
          height: 17px;
          background: url("../assets/img/recommend.png")no-repeat center;
          background-size: cover;
        }
      }
      .description_con{
        color: #666;font-size: 0.28rem;padding: 10px 0;text-align: justify;line-height: 0.4rem;
      }
      .software{
        padding: 15px 0;
        ul{
          font-size: 0;
          li{
            display: inline-block;
            padding: 2px 4px 5px;
            list-style: none;
            height: 22px;
            line-height: 20px;
            border-radius: 5px;
            text-align: center;
            color: #fff;
            background: #5AA2E7;
            font-size: 0.26rem;
            margin-right: 5px;
            margin-bottom: 5px;
          }
        }
      }
      .recommendList{
        padding: 12px 0px;font-size: 0.26rem;background-color: #fff;clear: both;
        &::before{
          border-top: none;
        }
        dt{
          line-height: 0.4rem;height: 0.4rem;margin-bottom: 10px;font-size: 0.34rem;color: #222;
          img{
            display: inline-block;
            vertical-align: middle;
            line-height: 24px;
          }
          .position_name{
            display: inline-block;
            vertical-align: middle;
          }
          .position_detail_right{
            float: right; font-size: 0.26rem;font-weight: 500;color: #FDA732;
            em{
              background: url(../assets/img/money.png) no-repeat center center;display: inline-block;width: 1rem;height: 1rem;background-size: 100% 100%;vertical-align: middle;line-height: 0.875rem;margin-top:-3px;
            }
          }
        }
        .position_detail_money{
          margin-bottom: 6px;
          color: #666;
          span{
            margin-right: 2px;background-color: #e5e5e5;padding: 3px 5px;border-radius: 2px;color: #999999;font-size: .26rem;
          }
        }
        .position_detail_date{
          color: #999;font-size: 0.26rem;margin-bottom: 0;
          em{
            font-style: normal;
          }
        }
      }
    }
    .logo{
      width: 100%;
      height: 57px;
      line-height: 57px;
      text-align: center;
      .logo_img{
        display: inline-block;
        width: 114px;
        height: 14px;
        line-height: 14px;
        background: url("../assets/img/footLogo2.png")no-repeat center;
        background-size: 103px auto;
      }

    }

    .split{
      width: 100%;
      height: 13px;
      background: #F8F8FC;
    }
    // .vux-1px-tb:before{
    //   display: none;
    // }
  }
  // .position_detail_money .position_detail_right{color: #46BE8A;}
  .have_bonus{width:75px;height: 75px;position: absolute;top: -5px;right: 25px;}
  .have_bonus img{width: 100%}
  .share_btn{position: fixed;bottom: 0;width: 100%;height: 46px;background-color: #fff;}
  .share_btn .flex-demo{text-align: center;background: red;line-height: 40px;height: 46px;}
  .share_btn .flex-demo1{background-color: #5AA2E7;color: #fff;}
  .share_btn .flex-demo1 .pos_icon1{
    display: inline-block;
    width: 17px;
    height: 20px;
    vertical-align: middle;
    background:url("../assets/img/share.png")no-repeat center;
    background-size: cover;}
  .share_btn .flex-demo1 .text{
    display: inline-block;
    height: 20px;
    line-height: 20px;
    vertical-align: middle;
    margin-left: 7px;
    font-size: 0.36rem;
  }
  .share_btn .flex-demo2 .pos_icon2{
    display: inline-block;
    width: 17px;
    height: 20px;
    vertical-align: middle;
    background:url("../assets/img/deliver.png")no-repeat center;
    background-size: cover;}
  .share_btn .flex-demo2 .text{
    display: inline-block;
    height: 20px;
    line-height: 20px;
    vertical-align: middle;
    margin-left: 7px;
    font-size: 0.36rem;
  }
  .share_btn .flex-demo2{background-color: #F2A654;color: #fff;}
  .share_btn_con{display: flex;list-style: none;justify-content: center;}
  .share_btn_con li{margin-left: 10px;}
  .share{background-color: rgba(0, 0, 0, 0.8);position: fixed;width: 100%;height: 100%;z-index: 999;top:0;left:0;}
  .share_tip{position: fixed;top:0;left: 0;width: 100%;height: 200px;background: url(https://aijuhr.com/images/yidong/sharePng.png) no-repeat center center;background-size: 80% auto;z-index: 1000;}
  .img-box h1{font-size: 0.4rem;}
  .img-box p{font-size: 0.26rem;color: #888;margin-bottom: 20px;}
</style>

