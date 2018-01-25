<template>
  <div class="teamwork">
    <!--back-->
    <!--<div class="back hidden-sm hidden-lg">-->
    <!--<i class="icon" @click="back"></i>-->
    <!--<h2 class="title">我们的团队</h2>-->
    <!--</div>-->
    <div class="cards" v-for="item in WorkTeam" ref="card">
      <div class="card-type-1">
        <div class="g-card">
          <div class="template-card">
            <div class="template-complex">
              <div class="gm-card-offset">
                <div class="gm-card-header">
                  <h2 class="gm-card-title vux-1px-b">
                    <span class="teamwork_us"></span>
                    <span class="text">{{item.name}}</span>
                  </h2>
                </div>
                <!--slide-->
                <div class="slides">
                  <div style="overflow: hidden; display: block; position: relative;">
                    <div class="slide">
                      <div class="media">
                        <div>
                          <img :src="item.imageUrl" alt="" class="slide-image" width="100%" height="100%">
                        </div>
                      </div>
                      <div class="description">
                        <div class="longtext">
                          {{item.description}}





                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="split"></div>
          <!--团队成员-->
          <div class="member-title" v-show="item.memberList.length>0">
            <div class="gm-card-header">
              <h2 class="gm-card-title vux-1px-b">
                <span class="member_us"></span>
                <span class="text">团队成员</span>
              </h2>
            </div>
          </div>
          <div class="member-list" v-for="list in item.memberList">

            <div class="member">
              <div class="member-header">
                <div class="ref-image">
                  <img :src="list.photoUrl" class="ref-circle-image" alt="">
                </div>
                <div class="g-oneline-text member-name"><span class="name">{{list.positionName}} </span><span
                  class="positionName">{{list.name}}</span>
                </div>
                <div class="member-main">
                  {{list.description}}

                </div>
              </div>

            </div>
          </div>
          <div class="split" v-show="item.memberList.length>0"></div>
        </div>
      </div>
    </div>

    <div class="footer">
      <footer>
        <a href="https://aijuhr.com">
          <div class="title"></div>
        </a>
      </footer>
    </div>

  </div>
</template>

<script>
  import footerNav from '../../components/base/foot'

  export default {
    data(){
      return {
        companyId: '',
        WorkTeam: []
      }
    },
    props: {
      homeData: {
        type: Object
      }
    },
    components: {
      footerNav
    },
    methods: {
      //查询workTeam
      getWorkTeam(){
        var _this = this;
        var method = "companyWeb/getWorkTeamInfo";
        var param = JSON.stringify({
          companyId: _this.companyId
        });
        var successd = function (res) {
          if (res.data.code == 0) {
            _this.WorkTeam = res.data.data
          }
        }
        _this.$http(method, param, successd);
      },
      back(){
        this.$router.back()
      }
    },
    created(){
      this.$nextTick(() => {
        this.companyId = this.$route.query.companyId
        this.getWorkTeam()
        document.title = '我们的团队'
      })
    }
  }

</script>
<style lang="less">
  @import '~vux/src/styles/1px.less';
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>

  @media all and (max-width: 768px) {
    .teamwork {
      margin-bottom: 32px
    }
  }

  .cards-border {
    border: none !important
  }

  .teamwork {
    width: 100%;
    z-index: 2;
    background-color: #f1f5f8;
    border: 0;
    outline: 0;
  }

  .g-oneline-text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 94%;
  }

  .g-column {
    flex: 1
  }

  .teamwork .cards .g-card {
    overflow: hidden;
    width: 100%;
    background-color: #fff;
    /*border: 1px solid #e8f0f8;*/
    /*border-width: 1px 0;*/
  }

  .teamwork .cards .g-card .split {
    width: 100%;
    height: 13px;
    background: #F8F8FC;
  }

  .teamwork .cards .g-card .gm-card {
    padding-bottom: 0.282857rem;
  }

  .teamwork .cards .gm-card-offset {
    margin-left: 0.34rem;
    margin-right: 0.26rem;
  }

  .teamwork .cards .gm-card-offset .gm-card-header {
    overflow: hidden;
    padding: 0 0 15px 0;
    line-height: 1;
  }

  .teamwork .cards .gm-card-offset .gm-card-header .gm-card-title {
    font-size: 0.32rem;
    font-weight: 400;
    color: #000;
    position: relative;
    height: 49px;
    line-height: 49px;
  }

  .teamwork .cards .member-list .gm-card-header .gm-card-title {
    font-size: 0.32rem;
    font-weight: 400;
    color: #000;
    position: relative;
    height: 49px;
    line-height: 49px;
  }

  .teamwork .cards .gm-card-offset .gm-card-header .gm-card-title .teamwork_us {
    display: inline-block;
    vertical-align: middle;
    width: 18px;
    height: 15px;
    background: url(../../common/image/team_icon.png) no-repeat center;
    background-size: cover;
  }

  .teamwork .cards .member-title .gm-card-title {
    font-size: 0.32rem;
    font-weight: 400;
    color: #000;
    position: relative;
    height: 49px;
    line-height: 49px;
  }

  .teamwork .cards .member-title .gm-card-title .member_us {
    display: inline-block;
    vertical-align: middle;
    width: 18px;
    height: 18px;
    background: url(../../common/image/Group_member.png) no-repeat center;
    background-size: cover;
  }

  .teamwork .cards .gm-card-offset .gm-card-header .gm-card-title .text, .teamwork .cards .member-title .gm-card-title .text {
    display: inline-block;
    vertical-align: middle;
    height: 24px;
    line-height: 24px;
    margin-left: 3px;
  }

  .teamwork .cards .template-card {

  }

  .teamwork .cards .template-card .slide {
    z-index: 1;
    background-color: #fff;
    position: relative;
    width: 100%;
    transition: all .5s ease;
    -webkit-animation-duration: .5s;
    animation-duration: .5s;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .teamwork .cards .template-card .media {
    height: 180px;
    overflow: hidden;
  }

  .teamwork .cards .template-card .template-complex .slide-image {
    position: relative;
    display: inline-block;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    border: 0;
    width: 100%;
    height: 180px;
    border-radius: 2px;
    background: #ccc;
  }

  .teamwork .cards .template-card .slide .description {
    font-weight: 300;
    font-size: 14px;
    margin-top: 10px;
  }

  .teamwork .cards .template-card .slide .description .longtext {
    line-height: 24px;
    color: #353535;
  }

  .teamwork .cards .member-title {
    font-size: 14px
    margin-left: 0.34rem;
    margin-right: 0.34rem;
    font-size: 0.32rem;
    font-weight: 400;
    color: #000;
    position: relative;
    height: 49px;
    line-height: 49px;
  }

  .teamwork .cards .member-list {
    font-size: 14px
    margin-left: 0.34rem;
    margin-right: 0.34rem;
  }

  .teamwork .cards .member-list .member {
    margin-bottom: 0.4rem;
  }

  .teamwork .cards .member-list .member .member-header {
    position: relative;
    padding-left: 1.43rem;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    margin-bottom: 0.2rem;
    margin-top: 0.2rem;
  }

  .teamwork .cards .member-list .member .member-header .ref-image {
    position: absolute;
    display: block;
    width: 1.2rem;
    height 1.2rem;
    left: 0;
    top: 0.2rem;
  }

  .teamwork .cards .member-list .gm-card-header {
    overflow: hidden;
    line-height: 1;
  }

  .teamwork .cards .member-list .gm-card-header .gm-card-title {
    font-size: 0.32rem;
    font-weight: 400;
    color: #000;
    position: relative;
    height: 49px;
    line-height: 49px;
  }

  .teamwork .cards .member-list .member .member-header .ref-image img {
    width: 1.2rem;
    height: 1.2rem;
    border: 1px solid #e8f0f8;
    border-radius: 50%;
    position: relative;
    display: inline-block;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 0 0;
    min-width: 30px;
    min-height: 30px;

  }

  .teamwork .cards .member-list .member .member-header .member-name {
    margin-bottom: 4px;
    height: 0.45rem;
  }

  .teamwork .cards .member-list .member .member-header .member-name .name {
    padding: 2px 4px ;
    display: inline-block;
    border-radius: 5px;
    text-align: center;
    height :0.45rem;
    line-height :0.4rem;
    background: #5AA2E7;
    color: #fff;
    font-size: 0.26rem;
    vertical-align: middle;
  }

  .teamwork .cards .member-list .member .member-header .member-name .positionName {
    display: inline-block;
    vertical-align: middle;
    padding-top:1px;
    color: #222;
    height :0.45rem;
    line-height :0.45rem;
    font-size: 0.34rem;
    margin-left :6px;
  }

  .teamwork .cards .member-list .member .member-main {
    margin-bottom: 5px;
    color: #999;
    line-height: 24px;
  }

  .teamwork .back {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 1000;
    height: 1.12rem;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #64b5f6;
    color: rgba(9, 10, 11, 1);
  }

  .teamwork .back .icon {
    display: inline-block;
    width: 39px;
    height: 1.12rem;
    position: absolute;
    left: 0.2rem;
    top: 50%;
    margin-top: -0.56rem;
    background: url(../../common/image/back.png) no-repeat center;
    background-size: 46%;
  }

  .teamwork .back .title {
    width: 100%;
    height: 1.12rem;
    line-height: 1.12rem;
    color: #fff;
    font-size: 0.34rem;
    margin-left: 0.6rem;
  }

  .teamwork
    .footer
      position: fixed
      width: 100%
      bottom: 0
      z-index: 100
      footer
        height: 0.64rem
        background: #F7F7F7
        width: 100%
        line-height: 0.64rem;
        text-align :center;
      .title
        display :inline-block;
        vertical-align :top;
        width :2.53rem;
        height: 0.64rem !important
        line-height: 0.64rem !important
        color: #999999 !important
        font-size: 0.14rem !important
        background: url(../../common/image/footLogo2.jpg) no-repeat center !important
        background-size: 76% !important
</style>
