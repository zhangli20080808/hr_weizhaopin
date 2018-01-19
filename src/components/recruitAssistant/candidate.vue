<template>
  <div class="candidate-wrap">
     <tab line-width=0 active-color="#5AA2E7">
      <tab-item selected @on-item-click="onItemClick">全部</tab-item>
      <tab-item @on-item-click="onItemClick">待筛选</tab-item>
      <tab-item @on-item-click="onItemClick">待接收面试</tab-item>
      <tab-item @on-item-click="onItemClick">已接收面试</tab-item>
      <tab-item @on-item-click="onItemClick">淘汰</tab-item>
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
 import { urlParse } from '../../common/js/index.js'

  import {
    Scroller,
    LoadMore,
     Tab, TabItem,
  } from 'vux'

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
          options:null,
          code:'',
          companyId:this.$route.query.companyId || '',
          showLoadMore:false,

      }
  },
  created(){
    this.options = urlParse()
    this.code = this.options.code
    if(!localStorage.userInfo){
      this.getCodeUrl()
    }
    this.getAll()
  },
  methods:{
    onItemClick (index) {
      console.log('on item click:', index)
    },
    //微信内访问移动端页面，获取codeUrl；若返回的codeUrl不为空，则需要前端请求codeUrl地址，获取到code值
    getCodeUrl(){
      var _this = this;
      var method = "account/aijuAssistantAutoLogin";
      var param = {
        redirectUri: 'https://aijuhr.com/miniRecruit/#/candidate?companyId=' + _this.companyId,
        code:_this.code
      };
      var successd = function (response) {
        let res = response.data;
         console.log(res)
        if (res.code == "0") {
            //登录成功
           localStorage.userInfo = res.data;
          alert(res.message)
        
        }else if(res.code == "2018"){
            //微信授权登录
             location.href = res.data.codeUrl
        } else if(res.code == "2019"){
            //登录失败，请尝试账号登录         
            _this.$router.push({
              path: `/raLogin`,
              name: 'raLogin',
              params: {
                urlType:'candidate',
              },
              query: {
                companyId: _this.companyId,
              }
          })
        }
      }
      _this.$webHttp(method, param, successd);
    },
    //
    getAll() {
      var _this = this;
      var method = "queryResume/queryAllRepo";
      var param = JSON.stringify({
        companyId:_this.companyId,
        pageNum: 1,
        pageSize: 10
      });
      var successd = function (res) {
        
        if (res.data.code == 0) {
          
        }
      }
      _this.$http(method, param, successd);
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

.candidate-wrap{
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


