<template>
  <div id="results" class="results">
    <div v-if="type==1" class="results_list">
        <icon type="success-circle" is-msg style="text-align:center;margin:0rem auto;display:block;padding-top:2rem;"></icon>
        <p class="success_resume">投递成功</p>
        <p class="success_resume_two">感谢您的申请，我们将尽快给您回复</p>

    </div>
    <div v-if="type==2" class="results_list">
        <icon type="success-circle" is-msg style="text-align:center;margin:0rem auto;display:block;padding-top:2rem;"></icon>
        <p class="success_resume">投递成功</p>
        <p class="success_resume_two">感谢您的申请，我们将尽快给您回复</p>
        <p class="success_resume_three">该候选人在系统中已存在相同的申请，本次投递无效</p>
    </div>
    <div v-if="type==3" class="results_list">
        <icon type="cancel" is-msg style="text-align:center;margin:0rem auto;display:block;padding-top:2rem;"></icon>
        <p class="success_resume">投递失败</p>
        <p class="success_resume_two">请先完善您的简历信息再提交哦</p>
    </div>
    <div class="guanzhu" v-show="sharedQrcodeUrl">
      <div class="success_resume_img"><img :src="sharedQrcodeUrl" alt="" ></div>
      <p class="success_resume_four">长按二维码关注 <br/> 获取职位分享动态</p>
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
        type:this.$route.query.type,
        companyId:this.$route.query.companyId,
        fansId:this.$route.query.fansId,
        recomType:this.$route.query.recomType,
        activityId:this.$route.query.activityId,
        accountName:'',
        sharedQrcodeUrl:null,
        isSubscribe:0,//用户是否关注1:已关注,0:未关注
      }
    },
    mounted(){
      this.index();
      this.getWeChatOfficialAccountInfo();
    },
    methods:{
      index(){
        var self=this;
        console.log(self.$route);
        self.type=self.$route.query.type;
        if(localStorage.interviewResumeInfo){
          self.interviewResumeInfo=JSON.parse(localStorage.interviewResumeInfo);
        }else{
          self.interviewResumeInfo={
            positionId:this.$route.query.id,
            resumeId:null,//简历文件id
            attachmentIds:null,//附件ids
            name:'',
            phone:'',
            email:'',
            sex:'',
            birthday:'',
            educationHistoryList:[],
            workHistoryList:[]
          }
        }
      },
      reuturnResume(){
        var self=this;
        localStorage.setItem('posId',self.interviewResumeInfo.positionId);
        if(self.recomType==2){
          location.href="https://aijuhr.com/wx/dist/#/wx/interpolateList?companyId="+self.companyId+"&shareFansId=0&fansId=0&recomType=2&pageFrom=3&activityId="+self.activityId;
        }else if(self.recomType==1){
          location.href="https://aijuhr.com/wx/dist/#/wx/interpolateList?companyId="+self.companyId+"&shareFansId=0&fansId=0&recomType=1&pageFrom=1&activityId="+self.activityId;
        }else{
          self.$router.push({path:'/about',query:{companyId:self.companyId}})
        }
      },
      //分享之后调用服务号二维码
      getWeChatOfficialAccountInfo(){
        let self=this;
        let method="positionRecommend/getWeChatOfficialAccountInfo",
            param=JSON.stringify({companyId:self.companyId,type:2,fansId:self.fansId}),
            successd=function(res){
              if(res.data.data.qrcodeUrl){
                self.accountName=res.data.data.accountName ;
                self.isSubscribe=res.data.data.isSubscribe;
                if(self.isSubscribe==0){
                  self.sharedQrcodeUrl=res.data.data.qrcodeUrl;
                }
              }
            }
        self.$http(method,param,successd);
      }
    },
    components:{XButton,Icon},
  }
</script>
<style scoped>
.results{background-color: #F8F8FC;}
.results .results_list{background-color: #fff;}
.success_resume{font-size:0.48rem;text-align:center;color: #1F2D3D;margin-top:0.68rem;}
.success_resume_two{font-size:0.32rem;text-align:center;color: #1F2D3D;margin-top:0.68rem;padding-bottom: 20px;}
.success_resume_three{font-size:0.32rem;text-align:center;color: #1F2D3D;margin-top:0.18rem;padding-bottom:1rem;color: #F96868;}
.success_resume_four{font-size: 0.28rem;text-align: center;color: #475669;display: inline-block;line-height: 20px;padding-top:20px}
.success_resume_img{width: 40%;display: inline-block;text-align: right;}
.success_resume_img img{width: 1.5rem;display: inline-block;vertical-align: middle;}
.btn{color:#fff;background-color:#5AA2E7;height:0.92rem;line-height:0.2rem;}
.results .btn:active{color:#fff;background-color:#5AA2E7;}
.results .btn:focus{outline:none;}
.success_resume_btn{width: 90%;margin: 1rem auto 0;display: block;}
.guanzhu{margin-top:50px;}
</style>
