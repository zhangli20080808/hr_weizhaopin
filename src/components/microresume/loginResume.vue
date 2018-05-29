<template>
  <div id="loginResume" class="loginResume" :style="{'height':wh+'px'}">

    <!-- 智联 -->
    <div class="login_zhilian" v-if="type==2">
      <div class="login_icon"></div>
      <div class="login_con">
        <group>
          <x-input name="username" placeholder="请输入账号" :border-intent="false" v-model="account" title="账 号"></x-input>
          <x-input name="password" placeholder="请输入密码" type="password"  v-model="pwd" title="密 码"></x-input>
          <x-input name="emial" placeholder="请输入邮箱" type="email" is-type='email'  v-model="email" title="邮 箱"></x-input>
          <x-input name="phone" placeholder="请输入手机号" is-type="china-mobile" :max="11"  class="vux-1px-b" v-model="phone" title="手机号"></x-input>
        </group>
          <div style="padding:30px 15px 0;">
            <x-button type="primary" @click.native="login(2)" class="hrm_primary_btn">确认登录并投递</x-button>
          </div>
          <div style="padding:15px;" class="login_remake">
            <p><i></i>您的账号和密码不会被保存</p>
            <p><i></i>您的简历将仅用于应聘</p>
            <p><i></i>我们会对您的简历保密</p>
          </div>
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
            </group>
              <div style="padding:15px;">
                <x-button type="primary" @click.native="login(1)" class="hrm_primary_btn">确认登录并投递</x-button>
              </div>
              <div style="padding:15px;" class="login_remake">
                <p><i type="success"></i>您的账号和密码不会被保存</p>
                <p><i type="success"></i>您的简历将仅用于应聘</p>
                <p><i type="success"></i>我们会对您的简历保密</p>
              </div>
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
        </group>
          <div style="padding:30px 15px 0;">
            <x-button type="primary" @click.native="login(6)" class="hrm_primary_btn" >确认登录并投递</x-button>
          </div>
          <div style="padding:15px;" class="login_remake">
            <p><i type="success"></i>您的账号和密码不会被保存</p>
            <p><i type="success"></i>您的简历将仅用于应聘</p>
            <p><i type="success"></i>我们会对您的简历保密</p>
          </div>
      </div>
    </div>

    <x-dialog v-model="showScrollBox" class="dialog-demo">
      <p class="dialog-title">请输入验证码</p>
      <div class="img-box">
        <x-img :src="src" title="点击刷新" class="code_img"></x-img>
        <group class="vux-1px-b">
          <x-input title="验证码" v-model="vcode"></x-input>
        </group>
      </div>
      <div @click="login(-1)" class="code_btn">
        <span class="">确定</span>
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
import { XInput, Group, XButton, Cell,XDialog,XImg,TransferDom,Popup,WechatPlugin,Icon} from 'vux';
  export default {
    name:'loginResume',
    data(){
      console.log(window.innerHeight);
      let wh=window.innerHeight;
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
        shareFansId:this.$route.query.shareFansId,
        fansId:this.$route.query.fansId,
        recomType:this.$route.query.recomType,
        activityId:this.$route.query.activityId,
        wh:wh
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
              email:self.email,
              posiitonId:self.posiitonId
            }),
            successd=function(res){
              if(type==1&&res.data.data.code==0){
                self.$router.push({path:"/results",query:{type:1,companyId:self.companyId}});
                return
              }
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
                    shareFansId:self.shareFansId,
                    fansId:self.fansId,
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
                    recomType:self.recomType,
                    activityId:self.activityId
                  }),
                  successd2=function(res2){
                    if (res2.data.data==1) {
                      self.$router.push({path:"/results",query:{type:1,companyId:self.companyId}});
                    } else {
                      self.$router.push({path:"/results",query:{type:2,companyId:self.companyId}});
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
    components:{XInput, Group, XButton, Cell,XDialog,XImg,Popup,WechatPlugin,Icon},
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
.loginResume{background-color: #F8F8FC;position:relative;}
.login_icon{height: 2.7rem;background: url(../../common/image/micresume/zhilian_icon.png) no-repeat center center;}
.login_remake{color: #666;font-size: 0.32rem;position: absolute;bottom:0;left:20%;font-size: 0.3rem;line-height: 0.4rem;}
.login_remake i{background: url(../images/success.png) no-repeat center center; width: 0.3rem;height: .3rem;display: inline-block;background-size: 100% auto;vertical-align: middle;margin-right:5px;margin-top:-1px;}

.login_jobs .login_icon{background: url(../../common/image/micresume/jobs_icon.png) no-repeat center center;}
.login_lagou .login_icon{background: url(../../common/image/micresume/lagou_icon.png) no-repeat center center;}
.hrm_primary_btn{background-color: #5aa2e7;}
.hrm_primary_btn:active{background-color: #5aa2e7;}
.code_btn{font-size: 0.36rem;line-height: 50px;color: #5aa2e7;}
</style>
<style>
.loginResume .weui-label{color:#000;}

</style>

