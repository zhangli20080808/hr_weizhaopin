<template>
  <div class="personal">
    <!--头像 名字 认证s-->
    <div class="personal_top">
      <div class="personal_content">
        <img class="img" :src="personalInfo.headImgUrl">
        <div class="name">{{personalInfo.name}}</div>
        <div class="personal_sign">
          <span class="personal_yg" v-if="personalInfo.isEmployeeCertification == 1"  @click="goAuthentification"></span>
          <span class="personal_hunt" v-if="personalInfo.isNotEmployeeCertification == 1"  @click="goAuthentification"></span>
          <span class="authentication" @click="goAuthentification('3')" v-if="personalInfo.isEmployeeCertification == 0||personalInfo.isNotEmployeeCertification == 0"></span>
        </div>
      </div>
    </div>
    <!--个人档案 求职纪录 收藏职位 我的推荐--> 
    <div class="personal_bottom">
      <div class="container_content">
        <div class="detail_header_item" @click="joinRecord">
          <span class="item_icon_1"></span>
          <span class="text">个人档案</span>

          <span class="personal_icon"></span>
          <div>
          </div>
        </div>
        <div class="detail_header_item" @click="jobRecord">
          <span class="item_icon_2"></span>
          <span class="text">求职记录</span>

          <span class="personal_icon"></span>
          <div>
          </div>
        </div>
        <div class="detail_header_item" @click="joinFavourite">
          <span class="item_icon_3"></span>
          <span class="text">收藏职位</span>

          <span class="personal_icon"></span>
          <div>
          </div>
        </div>
        <div class="detail_header_item detail_no_border" @click="joinCommend">
          <span class="item_icon_4"></span>
          <span class="text">我的推荐</span>

          <span class="personal_icon"></span>
          <div>
          </div>
        </div>
      </div>
      <div v-transfer-dom>
        <confirm v-model="show"
                 @on-cancel="onCancel"
                 @on-confirm="onConfirm"
                 @on-show="onShow"
                 :title="description"
                 @on-hide="onHide">
          <p style="text-align:center;">gsgsg</p>
        </confirm>
      </div>
    </div>

  </div>
</template>

<script>
  import {Confirm, Group, XSwitch, XButton, TransferDomDirective as TransferDom} from 'vux'
  export default {
    data(){
      document.title = '个人中心';
      return {
        show: false,
        description: '确认难割难舍开工',
        authSuccess: this.$route.query.authSuccess,
        companyId: this.$route.query.companyId,
        fansId: this.$route.query.fansId,
        personalInfo: {
          headImgUrl:null,
          name:'',
          isEmployeeCertification:null,
          isEmployeeCertification:null,
        },
        pageFrom:1,
        isEmployeeCertification: 0,     //员工认证 （0：没有认证过，1:已经认证过）
        isNotEmployeeCertification: 0,  //求职者认证 （0：没有认证过，1:已经认证过）
      }
    },
    methods: {
      gsg(){
        this.show = true;
      },
      onHide () {
        console.log('on hide')
      },
      onShow () {
        console.log('on show')
      },
      onCancel () {
        console.log('on cancel')
      },
      onConfirm (msg) {
        console.log('on confirm')
        if (msg) {
          alert(msg)
        }
      },
      jobRecord(){
        this.$router.push({
          name: 'jobRecord',
          query: {
            companyId: this.companyId,
            fansId: this.fansId
          }
        });
      },
      joinFavourite(){
        this.$router.push({
          name: 'favourite',
          query: {
            companyId: this.companyId,
            fansId: this.fansId
          }
        });
      },
      getWeixinPersonalInfo(){
        var _this = this;
        var method = "wexinPersonalInfo/getWeixinPersonalInfo";
        var param = JSON.stringify({
          companyId: this.companyId,
          fansId: this.fansId
        });
        var successd = function (res) {
          if (res.data.code == 0) {
            _this.personalInfo = res.data.data.weixinPersonalInfo;
            if( _this.personalInfo.headImgUrl == ''|| _this.personalInfo.headImgUrl== null){
              _this.personalInfo.headImgUrl = 'https://aijuhr.com/images/yidong/head_wx.png';
            }
           _this.isEmployeeCertification =  _this.personalInfo.isEmployeeCertification;
           _this.isNotEmployeeCertification =  _this.personalInfo.isNotEmployeeCertification;
          }
        }
        _this.$http(method, param, successd);
      },
      goAuthentification(item){
        let firstOption,SecondOption,thridOption,forthOption,thirdSign,fourSign;
        //都没验证 firstOption
        //都验证  SecondOption
        //员工验证 求职者没验证  thridOption
        //求职者验证 员工美验证 forthOption
        if(this.isEmployeeCertification==0&&this.isNotEmployeeCertification==0){
          firstOption = true;
        }else if(this.isEmployeeCertification==1&&this.isNotEmployeeCertification==1){
          SecondOption = true;
        }else if(this.isEmployeeCertification==1&&this.isNotEmployeeCertification==0){
          thridOption = true;     
          if(item == 3){
            thirdSign = true;
          }    
        }else{
          forthOption = true;
          if(item == 3){
            fourSign = true;
          }
        }
        this.$router.push({
          name: 'authentification',
          path:'/authentification',
          query: {
            companyId: this.companyId,
            fansId: this.fansId,
            firstOption:firstOption,
            SecondOption:SecondOption,
            thridOption:thridOption,
            forthOption:forthOption,
            thirdSign:thirdSign,
            fourSign:fourSign
          }
        })
      },
      userAuthUrl(){
        var self = this;
        var method = "weixin/userAuthUrl",
          param = {
            scope: 'snsapi_userinfo',
            pageFrom: 1,
            companyId: self.companyId
          },
          successd = function (res) {
            if (res.data.userSession == 0&&self.authSuccess!=1) {
              location.href = res.data.userAuthUrl;
            }
          };
        self.$webHttp(method, param, successd);
      },
      joinCommend(){
        location.href = "https://aijuhr.com/wx/dist/#/wx/recommendedSchedule?companyId=" + this.companyId+ "&fansId=" + this.fansId;
      },
      joinRecord(){
         this.$router.push({
          name: 'resumePreview',
          query: {
            companyId: this.companyId,
            fansId: this.fansId
          }
        })
      }
    },
    mounted(){
      this.userAuthUrl();
      this.getWeixinPersonalInfo();
    },
    directives: {
      TransferDom
    },
    components: {
      Confirm,
      Group,
      XSwitch,
      XButton
    }
  }

</script>

<style scoped lang="less">
  @import "../../common/stylus/boder";

  .personal {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    background: #F8F8FC;
    .personal_top {
      background: #fff;
      height: 4.06rem;
      .personal_content {
        text-align: center;
        padding-top: 0.3rem;
        .img {
          display: inline-block;
          width: 1.64rem;
          height: 1.64rem;
          border-radius: 50%;
        }
        .name {
          margin: 0.22rem 0 0.46rem 0;
          font-size: 0.37rem;
          color: #000;
        }
        .personal_sign {
          width: 100%;
          height: 0.41rem;
          margin-top: 0.15rem;
          font-size: 14px;
          .personal_yg {
            display: inline-block;
            vertical-align: middle;
            width: 0.98rem;
            height: 0.4rem;
            background: url(../../common/image/personal/DynamicRemember.png) no-repeat center;
            background-size: 100%;
          }
          .personal_hunt {
            display: inline-block;
            vertical-align: middle;
            width: 1.24rem;
            height: 0.4rem;
            background: url(../../common/image/personal/Dynamic.png) no-repeat center;
            background-size: 100%;
          }
          .authentication {
            display: inline-block;
            vertical-align: middle;
            width: 1.25rem;
            height: 0.4rem;
            background: url(../../common/image/personal/authentication.png) no-repeat center;
            background-size: 100%;
          }
        }
      }
    }
    .personal_bottom {
      margin: 0.24rem 0;
      background: #fff;
      .container_content {
        padding-left: 0.3rem;
        margin: 0 auto;
        .detail_header_item {
          position: relative;
          display: block;
          height: 0.89rem;
          width: 100%;
          line-height: 0.89rem;
          color: #000;
          font-size: 0.34rem;
          .borderBottom(1px, #E5E5E5);
          .personal_icon {
            display: inline-block;
            width: 16px;
            height: 26px;
            float: right;
            background: url(../../common/image/personal/Chevron.png) no-repeat center;
            background-size: 50%;
            margin-right: 0.3rem;
            margin-top: 10px;

          }
          .item_icon_1 {
            display: inline-block;
            width: 0.58rem;
            height: 0.58rem;
            vertical-align: middle;
            background: url(../../common/image/personal/Group.png) no-repeat center;
            background-size: 100%;
          }
          .item_icon_2 {
            display: inline-block;
            width: 0.58rem;
            height: 0.58rem;
            vertical-align: middle;
            background: url(../../common/image/personal/Group2.png) no-repeat center;
            background-size: 100%;
          }
          .item_icon_3 {
            display: inline-block;
            width: 0.58rem;
            height: 0.58rem;
            vertical-align: middle;
            background: url(../../common/image/personal/Group3.png) no-repeat center;
            background-size: 100%;
          }
          .item_icon_4 {
            display: inline-block;
            width: 0.58rem;
            height: 0.58rem;
            vertical-align: middle;
            background: url(../../common/image/personal/Group4.png) no-repeat center;
            background-size: 100%;
          }
          .text {
            display: inline-block;
            vertical-align: middle;
          }
        }
        .detail_no_border {
          &::after {
            border-top: none;
          }
        }
      }
    }
  }

</style>





