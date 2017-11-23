<template>
  <div class="teamwork">
    <!--back-->
    <div class="back hidden-sm hidden-lg">
      <i class="icon" @click="back"></i>
      <h2 class="title">我们的团队</h2>
    </div>
    <div class="cards" v-for="item in WorkTeam">
      <div class="card-type-1" >
        <div class="g-card">
          <div class="template-card">
            <div class="template-complex">
              <div class="gm-card-offset">
                <div class="gm-card-header">
                  <h3 class="gm-card-title">
                    {{item.name}}
                </h3>
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
                      <div class="member-list" v-for="list in item.memberList">
                        <div class="member">
                          <div class="member-header">
                            <span class="ref-image">
                              <img :src="list.photoUrl" class="ref-circle-image" alt="">
                            </span>
                            <div class="g-oneline-text member-name">{{list.name}}</div>
                            <span style="color:#abb4c3">{{list.positionName}}</span>
                          </div>
                          <div class="member-main">
                           {{list.description}}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <footerNav></footerNav>
  </div>
</template>

<script>
  import footerNav from '../../components/base/foot'

  export default {
    data(){
      return {
        companyId:'',
        WorkTeam:[]
      }
    },
    props:{
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
          companyId:_this.companyId
        });
        var successd = function (res) {
          if (res.data.code == 0) {
            console.log(res.data.data)
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
      this.$nextTick(()=>{
          this.getWorkTeam()
      })
    }
  }

</script>

<style scoped>
  @media all and (max-width: 768px) {
    .teamwork{
      padding-top: 56px;
    }
  }

  .teamwork {
      width: 100%;
    position: relative;
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
    border: 1px solid #e8f0f8;
    border-width: 1px 0;
  }

  .teamwork .cards .g-card .gm-card {
    padding-bottom: 0.282857rem;
  }

  .teamwork .cards .gm-card-offset {
    margin-left: 0.562857rem;
    margin-right: 0.562857rem;
  }

  .teamwork .cards .gm-card-offset .gm-card-header {
    overflow: hidden;
    padding: 20px 0;
    line-height: 1;
  }

  .teamwork .cards .gm-card-offset .gm-card-header .gm-card-title {
    font-size: 16px;
    margin: 0;
    font-weight: 700;
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
    height: 154px;
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
    height: 154px;
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
    color: #787e85;
  }

  .teamwork .cards .template-card .slide .member-list {
    margin-top: 0.5rem;
    font-size: 14px
  }

  .teamwork .cards .template-card .slide .member-list .member {
    margin-bottom: 0.4rem;
  }

  .teamwork .cards .template-card .slide .member-list .member .member-header {
    position: relative;
    padding-left: 1.23rem;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    margin-bottom: 0.2rem;
  }

  .teamwork .cards .template-card .slide .member-list .member .member-header .ref-image {
    position: absolute;
    left: 0;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  .teamwork .cards .template-card .slide .member-list .member .member-header .ref-image img {
    width: 1rem;
    height: 1rem;
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

  .teamwork .cards .template-card .slide .member-list .member .member-header .member-name {
    margin-bottom: 4px;
  }

  .teamwork .cards .template-card .slide .member-list .member .member-main {
    margin-bottom: 5px;
    color: #787e85;
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
    height: 34px;
    position: absolute;
    left: 0.2rem;
    top: 0.18rem;
    background: url(../../common/image/back.png) no-repeat center;
    background-size: 50%;
  }
  .teamwork .back .title {
    width: 100%;
    height: 1.12rem;
    line-height: 1.12rem;
    color: #fff;
    font-size: 0.34rem;
    margin-left: 0.6rem;
  }

</style>
