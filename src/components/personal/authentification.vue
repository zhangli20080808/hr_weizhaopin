<template>

  <div class="authentification">
    <tab :line-width=0>
      <tab-item :selected="staff === item" v-for="(item, index) in rememberList" @on-item-click="onItemClick"
                :key="index">{{item}}




      </tab-item>
    </tab>
    <!--我是员工-->
    <div class="loginInterpolate" v-show="nowIndex==0" id="interpolate">
      <!-- <div class="title">身份认证</div> -->
      <!-- <x-header :left-options="{backText: ''}" class="header">身份认证</x-header> -->
      <group class="group" v-show="personalInfo.isEmployeeCertification==0">

        <div class="info">
          <div class="img"></div>
          <div class="text">员工认证后即可以以公司推荐人身份分享职位给好友，获得相应奖励！</div>
        </div>
        <x-input name="username" placeholder="输入企业邮箱（绑定后不可修改）" is-type="email" :border-intent="false"
                 v-model="email"></x-input>
        <x-input name="password" placeholder="您的姓名" v-model="name" style="margin-top:0.3rem;"></x-input>
        <div style="padding:10px 30px;margin-top:0.6rem;" class="yzInfo">
          <x-button type="primary" @click.native="verification" class="hrm_primary_btn" :show-loading="btnLoading"
                    :disabled="name.length==0&&email.length==0">
            身份验证

          </x-button>
        </div>
      </group>
      <div class="noTips" v-show="personalInfo.isEmployeeCertification ==1">
        <div class="imgTips">
          <div class="img"></div>
          <div class="text">
            <p>您已验证成功</p>
          </div>
        </div>
      </div>

      <x-dialog v-model="showScrollBox" class="dialog-demo">
        <div @click="showScrollBox1=false" class="vueCloseWrap">
          <span class="vux-close"></span>
        </div>
        <img src="../../assets/img/succ.png" alt="succ">
        <p>已给您的邮箱</p>
        <p>{{email}}</p>
        <p>发送了一封邮件，请您及时根据邮件提示完成操作；操作后请刷新或重新打开本页！</p>
      </x-dialog>

      <x-dialog v-model="showScrollBox1" class="dialog-demo">
        <div @click="showScrollBox1=false" class="vueCloseWrap">
          <span class="vux-close"></span>
        </div>
        <img src="./../../assets/img/email.png" alt="succ">
        <p>已给您的邮箱{{email}}发送了一封邮件，请查看并完成认证</p>
        <x-button type="primary" @click.native="verification(1)" class="hrm_primary_btn">我已完成认证</x-button>
        <p><a href="javascript:;" @click="retransmission">重新发送邮件</a>
          <a href="javascript:;" style="float: right;" @click="showScrollBox1=false;">重新认证</a></p>

      </x-dialog>


    </div>
    <!--我不是员工(求职者)-->
    <div v-show="nowIndex==1" class="authentification_qz">
      <group class="check_code" v-show="personalInfo.isNotEmployeeCertification ==0">
        <x-input title="手机号" placeholder="请输入手机号码" v-model="phone">
          <x-button class="codePhone" slot="right" type="primary" mini @click.native="sendCheckCode"
                    :disabled="daojishi">{{verificationCode}}
          </x-button>
        </x-input>
        <x-input title="验证码" placeholder="输入验证码" v-model="checkCode" class="check_code2">
        </x-input>
        <div class="btn_content">
          <x-button type="primary" class="hrm_primary_btn" @click.native="finishCheck"
                    :disabled="checkCode.length==0&&phone.length==0">前往认证
          </x-button>
        </div>
      </group>
      <div class="noTips" v-show="personalInfo.isNotEmployeeCertification ==1">
        <div class="imgTips">
          <div class="img"></div>
          <div class="text">
            <p>您已验证成功</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {Tab, TabItem, XInput, Group, XButton, Cell, XDialog, XImg, TransferDom, Popup, XHeader, Toast} from 'vux'

  export default {
    data(){
      return {
        rememberList: ['我是员工', '我不是员工（求职者）'],
        staff: '我是员工',
        nowIndex: 0,
        //员工认证
        type: '',
        companyId: this.$route.query.companyId,
        vcode: '',
        email: '',
        name: '',
        showScrollBox: false,
        showScrollBox1: false,
        shareOpenId: this.$route.query.shareOpenId,
        positionId: this.$route.query.positionId || 0,
        shareFansId: this.$route.query.shareFansId,
        fansId: this.$route.query.fansId,
        recomType: this.$route.query.recomType,
        pageFrom: this.$route.query.pageFrom,
        btnLoading: false,
        //求职者认证
        phone: '',
        checkCode: '',
        daojishi: false,
        verificationCode: "获取验证码",
        personalInfo: {}
      }
    },
    methods: {
      onItemClick(index){
        this.nowIndex = index
      },
      verification(){
        //景麒45  xiaohui@iyenei.com
        let self = this;
        if (self.btnLoading) {
          return false
        } else {
          self.btnLoading = true;
        }
        let methods = "positionRecommend/innerEmpAuth",
          param = JSON.stringify({
            companyId: self.companyId,
            fansId: self.fansId,
            empName: self.name,
            empEmail: self.email,
          }),
          successd = (res) => {
            self.btnLoading = false;
            if (res.data.data.resCode == 1) {
              self.empId = res.data.data.empId;
              self.$router.push({
                name: 'interpolateResult',
                query: {
                  fansId: self.fansId,
                  companyId: self.companyId,
                  empId: self.empId,
                  email: self.empEmail,
                  shareFansId: self.shareFansId,
                  recomType: self.recomType,
                  pageFrom: self.pageFrom
                }
              });
            }
          },
          errord = (res) => {
            self.btnLoading = false;
          };
        self.$http(methods, param, successd, errord);
      },
      retransmission(){
        let self = this;
        let methods = "positionRecommend/sendEmailAgain",
          param = JSON.stringify({
            empId: self.empId
          }),
          successd = (res) => {
            self.showScrollBox1 = true;
          };
        self.$http(methods, param, successd);
      },
      sendCheckCode(){
        var self = this;
        if (self.daojishi) {
          return false;
        }
        var method = "weixin/sendCheckCode",
          param = {phone: self.phone},
          successd = function (res) {
            self.$vux.toast.text(res.data.resMsg, 'top');
            if (res.data.code == 0) {
              self.daojishi = true;
              var t = 60;
              var timer = setInterval(() => {
                if (t <= 0) {
                  self.verificationCode = "发送验证码";
                  self.daojishi = false;
                  clearInterval(timer);
                  return false;
                }
                self.verificationCode = "发送验证码" + t + 's';
                t--;
              }, 1000);
            }
          };
        self.$webHttp(method, param, successd);
      },
      finishCheck(){
        var self = this;
        var method = "weixin/finishCheck",
          param = {
            phone: self.phone,
            checkCode: self.checkCode,
            companyId: self.companyId,
            fansId: self.fansId
          },
          successd = function (res) {
            if (res.data.code == 0) {
              self.renzhengShow = false;
              self.shareTipShow = true;
            }
            self.$vux.toast.text(res.data.resMsg, 'top');
          };
        self.$webHttp(method, param, successd);
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
          }
        }
        _this.$http(method, param, successd);
      },
      userAuthUrl(){
        var self = this;
        var method = "weixin/userAuthUrl",
          param = {
            scope: 'snsapi_base',
            pageFrom: 1,
            companyId: self.companyId,
          },
          successd = function (res) {
            if (res.data.userSession == 0) {
              location.href = res.data.userAuthUrl;
            }
          };
        self.$webHttp(method, param, successd);
      }
    },
    components: {
      Tab,
      TabItem,
      XInput, Group, XButton, Cell, XDialog, XImg, Popup, XHeader, Toast
    },
    mounted(){
//      this.userAuthUrl();
      this.nowIndex = 0;
      console.log(this.$route)
      this.getWeixinPersonalInfo()

    },
    directives: {
      TransferDom
    }
  }

</script>
<style lang="less">
  .authentification {
    .loginInterpolate {
      .group {
        .vux-no-group-title {
          margin-top: 0.31rem;
          &:before {
            border-top: none;
          }
        }
      }
      .noTips {
        .imgTips {
          margin-top: 56px;
          .img {
            display: block;
            width: 130px;
            height: 130px;
            background: url("../../common/image/personal/noResutl_icon.png") no-repeat center;
            background-size: 60%;
            margin: 0 auto;
          }
        }
        .text {
          font-size: 0.28rem;
          color: #99a9bf;
          text-align: center;
          margin-top: 0.2rem;
          p {
            margin-top: 10px;
            &:last-child {
              margin-bottom: 100px;
            }
          }
        }
      }
    }
    .authentification_qz {
      .check_code {
        .weui-cells:after {
          border-bottom: none;
        }
      }
      .noTips {
        .imgTips {
          margin-top: 56px;
          .img {
            display: block;
            width: 130px;
            height: 130px;
            background: url("../../common/image/personal/noResutl_icon.png") no-repeat center;
            background-size: 60%;
            margin: 0 auto;
          }
        }
        .text {
          font-size: 0.28rem;
          color: #99a9bf;
          text-align: center;
          margin-top: 0.2rem;
          p {
            margin-top: 10px;
            &:last-child {
              margin-bottom: 100px;
            }
          }
        }
      }
    }
  }
</style>
<style scoped lang="less">
  .authentification {
    background: #F8F8FC;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .vux-tab .vux-tab-item {
      background: #EBEBF1;
    }
    .vux-tab .vux-tab-item.vux-tab-selected {
      color: #353535;
      background: #fff;
    }
    .loginInterpolate {
      .group {
        .info {
          display: flex;
          padding: 10px 30px;
          .img {
            display: inline-block;
            float: left;
            width: 0.34rem;
            height: 0.34rem;
            background: url(../../common/image/personal/info.png) no-repeat center;
            background-size: 100%;
            margin-top: 2px;
            padding-top: 10px;
          }
          .text {
            flex: 1;
            padding-left: 3px;
            font-size: 0.28rem;
            color: #FDA94F;
            line-height: 25px;
            text-align: left;
            background-color: #fff;
          }
        }
        .yzInfo {

        }
      }

    }
    .authentification_qz {
      .check_code {
        .codePhone {
          background: #fff;
          color: #5AA2E7;
        }
        .btn_content {
          padding: 10px 15px;
          margin-top: 0.5rem;
          &:after {
            border-bottom: none;
          }
        }
      }
      .check_code2 {
        .weui-cell__primary {
          .weui-input {
            font-size: 15px;
            &::placeholder {
              font-size: 14px;
            }
          }
        }

      }
    }
    #interpolate .weui-dialog {
      padding: 0 20px;
    }
    #interpolate button.weui-btn, input.weui-btn {
      /* margin:10px 5% 15px;
      width: 90%; */
    }
    #interpolate .vueCloseWrap {
      position: absolute;
      right: 10px;
      top: 10px;
    }
    #interpolate .weui-cells:before, #interpolate .weui-cells:after, #interpolate .weui-cell:before {
      border: none;
    }
    #interpolate .weui-cell {
      padding-left: 0;
      margin: 0 30px;
      border-bottom: 1px solid #D9D9D9;
    }
    #interpolate .weui-btn_primary {
      background-color: #5aa2e7;
    }
    .login_lagou {
      text-align: center;
    }
    img {
      width: 35px;
      margin-top: 20px;
    }
    .title {
      font-size: 17px;
      width: 100%;
      height: 3.5rem;
      line-height: 3.5rem;
      background: #64B5F6;
      color: #fff;
    }
    .weui-dialog p {
      font-size: 14px;
    }
    a {
      text-align: left;
      font-size: 14px;
      margin-bottom: 15px;
      display: inline-block;
      color: #3399FF;
      text-decoration: none;
    }
    .header {
      background-color: #64b5f6;
    }
  }

</style>
<style>
  .authentification .check_code .weui-cells:before {
    border: none;
  }

  .authentification .check_code .codePhone:after {
    border: none;
    border-left: 1px solid #ccc;
    border-radius: 0
  }

  .authentification .check_code2.weui-cell::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
  }

  .authentification .weui-btn {
    background-color: #5AA2E7;
  }

  .authentification .btn_content .weui-btn_disabled, .authentification .loginInterpolate .group .yzInfo .weui-btn_disabled {
    background-color: #b8d5f4 !important;
    color: #fff;
  }

  .authentification .weui-btn:active {
    background-color: #5AA2E7 !important;
  }
</style>


