<template>
  <div id="apply">

    <div class="container">
      <div class="detail_des hidden-xs hidden-sm">
        <el-breadcrumb separator="/" class="tips">
          <el-breadcrumb-item class="tips_1">招聘首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/list',query:{ companyId: this.companyId}}" class="tips_2">职位列表

          </el-breadcrumb-item>
          <el-breadcrumb-item @click="backlist" class="tips_3">职位详情</el-breadcrumb-item>
          <el-breadcrumb-item>申请职位</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="detail_show">
        <div class="content">
          <div class="name visible-xs">申请职位</div>
          <div class="title">{{name}}</div>
          <div class="text">
            <span class="des">{{getCity(address)}}／{{positionType === 1 ? '全职' : positionType === 2 ? '兼职' : '实习'
              }}</span><span class="price">{{salaryLow}}k-{{salary}}k</span>
          </div>
          <div class="p_time">发布时间：{{filter(time)}}</div>
        </div>
      </div>
      <div class="apply_post">
        <div class="apply_content">
          <el-form :label-position="labelPosition" label-width="80px" ref="ruleForm" :model="formLabelAlign"
                   :rules="rules">
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
            <div class="line"></div>
            <el-form-item label="姓名" prop="name">
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
            </el-form-item>
          </el-form>
        </div>
        <!--<div class="foote">-->
          <!--<footer>-->
            <!--<div class="title"></div>-->
          <!--</footer>-->
        <!--</div>-->
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
    </div>
    <div class="footer hidden-xs">
      <footer>
        <div class="title"></div>
      </footer>
    </div>
  </div>
</template>
<script>
  import Util from '../common/js/util.js';
  import md5 from 'js-md5';
  import Scroll from './base/scroll.vue'

  const ERROR_OK = 0
  export default {
    data() {
      return {
        upLogoUrl: Util.uploadURLForCommon,
        companyId: 0,
        fileIds: [],
        resumeId: 0,
        ids1: 0,
        interviewerId: 0,
        attachmentIds: [],
        id: this.$route.params.id,
        name: this.$route.params.item.positionName,
        salary: this.$route.params.item.positionSalaryHighest,
        salaryLow: this.$route.params.item.positionSalaryLowest,
        address: this.$route.params.item.workCity,
        time: this.$route.params.item.posiPublishTime,
        positionType: this.$route.params.item.positionType,
        fileList: [],
        labelPosition: 'left',
        formLabelAlign: {
          name: '',
          phone: '',
          mail: ''
        },
        rules: {
          name: [
            {required: true, message: '请填写真实姓名', trigger: 'blur'}
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
      }
    },

    methods: {
      //处理边界情况的一些常用手段 如果用户在这个地方不小新刷新了
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
          return item.slice(0,10)
      },
      backSec() {
        this.$router.push({
          path: `/list`,
          query: {companyId: this.companyId}
        })
      },
      getCity(item){
        return item.split(',')[1]
      },
      backlist() {
        this.$router.push({
          path: `/list/${this.id}`,
          params: {
            id: this.id
          },
          query: {companyId: this.companyId}
        })
      }
    },
    created(){
      if (!this.$route.params.item.positionName) {
        console.log('gsg')
        this.$router.push({
          path: `/list`
        })
      }
      this.companyId = this.$route.query.companyId
      this.id = this.$route.params.id
    },
    components: {
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
          width: 408px
          height: 100%
          margin: auto
          .el-form
            .btn
              width: 328px
            .el-form-item__content
              .post, .post1
                .el-upload
                  .el-upload__input
                    display: none
                .el-upload-list__item
                  .el-icon-close
                    display: block

    .footer
      footer
        height: 100px
        line-height: 100px
        background: #F7F7F7
        width: 100%
      .title
        width :100%
        height: 100px
        line-height: 100px
        color: #999999
        font-size: 28px
        margin :0 auto
        background :url(../common/image/footer_logo.png)no-repeat center
  @media all and (max-width: 767px)
    #apply
      background: #fff
      position: absolute
      bottom: 1rem
      top: 0
      right: 0
      left: 0
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

          .footer
            position :relative
            width :100%
            bottom: -0.46rem
            footer
              height: 1rem
              background: #F7F7F7
              width: 100%
              line-height: 1px

            .title
              height: 1rem
              line-height: 1rem
              text-align: center
              color: #999999
              font-size: 0.14rem
              background :url(../common/image/footer_logo.png)no-repeat center
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
