<template>
  <div id="self_introduction" :style="{'min-height':wh+'px'}">
    <!-- 自我介绍 -->
    <group title="我们很确信,您拥有独特的个性">
      <x-textarea :max="1000" placeholder="座右铭: 告诉别人你是不同的" v-model="myEvaluation"></x-textarea>
    </group>
    <div style="padding:15px;">
      <x-button @click.native="save" type="primary" class="weizhaopin_btn">完成</x-button>
    </div>
  </div>
</template>
<script>
import { XInput,Group,Datetime,PopupPicker,XTextarea,XButton} from 'vux'
export default {
  name:'selfIntroduction',
  data(){
    document.title="编辑自我介绍";
    var wh=window.innerHeight;
    return{
      wh:wh,
      fansId:this.$route.query.fansId,
      myEvaluation:''
    }
  },
  mounted(){
    this.getAllResume();
  },
  methods:{
    getAllResume(){
      var self=this;
      var method="resume/getAllResume",
          param=JSON.stringify({
            fansId:self.fansId,
            route:'description'
          }),
          successd=function(res){
            self.myEvaluation=res.data.data.myEvaluation.myEvaluation;
          };
      self.$http(method,param,successd);
    },
    save(){
      var self=this;
      var method="resume/updateResumeInfo",
          param=JSON.stringify({
            fansId:self.fansId,
            route:'description',
            model:{'myEvaluation':self.myEvaluation}
          }),
          successd=function(res){
            self.$router.push({name:'resumePreview',query:{fansId:self.fansId}})
          };
      self.$http(method,param,successd);
    }
  },
  components:{
    XInput,Group,Datetime,PopupPicker,XTextarea,XButton
  }
}
</script>
<style lang="less">
#self_introduction{
  background-color: #f8f8fc;
  padding-top: .2rem;
}
</style>


