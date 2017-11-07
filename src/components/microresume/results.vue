<template>
  <div id="results" class="results">
    <div v-if="type==1">
        <icon type="success-circle" is-msg style="text-align:center;margin:0rem auto;display:block;padding-top:2rem;"></icon>
        <p class="success_resume">投递成功</p>
        <p class="success_resume_two">感谢您的申请，我们将尽快给您回复</p>
        
    </div>
    <div v-if="type==2">
        <icon type="success-circle" is-msg style="text-align:center;margin:0rem auto;display:block;padding-top:2rem;"></icon>
        <p class="success_resume">投递成功</p>
        <p class="success_resume_two">感谢您的申请，我们将尽快给您回复</p>
        <p class="success_resume_three">该候选人在系统中已存在相同的申请，本次投递无效</p>
    </div>
    <div v-if="type==3">
        <icon type="cancel" is-msg style="text-align:center;margin:0rem auto;display:block;padding-top:2rem;"></icon>
        <p class="success_resume">投递失败</p>
        <p class="success_resume_two">请先完善您的简历信息再提交哦</p>
    </div>
    <x-button class="success_resume_btn btn" @click.native="reuturnResume">返回首页</x-button>
  </div>
</template>
<script>
  import {XButton,Icon} from 'vux'
  export default {
    name:'results',
    data(){
      return{
        type:'3',
      }
    },
    mounted(){
      this.index();
    },
    methods:{
      index(){
        var self=this;
        console.log(self.$route);
        self.type=self.$route.query.type;
        self.interviewResumeInfo=JSON.parse(localStorage.interviewResumeInfo);
      },
      reuturnResume(){
        var self=this;
        localStorage.setItem('posId',self.interviewResumeInfo.positionId);
        self.$router.push({path:'/',query:{companyId:localStorage.companyId}})
      }
    },
    components:{XButton,Icon},
  }
</script>
<style scoped>
.success_resume{font-size:0.48rem;text-align:center;color: #1F2D3D;margin-top:0.68rem;}
.success_resume_two{font-size:0.32rem;text-align:center;color: #1F2D3D;margin-top:0.68rem;}
.success_resume_three{font-size:0.32rem;text-align:center;color: #1F2D3D;margin-top:0.18rem;padding-bottom:1rem;color: #F96868;}
.btn{color:#fff;background-color:#5AA2E7;height:0.92rem;line-height:0.2rem;}
.results .btn:active{color:#fff;background-color:#5AA2E7;}
.results .btn:focus{outline:none;}
.success_resume_btn{width: 90%;margin: 1rem auto 0;display: block;}
</style>