<template>
  <div class="offer-wrap">
     <tab line-width=0 active-color="#5AA2E7">
      <tab-item selected @on-item-click="onItemClick">全部</tab-item>
      <tab-item @on-item-click="onItemClick">待发offer</tab-item>
      <tab-item @on-item-click="onItemClick">待接收offer</tab-item>
      <tab-item @on-item-click="onItemClick">待入职</tab-item>
      <tab-item @on-item-click="onItemClick">已入职</tab-item>
    </tab>
    <scroller lock-x ref="scrollerBottom" height="-44" @on-scroll-bottom="loadMore">
      <div class="resume-list-wrap">
        <div class="resume-item">
           <div class="avatar">
              <img src="../../common/image/default_avatar.png" alt="头像">
           </div>
           <div class="content">
              <div class="top-box">
                <div class="name">叶秋<img src="../../common/image/sex_male.png" alt="sex"></div>
                <div class="state">已入职</div>

              </div>
              <div class="middle-box">
                <p class="base-info"><span>26岁</span><span>大专</span><span>6年</span><span>杭州市西湖区</span></p>
                <p class="company">杭州爱聚科技有限公司</p>
              </div>
              <div class="bottom-box">
                <label class="label" for="">应聘</label>
                <span class="position-name">前端开发</span>
              </div>
           </div>
        </div>
        <div class="resume-item">
           <div class="avatar">
              <img src="../../common/image/default_avatar.png" alt="头像">
           </div>
           <div class="content">
              <div class="top-box">
                <div class="name">叶秋<img src="../../common/image/sex_male.png" alt="sex"></div>
                <div class="state">待发offer</div>

              </div>
              <div class="middle-box">
                <p class="base-info"><span>26岁</span><span>大专</span><span>6年</span><span>杭州市西湖区</span></p>
                <p class="company">杭州爱聚科技有限公司</p>
              </div>
              <div class="bottom-box">
                <label class="label" for="">应聘</label>
                <span class="position-name">前端开发</span>
              </div>
           </div>
        </div>
        <div class="resume-item">
           <div class="avatar">
              <img src="../../common/image/default_avatar.png" alt="头像">
           </div>
           <div class="content">
              <div class="top-box">
                <div class="name">叶秋<img src="../../common/image/sex_male.png" alt="sex"></div>
                <div class="state">待率先</div>

              </div>
              <div class="middle-box">
                <p class="base-info"><span>26岁</span><span>大专</span><span>6年</span><span>杭州市西湖区</span></p>
                <p class="company">杭州爱聚科技有限公司</p>
              </div>
              <div class="bottom-box">
                <label class="label" for="">应聘</label>
                <span class="position-name">前端开发</span>
              </div>
           </div>
        </div>


      </div>
      <load-more v-show="showLoadMore" tip="正在加载"></load-more>

       <div class="logo">
            <div class="logo_img"></div>

          </div>
          <!-- <foot-logo></foot-logo> -->
    </scroller>
  </div>
</template>


<script>
 import loading from '../../components/base/loading/loading2.vue'
 import FootLogo from '../../components/base/foot.vue'

import {Scroller,LoadMore,Tab, TabItem} from 'vux'

export default {
  components: {
    Scroller,
    LoadMore,
     Tab,
    TabItem,
    FootLogo
  },
  data(){
      return {
          showLoadMore:false,

      }
  },
  created(){

  },
  mounted(){

  },
  methods:{
    onItemClick (index) {
      console.log('on item click:', index)
    },
    loadMore(e){
      console.log("loadmore")
      console.log(e)
      this.showLoadMore = true;
    },
  },
  
}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
 
.vux-tab {
  justify-content: space-around;
  border-bottom:1px solid #e5e5e5;
  .vux-tab-item{
    background: none;
    flex:none;
    width: auto;
  }
}

.offer-wrap{
  background-color: #F8F8FC;
  height: 100%;
  .resume-list-wrap{
    margin-top:12px;
    .resume-item{
      display: flex;
      justify-content: space-between;
      padding:.24rem .24rem .3rem .3rem;
      margin-bottom:.25rem;
      background-color: #ffffff;
      .avatar{
        width:1.28rem;
        height:1.28rem;
        overflow: hidden;
        margin-right:.25rem;
        img{
          width:100%;
          height:100%;
          vertical-align: top;
        }
      }
      .content{
        flex:1;
        padding-top:.1rem;
        .top-box{
          display: flex;
          justify-content: space-between;
          .name{
            position: relative;
            padding-right:.4rem;
            font-size:.36rem;
            line-height: .5rem;
            img{
              position: absolute;
              right:0;
              bottom:0.08rem;
              width:.28rem;
              height:.28rem;
            }
          }
          .state{
            height: .45rem;
            line-height: .45rem;
            padding-left:4px;
            padding-right:4px;
            background-color: #E8F1F8;
            font-size:.26rem;
            color: #5AA2E7;
            border-radius: 3px;
          }
        }
        .middle-box{
          font-size:.26rem;
          color:#9B9B9B;
          line-height: 1.5;
          .base-info{
            span{
              margin-right:.2rem;
            }
          }
          .company{
            padding-left:.35rem;
            background: url("../../common/image/industry-lg.png") left center no-repeat;
            background-size: .3rem .25rem;
          }
        }
        .bottom-box{
          display: flex;
          align-items: center;
          color: #5AA2E7;
          font-size: .26rem;
          margin-top:.2rem;
          .label{
            height: .36rem;
            line-height: .36rem;
            border-radius: .18rem;
            padding:0 .1rem;
            margin-right: .12rem;
            border:1px solid #5AA2E7;
            color: #5AA2E7;
            font-weight: normal;
          }
        }
      }
    }
  }
  .logo {
        width: 100%;
        height: 57px;
        line-height: 57px;
        text-align: center;
        .logo_img {
          display: inline-block;
          width: 114px;
          height: 14px;
          line-height: 14px;
          background: url("../../assets/img/footLogo2.png") no-repeat center;
          background-size: 103px auto;
        }

      }
}

</style>


