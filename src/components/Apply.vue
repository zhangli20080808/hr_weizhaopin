<template>
  <div id="apply">

    <!--导航-->
    <header class="hidden-xs hidden-sm">
      <nav class="navbar navbar-sample" role="navigation">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">
              <img src="../common/image/logo.png" alt="">
            </a>
          </div>

        </div>
      </nav>
    </header>

    <div class="container">
      <div class="detail_des hidden-xs hidden-sm">
        <el-breadcrumb separator="/" class="tips">
          <el-breadcrumb-item :to="{ path: '/' }" class="tips_1">招聘首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/list' }" class="tips_2">职位列表</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/list/:id' }" class="tips_3">职位详情</el-breadcrumb-item>
          <el-breadcrumb-item >申请职位</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="detail_show">
        <div class="content">
          <div class="name visible-xs">申请职位</div>
          <div class="title">{{name}}</div>
          <div class="text">
            <span class="des">{{address}}</span><span class="price">{{salary}}</span>
          </div>
          <div class="p_time">发布时间：{{time}}</div>
        </div>
      </div>
      <div class="apply_post">
        <div class="apply_content">
          <el-form :label-position="labelPosition" label-width="80px" ref="ruleForm" :model="formLabelAlign" :rules="rules">
            <!--上传简历-->
            <el-form-item label="上传简历">
              <file-upload class="post" :param="param" @fileId="fileId" @deleFileId="deleFileId" :empty="empty"></file-upload>
            </el-form-item>
            <!--上传附件-->
            <el-form-item label="上传附件" class="post_f">
              <file-upload class="post1" :param="param1" @fileId="fileId" @deleFileId="deleFileId" :empty="empty"></file-upload>
            </el-form-item>
            <div class="line"></div>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="formLabelAlign.name" ></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model.number="formLabelAlign.phone" ></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="mail">
              <el-input v-model.email="formLabelAlign.mail" ></el-input>
            </el-form-item>
            <el-form-item class="form_btn" >
              <el-button type="primary" @click="submitForm('ruleForm')" class="btn">提交应聘请求</el-button>
            </el-form-item>
          </el-form>
        </div>
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
        class="tips2"
        title="扫码分享职位"
        :visible.sync="dialogVisible2"
        size="small"
      >
        <div class="content">
          <div class="img">

          </div>
          <div class="des">或使用链接分享</div>
        </div>
        <el-form :inline="true" :model="formShare" class="share">
          <el-form-item>
            <el-input v-model="formShare.share"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="share" ref="btn">复制链接</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

  </div>
</template>
<script>
  import fileUpload from './base/fileUpload.vue'
  import Scroll from './base/scroll.vue'
  const ERROR_OK =0
  export default {
    data() {
      return {
        upLoadData:{

        },
        fileIds:[],
        empty:'',
        param:{
          businessId:9,
          fId:-1
        },
        param1:{
          businessId:4,
          fId:-1
        },
        id:this.$route.params.id,
        name:this.$route.params.name,
        salary:this.$route.params.salary,
        address:this.$route.params.address,
        time:this.$route.params.time,
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        labelPosition:'left',
        formLabelAlign: {
          name: '',
          phone: '',
          mail: ''
        },
        rules:{
          name: [
            { required: true, message: '请填写真实姓名', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '手机号不能为空'},
            { type: 'number', message: '必须为数字值'}
          ],
          mail: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
          ],
          post_j:[
            { required: true, message: '请上传简历', trigger: 'change' }
          ]
        },
        dialogVisible: false,
        dialogVisible2:false,
        formShare:{
          share:''
        }

      }
    },
    created(){

      this._getDetail()
      this.open()
      this.init()
    },
    methods:{
      //处理边界情况的一些常用手段 如果用户在这个地方不小新刷新了
      init(){
        var self = this;
        var method = "",
          param = JSON.stringify({

          }),
          successd=function(res){
            console.log(res);
//            self.today = res.data.data.today;
          };
        this.$http(method,param,successd);
      },
      _getDetail(){
        if(!this.name){
          this.$router.push('/list')
          return
        }
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePreview(file) {
        console.log(file)
      },
      beforeAvatarUpload(file){
        console.log(file)
        const isLt2M = file.size / 1024 / 1024 < 10
        if (!isLt2M) {
          alert('上传模板大小不能超过 50MB!')
        }
      },
      fileId(id){
        this.fileIds.push(id)
        console.log(id)
      },
      deleFileId(id){
        var _this = this
        for(var i=0;i<_this.fileIds.length;i++){
          if(_this.fileIds[i] == id){
            _this.fileIds.splice(i,1)
          }
        }
      },
      open() {
        this.dialogVisible =true
        setTimeout(()=>{
          this.dialogVisible2 = true
        },2000)
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            setTimeout(()=>{
              this.open()
              this.$router.push({
                path:`/list`
              })
            },2000)

          } else {
//            alert('提交失败')
            return false
          }
        })
      },
      backIndex() {
        this.$router.push({
          path: `/`
        })
      },
      backSec(){
        this.$router.push({
          path: `/list`
        })
      },
      backlist(){
        this.$router.push({
          path: `/list/${this.id}`
        })
      },
      share(){

      }

    },
    components:{
      fileUpload,
      Scroll
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/mixin.styl"
  #apply
    .tips1
      .el-dialog--small
        width: 671px;
        height :424px
        box-sizing: border-box
        top: 50% !important
        margin-top: -212px
        .el-dialog__header
          display :none
        .el-dialog__body
          height :424px
      .content
        padding :84px 0 113px 0
        text-align :center
        .img
          display :inline-block
          width :85px
          height :85px
          background :url(../common/image/tips.png)no-repeat center
          background-size :cover
        .title
          margin :51px 0 22px 0
          font-size :20px
          color :#1F2D3D
          font-weight :800
        .des
          font-size :18px
          color :#1F2D3D
    .tips2
      .el-dialog--small
        width: 428px;
        height :404px
        box-sizing: border-box
        top: 50% !important
        margin-top: -212px
        .el-dialog__body
          height :424px
      .content
        text-align :center
        .img
          display :inline-block
          width :210px
          height :210px
          background :yellow
        .title
          margin :51px 0 22px 0
          font-size :20px
          color :#1F2D3D
          font-weight :800
        .des
          text-align :left
          margin-top :26px
          margin-bottom :15px
          color :#475669
          font-size :14px
       .share
          .el-form-item
            margin-bottom :0
            margin-right :0
            .el-form-item__content
              .el-input
                width :284px
                .el-input__inner
                  border: 1px solid #5AA2E7;
              .el-button
                &:hover
                  background :#46BE8A

    header
      height 80px
      line-height 80px
      .navbar-sample
        background-color: #fff
        border-color: #f5f5f5
        margin-bottom: 0
        top: 0
        width: 100%
        z-index: 1000
        .navbar-header
          height 84px

        .navbar-brand
          height: 80px
    .container
      .detail_des
        background :#fff
        position :relative
        height :52px
        line-height :52px
        border-bottom :1px solid #E5E9F2
        margin-top :20px
        .tips
          position: absolute
          left: 23px
          top: 19px
          height: 16px
          line-height: 16px
          .tips_1,.tips_2,.tips_3
            .el-breadcrumb__item__inner, .el-breadcrumb__item__inner a,.el-breadcrumb__separator
              color :#5AA2E7

      .detail_show
        height :60px
        line-height :60px
        padding: 21px 29px 21px 21px
        background :#fff
        border-bottom: 1px solid #E5E9F2
        .content
          position:relative
          height :18px
          line-height :18px

          .title
            display: inline-block
            font-size: 18px
            color: #1F2D3D
            margin-right :20px
          .text
            display: inline-block
            height: 14px
            line-height: 14px
            margin-right :20px
            .des
              display: inline-block
              font-size: 14px
              color: #475669
              margin-right: 23px
              vertical-align :middle
            .price
              display: inline-block
              font-size: 16px
              color: #F96868
              vertical-align :middle
          .p_time
            display: inline-block
            float :right
            font-size: 14px
            color: #99A9BF


      .apply_post
        padding :50px 0px 34px 0
        height :100%
        background :#fff
        .apply_content
          width :408px
          height :100%
          margin: auto
          .el-form
            .btn
              width: 328px
            .el-form-item__content
              .post,.post1
                .el-upload
                  .el-upload__input
                    display :none
                .el-upload-list__item
                  .el-icon-close
                    display:block


  @media all and (max-width: 767px)
    #apply
      background :#fff
      position: absolute
      bottom: 0
      top: 0
      right: 0
      left: 0
      padding-top :0.9rem
      .app_content
        position: fixed
        top: 0
        left: 0
        right: 0
        bottom: 0
      .container
        padding:0
        margin :0
        .detail_des
          background :#fff
          position :relative
          height :3rem
          line-height :3rem
          border-b-1px(#E5E9F2)
          margin-top :0.2rem
        .detail_show
          height: 3rem
          background :#fff
          padding: 0.34rem 0 0.42rem 0.30rem
          margin-bottom: 0
          border :none
          border-b-1px(#E5E9F2)
          .content
            position:relative
            height :100%

            .name
              font-size: 0.36rem
              color: #475669
            .title
              height: 0.28rem
              line-height: 0.28rem
              font-size: 0.28rem
              color: #1F2D3D
              margin-top :0.4rem
              margin-bottom:0
            .text
              display :block
              height: 0.28rem
              line-height: 0.28rem
              margin-top: 0.24rem
              .des
                display: inline-block
                vertical-align :middle
                font-size: 0.24rem
                color: #475669
                margin-right: 0.22rem
              .price
                display: inline-block
                vertical-align :middle
                font-size: 0.26rem
                color: #F96868
            .p_time
              display :block
              height: 0.24rem
              line-height: 0.24rem
              float :none
              font-size: 0.24rem
              color: #99A9BF
              margin-top :0.5rem
        .apply_post
          padding :0.48rem 0 0.24rem 0
          height :100%
          background :#fff
          .apply_content
            width: 100%
            height: 100%
            padding-left: 0.30rem
            padding-right: 0.30rem
            margin: auto
            .post_f
              margin-bottom :0
            .line
              width: 100%
              height :0.01rem
              border-b-1px(#E5E9F2)
              margin-bottom :0.44rem
              margin-top :0.11rem

            .el-form
              .el-form-item
                margin-left: 0.23rem
              .btn
                width :100%
                outline :none
              .form_btn
                margin-left: 0
              .el-form-item__content
                  margin-left :0!important
                .el-input
                  width: 4.56rem
              .el-form-item__error
                  left :80px
                .post,.post1
                  .el-upload
                    padding-left: 0;
                  .el-upload__tip
                    margin-top: -0.1rem
                    white-space: nowrap
                    overflow: hidden
                    text-overflow: ellipsis
                    .el-upload__input
                      display :none
                  .el-upload-list
                    padding-left: 80px;
                    .el-upload-list__item
                      width :70%


      .tips1
        .el-dialog--small
          width: 92%
          height :5.94rem
          top: 50%
          margin-top: -2.97rem
          .el-dialog__header
            display :none
          .el-dialog__body
            padding :0
            height :5.94rem
        .content
          padding :1.50rem 0 1.5rem 0
          text-align :center
          .img
            display :inline-block
            width :1.189rem
            height :1.189rem
            background :url(../common/image/tips.png)no-repeat center
            background-size :cover
          .title
            margin :0.71rem 0 0.51rem 0
            font-size :0.28rem
            color :#1F2D3D
            font-family :"MicrosoftYaHei-Bold"
          .des
            font-size :0.24rem
            color :#1F2D3D
      .tips2
        .el-dialog--small
          width: 100%
          height :7.09rem
          box-sizing: border-box
          top: 50% !important
          margin-top: -3.15em
          .el-dialog__header
            position :relative
            .el-dialog__title
              position :absolute
              font-size :0.28rem
          .el-dialog__body
            padding :0.54rem 0 0 0
            height :6.37rem
        .content
          text-align :center
          .img
            display :inline-block
            width :3.70rem
            height :3.7rem
            background :yellow
          .des
            margin :0.46rem 0 0.15rem 0.35rem
            font-size :0.24rem
            color :#475669

        .share
          padding: 0 0.35rem
          .el-form-item
            margin-bottom :0
            margin-right :0
            .el-form-item__content
              .el-input
                width :5rem
                .el-input__inner
                  border: 1px solid #5AA2E7
              .el-button
                margin-left: -0.4rem
                span
                  font-size :0.28rem
                &:hover
                  background :#46BE8A



  @media (min-width: 768px) and (max-width: 992px)
    #apply
      background :#fff
      position: absolute
      bottom: 0
      top: 0
      right: 0
      left: 0
      padding-top :66px
      .container
        width :100%
        padding:0
        margin :0
        .detail_des
          background :#fff
          position :relative
          height :3rem
          line-height :3rem
          border-b-1px(#E5E9F2)
          margin-top :0.2rem
        .detail_show
          height :60px
          line-height :60px
          padding: 21px 29px 21px 21px
          background :#fff
          .content
            position:relative
            height :18px
            line-height :18px
            .name
              font-size: 18px
              color: #475669
            .title
              display :inline-block
              height :14px
              line-height :14px
              font-size: 14px
              color: #1F2D3D
              vertical-align :top
              margin-right :10px
            .text
              display :inline-block
              height: 14px
              line-height: 14px
              vertical-align :top
              .des
                display: inline-block
                vertical-align :top
                font-size: 12px
                color: #475669
                margin-right: 11px
              .price
                display: inline-block
                vertical-align :top
                font-size: 13px
                color: #F96868
            .p_time
              display :inline-block
              height: 12px
              line-height: 12px
              font-size: 12px
              color: #99A9BF

        .apply_post
            padding :50px 0px 34px 0
            height :100%
            background :#fff
            .apply_content
              width :500px
              height :100%
              margin: auto
              .el-form
                .btn
                  width: 420px
                  outline :none
                .el-form-item__content
                  .post,.post1
                    .el-upload
                      .el-upload__input
                        display :none
                    .el-upload-list__item
                      .el-icon-close
                        display:block


      .tips1
        .el-dialog--small
          width: 72%
          height :594px
          top: 50%
          margin-top: -297px
          .el-dialog__header
            display :none
          .el-dialog__body
            padding :0
            height :5.94rem
        .content
          padding :1.50rem 0 1.5rem 0
          text-align :center
          .img
            display :inline-block
            width :1.189rem
            height :1.189rem
            background :url(../common/image/tips.png)no-repeat center
            background-size :cover
          .title
            margin :0.71rem 0 0.51rem 0
            font-size :0.28rem
            color :#1F2D3D
          .des
            font-size :0.24rem
            color :#1F2D3D
      .tips2
        .el-dialog--small
          width: 100%
          height :7.09rem
          box-sizing: border-box
          top: 50% !important
          margin-top: -3.15em
          .el-dialog__header
            position :relative
            .el-dialog__title
              position :absolute
              font-size :0.28rem
          .el-dialog__body
            padding :0.54rem 0 0 0
            height :6.37rem
        .content
          text-align :center
          .img
            display :inline-block
            width :3.70rem
            height :3.7rem
            background :yellow
          .des
            margin :0.46rem 0 0.15rem 0.35rem
            font-size :0.24rem
            color :#475669

        .share
          padding: 0 0.35rem
          .el-form-item
            margin-bottom :0
            margin-right :0
            .el-form-item__content
              .el-input
                width :5rem
                .el-input__inner
                  border: 1px solid #5AA2E7
              .el-button
                margin-left: -0.4rem
                span
                  font-size :0.28rem
                &:hover
                  background :#46BE8A



</style>
