<template>
  <div>
    <div class="login_box">
      <div class="login_con">
        <img :src="url" alt="" class="login_erweima">
        <p class="login_tishi">微信扫一扫编辑简历</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'login',
  data(){
    return{
      sceneId:null,
      url:null,
      timer:'',
    }
  },
  mounted(){
    this.getImg();
  },
  methods:{
    getImg(){
      var self=this;
      var method="account/getWeResumeQrcode",
          param={},
          successd=function(res){
            if(res.data.code==0){
              self.url=res.data.data.url;
              self.sceneId=res.data.data.sceneId;
              self.timer=setInterval(()=>{
                self.weResumeLogin();
              },1000)
            }else{
              self.$vux.toast.text('请刷新页面获取登录二维码');
            }
          };
      self.$webHttp(method,param,successd);
    },
    weResumeLogin(){
      var self=this;
      var method="account/weResumeLogin",
          param={sceneId:self.sceneId},
          successd=function(res){
            if(res.data.code==0){//登录成功
              clearInterval(self.timer);
              self.$router.push({name:'pcResume',query:{fansId:res.data.data.id}});
            }
          };
      self.$webHttp(method,param,successd);
    }
  }
}
</script>

<style scoped>
.login_box{width:670px;height: 488px;background-color: #fff;margin:55px auto 0;padding-top:1px;}
.login_con{width:350px;margin:60px auto 0;height: 375px;background: url(../../common/image/login_con.png) no-repeat top left;position: relative;}
.login_erweima{width: 185px;height: 185px;display: block;position: absolute;top:68px;left:72px;border-radius: 10px;}
.login_tishi{position: absolute;bottom:20px;width: 100%;text-align: center;font-size: 20px;}
</style>
