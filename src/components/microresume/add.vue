<template>
  <div id="add_resume" class="add_resume">
    <div v-show="type==1">
      <div class="createText"><span class="text">创建个人简历</span></div>
      <div class="first" @click="go(2)">
        <div class="resume_icon"></div>
        <div class="resume_text">一分钟创建微简历</div>
      </div>
      <div class="createText"><span class="text">快速导入简历</span></div>
    </div>

    <div class="content" v-show="type==2">
      <ul class="content_header">
        <li :class="{active:headType==1,successd:headType>1}">基本信息<span></span><i class="el-icon-check"
                                                                                  v-if="headType>1"></i></li>
        <li :class="{active:headType==2,successd:headType>2}">联系方式<span></span><i class="el-icon-check"
                                                                                  v-if="headType>2"></i></li>
        <li :class="{active:headType==3,successd:headType>3}">教育经历<span></span><i class="el-icon-check"
                                                                                  v-if="headType>3"></i></li>
        <li :class="{active:headType==4,successd:headType>4}">工作经历<span></span><i class="el-icon-check"
                                                                                  v-if="headType>4"></i></li>
      </ul>
      <!--基本信息-->
      <div v-if="headType==1" class="baseInfo">
        <group :label-width="labelWidth" class="baseInfoTitle">
          <x-input title="姓名" v-model="interviewResumeInfo.name" class="baseInfoName"></x-input>
          <!-- <cell is-link @click.native="showPopup = true"  :value="value2" title="生日"></cell> -->
          <datetime v-model="interviewResumeInfo.birthday" title="生日" :min-year="1970" :max-year="2010"></datetime>
          <popup-picker title="性别" :data="sexArr" v-model="sexValue" show-name value-text-align="left"></popup-picker>
        </group>
        <flexbox class="position_bottom">
          <flexbox-item>
            <x-button class="btn" @click.native="changeHeadType('2')">下一步</x-button>
          </flexbox-item>
        </flexbox>
      </div>
      <!-- 联系方式 -->
      <div v-if="headType==2" class="baseInfo">
        <group :label-width="labelWidth" class="baseInfoTitle">
          <x-input title="邮  箱" name="email" placeholder="请输入邮箱地址" is-type="email"
                   v-model="interviewResumeInfo.email" class="baseInfoName"></x-input>
          <x-input title='手机号码' v-model="interviewResumeInfo.phone" mask="999 9999 9999" :max="13"
                   is-type="china-mobile" placeholder="请输入手机号码" class="baseInfoName"></x-input>
        </group>
        <flexbox class="position_bottom" :gutter="15">
          <flexbox-item>
            <x-button class="btn last_step" @click.native="changeHeadType('1')">上一步</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button class="btn" @click.native="changeHeadType('3')">下一步</x-button>
          </flexbox-item>
        </flexbox>
      </div>
      <!-- 教育经历 -->
      <div v-if="headType==3" class="baseInfo">
        <group label-width="100%" v-for="(educationHistory,index) in interviewResumeInfo.educationHistoryList"
               :key="educationHistory.startDateStr" class="baseInfoTitle">
          <cell :title="educationHistory.startDateStr+'  至  '+educationHistory.endDateStr"
                v-if="educationHistory.isReading==0"><i class="el-icon-delete color_F96868"
                                                        @click="removeEducationSave(index)"></i></cell>
          <cell :title="educationHistory.startDateStr+'  至今'" v-else><i class="el-icon-delete color_F96868"
                                                                        @click="removeEducationSave(index)"></i></cell>
          <p class="side">
            {{educationHistory.graduateSchool}}&nbsp;&nbsp;{{professionalValue[educationHistory.educationLev - 1]}}
          </p>
          <p class="slide">{{educationHistory.major}}</p>
          <!-- <ul class="slide vux-1px-b" v-for="educationHistory in interviewResumeInfo.educationHistoryList">
            <li style="color:#475669;"><span class="margin_right_10">{{educationHistory.startDateStr}}</span>至<span class="margin_left_10">{{educationHistory.isReading==1?'今':educationHistory.endDateStr}}</span></li>
            <li><span class="margin_right_10">{{educationHistory.graduateSchool}}</span><span>{{professional[educationHistory.educationLev-1]}}</span></li>
            <li>{{educationHistory.major}}</li>
          </ul> -->
        </group>
        <div class="add_education" @click="addEducation=true;" v-if="addEducation==false">添加一条教育经验</div>
        <group v-if="addEducation" label-align="left" :label-width="labelWidth">
          <x-switch title="目前在读" v-model="isReading"></x-switch>
          <datetime v-model="value3" @on-change="change" title="开始时间" format="YYYY-MM" :min-year="1970"
                    :max-year="2020"></datetime>
          <datetime v-model="value4" @on-change="change" title="结束时间" format="YYYY-MM" v-show="!isReading"
                    :min-year="1970" :max-year="2020"></datetime>
          <cell title="结束时间" v-show="isReading">至今</cell>
          <x-input title="毕业学校" name="graduateSchool" placeholder="请输入毕业学校" v-model="graduateSchool"></x-input>
          <popup-picker title="学  历" :data="professional" v-model="value6" show-name
                        value-text-align="left"></popup-picker>
          <x-input title="专  业" name="major" placeholder="请输入专业" v-model="major"></x-input>
        </group>
        <flexbox class="position_bottom" :gutter="15">
          <flexbox-item v-if="addEducation">
            <x-button class="btn" @click.native="addEducationSave">保存</x-button>
          </flexbox-item>
          <flexbox-item v-if="addEducation==false">
            <x-button class="btn last_step" @click.native="changeHeadType('2')">上一步</x-button>
          </flexbox-item>
          <flexbox-item v-if="addEducation==false">
            <x-button class="btn" @click.native="changeHeadType('4')">下一步</x-button>
          </flexbox-item>
        </flexbox>
      </div>
      <!-- 工作经历 -->
      <div v-if="headType==4" class="baseInfo">
        <group label-width="100%" v-for="(workHistory,index) in interviewResumeInfo.workHistoryList"
               :key="workHistory.startDateStr" class="baseInfoTitle">
          <cell :title="workHistory.startDateStr+'  至  '+workHistory.endDateStr" v-if="workHistory.isWorking==0"><i
            class="el-icon-delete color_F96868" @click="removeExperienceSave(index)"></i></cell>
          <cell :title="workHistory.startDateStr+'  至今'" v-else><i class="el-icon-delete color_F96868"
                                                                   @click="removeExperienceSave(index)"></i></cell>
          <p class="side">{{workHistory.workCompany}}<br/>{{workHistory.position}}</p>
          <!-- <ul class="slide vux-1px-b" v-for="workHistory in interviewResumeInfo.workHistoryList">
            <li style="color:#475669;"><span class="margin_right_10">{{workHistory.startDateStr}}</span>至<span class="margin_left_10">{{workHistory.isWorking==1?'今':workHistory.endDateStr}}</span></li>
            <li><span class="margin_right_10">{{workHistory.workCompany}}</span></li>
            <li>{{workHistory.position}}</li>
          </ul> -->
        </group>
        <div class="add_education" @click="addExperience=true;" v-if="addExperience==false">添加一条工作经历</div>
        <group v-if="addExperience" :label-width="labelWidth">
          <x-switch title="目前在职" v-model="isWorking"></x-switch>
          <datetime v-model="startDateStr" @on-change="change" title="开始时间" format="YYYY-MM" :min-year="1970"
                    :max-year="2020"></datetime>
          <datetime v-model="endDateStr" @on-change="change" title="结束时间" format="YYYY-MM" v-show="!isWorking"
                    :min-year="1970" :max-year="2020"></datetime>
          <cell title="结束时间" v-show="isWorking">至今</cell>
          <x-input title="公  司" name="workCompany" placeholder="请输入公司" v-model="workCompany"></x-input>
          <x-input title="职  位" name="position" placeholder="请输入职位" v-model="position"></x-input>
        </group>
        <flexbox class="position_bottom" :gutter="15">
          <flexbox-item v-if="addExperience">
            <x-button class="btn" @click.native="addExperienceSave">保存</x-button>
          </flexbox-item>
          <flexbox-item v-if="addExperience==false">
            <x-button class="btn last_step" @click.native="changeHeadType('3')">上一步</x-button>
          </flexbox-item>
          <flexbox-item v-if="addExperience==false">
            <x-button class="btn" @click.native="go(3)">下一步</x-button>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
    <div v-if="type==3">
      <icon type="success-circle" is-msg
            style="text-align:center;margin:0rem auto;display:block;padding-top:2rem;"></icon>
      <p class="success_resume">简历完成</p>
      <x-button class="btn success_resume_btn" @click.native="previewResume">预览简历</x-button>
      <x-button class="success_resume_btn" @click.native="reuturnResume">返回修改</x-button>
    </div>
    <toast v-model="toastShow" type="text" :text="toastText" position="top"></toast>

    <div v-show="type==1" class="second">
      <div class="second_1" @click="jobsLogin(1)">
        <div class="second_icon"></div>
        <div class="second_text">前程无忧（51job)</div>
        <div class="second_join"><span class="text">导入</span></div>
      </div>
      <div class="second_2" @click="jobsLogin(2)">
        <div class="second_icon"></div>
        <div class="second_text">智联招聘</div>
        <div class="second_join"><span class="text">导入</span></div>
      </div>
      <div class="second_3" @click="jobsLogin(6)">
        <div class="second_icon"></div>
        <div class="second_text">拉勾网</div>
        <div class="second_join"><span class="text">导入</span></div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    XInput,
    XButton,
    Group,
    Picker,
    Cell,
    TransferDom,
    Popup,
    DatetimeView,
    PopupPicker,
    Flexbox,
    FlexboxItem,
    XSwitch,
    Datetime,
    Icon,
    Box,
    Toast
  } from 'vux'
  export default {
    name: 'add',
    data(){

      return {
        type: '1',
        headType: '1',
        name: '王若云',
        showPopup: false,
        value2: '',
        sexValue: ['1'],
        value4: null,
        value3: null,
        graduateSchool: null,
        major: null,
        startDateStr: null,
        endDateStr: null,
        workCompany: null,
        position: null,
        sexArr: [[
          {name: '男', value: '1'},
          {name: '女', value: '2'},
        ]],
        email: '',
        phone: '',
        isWorking: false,
        isReading: false,
        professional: [[
          {name: '博士', value: '1'},
          {name: '研究生', value: '2'},
          {name: '本科', value: '3'},
          {name: '大专', value: '4'},
          {name: '其他', value: '5'}
        ]],
        value6: ['3'],
        title3: '2011-9至2015-09',
        addEducation: false,
        addExperience: false,
        labelWidth: '100px',
        interviewResumeInfo: {
          positionId: this.$route.query.id,
          resumeId: null,//简历文件id
          attachmentIds: null,//附件ids
          name: '',
          phone: '',
          email: '',
          sex: '',
          birthday: '',
          educationHistoryList: [],
          workHistoryList: []
        },
        professionalValue: ['博士', '研究生', '本科', '大专', '其他'],
        toastText: '',
        toastShow: false,
        shareFansId: this.$route.query.shareFansId,
        fansId:this.$route.query.fansId,
        positionId: this.$route.query.id,
        recomType: this.$route.query.recomType
      }
    },
    mounted(){
      document.title = "创建简历";
      this.index();
    },
    methods: {
      index(){
        if (localStorage.interviewResumeInfo) {
          this.interviewResumeInfo = JSON.parse(localStorage.interviewResumeInfo);
        } else {
          this.interviewResumeInfo = {
            positionId: this.$route.query.id,
            resumeId: null,//简历文件id
            attachmentIds: null,//附件ids
            name: '',
            phone: '',
            email: '',
            sex: '',
            birthday: '',
            educationHistoryList: [],
            workHistoryList: []
          }
        }
        this.interviewResumeInfo.positionId = this.$route.query.id;
        if (!(this.interviewResumeInfo && this.interviewResumeInfo.educationHistoryList.length > 0)) {
          this.addEducation = true;
        }
        if (!(this.interviewResumeInfo && this.interviewResumeInfo.workHistoryList.length > 0)) {
          this.addExperience = true;
        }
      },
      go(type){
        this.type = type;
      },
      changeHeadType(type){
        var interviewResumeInfo = JSON.parse(JSON.stringify(this.interviewResumeInfo));
        interviewResumeInfo.sex = this.sexValue[0];
        interviewResumeInfo.positionId = this.$route.query.id;
        localStorage.interviewResumeInfo = JSON.stringify(interviewResumeInfo);
        if (!this.interviewResumeInfo.name || this.interviewResumeInfo.name == "") {
          this.toastText = "请输入姓名";
          this.toastShow = true;
          return;
        }
        if (this.interviewResumeInfo.birthday == "") {
          this.toastText = "请选择生日";
          this.toastShow = true;
          return;
        }
        if (type == 3 && (!this.interviewResumeInfo.phone || this.interviewResumeInfo.phone == "")) {
          this.toastText = "请输入手机号";
          this.toastShow = true;
          return;
        }
        if (type == 3 && (!this.interviewResumeInfo.email || this.interviewResumeInfo.email == "")) {
          this.toastText = "请输入邮箱";
          this.toastShow = true;
          return;
        }
        this.headType = type;
      },
      showTime(){
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          format: 'YYYY-MM',
          value: '2017-05-20 18',
          onConfirm (val) {
            console.log('plugin confirm', val)
          },
          onShow () {
            console.log('plugin show')
          },
          onHide () {
            console.log('plugin hide')
          }
        })
      },
      onClick(input){
        this.input5 = !this.input5;
      },
      change(a, b, c){
        console.log(a, b, c)
      },
      addEducationSave(){
        var self = this;
        if (!self.value3 || self.value3 == "") {
          self.toastText = "请选择开始时间";
          self.toastShow = true;
          return;
        }
        if (!self.isReading && (!self.value4 || self.value4 == "")) {
          self.toastText = "请选择结束时间";
          self.toastShow = true;
          return;
        }
        if (!self.graduateSchool || self.graduateSchool == "") {
          self.toastText = "请输入毕业学校";
          self.toastShow = true;
          return;
        }
        if (!self.major || self.major == "") {
          self.toastText = "请输入专业";
          self.toastShow = true;
          return;
        }
        self.interviewResumeInfo.educationHistoryList.push({
          startDateStr: self.value3,
          endDateStr: self.value4,
          graduateSchool: self.graduateSchool,
          major: self.major,
          educationLev: self.value6[0],
          isReading: self.isReading ? '1' : '0'
        })
        self.addEducation = false;
      },
      removeEducationSave(index){
        var self = this;
        self.interviewResumeInfo.educationHistoryList.splice(index, 1);
      },
      addExperienceSave(){
        var self = this;
        if (!self.startDateStr || self.startDateStr == "") {
          self.toastText = "请选择开始时间";
          self.toastShow = true;
          return;
        }
        if (!self.isWorking && (!self.endDateStr || self.endDateStr == "")) {
          self.toastText = "请选择结束时间";
          self.toastShow = true;
          return;
        }
        if (!self.workCompany || self.workCompany == "") {
          self.toastText = "请输入公司名称";
          self.toastShow = true;
          return;
        }
        if (!self.position || self.position == "") {
          self.toastText = "请输入公司职位";
          self.toastShow = true;
          return;
        }
        self.interviewResumeInfo.workHistoryList.push({
          startDateStr: self.startDateStr,
          endDateStr: self.endDateStr,
          workCompany: self.workCompany,
          position: self.position,
          isWorking: self.isWorking ? '1' : '0'
        });
        self.addExperience = false;
      },
      removeExperienceSave(index){
        var self = this;
        self.interviewResumeInfo.workHistoryList.splice(index, 1);
      },
      previewResume(){
        var self = this;
        self.changeHeadType(4);
        self.$router.push({
          path: '/preview',
          query: {
            positionId: self.positionId, 
            shareFansId: self.shareFansId, 
            recomType: self.recomType,
            fansId:self.fansId
          }
        });
      },
      reuturnResume(){
        this.type = 2;
        this.headType = 1;
      },
      jobsLogin(type){
        var self = this;
        self.$router.push({
          path: '/loginResume',
          query: {
            type: type, 
            positionId: self.positionId, 
            shareFansId: self.shareFansId, 
            recomType: self.recomType,
            fansId:self.fansId
          }
        })
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
      Toast
    },
    directives: {
      TransferDom
    },
  }
</script>
<style lang="less">
  @import '~vux/src/styles/1px.less';
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin.styl"

  .add_resume {
    padding-bottom: 1.12rem;
    .createText {
      background: #F8F8FC;
      padding: 0.28rem 0 0.25rem 0.3rem;
      .text {
        display: block;
        vertical-align: middle;
        font-size: 0.28rem;
        color: #666;
      }
    }
    .second {
      .second_1 {
        display: flex;
        align-items: center
        padding: 0.32rem 0.32rem 0.32rem 0.3rem;
        position: relative;
        border-t-1px(#E5E5E5)
        .second_icon {
          width: 0.72rem;
          height: 0.72rem;
          margin-right: 20px;
          color: #000;
          background: url(../images/resum_1.png) no-repeat center;
          background-size: cover
        }
        .second_text {
          font-size: 0.32rem;
        }
        .second_join {
          flex: 1;
          .text {
            display: block;
            float: right;
            width: 1.49rem;
            height: 0.64rem;
            border: 1px solid #DDDDDD;
            font-size: 0.32rem;
            color: #000;
            text-align: center;
            line-height: 0.64rem;
          }
        }

      }
      .second_2 {
        display: flex;
        align-items: center
        padding: 0.32rem 0.32rem 0.32rem 0.3rem;
        position: relative;
        border-b-1px(#E5E5E5)
        border-top: 1px solid #E5E5E5;
        .second_icon {
          width: 0.72rem;
          height: 0.72rem;
          margin-right: 20px;
          color: #000;
          background: url(../images/resum_2.png) no-repeat center;
          background-size: cover
        }
        .second_text {
          font-size: 0.32rem;
        }
        .second_join {
          flex: 1;
          .text {
            display: block;
            float: right;
            width: 1.49rem;
            height: 0.64rem;
            border: 1px solid #DDDDDD;
            font-size: 0.32rem;
            color: #000;
            text-align: center;
            line-height: 0.64rem;
          }
        }

      }
      .second_3 {
        display: flex;
        align-items: center
        padding: 0.32rem 0.32rem 0.32rem 0.3rem;
        position: relative;
        border-b-1px(#E5E5E5)

        .second_icon {
          width: 0.72rem;
          height: 0.72rem;
          margin-right: 20px;
          color: #000;
          background: url(../images/resum_4.png) no-repeat center;
          background-size: cover
        }
        .second_text {
          font-size: 0.32rem;
        }
        .second_join {
          flex: 1;
          .text {
            display: block;
            float: right;
            width: 1.49rem;
            height: 0.64rem;
            border: 1px solid #DDDDDD;
            font-size: 0.32rem;
            color: #000;
            text-align: center;
            line-height: 0.64rem;
          }
        }

      }
    }
    .content {
      .baseInfo {
        .baseInfoTitle {
          .baseInfoName {
            .weui-cell__hd {
              .weui-label {
                font-size: 0.28rem !important
              }
            }
          }
        }
      }
    }
  }

  .first {
    display: flex;
    align-items: center;
    padding: 0.32rem 0 0.36rem 0.3rem;
    color: #000;
    background-color: #fff;
    border-b-1px(#E5E5E5)
    border-t-1px(#E5E5E5)
  }

  .first img {
    width: 1.2rem;
    height: 2rem;
    display: block;
    margin: 0 auto;
    font-size: 0.28rem;
    padding-top: 0.8rem;
  }

  .first p {
    font-size: 0.48rem;
    text-align: center;
    font-weight: 400;
    margin-top: 20px;
  }

  .first a {
    font-size: 0.48rem;
    display: block;
    text-align: center;
    margin-top: 0.48rem;
    color: #C7C7CC;
  }

  .second {
    margin-top: 0;
    background-color: #fff;
  }

  .content_header {
    display: flex;
    justify-content: center;
    background-color: #5AA2E7;
  }

  .content_header li {
    font-size: 0.28rem;
    width: 24%;
    text-align: center;
    height: 1rem;
    line-height: 1.2rem;
    color: rgba(255, 255, 255, 0.6);
    position: relative;
  }

  .content_header li i {
    position: absolute;
    top: 5px;
    left: 50%;
    margin-left: -9px;
  }

  .content_header li span {
    display: none;
  }

  .content_header li.active {
    color: #fff;
  }

  .content_header li.successd {
    color: #fff;
  }

  .content_header li.active span {
    width: 0.2rem;
    height: 0.2rem;
    background-color: #fff;
    position: absolute;
    bottom: -7px;
    display: block;
    left: 50%;
    margin-left: -0.1rem;
    transform: rotateZ(45deg);
  }

  .btn {
    color: #fff;
    background-color: #5AA2E7;
    height: 0.92rem;
    line-height: 0.2rem;
  }

  .add_resume .btn:active {
    color: #fff;
    background-color: #5AA2E7;
  }

  .add_resume .btn:focus {
    outline: none;
  }

  .position_bottom {
    position: fixed;
    bottom: 10px;
    padding: 0 15px;
    .vux-flexbox-item {
      .weui-btn {
        font-size: 0.28rem
      }
    }
  }

  .add_resume .last_step {
    color: #fff;
    background-color: #C0CCDA;
  }

  .add_resume .last_step:active {
    color: #fff;
    background-color: #C0CCDA;
  }

  .add_resume .last_step:focus {
    color: #fff;
    background-color: #C0CCDA;
  }

  .side {
    padding: 0px 15px 10px;
  }

  .add_education {
    font-size: 0.28rem;
    color: #5aa2e7;
    padding: 10px 15px;
  }

  .success_resume {
    font-size: 0.32rem;
    text-align: center;
    color: #1F2D3D;
    margin-top: 0.68rem;
  }

  #add_resume .success_resume_btn {
    width: 3.2rem;
    margin: 1rem auto 0;
    display: block;
  }

  .slide {
    padding: 10px 15px;
  }

  .slide li {
    margin-bottom: 10px;
  }

  .resume_icon {

    width: 0.76rem;
    height: 0.76rem;
    background: url(../images/resum_3.png) no-repeat center;
    background-size: cover;
    margin-right: 0.4rem;
  }

  .resume_text {
    font-size: 0.32rem;
  }

  .resume_icon i.iconfont {
    line-height: 1rem;
    width: 1rem;
    height: 1rem;
    display: block;
    font-size: 0.5rem;
  }
</style>
<style lang="stylus" rel="stylesheet/stylus">
  #add_resume {
    .content {
      .weui-cell {
        padding: 17px 15px !important;
      }
      .baseInfo {
        .baseInfoTitle {
          :before {
            border-top: none;
          }
          :after {
            border-bottom: none;
          }
          .vux-no-group-title {
            :before {
              border-top: none !important
            }
          }
          .baseInfoName {
            .weui-cell__hd {
              .weui-label {
                font-size: 0.28rem !important;
              }
            }
            .weui-cell__primary {
              border-bottom: 1px solid #ccc
              .weui-input {
                font-size: 0.32rem !important
                margin-bottom: 8px;
              }
            }
          }
          .weui-cell_access {
            p {
              font-size: 0.28rem;
            }
          }
          .vux-datetime-value {
            border-bottom: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            height: 33px;
            .vux-cell-value {
              display: inline-block;
              margin-bottom: 0.2rem;
              font-size: 0.28rem;
              color: #000;
            }
          }
          .vux-cell-box {
            .weui-cell_access {
              .weui-cell__hd {
                .weui-label {
                  font-size: 0.28rem;
                }
              }
              .vux-cell-primary {
                .vux-popup-picker-select {
                  .vux-cell-value {
                    font-size: 0.32rem;
                    color: #000;
                  }
                }
              }
            }
          }
        }
        .vux-no-group-title {
          font-size: 0.28rem;
          color :#000;
          .weui-cell_access {
            .vux-datetime-value {
              .vux-cell-value {
                font-size: 0.32rem;
                color: #000;
              }
            }
          }
          .vux-x-input {
            .weui-cell__primary {
              .weui-input {
                font-size :0.32rem!important
                &::placeholder {
                  color :#999!important
                  font-size :0.28rem!important
                  }
                }
              }
            }
          .vux-cell-box{
            .weui-cell{
              .vux-cell-primary{
                .vux-popup-picker-select{
                  .vux-cell-value{
                    color :#000
                    font-size :0.32rem!important
                  }
                }
              }
            }
          }
          }
        }
      }
    }

    .add_resume .weui-switch:focus {
      outline: none;
      outline-offset: 0
    }

    .add_resume a:hover {
      color: #000;
      text-decoration: none;
    }

    .add_resume .color_F96868 {
      color: #F96868;
    }

    .add_resume .weui-btn {
      border-radius: 4px;
    }

    .add_resume .weui-cell__ft {
      text-align: left;
      color :#000
    }
    /*  .add_resume .weui-cell__ft .weui-icon{
        position: absolute;
        display: block;
        top: 23px;
        right: 15px;
      }*/

    .margin_left_10 {
      margin-left: 10px
    }

    .margin_right_10 {
      margin-right: 10px
    }

    @font-face {
      font-family: 'iconfont';  /* project id 184183 */
      src: url('//at.alicdn.com/t/font_ipkuz640wtf647vi.eot');
      src: url('//at.alicdn.com/t/font_ipkuz640wtf647vi.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_ipkuz640wtf647vi.woff') format('woff'),
        url('//at.alicdn.com/t/font_ipkuz640wtf647vi.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_ipkuz640wtf647vi.svg#iconfont') format('svg');
    }

    .iconfont {
      font-family: "iconfont" !important;
      font-size: 18px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -webkit-text-stroke-width: 0.2px;
      -moz-osx-font-smoothing: grayscale;
    }
</style>
