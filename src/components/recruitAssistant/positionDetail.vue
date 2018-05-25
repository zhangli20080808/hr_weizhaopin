<template>
  <div id="interpolateDetail">
    <div class="hidden-sm hidden-lg">
      <!-- <scroller lock-x > -->
        <div class="position-detail-wrap" :style="{'min-height':wh+'px'}">
          <dl class="position_detail">
            <dt>
              <!-- <span class="urgent" v-if="list.isUrgent==1">急招</span> -->
              <!-- <img src="../../common/image/urgent2.png" alt="" width="35px" class="img" v-if="positionInfo.isUrgent==1"> -->
              <span class="position_name">{{positionInfo.positionName}}</span>
            </dt>
            <dd class="position_detail_money" v-show="positionInfo.workCity">
              <span>{{positionInfo.workCity}}</span>
              <span>{{positionInfo.positionTypeStr}}</span>
              <span>{{positionInfo.educationRequire}}</span>
              <span>{{positionInfo.workYear}}</span>
              <span>{{positionInfo.salary}}</span>
              <!-- <div class="position_list_right">{{positionInfo.views}}人看过</div> -->
            </dd>
            <dd class="position_detail_date">
              <span>创建人 : &nbsp;{{positionInfo.creatorName}}</span> &nbsp;
              <em>招聘人数 : {{positionInfo.posiNum > 0 ? positionInfo.posiNum + "人" : "不限"}}</em>
            </dd>
          </dl>

         
          <div class="split"></div>
          <div class="position-classify">
              <p class="p">职位分类：<span>{{positionInfo.categoryName}}</span></p>
              <!-- <p class="p">职位类别：<span>{{positionInfo.classifyName}}</span></p> -->
              <p class="p">工作地址：<span>{{positionInfo.workAddress}}</span></p>
              <p class="p">接收简历邮箱：<span>{{positionInfo.receiveEmail}}</span></p>
          </div>
          <div class="split"></div>
           <!-- 职位描述 -->
          <div class="pos_detail">
            <h2 class="description">
              <span class="pos_des"></span>
              <span class="text">职位描述</span>
            </h2>
            <div class="description_con">
              <p v-html="positionInfo.positionDesc"></p>
            </div>
          </div>
          <footer-logo></footer-logo>
        </div>
      <!-- </scroller> -->
    </div>

  </div>
</template>
<script>
  import {Scroller} from 'vux';
  import util from "../../common/js/util.js";
  import Axios from 'axios';
  import FooterLogo from '../../components/base/footerLogo.vue'

  export default {
    name: 'interpolateDetail',
    data(){
      document.title = '职位详情';
      return {
        shareTipShow: false,
        //职位详情信息
        positionInfo: {
          posiPublishTime: "",
          positionDesc: "",
          positionName: "",
          positionSalaryHighest: "",
          positionSalaryLowest: "",
          positionType: 1,
          rewardAmount: "",
          views: 0,
          workCity: "",
          workCitySpilt: ""
        },
        //分享的参数
        companyHeadImg: null,
        companyUrl: null,
        name: null,
        imgUrl: null,
        title: null,
        desc: null,
        address: '',
        companyValues: '',
        dimensions: '',
        domain: '',
        status: '',
        id: '',
        options: [{
          value: 1,
          label: '0-50'
        }, {
          value: 2,
          label: '50-100'
        }, {
          value: 3,
          label: '100-500'
        }, {
          value: 4,
          label: '500-1000'
        }, {
          value: 5,
          label: '1000人以上'
        }],
        s_options: [{
          value: 1,
          label: '天使轮'
        }, {
          value: 2,
          label: 'A轮'
        }, {
          value: 3,
          label: 'B轮'
        }, {
          value: 4,
          label: 'C轮'
        }, {
          value: 5,
          label: 'D轮'
        }, {
          value: 6,
          label: '上市'
        }, {
          value: 7,
          label: '未融资'
        }],
        //从url里拿值
        positionId: this.$route.query.positionId,
        companyId: this.$route.query.companyId,
        shareFansId: this.$route.query.shareFansId,
        fansId: this.$route.query.fansId,
        empId: this.$route.query.empId,

        accountName: '',
        formShare: {
          eLink: ''
        },
        eLogo: '',
        show: false,
        arrow_tip: false,
        model: false,
        wh:'',
      }
    },
    mounted(){
      document.title = "职位详情";
      document.getElementById("interpolateDetail").style.minHeight = window.innerHeight - 60 + 'px';
      this.wh = window.innerHeight;
      setTimeout(() => {
        this.getPositionInfo();
        // this.getShareTitleInfo();
      }, 20)
    },
    methods: {
      getSignature(){
        var self = this;
        self.$wechat.ready(function (res) {
          //分享给朋友
          self.$wechat.onMenuShareAppMessage({
            title: self.title,
            desc: self.desc,
            link: 'https://aijuhr.com/wx/dist/#/wx/interpolateDetail?companyId=' + self.companyId
            + "&shareFansId=" + (self.recomType == 1 ? self.shareFansId : self.fansId)
            + "&positionId=" + self.positionId
            + "&empId=" + self.empId
            + "&pageFrom=" + self.pageFrom
            + "&recomType=" + self.recomType,//分享链接
            imgUrl: self.imgUrl,//分享图标
            type: '',
            dataUrl: '',
            success: function () {
              //分享成功回调
              
            },
            cancel: function () {
              console.log('用户取消分享后执行的回调函数1');
            }
          });
          //分享朋友圈
          self.$wechat.onMenuShareTimeline({
            title: self.title,
            desc: self.desc,
            link: 'https://aijuhr.com/wx/dist/#/wx/interpolateDetail?companyId=' + self.companyId
            + "&shareFansId=" + (self.recomType == 1 ? self.shareFansId : self.fansId)
            + "&positionId=" + self.positionId
            + "&empId=" + self.empId
            + "&pageFrom=" + self.pageFrom
            + "&recomType=" + self.recomType,//分享链接
            imgUrl: self.imgUrl,//分享图标
            success: function () {
              //分享成功回调
             
            },
            cancel: function () {
              console.log('用户取消分享后执行的回调函数2');
            }
          })
        })
      },
      getPositionInfo(){
        let self = this;
        let method = "recruitPosition/getPositionDetail",
          param = JSON.stringify({
            id: self.positionId,
            // type:1,
          }),
          successd = (response) => {
           
            let res = response.data;
            if(res.code == "0"){
              self.positionInfo = res.data;
               console.log(self.positionInfo )
            }         
          };
        self.$http(method, param, successd);
      },

      filter(item){
        return item.split(',')[1]
      },
      //获取分享标题
      getShareTitleInfo(){
        var self = this;
        var method = "positionRecommend/getShareTitleInfo",
          param = JSON.stringify({reqType: 2, companyId: self.companyId, positionId: self.positionId}),
          successd = function (res) {
            self.imgUrl = res.data.data.imgUrl;
            self.title = res.data.data.title;
            self.desc = res.data.data.desc;
            self.getSignature();
          };
        self.$http(method, param, successd);
      },
    },
    components: {
      Scroller,FooterLogo
    },
  }
</script>
<style lang="less">
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/close';

  .vux-close:before, .vux-close:after {
    height: 2px;
  }
  #app{
    height: 100%;
    background-color: #F8F8FC;
  }
   .xs-container{
    min-height:100%; 
  }
</style>

<style scoped lang="less">

  .position-detail-wrap{
    min-height:100%;
    padding-bottom:48px;
    position: relative;
    background:#F8F8FC;
    .footer_icon{
      bottom:0px!important;
    }
  }
  #interpolateDetail {
    height: 100%;
    background:#F8F8FC;
    @media all and (max-width: 767px) {
      .position_detail {
        padding: 12px 15px;
        font-size: 0.26rem;
        background-color: #fff;
        clear: both;
        // margin-top: 12px;
        &::before {
          border-top: none;
        }
        dt {
          line-height: 0.4rem;
          margin-bottom: 10px;
          font-size: 0.34rem;
          color: #222;
          img {
            display: inline-block;
            vertical-align: middle;
            line-height: 24px;
          }
          .position_name {
            display: inline-block;
            vertical-align: middle;
          }
          .position_detail_right {
            float: right;
            font-size: 0.26rem;
            font-weight: 500;
            color: #FDA732;
            em {
              background: url(../../common/image/money.png) no-repeat center center;
              display: inline-block;
              width: 0.26rem;
              height: 0.26rem;
              background-size: 100% 100%;
              vertical-align: middle;
              line-height: 0.875rem;
              margin-top: -3px;
            }
          }

        }
        .position_detail_money {
          margin-bottom: 6px;
          color: #666;
          span {
            margin-right: 2px;
            background-color: #e5e5e5;
            padding: 3px 5px;
            border-radius: 2px;
            color: #999999;
            font-size: .26rem;
          }
        }
        .position_detail_date {
          color: #999;
          font-size: 0.26rem;
          margin-bottom: 0;
          em {
            font-style: normal;
          }
        }
      }

      .m_s_company {
        padding: 15px;
        background: #fff;
        height: 90px;
        .item-logo {
          display: inline-block;
          float: left;
          width: 60px;
          height: 60px;
        }
        .item-desc {
          margin-left: 70px;
          height: 1.07rem;
          position: relative;
          .item-title {
            font-size: 0.34rem;
            color: #222;
            margin-bottom: 0.12rem;
            width: 80%;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: 200;
            white-space: nowrap;
          }
          .item-info {
            width: 100%;
            height: 15px;
            line-height: 15px;
            .item-pos {
              font-size: 0.26rem;
              float: left;
              width: 80%;
              display: inline-block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              color: #999
            }
          }
          .item-time {
            font-size: 0.26rem;
            color: #999;
            margin-top: 4px;
          }
        }
      }

      .company_link {
        padding: 15px;
        position: relative;
        &::before {
          border-top: none;
        }
        dt {
          width: 60px;
          height: 60px;
          float: left;
          img {
            width: 60px;
            height: 60px;
          }
        }
        dd {
          margin-left: 70px;
          p {
            line-height: 30px;
            color: #5c6170;
            font-size: 0.26rem;
          }
          h6 {
            font-size: 0.24rem;
            font-weight: 400;
            color: #9a9fac;
            line-height: 30px;
          }
          .iconfont {
            font-size: 12px;
          }
          .company_link_i {
            transform: rotate(270deg);
            -ms-transform: rotate(270deg);
            -moz-transform: rotate(270deg);
            -webkit-transform: rotate(270deg);
            -o-transform: rotate(270deg);
            position: absolute;
            right: 10px;
            top: 50%;
            margin-top: -5px;
            color: #bdc0c9;
          }
        }
      }
      
        // 0117新增
        .position-classify{
            padding:.2rem .3rem;
            background:rgba(232,242,248,1);
            .p{
                font-size:.26rem;
                color:#999;
                line-height:1.5;
            }
        }

      .pos_detail {
        background:#ffffff;
        padding: 0 15px;
        clear: both;
        .description {
          font-size: 0.34rem;
          font-weight: 400;
          color: #000;
          position: relative;
          height: 49px;
          line-height: 49px;
          &::before {
            border-top: none;
          }
          .pos_des {
            display: inline-block;
            vertical-align: middle;
            width: 15px;
            height: 17px;
            background: url("../../assets/img/describe.png") no-repeat center;
            background-size: cover;
          }
          .text {
            display: inline-block;
            vertical-align: middle;
            height: 24px;
            line-height: 24px;
            margin-left: 3px;
          }
          .pos_ware {
            display: inline-block;
            vertical-align: middle;
            width: 15px;
            height: 17px;
            background: url("../../assets/img/welfare.png") no-repeat center;
            background-size: cover;
          }
          .recommend {
            display: inline-block;
            vertical-align: middle;
            width: 17px;
            height: 17px;
            background: url("../../assets/img/recommend.png") no-repeat center;
            background-size: cover;
          }
        }
        .description_con {
          color: #666;
          font-size: 0.26rem;
          padding: 10px 0;
          text-align: justify;
          line-height: 0.4rem;
        }
        .software {
          padding: 15px 0;
          ul {
            font-size: 0;
            li {
              display: inline-block;
              padding: 2px 4px;
              list-style: none;
              height: 22px;
              line-height: 22px;
              border-radius: 5px;
              text-align: center;
              color: #fff;
              background: #5AA2E7;
              font-size: 0.26rem;
              margin-right: 5px;
              margin-bottom: 5px;
            }
          }
        }
        .recommendList {
          padding: 12px 0px;
          font-size: 0.26rem;
          background-color: #fff;
          clear: both;
          &::before {
            border-top: none;
          }
          dt {
            line-height: 0.4rem;
            height: 0.4rem;
            margin-bottom: 10px;
            font-size: 0.34rem;
            color: #222;
            img {
              display: inline-block;
              vertical-align: middle;
              line-height: 24px;
            }
            .position_name {
              display: inline-block;
              vertical-align: middle;
            }
            .position_detail_right {
              float: right;
              font-size: 0.26rem;
              font-weight: 500;
              color: #FDA732;
              em {
                background: url(../../assets/img/money.png) no-repeat center center;
                display: inline-block;
                width: 1rem;
                height: 1rem;
                background-size: 100% 100%;
                vertical-align: middle;
                line-height: 0.875rem;
                margin-top: -3px;
              }
            }
          }
          .position_detail_money {
            margin-bottom: 6px;
            color: #666;
            span {
              margin-right: 2px;
              background-color: #e5e5e5;
              padding: 3px 5px;
              border-radius: 2px;
              color: #999999;
              font-size: .26rem;
            }
          }
          .position_detail_date {
            color: #999;
            font-size: 0.26rem;
            margin-bottom: 0;
            em {
              font-style: normal;
            }
          }
        }
      }

      

      .split {
        width: 100%;
        height: 13px;
        background: #F8F8FC;
      }

 
    }

  }

</style>
<style lang="stylus">
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/base.styl"
  #interpolateDetail
    .tips2
      .el-dialog--small
        width: 428px!important;
        height: 404px
        box-sizing: border-box
        top: 50% !important
        margin-top: -212px
        display: block
        .el-dialog__body
          height: 424px
</style>
<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/base.styl"
  #interpolateDetail
    .tips2
      .el-dialog--small
        width: 428px!important;
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
        padding: 0;
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
        min-height: 350px;
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
                    min-height: 300px
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
          color: #5c6170
          font-size: 28px
          margin: 0 auto
          background: url(../../common/image/footer_logo.png) no-repeat center
        }
      }
    }

</style>


