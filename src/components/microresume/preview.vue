<template>
  <div id="preview" class="preview">
    <div class="preview_header">
      <p class="header_one">
        <span>{{interviewResumeInfo.name}}</span>
        <span class="sex" v-if="interviewResumeInfo.sex==2">女</span>
        <span class="sex" v-if="interviewResumeInfo.sex==1">男</span>
      </p>
      <p class="header_two">{{interviewResumeInfo.phone}}</p>
      <p class="header_three">{{interviewResumeInfo.email}}</p>
    </div>
    <group>
      <cell
      title="教育经历"
      style="background-color:#F8F8FC"
      :border-intent="false"></cell>
      <ul class="slide vux-1px-b" v-for="educationHistory in interviewResumeInfo.educationHistoryList">
        <li style="color:#475669;"><span class="margin_right_10">{{educationHistory.startDateStr}}</span>至<span class="margin_left_10">{{educationHistory.isReading==1?'今':educationHistory.endDateStr}}</span></li>
        <li><span class="margin_right_10">{{educationHistory.graduateSchool}}</span><span>{{professional[educationHistory.educationLev-1]}}</span></li>
        <li>{{educationHistory.major}}</li>
      </ul>
      <cell
      title="工作经历"
      :border-intent="false"
      style="background-color:#F8F8FC"></cell>
      <ul class="slide vux-1px-b" v-for="workHistory in interviewResumeInfo.workHistoryList">
        <li style="color:#475669;"><span class="margin_right_10">{{workHistory.startDateStr}}</span>至<span class="margin_left_10">{{workHistory.isWorking==1?'今':workHistory.endDateStr}}</span></li>
        <li><span class="margin_right_10">{{workHistory.workCompany}}</span></li>
        <li>{{workHistory.position}}</li>
      </ul>
      <div style="padding:15px">
        <x-button class="btn" @click.native="sendResume">立即投递</x-button>
      </div>
    </group>
  </div>
</template>
<script>
  import { XInput,XButton,Group,Picker,Cell,TransferDom,Popup,DatetimeView,PopupPicker,Flexbox, FlexboxItem,XSwitch,Datetime,Icon,Box } from 'vux'
  export default {
    name:'preview',
    data(){
      return{
        interviewResumeInfo:{
          positionId:null,
          resumeId:null,//简历文件id
          attachmentIds:null,//附件ids
          name:null,
          phone:null,
          email:null,
          sex:null,
          birthday:null,
          educationHistoryList:[],
          workHistoryList:[],
        },
        professional:['博士','研究生','本科','大专','其他'],
        shareOpenId:this.$route.query.shareOpenId,
        recomType:this.$route.query.recomType
      }
    },
    mounted(){
      this.index();
    },
    methods:{
      index(){
        var self=this;
        self.interviewResumeInfo=JSON.parse(localStorage.interviewResumeInfo);
        console.log(self.interviewResumeInfo);
      },
      sendResume(){
        var self=this;
        console.log(self.shareOpenId,"shareOpenId")
        var method="recruitPosition/submitInterivewApplicationNew",
            param=JSON.stringify({
              interviewResumeInfo:self.interviewResumeInfo,
              shareOpenId:self.shareOpenId,
              recomType:self.recomType
            }),
            successd=function (res) {
                  self.$router.push({path:'/results',query:{type:res.data.data}});
              };
        self.$http(method,param,successd);
      }
    },
    components:{
      XInput,
      XButton,
      Group,
      Picker,
      Cell,
      Popup,DatetimeView,
      PopupPicker,
      Flexbox,
      FlexboxItem,
      XSwitch,
      Datetime,
      Icon,Box
    },
    directives: {
      TransferDom
    },
  }
</script>
<style lang="less">
    @import '~vux/src/styles/1px.less';
    </style>
<style scoped>
.slide{padding: 10px 15px;}
.slide li{margin-bottom:10px;font-size:0.32rem;}
.btn{color:#fff;background-color:#5AA2E7;height:0.92rem;line-height:0.2rem;}
.preview .btn:active{color:#fff;background-color:#5AA2E7;}
.preview .btn:focus{outline:none;}
.preview_header{height: 3rem;background-color: #5AA2E7;color: #fff;text-align: center;font-size: 0.36rem;}
.preview_header .header_one{font-size: 0.48rem;padding-top:0.6rem;}
.preview_header .header_one .sex{font-size: 0.28rem;background-color: #f00;border-radius: 50%;width: 0.4rem;height: 0.4rem;display: inline-block;line-height: 0.4rem;}
.preview_header .header_one .sex:last-child{background-color: #46BE8A;}
.preview_header .header_two{line-height: 1rem;}
.margin_left_10{margin-left: 10px}
.margin_right_10{margin-right: 10px}
</style>