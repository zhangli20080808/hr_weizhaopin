<template>
    <div id="positionList">
      <scroller lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="100">
        <div>
          <x-img :src="picUrl" style="width:100%;height:4rem"></x-img>
          <group gutter="0px">
            <!-- <p v-for="i in bottomCount">placeholder {{i}}</p> -->
            <dl class="vux-1px-b position_list" v-for="list in lists" @click="goDetail(list.positionId)" :key="list.positionId">
              <dt>
                <span class="color_F96868" v-if="list.isUrgent==1">[急招]</span>
                <span>{{list.positionName}}</span>
                <div class="position_list_right">
                  <em></em>
                  <span v-if="list.rewardAmount">悬赏金额: {{list.rewardAmount}}元</span>
                </div>
              </dt>
              <dd class="position_list_money">
                <span>{{list.workCitySpilt}}/{{list.positionType==1?'全职':list.positionType==2?'兼职':'实习'}}</span>
                <span>{{list.positionSalaryLowest}}K-{{list.positionSalaryHighest}}K</span>
                <div class="position_list_right">{{list.views}}人看过</div>
              </dd>
              <dd class="position_list_date">发布时间:{{list.posiPublishTime}}</dd>
            </dl>     
            <load-more tip="loading" v-if="onFetching && nonceStr"></load-more>
            <load-more :show-loading="false" tip="我是有底线的" background-color="#fbf9fe" v-if="!onFetching || !nonceStr"></load-more>
            <div class="footer"></div>
          </group>
        </div>
      </scroller>
    </div>
</template>
<script>
  import { XImg,Group,Cell,Scroller,LoadMore } from 'vux'
  import util from "../../common/js/util.js";
  import Axios from 'axios';
export default {
  name:'positionList',
  data(){
    document.getElementsByTagName('title')[0].innerHTML="热招职位";
    console.log(util);
    localStorage.companyId=this.$route.query.companyId;
    return{
      footerFixed:false,
      pageNum:1,
      pageSize:10,
      companyId:this.$route.query.companyId || null,
      lists:[],
      picUrl:'',
      onFetching:false,
      nonceStr:true,
      shareOpenId:this.$route.query.shareOpenId || null,
      // shareOpenId:'oTNQS0ktYqzINgWc5Z9HK_1b__HA',
      openId:this.$route.query.openId || null,
      imgUrl:'',
      title:'',
      desc:'',
    }
  },
  mounted(){
    if(this.$route.query.is_auth==0){
      //没有静默授权成功
      // console.log("授权失败");
      this.getCode('snsapi_userinfo');
    }else if(this.$route.query.is_auth==1){
      //授权成功
      // console.log("授权成功");
      this.getSignature();
    }else{
      // console.log("开始请求");
      this.getCode('snsapi_userinfo');
    }
    this.getRecommendPosiList();
    this.getShareTitleInfo();
  },
  methods:{
    getCode(scope){
      var self=this;
      Axios.post(util.wxUrl,'companyId='+self.companyId+'&scope='+scope+'&shareOpenId='+self.shareOpenId)
      .then(function(res){
        console.log(res);
        if(res.data.userExsitSession==2){
          location.href=res.data.code_url;
        }else if(res.data.userExsitSession==1){
          self.openId=res.data.openId;
          if(self.shareOpenId=""){
            self.shareOpenId=self.openId;
          }
          self.getSignature();
          if(self.openId==''){
            self.$router.push({name:'positionList',query:{companyId:self.companyId,openId:self.openId,shareOpenId:self.shareOpenId}});
          }
        }
      })
    },
    getSignature(){
      var self=this;
      Axios.post(util.wxSignature,'url='+encodeURIComponent(location.href.split('#')[0]))
      .then(function(res){
        self.$wechat.config({
          debug:false,
          appId:res.data.appid,
          timestamp:res.data.timestamp,
          nonceStr:res.data.noncestr,
          signature:res.data.signature,
          jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'translateVoice',
            'startRecord',
            'stopRecord',
            'onVoiceRecordEnd',
            'playVoice',
            'onVoicePlayEnd',
            'pauseVoice',
            'stopVoice',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'closeWindow',
            'scanQRCode',
            'chooseWXPay',
            'openProductSpecificView',
            'addCard',
            'chooseCard',
            'openCard'
          ]
        });
        self.$wechat.ready(function(res){
          //分享给朋友
          self.$wechat.onMenuShareAppMessage({
            title:self.title,
            desc:self.desc,
            link:'https://aijuhr.com/miniRecruit/#/positionList?companyId='+self.companyId+"&shareOpenId="+self.openId,//分享链接
            imgUrl:self.imgUrl,//分享图标
            type:'',
            dataUrl:'',
            success:function(){
              console.log('分享成功1');
            },
            cancel: function () { 
              console.log('用户取消分享后执行的回调函数1');
            }
          });
          //分享朋友圈
          self.$wechat.onMenuShareTimeline({
            title:self.title,
            desc:self.desc,
            link:'https://aijuhr.com/miniRecruit/#/positionList?companyId='+self.companyId+"&shareOpenId="+self.openId,//分享链接
            imgUrl:self.imgUrl,//分享图标
            success:function(){
              console.log('分享成功2');
            },
            cancel: function () { 
              console.log('用户取消分享后执行的回调函数2');
            }
          })

        })
      })
    },
    index(){
      var self=this;
      this.$nextTick(function(){
        var wh = window.innerHeight;
        var dh = document.getElementById('positionList').clientHeight;
        if(wh>=dh){
          self.footerFixed=true;
        }
      })
    },
    getRecommendPosiList(){
      var self=this;
      var method="positionRecommend/getRecommendPosiList",
          param=JSON.stringify({
            pageSize:self.pageSize,
            pageNum:self.pageNum,
            companyId:self.companyId,
            type:2,
          }),
          successd=function(res){
            console.log(res);
            self.lists=res.data.data.positionList;
            self.picUrl=res.data.data.picUrl;
            if(res.data.data.count<=self.pageSize){
              self.nonceStr=false;
            }
          };
      self.$http(method,param,successd);
    },
    onScrollBottom () {
      if (this.onFetching) {
        // do nothing
      } else {
        this.onFetching = true
        setTimeout(() => {
          this.pageSize += 10
          this.getRecommendPosiList();
          this.$nextTick(() => {
            this.$refs.scrollerBottom.reset()
          })
          this.onFetching = false
        }, 2000)
      }
    },
    goDetail(positionId){
      var self=this;
      self.$router.push({name:'listDetail',query:{companyId:self.companyId,openId:self.openId,shareOpenId:self.shareOpenId,positionId:positionId}});
    },
    //获取分享标题
    getShareTitleInfo(){
      var self=this;
      var method="positionRecommend/getShareTitleInfo",
          param=JSON.stringify({reqType:1,companyId:self.companyId}),
          successd=function(res){
            self.imgUrl=res.data.data.imgUrl;
            self.title=res.data.data.title;
            self.desc=res.data.data.desc;
          };
      self.$http(method,param,successd);
    }
  },
  components:{
    XImg,Group,Cell,Scroller,LoadMore
  }
}
</script>
<style lang="less">
    @import '~vux/src/styles/1px.less';
</style>
<style scoped>
@import url(../css/main.css);
.padding_bottom{padding-bottom: 1.28rem;}
.position_list{padding: 10px 15px;font-size: 0.32rem;}
.position_list dt{line-height: 0.5rem;height: 0.5rem;margin-bottom: 10px;}
.position_list_right{float: right; font-size: 0.28rem;}
.position_list_right em{background: url(../images/shangjin.png) no-repeat center center;display: inline-block;width: 0.3rem;height: 0.3rem;background-size: 100% 100%;vertical-align: middle;line-height: 0.28rem;}
.position_list dd{margin-bottom: 10px;}
.position_list_money{color: #666;}
.position_list_money .position_list_right{color: #46BE8A;}
.position_list_date{color: #999;font-size: 0.28rem;}
.footer{width: 100%;height: 1.28rem;background: url(../images/footLogo.png) no-repeat center center;background-size: 100% auto;}
.footer_fixed{position: fixed;bottom: 0;}
</style>