<template>
  <div class="ra-position-list">
      
      <scroller lock-x ref="scrollerBottom" @on-scroll-bottom="loadMore">
        <div class="no_result" v-if="!list.length">
            <div class="tips">
                <p class="">你还没有发布任何职位！ </p>
                <p class="">PC打开 <strong>aijuhr.com</strong></p>
                <p class="">微信扫一扫直接登录，一步轻松搞定新职位</p>
            </div>
            <div class="img"></div>
        </div>
        <div class="list_content" v-else>
          <dl class="position_detail" v-for="item in list" @click="selectItem(item)">
            <dt>
              <!-- <span class="urgent" v-if="list.isUrgent==1">急招</span> -->
              <!-- <img src="../../components/images/urgent2.png" alt="" width="35px" class="img" v-if="item.isUrgent==1"> -->
              <span class="position_name">{{item.positionName}}</span>
            </dt>
            <dd class="position_detail_money">
              <span>{{filter(item.workCity)}}</span>

              <span>{{item.positionType}}</span>
              <span>{{item.salary}}</span>
              <!-- <div class="position_list_right">{{item.views}}人看过</div> -->
            </dd>
            <dd class="position_detail_date">
              <span>发布时间 : &nbsp;{{item.createDate.replace(/-/g,'.')}}</span> &nbsp;
              <em>招聘人数 : {{item.zhaopinNum}}人</em>
            </dd>
          </dl>
           <load-more v-show="showMore" tip="正在加载"></load-more>
          <div class="footer_icon" v-show="list.length>4">
            <a href="https://aijuhr.com">
              <div class="img_detail"></div>
            </a>
          </div>
        </div>
      </scroller>
    <loading v-show="!list.length"></loading>
  </div>
</template>

<script>
  import loading from '../../components/base/loading/loading2.vue'

  import {
    Scroller,
    LoadMore
  } from 'vux'

  export default {
    data(){
      return {
        companyId: '',
        pageNum:1,
        list: [],
        showMore: false,
        onFetching:false,
      }
    },
    methods: {
      getOnlinePosition() {
        var _this = this;
        var method = "recruitPosition/getPositionListByCondition";
        var param = JSON.stringify({
          companyId: this.companyId,
          type: 2,
          pageNum:this.pageNum,
          pageSize:5,
        });
        var successd = function (response) {
          let res = response.data;
          if (res.code == 0) {
            _this.list.push(res.data.positionList);
            _this.page = res.data.page  
            
            _this.showMore = false
            // _this.onFetching = false
            console.log(_this.list)
          }
        }
        _this.$http(method, param, successd);
      },
      selectItem(item) {
        this.$router.push({
          name: 'raPositionDetail',
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
        if(typeof item == "string" && item.indexOf(',') > -1){
          return item.split(',')[1]
        }else{
          return item
        }     
      },
      loadMore () {
        console.log('loadmore')
        if (this.onFetching) {
          // do nothing
        } else {
          this.onFetching = true
          this.pageNum++
          this.showMore = true
          this.getOnlinePosition()
          
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
      LoadMore,
      loading
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
    #app {
        height:100%;
    }
  .ra-position-list {
      height:100%;
      background-color: #F8F8FC;
      .xs-container{
        height :100%;
      }
      .no_result{
        width 100%;
        height 100%;
        background-color :#ffffff;
        padding-top :.38rem;
         text-align :center;
        .tips{
          color :#000;
          font-size :14px;
          margin-bottom:.8rem;
          p{
              line-height 1.5;
          } 
          strong{
              color:#478DE4;
          }
        }
        .img{
          margin :0 auto;
          width :6.22rem;
          height :8.5rem;
          background: url(../../common/image/ra_bg.png) no-repeat center;
          background-size :100%;
        }
      }
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
