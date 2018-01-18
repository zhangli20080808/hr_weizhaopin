<template>
  <div id="language" :style="{'min-height':wh+'px'}">
    <group title="沟通也是门手艺" :label-width="labelWidth" v-for="(item,index) in model" :key="item.languageLevel">
      <x-input title="语种" v-model="item.languageSkill" placeholder="请填写语种名称"></x-input>
      <popup-picker title="掌握程度" :data="languageArr" v-model="item.sexValue" value-text-align="left"></popup-picker>
      <cell class="color_F96868" title="删除" @click.native="deleItem(index)"></cell>
    </group>
    <group label-width="auto">
      <cell title="+添加一条语言" class="color_5AA2E7" @click.native="add"></cell>
    </group>
    <div style="padding:15px;">
      <x-button @click.native="save" type="primary" class="weizhaopin_btn">完成</x-button>
    </div>
  </div>
</template>
<script>
import { XInput,Group,Datetime,PopupPicker,XTextarea,XButton,Cell,CheckIcon} from 'vux'
export default {
  name:'language',
  data(){
    document.title="编辑教育经历";
    var wh=window.innerHeight;
    return{
      wh:wh,
      labelWidth:'100px',
      languageArr:[['初级(入门)',"中级(日常会话)","中高级(商务会话)","高级(无障碍商务沟通)"]],
      sexValue:['初级(入门)'],
      companyName:'',
      fansId:this.$route.query.fansId,
      model:[],
    }
  },
  mounted(){
    this.getResumeInfoByRoute();
  },
  methods:{
    getResumeInfoByRoute(){
      var self=this;
      var method="resume/getResumeInfoByRoute",
          param=JSON.stringify({
            fansId:self.fansId,
            route:'language'
          }),
          successd=function(res){
            res.data.data.model.forEach(function(item) {
              item.sexValue=[];
              item.sexValue[0]=item.languageLevel;
            });
            self.model=res.data.data.model;
          };
      self.$http(method,param,successd);
    },
    go(num){
      this.$router.go(-1);
    },
    deleItem(index){
      this.model.splice(index,1);
    },
    add(){
      this.model.push({
        languageLevel:'初级(入门)',languageSkill:'',sexValue:['初级(入门)']
      })
    },
    save(){
      var self=this;
      self.model.forEach((item)=>{
        item.languageLevel=item.sexValue[0];
      });
      var method="resume/updateResumeInfo",
          param=JSON.stringify({
            fansId:self.fansId,
            route:'language',
            model:self.model
          }),
          successd=function(res){
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
#language{
  background-color: #f8f8fc;
  padding-top:.1rem;
}
</style>
<style>
#language .vux-cell-value{color: #000;}
#language .vux-datetime-value{text-align: left;}
</style>

