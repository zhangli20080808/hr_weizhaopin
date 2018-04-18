<template>
  <div class="approval-list">
       <scroller class="scroller" lock-x ref="scrollerBottom" height="-0" :scroll-bottom-offst="100" v-if="offerApprovalList && offerApprovalList.length>0">
            <ul class="approval-ul">
                <li class="li" v-for="item in offerApprovalList" :key="item.id" @click="linkTo(item)">
                    <div class="headimg">
                        <img src="../../common/image/default_avatar2.png" alt="" v-if="item.headImg">
                        <img src="../../common/image/default_avatar2.png" alt="" v-else>
                    </div>
                    <div class="content">
                        <div class="content-name"><span>{{item.name}}</span> offer审批</div>
                        <div class="content-status">{{item.status}}</div>
                    </div>
                    <div class="time">{{item.time}}</div>
                </li>
            </ul>
       </scroller>
       <div class="no-result" v-else>
           <img src="../../common/image/no-result.png" alt="占位图">
           <p>暂无数据</p>
       </div>
       <loading v-show="showLoading"></loading>
  </div>
</template>

<script>
  import loading from '../../components/base/loading/loading2.vue'
   import { urlParse } from '../../common/js/index.js'
  import {
    Scroller,
    LoadMore
    
  } from 'vux'

   export default {
    components: {
      Scroller,
      loading,
    },
    data(){
        document.title = "offer审批"
        return {
            options:null,
            showLoading:false,
            offerApprovalList:[],
        }
    },
    created(){
      this.options = urlParse()      
      this.getOfferApprovalList()
    },
    methods:{
        /**
        *  offer审批列表
        */
        getOfferApprovalList(){
            this.showLoading = true
            let self = this
            let method = 'iinterviewer/offerApprovalList',
            param=JSON.stringify({
                companyId:self.options.companyId,
                approvalUserId:self.options.approvalUserId
            }),
            successd = function(res){
                self.showLoading = false
                if(res.data.code == 0 && res.data.data){
                 self.offerApprovalList = res.data.data
                }
            },
            error = function(error){
                self.showLoading = false
            };
            self.$http(method,param,successd,error);
        },
        /**
       * 跳转至offer审批详情
       */
      linkTo(item) {
        let self = this
        this.$router.push({
          name: 'approvalDetail',
          query: {
            id: item.id,
            approvalUserId: self.options.approvalUserId
          },
          params: {
          }
        })
      },
    },
   }
</script>

<style lang="less">
 #app {height: 100%; background: #f8f8fc;}
</style>

<style lang="less" scoped>
.approval-ul{margin-top:.24rem;}
.approval-ul .li{padding:.24rem .2rem;display: flex; background-color: #fff; border-bottom:1px solid #e5e5e5;}
.approval-ul .li:last-child{ border-bottom:none;}
.approval-ul .li .headimg{width:1rem;height: 1rem;overflow: hidden; border-radius: 50%;margin-right:.24rem;}
.approval-ul .li .headimg img{width:100%;height: 100%;  border-radius: 50%;}
.approval-ul .li .content{flex:1;}
.approval-ul .li .content-name { font-size:.32rem; line-height: 1.5; margin-bottom:.12rem; color: #999}
.approval-ul .li .content-name span{ color: #000; margin-right:.2rem;}
.approval-ul .li .content-status {display: inline-block; padding:4px; font-size:.26rem; color: #5AA2E7; border-radius: 2px; background-color: rgba(232,241,248,1);}
.approval-ul .li .time {width:2.4rem; font-size:.24rem; color: #B2B2B2; text-align: right; line-height: 1.5;}
.no-result { display:flex; flex-direction:column; align-items: center; padding-top:2.3rem;}
.no-result img{ width:2.32rem; height:2.47rem; margin-bottom: .8rem;}
.no-result p{font-size: .28rem; color: #B2B2B2;}
</style>

