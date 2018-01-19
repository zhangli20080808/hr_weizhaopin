<template>
  <div id="work" :style="{'min-height':wh+'px'}">
    <group title="每一次,都是全新的蜕变" :label-width="labelWidth">
      <x-input title="公司名称" v-model="work.workCompany" placeholder="请填写公司名称"></x-input>
      <x-input title="职位名称" v-model="work.position" placeholder="请填写职位名称"></x-input>
      <x-input title="部门名称" v-model="work.workDepartment" placeholder="请填写部门名称"></x-input>
    </group>
    <group :label-width="labelWidth">
      <datetime v-model="work.startDateStr" title="开始时间" :min-year="1970" :max-year="2010" placeholder="请选择开始时间" format="YYYY-MM"></datetime>
      <datetime v-model="work.endDateStr" title="结束时间" :min-year="1970" :max-year="2010" placeholder="请选择结束时间" v-if="!isWorking" format="YYYY-MM"></datetime>
      <cell title="结束时间" value-align="left" v-else is-link>至今</cell>
      <cell title="目前在职" value-align="left">
        <check-icon :value.sync="isWorking">是</check-icon>
      </cell>
    </group>
    <group :label-width="labelWidth">
      <x-textarea :max="1000" placeholder="工作描述" v-model="work.descript"></x-textarea>
    </group>
    <div style="padding:15px;">
      <x-button @click.native="save" type="primary" class="weizhaopin_btn">完成</x-button>
      <x-button @click.native="delExperienceById" type="primary" class="weizhaopin_btn_D64949" v-if="id">删除该条工作经历</x-button>
    </div>
  </div>
</template>
<script>
import {XInput,Group,Datetime,PopupPicker,XTextarea,XButton,Cell,CheckIcon} from 'vux'
export default {
  name:'work',
  data(){
    document.title="工作经历";
    var wh=window.innerHeight;
    return{
      wh:wh,
      labelWidth:'100px',
      startDate:'',
      endDate:'',
      companyName:'',
      positionName:'',
      deptName:'',
      isWorking:false,
      id:this.$route.query.id,
      fansId:this.$route.query.fansId,
      work:{
        id:0,
        startDateStr:'',
        endDateStr:'',
        isWorking:'',
        position:'',
        workCompany:'',
        workDepartment:'',
        descript:''
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
            route:'jobexp',
            id:self.id
          }),
          successd=function(res){
            self.work=res.data.data.model;
            self.isWorking=res.data.data.model.isWorking==1;
          };
      self.$http(method,param,successd);
    },
    save(){
      var self=this;
      self.work.isWorking=self.isWorking?1:0;
      if(self.work.workCompany==''){
        self.$vux.toast.text("请输入公司名称");
        return false;
      }
      if(self.work.position==''){
        self.$vux.toast.text("请输入职位名称");
        return false;
      }
      if(self.work.startDateStr==''){
        self.$vux.toast.text("请选择开始时间");
        return false;
      }
      if(self.work.endDateStr==''&&!self.isWorking){
        self.$vux.toast.text("请选择结束时间");
        return false;
      }
      var method="resume/updateResumeInfo",
          param=JSON.stringify({
            fansId:self.fansId,
            route:'jobexp',
            model:self.work
          }),
          successd=function(res){
            self.$router.push({name:'resumePreview',query:{fansId:self.fansId}});
          };
      self.$http(method,param,successd);
    },
    delExperienceById(){
      var self=this;
      var method="resume/delExperienceById",
          param=JSON.stringify({
            fansId:self.fansId,
            route:'jobexp',
            id:self.id
          }),
          successd=function(res){
            self.$router.push({name:'resumePreview',query:{fansId:self.fansId}});
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
#work{
  background-color: #f8f8fc;
  padding-top: .1rem;
}
</style>
<style>
#work .vux-cell-value{color: #000;}
#work .vux-datetime-value{text-align: left;}
</style>


