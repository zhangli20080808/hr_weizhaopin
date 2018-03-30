<template>
  <!-- 创建简历===青岛客户需求 -->
  <div id="createResume">
    <div>
      <group label-width="6em" gutter="0">
        <x-input title="姓名" v-model="name" placeholder="请输入姓名" required @on-change="change"></x-input>
        <x-input title="手机号码" v-model="phone" placeholder="填写手机号" is-type="china-mobile" required @on-change="change"></x-input>
        <x-input title="年龄" v-model="age" placeholder="请输入年龄" type="number" required @on-change="change"></x-input>
        <cell title="性别" value-align="left"><check-icon :value.sync="sex1" style="margin-right:2em">男</check-icon><check-icon :value.sync="sex2">女</check-icon></cell>
      </group>
      <div class="submit_wrap">
        <x-button type="primary" :disabled="btnDisabled" @click.native="submit">立即投递</x-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Group, Cell, XInput, XButton,CheckIcon  } from 'vux';
export default {
  name:'createResume',
  data(){
    document.title="创建简历"
    return{
      sex1:true,
      sex2:false,
      value1:'',
      name:'',
      phone:'',
      age:'',
      companyId:this.$route.query.companyId,
      positionId:this.$route.query.positionId,
      shareFansId:this.$route.query.shareFansId,
      fansId:this.$route.query.fansId,
      activityId:this.$route.query.activityId,
      btnDisabled:true
    }
  },
  mounted(){},
  methods:{
    submit(){
      let self=this;
      self.btnDisabled=true;
      if(localStorage.resumeFrom){
        var resumeFrom=localStorage.resumeFrom;
      }else{
        var resumeFrom='';
      }
      let method="recruitPosition/applyPositionForSimple",
          param=JSON.stringify({
            shareFansId:self.shareFansId,
            fansId:self.fansId,
            activityId:self.activityId,
            interviewResumeInfo:{
              positionId:self.positionId,
              name:self.name,
              phone:self.phone,
              age:self.age,
              sex:self.sex1?1:2,
              resumeFrom:resumeFrom
            }
          }),
          successd=function(res){
            self.btnDisabled=true;
            localStorage.removeItem('resumeFrom')
            self.$router.push({path:'/results',query:{type:res.data.data,companyId:self.companyId,fansId:self.fansId}});
          },
          e=function(){
            self.btnDisabled=false;
          };
      self.$http(method,param,successd,e);
    },
    change(){
      if(this.name!=''&&this.age!=''&&this.phone!=''&&/^1[34578][0-9]{9}$/.test(this.phone)){
        this.btnDisabled=false;
      }else{
        this.btnDisabled=true;
      }
    }
  },
  components: {
    Group,
    Cell,
    XInput,
    XButton,
    CheckIcon 
  },
  watch:{
    sex1(){
      this.sex2=!this.sex1;
    },
    sex2(){
      this.sex1=!this.sex2;
    }
  }
}
</script>

<style scoped>
.submit_wrap{padding: 20px;margin-top:10px;}
#createResume{padding-top:20px;}
</style>
<style>
.submit_wrap .weui-btn_disabled{opacity:0.4;}
</style>


