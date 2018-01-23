<template>
  <div id="apply">
    <div class="container">
      <div class="apply_post">
        <h1>上传简历</h1>
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
                :show-file-list="false"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <!-- <div class="tips hidden-sm hidden-lg">仅限于安卓手机</div> -->
                <div slot="tip" class="el-upload__tip">支持PDF、HTML、Word等简历格式</div>
              </el-upload>
            </el-form-item>
            <!--上传附件-->
            <!-- <el-form-item label="上传附件" class="post_f">
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
            </el-form-item> -->
            <!-- <div class="line" >
              萨达
            </div> -->
            <el-form-item label="渠道导入" style="clear:both;padding-left:50px;font-size:14px;color:#48576a;width:100%;">
              <el-button @click.native="loginResume=true;login.type=1"><img src="../../common/image/micresume/qianchengwuyou.png" style="height:16px;vertical-align:middle;margin-right:10px" />前程无忧</el-button>
              <el-button @click.native="loginResume=true;login.type=2"><img src="../../common/image/micresume/zhilianzhaopin.png" style="height:16px;vertical-align:middle;margin-right:10px" />智联招聘</el-button>
              <el-button @click.native="loginResume=true;login.type=6"><img src="../../common/image/micresume/lagou.png" style="height:16px;vertical-align:middle;margin-right:10px" />拉勾网</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <div class="apply_personal">
        <h1>创建简历</h1>
        <el-form label-position="right" label-width="100px" class="clearfix" ref="AddInterviewer":rules="rules" :model="InterviewerInfo">
          <h2 class="resume_title">基本信息</h2>
          <el-form-item label="姓    名" prop="name">
            <el-input v-model="InterviewerInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="InterviewerInfo.sex" label="1">男</el-radio>
            <el-radio v-model="InterviewerInfo.sex" label="2">女</el-radio>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model.number="InterviewerInfo.phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="InterviewerInfo.email"></el-input>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthday" class="">
            <el-date-picker
              v-model="InterviewerInfo.birthday"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>

          <h2 class="resume_title">教育经历</h2>

          <div class="EducationHistory clearfix" v-for="(edu,index) in InterviewerInfo.educationHistoryList">
            <el-form-item label="开始时间" :rules="[{type:'date',required:true,message:'请选择开始时间',trigger:'blur'}]" :prop="'educationHistoryList.'+index+'.startDate'">
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
            <el-form-item label="结束时间" v-if="!edu.isReading" :rules="[{type:'date',required:true,message:'请选择结束时间',trigger:'blur'}]" :prop="'educationHistoryList.'+index+'.endDate'">
                <el-date-picker
                  v-model="edu.endDate"
                  type="month"
                  format='yyyy-MM'
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            <el-form-item label="毕业学校" :rules="[{required:true,message:'请输入学校名称',trigger:'blur'}]" :prop="'educationHistoryList.'+index+'.graduateSchool'">
              <el-input v-model="edu.graduateSchool"></el-input>
            </el-form-item>
            <el-form-item label="学历" :rules="[{required:true,type:'number',message:'请选择学历',trigger:'blur'}]" :prop="'educationHistoryList.'+index+'.educationLev'">
              <el-select v-model="edu.educationLev" placeholder="请选择">
                <el-option
                  v-for="item in educationLevArr"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="专业" :rules="[{required:true,message:'请输入专业',trigger:'blur'}]" :prop="'educationHistoryList.'+index+'.major'">
              <el-input v-model="edu.major"></el-input>
            </el-form-item>
            <el-button class="EducationHistory_dele" type="danger" @click.native="deleEducationHistory(index)" v-if="index!=0">删除</el-button>
          </div>
          <el-form-item>
            <el-button @click.native="addEducationHistory">新增一条</el-button>
          </el-form-item>

          <h2 class="resume_title">工作经历</h2>
          <div class="EducationHistory clearfix" v-for="(work,index) in InterviewerInfo.workHistoryList">
              <el-form-item label="开始时间" :rules="[{type:'date',required:true,message:'请选择开始时间',trigger:'blur'}]" :prop="'workHistoryList.'+index+'.startDate'">
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
              <el-form-item label="结束时间" v-if="!work.isWorking" :rules="[{type:'date',required:true,message:'请选择结束时间',trigger:'blur'}]" :prop="'workHistoryList.'+index+'.endDate'">
                  <el-date-picker
                    v-model="work.endDate"
                    type="month"
                    format='yyyy-MM'
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              <el-form-item label="所在公司" :rules="[{required:true,message:'请输入公司名称',trigger:'blur'}]" :prop="'workHistoryList.'+index+'.workCompany'">
                <el-input v-model="work.workCompany"></el-input>
              </el-form-item>
              <el-form-item label="职位" :rules="[{required:true,message:'请输入职位',trigger:'blur'}]" :prop="'workHistoryList.'+index+'.position'">
                <el-input v-model="work.position"></el-input>
              </el-form-item>
              <el-button class="EducationHistory_dele" type="danger" @click.native="deleworkHistory(index)" v-if="index!=0">删除</el-button>
            </div>
            <el-form-item>
              <el-button @click.native="addworkHistory">新增一条</el-button>
            </el-form-item>
        </el-form>
      </div>
      <el-button @click.native="submitInterivewApplicationNew('AddInterviewer')" type="primary" class="submitInterivewApplicationNew">保存简历</el-button>

      <el-dialog
        title="登录并导入简历"
        v-model="loginResume"
        size="tiny">
        <div class="login_icon" :class="{'jobs':login.type==1,'zhilian':login.type==2,'lagou':login.type==6}"></div>
        <div class="login_con">
          <el-input v-model="login.account" placeholder="请输入账号" class="user"></el-input>
          <el-input v-model="login.pwd" placeholder="请输入密码" type="password" class="user"></el-input>
          <el-input v-model="login.email" placeholder="请输入邮箱" class="user" v-if="login.type==2"></el-input>
          <el-input v-model="login.phone" placeholder="请输入手机号" class="user" v-if="login.type==2"></el-input>
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
import Util from '../../common/js/util.js';
import md5 from 'js-md5';
import footerNav from '../base/foot';

  export default {
    data() {
      document.title="编辑简历";
      return {
        fansId:this.$route.query.fansId,
        resumeFrom:'1',
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
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}
          ],
          birthday:[
            {required: true,type:'date', message: '请选择出生日期', trigger: 'blur'}
          ],
          startDate:[{required:true,message:'请选择开始时间',trigger:"blur"}],
          endDate:[{required:true,message:'请选择结束时间',trigger:"blur"}],
          graduateSchool:[{required:true,message:'请输入毕业学校',trigger:"blur"}],
          educationLev:[{required:true,message:'请选择学历',trigger:"blur"}],
          major:[{required:true,message:'请输入专业',trigger:"blur"}],
          workCompany:[{required:true,message:'请输入公司名称',trigger:"blur"}],
          position:[{required:true,message:'请输入职位名称名称',trigger:"blur"}]
        },
        dialogVisible: false,
        params: {
          param: JSON.stringify({businessId: 14, fId: -1,companyId:this.companyId}),
          sign: md5('method' + "fileUpload/insertFileRecord" + "param" + JSON.stringify({
              businessId: 14,
              fId: -1,
              companyId:this.companyId
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
          {name:'博士',value:1},
          {name:'研究生',value:2},
          {name:'本科',value:3},
          {name:'大专',value:4},
          {name:'其他',value:5}
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
          type:'1',
          phone:'',
          email:''
        },
        resumeUrl:''
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
        var self=this;
        self.resumeId = res.data.ids
        var method="addResume/getResume",
            param=JSON.stringify({
              ids:res.data.ids,
              resumeFrom:10,
            }),
            successd=function(res){
              console.log(res.data.data.InterviewerInfo.resumeUrl,"resumeUrl");
              self.InterviewerInfo.name=res.data.data.InterviewerInfo.name;
              self.InterviewerInfo.sex=res.data.data.InterviewerInfo.sex.toString();
              self.InterviewerInfo.phone=res.data.data.InterviewerInfo.phone-0;
              self.InterviewerInfo.email=res.data.data.InterviewerInfo.email;
              self.InterviewerInfo.birthday=new Date(res.data.data.InterviewerInfo.birthday);
              res.data.data.EducationHistory.forEach((item)=>{
                item.educationLev=item.educationLev-0;
                item.startDate=new Date(item.startDate);
                item.endDate=new Date(item.endDate);
              })
              res.data.data.WorkHistory.forEach((item)=>{
                item.startDate=new Date(item.startDate);
                item.endDate=new Date(item.endDate);
              })
              self.InterviewerInfo.educationHistoryList=res.data.data.EducationHistory;
              self.InterviewerInfo.workHistoryList=res.data.data.WorkHistory;
              self.resumeUrl=res.data.data.InterviewerInfo.resumeUrl;
              self.$message({
                message:'简历解析成功,请确认保存简历',
                type:'success'
              });
            };
        self.$http(method,param,successd);
      },
      successed2(res, file) {
        this.attachmentIds.push(res.data.ids)
      },
      filter(item){
        if(item){
          return item.slice(0, 10)
        }
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
      //保存简历
      submitInterivewApplicationNew(formName){
        var self=this;
        self.$refs[formName].validate((valid) => {
          if (valid) {
              var method="resume/updateSimpleResume";
              var InterviewerInfo=JSON.parse(JSON.stringify(self.InterviewerInfo));
              InterviewerInfo.educationHistoryList.forEach(function(item) {
                item.startDateStr=self.$date(item.startDate,'month');
                item.startDate = "";
                if(!item.isReading){
                  item.endDateStr=self.$date(item.endDate,'month');
                  item.endDate = "";
                  item.isReading = 0;
                }else{
                  item.endDate = "";
                  item.isReading = 1;
                }
              });
              InterviewerInfo.workHistoryList.forEach(function(item) {
                item.startDateStr=self.$date(item.startDate,'month');
                item.startDate = "";
                if(!item.isWorking){
                  item.endDateStr=self.$date(item.endDate,'month');
                  item.endDate = "";
                  item.isWorking = 0;
                }else{
                  item.endDate="";
                  item.isWorking=1;
                }
              });
              InterviewerInfo.birthday=self.$date(InterviewerInfo.birthday);
              InterviewerInfo.positionId=self.id;
              InterviewerInfo.attachmentIds=self.attachmentIds.toString();
              InterviewerInfo.resumeId=self.resumeId.toString();
              InterviewerInfo.resumeFrom=self.login.type;
              InterviewerInfo.resumeUrl=self.resumeUrl;

              var param=JSON.stringify({simpleResumeInfo:InterviewerInfo,fansId:self.fansId,step:'-1'}),
                  successd=function(res){
                    self.$message({
                      message:"保存成功!",
                      type:'success'
                    })
                  },
                  errored=function(res){
                    self.$message({
                      message:res.data.message,
                      type:"error"
                    })
                  };
              self.$http(method,param,successd,errored);
            } else {
            console.log('error submit!!');
            return false;
          }
        });
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
        if(self.login.email==""&&self.login.type==2){
          self.$message({
            message:'请输入邮箱',
            type:'error'
          })
          return
        }
        if(self.login.phone==""&&self.login.type==2){
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
              self.loginResume=false;
              self.InterviewerInfo.name=res.data.data.InterviewerInfo.name;
              self.InterviewerInfo.sex=res.data.data.InterviewerInfo.sex.toString();
              self.InterviewerInfo.phone=res.data.data.InterviewerInfo.phone-0;
              self.InterviewerInfo.email=res.data.data.InterviewerInfo.email;
              self.InterviewerInfo.birthday=new Date(res.data.data.InterviewerInfo.birthday);
              res.data.data.EducationHistory.forEach((item)=>{
                item.educationLev=item.educationLev-0;
                item.startDate=new Date(item.startDate);
                item.endDate=new Date(item.endDate);
              })
              res.data.data.WorkHistory.forEach((item)=>{
                item.startDate=new Date(item.startDate);
                item.endDate=new Date(item.endDate);
              })
              self.InterviewerInfo.educationHistoryList=res.data.data.EducationHistory;
              self.InterviewerInfo.workHistoryList=res.data.data.WorkHistory;
              self.resumeUrl=res.data.data.InterviewerInfo.resumeUrl;
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
      },
      getSimpleResume(){
        var self=this;
        var method="resume/getSimpleResume",
            param=JSON.stringify({
              fansId:self.fansId
            }),
            successd=(res)=>{
              self.InterviewerInfo.name=res.data.data.name;
              self.InterviewerInfo.sex=res.data.data.sex.toString();
              self.InterviewerInfo.phone=res.data.data.phone-0;
              self.InterviewerInfo.email=res.data.data.email;
              self.InterviewerInfo.birthday=new Date(res.data.data.birthday);
              res.data.data.educationHistoryList.forEach((item)=>{
                item.isReading=item.isReading==1;
                item.startDate=new Date(item.startDateStr);
                item.endDate=new Date(item.endDateStr);
              })
              self.InterviewerInfo.educationHistoryList=res.data.data.educationHistoryList;
              res.data.data.workHistoryList.forEach((item)=>{
                item.isWorking=item.isWorking==1;
                item.startDate=new Date(item.startDateStr);
                item.endDate=new Date(item.endDateStr);
              })
              self.InterviewerInfo.workHistoryList=res.data.data.workHistoryList;
              self.resumeUrl=res.data.data.resumeUrl;
            };
        self.$http(method,param,successd);
      }
    },

    created(){
      this.companyId = this.$route.query.companyId;
      this.id = this.$route.query.id;
    },
    mounted(){
      this.getSimpleResume();
    },

    components: {
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
  height: 40px;
  background-color: #46BE8A;
  color: #fff;
  font-size: 18px;
  line-height: 40px;
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
/* #apply .apply_personal .el-form .submitInterivewApplicationNew{
  clear: both;
  text-align: center;
  width: 100%;
  padding: 0;
} */
.submitInterivewApplicationNew{
  margin:20px 0;
}
.login_icon{
  height: 100px;
  width: 100px;
  margin: 0 auto;
}
.login_icon.jobs{
  background: url(../../common/image/micresume/jobs_icon.png) no-repeat center center;
}
.login_icon.zhilian{
  background: url(../../common/image/micresume/zhilian_icon.png) no-repeat center center;
}
.login_icon.lagou{
  background: url(../../common/image/micresume/lagou_icon.png) no-repeat center center;
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
        .el-input{
          width:200px;
        }
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
  @import "../../common/stylus/mixin.styl"
.apply_post
  padding: 0px 0px 34px 0
  height: 100%
  background: #fff
  margin-top:20px
  h1
    height: 40px;
    background-color: #46BE8A;
    color: #fff;
    font-size: 18px;
    line-height: 40px;
    padding-left: 20px;
    margin-bottom:20px
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
</style>
