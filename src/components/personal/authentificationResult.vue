<template>
  <div class="interpolateResult" id="interpolateResult">
    <!-- <x-header class="header" :left-options="{showBack: false}">身份认证</x-header> -->
    <div class="content">
      <img src="../../assets/img/email.png" alt="succ" style="width:100px;margin:0.62rem 0;">
      <p>已给您的邮箱{{email}}发送了一封邮件，请查看并完成认证</p>
      <x-button type="primary" @click.native="verification" class="hrm_primary_btn background-color-5aa2e7"
                :show-loading="btnLoading1">我已完成认证

      </x-button>
      <x-button plain @click.native="retransmission" class="hrm_primary_btn" :show-loading="btnLoading1">重新发送邮件

      </x-button>
      <x-button plain type="default" @click.native="goInterpolate" class="hrm_primary_btn" :show-loading="btnLoading1">
        重新填写认证信息

      </x-button>
    </div>
  </div>
</template>
<script>
  import {XHeader, XButton} from "vux";
  document.onload = function (res) {
    console.log(document.getElementById("interpolateResult"))
    // document.getElementById("interpolateResult").minHeigh=window.innerHeight;
  }
  export default {
    name: 'authentificationResult',
    data(){
      return {
        email: this.$route.query.email,
        empId: this.$route.query.empId,
        companyId: this.$route.query.companyId,
        fansId: this.$route.query.fansId,
        shareFansId: this.$route.query.shareFansId,
        btnLoading1: false,
        btnLoading2: false,
        recomType: this.$route.query.recomType,
        pageFrom: this.$route.query.pageFrom
      }
    },
    mounted(){
      document.title = "求职者认证";
      document.getElementById("interpolateResult").style.minHeight = window.innerHeight + "px";
    },
    methods: {
      verification(){
        let self = this;
        let method = "positionRecommend/haveFinishAuth",
          param = JSON.stringify({
            empId: self.empId
          }),
          successd = function (res) {
            if (res.data.resCode == 2) {
              self.$router.push({
                name: 'authentification',
                path: '/authentification',
                query: {
                  fansId: self.fansId,
                  shareFansId: self.shareFansId,
                  companyId: self.companyId,
                  empId: self.empId,
                  recomType: self.recomType,
                  pageFrom: self.pageFrom,
                  isInnerEmp: 1
                }
              });
            }else {
              self.$message({
                message: res.data.message,
                type: "info"
              });
            }
          },
          c = function (res) {
          };
        self.$http(method, param, successd, c);
      },
      goInterpolate(){
        var self = this;
        self.$router.push({
          name: 'authentification',
          query: {
            companyId: self.companyId,
            fansId: self.fansId,
            shareFansId: self.shareFansId,
            recomType: self.recomType,
            pageFrom: self.pageFrom,
          }
        });
      },
      retransmission(){
        let self = this;
        self.btnLoading2 = true;
        let methods = "positionRecommend/sendEmailAgain",
          param = JSON.stringify({
            empId: self.empId
          }),
          successd = (res) => {
            self.btnLoading2 = false;
            self.$vux.toast.text("发送成功!请去邮箱查看");
          },
          c = (res) => {
            self.btnLoading2 = false;
          };
        self.$http(methods, param, successd, c);
      }
    },
    components: {
      XHeader, XButton
    }
  }
</script>
<style scoped>
  .interpolateResult {
    background-color: #fff;
  }

  .header {
    background-color: #5aa2e7;
    color: #333;
  }

  .content {
    text-align: center;
  }

  .content p {
    color: #333;
    width: 75%;
    margin: 0 auto;
  }

  .hrm_primary_btn {
    width: 300px;
    margin-top: 0.68rem !important;
    outline: none
  }

  .btn_text {
    width: 300px;
    margin: 0 auto;
  }

  .background-color-5aa2e7 {
    background: #5aa2e7;
  }
</style>
<style>
  .interpolateResult .weui-btn_default {
    border-color: #ddd;
  }
</style>

