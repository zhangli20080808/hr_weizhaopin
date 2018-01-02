<template>
  <div class="onlinePosition">
    <scroller lock-x ref="scrollerBottom" height="-55">
      <div class="list_content">
        <img src="../../common/image/banner_online.png" alt="" width="100%" height="100%">
        <dl class="position_detail vux-1px-tb" v-for="item in list" @click="selectItem(item)">
          <dt>
            <!-- <span class="urgent" v-if="list.isUrgent==1">急招</span> -->
            <img src="../../components/images/urgent2.png" alt="" width="35px" class="img" v-if="item.isUrgent==1">
            <span class="position_name">{{item.positionName}}</span>
          </dt>
          <dd class="position_detail_money">
            <span>{{filter(item.workCity)}}</span>
            <span>{{item.positionType == 1 ? '全职' : item.positionType == 2 ? '兼职' : '实习'}}</span>
            <span>{{item.positionSalaryLowest}}K-{{item.positionSalaryHighest}}K</span>
            <!-- <div class="position_list_right">{{item.views}}人看过</div> -->
          </dd>
          <dd class="position_detail_date">
            <span>发布时间 : &nbsp;{{item.posiPublishTime}}</span> &nbsp;
            <em>浏览次数 : {{item.views}}次</em>
          </dd>
        </dl>
        <div class="footer_icon" v-show="list.length>4">
          <div class="img_detail"></div>
        </div>
      </div>
    </scroller>
    <div class="about_online">
      <div class="us" @click="getIndex">关于我们</div>
      <div class="online_p" :class="{'activeColor':active}">在招职位</div>
    </div>
  </div>
</template>

<script>

  import {
    Scroller,
    LoadMore
  } from 'vux'
  export default {
    data(){
      return {
        companyId: '',
        list: [],
        active: true,
        showMore: false
      }
    },
    methods: {
      getOnlinePosition() {
        var _this = this;
        var method = "companyWeb/getWeWebsitePositionByCategoryId";
        var param = JSON.stringify({
          companyId: this.companyId,
          type: 2
        });
        var successd = function (res) {
          if (res.data.code == 0) {
            _this.list = res.data.data

          }
        }
        _this.$http(method, param, successd);
      },
      getIndex(){
        this.$router.push({
          name: 'about',
          query: {
            companyId: this.companyId
          }
        })
      },
      selectItem(item) {
        this.$router.push({
          name: 'listDetail',
          query: {
            companyId: this.companyId,
            positionId: item.id,
          },
          params: {
            id: item.id
          }
        })
      },
      filter(item){
        return item.split(',')[1]
      },
      onScrollBottom () {
        if (this.onFetching) {
          // do nothing
        } else {
          this.onFetching = true
//          if (this.config.pageSize < this.config.totalCount) {
//            this.config.pageSize += 5
//            this.showMore = true
//            this.getOnlinePosition()
//          } else {
////            this.showMore = false
//          }
          setTimeout(() => {
            this.$nextTick(() => {
            })
            this.onFetching = false
          }, 2000)
        }
      }
    },
    created(){
      this.companyId = this.$route.query.companyId
      this.$nextTick(() => {
        this.getOnlinePosition()
      })
    },
    components: {
      Scroller,
      LoadMore
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .onlinePosition {
    background-color: #F8F8FC;
    padding-bottom: 0.86rem
    .list_content {
      .footer_icon {
        height: 0.89rem;
        line-height: 0.89rem;
        text-align: center;
        .img_detail {
          display: inline-block;
          vertical-align: middle;
          width: 106px;
          height: 15px;
          background: url(../../common/image/footLogo2.jpg) no-repeat center;
          background-size: 103px auto;
        }
      }
    }
    .banner_img {
      img {
        width: 100%;
        height: 100%;
      }
    }
    .position_detail {
      padding: 12px 15px;
      font-size: 0.28rem;
      background-color: #fff;
      margin-top: 12px;
      clear: both;
      &::before {
        border-top: none;
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
    .about_online {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      display: flex;
      height: 0.98rem;
      font-size: 0.34rem;
      line-height: 0.98rem;
      background: #fff;
      z-index: 1000;
      border-top: 1px solid #e5e5e5;
    }

    .about_online .us {
      text-align: center;
      flex: 1;
      border-right: 1px solid #e5e5e5;
    }

    .about_online .online_p {
      text-align: center;
      flex: 1;
    }

    .activeColor {
      color: #5AA2E7;
    }

  }
</style>
