<template>
  <div id="interpolateDetail">
    <div class="container hidden-xs " id="list_detail">
      <div>
        <div class="detail_des hidden-xs hidden-sm">
          <el-breadcrumb separator="/" class="tips">
            <el-breadcrumb-item :to="{ path: '/',query:{ companyId: this.companyId} }" class="tips_1">招聘首页



            </el-breadcrumb-item>
            <el-breadcrumb-item
              :to="{ path: '/list' ,query:{ companyId: this.companyId},params:{id:this.$route.params.id}}"
              class="tips_2">
              职位列表



            </el-breadcrumb-item>
            <el-breadcrumb-item>职位详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="detail_show hidden-xs">
          <div class="content">
            <div class="title">{{positionInfo.positionName}}</div>
            <div class="text">
            <span
              class="des">{{positionInfo.workCity}}/{{positionInfo.positionType === 1 ? '全职' : positionInfo.positionType === 2 ? '兼职' : '实习'
              }}</span><span class="price">{{positionInfo.positionSalaryLowest}}k-{{positionInfo.positionSalaryHighest}}k</span>
            </div>
            <div class="p_time">发布时间：{{positionInfo.posiPublishTime}}</div>

            <div class="post_share">
              <el-button type="primary" @click="join1">申请职位</el-button>
              <el-button @click="share()">分享职位</el-button>
            </div>
          </div>
        </div>
        <div class="job-page__header visible-xs">
          <div class="job-page__header__title">
            <span>{{positionInfo.positionName}}</span>
          </div>
          <div class="job-page__others">
            <span class="des"><i class="address_icon"></i>{{positionInfo.workCity}}</span>
            <span class="price"><i
              class="salary_icon"></i>{{positionInfo.positionSalaryLowest}}k-{{positionInfo.positionSalaryHighest}}k</span>
            <span class="kind"><i
              class="kind_icon"></i>{{positionInfo.positionType === 1 ? '全职' : positionInfo.positionType === 2 ? '兼职' : '实习'
              }}</span>
          </div>
        </div>
        <!--公司-->
        <!--<div class="job-page__header__link visible-xs">-->
        <!--<div class="inner" @click="backIndex">-->
        <!--<div class="column1">-->
        <!--<div class="logo_border">-->
        <!--<img :src="homeData.bigLogo" alt="">-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="column2">-->
        <!--<div class="company">{{homeData.form.company_name}}</div>-->
        <!--<div class="status">-->
        <!--<span class="custom-icon-text-color">{{homeData.s_log_back}}</span>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="column3">-->
        <!--<span class="arrow_icon"></span>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--职位描述-->
        <div class="detail_text">
          <div class="detail_content">
            <div class="title">职位描述</div>
            <div class="text" v-html="positionInfo.positionDesc"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="hidden-sm hidden-lg">
      <div class="personal_header">
        <img :src="tuijianObj.headImg" alt="">
        <h2>{{tuijianObj.nickname}}</h2>
        <div class="header_right">
          <p v-if="tuijianObj.haveGzh==1&&tuijianObj.isSubscribe==0" @click="showTuijianDialog=true;" class="vux-1px-r">关注</p>
          <p v-if="tuijianObj.haveGzh==1&&tuijianObj.isSubscribe==1" class="vux-1px-r">已关注</p>
          <p @click="recommendedSchedule"> &nbsp;我的</p>
          <h6 v-if="tuijianObj.haveGzh==1&&tuijianObj.isSubscribe==0&&tag" @click="choseTag"><span>关注公众号获取职位分享动态</span></h6>
        </div>
      </div>
      <scroller lock-x height="-50">
        <div>
          <!--     <dl class="position_detail">
            <dt>
              <span class="color_ff8054" v-if="positionInfo.isUrgent==1">[急招]</span>
              <span>{{positionInfo.positionName}}</span>
              <span class="f_r" v-if="(isInnerEmp==1&&positionInfo.rewardAmount)||recomType==2">简历悬赏{{positionInfo.rewardAmount}}</span>
            </dt>
            <dd>
              <span>{{positionInfo.workCitySpilt}}</span>
              <span>{{positionInfo.positionSalaryLowest}}K-{{positionInfo.positionSalaryHighest}}K</span>
              <span>{{positionInfo.positionType==1?'全职':positionInfo.positionType==2?'兼职':'实习'}}</span>
              <p class="f_r color_46be8a">{{positionInfo.views}}人看过</p>
            </dd>
          </dl> -->
          <dl class="position_detail vux-1px-tb" v-show="name">
            <dt>
              <!-- <span class="urgent" v-if="list.isUrgent==1">急招</span> -->
              <img src="../common/image/urgent2.png" alt="" width="35px" class="img" v-if="positionInfo.isUrgent==1">
              <span class="position_name">{{positionInfo.positionName}}</span>
            <div class="position_detail_right">
              <!--<em></em>-->
              <!--<span>简历悬赏: <span style="font-weight:700;">{{positionInfo.rewardAmount}}</span>元</span>-->
            </div>
            </dt>
            <dd class="position_detail_money" v-show="positionInfo.workCitySpilt">
              <span>{{positionInfo.workCitySpilt}}</span>
              <span>{{positionInfo.positionType == 1 ? '全职' : positionInfo.positionType == 2 ? '兼职' : '实习'}}</span>
              <span>{{positionInfo.positionSalaryLowest}}K-{{positionInfo.positionSalaryHighest}}K</span>
              <!-- <div class="position_list_right">{{positionInfo.views}}人看过</div> -->
            </dd>
            <dd class="position_detail_date">
              <span>发布时间 : &nbsp;{{positionInfo.createTime}}</span> &nbsp;
              <em>浏览次数 : {{positionInfo.views}}次</em>
            </dd>
          </dl>

          <!--公司简介-->
          <div class="m_s_company" @click="toCompany" v-if="name">
            <img :src="companyHeadImg" class="item-logo" alt="">
            <div class="item-desc">
              <h2 class="item-title">{{name}}</h2>
              <p class="item-info">
              <span class="item-pos">
                {{companyValues}}
              </span></p>
              <p class="item-time">
                {{address}}  | {{domain}} | {{options[status - 1] ? options[status - 1].label : ''}} | {{s_options[dimensions - 1] ? s_options[dimensions - 1].label : ''}}</p>
            </div>
          </div>
          <!-- 职位描述 -->
          <div class="split"></div>
          <div class="pos_detail">
            <h2 class="description vux-1px-tb">
              <span class="pos_des"></span>
              <span class="text">职位描述</span>
              <!--<div class="have_bonus"  v-if="positionInfo.rewardAmount">-->
              <!--<img src="https://aijuhr.com/miniRecruit/static/img/have_bonuss.0e8cbde.png">-->
              <!--</div>-->
            </h2>
            <div class="description_con">
              <p v-html="positionInfo.positionDesc"></p>
            </div>
          </div>
          <div class="split" v-if="positionInfo.positionTagList"></div>
          <!-- 职位福利 -->
          <div class="pos_detail" v-if="positionInfo.positionTagList">
            <h2 class="description vux-1px-tb">
              <span class="pos_ware"></span>
              <span class="text">职位福利</span>
            </h2>
            <div class="software">
              <ul>
                <li v-for="item in positionInfo.positionTagList">{{item.name}}</li>
              </ul>
            </div>
          </div>
          <div class="split"></div>
          <!-- 相关职位推荐 -->
          <div class="pos_detail">
            <h2 class="description vux-1px-tb">
              <span class="recommend"></span>
              <span class="text">相关职位推荐</span>
            </h2>
            <dl class="recommendList vux-1px-tb" v-for="list in positionInfo.similarPositions"
                @click="goDetail(list.id)">
              <dt>
                <!-- <span class="urgent" v-if="list.isUrgent==1">急招</span> -->
                <img src="../common/image/urgent2.png" alt="" width="35px" class="img" v-if="list.isUrgent==1">
                <span class="position_name">{{list.positionName}}</span>
              <div class="position_detail_right" v-if="(positionInfo.rewardAmount&&isInnerEmp==1)||recomType==2">
              </div>
              </dt>
              <dd class="position_detail_money">
                <span>{{filter(list.workCity)}}</span>
                <span>{{list.positionType == 1 ? '全职' : list.positionType == 2 ? '兼职' : '实习'}}</span>
                <span>{{list.positionSalaryLowest}}K-{{list.positionSalaryHighest}}K</span>
                <!-- <div class="position_list_right">{{positionInfo.views}}人看过</div> -->
              </dd>
              <dd class="position_detail_date">
                <span>发布时间 : &nbsp;{{list.createTime}}</span> &nbsp;
                <em>浏览次数 : {{list.views}}次</em>
              </dd>
            </dl>
          </div>
          <div class="logo">
            <div class="logo_img"></div>

          </div>
        </div>
      </scroller>
      <div class="share_btn">
        <div>
          <el-row :gutter="20" v-if="recomType==1 && empAuthSucc==1">
            <el-col :span="24">
              <div class="flex-demo flex-demo2" @click="shareTipShow=true">我要分享</div>
            </el-col>
          </el-row>
          <el-row v-else>
            <el-col :span="8">
              <div class="flex-demo flex-demo3" @click="star">
                <span :class="{'pos_icon3':isStore == true,'pos_icon4':isStore== false}"></span><span
                class="text">收藏</span></div>
            </el-col>
            <el-col :span="8">
              <div class="flex-demo flex-demo1" @click="shareTipShow=true">
                <span class="pos_icon1"></span><span class="text">我要分享</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="flex-demo flex-demo2" @click="join">
                <span class="pos_icon2"></span><span class="text">我要投递</span></div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="share" v-if="shareTipShow" @click="shareTipShow=false">
        <div class="share_tip"></div>
      </div>
    </div>

    <el-dialog
      class="tips2"
      title="扫码分享职位"
      :visible.sync="dialogVisible2"
      size="small"
    >
      <div class="content">
        <div class="img">
          <img :src="eLogo" alt="">
        </div>
        <div class="des">或使用链接分享</div>
      </div>
      <el-form :inline="true" :model="formShare" class="share">
        <el-form-item>
          <el-input v-model="formShare.eLink" id="copyLinkInput"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" ref="btn" @click="copyLink">复制链接</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="model" v-show="model" @click="close">
      <div class="share-arrow" v-show="arrow_tip"></div>
    </div>

    <div v-transfer-dom>
      <x-dialog v-model="dialogShared" class="dialog-demo">
        <div @click="dialogShared=false" style="text-align:right;padding-right:10px">
          <span class="vux-close" style="color:#2C2D31;font-weight:600;"></span>
        </div>
        <div class="img-box">
          <h1>分享成功</h1>
          <img :src="sharedQrcodeUrl" style="width:165px">
          <p>扫码关注 - 获取职位分享动态</p>
        </div>
      </x-dialog>
    </div>

    <div v-transfer-dom>
      <x-dialog v-model="showTuijianDialog" class="dialog-demo">
        <div @click="showTuijianDialog=false" style="text-align:right;padding-right:5px">
          <span class="vux-close" style="color:#2C2D31;font-weight:600;"></span>
        </div>
        <div class="img-box">
          <img :src="tuijianObj.companyGzh.qrcodeUrl" style="width:165px" v-if="tuijianObj.haveGzh==1">
          <p>长按关注</p>
        </div>
      </x-dialog>
    </div>

  </div>
</template>
<script>
  import {Flexbox, FlexboxItem, querystring, XDialog, TransferDomDirective as TransferDom, Scroller} from 'vux';
  import util from "../common/js/util.js";
  import Axios from 'axios';
  export default {
    name: 'interpolateDetail',
    data(){
      return {
        shareTipShow: false,
        //职位详情信息
        positionInfo: {
          isUrgent: 0,
          posiPublishTime: "",
          positionDesc: "",
          positionName: "",
          positionSalaryHighest: "",
          positionSalaryLowest: "",
          positionType: 1,
          rewardAmount: "",
          views: 0,
          workCity: "",
          workCitySpilt: "",
          isStore: true
        },
        //分享的参数
        companyHeadImg: null,
        companyUrl: null,
        name: null,
        imgUrl: null,
        title: null,
        desc: null,
        address: '',
        companyValues: '',
        dimensions: '',
        domain: '',
        status: '',
        id: '',
        options: [{
          value: 1,
          label: '0-50'
        }, {
          value: 2,
          label: '50-100'
        }, {
          value: 3,
          label: '100-500'
        }, {
          value: 4,
          label: '500-1000'
        }, {
          value: 5,
          label: '1000人以上'
        }],
        s_options: [{
          value: 1,
          label: '天使轮'
        }, {
          value: 2,
          label: 'A轮'
        }, {
          value: 3,
          label: 'B轮'
        }, {
          value: 4,
          label: 'C轮'
        }, {
          value: 5,
          label: 'D轮'
        }, {
          value: 6,
          label: '上市'
        }, {
          value: 7,
          label: '未融资'
        }],
        //从url里拿值
        isInnerEmp: this.$route.query.isInnerEmp,//是否显示金额
        empEmail: this.$route.query.empEmail,
        pageFrom: this.$route.query.pageFrom,//2:内推详情,4:捕手详情
        recomType: this.$route.query.recomType,//1:内推,2:捕手
        positionId: this.$route.query.positionId,
        companyId: this.$route.query.companyId,
        shareFansId: this.$route.query.shareFansId,
        authSuccess: this.$route.query.authSuccess,
        fansId: '',
        activityId:this.$route.query.activityId,
        empId: this.$route.query.empId,
        empAuthSucc: this.$route.query.empAuthSucc,//1:认证成功的内部员工

        accountName: '',
        sharedQrcodeUrl: '',
        dialogShared: false,
        isSubscribe: 0,//用户是否关注1:已关注,0:未关注,
        dialogVisible2: false,
        formShare: {
          eLink: ''
        },
        eLogo: '',
        show: false,
        arrow_tip: false,
        model: false,
        //1：已收藏 ， 0：未收藏
        isStore: false,
        tuijianObj:{//个人顶部通栏
          nickname:'',
          isSubscribe:0,
          headImg:null,
          haveGzh:1,
          companyGzh:{
            accountName:'',
            qrcodeUrl:''
          }
        },
        tag:true,
        fansId:this.$route.query.fansId,
        showTuijianDialog:false,
      }
    },
    mounted(){
      document.title = "职位详情";
      document.getElementById("interpolateDetail").style.minHeight = window.innerHeight - 60 + 'px';

      this.getFansId();
      var ua = navigator.userAgent.toLowerCase();
      var isWeixin = ua.indexOf('micromessenger') != -1;
      if (isWeixin) {
        // this.userAuthUrl();
      }else{
        this.getPositionInfo();
      }
      this.getWzpIndexInfo();
      this.getShareTitleInfo();
    },
    methods: {
      getSignature(){
        var self = this;
        self.$wechat.ready(function (res) {
          //分享给朋友
          self.$wechat.onMenuShareAppMessage({
            title: self.title,
            desc: self.desc,
            link: 'https://aijuhr.com/wx/dist/#/wx/interpolateDetail?companyId=' + self.companyId
            + "&shareFansId=" + (self.recomType == 1 ? self.shareFansId : self.fansId)
            + "&positionId=" + self.positionId
            + "&empId=" + self.empId
            + "&pageFrom=" + self.pageFrom
            + "&recomType=" + self.recomType,//分享链接
            imgUrl: self.imgUrl,//分享图标
            type: '',
            dataUrl: '',
            success: function () {
              //分享成功回调
              self.sharePosition();
              self.getWeChatOfficialAccountInfo();
            },
            cancel: function () {
              console.log('用户取消分享后执行的回调函数1');
            }
          });
          //分享朋友圈
          self.$wechat.onMenuShareTimeline({
            title: self.title,
            desc: self.desc,
            link: 'https://aijuhr.com/wx/dist/#/wx/interpolateDetail?companyId=' + self.companyId
            + "&shareFansId=" + (self.recomType == 1 ? self.shareFansId : self.fansId)
            + "&positionId=" + self.positionId
            + "&empId=" + self.empId
            + "&pageFrom=" + self.pageFrom
            + "&recomType=" + self.recomType,//分享链接
            imgUrl: self.imgUrl,//分享图标
            success: function () {
              //分享成功回调
              self.sharePosition();
              self.getWeChatOfficialAccountInfo();
            },
            cancel: function () {
              console.log('用户取消分享后执行的回调函数2');
            }
          })
        })
      },
      getWzpIndexInfo(){
        let self = this;
        let methods = "wzpCompany/getWzpCompanyInfo",
          param = JSON.stringify({
            type: 2,
            companyId: self.companyId
          }),
          successd = (res) => {
            console.log(res);
            self.companyHeadImg = res.data.data.companyHeadImg;
            self.companyUrl = res.data.data.companyUrl;
            self.name = res.data.data.name;
            self.companyValues = res.data.data.companyValues;
            self.address = res.data.data.address;
            self.domain = res.data.data.domain;
            self.status = res.data.data.status;
            self.dimensions = res.data.data.dimensions;
          };
        self.$http(methods, param, successd);
      },
      getFansId(){
        let queryParam = this.urlParse();
        if (!queryParam.fansId) {
          return
        }
        this.fansId = queryParam.fansId
        return this.fansId;
      },
      toCompany(){
        location.href = "https://aijuhr.com/miniRecruit/#/about?companyId=" + this.companyId;
      },
      join(){
        // self.$router.push({path:'/addResume',query:{id:this.positionId,shareFansId:self.shareFansId}})
        location.href = "https://aijuhr.com/miniRecruit/#/addResume?id=" + this.positionId
          + '&shareFansId=' + this.shareFansId
          + "&companyId=" + this.companyId
          + "&recomType=" + this.recomType
          + "&fansId=" + this.fansId;
      },
      join1(){
        this.$router.push({
          name: 'apply',
          query: {
            companyId: this.companyId,
            id: this.positionId
          }
        })
      },
      share() {
        if (document.documentElement.clientWidth > 768) {
          this.dialogVisible2 = true
          var _this = this;
          var method = "recruitPosition/sharePosition";
          var param = JSON.stringify({
            positionId: _this.positionId
          });
          var successd = function (res) {
            if (res.data.code == 0) {
              console.log(res.data)
              _this.eLogo = res.data.data[0]
              _this.formShare.eLink = res.data.data[1]
            }
          }
          _this.$http(method, param, successd);
        } else {
          this.model = true
          this.arrow_tip = true
        }
      },
      copyLink(){
        var self = this;
        document.getElementById("copyLinkInput").children[0].select();
        document.execCommand("Copy");
        self.$message({
          message: "复制成功",
          type: 'success'
        })
      },
      //获取url参数
      urlParse() {

        let url = window.location.href;
        let obj = {};
        let reg = /[?&][^?&]+=[^?&]+/g;
        let arr = url.match(reg);
        if (arr) {
          arr.forEach((item) => {
            let tempArr = item.substring(1).split('=');
            let key = decodeURIComponent(tempArr[0]);

            let val = decodeURIComponent(tempArr[1]);

            obj[key] = val;
          });
        }
        return obj;
      },
      close(){
        this.model = false
        this.arrow_tip = false
      },
      filter(item){
        return item.split(',')[1]
      },
      //获取分享标题
      getShareTitleInfo(){
        var self = this;
        var method = "positionRecommend/getShareTitleInfo",
          param = JSON.stringify({reqType: 2, companyId: self.companyId, positionId: self.positionId}),
          successd = function (res) {
            self.imgUrl = res.data.data.imgUrl;
            self.title = res.data.data.title;
            self.desc = res.data.data.desc;
            self.getSignature();
          };
        self.$http(method, param, successd);
      },
      sharePosition(){
        var self = this;
        var method = "positionRecommend/sharePosition",
          param = JSON.stringify({
            shareFansId: self.shareFansId,
            fansId: self.fansId,
            positionId: self.positionId,
          }),
          successd = function (res) {

          };
        self.$http(method, param, successd);
      },
      //分享之后调用服务号二维码
      getWeChatOfficialAccountInfo(){
        let self = this;
        let method = "positionRecommend/getWeChatOfficialAccountInfo",
          param = JSON.stringify({companyId: self.companyId, type: 2, fansId: self.fansId}),
          successd = function (res) {
            if (res.data.data.qrcodeUrl) {
              self.sharedQrcodeUrl = res.data.data.qrcodeUrl;
              self.accountName = res.data.data.accountName;
              self.isSubscribe = res.data.data.isSubscribe;
              if (self.isSubscribe == 0 && self.sharedQrcodeUrl) {
                self.dialogShared = true;
              }
            }
          }
        self.$http(method, param, successd);
      },
      goDetail(positionId){
        var self = this;

        self.$router.push({
          name: 'listDetail',
          query: {
            companyId: self.companyId,
            positionId: positionId,
          }
        });
        window.location.reload()
      },
      getPositionInfo(){
        let self = this;
        let method = "promotionPage/positionInfo",
          param = JSON.stringify({
            id: self.positionId,
            companyId: self.companyId,
            fansId: self.fansId,
            activityId:self.activityId
          }),
          successd = (res) => {
            self.positionInfo = res.data.data.positionInfo;
            self.isStore = res.data.data.positionInfo.isStore == 1 ? true : false;
          };
        self.$http(method, param, successd);
      },
      star(){
        if (this.isStore) {
          //取消
          this.cancelPositionStore();

        } else {
          //收藏
          this.getStorePosition();
        }
      },
      getStorePosition(){
        var _this = this;
        var method = "wexinPersonalInfo/storePosition";
        var param = JSON.stringify({
          companyId: _this.companyId,
          positionId: _this.positionId,
          fansId: _this.fansId
        });
        console.log(param)
        var successd = function (res) {
          if (res.data.code == 0) {
            _this.isStore = true;
          }
        }
        _this.$http(method, param, successd);
      },
      cancelPositionStore(){
        var _this = this;
        var method = "wexinPersonalInfo/cancelPositionStore";
        var param = JSON.stringify({
          companyId: _this.companyId,
          positionId: _this.positionId,
          fansId: _this.fansId
        });
        var successd = function (res) {
          if (res.data.code == 0) {
            _this.isStore = false;
          }
        }
        _this.$http(method, param, successd);
      },
      userAuthUrl(){
        var self = this;
        var method = "weixin/userAuthUrl",
          param = {
            scope: 'snsapi_userinfo',
            pageFrom: 3,
            companyId: self.companyId,
            positionId: self.positionId
          },
          successd = function (res) {
            if (res.data.userSession == 0 && self.authSuccess != 1) {
              location.href = res.data.userAuthUrl;
            } else {
              self.getPositionInfo();
            }
            self.getUserInfo();
          };
        self.$webHttp(method, param, successd);
      },
      getUserInfo(){
        var self=this;
        var method="weixin/getUserInfo",
            param={
              companyId:self.companyId,
              fansId:self.fansId
            },
            successd=function(res){
              res.data.headImg=res.data.headImg?res.data.headImg:'https://aijuhr.com/images/yidong/head_wx.png';
              self.tuijianObj=res.data;
              if(self.tuijianObj.headImg == ''||self.tuijianObj.headImg == null){
                  self.tuijianObj.headImg = 'https://aijuhr.com/images/yidong/head_wx.png'
                }             
              };
        self.$webHttp(method,param,successd);
      },
      recommendedSchedule(){
        // location.href="https://aijuhr.com/miniRecruit/#/personal?companyId="+this.companyId;
        this.$router.push({
          name:'personal',
          query:{company:this.companyId}
        })
      },
      choseTag(){
        this.tag=!this.tag;
      },
    },
    components: {
      Flexbox, FlexboxItem, querystring, XDialog, Scroller
    },
    directives: {
      TransferDom
    }
  }
</script>
<style lang="less">
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/close';
  @import "./css/main.css";
  .vux-close:before, .vux-close:after {
    height: 2px;
  }
</style>

<style scoped lang="less">
  @import "../common/stylus/boder";

  #interpolateDetail {

    @media all and (max-width: 767px) {
      background-color: #fff;
      padding-bottom: 60px;
      .position_detail {
        padding: 12px 15px;
        font-size: 0.26rem;
        background-color: #fff;
        clear: both;
        margin-top: 12px;
        &::before {
          border-top: none;
        }
        dt {
          line-height: 0.4rem;
          height: 0.4rem;
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
            em {
              background: url(../common/image/money.png) no-repeat center center;
              display: inline-block;
              width: 0.26rem;
              height: 0.26rem;
              background-size: 100% 100%;
              vertical-align: middle;
              line-height: 0.875rem;
              margin-top: -3px;
            }
          }

        }
        .position_detail_money {
          margin-bottom: 6px;
          color: #666;
          span {
            margin-right: 2px;
            background-color: #F5F5F5;
            padding: 3px 5px;
            border-radius: 2px;
            color: #999999;
            font-size: .26rem;
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

      .m_s_company {
        padding: 15px;
        background: #fff;
        height: 90px;
        .item-logo {
          display: inline-block;
          float: left;
          width: 60px;
          height: 60px;
        }
        .item-desc {
          margin-left: 70px;
          height: 1.07rem;
          position: relative;
          .item-title {
            font-size: 0.34rem;
            color: #222;
            margin-bottom: 0.12rem;
            width: 80%;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: 200;
            white-space: nowrap;
          }
          .item-info {
            width: 100%;
            height: 15px;
            line-height: 15px;
            .item-pos {
              font-size: 0.26rem;
              float: left;
              width: 80%;
              display: inline-block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              color: #999
            }
          }
          .item-time {
            font-size: 0.26rem;
            color: #999;
            margin-top: 4px;
          }
        }
      }

      .company_link {
        padding: 15px;
        position: relative;
        &::before {
          border-top: none;
        }
        dt {
          width: 60px;
          height: 60px;
          float: left;
          img {
            width: 60px;
            height: 60px;
          }
        }
        dd {
          margin-left: 70px;
          p {
            line-height: 30px;
            color: #5c6170;
            font-size: 0.26rem;
          }
          h6 {
            font-size: 0.24rem;
            font-weight: 400;
            color: #9a9fac;
            line-height: 30px;
          }
          .iconfont {
            font-size: 12px;
          }
          .company_link_i {
            transform: rotate(270deg);
            -ms-transform: rotate(270deg);
            -moz-transform: rotate(270deg);
            -webkit-transform: rotate(270deg);
            -o-transform: rotate(270deg);
            position: absolute;
            right: 10px;
            top: 50%;
            margin-top: -5px;
            color: #bdc0c9;
          }
        }
      }

      .pos_detail {
        padding: 0 15px;
        clear: both;
        .description {
          font-size: 0.34rem;
          font-weight: 400;
          color: #000;
          position: relative;
          height: 49px;
          line-height: 49px;
          &::before {
            border-top: none;
          }
          .pos_des {
            display: inline-block;
            vertical-align: middle;
            width: 15px;
            height: 17px;
            background: url("../assets/img/describe.png") no-repeat center;
            background-size: cover;
          }
          .text {
            display: inline-block;
            vertical-align: middle;
            height: 24px;
            line-height: 24px;
            margin-left: 3px;
          }
          .pos_ware {
            display: inline-block;
            vertical-align: middle;
            width: 15px;
            height: 17px;
            background: url("../assets/img/welfare.png") no-repeat center;
            background-size: cover;
          }
          .recommend {
            display: inline-block;
            vertical-align: middle;
            width: 17px;
            height: 17px;
            background: url("../assets/img/recommend.png") no-repeat center;
            background-size: cover;
          }
        }
        .description_con {
          color: #666;
          font-size: 0.26rem;
          padding: 10px 0;
          text-align: justify;
          line-height: 0.4rem;
        }
        .software {
          padding: 15px 0;
          ul {
            font-size: 0;
            li {
              display: inline-block;
              padding: 2px 4px;
              list-style: none;
              height: 22px;
              line-height: 22px;
              border-radius: 5px;
              text-align: center;
              color: #fff;
              background: #5AA2E7;
              font-size: 0.26rem;
              margin-right: 5px;
              margin-bottom: 5px;
            }
          }
        }
        .recommendList {
          padding: 12px 0px;
          font-size: 0.26rem;
          background-color: #fff;
          clear: both;
          &::before {
            border-top: none;
          }
          dt {
            line-height: 0.4rem;
            height: 0.4rem;
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
              em {
                background: url(../assets/img/money.png) no-repeat center center;
                display: inline-block;
                width: 1rem;
                height: 1rem;
                background-size: 100% 100%;
                vertical-align: middle;
                line-height: 0.875rem;
                margin-top: -3px;
              }
            }
          }
          .position_detail_money {
            margin-bottom: 6px;
            color: #666;
            span {
              margin-right: 2px;
              background-color: #F5F5F5;
              padding: 3px 5px;
              border-radius: 2px;
              color: #999999;
              font-size: .26rem;
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
          background: url("../assets/img/footLogo2.png") no-repeat center;
          background-size: 103px auto;
        }

      }

      .split {
        width: 100%;
        height: 13px;
        background: #F8F8FC;
      }

      // .vux-1px-tb:before{
      //   display: none;
      // }
      // .position_detail_money .position_detail_right{color: #46BE8A;}
      .have_bonus {
        width: 75px;
        height: 75px;
        position: absolute;
        top: -5px;
        right: 25px;
      }

      .have_bonus img {
        width: 100%
      }

      .share_btn {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 46px;
        background-color: #fff;
      }

      .share_btn .flex-demo {
        text-align: center;
        line-height: 38px;
        height: 46px;
      }

      .share_btn .flex-demo1 {
        background-color: #5AA2E7;
        color: #fff;
      }

      .share_btn .flex-demo3 {
        background-color: #fff;
        color: #5AA2E7;
        position: relative;
        .borderTop(1px, #e5e5e5)

      }

      .share_btn .flex-demo1 .pos_icon1 {
        display: inline-block;
        width: 17px;
        height: 20px;
        vertical-align: middle;
        background: url("../assets/img/share.png") no-repeat center;
        background-size: cover;
      }

      .share_btn .flex-demo2 .pos_icon2 {
        display: inline-block;
        width: 17px;
        height: 20px;
        vertical-align: middle;
        background: url("../assets/img/deliver.png") no-repeat center;
        background-size: cover;
      }

      .share_btn .flex-demo3 .pos_icon3 {
        display: inline-block;
        width: 0.42rem;
        height: 0.4rem;
        vertical-align: middle;
        background: url(../common/image/personal/personal_stars.png) no-repeat center;
        background-size: 100%;
      }

      .share_btn .flex-demo3 .pos_icon4 {
        display: inline-block;
        width: 0.42rem;
        height: 0.4rem;
        vertical-align: middle;
        background: url(../common/image/personal/personal_stars2.png) no-repeat center;
        background-size: 100%;
      }

      .share_btn .flex-demo3 .text, .share_btn .flex-demo2 .text, .share_btn .flex-demo1 .text {
        display: inline-block;
        height: 20px;
        line-height: 23px;
        vertical-align: middle;
        margin-left: 7px;
        font-size: 0.36rem;
      }

      .share_btn .flex-demo2 {
        background-color: #F2A654;
        color: #fff;
      }

      .share_btn_con {
        display: flex;
        list-style: none;
        justify-content: center;
      }

      .share_btn_con li {
        margin-left: 10px;
      }

      .share {
        background-color: rgba(0, 0, 0, 0.8);
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 999;
        top: 0;
        left: 0;
      }

      .share_tip {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 200px;
        background: url(https://aijuhr.com/images/yidong/sharePng.png) no-repeat center center;
        background-size: 80% auto;
        z-index: 1000;
      }

      .img-box h1 {
        font-size: 0.4rem;
      }

      .img-box p {
        font-size: 0.26rem;
        color: #888;
        margin-bottom: 20px;
      }
    }

  }

</style>
<style lang="stylus">
  @import "../common/stylus/mixin.styl"
  @import "../common/stylus/base.styl"
  #interpolateDetail
    .tips2
      .el-dialog--small
        width: 428px !important;
        height: 404px
        box-sizing: border-box
        top: 50% !important
        margin-top: -212px
        display: block
        .el-dialog__body
          height: 424px
</style>
<style lang="stylus" scoped>
  @import "../common/stylus/mixin.styl"
  @import "../common/stylus/base.styl"
  #interpolateDetail
    .tips2
      .el-dialog--small
        width: 428px !important;
        height: 404px
        box-sizing: border-box
        top: 50% !important
        margin-top: -212px
        display: block
        .el-dialog__body
          height: 424px
      .content
        text-align: center
        .img
          display: inline-block
          width: 210px
          height: 210px
          img
            width: 100%;
            height: 100%;
        .title
          margin: 51px 0 22px 0
          font-size: 20px
          color: #1F2D3D
          font-weight: 800
        .des
          text-align: left
          margin-top: 26px
          margin-bottom: 15px
          color: #475669
          font-size: 14px
          padding-left: 17px;
      .share
        padding: 0;
        .el-form-item
          margin-bottom: 0
          margin-right: 0
          .el-form-item__content
            .el-input
              width: 284px
              .el-input__inner
                border: 1px solid #5AA2E7;
            .el-button
              &:hover
                background: #46BE8A

    .container
      .detail_des
        background: #fff
        position: relative
        height: 52px
        line-height: 52px
        border-bottom: 1px solid #E5E9F2
        margin-top: 20px

        .tips
          position: absolute
          left: 23px
          top: 19px
          height: 16px
          line-height: 16px
          .tips_1, .tips_2 {
            .el-breadcrumb__item__inner, .el-breadcrumb__item__inner a, .el-breadcrumb__separator {
              color: #5AA2E7
            }
          }
      .detail_show
        height: 126px
        background: #fff
        padding: 21px 0 18px 24px
        margin-bottom: 20px
        border-bottom: 1px solid #E5E9F2
        .content
          position: relative
          .post_share
            position: absolute
            width: 222px
            height: 40px
            line-height: 40px
            right: 30px
            top: 0
          .title
            font-size: 20px
            color: #1F2D3D
            margin-bottom: 14px
          .text
            height: 16px
            line-height: 16px
            .des
              display: inline-block
              font-size: 16px
              color: #475669
              margin-right: 23px
            .price
              display: inline-block
              font-size: 18px
              color: #F96868
          .p_time
            margin-top: 23px
            font-size: 16px
            color: #99A9BF
      .detail_text
        background: #fff
        padding: 19px 0 29px 23px
        min-height: 350px;
        .detail_content
          .title
            margin-bottom: 20px
            font-size: 16px
          .el-form
            .el-form-item
              .el-form-item__content
                .text
                  outline: none
                  border: none
                  .el-textarea__inner
                    min-height: 300px
                    border: none !important
                    outline: none !important
          .des_p
            width: 100%
            background: #fff
            border: none
            outline: none
            height: 400px
            line-height: 2
            font-size: 14px
            color: #333

    .footer {
      footer {
        height: 100px
        line-height: 100px
        background: #F7F7F7
        width: 100%
        .title {
          width: 100%
          height: 100px
          line-height: 100px
          color: #5c6170
          font-size: 28px
          margin: 0 auto
          background: url(../common/image/footer_logo.png) no-repeat center
        }
      }
    }

</style>


