<template>
  <div id="preview">
    <div class="preview">  
      <dl class="information">
        <dt>
          <img :src="resume.basic.headImg" alt="">
        </dt>
        <dd>
          <h2>
            <span>{{resume.basic.name}}</span>
            <em v-if="resume.basic.sex==1" class="man">男</em>
            <em v-if="resume.basic.sex==2">女</em>
          </h2>
          <p>{{resume.basic.motto}}</p>
          <p class="phone">{{resume.basic.phone}}</p>
          <p class="email">{{resume.basic.email}}</p>
          <div class="work_list_edit" @click="information"></div>
        </dd>
      </dl>
      <dl class="self-introduction">
        <dt>
          <span>自我介绍</span>
          <div class="work_list_edit" @click="selfIntroduction"></div>
        </dt>
        <dd class="" v-if="resume.myEvaluation.myEvaluation">{{resume.myEvaluation.myEvaluation}}</dd>
        <dd class="none" v-else>你还没有自我介绍,快去点击右上角编辑吧!</dd>
      </dl>
      <dl class="experience">
        <dt class="">工作经历</dt>
        <dd class="work_list" v-for="item in resume.workHistoryList" :key="item.id">
          <div class="work_list_left"><img src="../../common/image/micresume/company.png" alt=""></div>
          <div class="work_list_right">
            <h3>{{item.workCompany}}</h3>
            <p>{{item.position}}</p>
            <p>{{item.startDateStr+"至"+item.endDateStr}}</p>
          </div>
          <div class="work_list_edit" @click="workHistory(item.id)"></div>
        </dd>
        <dd class="add vux-1px-t" @click="workHistory(0)">新增工作经历</dd>
      </dl>
      <dl class="experience">
        <dt class="">教育经历</dt>
        <dd class="work_list" v-for="item in resume.educationHistoryList" :key="item.id">
          <div class="work_list_left"><img src="../../common/image/micresume/edu.png" alt=""></div>
          <div class="work_list_right">
            <h3>{{item.graduateSchool}}</h3>
            <p>{{item.major}}</p>
            <p>{{item.startDateStr+"至"+item.endDateStr}}</p>
          </div>
          <div class="work_list_edit" @click="education(item.id)"></div>
          <div class="work_list_referral">教育描述: {{item.descript}}</div>
        </dd>
        <dd class="add vux-1px-t" @click="education(0)">新增教育经历</dd>
      </dl>
      <dl class="experience project">
        <dt>项目经历</dt>
        <dd class="work_list" v-for="item in resume.projectList" :key="item.id">
          <div class="work_list_right">
            <h3>{{item.projectName}}</h3>
            <p v-if="item.untilNow">{{item.startDateStr+"至今"}}</p>
            <p v-else>{{item.startDateStr+"至" +item.endDateStr}}</p>
          </div>
          <div class="work_list_edit" @click="project(item.id)"></div>
        </dd>
        <dd class="add vux-1px-t" @click="project(0)">新增项目经验</dd>
      </dl>
      <dl class="experience">
        <dt>
          <span>语言</span>
          <div class="work_list_edit" @click="goRouter('language')"></div>
        </dt>
        <dd class="work_list language" v-for="item in resume.languageList" :key="item.id">
          <span></span>
          <span>{{item.languageSkill}}</span>
          <span>{{item.languageLevel}}</span>
        </dd>
      </dl>
      <dl class="experience">
        <dt>
          <span>技能</span>
          <div class="work_list_edit" @click="goRouter('skill')"></div>
        </dt>
        <dd class="skill" v-for="item in resume.skillList" :key="item.languageSkill">{{item.languageSkill}}</dd>
      </dl>
      <dl class="experience">
        <dt>
          <span>证书</span>
          <div class="work_list_edit" @click="goRouter('certificate')"></div>
        </dt>
        <dd class="skill" v-for="item in resume.certList" :key="item.qualificationName">{{item.qualificationName}}</dd>
      </dl>
      <dl class="experience">
        <dt>
          <span>获得奖项</span>
          <div class="work_list_edit" @click="goRouter('awards')"></div>
        </dt>
        <dd class="work_list awards" v-for="item in resume.prizeList" :key="item.qualificationName">
          <span>{{item.qualificationName}}</span>
          <span>{{item.qualificationDateStr}}</span>
        </dd>
      </dl>
      <dl class="experience">
        <dt class="vux-1px-b">
          <span>个人链接</span>
          <div class="work_list_edit" @click="goRouter('personalLink')"></div>
        </dt>
        <dd class="personage">
          <p>{{resume.link.linkUrl}}</p>
          <p>{{resume.link.linkDescription}}</p>
        </dd>
      </dl>
      <dl class="will">
        <dt>求职意愿<span>(仅HR可见)</span><div class="work_list_edit" @click="goRouter('aspiration')"></div></dt>
        <dd>
          <span>期望职能</span>
          <span>{{resume.jobpref.expectPosition}}</span>
        </dd>
        <dd>
          <span>工作类型</span>
          <span v-if="resume.jobpref.workType>=1">{{resume.jobpref.workType==1?'全职':resume.jobpref.workType==2?'兼职':'实习'}}</span>
          <span v-else class="unselected">未选择</span>
        </dd>
        <dd>
          <span>期望地点</span>
          <span v-if="resume.jobpref.expectPlace!=''">{{resume.jobpref.expectPlace}}</span>
          <span v-else class="unselected">未选择</span>
        </dd>
        <dd>
          <span>期望月薪</span>
          <span>{{resume.jobpref.minSalary}}K-{{resume.jobpref.maxSalary}}K</span>
        </dd>
      </dl>
    </div>
    <div class="footer_logo">
      <img src="../../common/image/footLogo2.jpg" alt="">
    </div>
    <div class="footer_btn">
      <div style="padding:15px;">
        <x-button @click.native="sendResume" type="primary" class="weizhaopin_btn" v-if="resume.positionId">立即投递</x-button>
      </div>
    </div>

    <loading v-show="loadingShow"></loading>
  </div>
</template>
<script>
import { XInput,Group,Datetime,PopupPicker,XTextarea,XButton,Cell,CheckIcon} from 'vux';
import loading from "./../base/loading/loading2";
export default {
  name:'resumePreview',
  data(){
    return{
      fansId:this.$route.query.fansId,
      shareFansId:this.$route.query.shareFansId,
      activityId:this.$route.query.activityId,
      recomType:this.$route.query.recomType,
      companyId:this.$route.query.companyId,
      resume:{
        positionId: this.$route.query.positionId,
        basic:{
          name:'',
          motto:'',
          phone:'',
          email:'',
          headImg:'',
          sex:1
        },
        certList:[],
        educationHistoryList:[],
        jobpref:{
          expectPlace:'',
          expectPosition:'',
          maxSalary:'',
          minSalary:'',
          workType:''
        },
        languageList:[],
        link:{
          linkDescription:'',
          linkUrl:''
        },
        myEvaluation:{
          myEvaluation:'',
        },
        prizeList:[],
        projectList:[],
        skillList:[],
        workHistoryList:[]
      },
      loadingShow:true
    }
  },
  methods:{
    information(){
      //去编辑个人中心
      this.$router.push({name:'information',query:{fansId:this.fansId}})
    },
    getAllResume(){
      var self=this;
      var method="resume/getAllResume",
          param=JSON.stringify({
            fansId:self.fansId
          }),
          sucessd=function(res){
            res.data.data.positionId=self.$route.query.positionId;
            res.data.data.basic.headImg=res.data.data.basic.headImg?res.data.data.basic.headImg:"https://aijuhr.com/images/yidong/head_wx.png"
            self.resume=res.data.data;
            self.loadingShow=false;
          };
      self.$http(method,param,sucessd);
    },
    //编辑自我介绍
    selfIntroduction(){
      this.$router.push({name:'selfIntroduction',query:{fansId:this.fansId}})
    },
    //编辑或者新增工作经历
    workHistory(id){
      this.$router.push({name:'work',query:{fansId:this.fansId,id:id}});
    },
    education(id){
      this.$router.push({name:'education',query:{fansId:this.fansId,id:id}});
    },
    project(id){
      this.$router.push({name:'project',query:{fansId:this.fansId,id:id}});
    },
    goRouter(name){
      this.$router.push({name:name,query:{fansId:this.fansId}});
    },
    sendResume(){
      var self=this;
       if(localStorage.resumeFrom){
          self.resume.resumeFrom = localStorage.resumeFrom
        }else{
          self.resume.resumeFrom = ''
        }
      var method="recruitPosition/submitApplicationRecord",
          param=JSON.stringify({
            interviewResumeInfo:self.resume,
            shareFansId:self.shareFansId,
            recomType:self.recomType,
            fansId:self.fansId,
            activityId:self.activityId
          }),
          successd=function (res) {
              // localStorage.removeItem('resumeFrom')
              self.$router.push({
                path:'/results',
                query:{
                  type:res.data.data,
                  companyId:self.companyId,
                  fansId:self.fansId,
                  recomType:self.recomType,
                  activityId:self.activityId
                }});
          },
          c=function(res){
            alert(res.data.data.message);
          };
      self.$http(method,param,successd,c);
    }
  },
  mounted(){
    document.title="个人档案";
    this.getAllResume();
  },
  components:{
    XInput,Group,Datetime,PopupPicker,XTextarea,XButton,Cell,CheckIcon,loading
  }
}
</script>
<style scoped lang="less">
@import '~vux/src/styles/1px.less';
#preview{background-color: #f8f8fc;padding-bottom: 1.5rem;font-size: .28rem;}
.information{padding:0.24rem 0.3rem;background-color: #fff;min-height: 1.5rem;}
.information dt{width: 1.3rem;overflow: hidden;float: left;text-align: center;}
.information dt img{width: 1.28rem;height: 1.28rem;border-radius: 50%;}
.information dd{margin-left:1.56rem;position: relative;}
.information {
  dd {
    h2{
      font-size: 0.36rem;
      span{
        font-weight: 400;
      }
      em{font-style: normal;font-size: .2rem;width: 0.4rem;height: 0.4rem;background-color: #FB5C7F;color: #fff;display: inline-block;text-align: center;border-radius: 50%;line-height: 0.4rem;margin-left:0.2rem;}
      .man{background-color: #5aa2e7;}
    }
    p{
      color:#9b9b9b;
      font-size: 0.26rem;
      margin-top:0.12rem;
    }
    .phone{
      padding-left:0.45rem;
      line-height: 0.4rem;
      background: url(../../common/image/micresume/phone.png) no-repeat left 0;
      background-size: 0.32rem auto;
    }
    .email{
      padding-left: 0.5rem;
      line-height: 0.4rem;
      background: url(../../common/image/micresume/email.png) no-repeat left 3px;
      background-size: 0.35rem auto;
    }
  }
}
.self-introduction{
  margin-top: 0.24rem;
  background-color: #fff;
  padding: 0.24rem .3rem;
  dt{
    font-size: .34rem;
    font-weight: 400;
    line-height: .48rem;
    position: relative;
  }
  dd{
    text-align: left;
    height: auto;
    color:#b2b2b2;
    padding: .1rem;
  }
  dd.none{
    height: .7rem;
    background-color: #f8f8f8;
    margin-top:.25rem;
    line-height: .5rem;
    color:#b2b2b2;
    text-align: center;
    border-radius: 4px;
  }
}
.experience{
  margin-top: 0.24rem;
  background-color: #fff;
  padding: 0.24rem .3rem;
  dt{
    font-size: .34rem;
    font-weight: 400;
    line-height: .48rem;
    padding-bottom:.2rem;
    position: relative;
  }
  dd.add{
    color:#5aa2e7;
    padding-left:.4rem;
    margin-top:.2rem;
    padding-top:.2rem;
  }
}
.will{
  padding:.2rem .3rem;
  margin-top:.2rem;
  background-color: #fff;
  font-size: .32rem;
  dt{
    font-size: .34rem;
    font-weight: 400;
    line-height: .48rem;
    padding-bottom:.2rem;
    position: relative;
  }
  dd{
    margin-top:.2rem;
    span:nth-child(1){
      margin-right: .4rem;
    }
    .unselected{
      color:#b2b2b2;
    }
  }
}
.work_list{padding: .2rem 0 0;position: relative;}
.work_list_left{width:1.2rem;height: 1.2rem;overflow: hidden;padding:.25rem .3rem;border:1px solid #e5e5e5;border-radius: 50%;float: left;}
.work_list_left img{width:.6rem;}
.work_list_right{margin-left:1.4rem;}
.work_list_right h3{font-size: .34rem;line-height: .5rem;}
.work_list_right p{font-size: .26rem;color: #999;line-height: .4rem;}
.work_list_edit{width:.3rem;height:.3rem;background: url(../../common/image/micresume/edit.png) no-repeat center center;background-size: 100% 100%;position: absolute;right:0;top:.1rem;}
.work_list_referral{background-color: #f8f8f8;color:#999;padding: 10px;font-size: .26rem;margin-top: .2rem;}
.project .work_list_right{margin-left:0;}
.language span:nth-child(1){width: .2rem;height: .2rem;background-color: #F5A623;display: inline-block;border-radius: 50%;}
.language span:nth-child(2){color: #000;font-size:.34rem;margin-left: .1rem;}
.language span:nth-child(3){color: #757575;font-size: .26rem;margin-left: .1rem;}
.awards span:nth-child(1){color: #000;font-size:.34rem;}
.awards span:nth-child(2){color: #757575;font-size: .26rem;margin-left: .2rem;}
.skill{font-size: .26rem;background-color: #53C68B;color: #fff;display: inline-block;line-height: .46rem;padding: 0 4px;border-radius: 3px;margin-right: .1rem;}
.personage p:nth-child(1){color: #4a90e2;margin: .2rem 0 .1rem;}
.personage p:nth-child(2){color: #999;word-wrap: break-word;}
.footer_btn{position: fixed;bottom: 0;width: 100%;}
.footer_logo img{width:1.86rem;margin:.3rem auto 0;display: block;}
</style>
