<template>
  <div class="jobRecord">
    <scroller lock-x ref="scrollerBottom" :scroll-bottom-offst="100" class="scorll_list">
      <div>
        <div class="list_content" @click="goDetail(item)" :key="item.positionApplyId" v-for="item in recordList">
          <div class="positionName">
            <span class="text">{{item.positionName}}</span>
            <span class="status" :class="{'status_fail':item.currentStatus=='已淘汰'}">{{item.currentStatus}}</span>
          </div>
          <div class="companyName">
            <span class="company_icon"></span>
            <span class="company_text">{{item.companyName}}</span>
          </div>
          <!--<div class="applyTime">申请时间：2018-01-18 18:19:10</div>-->
          <div class="applyTime">申请时间：{{getdate(item.createTime)}}</div>
        </div>
        <div class="morePosition_content">
          <div class="morePosition"  @click="toOnlinePosition" :class="{'moreTop':(!recordList||(recordList&&recordList.length==0))}">
            查看更多职位
          </div>
          <div style="height:20px;width:100%;"></div>
          
        </div>  
      </div>
      
      <div class="noTips"  v-if="!recordList||(recordList&&recordList.length==0)">
        <div class="imgTips">
          <div class="img"></div>
          <div class="text">
            <p>暂无求职纪录</p>
          </div>
        </div>
      </div>
    </scroller>
    <loading v-show="listShow"></loading>

  </div>
</template>

<script>
  import {XHeader, Search, Group, Cell, Scroller, LoadMore} from 'vux'
  import loading from '../../components/base/loading/loading2.vue'
  export default {
    data(){
      document.title = '求职记录';      
      return {
        companyId: this.$route.query.companyId || null,
        fansId: this.$route.query.fansId,
        recordList:[],
        listShow:true
      }
    },
    methods: {
      getDeliverHistory(){
        var self = this;
        var method = "weixin/getDeliverHistory",
          param = {
            companyId: self.companyId,
            fansId: self.fansId
          },
          successd = function (res) {
            console.log(res);
           if(res.data.code == 0){
             self.recordList = res.data.data;
             self.listShow = false;             
             }
          };
        self.$webHttp(method, param, successd);
      },
      getdate(item){
        var timestamp4 = new Date(item);
        return timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 8)
      },
      goDetail(item){
        this.$router.push({name:'jobRecordDetail',path:'/jobRecordDetail',query:{positionApplyId: item.positionApplyId,interviewerInfoId:item.interviewerInfoId}})
      },
      toOnlinePosition(){
        this.$router.push({
          name: 'onlinePosition',
          query: {
            companyId: this.companyId
          }
        })
      }      
    },
    mounted(){
      this.getDeliverHistory();
    },
    components: {
      Scroller,
      loading
    }
  }
</script>

<style scoped lang="less">
  .jobRecord {
    background: #F8F8FC;
    .scorll_list {
      .noTips{
        .imgTips{
          margin-top: 56px;
          .img{
            display :block;
            width :130px;
            height :130px;
            background :url("../../common/image/personal/no_record.png")no-repeat center;
            background-size :60%;
            margin:0 auto;
          }
        }
        .text{
          font-size :0.28rem;
          color:#99a9bf;
          text-align :center;
          margin-top :0.2rem;
          p{
            margin-top: 10px;
            &:last-child{
              margin-bottom: 100px;
            }
          }
        }
      }
      .list_content {
        height: 1.92rem;
        background: #fff;
        padding: 0.3rem 0.3rem 0.28rem 0.3rem;
        margin-top: 0.25rem;
        // &:first-child {
        //   margin-top: 0;
        // }
        .positionName {
          color: #222;
          font-size: 0.34rem;
          margin-bottom: 0.2rem;
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
            border-radius: 3px;
            float: right;
            color: #F96868;
            font-size: 0.26rem;
            margin-top: -2px;
          }
        }
        .companyName {
          font-size: 0.26rem;
          margin-bottom: 0.2rem;
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
      .morePosition_content{
        text-align: center;
        width: 100%;
        margin-top: 15px;
        .morePosition {
          font-size: 0.36rem;
          width: 3.6rem;
          height: 0.84rem;
          line-height: 0.84rem;
          text-align: center;
          color: #fff;
          background: #5AA2E7;
          margin: 0 auto;
          border-radius: 5px;
        }

        .moreTop{
          font-size: 0.36rem;
          width: 3.6rem;
          height: 0.84rem;
          line-height: 0.84rem;
          text-align: center;
          color: #fff;
          background: #5AA2E7;
          margin: 0 auto;
          border-radius: 5px;
        }
      }      
    }
  }
</style>
