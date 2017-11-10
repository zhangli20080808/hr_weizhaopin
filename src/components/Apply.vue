<template>
  <div id="apply">
    <!--back-->
    <div class="back hidden-sm hidden-lg">
      <i class="icon" @click="back"></i>
      <h2 class="title">推荐简历</h2>
    </div>
    <div class="container">
      <div class="detail_des hidden-xs hidden-sm">
        <el-breadcrumb separator=">" class="tips">
          <el-breadcrumb-item class="tips_1">招聘首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/list',query:{ companyId: this.companyId}}" class="tips_2">职位列表


          </el-breadcrumb-item>
          <el-breadcrumb-item @click="backlist" class="tips_3">职位详情</el-breadcrumb-item>
          <el-breadcrumb-item>申请职位</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="detail_show hidden-xs">
        <div class="content">
          <div class="name visible-xs">申请职位</div>
          <div class="title">{{name}}</div>
          <div class="text">
            <span class="des">{{getCity(address)}}/{{positionType === 1 ? '全职' : positionType === 2 ? '兼职' : '实习'
              }}</span><span class="price">{{salaryLow}}k-{{salary}}k</span>
          </div>
          <div class="p_time">发布时间：{{filter(time)}}</div>
        </div>
      </div>
      <div class="apply_name visible-xs">
        申请职位
      </div>
      <div class="apply_post">
        <div class="apply_content">
          <el-form :label-position="labelPosition" label-width="80px" ref="ruleForm" :model="formLabelAlign"
                   :rules="rules" class="clearfix" style="display:block;">
            <!--上传简历-->
            <el-form-item label="上传简历">
              <el-upload
                class="post"
                :action="upLogoUrl"
                :data="params"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="successed"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div class="tips hidden-sm hidden-lg">仅限于安卓手机</div>
                <div slot="tip" class="el-upload__tip">支持PDF、HTML、Word等简历格式</div>
              </el-upload>
            </el-form-item>
            <!--上传附件-->
            <el-form-item label="上传附件" class="post_f">
              <el-upload
                class="post1"
                :action="upLogoUrl"
                :data="params"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="successed2"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">附件大小总和不超过50MB</div>
              </el-upload>
            </el-form-item>
            <!-- <div class="line" >
              萨达
            </div> -->
            <el-form-item label="渠道导入" style="clear:both;padding-left:50px;font-size:14px;color:#48576a;width:100%;">
              <el-button @click.native="loginResume=true;login.type=5"><img src="../common/image/micresume/qianchengwuyou.png" style="height:16px;vertical-align:middle;margin-right:10px" />前程无忧</el-button>
              <el-button @click.native="loginResume=true;login.type=6"><img src="../common/image/micresume/zhilianzhaopin.png" style="height:16px;vertical-align:middle;margin-right:10px" />智联招聘</el-button>
              <el-button @click.native="loginResume=true;login.type=8"><img src="../common/image/micresume/lagou.png" style="height:16px;vertical-align:middle;margin-right:10px" />拉勾网</el-button>
            </el-form-item>
            <!-- <el-form-item label="姓名" prop="name">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model.number="formLabelAlign.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="mail">
              <el-input v-model.email="formLabelAlign.mail"></el-input>
            </el-form-item>
            <el-form-item class="form_btn">
              <el-button type="primary" @click="submitForm('ruleForm')" class="btn">提交应聘请求</el-button>
            </el-form-item> -->
          </el-form>
        </div>
      </div>

      <div class="apply_personal">
        <h1>一分钟创建微简历</h1>
        <el-form label-position="right" label-width="100px" class="clearfix" ref="AddInterviewer">
          <h2 class="resume_title">基本信息</h2>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="InterviewerInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="name">
            <el-radio v-model="InterviewerInfo.sex" label="1">男</el-radio>
            <el-radio v-model="InterviewerInfo.sex" label="2">女</el-radio>
          </el-form-item>
          <el-form-item label="手机号" prop="name">
            <el-input v-model.number="InterviewerInfo.phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="name">
            <el-input v-model="InterviewerInfo.email"></el-input>
          </el-form-item>
          <el-form-item label="出生日期" prop="name" class="">
            <el-date-picker
              v-model="InterviewerInfo.birthday"
              type="date"
              style="width:100%;"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>

          <h2 class="resume_title">教育经历</h2>

          <div class="EducationHistory clearfix" v-for="(edu,index) in InterviewerInfo.educationHistoryList">
            <el-form-item label="开始时间" prop="name">
              <el-date-picker
                v-model="edu.startDate"
                type="month"
                format='yyyy-MM'
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="是否在读">
              <el-switch
              v-model="edu.isReading"
              on-text=""
              off-text="">
              </el-switch>
            </el-form-item>
            <el-form-item label="结束时间" prop="name" v-if="!edu.isReading">
                <el-date-picker
                  v-model="edu.endDate"
                  type="month"
                  format='yyyy-MM'
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            <el-form-item label="毕业学校" prop="name">
              <el-input v-model="edu.graduateSchool"></el-input>
            </el-form-item>
            <el-form-item label="学历" prop="name">
              <el-select v-model="edu.educationLev" placeholder="请选择">
                <el-option
                  v-for="item in educationLevArr"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="专业" prop="name">
              <el-input v-model="edu.major"></el-input>
            </el-form-item>
            <el-button class="EducationHistory_dele" type="danger" @click.native="deleEducationHistory(index)" v-if="index!=0">删除</el-button>
          </div>
          <el-form-item>
            <el-button @click.native="addEducationHistory">新增一条</el-button>
          </el-form-item>

          <h2 class="resume_title">工作经历</h2>
          <div class="EducationHistory clearfix" v-for="(work,index) in InterviewerInfo.workHistoryList">
              <el-form-item label="开始时间" prop="name">
                <el-date-picker
                  v-model="work.startDate"
                  type="month"
                  format='yyyy-MM'
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="是否在职">
                <el-switch
                v-model="work.isWorking"
                on-text=""
                off-text="">
                </el-switch>
              </el-form-item>
              <el-form-item label="结束时间" prop="name" v-if="!work.isWorking">
                  <el-date-picker
                    v-model="work.endDate"
                    type="month"
                    format='yyyy-MM'
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              <el-form-item label="所在公司" prop="name">
                <el-input v-model="work.workCompany"></el-input>
              </el-form-item>
              <el-form-item label="职位" prop="name">
                <el-input v-model="work.position"></el-input>
              </el-form-item>
              <el-button class="EducationHistory_dele" type="danger" @click.native="deleworkHistory(index)" v-if="index!=0">删除</el-button>
            </div>
            <el-form-item>
              <el-button @click.native="addworkHistory">新增一条</el-button>
            </el-form-item>
            <el-form-item class="submitInterivewApplicationNew">
              <el-button @click.native="submitInterivewApplicationNew" type="primary">提交应聘申请</el-button>
            </el-form-item>
        </el-form>
      </div>

      <el-dialog
        class="tips1"
        title="提示"
        :visible.sync="dialogVisible"
        size="small"
      >
        <div class="content">
          <div class="img">

          </div>
          <div class="title">提交成功</div>
          <div class="des">感谢您的申请，我们将会尽快给您回复</div>
        </div>
      </el-dialog>

      <el-dialog
        title="登录并导入简历"
        v-model="loginResume"
        size="tiny">
        <div class="login_icon" :class="{'jobs':login.type==5,'zhilian':login.type==6,'lagou':login.type==8}"></div>
        <div class="login_con"> 
          <el-input v-model="login.account" placeholder="请输入账号" class="user"></el-input>
          <el-input v-model="login.pwd" placeholder="请输入密码" type="password" class="user"></el-input>
          <el-input v-model="login.email" placeholder="请输入邮箱" class="user" v-if="login.type==6"></el-input>
          <el-input v-model="login.phone" placeholder="请输入手机号" class="user" v-if="login.type==6"></el-input>
          <el-button type="primary" class="login_resume_btn" @click.native="loginFun()">确认授权</el-button>
        </div>
        <div class="login_footer">
          <p>爱聚HR将读取一下内容</p>
          <p>1.完整档案,包括项目经历,教育背景等</p>
          <p>2.账户的邮箱.手机号等联系方式</p>
          <p>3.个人基本信息以及通讯地址</p>
        </div>
      </el-dialog>

      <!-- 验证码 -->
      <el-dialog
      title="请输入验证码"
      v-model="showScrollBox"
      size="tiny"
      class="vcode_dialog"
      >
      <div class="img_title">
          <img :src="src" alt="点击刷新" style="width:132px;">
      </div>
      <el-input v-model="login.vcode" class="user" placeholder="请输入验证码"></el-input>
      <el-button type="primary" class="login_resume_btn" @click.native="loginFun(-1)">提交</el-button>
    </el-dialog>

    </div>
    <footerNav></footerNav>
  </div>
</template>
<script>
  import Util from '../common/js/util.js';
  import md5 from 'js-md5';
  import Scroll from './base/scroll.vue'
  import footerNav from './base/foot'

  const ERROR_OK = 0
  export default {
    data() {
      return {
        src:'',
        value6:'',
        value7:'',
        upLogoUrl: Util.uploadURLForCommon,
        companyId: 0,
        fileIds: [],
        resumeId: 0,
        ids1: 0,
        interviewerId: 0,
        attachmentIds: [],
        id:null,
        name: null,
        salary: null,
        salaryLow: null,
        address: null,
        time:null,
        positionType: null,
        fileList: [],
        labelPosition: 'left',
        formLabelAlign: {
          name: '',
          phone: '',
          mail: ''
        },
        rules: {
          name: [
            {required: true, message: '请填写姓名', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '手机号不能为空'},
            {type: 'number', message: '必须为数字值'}
          ],
          mail: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}
          ],
          post_j: [
            {required: true, message: '请上传简历', trigger: 'change'}
          ]
        },
        dialogVisible: false,
        params: {
          param: JSON.stringify({businessId: 14, fId: -1}),
          sign: md5('method' + "fileUpload/insertFileRecord" + "param" + JSON.stringify({
              businessId: 14,
              fId: -1
            }) + "ecbao")
        },

        InterviewerInfo:{
          positionId:'26',
          resumeId:null,//简历文件id
          attachmentIds:null,//附件ids
          name:'',
          sex:'1',
          phone:'',
          email:'',
          birthday:'',
          educationHistoryList:[
            {startDate:'',endDate:'',graduateSchool:'',major:'',educationLev:'',isReading:false}
          ],
          workHistoryList:[
            {startDate:'',endDate:'',projectName:'',workCompany:'',position:'',isWorking:false}
          ]
        },
        educationLevArr:[
          {name:'博士',value:'1'},
          {name:'研究生',value:'2'},
          {name:'本科',value:'3'},
          {name:'大专',value:'4'},
          {name:'其他',value:'5'}
        ],

        loginResume:false,
        showScrollBox:false,
        login:{
          account:'',
          pwd:'',
          vcode:'',
          businessId:'14',
          fId:'-1',
          companyId:'',
          type:'',
          phone:'',
          email:''
        }
      }
    },

    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePreview(file) {
        console.log(file)
      },
      beforeAvatarUpload(file) {
        console.log(file)
        const isLt2M = file.size / 1024 / 1024 < 10
        if (!isLt2M) {
          alert('上传模板大小不能超过 50MB!')
        }
      },
      successed(res, file) {
        this.resumeId = res.data.ids
      },
      successed2(res, file) {
        this.attachmentIds.push(res.data.ids)
      },

      uploadResume() {
        var _this = this
        var method = "addResume/uploadResume";
        var param = JSON.stringify({
          ids: _this.resumeId,
          recommendId: "",
          recommendPhone: "",
          resumeFrom: 14,
          positionId: _this.id
        });
        var successd = function (res) {
          if (res.data.code = 0) {
            console.log(res.data)
            console.log(2)
            _this.interviewerId = res.data.data
            _this.$message({
              message: res.data.message,
              type: 'success'
            });
          }
        }
        _this.$http(method, param, successd);
      },

      submitForm(formName) {
        var self = this;

        self.$refs[formName].validate((valid) => {
          if (valid) {
            if (!this.resumeId) {
              alert('请上传您的简历')
              return
            }
            var self = this
            var method = "addResume/uploadResume";
            var param = JSON.stringify({
              ids: self.resumeId,
              recommendId: "",
              recommendPhone: "",
              resumeFrom: 14,
              positionId: self.id
            });
            var successd = function (res) {
              if (res.data.code == 0) {
                console.log(res.data)
                self.interviewerId = res.data.data
                self.submit()
              }
            }
            self.$http(method, param, successd);
          } else {
//            alert('提交失败')
            return false
          }
        })
      },
      submit(){
        var self = this
        var method = 'promotionPage/submitInterivewApplication',
          param = JSON.stringify({
            positionApply: {
              resumeId: self.resumeId,
              attachmentIds: String(self.attachmentIds),
              name: self.formLabelAlign.name,
              phone: self.formLabelAlign.phone,
              email: self.formLabelAlign.mail,
              interviewerId: self.interviewerId,
              resumeFrom: 14,
              positionId: self.id
            }
          }),

          succeed = function (res) {
            if (res.data.code == 0) {
              if (res.data.data === true) {
                self.$message({
                  message: res.data.message,
                  type: 'success'
                });
                self.dialogVisible = true
                setTimeout(() => {
                  self.$router.push({
                    path: `/list/${self.id}`,
                    query: {companyId: self.companyId}
                  })
                }, 1000)
              } else {
                alert('提交失败')
              }
            }
          };
        this.$http(method, param, succeed);
      },
      backIndex() {
        this.$router.push({
          path: `/`,
          query: {companyId: this.companyId}
        })
      },
      filter(item){
        if(item){
          return item.slice(0, 10)
        }
      },
      backSec() {
        this.$router.push({
          path: `/list`,
          query: {companyId: this.companyId}
        })
      },
      getCity(item){
        if(item){
          return item.split(',')[1]
        }
      },
      backlist() {
        this.$router.push({
          path: `/list/${this.id}`,
          params: {
            id: this.id
          },
          query: {companyId: this.companyId}
        })
      },
      back() {
        this.$router.back()
      },
      getPositonDetail(id){
        var self=this;
        var method="promotionPage/positionInfo",
            param=JSON.stringify({
              id:id
            }),
            successd=function(res){
              self.name=res.data.data.positionInfo.positionName;
              self.salary=res.data.data.positionInfo.positionSalaryHighest;
              self.salaryLow=res.data.data.positionInfo.positionSalaryLowest;
              self.address=res.data.data.positionInfo.workCity;
              self.time=res.data.data.positionInfo.posiPublishTime;
              self.positionType=res.data.data.positionInfo.positionType;
            };
        self.$http(method,param,successd);
      },
      addEducationHistory(){
        var self=this;
        self.InterviewerInfo.educationHistoryList.push({startDate:'',endDate:'',graduateSchool:'',major:'',educationLev:'',isReading:false})
      },
      deleEducationHistory(index){
        var self=this;
        self.InterviewerInfo.educationHistoryList.splice(index,1);
      },
      addworkHistory(){
        var self=this;
        self.InterviewerInfo.workHistoryList.push({startDate:'',endDate:'',projectName:'',workCompany:'',position:'',isWorking:false});
      },
      deleworkHistory(index){
        var self=this;
        self.InterviewerInfo.workHistoryList.splice(index,1);
      },
      submitInterivewApplicationNew(){
        var self=this;
        var method="recruitPosition/submitInterivewApplicationNew";
        var InterviewerInfo=JSON.parse(JSON.stringify(self.InterviewerInfo));
        InterviewerInfo.educationHistoryList.forEach(function(item) {
          item.startDateStr=self.$date(item.startDate,'month');
          if(!item.isReading){
            item.endDateStr=self.$date(item.startDate,'month');
            item.isReading=0;
          }else{
            item.endDate="";
            item.isReading=1;
          }
        });
        InterviewerInfo.workHistoryList.forEach(function(item) {
          item.startDateStr=self.$date(item.startDate,'month');
          if(!item.isWorking){
            item.endDateStr=self.$date(item.startDate,'month');
            item.isWorking=0;
          }else{
            item.endDate="";
            item.isWorking=1;
          }
        });
        InterviewerInfo.birthday=self.$date(InterviewerInfo.birthday);
        InterviewerInfo.positionId=self.id;
        console.log(InterviewerInfo);
        var param=JSON.stringify({interviewResumeInfo:InterviewerInfo}),
            successd=function(res){
              self.dialogVisible=true;
            },
            errored=function(res){
              self.$message({
                message:res.data.message,
                type:"error"
              })
            };
        self.$http(method,param,successd,errored);
      },
      loginFun(type){
        var self=this;
        if(type==-1&&(self.login.vcode==""||self.login.vcode.length!=4)){
          self.$message.error("请输入验证码");
        }
        if(self.login.account==""){
          self.$message({
            message:'请输入账号',
            type:'error'
          })
          return
        }
        if(self.login.pwd==""){
          self.$message({
            message:'请输入密码',
            type:'error'
          })
          return
        }
        if(self.login.email==""&&self.login.type==6){
          self.$message({
            message:'请输入邮箱',
            type:'error'
          })
          return
        }
        if(self.login.phone==""&&self.login.type==6){
          self.$message({
            message:'请输入手机号',
            type:'error'
          })
          return
        }
        self.showScrollBox=false;
        var param=JSON.stringify({
              type:self.login.type,
              account:self.login.account,
              pwd:self.login.pwd,
              vcode:self.login.vcode,
              businessId:'14',
              fId:'-1',
              companyId:self.companyId,
              phone:self.login.phone,
              email:self.login.email
            }),
            successd=function(res){
              self.InterviewerInfo.name=res.data.data.InterviewerInfo.name;
              self.InterviewerInfo.sex=res.data.data.InterviewerInfo.sex.toString();
              self.InterviewerInfo.phone=res.data.data.InterviewerInfo.phone;
              self.InterviewerInfo.email=res.data.data.InterviewerInfo.email;
              self.InterviewerInfo.birthday=res.data.data.InterviewerInfo.birthday;
              self.InterviewerInfo.educationHistoryList=res.data.data.EducationHistory;
              self.InterviewerInfo.workHistoryList=res.data.data.WorkHistory;
            },
            errored=function(res){
              if(res.data.code==1){
                //密码错误
                self.$message.error('账号密码错误');
              }else if(res.data.code==2||res.data.code==4){
                //需要验证码
                self.src=res.data.data;
                self.showScrollBox=true;
              }else if(res.data.code==3){
                //弹提示
                self.$message.error(res.data.message);
              }
            };
        self.$resumeHttp(param,successd,errored);
      }
    },

    created(){
      this.companyId = this.$route.query.companyId;
      this.id = this.$route.query.id;
    },
    mounted(){
      this.getPositonDetail(this.id);
    },

    components: {
      Scroll,
      footerNav
    }
  }
</script>

<style scoped>
.apply_personal{
  background-color: #fff;
  margin-top:20px;
}
.apply_personal h1{
  height: 68px;
  background-color: #46BE8A;
  color: #fff;
  font-size: 18px;
  line-height: 68px;
  padding-left: 20px;
}
.resume_title{
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
  border-bottom: 1px solid #E5E9F2;
  margin-bottom:20px;
  clear: both;
}
.EducationHistory{
  clear: both;
  position: relative;
  display:block;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
  padding-bottom: 20px;
}
.EducationHistory_dele{
  position:absolute;
  top:0px;
  right:20px;
}
#apply .apply_personal .el-form .submitInterivewApplicationNew{
  clear: both;
  text-align: center;
  width: 100%;
  padding: 0;
}
.login_icon{
  height: 100px;
  width: 100px;
  margin: 0 auto;
}
.login_icon.jobs{
  background: url(../common/image/micresume/jobs_icon.png) no-repeat center center;
}
.login_icon.zhilian{
  background: url(../common/image/micresume/zhilian_icon.png) no-repeat center center;
}
.login_icon.lagou{
  background: url(../common/image/micresume/lagou_icon.png) no-repeat center center;
}
.login_resume_btn{
  display: block;
  margin: 0 auto;
  width: 100%;
}
.login_footer{
  margin-top:20px;
  color: #999;
  font-size: 12px;
}
.login_footer p{
  line-height: 20px;
}
.img_title{
  text-align: center;
  height: 100px;
}
</style>

<style lang="less">
#apply {
  .apply_personal{
    .el-form{
      display: block;
      padding-bottom:50px;
      .el-form-item{
        width: 45%;
        float: left;
        height: 36px;
      }
    }
  }
  .user{
    margin-bottom: 20px;
  }
  .user .el-input__inner{
    border:none;
    border-bottom: 1px solid #ddd;
    border-radius: 0;
  }
  .user .el-input__inner:focus{
    border-color: #20a0ff;
  }
  .vcode_dialog .el-dialog{
    width: 430px;
  }
}
</style>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/mixin.styl"
  #apply
    .tips1
      .el-dialog--small
        width: 671px;
        height: 424px
        box-sizing: border-box
        top: 50% !important
        margin-top: -212px
        .el-dialog__header
          display: none
        .el-dialog__body
          height: 424px
      .content
        padding: 84px 0 113px 0
        text-align: center
        .img
          display: inline-block
          width: 85px
          height: 85px
          background: url(../common/image/tips.png) no-repeat center
          background-size: cover
        .title
          margin: 51px 0 22px 0
          font-size: 20px
          color: #1F2D3D
          font-weight: 800
        .des
          font-size: 18px
          color: #1F2D3D
    .container
      .detail_des
        background: #fff
        position: relative
        height: 52px
        line-height: 52px
        border-bottom: 1px solid #E5E9F2
        margin-top: 20px
        .tips
          position: absolute
          left: 23px
          top: 19px
          height: 16px
          line-height: 16px
          .tips_1, .tips_2, .tips_3
            .el-breadcrumb__item__inner, .el-breadcrumb__item__inner a, .el-breadcrumb__separator
              color: #5AA2E7

      .detail_show
        height: 60px
        line-height: 60px
        padding: 21px 29px 21px 21px
        background: #fff
        border-bottom: 1px solid #E5E9F2
        .content
          position: relative
          height: 18px
          line-height: 18px

          .title
            display: inline-block
            font-size: 18px
            color: #1F2D3D
            margin-right: 20px
          .text
            display: inline-block
            height: 14px
            line-height: 14px
            margin-right: 20px
            .des
              display: inline-block
              font-size: 14px
              color: #475669
              margin-right: 23px
              vertical-align: middle
            .price
              display: inline-block
              font-size: 16px
              color: #F96868
              vertical-align: middle
          .p_time
            display: inline-block
            float: right
            font-size: 14px
            color: #99A9BF

      .apply_post
        padding: 50px 0px 34px 0
        height: 100%
        background: #fff
        .apply_content
          height: 100%
          margin: auto
          .el-form
            .btn
              width: 328px
            .el-form-item
              width:50%
              float:left
              padding:0 50px
            .el-form-item__content
              .post, .post1
                .el-upload
                  .el-upload__input
                    display: none
                .el-upload-list__item
                  .el-icon-close
                    display: block
                .tips{
                  display :inline-block
                  color: red
                  font-size: 0.26rem
                  margin-left :0.1rem
                }

    .footer
      footer
        height: 100px
        line-height: 100px
        background: #F7F7F7
        width: 100%
      .title
        width: 100%
        height: 100px
        line-height: 100px
        color: #999999
        font-size: 28px
        margin: 0 auto
        background: url(../common/image/footer_logo.png) no-repeat center

  @media all and (max-width: 767px)
    #apply
      background: #fff
      position: absolute
      bottom: 0
      top: 0
      right: 0
      left: 0
      .back{
        position: fixed;
        left: 0;
        top :0;
        right: 0;
        z-index: 1;
        height: 1.12rem;
        padding-left: 20px;
        padding-right: 20px;
        background-color: #64b5f6;
        color: rgba(9, 10, 11, 1);
        .icon{
          display: inline-block
          width :39px
          height :34px
          position :absolute
          left :0.2rem
          top :0.18rem
          background :url(../common/image/back.png)no-repeat center
          background-size :50%
        }
        .title{
          width :100%
          height: 1.12rem;
          line-height: 1.12rem;
          color :#fff
          font-size :0.34rem
          margin-left :0.6rem
        }
      }
      .footer
        footer
          height :0
      .app_content
        position: fixed
        top: 0
        left: 0
        right: 0
        bottom: 0
      .container
        padding: 0
        margin: 0
        .detail_des
          background: #fff
          position: relative
          height: 3rem
          line-height: 3rem
          border-b-1px(#E5E9F2)
          margin-top: 0.2rem
        .detail_show
          height: 3rem
          background: #fff
          padding: 0.34rem 0 0.42rem 0.30rem
          margin-bottom: 0
          border: none
          border-b-1px(#E5E9F2)
          .content
            position: relative
            height: 100%

            .name
              font-size: 0.36rem
              color: #475669
            .title
              height: 0.28rem
              line-height: 0.28rem
              font-size: 0.28rem
              color: #1F2D3D
              margin-top: 0.4rem
              margin-bottom: 0
            .text
              display: block
              height: 0.28rem
              line-height: 0.28rem
              margin-top: 0.24rem
              .des
                display: inline-block
                vertical-align: middle
                font-size: 0.24rem
                color: #475669
                margin-right: 0.22rem
              .price
                display: inline-block
                vertical-align: middle
                font-size: 0.26rem
                color: #F96868
            .p_time
              display: block
              height: 0.24rem
              line-height: 0.24rem
              float: none
              font-size: 0.24rem
              color: #99A9BF
              margin-top: 0.5rem
        .apply_name{
          padding: 0.46rem
          font-size: 0.36rem
          color: #475669
        }
        .apply_post
          padding: 0.48rem 0 0.24rem 0
          height: 100%
          background: #fff
          .apply_content
            width: 100%
            height: 100%
            padding-left: 0.30rem
            padding-right: 0.30rem
            margin: auto
            .post_f
              margin-bottom: 0
            .line
              width: 100%
              height: 0.01rem
              border-b-1px(#E5E9F2)
              margin-bottom: 0.44rem
              margin-top: 0.11rem

            .el-form
              .el-form-item
                margin-left: 0.23rem
              .btn
                width: 100%
                outline: none
              .form_btn
                margin-left: 0
              .el-form-item__content
                margin-left: 0 !important
              .el-input
                width: 4.56rem
              .el-form-item__error
                left: 80px
              .post, .post1
                .el-upload
                  padding-left: 0;
                .el-upload__tip
                  margin-top: -0.1rem
                  white-space: nowrap
                  overflow: hidden
                  text-overflow: ellipsis
                  .el-upload__input
                    display: none
                .el-upload-list
                  padding-left: 80px;
                  .el-upload-list__item
                    width: 70%

      .tips1
        .el-dialog--small
          width: 92%
          height: 5.94rem
          top: 50%
          margin-top: -2.97rem
          .el-dialog__header
            display: none
          .el-dialog__body
            padding: 0
            height: 5.94rem
        .content
          padding: 1.50rem 0 1.5rem 0
          text-align: center
          .img
            display: inline-block
            width: 1.189rem
            height: 1.189rem
            background: url(../common/image/tips.png) no-repeat center
            background-size: cover
          .title
            margin: 0.71rem 0 0.51rem 0
            font-size: 0.28rem
            color: #1F2D3D
            font-family: "MicrosoftYaHei-Bold"
          .des
            font-size: 0.24rem
            color: #1F2D3D

  @media (min-width: 768px) and (max-width: 992px)
    #apply
      background: #fff
      position: absolute
      bottom: 0
      top: 0
      right: 0
      left: 0
      .container
        width: 100%
        padding: 0
        margin: 0
        .detail_des
          background: #fff
          position: relative
          height: 3rem
          line-height: 3rem
          border-b-1px(#E5E9F2)
          margin-top: 0.2rem
        .detail_show
          height: 60px
          line-height: 60px
          padding: 21px 29px 21px 21px
          background: #fff
          .content
            position: relative
            height: 18px
            line-height: 18px
            .name
              font-size: 18px
              color: #475669
            .title
              display: inline-block
              height: 14px
              line-height: 14px
              font-size: 14px
              color: #1F2D3D
              vertical-align: top
              margin-right: 10px
            .text
              display: inline-block
              height: 14px
              line-height: 14px
              vertical-align: top
              .des
                display: inline-block
                vertical-align: top
                font-size: 12px
                color: #475669
                margin-right: 11px
              .price
                display: inline-block
                vertical-align: top
                font-size: 13px
                color: #F96868
            .p_time
              display: inline-block
              height: 12px
              line-height: 12px
              font-size: 12px
              color: #99A9BF

        .apply_post
          padding: 50px 0px 34px 0
          height: 100%
          background: #fff
          .apply_content
            width: 500px
            height: 100%
            margin: auto
            .el-form
              .btn
                width: 420px
                outline: none
              .el-form-item__content
                .post, .post1
                  .el-upload
                    .el-upload__input
                      display: none
                  .el-upload-list__item
                    .el-icon-close
                      display: block

      .tips1
        .el-dialog--small
          width: 72%
          height: 594px
          top: 50%
          margin-top: -297px
          .el-dialog__header
            display: none
          .el-dialog__body
            padding: 0
            height: 5.94rem
        .content
          padding: 1.50rem 0 1.5rem 0
          text-align: center
          .img
            display: inline-block
            width: 1.189rem
            height: 1.189rem
            background: url(../common/image/tips.png) no-repeat center
            background-size: cover
          .title
            margin: 0.71rem 0 0.51rem 0
            font-size: 0.28rem
            color: #1F2D3D
          .des
            font-size: 0.24rem
            color: #1F2D3D
      .tips2
        .el-dialog--small
          width: 100%
          height: 7.09rem
          box-sizing: border-box
          top: 50% !important
          margin-top: -3.15em
          .el-dialog__header
            position: relative
            .el-dialog__title
              position: absolute
              font-size: 0.28rem
          .el-dialog__body
            padding: 0.54rem 0 0 0
            height: 6.37rem
        .content
          text-align: center
          .img
            display: inline-block
            width: 3.70rem
            height: 3.7rem
            background: yellow
          .des
            margin: 0.46rem 0 0.15rem 0.35rem
            font-size: 0.24rem
            color: #475669

        .share
          padding: 0 0.35rem
          .el-form-item
            margin-bottom: 0
            margin-right: 0
            .el-form-item__content
              .el-input
                width: 5rem
                .el-input__inner
                  border: 1px solid #5AA2E7
              .el-button
                margin-left: -0.4rem
                span
                  font-size: 0.28rem
                &:hover
                  background: #46BE8A


</style>