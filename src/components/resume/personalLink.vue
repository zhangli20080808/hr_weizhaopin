<template>
  <div id="personal_link" :style="{'min-height':wh+'px'}">
    <group title="我们想了解不止一面的您" :label-width="labelWidth">
      <x-input title="网址" v-model="model.linkUrl" placeholder="请填写网站地址"></x-input>
    </group>
    <group>
      <x-textarea :max="1000" placeholder="描述" v-model="model.linkDescription"></x-textarea>
    </group>
    <div style="padding:15px;">
      <x-button @click.native="save" type="primary" class="weizhaopin_btn">完成</x-button>
    </div>
  </div>
</template>
<script>
import { XInput,Group,Datetime,PopupPicker,XTextarea,XButton,Cell,CheckIcon} from 'vux'
export default {
  name:'personalLink',
  data(){
    document.title="编辑个人链接";
    var wh =window.innerHeight;
    return{
      wh:wh,
      link:'',
      fansId:this.$route.query.fansId,
      model:{
        linkUrl:'',
        linkDescription:''
      }
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
            route:'link'
          }),
          successd=function(res){
            self.model=res.data.data.model;
          };
      self.$http(method,param,successd);
    },
    save(){
      var self=this;
      var method="resume/updateResumeInfo",
          param=JSON.stringify({
            fansId:self.fansId,
            route:'link',
            model:self.model
          }),
          successd=function(res){
            self.$router.go(-1);
          };
      self.$http(method,param,successd);
    }
  },
  components:{XInput,Group,Datetime,PopupPicker,XTextarea,XButton,Cell,CheckIcon}
}
</script>
<style scoped>
#personal_link{background-color: #f8f8fc;padding-top:.1rem;}
</style>


