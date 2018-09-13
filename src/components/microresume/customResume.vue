<template>
    <div class="page-custom-resume">

        <group class="baseInfoTitle" gutter='0' :label-width="labelWidth" title="基本信息">
          <x-input title="姓名" v-model="interviewResumeInfo.name" class="" placeholder="请输入姓名"></x-input>
          
          <x-input title='手机号' v-model="interviewResumeInfo.phone"  :max="13"
                   is-type="china-mobile" placeholder="请输入手机号码" class="baseInfoName"></x-input>
          <x-input title="邮  箱" name="email" placeholder="请输入邮箱地址" is-type="email"
                   v-model="interviewResumeInfo.email" class="baseInfoName"></x-input>
          <datetime v-model="interviewResumeInfo.birthday" title="出生年月" :min-year="1970" :max-year="2020" placeholder="请选择出生年月" value-text-align="left"></datetime>
          <cell title="性别" value-align="left">
            <check-icon :value.sync="boolSexM">男</check-icon><check-icon :value.sync="boolSexF" style="margin-left:10px;">女</check-icon>
          </cell>
        </group>
        <group class="baseInfoTitle" gutter='0' :label-width="labelWidth" title="其他信息">
            <x-input title="民族" v-model="interviewResumeInfo.nationName" class="" placeholder="请输入民族"></x-input>
            <x-input title="籍贯" v-model="interviewResumeInfo.jiguanName" class="" placeholder="请输入籍贯"></x-input>
            <popup-picker title="政治面貌" :data="list1" v-model="picker1" value-text-align="left" placeholder="请选择"></popup-picker>
            <popup-picker title="英语等级" :data="list2" v-model="picker2"  value-text-align="left" placeholder="请选择"></popup-picker>
            <popup-picker title="计算机等级" :data="list3" v-model="picker3" value-text-align="left" placeholder="请选择"></popup-picker>
            <x-input title="毕业院校" v-model="interviewResumeInfo.graduateSchool" class="" placeholder="请输入毕业院校"></x-input>
            <x-input title="专业名称" v-model="interviewResumeInfo.majorName" class="" placeholder="请输入专业名称"></x-input>
            <popup-picker title="学  历" :data="list4" v-model="picker4" value-text-align="left" placeholder="请选择"></popup-picker>
            <popup-picker title="面试区域" :data="list5" v-model="picker5" value-text-align="left" placeholder="请选择"></popup-picker>
            <cell title="有无传染病史" value-align="left">
              <check-icon :value.sync="isHaveInfection">有</check-icon>
            </cell>
        </group>
        <div class="resume_submit">
            <x-button class="success_resume_btn" @click.native="updateSimpleResume" :show-loading="btnLoading">立即投递</x-button>
        </div>
        <toast v-model="toastShow" type="text" :text="toastText" position="top"></toast>

    </div>
</template>

<script>
  import {
    XInput,XButton,Group,Picker,Cell,TransferDom,Popup,DatetimeView,PopupPicker,Flexbox,FlexboxItem,XSwitch,Datetime,Icon,Box,Toast,CheckIcon} from 'vux'

export default {
    data(){
        return {
            labelWidth:'110px',
            shareFansId: this.$route.query.shareFansId,
            fansId:this.$route.query.fansId,
            positionId: this.$route.query.id,
            recomType: this.$route.query.recomType,
            companyId:this.$route.query.companyId,
            activityId:this.$route.query.activityId,
            interviewResumeInfo: {
                positionId: this.$route.query.id,
                resumeId: null,//简历文件id
                attachmentIds: null,//附件ids
                name: '',
                phone: '',
                email: '',
                sex: '',
                birthday: '',
                nationName:'',
                jiguanName:'',
                politicalStatus:'',
                englishLv:'',
                computerLv:'',
                majorName:'',
                graduateSchool:'',
                educationLv:'',
                interviewArea:'',
                isHaveInfection:'',
                educationHistoryList: [],
                workHistoryList: []
            },
            boolSexM:true,
            boolSexF:false,
            isHaveInfection:false,
            list1:[['党员','预备党员','团员','群众']],
            picker1:[],
            list2:[['无','大学三级(CET3)','大学四级(CET4)','大学六级(CET6)','专业四级(TEM4)','专业八级(TEM8)']],
            picker2:[],
            list3:[['无','一级','二级','三级','四级']],
            picker3:[],
            list4: [['博士','研究生','本科','大专','其他']],
            picker4:[],
            list5:[['东北','华中','华南','西北']],
            picker5:[],
            btnLoading:false,
            toastShow:false,
            toastText:''
        }
    },
    components: {
      XInput,
      XButton,
      Group,
      Picker,
      Cell,
      Popup, DatetimeView,
      PopupPicker,
      Flexbox,
      FlexboxItem,
      XSwitch,
      Datetime,
      Icon,
      Box,
      Toast,
      CheckIcon
    },
    directives: {
      TransferDom
    },
    mounted(){
        this.getSimpleResume();
    },
    methods:{
        getSimpleResume(){
            let self=this;
            let method="resume/getSimpleResume",
                param=JSON.stringify({
                    fansId:self.fansId,
                    companyId:self.companyId
                }),
                successd=function(res){
                    let _data = res.data.data;
                    if(_data && _data.phone){
                        self.interviewResumeInfo.name = _data.name;
                        self.interviewResumeInfo.phone = _data.phone;
                        self.interviewResumeInfo.email = _data.email;
                        self.interviewResumeInfo.birthday = _data.birthday;
                        self.interviewResumeInfo.sex = _data.sex;
                        if(_data.sex == 2){
                            self.boolSexM = false;
                            self.boolSexF = true;
                        }
                        self.interviewResumeInfo.nationName = _data.nationName;
                        self.interviewResumeInfo.jiguanName = _data.jiguanName;
                        self.picker1 = _data.politicalStatus ? [_data.politicalStatus] : [];
                        self.picker2 = _data.englishLv ? [_data.englishLv] : [];
                        self.picker3 = _data.computerLv ? [_data.computerLv] : [];
                        self.picker4 = _data.educationLv ? [_data.educationLv] : [];
                        self.picker5 = _data.interviewArea ? [_data.interviewArea] : [];
                        self.interviewResumeInfo.graduateSchool = _data.graduateSchool;
                        self.interviewResumeInfo.majorName = _data.majorName;
                        self.interviewResumeInfo.isHaveInfection = _data.isHaveInfection;
                        self.isHaveInfection = !!(_data.isHaveInfection*1);
                    }
                };
                self.$http(method,param,successd);
            },
        /**
         * 表单验证
         */  
        checkForm(){
            let info = this.interviewResumeInfo;
            console.log(info)
            if(!info.name){
                this.toastText = "请输入姓名";
                this.toastShow = true;
                return;
            }
            if(!info.phone){
                this.toastText = "请输入手机号";
                this.toastShow = true;
                return;
            }
            if(!info.email){
                this.toastText = "请输入邮箱";
                this.toastShow = true;
                return;
            }
            if(!info.birthday){
                this.toastText = "请选择出生年月";
                this.toastShow = true;
                return;
            }
            if(!info.nationName){
                this.toastText = "请输入民族";
                this.toastShow = true;
                return;
            }
            if(!info.jiguanName){
                this.toastText = "请输入籍贯";
                this.toastShow = true;
                return;
            }
            if(!info.politicalStatus){
                this.toastText = "请选择政治面貌";
                this.toastShow = true;
                return;
            }
            if(!info.englishLv){
                this.toastText = "请选择英语等级";
                this.toastShow = true;
                return;
            }
            if(!info.computerLv){
                this.toastText = "请选择计算机等级";
                this.toastShow = true;
                return;
            }
            if(!info.graduateSchool){
                this.toastText = "请输入毕业院校";
                this.toastShow = true;
                return;
            }
            if(!info.majorName){
                this.toastText = "请输入专业";
                this.toastShow = true;
                return;
            }
            if(!info.educationLv){
                this.toastText = "请选择学历";
                this.toastShow = true;
                return;
            }
            if(!info.interviewArea){
                this.toastText = "请选择面试区域";
                this.toastShow = true;
                return;
            }
            return true;
        },    
        /**
         * 保存简历
         */
        updateSimpleResume(){          
            var self=this;
            if(self.boolSexM){
                self.interviewResumeInfo.sex = 1;
            }else{
                self.interviewResumeInfo.sex = 2;
            }
            self.interviewResumeInfo.politicalStatus = self.picker1[0] ? self.picker1[0] : '';
            self.interviewResumeInfo.englishLv = self.picker2[0] ? self.picker2[0] : '';
            self.interviewResumeInfo.computerLv = self.picker3[0] ? self.picker3[0] : '';
            self.interviewResumeInfo.educationLv = self.picker4[0] ? self.picker4[0] : '';
            self.interviewResumeInfo.interviewArea = self.picker5[0] ? self.picker5[0] : '';
            if(self.isHaveInfection){
                self.interviewResumeInfo.isHaveInfection = '1';
            }else{
                self.interviewResumeInfo.isHaveInfection = '0';
            }
             if(!this.checkForm()){
                return;
            }
            let method="resume/updateSimpleResume",
            param=JSON.stringify({
              fansId:self.fansId,
              step:'-1',
              simpleResumeInfo:self.interviewResumeInfo
            }),
            successd=function(res){
               if(res.data.code == '0'){
                   //简历保存成功之后进行投递
                    self.sendResume();
               }
            };
            self.$http(method,param,successd);
        },
        /**
         * 投递简历
         */
        sendResume(){
            var self=this;
            if(self.btnLoading){
                return
            }else{
                self.btnLoading=true;
            }
            if(localStorage.resumeFrom){
                self.interviewResumeInfo.resumeFrom = localStorage.resumeFrom
            }else{
                self.interviewResumeInfo.resumeFrom = ''
            }
            var method="resume/postResumeForChinaDianJian",
                param=JSON.stringify({
                    interviewResumeInfo:self.interviewResumeInfo,
                    shareFansId:self.shareFansId,
                    recomType:self.recomType,
                    fansId:self.fansId,
                    activityId:self.activityId
                }),
                successd=function (res) {
                    // localStorage.removeItem('resumeFrom')
                    self.$router.push({path:'/results',query:{type:res.data.data,companyId:self.companyId,fansId:self.fansId}});
                },
                c=function(res){
                    self.btnLoading=false;
                    self.$vux.toast.text(res.data.message,"top")
                };
            self.$http(method,param,successd,c);
        },
    },
    watch:{
        boolSexM(val,oldVal){
            this.boolSexF = oldVal;
        },
        boolSexF(val,oldVal){
            this.boolSexM = oldVal;
        },
    }


}
</script>

<style lang="less" scoped>
.resume_submit{ 
    padding:.8rem 0;
}
.success_resume_btn{
    width:6.7rem;
    background-color: #5cb3ff;
    color: #fff;
}

</style>
<style>
.page-custom-resume .weui-cells__title{
    padding-bottom: .1rem;
    padding-top:.2rem;
}
.page-custom-resume .vux-cell-value{color:#333;}
</style>



