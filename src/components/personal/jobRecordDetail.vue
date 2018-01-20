<template>
  <div class="mainWrap">
    <div class="list_content">
      <div class="positionName">
        <span class="text">{{positionName}}</span>
        <span class="status" :class="{'status_fail':currentStatus=='已淘汰'}">{{currentStatus}}</span>
      </div>
      <div class="companyName">
        <span class="company_icon"></span>
        <span class="company_text">{{companyName}}</span>
      </div>
      <!--<div class="applyTime">申请时间：2018-01-18 18:19:10</div>-->
      <div class="applyTime" v-show="createTime">申请时间：{{getdate(createTime)}}</div>
    </div>

    <div class="status">
      <div class="status_content">
        <span class="status_icon"></span>
        <span class="status_tetx">职位申请状态跟踪</span>
      </div>
      <steps :step="resumeProgress" :stepName="step"></steps>
    </div>
    <ul class="record">
      <li v-for="item in zpRecord" class="list">
        <div class="time">{{getdate(item.operateTime)}}</div>
        <div class="describe">{{filterStatus(item.operateStatus)}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {Scroller, Step, StepItem, XButton, XHr} from 'vux'
  import Steps from '../base/step.vue'

  export default {
    name: 'jobRecordDetail',
    data(){
      document.title = "职位申请状态";
      return {
        positionApplyId: this.$route.query.positionApplyId,
        interviewerInfoId: this.$route.query.interviewerInfoId,
        recommendDetail: {
          step: 2
        },
        positionName: "", //申请职位名称
        createTime: null,  //简历投递时间
        companyName: "",  //公司名称
        updateTime: null,  //更新时间（HR确认时间）
        interviewerName: "",  //投递者姓名
        resumeProgress: 1,
        currentStatus: '',
        zpRecord: [],
        step:['投递成功', '面试', '入职']
      }
    },
    mounted(){
      console.log(this.$route)
//      this.createTime = this.getdate(this.$route.params.applyTime)
//      console.log(this.createTime)
      this.getRecommendHistory();
    },
    methods: {
      getRecommendHistory(){
        var self = this;
        var method = "weixin/getResumeHistory",
          param = {
            positionApplyId: this.positionApplyId,
            interviewerInfoId: this.interviewerInfoId
          },
          successd = function (res) {
            if(res.data.code == 0){
              self.positionApplyId = res.data.data.positionApplyId;
              self.positionName = res.data.data.positionName;
              self.interviewerInfoId = res.data.data.interviewerInfoId;
              self.createTime = res.data.data.createTime;
              self.companyName = res.data.data.companyName;
              self.updateTime = res.data.data.updateTime;
              self.currentStatus = res.data.data.currentStatus;
              self.interviewerName = res.data.data.interviewerName;
              self.resumeProgress = res.data.data.resumeProgress;
              self.createTime = self.filterTime(res.data.data.zpRecord);
              self.recommendList = res.data.data.recommendList;
              self.zpRecord = res.data.data.zpRecord;
            }
          };
        self.$webHttp(method, param, successd);
      },
      getdate(item){
        var timestamp4 = new Date(item);
        return timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 8)
      },
      filterStatus(item){
        if (item == 1) {
          item = '简历提交成功'
        } else if (item == 2) {
          item = 'HR将移入备选库'
        } else if (item == 3) {
          item = 'HR发送面试邀约'
        } else if (item == 4) {
          item = 'HR发送offer'
        } else if (item == 5) {
          item = 'R将移入爽约库'
        } else if (item == 6) {
          item = 'HR录用'
        } else if (item == 7) {
          item = 'HR将简历移入淘汰库'
        } else if (item == 8) {
          item = 'HR将移入人才储备库'
        } else if (item == 9) {
          item = 'HR重新发送面试邀约'
        } else if (item == 10) {
          item = 'HR下载简历(查看完整简历)'
        } else if (item == 11) {
          item = 'HR将移入新简历库'
        } else if (item == 12) {
          item = 'HR查看了简历'
        } else {
          item = 'HR确认该offer到岗'
        }
        return item;
      },
      filterTime(item){
        let time;
        item.forEach((item) => {
          if (item.operateStatus == 0) {
            time = item.operateTime
          }
        })
        return time;
      }
    },
    components: {
      Scroller,
      Step,
      StepItem,
      XButton,
      XHr,
      Steps
    },
  }
</script>

<style scoped lang="less">
  @import "../../common/stylus/boder";

  .mainWrap {
    background: #faf7fe;
    font-size: 14px;
    .list_content {
      height: 1.92rem;
      background: #fff;
      padding: 0.3rem 0.3rem 0.28rem 0.3rem;
      margin-top: 0.25rem;
      &:first-child {
        margin-top: 0;
      }
      .positionName {
        color: #222;
        font-size: 0.34rem;
        margin-bottom: 0.12rem;
        .text {
          display: inline-block;
          vertical-align: middle;
        }
        .status {
          display: inline-block;
          vertical-align: top;
          background: #E8F1F8;
          padding: 4px 8px;
          border-radius: 5px;
          float: right;
          color: #5AA2E7;
          font-size: 0.26rem;
          margin-top: -2px;
        }
        .status_fail {
          display: inline-block;
          vertical-align: top;
          background: #FFEAEA;
          padding: 4px 8px;
          border-radius: 5px;
          float: right;
          color: #F96868;
          font-size: 0.26rem;
          margin-top: -2px;
        }
      }
      .companyName {
        margin-bottom: 0.12rem;
        .company_icon {
          display: inline-block;
          vertical-align: middle;
          width: 0.3rem;
          height: 0.25rem;
          background: url(../../common/image/personal/company.png) no-repeat center;
          background-size: 100%;
        }
        .company_text {
          display: inline-block;
          vertical-align: middle;
          font-size: 0.26rem;
          height: 0.24rem;
          color: #999;
        }
      }
      .applyTime {
        font-size: 0.26rem;
        color: #999;
      }

    }
    .status {
      margin-top: 10px;
      background: #fff;
      padding-left: 0.3rem;
      .status_content {
        position: relative;
        height: 0.99rem;
        line-height: 0.99rem;
        .borderBottom(1px, #e5e5e5);
        .status_icon {
          display: inline-block;
          position: absolute;
          width: 33px;
          height: 0.99rem;
          left: -8px;
          top: -1px;
          background: url(../../common/image/personal/personal.png) no-repeat center;
          background-size: 50%;
        }
        .status_tetx {
          display: inline-block;
          vertical-align: middle;
          height: 0.99rem;
          margin-left: 23px;
        }
      }

    }
    .record {
      background: #fff;
      font-size: 0;
      padding: 20px;
      .list {
        margin-bottom: 0.4rem;
        list-style-type: none;
        color: #999;
        font-size: 0.26rem;
        .time{
          margin-bottom: 5px;
        }
      }
    }
  }

  .title {
    padding-bottom: 15px;
    padding: 10px;
    background: #fff;
  }

  .title span {
    color: #6e6e6e;
    float: right;
    font-weight: normal;
    font-size: 12px;
    font-family: "微软雅黑";
  }

  .middle {
    margin: 10px 0;
    padding: 10px;
    background: #fff;
    position: relative;
  }

  .middle .positionName {
    font-weight: 600;
  }

  .middle .companyName {
    color: #999;
    margin-top: 2px;
  }

  .vux-step {
    width: 70%;
    height: 120px;
    margin: 30px auto;
  }



  .weui-cell__ft:after {
    content: " ";
    display: inline-block;
    height: 7px;
    width: 7px;
    border-width: 2px 2px 0 0;
    border-color: #C8C8CD;
    border-style: solid;
    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    position: relative;
    top: -2px;
    position: absolute;
    top: 50%;
    margin-top: -4px;
    right: 2px;
  }

  .weui-cell__ft {
    color: #999999;
    position: absolute;
    right: 30px;
    top: 50%;
  }

</style>

<style>
  /* .status .vux-step-item-tail-finish ,.vux-step-item-tail-wait{
      margin-left: 30px;
  }
  .status .vux-step-item-main{
      top: 35px;
      left: -31px;
  } */
</style>


