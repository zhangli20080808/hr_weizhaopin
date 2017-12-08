<template>
  <div id="interpolate" class="loginInterpolate">
      <div class="title">身份认证</div>
      <p>员工认证后即可以以公司推荐人身份分享职位给好友，获得相应奖励！</p>
    <!-- 拉钩 -->
        <group>
          <x-input name="username" placeholder="您的企业邮箱(绑定后不可修改)" :border-intent="false" v-model="email"></x-input>
          <x-input name="password" placeholder="您的姓名" v-model="name"></x-input>
          <div style="padding:10px;margin-top:0.2rem;">
            <x-button type="primary" @click.native="verification()" class="hrm_primary_btn" >身份验证</x-button>
          </div>
        </group>

    <x-dialog v-model="showScrollBox" class="dialog-demo">
        <div @click="showScrollBox1=false" class="vueCloseWrap">
            <span class="vux-close"></span>
        </div>
        <img src="./images/succ.png" alt="succ">
        <p>已给您的邮箱</p>      
        <p>peiqi@iyenei.com</p>      
        <p>发送了一封邮件，请您及时根据邮件提示完成操作；操作后请刷新或重新打开本页！</p>      
    </x-dialog>
    <x-dialog v-model="showScrollBox1" class="dialog-demo">
         <div @click="showScrollBox1=false" class="vueCloseWrap">
            <span class="vux-close"></span>
        </div>
        <img src="./images/email.png" alt="succ">
        <p>已给您的邮箱peiqi@iyenei.com发送了一封邮件，请查看并完成认证</p>  
        <x-button type="primary" @click.native="verification(1)" class="hrm_primary_btn" >我已完成认证</x-button>
        <p> <a href="javascript:;">重新发送邮件</a> 
        <a href="javascript:;" style="float: right;">重新认证</a>  </p>
        
    </x-dialog>



      
  </div>
</template>
<script>
import { XInput, Group, XButton, Cell,XDialog,XImg,TransferDom,Popup,WechatPlugin } from 'vux';
  export default {
    name:'loginResume',
    data(){
        document.title="身份验证"
      return{
          type: '',
          companyId: '',
          positionId: '',
          vcode: '',
          email: '',
          name: '',
          showScrollBox: false,
          showScrollBox1: true
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
      verification(){
          console.log('verification')
          let  param=JSON.stringify({
                companyId: this.companyId,
                tshareOpenIdype:this.tshareOpenIdype,
                empName:this.empName,
                empEmail:this.empEmail,
            }),
            successd = (res)=> {
                console.log(res);
            },
            error = (res)=> {
                console.log(res);
            }
        // this.$http(methods, param,successd,error);
      },
    },
    components:{XInput, Group, XButton, Cell,XDialog,XImg,Popup,WechatPlugin},
    directives: {
      TransferDom
    },
  }
</script>
<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/close';

#interpolate{
    font-size: 15px;
}
.login_lagou{
    text-align: center;
}
img{
    width: 35px;
    margin-top: 20px;
}
.title{
    font-size: 17px;
    padding: 18px;
    width: 100%;
    height: 55px;
    background: #64B5F6;
    color: #fff;
}
p{
    font-size: 14px;
    color: #333;
    padding: 10px;
    line-height: 25px;
    text-align: left;
}

.weui-dialog p{
    font-size: 14px;
}
a{
    text-align: left;
    font-size: 14px;
    margin-bottom: 15px;
    display: inline-block;
    color: #3399FF;
    text-decoration: none;
}
</style>
<style>
#interpolate .weui-dialog{
    padding: 0 20px;
}
#interpolate button.weui-btn, input.weui-btn{
    /* margin:10px 5% 15px;
    width: 90%; */
}
#interpolate .vueCloseWrap{
    position: absolute;
    right: 10px;
    top: 10px;
}
#interpolate .weui-cells:before, #interpolate .weui-cells:after, #interpolate .weui-cell:before{
    border: none;
}
#interpolate .weui-cell{
    /* padding: 10px 0; */
    margin: 0 10px;
    border-bottom: 1px solid #D9D9D9;
}
</style>


