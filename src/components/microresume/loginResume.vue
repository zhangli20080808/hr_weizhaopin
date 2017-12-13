<template>
  <div id="loginResume" class="loginResume">

    <!-- 智联 -->
    <div class="login_zhilian" v-if="type==2">
      <div class="login_icon"></div>
      <div class="login_con">
        <group>
          <x-input name="username" placeholder="请输入账号" :border-intent="false" v-model="account"></x-input>
          <x-input name="password" placeholder="请输入密码" type="password"  v-model="pwd"></x-input>
          <x-input name="emial" placeholder="请输入邮箱" type="email" is-type='email'  v-model="email"></x-input>
          <x-input name="phone" placeholder="请输入手机号" is-type="china-mobile" :max="11"  class="vux-1px-b" v-model="phone"></x-input>
          <div style="padding:15px;">
            <x-button type="primary" @click.native="login(2)" class="hrm_primary_btn">确认登录并投递</x-button>
          </div>
          <div style="padding:15px;" class="login_remake">
            <p>爱聚HR将读取以下资料:</p>
            <p>1、完整档案：包括项目经历、教育背景等 </p>
            <p>2、账户的邮箱、电话等联系方式  </p>
            <p>3、个人基本信息和通讯地址 </p>
          </div>
        </group>
      </div>
    </div>

<!-- 51job -->
    <div class="login_jobs" v-if="type==1">
      <div class="login_icon"></div>
      <div class="login_con">
        <group>
          <x-input name="username" placeholder="请输入账号" :border-intent="false" v-model="account"></x-input>
          <x-input name="password" placeholder="请输入密码" type="password"  v-model="pwd"></x-input>
          <!-- <x-input name="emial" placeholder="请输入邮箱" type="email" is-type='email'  v-model="email"></x-input>
          <x-input name="phone" placeholder="请输入手机号" is-type="china-mobile" :max="11"  class="vux-1px-b" v-model="phone"></x-input> -->
          <div style="padding:15px;">
            <x-button type="primary" @click.native="login(1)" class="hrm_primary_btn">确认登录并投递</x-button>
          </div>
          <div style="padding:15px;" class="login_remake">
            <p>爱聚HR将读取以下资料:</p>
            <p>1、完整档案：包括项目经历、教育背景等 </p>
            <p>2、账户的邮箱、电话等联系方式  </p>
            <p>3、个人基本信息和通讯地址 </p>
          </div>
        </group>
      </div>
    </div>

    <!-- 拉钩 -->
    <div class="login_lagou" v-if="type==6">
      <div class="login_icon"></div>
      <div class="login_con">
        <group>
          <x-input name="username" placeholder="请输入账号" :border-intent="false" v-model="account"></x-input>
          <x-input name="password" placeholder="请输入密码" type="password"  v-model="pwd"></x-input>
          <!-- <x-input name="emial" placeholder="请输入邮箱" type="email" is-type='email'  v-model="email"></x-input>
          <x-input name="phone" placeholder="请输入手机号" is-type="china-mobile" :max="11"  class="vux-1px-b" v-model="phone"></x-input> -->
          <div style="padding:15px;">
            <x-button type="primary" @click.native="login(6)" class="hrm_primary_btn" >确认登录并投递</x-button>
          </div>
          <div style="padding:15px;" class="login_remake">
            <p>爱聚HR将读取以下资料:</p>
            <p>1、完整档案：包括项目经历、教育背景等 </p>
            <p>2、账户的邮箱、电话等联系方式  </p>
            <p>3、个人基本信息和通讯地址 </p>
          </div>
        </group>
      </div>
    </div>

    <x-dialog v-model="showScrollBox" class="dialog-demo">
      <p class="dialog-title">请输入验证码</p>
      <div class="img-box">
        <x-img :src="src" title="点击刷新" class="code_img"></x-img>
        <group>
          <x-input title="请输入验证码" v-model="vcode"></x-input>
          <div style="padding:15px;">
          <x-button type="primary" class="hrm_primary_btn" @click.native="login(-1)">提交</x-button>
        </div>
        </group>
      </div>
      <div @click="showScrollBox=false">
        <span class="vux-close"></span>
      </div>
    </x-dialog>

    <div v-transfer-dom>
      <popup v-model="show10" position="top" :show-mask="false">
        <div class="position-vertical-demo">{{loginMsg}}</div>
      </popup>
    </div>
      
  </div>
</template>
<script>
import { XInput, Group, XButton, Cell,XDialog,XImg,TransferDom,Popup,WechatPlugin } from 'vux';
  export default {
    name:'loginResume',
    data(){
      return{
        type:1,//登录来源 1,前程无忧;2,智联招聘;6.拉钩
        account:'',
        pwd:'',
        vcode:'',
        businessId:'14',
        fId:'-1',
        companyId:'169359',
        phone:'',
        email:'',
        showScrollBox:false,
        positionId:this.$route.query.positionId,
        src:'https://o5omsejde.qnssl.com/demo/test1.jpg',
        codeShow:false,
        show10:false,
        loginMsg:'账号或密码错误',
        shareOpenId:this.$route.query.shareOpenId,
        recomType:this.$route.query.recomType
      }
    },
    mounted(){
      this.index();
    },
    methods:{
      index(){
        if(this.$route.query.type){
          this.type=this.$route.query.type;
        }
        if(localStorage.companyId){
          this.companyId=localStorage.companyId;
        }
        if(localStorage.positionId){
          this.positionId=localStorage.positionId;
        }
      },
      login(type){
        var self=this;
        if(type!=-1){
          self.vcode='';
        }
        self.showScrollBox=false;
        // var url="https://aijuhr.com/hrm/account/climbingResume.do",
        // var url="http://192.168.4.87:8080/hrm/account/climbingResume.do",
        var param=JSON.stringify({
              fId:'-1',
              type:self.type,
              account:self.account,
              pwd:self.pwd,
              vcode:self.vcode,
              businessId:'14',
              companyId:self.companyId,
              phone:self.phone,
              email:self.email
            }),
            successd=function(res){
              var educationHistoryList=res.data.data.EducationHistory;
              var workHistoryList=res.data.data.WorkHistory;
              educationHistoryList.forEach(function(item) {
                item.startDateStr=self.$date(item.startDate,'month');
                if(!item.isReading){
                  item.endDateStr=self.$date(item.startDate,'month');
                  item.isReading=0;
                }else{
                  item.endDate="";
                  item.isReading=1;
                }
              });
              workHistoryList.forEach(function(item) {
                item.startDateStr=self.$date(item.startDate,'month');
                if(!item.isWorking){
                  item.endDateStr=self.$date(item.startDate,'month');
                  item.isWorking=0;
                }else{
                  item.endDate="";
                  item.isWorking=1;
                }
              });
              var birthday="";
              if(res.data.data.InterviewerInfo.birthday){
                birthday=self.$date(res.data.data.InterviewerInfo.birthday);
              }
              var method2="recruitPosition/submitInterivewApplicationNew",
                  param2=JSON.stringify({
                    shareOpenId:self.shareOpenId,
                    interviewResumeInfo:{
                      positionId:self.positionId,
                      resumeId:'',
                      attachmentIds:'',
                      name:res.data.data.InterviewerInfo.name,
                      phone:res.data.data.InterviewerInfo.phone,
                      sex:res.data.data.InterviewerInfo.sex,
                      birthday:birthday,
                      email:res.data.data.InterviewerInfo.email,
                      educationHistoryList:educationHistoryList,
                      workHistoryList:workHistoryList,
                      resumeFrom:self.type,
                      resumeUrl:res.data.data.InterviewerInfo.resumeUrl
                    },
                    recomType:self.recomType
                  }),
                  successd2=function(res2){
                    if (res2.data.data==1) {
                      self.$router.push({path:"/results",query:{type:1}});
                    } else {
                      self.$router.push({path:"/results",query:{type:2}});
                    }
                  };
              self.$http(method2,param2,successd2);
            },
            errord=function(res){
              if(res.data.code==1){
                //密码错误
                self.loginMsg='账号密码错误';
                self.show10=true;
              }else if(res.data.code==2||res.data.code==4){
                //需要验证码
                self.src=res.data.data;
                self.showScrollBox=true;
              }else if(res.data.code==3){
                //弹提示
                self.loginMsg=res.data.message;
                self.show10=true;
              }
            };
        self.$resumeHttp(param,successd,errord);
      }
    },
    components:{XInput, Group, XButton, Cell,XDialog,XImg,Popup,WechatPlugin},
    directives: {
      TransferDom
    },
    watch: {
      show10 (val) {
        if (val) {
          setTimeout(() => {
            this.show10 = false;
          }, 1000)
        }
      }
    }
  }
</script>
<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/close';

.dialog-demo {
  .weui-dialog{
    border-radius: 8px;
    padding-bottom: 8px;
  }
  .dialog-title {
    line-height: 30px;
    color: #666;
    font-size: 0.32rem;
  }
  .img-box {
    height: 200px;
    overflow: hidden;
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
  .code_img{
    display: block;
    width: 100px;
    height: auto;
    margin:0 auto;
  }
}
.position-vertical-demo {
  background-color: #FF4949;
  color: #000;
  text-align: center;
  padding: 15px;
  font-size: 0.32rem;
  color: #fff;
}
</style>
<style scoped>
.loginResume{background-color: #fff;}
.login_icon{height: 4rem;background: url(../../common/image/micresume/zhilian_icon.png) no-repeat center center}
.login_remake{color: #666;font-size: 0.32rem;}

.login_jobs .login_icon{background: url(../../common/image/micresume/jobs_icon.png) no-repeat center center}
.login_lagou .login_icon{background: url(../../common/image/micresume/lagou_icon.png) no-repeat center center}
</style>
