<template>
  <div class="approval-detail">
      <!-- 简历基本信息 -->
     <div class="resume-item">
           <div class="avatar">
              <img v-if="offerApprovalDetail.headImg" :src="offerApprovalDetail.headImg" alt="头像">
              <img v-else src="../../common/image/default_avatar2.png" alt="头像">
           </div>
           <div class="content">
              <div class="top-box">
                <div class="name">{{offerApprovalDetail.name}}
                  <img v-if="offerApprovalDetail.sex == 1" src="../../common/image/sex_male.png" alt="sex">
                  <img v-else src="../../common/image/sex_female.png" alt="sex">
                </div>
                <div class="state">待审批</div>

              </div>
              <div class="middle-box">
                <p class="base-info">
                  <span v-if="offerApprovalDetail.age">{{offerApprovalDetail.age}}</span>
                  <span>{{offerApprovalDetail.education || '学历不限'}}</span>
                  <span>{{offerApprovalDetail.workYear || '经验不限'}}</span></p>
              </div>
              <div class="bottom-box">
                <label class="label" for="">应聘</label>
                <span class="position-name">{{offerApprovalDetail.position}}</span>
                <span class="date">{{offerApprovalDetail.postTime || ''}}</span>
              </div>
           </div>
        </div>
   <!-- offer基本信息 -->
      <div class="offer-info">
          <div class="offer-salary" v-if="offerApprovalDetail.jobSalary || offerApprovalDetail.jobSalaryPre || offerApprovalDetail.salaryRemark">
               <p class="pItem" v-if="offerApprovalDetail.jobSalary"><span class="key">正式薪资：</span><span class="value">{{offerApprovalDetail.jobSalary}}</span></p>
               <p class="pItem" v-if="offerApprovalDetail.jobSalaryPre"><span class="key">试用期薪资： </span><span class="value">{{offerApprovalDetail.jobSalaryPre}}</span></p>
               <p class="pItem" v-if="offerApprovalDetail.salaryRemark"><span class="key">薪酬备注：</span><span class="value">{{offerApprovalDetail.salaryRemark}}</span></p>
          </div>
          <div class="offer-other">
              <p class="pItem"><span class="key">到岗日期：</span><span class="value">{{offerApprovalDetail.joinDate}}</span></p>
              <p class="pItem"><span class="key">员工类型：</span><span class="value">{{offerApprovalDetail.userDraw}}</span></p>
              <p class="pItem"><span class="key">试用期：</span><span class="value">{{offerApprovalDetail.probation}}个月</span></p>
              <p class="pItem"><span class="key">所在部门：</span><span class="value">{{offerApprovalDetail.deptName}}</span></p>
              <p class="pItem"><span class="key">担任职位：</span><span class="value">{{offerApprovalDetail.position}}</span></p>
          </div>
      </div>
   <!-- 审批进程 -->
    <div class="approval-progress">
        <div class="progress-hd">审批进程</div>
        <div class="progress-bd">
            <div class="progress-left">
            </div>
            <ul class="progress-right" >
                <li class="li"  v-for="(item,index) in offerApprovalDetail.progressList" :key="item.id" :ref="'li'+index">
                    <div class="person-info">
                        <div class="avator">
                            <img :src="item.headImg" alt="" v-if="item.headImg">
                            <img src="../../common/image/default_avatar2.png" alt="" v-else>
                        </div>
                        <div class="person-box">
                            <p class="person-name"><span>{{item.name}}</span><span class="time">{{item.time}}</span></p>
                            <p class="person-status" :style="{ 'color':item.status == '已同意' ? '#46BE8A' : item.status == '已拒绝' ? '#F96868' : ''}">{{item.status}}</p>
                            <p class="reason" v-if="item.reason">理由：{{item.reason}}</p>
                        </div>
                    </div>
                    <div class="step-head">
                        <div class="dot-success" v-if="item.status == '已同意' || item.status == '发起审核'"></div>
                        <div class="dot-refuse" v-else-if="item.status == '已拒绝'"></div>
                        <div class="dot-default" v-else></div>
                        <div class="step-line success-line" :style="{height:item.height+'px'}" v-if="item.status == '已同意' || item.status == '发起审核'"></div>
                        <div class="step-line default-line" :style="{height:item.height+'px'}" v-else></div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <!-- 底部按钮 -->
    <div class="btn-fixed">
        <div class="btn-item btn-refuse" @click="showConfirm(0)">拒绝</div>
        <div class="btn-item btn-confirm" @click="showConfirm(1)">同意</div>
    </div>
    <!-- 对话框 -->
     <div>
      <confirm v-model="confirm1"
        title="审批同意确认"
      @on-confirm="agreeOffer(1)">
        <p style="text-align:center;">您是否同意该审批，一旦同意后 无法撤回</p>
      </confirm>
    </div>
     <div>
      <confirm v-model="confirm2"
        title="拒绝原因"  
        @on-confirm="agreeOffer(0)">
         <div class="textarea-wrap">
             <textarea class="textarea" autofocus maxlength="50" v-model.trim="msgReason" placeholder="请输入拒绝原因"></textarea>
             <span class="word-num">{{msgReason.length}}/50</span>
         </div>
      </confirm>
    </div>
  </div>
</template>

<script>
import { Confirm,TransferDomDirective as TransferDom } from 'vux'

export default {
  data(){
      document.title = "offer审批详情"
      return {
            options:null,
            offerApprovalDetail:{},
            confirm1:false,
            confirm2:false,
            msgReason:'',
      }
  },
  components: {
    Confirm
  },
  created(){
      console.log(this.$route.query)
    this.options = this.$route.query
    
    this.getOfferApprovalDetail()
  },
  methods:{
      /**
       * 获取详情
      */
    getOfferApprovalDetail(){
        let self = this
        let method = 'iinterviewer/offerApprovalDetail',
        param=JSON.stringify({
            offerApprovalId:self.options.id
        }),
        successd = function(res){
            if(res.data.code == 0){
              self.offerApprovalDetail = res.data.data
               self.setLineHeight()
            } 
        },
         error = function(error){
                
         };
        self.$http(method,param,successd,error);
    },
    /**
     * 设置进度条高度
    */
    setLineHeight(){
        this.$nextTick(function(){
            let list = this.offerApprovalDetail.progressList
            for(let i=0; i < list.length-1; i++){
                let height = this.$refs['li' + i][0].offsetHeight/2 + this.$refs['li' + (i+1)][0].offsetHeight/2 + 12;
                console.log(height)
                this.$set(list[i],'height',height)
            }
        })
    },
    /**
     *  显示对话框
    */
    showConfirm(type){
        switch(type){
            case 0:
             this.confirm2 = true
             break;
            case 1:
             this.confirm1 = true
             break;
        }
    },
    /**
     * 审批操作
    */
    agreeOffer(type){
        let self = this
        if(type == 0 && self.msgReason == ''){
                self.$vux.toast.text('请先填写拒绝原因哦！')
                return;
        }
        let progressId;
        let approvalUserId = self.options.approvalUserId;
        let progressList = self.offerApprovalDetail.progressList;
        for(let i=0; i<progressList.length;i++){
            if(progressList[i].userId == approvalUserId){
                progressId = progressList[i].id;
                break;
            }
        }
        let method = 'iinterviewer/agreeOffer',
        param=JSON.stringify({
            isAgree:type,
            offerApprovalId:self.options.id,
            rejectReason:self.msgReason,
            progressId:progressId,
        }),
        successd = function(res){
            self.$router.back()
        //    self.$router.push({
        //        name:'approvalList',
        //    })
        };
        self.$http(method,param,successd);
    },
  },
}
</script>


<style lang="less">
 #app {height: 100%; background: #f8f8fc;}
 .vux-confirm .weui-dialog__btn_primary{
     color:#5AA2E7;
 }
</style>

<style lang="less" scoped>
 @import '../css/resumeItem.less';
 
 .resume-item{
     background:#5AA2E7;
     margin-bottom:.24rem;
     .content{
         color:#fff;
         .base-info{ color:#fff;}
        .bottom-box{
             color:#fff;
             .label{
                 background-color:#fff;
             }
             .position-name{ margin-right:.24rem;}
         }
     }
 }
 .offer-info{
     margin-bottom:.24rem;
     padding:.24rem .3rem;
     background-color:#fff;
     font-size: .28rem;
     color: #666;
     .offer-salary{
         padding-bottom:.24rem;
         border-bottom:1px solid #e5e5e5;
     }
     .offer-other{
         padding-top:.24rem;
     }
      .pItem{
          display: flex;
        line-height: 1.5;
        .key{
          display: inline-block;
          width:1.8rem;
        }
        .value{ color:#333; flex:1;}
      }
 }
 .approval-progress{
     padding-left:.3rem;
     padding-right:.3rem;
     padding-bottom:.98rem;
     margin-top:.24rem;
     background-color:#fff;
 }
 .progress-hd{
     display:flex;
     align-items:center;
     height: .96rem;
     padding-left:.46rem;
     background:url('../../common/image/approval-progress.png') left center no-repeat;
     background-size:.34rem;
     font-size:.34rem;
 }
.progress-bd{
    display: flex;
    padding:.24rem 0;
    .progress-left{
        flex:1;
    }
    .progress-right{
        .li{
          display:flex;
          justify-content:space-between;
          width:5.72rem;
          padding:.28rem .24rem;
          margin-bottom:12px;
          box-shadow: 0px 2px 15px 0px rgba(221,227,235,1); 
          border-radius: 8px ; 
          position: relative;
          .person-info{
              display:flex;
              width:100%;
              .avator{
                  width:.64rem;
                  height:.64rem;
                  margin-right:.16rem;
                  border-radius:50%;
                  overflow: hidden;
                  img{
                      width:100%; height: 100%; border-radius:50%;vertical-align: top;
                  }
              }
              .person-box{flex:1;}
              .person-name{display:flex; justify-content:space-between; font-size:.26rem; color:#333; line-height:1.3; margin-bottom:.08rem;}
              .person-status,.reason{ font-size:.24rem; color:#999; }
              .reason { margin-top:.1rem; line-height:1.4;}
          }
          .time { font-size:.24rem; color:#B2B2B2; line-height:1.5;}
          .step-head{
              .dot-success,.dot-refuse,.dot-default{
                  width:.24rem;
                  height: .24rem;                
                  position: absolute;
                  left:-.8rem;
                  top:50%;
                  margin-top:-.12rem;
                  z-index: 2;
              }
              .dot-success{
                background:url('../../common/image/check-circle.png') center center no-repeat;
                background-size:100%;
              }
              .dot-refuse{
                background:url('../../common/image/close-circle.png') center center no-repeat;
                background-size:100%;
              }
              .dot-default{
                background:url('../../common/image/clock-circle.png') center center no-repeat;
                background-size:100%;
              }
              .step-line{
                  width:2px;
                  position: absolute;
                  top:50%;
                  bottom:-50%;
                  left:-.68rem;
                  z-index:1;
              }
              .success-line{
                  background:#5AA2E7;
              }
               .default-line{
                  background:#EBEEF5;
              }
          }
          &:last-child .step-line { display:none;}
        }
        
    }
}
.btn-fixed{
    position:fixed;
    bottom:0;
    z-index: 3;
    display:flex;
    width:100%;
    .btn-item{
        flex:1;
        line-height:.98rem;
        text-align:center;
        color:#fff;
        font-size:.36rem;
    }
    .btn-refuse{
       background-color:#F96868;
    }
    .btn-confirm{
       background-color:#5AA2E7;
    }
}
.textarea-wrap{
    position:relative;
    padding:11px 15px 26px;
    border:1px solid #e5e5e5;
    .textarea{
        width:100%;
        min-height:50px;
        color:#333;
        border:none;
        outline:none;
        resize:none;
    }
    .word-num{
        position: absolute;
        right:15px;
        bottom:11px;
        font-size:12px;
        color: #B2B2B2;
    }
}
</style>

