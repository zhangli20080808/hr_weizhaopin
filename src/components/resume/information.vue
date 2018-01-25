<template>
  <div id="information" :style="{'min-height':wh+'px'}">
    <group title="让我们更好的认识你吧" :label-width="labelWidth">
      <x-input title="姓名" v-model="basic.name" placeholder="请输入您的真实姓名"></x-input>
      <datetime v-model="basic.birthday" title="生日" :min-year="1970" :max-year="2010" placeholder="请选择出生年月"></datetime>
      <popup-picker title="性别" :data="sexArr" v-model="sexValue" show-name value-text-align="left"></popup-picker>
      <x-input title="手机号" v-model="basic.phone"  mask="999 9999 9999" :max="13" is-type="china-mobile"></x-input>
      <x-input title="邮箱" v-model="basic.email"></x-input>
    </group>
    <group>
      <x-textarea :max="1000" placeholder="座右铭: 告诉别人你是不同的" v-model="basic.motto"></x-textarea>
    </group>
    <div style="padding:15px;">
      <x-button @click.native="save" type="primary" class="weizhaopin_btn">完成</x-button>
    </div>
  </div>
</template>
<script>
import { XInput,Group,Datetime,PopupPicker,XTextarea,XButton} from 'vux'
export default {
  name:'information',
  data(){
    document.title="编辑基本信息";
    var wh=window.innerHeight;
    return{
      wh:wh,
      fansId:this.$route.query.fansId,
      sexArr:[[
        {name: '男', value: '1'},
        {name: '女', value: '2'},
      ]],
      name:'',
      phone:'',
      email:'',
      birthday:'1992-08-26',
      sexValue:['1'],
      labelWidth:'100px',
      basic:{
        name:'',
        motto:'',
        phone:'',
        email:'',
        headImg:'',
        sex:1,
        birthday:'1992-08-26'
      }
    }
  },
  mounted(){
    this.getAllResume();
  },
  methods:{
    getAllResume(){
      var self=this;
      var method="resume/getAllResume",
          param=JSON.stringify({
            fansId:self.fansId
          }),
          successd=function(res){
            self.basic=res.data.data.basic;
            let arr =[];
            arr[0]=res.data.data.basic.sex+'';
            self.sexValue=arr;
          };
      self.$http(method,param,successd);
    },
    save(){
      var self=this;
      self.basic.sex=self.sexValue[0]-0;
      if(self.basic.name==""){
        self.$vux.toast.text("请输入姓名");
        return false;
      }
      if(self.basic.birthday==""){
        self.$vux.toast.text("请选择生日");
        return false;
      }
      if(self.basic.phone==""||!/^1[34578][0-9]{1}\s{1}[0-9]{4}\s{1}[0-9]{4}/.test(self.basic.phone)){
        console.log(self.basic.phone);
        self.$vux.toast.text("请输入手机号");
        return false;
      }
      if(self.basic.email==""||!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(self.basic.email)){
        self.$vux.toast.text("请输入邮箱");
        return false;
      }
      var method="resume/updateResumeInfo",
          param=JSON.stringify({
            fansId:self.fansId,
            route:'basic',
            model:self.basic
          }),
          successd=function(res){
            self.$router.push({name:'resumePreview',query:{fansId:self.fansId}})
          };
      self.$http(method,param,successd);
    }
  },
  components:{
    XInput,Group,Datetime,PopupPicker,XTextarea,XButton
  }
}
</script>
<style scoped lang="less">
#information{
  padding-top:0.1rem;
  background-color: #f8f8fc;
}
</style>
<style>
#information .vux-cell-value{color: #000;}
#information .vux-datetime-value{text-align: left;}
</style>

