<template>
  <div class="resume-detail">
    <resume-item :interviewerInfo="interviewerInfo" :processStatus="processStatus"></resume-item>
    <!-- 基本信息 -->
    <div class="base-info item-wrap">
      <div class="hd">
        <span class="icon"></span>
        <span class="title">基本信息</span>
      </div>
      <div class="bd">
          <p class="pItem"><span class="key">手机号码：</span><span class="value">{{interviewerInfo.phone}}</span></p>
          <p class="pItem"><span class="key">电子邮箱：</span><span class="value">{{interviewerInfo.email}}</span></p>
          <p class="pItem"><span class="key">出生日期：</span><span class="value">{{interviewerInfo.birthday | filBirthday}}</span></p>
          <p class="pItem"><span class="key">现住地：</span><span class="value">{{interviewerInfo.nowLiveAddress}}</span></p>
          <p class="pItem"><span class="key">婚姻状况：</span><span class="value">{{interviewerInfo.marryStatus | gloMarryStatus}}</span></p>
          <p class="pItem"><span class="key">座右铭： </span><span class="value"> </span></p>
      </div>
    </div>
     <!-- 自我评价 -->
    <div class="self-evaluation item-wrap">
      <div class="hd">
        <span class="icon"></span>
        <span class="title">自我评价</span>
      </div>
      <div class="bd">
          <p class="content">{{interviewerInfo.myEvaluation}}</p>
      </div>
    </div>
     <!-- 工作经历 -->
    <div class="work-experience item-wrap" v-if="workHistory && workHistory.length > 0">
      <div class="hd">
        <span class="icon"></span>
        <span class="title">工作经历</span>
      </div>
      <div class="bd">
        <div class="exp-list">
          <div class="exp-item" v-for="(item,index) in workHistory" :key="index">
            <div class="exp-base">
              <p class="pItem"><span class="key">公司名称：</span><span class="value">{{item.workCompany}}</span></p>
              <p class="pItem"><span class="key">工作时间: </span><span class="value">{{item.startDate | date-filter}}至{{item.updateTime | date-filter}}</span></p>
              <p class="pItem"><span class="key">职位名称:</span><span class="value">{{item.position}}</span></p>
              <p class="pItem"><span class="key">部门名称:</span><span class="value">{{item.workDepartment}}</span></p>
            </div>
            <div class="exp-content" v-html="item.descript"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 教育经历 -->
    <div class="education-experience item-wrap" v-if="educationHistory && educationHistory.length > 0">
      <div class="hd">
        <span class="icon"></span>
        <span class="title">教育经历</span>
      </div>
      <div class="bd">
        <div class="exp-list">
          <div class="exp-item" v-for="(item,index) in educationHistory" :key="index">
            <div class="exp-base">
              <p class="pItem"><span class="key">学校名称: </span><span class="value">{{item.graduateSchool}}</span></p>
              <p class="pItem"><span class="key">教育时间: </span><span class="value">{{item.startDate  | date-filter}}至{{item.endDate  | date-filter}}</span></p>
              <p class="pItem"><span class="key">专业名称:</span><span class="value">{{item.major}}</span></p>
              <p class="pItem"><span class="key">最高学历:</span><span class="value">{{item.educationLev | gloEducationLev}}</span></p>
            </div>
            <div class="exp-content" v-html="item.descript"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 项目经历 -->
    <div class="project-experience item-wrap" v-if="interviewerProject && interviewerProject.length > 0">
      <div class="hd">
        <span class="icon"></span>
        <span class="title">项目经历</span>
      </div>
      <div class="bd">
         <div class="exp-list">
          <div class="exp-item" v-for="(item,index) in interviewerProject" :key="index">
            <div class="exp-base">
              <p class="pItem"><span class="key">项目名称：</span><span class="value">{{item.projectName}}</span></p>
              <p class="pItem"><span class="key">项目时间: </span><span class="value">{{item.startDate | date-filter}}至{{item.endDate | date-filter}}</span></p>
            </div>
            <div class="exp-content" v-html="item.projectDescription"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 培训经历 -->
    <div class="train-experience item-wrap" v-if="trainingHistory && trainingHistory.length > 0">
      <div class="hd">
        <span class="icon"></span>
        <span class="title">培训经历</span>
      </div>
      <div class="bd">
         <div class="exp-list">
          <div class="exp-item" v-for="(item,index) in trainingHistory" :key="index">
            <div class="exp-base">
              <p class="pItem"><span class="key">培训机构：</span><span class="value">{{item.tranOrganization}}</span></p>
              <p class="pItem"><span class="key">培训时间: </span><span class="value">{{item.startTime | date-filter}}至{{item.endTime | date-filter}}</span></p>
            </div>
            <div class="exp-content" v-html="item.tranContent"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 语言能力 -->
    <div class="language item-wrap" v-if="languageSkill && languageSkill.length > 0">
      <div class="hd">
        <span class="icon"></span>
        <span class="title">语言能力</span>
      </div>
      <div class="bd">
        <ul class="ul">
           <li class="li" v-for="(item,index) in languageSkill" :key="index" v-if="item.skillType == 1">
             <span class="key">{{item.languageSkill}}</span><span class="value">{{item.languageLevel}}</span>
            </li>
        </ul>
      </div>
    </div>
    <!-- 荣誉证书 -->
    <div class="certificate item-wrap" v-if="qualification && qualification.length > 0">
      <div class="hd">
        <span class="icon"></span>
        <span class="title">荣誉证书</span>
      </div>
      <div class="bd">
         <ul class="ul">
           <li class="li" v-for="(item,index) in qualification" :key="index">
             <span class="key">{{item.qualificationDate | date-filter}}</span><span class="value">{{item.qualificationName}} </span>
            </li>
         </ul>
      </div>
    </div>
    <!-- 技能 -->
    <div class="skills item-wrap" v-if="languageSkill && languageSkill.length > 0">
      <div class="hd">
        <span class="icon"></span>
        <span class="title">技能</span>
      </div>
      <div class="bd">
          <ul class="ul">
           <li class="li" v-for="(item,index) in languageSkill" :key="index" v-if="item.skillType == 2">{{item.languageSkill}}</li>
         </ul>
      </div>
    </div>
    <!-- 个人链接 -->
    <div class="self-link item-wrap" style="display:none;">
      <div class="hd">
        <span class="icon"></span>
        <span class="title">个人链接</span>
      </div>
      <div class="bd">
         <div class="exp-list">
          <div class="exp-item">
            <div class="exp-base">
              <p class="pItem">www.lvbowen.site</p>
            </div>
            <div class="exp-content">工作职责：1.指导客户使用直通车软件及在操作过程中出 现的问题进行处理 2.根据客户情况和相关数据进行分析 调整,为客户提供解决方案和建议,提高客户直通车营销效 果,提升 客户对产品的满意度 </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 求职意愿 -->
    <div class="job-want item-wrap">
      <div class="hd">
        <span class="icon"></span>
        <span class="title">求职意愿</span>
      </div>
      <div class="bd">
          <p class="pItem"><span class="key">期望城市：</span><span class="value">{{interviewerInfo.expectPlace}}</span></p>
          <p class="pItem"><span class="key">期望行业：</span><span class="value">{{interviewerInfo.expectIndustry}}</span></p>
          <p class="pItem"><span class="key">期望薪资：</span><span class="value">{{interviewerInfo.expectSalary}}</span></p>
          <p class="pItem"><span class="key">工作性质： </span><span class="value">{{interviewerInfo.workType}}</span></p>
          <p class="pItem"><span class="key">期望职能： </span><span class="value">{{interviewerInfo.expectPosition}}</span></p>
          <p class="pItem"><span class="key">到岗时间：  </span><span class="value">{{interviewerInfo.joinDate}}</span></p>
      </div>
    </div>
     <footer-logo></footer-logo>
  </div>
</template>

<script>
 import loading from '../../components/base/loading/loading2.vue'
 import ResumeItem from '../../components/base/resumeItem.vue'
 import FooterLogo from '../../components/base/footerLogo.vue'

  import {
    Scroller,
    LoadMore
    
  } from 'vux'

export default {
  components: {
    ResumeItem,
    FooterLogo
  },
  data(){
      return {
          processStatus:this.$route.params.processStatus,
          interviewerInfo:{},
          //荣誉证书
          qualification:[], 
          //  
          zpRecord:[],
          workHistory:[],
          interviewerProject:[],
          trainingHistory:[],
          //语言和技能
          languageSkill:[],
          educationHistory:[],
          resumeInterviewResults:[],
      }
  },
  created(){
    this.getResumeDetail()
  },
  mounted(){
    console.log(this.$route)
  },
  methods:{
    getResumeDetail(){
      var _this = this;
      var method = "queryResume/getResumeDetails";
      var param = JSON.stringify({
        companyId:_this.$route.query.companyId,
        interviewerId: _this.$route.query.interviewerId,
      });
      var successd = function (response) {
        let res = response.data;

        if (res.code == 0) {
           _this.qualification = res.data.qualification;
           _this.zpRecord = res.data.zpRecord;
           _this.workHistory = res.data.workHistory;
           _this.interviewerProject = res.data.interviewerProject;
           _this.trainingHistory = res.data.trainingHistory;
           _this.languageSkill = res.data.languageSkill;
           _this.educationHistory = res.data.educationHistory;
           _this.resumeInterviewResults = res.data.resumeInterviewResults;
           _this.interviewerInfo = res.data.interviewerInfo;
            
           
        }else if(res.code == 400){
          //登录超时，重新登录

        }
      }
      _this.$http(method, param, successd);
    },
    
  },
  filters:{
    filBirthday(val){
      if(typeof val == "string"){
        return val.split(" ")[0]
      }else{
        return val
      }
    },
  },

}
</script>

<style >
#app{
  height: 100%;
  background-color: #F8F8FC;
}
</style>
<style lang="less" scoped>
@import '~vux/src/styles/1px.less';

.resume-detail{
  background-color: #F8F8FC;
  padding-top:.3rem;
  .item-wrap{
    padding:.3rem;
    margin-top:.25rem;
    background-color: #ffffff;
    .hd{
      display:flex;
      align-items: center;
      height: .48rem;
      margin-bottom: .24rem;  
      .icon{
        width:.36rem;
        height:.34rem;
        background: url("../../common/image/icon-base.png") left top no-repeat;
        background-size: 100% 100%;
        overflow: hidden;
        margin-right: .1rem;
      }
      .title{
        font-size: .34rem;
      }
    }
    .bd{
      font-size: .28rem;
      color: #666;
      .pItem{
        line-height: 1.5;
        .key{
          display: inline-block;
          width:1.6rem;
        }
      }
    }
  }
  // 自我评价
  .self-evaluation{
   .hd{
      .icon{
        background: url("../../common/image/icon-evaluation.png") left top no-repeat;
        background-size: 100% 100%;
      }
    }
    .content{
      line-height: 1.5;
    }
  }
  //工作经历
  .work-experience,.education-experience,.project-experience,.train-experience,.self-link{
    .hd{
      .icon{
        background: url("../../common/image/icon-work.png") left top no-repeat;
        background-size: 100% 100%;
      }
    }
    .bd{
      .exp-list{
        .exp-item{
          margin-bottom:.3rem;
          &:last-child{
            margin-bottom: 0;
          }
          .exp-content{
            margin-top:.2rem;
            padding:.18rem .2rem;
            line-height: 1.4;
            font-size:.26rem;
            color: #999;
            border:1px solid #eeeeee;
            background: #F8F8F8;
          }
        }
      }
    }
  }
   //教育经历
  .education-experience{
    .hd{
      .icon{
        background: url("../../common/image/icon-education.png") left top no-repeat;
        background-size: 100% 100%;
      }
    }
  }
   //项目经历
  .project-experience{
    .hd{
      .icon{
        background: url("../../common/image/icon-project.png") left top no-repeat;
        background-size: 100% 100%;
      }
    }
  }
   //培训经历
  .train-experience{
    .hd{
      .icon{
        background: url("../../common/image/icon-train.png") left top no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  //语言能力
  .language{
    .hd{
      .icon{
        background: url("../../common/image/icon-language.png") left top no-repeat;
        background-size: 100% 100%;
      }
    }
    .bd{
      .ul .li{
          margin-bottom: .1rem;
          &:last-child{
            margin-bottom: 0;
          }
         .key{
            margin-right:.2rem;
          }
      }
    }
  }
  //荣誉证书
  .certificate{
    .hd{
      .icon{
        background: url("../../common/image/icon-certificate.png") left top no-repeat;
        background-size: 100% 100%;
      }
    }
    .bd{
      .ul .li{
         margin-bottom: .1rem;
          &:last-child{
            margin-bottom: 0;
          }
         .key{
            margin-right:.2rem;
          }
      }
    }
  }
  //技能
  .skills{
    padding-bottom: .2rem;
    .hd{
      .icon{
        width: .27rem;
        background: url("../../common/image/icon-skill.png") left top no-repeat;
        background-size: 100% 100%;
      }
    }
    .bd{
      .ul{
        display: flex;
        flex-wrap: wrap;
        .li{
          height: .45rem;
          line-height: .45rem;
          font-size: .26rem;  
          color: #fff;
          background:#53C68B;
          border-radius: 3px;
          margin-right:.1rem;
          margin-bottom: .1rem;
          padding:0 .1rem;
        }
        
      }
    }
  }
  //个人连接
  .self-link{
    .hd{
      .icon{
        height: .24rem;
        background: url("../../common/image/icon-link.png") left top no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  //求职意愿
  .job-want{
    .hd{
      .icon{
        width:.17rem;
        height:.34rem;
        background: url("../../common/image/icon-job.png") left top no-repeat;
        background-size: 100% 100%;
      }
    }
    
  }

}
</style>


