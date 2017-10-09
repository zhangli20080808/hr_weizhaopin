<template>
  <div id="apply">

    <!--导航-->
    <header class="hidden-xs">
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
      <div class="detail_des hidden-xs">
        <div class="tips ">
          <ul class="tips_nav">
            <li class="nav_item">招聘首页</li>
            <span class="icon">></span>
            <li class="nav_item">职位列表</li>
            <span class="icon">></span>
            <li class="nav_item">职位详情</li>
            <span class="icon1">></span>
            <li class="nav_item">申请职位</li>
          </ul>
        </div>
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
        class="tips"
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
    </div>

  </div>
</template>
<script>
  import fileUpload from './base/fileUpload.vue';
  import Scroll from './base/scroll.vue';
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
        dialogVisible: false
      }
    },
    created(){

      this._getDetail()
    },
    methods:{
      //处理边界情况的一些常用手段 如果用户在这个地方不小新刷新了
      _getDetail(){
        if(!this.name){
          this.$router.push('/list')
          return
        }
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      beforeAvatarUpload(file){
        console.log(file)
        const isLt2M = file.size / 1024 / 1024 < 10
        if (!isLt2M) {
          alert('上传模板大小不能超过 50MB!')
        }
      },
      fileId(id){
        this.fileIds.push(id);
        console.log(id);
      },
      deleFileId(id){
        var _this = this;
        for(var i=0;i<_this.fileIds.length;i++){
          if(_this.fileIds[i] == id){
            _this.fileIds.splice(i,1);
          }
        }
      },
      open() {
        this.dialogVisible = true
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogVisible = true
            setTimeout(()=>{
              this.open()
              this.$router.push({
                path:`/list`
              })
            },2000)

          } else {
//            alert('提交失败');
            return false;
          }
        });
      },

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
    .tips
      .el-dialog--small
        height :424px
        .el-dialog__header
          display :none
      .content
        padding :114px 0 113px 0
        text-align :center
        .img
          display :inline-block
          width :85px
          height :85px
          background :yellow
        .title
          margin :51px 0 22px 0
          font-size :20px
          color :#1F2D3D
          font-weight :800
        .des
          font-size :18px
          color :#1F2D3D
    header
      height 80px;
      line-height 80px;
      .navbar-sample
        background-color: #fff;
        border-color: #f5f5f5;
        margin-bottom: 0;
        top: 0;
        width: 100%;
        z-index: 1000;
        .navbar-header
          height 84px

        .navbar-brand
          height: 80px;
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
          .tips_nav
            .icon
              display: inline-block
              float: left
              width: 6px
              height: 12px
              margin: 0 10px
              color: #5AA2E7
            .icon1
              display: inline-block
              float: left
              width: 6px
              height: 12px
              margin: 0 10px
              color: #99A9BF
            .nav_item
              float: left
              font-size: 14px
              width: 56px
              height: 16px
              text-align: center
              color: #99A9BF
              &:nth-child(1), &:nth-child(3), &:nth-child(5)
                color: #5AA2E7

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
            .price
              display: inline-block
              font-size: 16px
              color: #F96868
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
              width: 328px;
            .el-form-item__content
              .post,.post1
                .el-upload
                  .el-upload__input
                    display :none
                .el-upload-list__item
                  .el-icon-close
                    display:block


  @media all and (max-width: 768px)
    #apply
      background :#fff
      position: absolute;
      bottom: 0;
      top: 0;
      right: 0;
      left: 0;
      padding-top :0.9rem
      .app_content
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      .tips
        .el-dialog--small
          width :92%
          .el-dialog__header
            display :none
        .content
          text-align :center

          .img
            display :inline-block
            width :1.18rem
            height :1.18rem
          .title
            margin :0.70rem 0 0.5rem 0
            font-size :16px
            color :#1F2D3D
            font-weight :800
          .des
            font-size :14px
            color :#1F2D3D
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
              font-size: 0.36rem;
              color: #475669;
              font-family: HiraginoSansGB-W6;
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
            width: 100%;
            height: 100%;
            padding-left: 0.30rem;
            padding-right: 0.30rem;
            margin: auto;
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
                margin-left: 0.23rem;
              .btn
                width :100%
                outline :none
              .form_btn
                margin-left: 0;
              .el-form-item__content
                  margin-left :0!important
              .el-form-item__content
                .el-input
                  width: 4.56rem;
                .post,.post1
                  .el-upload
                  .el-upload__tip
                    margin-top: -0.1rem;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    .el-upload__input
                      display :none
                  .el-upload-list
                    .el-upload-list__item
                      width :70%


</style>
