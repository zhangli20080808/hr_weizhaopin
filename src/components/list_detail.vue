<template>
  <div id="list_detail" v-show="item.positionName" ref="list">
    <!--back-->
    <div class="container hidden-xs ">
      <div>
        <div class="detail_des hidden-xs hidden-sm">
          <el-breadcrumb separator="/" class="tips">
            <el-breadcrumb-item :to="{ path: '/',query:{ companyId: this.companyId} }" class="tips_1">招聘首页
            </el-breadcrumb-item>
            <el-breadcrumb-item
              :to="{ path: '/list' ,query:{ companyId: this.companyId},params:{id:this.$route.params.id}}"
              class="tips_2">
              职位列表
            </el-breadcrumb-item>
            <el-breadcrumb-item>职位详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <div class="detail_show hidden-xs" v-show="show">
          <div class="content">
            <div class="title">{{item.positionName}}</div>
            <div class="text">
            <span
              class="des">{{getCity(item.workCity)}}/{{item.positionType === 1 ? '全职' : item.positionType === 2 ? '兼职' : '实习'
              }}</span><span class="price">{{item.positionSalaryLowest}}k-{{item.positionSalaryHighest}}k</span>
            </div>
            <div class="p_time">发布时间：{{filterTime(item.posiPublishTime)}}</div>

            <div class="post_share">
              <el-button type="primary" @click="join">申请职位</el-button>
              <el-button @click="share">分享职位</el-button>
            </div>
          </div>
        </div>
        <div class="job-page__header visible-xs">
          <div class="job-page__header__title">
            <span>{{item.positionName}}</span>
          </div>
          <div class="job-page__others">
            <span class="des"><i class="address_icon"></i>{{getCity(item.workCity)}}</span>
            <span class="price"><i class="salary_icon"></i>{{item.positionSalaryLowest}}k-{{item.positionSalaryHighest}}k</span>
            <span class="kind"><i
              class="kind_icon"></i>{{item.positionType === 1 ? '全职' : item.positionType === 2 ? '兼职' : '实习'
              }}</span>
          </div>
        </div>
        <!--公司-->
        <div class="job-page__header__link visible-xs">
          <div class="inner" @click="backIndex">
            <div class="column1">
              <div class="logo_border">
                <img :src="homeData.bigLogo" alt="">
              </div>
            </div>
            <div class="column2">
              <div class="company">{{homeData.form.company_name}}</div>
              <div class="status">
                <span class="custom-icon-text-color">{{homeData.s_log_back}}</span>
              </div>
            </div>
            <div class="column3">
              <span class="arrow_icon"></span>
            </div>
          </div>
        </div>
        <!--职位描述-->
        <div class="detail_text">
          <div class="detail_content">
            <div class="title" v-show="item">职位描述</div>
            <div class="text" v-html="item.positionDesc" ></div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="back hidden-sm hidden-lg">
      <i class="icon" @click="back"></i>
      <h2 class="title">职位详情</h2>
    </div> -->
    <scroller lock-x>
    <div class="container hidden-sm hidden-lg">
      <div>
        <div class="detail_des hidden-xs hidden-sm">
          <el-breadcrumb separator="/" class="tips">
            <el-breadcrumb-item :to="{ path: '/',query:{ companyId: this.companyId} }" class="tips_1">招聘首页
            </el-breadcrumb-item>
            <el-breadcrumb-item
              :to="{ path: '/list' ,query:{ companyId: this.companyId},params:{id:this.$route.params.id}}"
              class="tips_2">
              职位列表
            </el-breadcrumb-item>
            <el-breadcrumb-item>职位详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <div class="detail_show hidden-xs" v-show="show">
          <div class="content">
            <div class="title">{{item.positionName}}</div>
            <div class="text">
            <span
              class="des">{{getCity(item.workCity)}}/{{item.positionType === 1 ? '全职' : item.positionType === 2 ? '兼职' : '实习'
              }}</span><span class="price">{{item.positionSalaryLowest}}k-{{item.positionSalaryHighest}}k</span>
            </div>
            <div class="p_time">发布时间：{{filterTime(item.posiPublishTime)}}</div>

            <div class="post_share">
              <el-button type="primary" @click="join">申请职位</el-button>
              <el-button @click="share">分享职位</el-button>
            </div>
          </div>
        </div>

        <div class="job-page__header visible-xs">
          <div class="job-page__header__title">
            <span class="prior" v-if="item.isUrgent == 1">[急招]&nbsp;</span>
            <span>{{item.positionName}}</span>
            <!-- <div class="position_list_right">
              <i class="iconfont">&#xe624;</i>
              <span>悬赏金额: {{item.rewardAmount}}元</span>
            </div> -->
          </div>
          <div class="job-page__others">
            <span class="des"><i class="address_icon"></i>{{getCity(item.workCity)}}</span>
            <span class="price"><i class="salary_icon"></i>{{item.positionSalaryLowest}}k-{{item.positionSalaryHighest}}k</span>
            <span class="kind">
              <i class="kind_icon"></i>
              {{item.positionType === 1 ? '全职' : item.positionType === 2 ? '兼职' : '实习'}}
            </span>
            <span class="views_person">{{item.views}}人看过</span>
          </div>
        </div>
        <!--公司-->
        <div class="job-page__header__link visible-xs">
          <div class="inner" @click="backIndex">
            <div class="column1">
              <div class="logo_border">
                <img :src="homeData.bigLogo" alt="">
              </div>
            </div>
            <div class="column2">
              <div class="company">{{homeData.form.company_name}}</div>
              <div class="status">
                <span class="custom-icon-text-color">{{homeData.s_log_back}}</span>
              </div>
            </div>
            <div class="column3">
              <span class="arrow_icon"></span>
            </div>
          </div>
        </div>
        <div class="have_bonus" v-if="item.rewardAmount">
          <img src="./images/have_bonuss.png" alt="">
        </div>
        <!--职位描述-->
        <div class="detail_text">
          <div class="detail_content">
            <div class="title" v-show="item">职位描述</div>
            <!--<el-form>-->
              <!--<el-form-item>-->
                <!--<el-input  type="textarea" class="text" v-model="item.positionDesc" readonly-->
                           <!--autosize></el-input>-->
              <!--</el-form-item>-->
            <!--</el-form>-->
            <div class="text" v-html="item.positionDesc" style="line-height:0.4rem;"></div>

          </div>
        </div>
      </div>
    </div>
    </scroller>
    <div class="footer hidden-xs">
      <footer>
        <div class="title"></div>
      </footer>
    </div>

    <div class="mobile_footer visible-xs">
      <div class="post_share">
        <button @click="share" class="post_share_button">分享职位</button>
        <button type="primary" @click="join" class="post_button">我要应聘</button>
      </div>
    </div>
    <el-dialog
      class="tips2"
      title="扫码分享职位"
      :visible.sync="dialogVisible2"
      size="small"
    >
      <div class="content">
        <div class="img">
          <img :src="eLogo" alt="">
        </div>
        <div class="des">或使用链接分享</div>
      </div>
      <el-form :inline="true" :model="formShare" class="share">
        <el-form-item>
          <el-input v-model="formShare.eLink" id="copyLinkInput"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" ref="btn" @click="copyLink">复制链接</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="model" v-show="model" @click="close">
      <div class="share-arrow" v-show="arrow_tip"></div>
    </div>

  </div>
</template>
<script>
  // import Scroll from './base/scroll2'
  import {XButton, XDialog, TransferDomDirective as TransferDom,Scroller} from 'vux';
  import util from "./../common/js/util.js";
  import Axios from 'axios';
  export default {
    data() {
      localStorage.companyId=this.$route.query.companyId;
      localStorage.positionId=this.$route.query.positionId;
      document.title="职位详情";
      return {
        a: '',
        positionId: this.$route.query.positionId,
        companyId: this.$route.query.companyId,
        shareOpenId: this.$route.query.shareOpenId,
        openId: this.$route.query.openId,
        item: {
          positionName: '',
          classifyName: '',
          workCity: '',
          posiPubishTime: '',
          positionType: 1,
          positionSalaryLowest: '',
          positionSalaryHighest: '',
          positionDesc: ''
        },
        dialogVisible2: false,
        formShare: {
          eLink: ''
        },
        eLogo: '',
        show: false,
        arrow_tip: false,
        model: false,
        showDialogStyle: false,
        hiddens: true,
        title:'',
        desc:'',
        imgUrl:'',

      }
    },
    props: {
      homeData: {
        type: Object
      }
    },
    directives: {
      TransferDom
    },
    created() {
      var ua = navigator.userAgent.toLowerCase();
      var isWeixin = ua.indexOf('micromessenger') != -1;
      if(isWeixin){
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
          return false;
        }
      }
    },
    mounted(){
      this.probeType = 3
      this.listenScroll = true
      this._getDetail()
      if (this.$route.query.companyId) {
        this.companyId = this.$route.query.companyId;
        localStorage.companyId=this.companyId;
      }
      if (this.$route.params.id) {
        this.id = this.$route.params.id
      }
      if (this.$route.name !== 'home') {
        this.hiddens = false
//          document.getElementById('list_detail').style.paddingTop = 0
      }
      this.getShareTitleInfo();
    },
    methods: {
      //获取微信的code
      getCode(scope){
        var self=this;
        Axios.post(util.wxUrl,'companyId='+self.companyId+'&scope='+scope+'&positionId='+self.positionId+'&shareOpenId='+self.shareOpenId+'&recomType=2')
        .then(function(res){
          console.log(res);
          if(res.data.userExsitSession==2){
            location.href=res.data.code_url;
          }else if(res.data.userExsitSession==1){
            self.openId=res.data.openId;
            // if(self.shareOpenId==""||!self.shareOpenId){
            //   self.shareOpenId=self.openId;
            // }
            self.getSignature();
            if(self.openId==''){
              self.$router.push({name:'listDetail',query:{companyId:self.companyId,openId:self.openId,positionId:self.positionId,shareOpenId:self.shareOpenId}});
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
              link:'https://aijuhr.com/miniRecruit/#/listDetail?companyId='+self.companyId+"&shareOpenId="+self.openId+"&positionId="+self.positionId,//分享链接
              imgUrl:self.imgUrl,//分享图标
              type:'',
              dataUrl:'',
              success:function(){
                console.log('分享成功1');
                self.sharePosition();
              },
              cancel: function () {
                console.log('用户取消分享后执行的回调函数1');
              }
            });
            //分享朋友圈
            self.$wechat.onMenuShareTimeline({
              title:self.title,
              desc:self.desc,
              link:'https://aijuhr.com/miniRecruit/#/listDetail?companyId='+self.companyId+"&shareOpenId="+self.openId+"&positionId="+self.positionId,//分享链接
              imgUrl:self.imgUrl,//分享图标
              success:function(){
                console.log('分享成功2');
                self.sharePosition();
              },
              cancel: function () {
                console.log('用户取消分享后执行的回调函数2');
              }
            })

          })
        })
      },
      //分享回调
      sharePosition(){
        var self=this;
        var method="positionRecommend/sharePosition",
            param=JSON.stringify({
              shareOpenId:self.openId,
              positionId:self.positionId
            }),
            successd=function(res){};
        self.$http(method,param,successd);
      },
      //处理边界情况的一些常用手段 如果用户在这个地方不小新刷新了
      _getDetail() {

        var _this = this;
        var method = "promotionPage/positionInfo";
        var param = JSON.stringify({
          id: _this.positionId
        });
        console.log(param)
        var successd = function (res) {
          if (res.data.code == 0) {
              console.log(res.data.data)
            _this.item = res.data.data.positionInfo
            _this.show = true
          }
        }
        _this.$http(method, param, successd);
      },
      //过滤
      filter(item){
        return JSON.parse(item)
      },
      getCity(item){
        return item.split(',')[1]
      },
      join() {
        var self=this;
        if (document.body.clientWidth<550) {
          console.info(self.shareOpenId);
          self.$router.push({path:'/addResume',query:{id:this.positionId,shareOpenId:self.shareOpenId}})
          return;
        }
        self.$router.push({
          path: '/apply',
          query: {
            companyId: self.companyId,
            id:self.positionId
          }

        })
      },
      backIndex() {
        this.$router.push({
          path: `/`,
          query: {
            companyId: this.companyId,
          }
        })
      },
      filterTime(item){
        if (item) {
          return item.substr(0, 10)
        } else {
          return '';
        }

      },
      share() {
        if (document.documentElement.clientWidth > 768) {
          this.dialogVisible2 = true
          var _this = this;
          var method = "recruitPosition/sharePosition";
          var param = JSON.stringify({
            positionId: _this.positionId
          });
          var successd = function (res) {
            if (res.data.code == 0) {
              console.log(res.data)
              _this.eLogo = res.data.data[0]
              _this.formShare.eLink = res.data.data[1]
            }
          }
          _this.$http(method, param, successd);
        } else {
          this.model = true
          this.arrow_tip = true

        }
      },
      copyLink(){

        var self = this;
        document.getElementById("copyLinkInput").children[0].select();
        document.execCommand("Copy");
        self.$message({
          message: "复制成功",
          type: 'success'
        })
      },
      close(){
        this.model = false
        this.arrow_tip = false
      },
      back() {
        this.$router.goBack()
        this.$router.push({
          path: '/list',
          name: 'List',
          query: {
            companyId: this.companyId,
          }
        })
      },
      getShareTitleInfo(){
        var self=this;
        var method="positionRecommend/getShareTitleInfo",
            param=JSON.stringify({reqType:2,companyId:self.companyId,positionId:self.positionId}),
            successd=function(res){
              self.imgUrl=res.data.data.imgUrl;
              self.title=res.data.data.title;
              self.desc=res.data.data.desc;
            };
        self.$http(method,param,successd);
      }
    },
    components: {
      Scroller,
      XButton,
      XDialog
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/mixin.styl"
  @import "../common/stylus/base.styl"
  #list_detail
    .tips2
      .el-dialog--small
        width: 428px;
        height: 404px
        box-sizing: border-box
        top: 50% !important
        margin-top: -212px
        display: block
        .el-dialog__body
          height: 424px
      .content
        text-align: center
        .img
          display: inline-block
          width: 210px
          height: 210px
          img
            width: 100%;
            height: 100%;
        .title
          margin: 51px 0 22px 0
          font-size: 20px
          color: #1F2D3D
          font-weight: 800
        .des
          text-align: left
          margin-top: 26px
          margin-bottom: 15px
          color: #475669
          font-size: 14px
          padding-left: 17px;
      .share
        padding: 0;
        .el-form-item
          margin-bottom: 0
          margin-right: 0
          .el-form-item__content
            .el-input
              width: 284px
              .el-input__inner
                border: 1px solid #5AA2E7;
            .el-button
              &:hover
                background: #46BE8A

    .container
      .detail_des
        background: #fff
        position: relative
        height: 52px
        line-height: 52px
        border-bottom: 1px solid #E5E9F2
        margin-top: 20px

        .tips
          position: absolute
          left: 23px
          top: 19px
          height: 16px
          line-height: 16px
          .tips_1, .tips_2 {
            .el-breadcrumb__item__inner, .el-breadcrumb__item__inner a, .el-breadcrumb__separator {
              color: #5AA2E7
            }
          }
      .detail_show
        height: 126px
        background: #fff
        padding: 21px 0 18px 24px
        margin-bottom: 20px
        border-bottom: 1px solid #E5E9F2
        .content
          position: relative
          .post_share
            position: absolute
            width: 222px
            height: 40px
            line-height: 40px
            right: 30px
            top: 0
          .title
            font-size: 20px
            color: #1F2D3D
            margin-bottom: 14px
          .text
            height: 16px
            line-height: 16px
            .des
              display: inline-block
              font-size: 16px
              color: #475669
              margin-right: 23px
            .price
              display: inline-block
              font-size: 18px
              color: #F96868
          .p_time
            margin-top: 23px
            font-size: 16px
            color: #99A9BF
      .detail_text
        background: #fff
        padding: 19px 0 29px 23px
        .detail_content
          .title
            margin-bottom: 20px
            font-size: 16px
          .el-form
            .el-form-item
              .el-form-item__content
                .text
                  outline: none
                  border: none
                  .el-textarea__inner
                    min-height: 300px
                    border: none !important
                    outline: none !important
          .des_p
            width: 100%
            background: #fff
            border: none
            outline: none
            height: 400px
            line-height: 2
            font-size: 14px
            color: #333

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

  @media all and (max-width: 767px)
    #list_detail
      position: fixed
      top: 0
      left: 0
      overflow: auto
      width: 100%
      height: 100%
      background: #fff
      .container
        padding: 0
        margin: 0
        height: 100%
        padding-bottom: 1.12rem
        .detail_des
          background: #fff
          position: relative
          height: 52px
          line-height: 52px
          border-b-1px(#E5E9F2)
          margin-top: 20px

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
              .icon1
                display: inline-block
                float: left
                width: 6px
                height: 12px
                margin: 0 10px
                color: #99A9BF
              .nav_item
                float: left
                font-size: 14px
                width: 56px
                height: 16px
                text-align: center
                color: #99A9BF
                &:nth-child(1), &:nth-child(3)
                  color: #5AA2E7
        .detail_show
          height: 3.16rem
          background: #fff
          padding: 0.37rem 0 0.3rem 0.30rem
          border-bottom: 1px solid #E5E9F2
          margin-bottom: 0

          .content
            position: relative
            .post_share
              position: relative
              width: 222px
              height: 0.8rem
              line-height: 0.8rem
              left: 0
              .weui-btn_mini
                display: inline-block
                vertical-align: top
                background: #5aa2e7
              .weui-btn_default
                margin-left: 0
                display: inline-block
                vertical-align: top
                margin-top: 0
                background: #F8F8F8
            .title
              font-size: 0.28rem
              color: #1F2D3D
              margin-bottom: 0
            .text
              height: 0.25rem
              line-height: 0.25rem
              margin-top: 0.25rem
              .des
                display: inline-block
                font-size: 0.24rem
                color: #475669
                margin-right: 0.36rem
                vertical-align: middle
              .price
                display: inline-block
                font-size: 0.26rem
                vertical-align: middle
                color: #F96868
            .p_time
              height: 0.23rem
              line-height: 0.23rem
              font-size: 0.24rem
              color: #99A9BF
              margin-bottom: 0.38rem
              margin-top: 0.5rem
        .detail_text
          width: 100%;
          background: #fff;
          margin-top: 0.4rem
          padding: 0;
          padding-bottom :1.12rem
          .detail_content
            padding: 0.39rem 0.32rem 0.3rem 0.27rem
            color: #1F2D3D
            font-size: 0.28rem
            .title
              font-weight: 500;
              margin-bottom: 10px;
              border-bottom: 1px solid #f4f4f6;
              padding-bottom: 8px;
              font-size: 0.3rem;
              color: #333;
            .el-form
              .el-form-item
                .el-form-item__content
                  .text
                    outline: none
                    border: none
                    .el-textarea__inner
                      color: #5c6170 !important
                      font-size: 0.28rem
                      line-height: 18px
                      overflow: hidden
                      border: none !important
                      outline: none !important
            .des_p
              width: 100%
              background: #fff
              border: none
              outline: none
              height: 8rem
              line-height: 2
              font-size: 0.28rem
              color: #333

        .job-page__header
          position: relative;
          padding: 20px 12px 12px;
          background-color: #fff;
          border-radius: 1px;
          .job-page__header__title
            width: 100%
            font-size: 0.32rem;
            font-weight: bold;
            vertical-align: middle;
            color: #5c6170;
            .prior
              color: #ff8054
          .job-page__others
            position: relative;
            font-size: 0.28rem
            margin-top: 0.3rem;
            min-height: 20px;
            color: #5c6170;
            .des {
              display: inline-block
              font-size: 0.28rem
              color: #666
              height: 14px
              line-height: 14px
              margin-right: 0.4rem
              vertical-align: middle
              position: relative
              padding-left: 0.4rem
              .address_icon {
                display: inline-block
                vertical-align: top
                position: absolute
                width: 22px
                height: 14px
                top: -1px
                left: -4px
                background: url(../common/image/address.png) no-repeat center
                background-size: 50%
              }
            }
            .price {
              display: inline-block
              font-size: 0.28rem
              height: 14px
              line-height: 14px
              color: #666
              vertical-align: middle
              margin-right: 0.4rem
              position: relative
              padding-left: 0.62rem
              .salary_icon {
                display: inline-block
                position: absolute
                width: 26px
                height: 14px
                line-height: 14px
                top: -0.02rem
                left: 0
                background: url(../common/image/salary.png) no-repeat center
                background-size: 50%
              }
            }
            .kind {
              display: inline-block
              font-size: 0.28rem
              color: #666
              vertical-align: middle
              margin-top: 0
              height: 14px
              line-height: 14px
              position: relative
              padding-left: 0.42rem
              .kind_icon {
                display: inline-block
                position: absolute
                width: 15px
                height: 14px
                top: 0
                left: 0
                background: url(../common/image/kind_icon.png) no-repeat center
                background-size: 50%
              }
            }

        .job-page__header__link {
          display: block;
          background: #fff;
          padding: 0 12px;
          .inner {
            padding: 18px 0;
            border-top: 1px #f4f4f6 solid;
            display: flex;
            .column1 {
              .logo_border {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 56px;
                max-width: 200px;
                min-width: 56px;
                margin-right: 12px;
                border: 1px solid #dddfe3;
                border-radius: 2px;
                img {
                  width: 1.07rem;
                  height: 1.07rem;
                }
              }
            }
            .column2 {

              .company {
                max-width: 160px;
                -o-text-overflow: ellipsis;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-top: 10px;
                font-size: 15px;
                color: #5c6170;
              }
              .status {
                margin-top: 6px;
                background-color: #fff;
                text-align: left;
                font-size: 13px;
                line-height: 20px;
                color: #9a9fac;
                max-width: 4rem
                overflow: hidden
                -o-text-overflow: ellipsis;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
            .column3 {
              margin: auto 0 auto auto;
              font-size: 16px;
              color: #bcbfc8;
              position: relative
              .arrow_icon {
                display: inline-block
                width: 10px
                height: 18px
                background: url(../common/image/Backicon.png) no-repeat center
                background-size: 50%
                position: absolute
                top: -5px
                right: 0
              }
            }
          }
        }
      .detail-close
        position :relative
        width :100%
        height :32px
        clear: both
        font-size :0.32rem
        background :url(../common/image/footLogo.png)no-repeat center
        background-size :100%
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
      .footer
        position: relative
        width: 100%
        bottom: 0
        left: 0
        height: 1rem
        line-height: 1rem
        footer
          background: #F7F7F7
          height: 1rem !important
          line-height: 1rem !important
          width: 100%
          .title
            width: 100%
            height: 100%
            text-align: center
            color: #5c6170 999
            font-size: 0.14rem
            background: url(../common/image/footer_logo.png) no-repeat center

      .model
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 2000
        .share-arrow {
          position: fixed;
          width: 100%;
          right: 0;
          top: 0;
          height: 4rem;
          /*background: url('https://aijuhr.com/images/yidong/tips.67d28c9.png') no-repeat center;*/
          background: url('https://aijuhr.com/images/yidong/sharePng.png') no-repeat center;
          z-index: 3000;
          background-size: 80% auto;
        }
      .mobile_footer {
        position: fixed;
        left: 0;
        right: 0;
        z-index: 100;
        height: 1.2rem;
        bottom: 0
        padding-left: 20px;
        padding-right: 20px;
        background-color: #fff;
        box-shadow: 0 0 3px #bcbfc8;
        text-align: center
        padding-bottom: 10px
        padding-top: 7.5px;
        .post_share {
          .post_share_button {
            display: inline-block;
            vertical-align: top;
            height: 0.9rem;
            line-height: 0.9rem;
            border-radius: 2px;
            width: 44%;
            border: 1px solid #5AA2E7;
            background-color: #fff;
            font-size: 14px
            outline: none
          }
          .post_button {
            display: inline-block;
            width: 44%;
            vertical-align: top;
            height: 0.9rem;
            line-height: 0.9rem;
            border-radius: 2px;
            color: #fff
            font-size: 14px
            background: #5AA2E7
            outline: none
            border: none
          }
        }

      }

    .tips2
      .el-dialog--small
        width: 100%
        height: 7.09rem
        box-sizing: border-box
        top: 50% !important
        margin-top: -3.15em
        display: none
        .el-dialog__header
          position: relative
          .el-dialog__title
            position: absolute
            font-size: 0.28rem
        .el-dialog__body
          padding: 0.54rem 0 0 0
          height: 6.37rem
          .content
            text-align: center
            .img
              display: inline-block
              width: 3.70rem
              height: 3.7rem
              img
                width: 100%
                height: 100%
            .des
              margin: 0.46rem 0 0.15rem 0.35rem
              font-size: 0.24rem
              color: #475669

          .share
            padding: 0 0.35rem
            .el-form-item
              margin-bottom: 0
              margin-right: 0
              .el-form-item__content
                .el-input
                  width: 5rem
                  .el-input__inner
                    border: 1px solid #5AA2E7
                .el-button
                  margin-left: -0.4rem
                  span
                    font-size: 0.28rem
                  &:hover
                    background: #46BE8A

  @media (min-width: 768px) and (max-width: 992px)
    #list_detail

      header
        height 80px
        line-height 80px
        .navbar-sample
          background-color: #fff
          border-color: #f5f5f5
          margin-bottom: 0
          top: 0
          width: 100%
          z-index: 1000
          .navbar-header
            height 84px

          .navbar-brand
            height: 80px
      .container
        width: 100%
        padding: 0
        margin: 0
        .detail_des
          background: #fff
          position: relative
          height: 52px
          line-height: 52px
          border-bottom: 1px solid #E5E9F2
          margin-top: 20px

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
                font-size: 16px
              .icon1
                display: inline-block
                float: left
                width: 6px
                height: 12px
                margin: 0 10px
                font-size: 16px
                color: #99A9BF
              .nav_item
                float: left
                font-size: 14px
                width: 56px
                height: 16px
                text-align: center
                color: #99A9BF
                &:nth-child(1), &:nth-child(3)
                  color: #5AA2E7
        .detail_show
          height: 114px
          background: #fff
          padding: 21px 0 18px 24px
          margin-bottom: 20px
          border-bottom: 1px solid #E5E9F2
          .content
            position: relative
            .post_share
              position: absolute
              width: 222px
              height: 40px
              line-height: 40px
              right: 30px
              top: 0
            .title
              font-size: 18px
              color: #1F2D3D
              margin-bottom: 14px
            .text
              height: 14px
              line-height: 14px
              .des
                display: inline-block
                font-size: 14px
                color: #475669
                margin-right: 23px
                vertical-align: middle
              .price
                display: inline-block
                font-size: 16px
                color: #F96868
                vertical-align: middle
            .p_time
              margin-top: 23px
              font-size: 14px
              color: #99A9BF
        .detail_text
          background: #fff
          height: 100%
          font-size: 14px
          padding: 19px 0 29px 23px

      .tips2
        .el-dialog--small
          width: 100%
          height: 7.09rem
          box-sizing: border-box
          top: 50% !important
          margin-top: -3.15em
          .el-dialog__header
            position: relative
            .el-dialog__title
              position: absolute
              font-size: 0.28rem
          .el-dialog__body
            padding: 0.54rem 0 0 0
            height: 6.37rem
            .content
              text-align: center
              .img
                display: inline-block
                width: 3.70rem
                height: 3.7rem
                background: yellow
              .des
                margin: 0.46rem 0 0.15rem 0.35rem
                font-size: 0.24rem
                color: #475669

            .share
              padding: 0 0.35rem
              .el-form-item
                margin-bottom: 0
                margin-right: 0
                .el-form-item__content
                  .el-input
                    width: 5rem
                    .el-input__inner
                      border: 1px solid #5AA2E7
                  .el-button
                    margin-left: -0.4rem
                    span
                      font-size: 0.28rem
                    &:hover
                      background: #46BE8A


</style>
<style scoped>
@import url(./css/main.css);
.views_person{float: right;color: #46BE8A;}
.position_list_right{float: right; font-size: 0.28rem;}
.position_list_right .iconfont{color:#F2A654;font-size: 0.28rem;}
.have_bonus{position: absolute;right: 0.5rem;top:3.5rem;width: 1.5rem;height: 1.5rem;}
.have_bonus img{width: 100%;height: 100%;}
</style>

