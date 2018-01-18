<template>
  <div class="login-wrap" :style="{height:wh+'px'}">
    <div class="form">
      <div class="tip">您是首次微信登录，请绑定爱聚账号，实现信息同步！</div>
       <group class="group" label-width="5em">
         <x-input title="用户名" type="text" placeholder="请输入注册手机号或邮箱" v-model="userName"></x-input>
         <x-input title="密码" type="password" placeholder="请输入密码" v-model="password"></x-input>
      </group>
    </div>
    <div class="btn-area">
      <button class="btn-login" :class="{disabled:disabled}" >绑定</button>
    </div>
    <div class="contact">
      <p class="word">如需帮助，请联系客服：</p>
      <p class="tel">176-0654-1988</p>
    </div>
   
    
  </div>
</template>


<script>
 import loading from '../../components/base/loading/loading2.vue'

  import {
    Group,
    XInput

  } from 'vux'

export default {
  components: {
    XInput,
    Group,
    
  },
  data(){
    return {
        wh:'',
        userName:'',
        password:'',
        disabled:false,
    }
  },
  created(){

  },
  mounted(){
      this.wh = window.innerHeight;
  },
  methods:{

  },
  
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
    margin-bottom:6.16rem;
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


