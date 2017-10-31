<template>
  <div id="list_detail" v-show="item">
    <Scroll
      :data="item"
      :listenScroll="listenScroll"
      :probeType="probeType"
      ref="list"
      class="container">
      <div>
        <div class="detail_des hidden-xs hidden-sm">
          <el-breadcrumb separator="/" class="tips">
            <el-breadcrumb-item :to="{ path: '/',query:{ companyId: this.companyId} }" class="tips_1">招聘首页












            </el-breadcrumb-item>
            <el-breadcrumb-item
              :to="{ path: '/list' ,query:{ companyId: this.companyId},params:{id:this.$route.params.id}}"
              class="tips_2">
              职位列表












            </el-breadcrumb-item>
            <el-breadcrumb-item>职位详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <div class="detail_show" v-show="show">
          <div class="content">
            <div class="title">{{item.positionName}}</div>
            <div class="text">
            <span
              class="des">{{getCity(item.workCity)}}／{{item.positionType === 1 ? '全职' : item.positionType === 2 ? '兼职' : '实习'
              }}</span><span class="price">{{item.positionSalaryLowest}}k-{{item.positionSalaryHighest}}k</span>
            </div>
            <div class="p_time">发布时间：{{filterTime(item.posiPublishTime)}}</div>

            <div class="post_share">
              <x-button mini type="primary" @click.native="join">申请职位</x-button>
              <x-button mini  @click.native="share">分享职位</x-button>
            </div>
          </div>
        </div>
        <div class="detail_text">
          <div class="detail_content">
            <div class="title" v-show="item">职位描述</div>
            <el-form>
              <el-form-item>
                <el-input type="textarea" class="text" v-model="item.positionDesc" readonly
                          autosize></el-input>
              </el-form-item>
            </el-form>

          </div>
        </div>
      </div>
    </Scroll>
    <div class="footer">
      <footer>
        <div class="title"></div>
      </footer>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="showDialogStyle" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}">
        <p style="color:#fff;text-align:center;" @click="showDialogStyle = false">
          <span style="font-size:30px;" class="img"></span>
        </p>
      </x-dialog>
    </div>

    <el-dialog
      class="tips2"
      title="扫码分享职位"
      :visible.sync="dialogVisible2"
      size="small"
    >
      <div class="content">
        <div class="img">
          <img :src="eLogo" alt="">
        </div>
        <div class="des">或使用链接分享</div>
      </div>
      <el-form :inline="true" :model="formShare" class="share">
        <el-form-item>
          <el-input v-model="formShare.eLink" id="copyLinkInput"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" ref="btn" @click="copyLink">复制链接</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="model" v-show="model" @click="close">
      <div class="share-arrow" v-show="arrow_tip"></div>
    </div>

  </div>
</template>
<script>
  import Scroll from './base/scroll2'
  import {XButton,XDialog,TransferDomDirective as TransferDom } from 'vux'
  export default {
    data() {
      return {
        id: this.$route.params.id,
        companyId: '',
        item: {
          positionName: '',
          classifyName: '',
          workCity: '',
          posiPubishTime: '',
          positionType: 1,
          positionSalaryLowest: '',
          positionSalaryHighest: '',
          positionDesc: ''
        },
        dialogVisible2: false,
        formShare: {
          eLink: ''
        },
        eLogo: '',
        show: false,
        arrow_tip: false,
        model:false
      }
    },
    directives: {
      TransferDom
    },
    created() {
      this.probeType = 3
      this.listenScroll = true
      this._getDetail()
      if (this.$route.query.companyId) {
        this.companyId = this.$route.query.companyId
      }
      if (this.$route.params.id) {
        this.id = this.$route.params.id
      }
    },
    methods: {
      //处理边界情况的一些常用手段 如果用户在这个地方不小新刷新了
      _getDetail() {

        var _this = this;
        var method = "promotionPage/positionInfo";
        var param = JSON.stringify({
          id: _this.id
        });
        var successd = function (res) {
          if (res.data.code == 0) {
            _this.item = res.data.data.positionInfo
            _this.show = true
          }
        }
        _this.$http(method, param, successd);
      },
      //过滤
      filter(item){
        return JSON.parse(item)
      },
      getCity(item){
        return item.split(',')[1]
      },
      join() {
        this.$router.push({
          path: `/apply/${this.id}`,
          name: 'apply',
          params: {
            item: this.item,
            id: this.id
          },
          query: {
            companyId: this.companyId,
          }

        })
      },
      backIndex() {
        this.$router.push({
          path: `/`
        })
      },
      filterTime(item){
        if (item) {
          return item.substr(0, 10)
        } else {
          return '';
        }

      },
      share() {
        if (document.documentElement.clientWidth > 768) {
          this.dialogVisible2 = true
          var _this = this;
          var method = "recruitPosition/sharePosition";
          var param = JSON.stringify({
            positionId: _this.id
          });
          var successd = function (res) {
            if (res.data.code == 0) {
              console.log(res.data)
              _this.eLogo = res.data.data[0]
              _this.formShare.eLink = res.data.data[1]
            }
          }
          _this.$http(method, param, successd);
        } else {
          this.model = true
          this.arrow_tip = true

        }
      },
      copyLink(){

        var self = this;
        document.getElementById("copyLinkInput").children[0].select();
        document.execCommand("Copy");
        self.$message({
          message: "复制成功",
          type: 'success'
        })
      },
      close(){
        this.model = false
        this.arrow_tip = false
      }
    },
    components: {
      Scroll,
      XButton,
      XDialog
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/mixin.styl"
  #list_detail
    .tips2
      .el-dialog--small
        width: 428px;
        height: 404px
        box-sizing: border-box
        top: 50% !important
        margin-top: -212px
        display: block
        .el-dialog__body
          height: 424px
      .content
        text-align: center
        .img
          display: inline-block
          width: 210px
          height: 210px
          img
            width: 100%;
            height: 100%;
        .title
          margin: 51px 0 22px 0
          font-size: 20px
          color: #1F2D3D
          font-weight: 800
        .des
          text-align: left
          margin-top: 26px
          margin-bottom: 15px
          color: #475669
          font-size: 14px
          padding-left: 17px;
      .share
        padding: 0 1.35rem;
        .el-form-item
          margin-bottom: 0
          margin-right: 0
          .el-form-item__content
            .el-input
              width: 284px
              .el-input__inner
                border: 1px solid #5AA2E7;
            .el-button
              &:hover
                background: #46BE8A

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
          .tips_1, .tips_2 {
            .el-breadcrumb__item__inner, .el-breadcrumb__item__inner a, .el-breadcrumb__separator {
              color: #5AA2E7
            }
          }
      .detail_show
        height: 126px
        background: #fff
        padding: 21px 0 18px 24px
        margin-bottom: 20px
        border-bottom: 1px solid #E5E9F2
        .content
          position: relative
          .post_share
            position: absolute
            width: 222px
            height: 40px
            line-height: 40px
            right: 30px
            top: 0
          .title
            font-size: 20px
            color: #1F2D3D
            margin-bottom: 14px
          .text
            height: 16px
            line-height: 16px
            .des
              display: inline-block
              font-size: 16px
              color: #475669
              margin-right: 23px
            .price
              display: inline-block
              font-size: 18px
              color: #F96868
          .p_time
            margin-top: 23px
            font-size: 16px
            color: #99A9BF
      .detail_text
        background: #fff
        padding: 19px 0 29px 23px
        .detail_content
          .title
            margin-bottom: 20px
            font-size: 16px
          .el-form
            .el-form-item
              .el-form-item__content
                .text
                  outline: none
                  border: none
                  .el-textarea__inner
                    border: none !important
                    outline: none !important
          .des_p
            width: 100%
            background: #fff
            border: none
            outline: none
            height: 400px
            line-height: 2
            font-size: 14px
            color: #333

    .footer {
      footer {
        height: 100px
        line-height: 100px
        background: #F7F7F7
        width: 100%
        .title {
          width: 100%
          height: 100px
          line-height: 100px
          color: #999999
          font-size: 28px
          margin: 0 auto
          background: url(../common/image/footer_logo.png) no-repeat center
        }
      }
    }

  @media all and (max-width: 767px)
    #list_detail
      background: #fff
      position: fixed
      bottom: 0
      top: 0
      right: 0
      left: 0
      .container
        padding: 0
        margin: 0
        height: 100%
        overflow: hidden
        .share-arrow
          position: fixed;
          top: 10px;
          width: 2.66rem;
          height: 2.42rem;
          right: 0.34rem;
          background: url(../common/image/tips.png) no-repeat center
          background-size: 100%;
          z-index: 2001;
        .detail_des
          background: #fff
          position: relative
          height: 52px
          line-height: 52px
          border-b-1px(#E5E9F2)
          margin-top: 20px

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
                &:nth-child(1), &:nth-child(3)
                  color: #5AA2E7
        .detail_show
          height: 3.16rem
          background: #fff
          padding: 0.37rem 0 0.3rem 0.30rem
          border-bottom: 1px solid #E5E9F2
          margin-bottom: 0

          .content
            position: relative
            .post_share
              position: relative
              width: 222px
              height: 0.8rem
              line-height: 0.8rem
              left: 0
              .weui-btn_mini
                display: inline-block
                vertical-align: top
                background: #5aa2e7
              .weui-btn_default
                margin-left: 0
                display: inline-block
                vertical-align: top
                margin-top :0
                background :#F8F8F8
            .title
              font-size: 0.28rem
              color: #1F2D3D
              margin-bottom: 0
            .text
              height: 0.25rem
              line-height: 0.25rem
              margin-top: 0.25rem
              .des
                display: inline-block
                font-size: 0.24rem
                color: #475669
                margin-right: 0.36rem
                vertical-align: middle
              .price
                display: inline-block
                font-size: 0.26rem
                vertical-align: middle
                color: #F96868
            .p_time
              height: 0.23rem
              line-height: 0.23rem
              font-size: 0.24rem
              color: #99A9BF
              margin-bottom: 0.38rem
              margin-top: 0.5rem
        .detail_text
          width: 100%;
          background: #fff;
          padding: 0;
          .detail_content
            padding: 0.39rem 0.32rem 0.3rem 0.27rem
            color: #1F2D3D
            font-size :0.28rem
            .title
              margin-bottom: 0.2rem
              font-size: 0.28rem
            .el-form
              .el-form-item
                .el-form-item__content
                  .text
                    outline: none
                    border: none
                    .el-textarea__inner
                      font-size :0.28rem
                      line-height: 2
                      overflow: hidden
                      border: none !important
                      outline: none !important
            .des_p
              width: 100%
              background: #fff
              border: none
              outline: none
              height: 8rem
              line-height: 2
              font-size: 0.28rem
              color: #333

        .footer
          position: relative
          width: 100%
          bottom: 0
          left: 0
          height: 1rem
          line-height: 1rem
          footer
            background: #F7F7F7
            height: 1rem !important
            line-height: 1rem !important
            width: 100%
            .title
              width: 100%
              height: 100%
              text-align: center
              color: #999999
              font-size: 0.14rem
              background: url(../common/image/footer_logo.png) no-repeat center

      .model
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: .5;
        background: #000;
        z-index: 2000
        .share-arrow{
          position: fixed;
          width: 2rem;
          right: 0.8rem;
          top: 0;
          height: 2rem;
          background: url(../common/image/arrow.png)no-repeat center
          z-index: 3000;
          background-size :100%
        }
  .tips2
    .el-dialog--small
      width: 100%
      height: 7.09rem
      box-sizing: border-box
      top: 50% !important
      margin-top: -3.15em
      display: none
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
            img
              width: 100%
              height: 100%
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

  @media (min-width: 768px) and (max-width: 992px)
    #list_detail

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
        width: 100%
        padding: 0
        margin: 0
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
            .tips_nav
              .icon
                display: inline-block
                float: left
                width: 6px
                height: 12px
                margin: 0 10px
                color: #5AA2E7
                font-size: 16px
              .icon1
                display: inline-block
                float: left
                width: 6px
                height: 12px
                margin: 0 10px
                font-size: 16px
                color: #99A9BF
              .nav_item
                float: left
                font-size: 14px
                width: 56px
                height: 16px
                text-align: center
                color: #99A9BF
                &:nth-child(1), &:nth-child(3)
                  color: #5AA2E7
        .detail_show
          height: 114px
          background: #fff
          padding: 21px 0 18px 24px
          margin-bottom: 20px
          border-bottom: 1px solid #E5E9F2
          .content
            position: relative
            .post_share
              position: absolute
              width: 222px
              height: 40px
              line-height: 40px
              right: 30px
              top: 0
            .title
              font-size: 18px
              color: #1F2D3D
              margin-bottom: 14px
            .text
              height: 14px
              line-height: 14px
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
              margin-top: 23px
              font-size: 14px
              color: #99A9BF
        .detail_text
          background: #fff
          height: 100%
          font-size: 14px
          padding: 19px 0 29px 23px

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
