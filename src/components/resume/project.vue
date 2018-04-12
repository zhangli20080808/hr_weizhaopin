<template>
  <div id="project" :style="{'min-height':wh+'px'}">
    <group title="有哪些有趣或者牛逼的事情也说说吧" :label-width="labelWidth">
      <x-input title="项目名称" v-model="project.projectName" placeholder="你参加了什么项目?"></x-input>
      <x-input title="所属企业" v-model="project.company" placeholder="项目是属于什么企业?"></x-input>
    </group>
    <group :label-width="labelWidth">
      <datetime v-model="project.startDateStr" title="开始时间" :min-year="1970" :max-year="2010" placeholder="请选择开始时间" format="YYYY-MM"></datetime>
      <datetime v-model="project.endDateStr" title="结束时间" :min-year="1970" v-if="!untilNow" :max-year="2010" placeholder="请选择结束时间" format="YYYY-MM"></datetime>
      <cell title="结束时间" value-align="left" v-else is-link>至今</cell>
      <cell title="进行中" value-align="left">
        <check-icon :value.sync="untilNow">是</check-icon>
      </cell>
    </group>
    <group :label-width="labelWidth">
      <x-textarea :max="1000" placeholder="项目描述" v-model="project.projectDescription"></x-textarea>
    </group>
    <div style="padding:15px;">
      <x-button @click.native="save" type="primary" class="weizhaopin_btn">完成</x-button>
      <x-button @click.native="delExperienceById" type="primary" class="weizhaopin_btn_D64949" v-if="id!=0">删除该条项目</x-button>
    </div>
  </div>
</template>
<script>
import {XInput,Group,Datetime,PopupPicker,XTextarea,XButton,Cell,CheckIcon} from 'vux'
export default {
  name:'project',
  data(){
    document.title="编辑项目经验";
    var wh=window.innerHeight;
    return{
      wh:wh,
      labelWidth:'100px',
      startDate:'',
      endDate:'',
      companyName:'',
      positionName:'',
      deptName:'',
      untilNow:false,
      fansId:this.$route.query.fansId,
      id:this.$route.query.id,
      project:{
        projectName:'',
        company:'',
        startDateStr:'',
        endDateStr:'',
        projectDescription:'',
        id:this.$route.query.id,
        untilNow:0
      }
    }
  },
  mounted(){
    if(this.id!=0){
      this.getResumeInfoByRoute();
    }
  },
  methods:{
    getResumeInfoByRoute(){
      var self=this;
      var method="resume/getResumeInfoByRoute",
          param=JSON.stringify({
            fansId:self.fansId,
            route:'projectexp',
            id:self.id
          }),
          successd=function(res){
            self.project=res.data.data.model;
            self.untilNow=res.data.data.model.untilNow==1;
          };
      self.$http(method,param,successd);
    },
    save(){
      var self=this;
      if(self.project.projectName==""){
        self.$vux.toast.text('请输入项目名称');
        return false
      }
      if(self.project.startDateStr==""){
        self.$vux.toast.text('请选择开始时间');
        return false
      }
      if(self.project.endDateStr=="" && !self.untilNow){
        self.$vux.toast.text('请选择结束时间');
        return false
      }
      if(self.untilNow){
          self.project.untilNow = 1
          self.project.endDateStr = ""
      }else{
          self.project.untilNow = 0
      }
      var method="resume/updateResumeInfo",
          param=JSON.stringify({
            fansId:self.fansId,
            route:'projectexp',
            model:self.project
          }),
          successd=function(res){
            // self.$router.push({name:'resumePreview',query:{fansId:self.fansId}});
            self.$router.go(-1);
          };
      self.$http(method,param,successd);
    },
    delExperienceById(){
      var self=this;
      var method="resume/delExperienceById",
          param=JSON.stringify({
            fansId:self.fansId,
            route:'projectexp',
            id:self.id
          }),
          successd=function(res){
            // self.$router.push({name:'resumePreview',query:{fansId:self.fansId}});
            self.$router.go(-1);
          };
      self.$http(method,param,successd);
    }
  },
  components:{
    XInput,Group,Datetime,PopupPicker,XTextarea,XButton,Cell,CheckIcon
  }
}
</script>
<style scoped lang="less">
#project{
  background-color: #f8f8fc;
  padding-top: .1rem;
}
</style>
<style>
#project .vux-cell-value{color: #000;}
#project .vux-datetime-value{text-align: left;}
</style>