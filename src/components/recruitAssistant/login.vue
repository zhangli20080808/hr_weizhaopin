<template>
  <div class="login-wrap" :style="{height:wh+'px'}">
    <div class="form">
      <div class="tip">您是首次微信登录，请绑定爱聚账号，实现信息同步！</div>
       <group class="group" label-width="5em">
         <x-input title="用户名" type="text" placeholder="请输入注册手机号或邮箱" v-model.trim="account"></x-input>
         <x-input title="密码" type="password" placeholder="请输入密码" v-model.trim="password"></x-input>
      </group>
    </div>
    <div class="btn-area">
      <button class="btn-login" @click="login" :class="{disabled:disabled}" :disabled="disabled">绑定</button>
    </div>
    <div class="contact">
      <p class="word">如需帮助，请联系客服：</p>
      <p class="tel">176-0654-1988</p>
    </div>
   
     <toast v-model="toastShow" type="text" :text="toastText" position="top"></toast>
  </div>
</template>


<script>
 import loading from '../../components/base/loading/loading2.vue'

  import {
    Group,
    XInput,
    Toast
  } from 'vux'

export default {
  components: {
    XInput,
    Group,
    Toast
  },
  data(){
    return {
        wh:'',
        account:'',
        password:'',
        disabled:true,
        toastShow:false,
        toastText:'',
        companyId:this.$route.query.companyId || '',
        code:'',
    }
  },
  created(){

  },
  mounted(){
     this.$nextTick(() => {
        this.wh = window.innerHeight;
        console.log('routeObj',this.$route)
     })
      
  },
  methods:{
    checkForm(){
      let regPhone = /^1\d{10}$/;
      let regEmail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;   
      if(!regPhone.test(this.account) && !regEmail.test(this.account)){
        this.toastShow = true
        this.toastText = "用户名格式不对"
        return false;
      }
      return true;
    },
    login(){
      var _this = this;
      if(!this.checkForm()){
        return
      }
      var method = "account/aijuAssistantLogin";
      var redirectUri = `https://aijuhr.com/miniRecruit/#/${_this.$route.params.urlType}?companyId=${_this.companyId}`;
      var param = {
        redirectUri:redirectUri,
        code:_this.code,
        openId:_this.$route.params.openId,
        account:_this.account,
        password:_this.password,
      };
      var successd = function (response) {
         let res = response.data;
         if(res.code == "0"){
           localStorage.userInfo = res.data
           location.href =  redirectUri
         }else{
           _this.toastShow = true
           _this.toastText = res.message
           console.log(res.code,res.message)
         }
      }
      _this.$webHttp(method, param, successd);
    },
  },
  watch:{
    account(val){
         if(val && this.password){
           this.disabled = false
         }else{
           this.disabled = true
         }
    },
    password(val){
         if(val && this.account){
           this.disabled = false
         }else{
           this.disabled = true
         }
    },
  }
  
}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/1px.less';

#app{
  background-color: #F8F8FC;
  height: 100%;
}
.login-wrap{
  background-color: #F8F8FC;
  height: 100%;
  overflow: hidden;
  padding-top:.3rem;
  .form{
    background-color: #ffffff;
    padding-top:.3rem;
    .tip{
      padding-left:.6rem;
      
      text-align: center;
      font-size: .27rem;
      line-height: .4rem;
      color:#FDA94F;
      background:url("../../common/image/icon-tip.png") 15px center no-repeat;
      background-size: .34rem;
      margin-bottom: .3rem;
    }
  }
  .btn-area{
    text-align: center;
    margin-top:.95rem;
    // margin-bottom:6.16rem;
    .btn-login{
      width:6.7rem;
      height: .94rem;
      margin: 0 auto;
      line-height: .94rem;
      font-size: .36rem;
      color: #ffffff;
      background-color: #5AA2E7;
      outline: none;
      border: none;
      border-radius: 5px;
      &.disabled{
        opacity: 0.6;
      }
    }
  }
  .contact{
    position: fixed;
    bottom:.8rem;
    width:100%;
    font-size:.28rem;
    color: #888;
    text-align: center;
    .word{
      margin-bottom: .4rem;
    }
    .tel{
      background: url("../../common/image/icon_empty_tel.png") 2.5rem center no-repeat;
      background-size: .24rem;
    }
  }
}
</style>


