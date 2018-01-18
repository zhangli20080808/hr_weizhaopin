<template>
  <div class="favourite">
    <!--头像 名字 认证-->
    <scroller lock-x ref="scrollerBottom" :scroll-bottom-offst="100" height="-20">
      <div>
        <div class="favourite_top" v-for="item in list" >

          <div class="favourite_content">
            <span class="favourite_icon"></span>
            <span class="favourite_text">{{item.companyName}}</span>
          </div>
          <dl class="position_detail" v-for="fav in item.positionList" @click="joinPositonDetail(fav)">
            <dt>
              <!-- <span class="urgent" v-if="list.isUrgent==1">急招</span> -->
              <img src="../../components/images/urgent2.png" alt="" width="35px" class="img" v-if="fav.isUrgent==1">
              <span class="position_name">{{fav.positionName}}</span>
            </dt>
            <dd class="position_detail_money">
              <span>{{filter(fav.workCity)}}</span>
              <span>{{fav.positionType == 1 ? '全职' : fav.positionType == 2 ? '兼职' : '实习'}}</span>
              <span>{{fav.positionSalaryLowest}}K-{{fav.positionSalaryHighest}}K</span>
              <!-- <div class="position_list_right">{{item.views}}人看过</div> -->
            </dd>
            <dd class="position_detail_date">
              <span>发布时间 : &nbsp;{{fav.createTime}}</span> &nbsp;
              <em>浏览次数 : {{fav.views}}次</em>
            </dd>
            <div class="star" @click="cancel(fav.id)"></div>
          </dl>
        </div>

        <div class="noTips" v-if="!list||(list&&list.length==0)">
          <div class="imgTips">
            <div class="img"></div>
            <div class="text">
              <p>您还没有收藏职位,快去找找热门职位吧！</p>
            </div>
          </div>
        </div>
        <div class="morePosition_content">
          <div class="morePosition"  @click="toOnlinePosition" :class="{'moreTop':(!list||(list&&list.length==0))}">
            查看更多职位
          </div>



        </div>

      </div>
    </scroller>
    <loading v-show="listShow"></loading>

    <div v-transfer-dom>
      <confirm v-model="show"
               @on-cancel="onCancel"
               @on-confirm="onConfirm"
               @on-show="onShow"
               :title="description"
               @on-hide="onHide">
      </confirm>
    </div>
  </div>

</template>

<script>
  import {Confirm, Scroller, Group, XSwitch, XButton, TransferDomDirective as TransferDom} from 'vux'
  import loading from '../../components/base/loading/loading2.vue'

  export default {
    data(){
      return {
        show: false,
        description: '确认要取消收藏该职位嘛？',
        fansId: this.$route.query.fansId,
        companyId: this.$route.query.companyId,
        list: [],
        listShow:true
      }
    },
    methods: {
      cancel(item){
        let clear = confirm('确定要取消收藏该职位吗？',)
        if (clear == true) {
          this.cancelPositionStore(item)
        }
      },
      onHide () {
        console.log('on hide')
      },
      onShow () {
        console.log('on show')
      },
      onCancel () {
        console.log('on cancel')
      },
      onConfirm (msg) {
        console.log('on confirm')
        if (msg) {
          alert(msg)
        }
      },
      getStorePositionList() {
        var _this = this;
        var method = "wexinPersonalInfo/storePositionList";
        var param = JSON.stringify({
          companyId: this.companyId,
          fansId: this.fansId
        });
        var successd = function (res) {
          if (res.data.code == 0) {
              _this.listShow = false;

            _this.list = res.data.data.collectPositions;
          }
        }
        _this.$http(method, param, successd);
      },
      cancelPositionStore(item){
        var _this = this;
        var method = "wexinPersonalInfo/cancelPositionStore";
        var param = JSON.stringify({
          companyId: _this.companyId,
          positionId: item,
          fansId: _this.fansId
        });
        var successd = function (res) {
          if (res.data.code == 0) {
            _this.getStorePositionList()
          }
        }
        _this.$http(method, param, successd);
      },
      filter(item){
        return item.split(',')[1]
      },
      joinPositonDetail(item){
//          console.log(item.id)
        this.$router.push({
          name: 'listDetail',
          query: {
            positionId: item.id,
            companyId: this.companyId
          }
        })
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
    directives: {
      TransferDom
    },
    components: {
      Confirm,
      Group,
      XSwitch,
      XButton,
      Scroller,
      loading
    },
    mounted(){
      document.title = '职位收藏';
      this.getStorePositionList();
    }
  }

</script>

<style scoped lang="less">
  @import "../../common/stylus/boder";

  .favourite {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    background: #F8F8FC;
    .favourite_top {
      .favourite_content {
        position: relative;
        height: 0.99rem;
        line-height: 0.99rem;
        padding-left: 0.3rem;
        background: #fff;
        .borderBottom(1px, #e5e5e5);
        .favourite_icon {
          display: inline-block;
          position: absolute;
          width: 0.68rem;
          height: 0.7rem;
          left: 0.15rem;
          top: 50%;
          margin-top: -0.35rem;
          background: url(../../common/image/personal/company_color.png) no-repeat center;
          background-size: 50%;
        }
        .favourite_text {
          display: inline-block;
          vertical-align: middle;
          height: 0.99rem;
          margin-left: 23px;
          font-size: 0.34rem;
          color: #5AA2E7;
        }
      }
      .position_detail {
        padding: 12px 15px;
        font-size: 0.28rem;
        background-color: #fff;
        margin-bottom: 12px;
        clear: both;
        position: relative;
        &::before {
          border-top: none;
        }
        .star {
          position: absolute;
          top: 12px;
          right: 15px;
          width: 0.60rem;
          height: 0.60rem;
          background: url(../../common/image/personal/personal_stars.png) no-repeat center;
          background-size: 73%;
        }
        dt {
          line-height: 0.48rem;
          height: 0.48rem;
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
            font-size: 0.26rem;
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
    .noTips {
      .imgTips {
        margin-top: 56px;
        .img {
          display: block;
          width: 130px;
          height: 130px;
          background: url("../../common/image/personal/noResutl_icon.png") no-repeat center;
          background-size: 60%;
          margin: 0 auto;
        }
      }
      .text {
        font-size: 0.28rem;
        color: #99a9bf;
        text-align: center;
        margin-top: 0.2rem;
        p {
          margin-top: 30px;
          margin-bottom: 40px;
        }
      }
    }
    .morePosition_content{
      display: inline-block;
      text-align: center;
      width: 100%;
      .morePosition {
        display: inline-block;
        text-align: center;
        margin-top: 2.23rem;
        font-size: 0.36rem;
        width: 6.7rem;
        height: 0.94rem;
        line-height: 0.94rem;
        color: #fff;
        background: #5AA2E7;
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

</style>





