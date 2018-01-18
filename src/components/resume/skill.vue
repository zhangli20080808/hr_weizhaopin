<template>
  <div id="skill" :style="{'min-height':wh+'px'}">
    <group title="这不是炫技,是您天生的能力" :label-width="labelWidth" class="skill_wrap">
      <dl class="skill_list" v-for="(item,index) in model" :key="item.languageSkill">
        <dt class="close_x" @click="removeItem(index)"></dt>
        <dd>{{item.languageSkill}}</dd>
      </dl>
      <p class="add_skill" @click="show5=true">+ 添加</p>
    </group>
    <div style="padding:15px;">
      <x-button @click.native="save" type="primary" class="weizhaopin_btn">完成</x-button>
    </div>
    <div v-transfer-dom>
      <confirm v-model="show5"
      show-input
      ref="confirm5"
      title="技能名称"
      @on-confirm="onConfirm">
      </confirm>
    </div>
  </div>
</template>
<script>
import { XInput,Group,Datetime,PopupPicker,XTextarea,XButton,Cell,CheckIcon,Confirm,TransferDomDirective as TransferDom} from 'vux'
export default {
  name:'skill',
  data(){
    document.title="编辑技能";
    var wh=window.innerHeight;
    return{
      wh:wh,
      show5:false,
      labelWidth:'100px',
      fansId:this.$route.query.fansId,
      model:[{'languageSkill':'js'}]
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
            route:'skill'
          }),
          successd=function(res){
            self.model=res.data.data.model;
          };
      self.$http(method,param,successd);
    },
    onConfirm(input){
      if(input){
        this.model.push({'languageSkill':input});
      }
    },
    removeItem(index){
      this.model.splice(index,1);
    },
    save(){
      var self=this;
      var method="resume/updateResumeInfo",
          param=JSON.stringify({
            fansId:self.fansId,
            route:'skill',
            model:self.model
          }),
          successd=function(res){
            self.$router.go(-1);
          };
      self.$http(method,param,successd);
    }
  },
  components:{
    XInput,Group,Datetime,PopupPicker,XTextarea,XButton,Cell,CheckIcon,Confirm
  },
  directives:{
    TransferDom 
  }
}
</script>
<style scoped>
#skill{
  background-color: #f8f8fc;
  padding-top:.1rem;
}
.skill_list{display: inline-block;padding:6px 15px 3px;background-color: #53C68B;color: #fff;border-radius: 3px;margin:0 .2rem .2rem 0;position: relative;}
.add_skill{color: #bfbfbf;padding: 5px 10px 2px;border:1px dashed #bfbfbf;display: inline-block;border-radius: 3px;}
</style>
<style>
.skill_wrap .weui-cells{padding: 15px;}
</style>

