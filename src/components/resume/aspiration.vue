<template>
  <div id="aspiration" :style="{'min-height':wh+'px'}">
    <group title="告诉我们您更想成为的那个" :label-width="labelWidth">
      <x-input title="期望职能" v-model="model.expectPosition"></x-input>
      <popup-picker title="工作类型" :data="aspirationArr" v-model="sexValue" show-name value-text-align="left"></popup-picker>
      <!-- <x-input title="期望城市" v-model="link"></x-input> -->
      <x-address title="期望城市" v-model="value1" :list="addressData" value-text-align="left" hide-district raw-value class="border_t_1"></x-address>
      <!-- <x-input title="期望月薪" v-model="link"></x-input> -->
      <popup-picker title="期望月薪" :data="list2" v-model="value2" value-text-align="left" placeholder="请选择期望月薪" :display-format="format" ></popup-picker>
    </group>
    <div style="padding:15px;">
      <x-button @click.native="save" type="primary" class="weizhaopin_btn">完成</x-button>
    </div>
  </div>
</template>
<script>
import { XInput,Group,Datetime,PopupPicker,XTextarea,XButton,Cell,CheckIcon,XAddress,ChinaAddressV4Data,Picker,Value2nameFilter as value2name} from 'vux'
export default {
  name:'aspiration',
  data(){
    document.title="编辑求职意愿";
    var wh=window.innerHeight;
    return{
      fansId:this.$route.query.fansId,
      addressData: ChinaAddressV4Data,
      wh:wh,
      labelWidth:'100px',
      aspirationArr:[[
        {name:'全职',value:'1'},
        {name:'兼职',value:'2'},
        {name:'实习',value:'3'},
      ]],
      list2:[[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]],
      sexValue:[],
      value2:[],
      value1: [],
      format:()=>{
        return this.value2[0]+'K - '+this.value2[1]+'K'
      },
      link:"",
      model:{
        maxSalary:'',
        expectPosition:'',
        workType:'',
        minSalary:'',
        expectPlace:''
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
            route:'jobpref'
          }),
          successd=function(res){
            self.model=res.data.data.model;
            self.value1=res.data.data.model.expectPlace.split(' ');
            //选择框必须接受全部更新才能渲染到页面,真的烦
            var arr=[];
            arr.push(res.data.data.model.minSalary);
            arr.push(res.data.data.model.maxSalary);
            self.value2=arr;
            let arr2=[];
            arr2[0]=res.data.data.model.workType+'';
            self.sexValue=arr2;
          };
      self.$http(method,param,successd);
    },
    save(){
      var self=this;
      self.model.workType=self.sexValue[0];
      self.model.minSalary=self.value2[0];
      self.model.maxSalary=self.value2[1];
      self.model.expectPlace=value2name(self.value1, ChinaAddressV4Data);
      var method="resume/updateResumeInfo",
          param=JSON.stringify({
            fansId:self.fansId,
            route:'jobpref',
            model:self.model
          }),
          successd=function(res){
            self.$router.go(-1);
          };
      self.$http(method,param,successd);
    }
  },
  components:{
    XInput,Group,Datetime,PopupPicker,XTextarea,XButton,Cell,CheckIcon,XAddress,Picker
  }
}
</script>
<style scoped>
#aspiration{background-color: #f8f8fc;padding-top:.1rem;}
.border_t_1{position: relative;}
.border_t_1:before{content: " ";
    position: absolute;
    top: 0;
    width: 100%;
    height: 1px;
    border-top: 1px solid #d9d9d9;
    color: #d9d9d9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    left: 15px;}
</style>
<style>
#aspiration .vux-cell-value{color: #000;}
#aspiration .vux-datetime-value{text-align: left;}
</style>
