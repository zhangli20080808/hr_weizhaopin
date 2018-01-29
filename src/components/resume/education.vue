<template>
  <div id="education" :style="{'min-height':wh+'px'}">
    <group title="那些年,总有说不完的故事" :label-width="labelWidth">
      <x-input title="学校名称" v-model="education.graduateSchool" placeholder="请填写学校名称" class="is_required"></x-input>
      <x-input title="专业名称" v-model="education.major" placeholder="请填写专业名称"></x-input>
      <popup-picker title="学历" :data="educationLevArr" v-model="educationLev" show-name value-text-align="left"></popup-picker>
    </group>
    <group :label-width="labelWidth">
      <datetime v-model="education.startDateStr" title="开始时间" :min-year="1970" :max-year="2010" placeholder="请选择开始时间" format="YYYY-MM"></datetime>
      <datetime v-model="education.endDateStr" title="结束时间" :min-year="1970" :max-year="2010" placeholder="请选择结束时间" v-if="!isReading" format="YYYY-MM"></datetime>
      <cell title="结束时间" value-align="left" v-else is-link>至今</cell>
      <cell title="目前在读" value-align="left">
        <check-icon :value.sync="isReading">是</check-icon>
      </cell>
    </group>
    <group :label-width="labelWidth">
      <x-textarea :max="1000" placeholder="教育经验描述" v-model="education.descript"></x-textarea>
    </group>
    <div style="padding:15px;">
      <x-button @click.native="save" type="primary" class="weizhaopin_btn">完成</x-button>
      <x-button @click.native="delExperienceById" type="primary" class="weizhaopin_btn_D64949" v-if="id!=0">删除该条教育经历</x-button>
    </div>
  </div>
</template>
<script>
import { XInput,Group,Datetime,PopupPicker,XTextarea,XButton,Cell,CheckIcon} from 'vux'
export default {
  name:'education',
  data(){
    document.title="编辑教育经验";
    var wh=window.innerHeight;
    return{
      wh:wh,
      labelWidth:'100px',
      startDate:'',
      endDate:'',
      companyName:'',
      positionName:'',
      deptName:'',
      isReading:false,
      fansId:this.$route.query.fansId,
      id:this.$route.query.id,
      educationLev:['3'],
      educationLevArr:[[
        {name:'博士',value:'1'},
        {name:'研究生',value:'2'},
        {name:'本科',value:'3'},
        {name:'大专',value:'4'},
        {name:'其他',value:'5'},
        {name:'高中',value:'6'},
        {name:'中专',value:'7'},
        {name:'初中及以下',value:'8'},
        {name:'博士后',value:'0'},
      ]],
      education:{
        graduateSchool:'',
        major:'',
        educationLev:'',
        startDateStr:'',
        endDateStr:'',
        descript:'',
        isReading:0,
        id:0
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
            route:'eduexp',
            id:self.id
          }),
          successd=function(res){
            self.education=res.data.data.model;
            self.isReading=res.data.data.model.isReading==1;
            self.educationLev[0]=res.data.data.model.educationLev+'';
          };
      self.$http(method,param,successd);
    },
    save(){
      var self=this;
      if(self.education.graduateSchool==""){
        self.$vux.toast.text('请输入学校名字');
        return false
      }
      if(self.education.major==""){
        self.$vux.toast.text('请输入专业名称');
        return false
      }
      if(self.education.startDateStr==""){
        self.$vux.toast.text('请选择开始时间');
        return false
      }
      if(self.education.endDateStr==""&&!self.isReading){
        self.$vux.toast.text('请选择结束时间');
        return false
      }
      self.education.educationLev=self.educationLev[0]-0;
      var method="resume/updateResumeInfo",
          param=JSON.stringify({
            fansId:self.fansId,
            route:'eduexp',
            model:self.education
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
            route:'eduexp',
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
#education{
  background-color: #f8f8fc;
  padding-top: .1rem;
}
.is_required:before{content:'*';color: #ff4949;display: block;}
</style>
<style>
#education .vux-cell-value{color: #000;}
#education .vux-datetime-value{text-align: left;}
</style>