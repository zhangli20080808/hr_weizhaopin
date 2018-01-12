<template>
  <div id="h5">
       <canvas ref="canvas" id="canvas" width="100%" height="auto">  
            <p>Your browser does not support the canvas element</p>  
        </canvas> 
      <div class="wrap">
        <!-- <img class="nextPage" @click="nextPageGo()" src="../components/images/nextButton.png" alt=""> -->
        <!-- <Swiper "id="swiper :interval="2000" :height="height100"  direction="vertical" :show-dots="false" v-model="swiper_index" @on-index-change="swiper_onIndexChange"> -->
        <swiper id="swiper" :options="swiperOption" :height="100" ref="mySwiper">
            <swiper-slide class="swiper-no-swiping">
                <div class="theme">{{ h5.theme }}</div>
                <img class="title" src="../components/images/bgh5.1_01.png" alt="">
                <img class="title1" src="../components/images/bgh5.1_03.png" alt="">
                <img class="ship" src="../components/images/ship.png" alt="">
                <img class="bird" src="../components/images/go.png"  alt="">
            </swiper-slide>
             <swiper-slide class="swiper-no-swiping">
                 <div class="companyIntro">
                    <img src="../components/images/intro.png" class="intro" alt="公司简介">
                        <div class="content">
                            <div v-html="h5.companyDescription"></div>
                            <img v-show="h5.companyImageUrl" :src="h5.companyImageUrl" class="introImg">
                        </div>　
                </div>
             </swiper-slide>
              <swiper-slide class="swiper-no-swiping">
                 <div class="companyIntro">
                    <img src="../components/images/position.png" class="intro" alt="在招职位">
                    <div class="content">
                        <!-- <scroll @scroll="scroll" :data ="h5.recruitingPositionList"
                            :listen-scroll="listenScroll" :probe-type="probeType" class="list" ref="list">
                          <ul>
                            <li v-for="item in h5.recruitingPositionList" :key="item.categoryId" @click="toDetial(item)">
                                <div class="positionName">{{item.positionName}}</div>
                                <div class="positionIntroduce">{{ item.workCity  | workCityFilter }} / {{ item.positionType | positionTypeFilter}} / {{item.positionSalaryLowest }}k - {{item.positionSalaryHighest}}k</div>
                                <img  class="details" src="../components/images/details.png" alt="详情">
                            </li>
                            </ul>
                        </scroll> -->
                        <scroller lock-x :scrollbar-x="false" :scrollbar-y="false" height="440px">
                             <ul>
                                <li v-for="item in h5.recruitingPositionList" :key="item.categoryId" @click="toDetial(item)">
                                    <div class="positionName">{{item.positionName}}</div>
                                    <div class="positionIntroduce">{{ item.workCity  | workCityFilter }} / {{ item.positionType | positionTypeFilter}} / {{item.positionSalaryLowest }}k - {{item.positionSalaryHighest}}k</div>
                                    <img  class="details" src="../components/images/details.png" alt="详情">
                                </li>
                             </ul>
                        </scroller>
                        <!-- <div>
                            <scroller>
                                <div>
                                    <ul>
                                        <li v-for="item in h5.recruitingPositionList" :key="item.categoryId" @click="toDetial(item)">
                                            <div class="positionName">{{item.positionName}}</div>
                                            <div class="positionIntroduce">{{ item.workCity  | workCityFilter }} / {{ item.positionType | positionTypeFilter}} / {{item.positionSalaryLowest }}k - {{item.positionSalaryHighest}}k</div>
                                            <img  class="details" src="../components/images/details.png" alt="详情">
                                        </li>
                                    </ul>
                                </div>
                              
                                
                            </scroller>
                        </div> -->
                        
                    </div>　
                </div>
             </swiper-slide>
              <!-- <swiper-item>
                 <div class="positionDetial">
                    <img src="../components/images/position.png" class="intro" alt="在招职位">
                    <div class="content">
                        <div class="header">
                            <div class="title">
                                <span>[急招]</span>
                                最多12个字最多12个字最多
                            </div>
                             <div class="headerContent">
                                <span><i class="iconfont">&#xe618;</i>杭州市</span>
                                <span><i class="iconfont">&#xe610;</i>8K-12K</span>
                                <span><i class="iconfont">&#xe631;</i> 全职</span>
                                <span>99人看过</span>
                            </div>
                            <div class="middle">
                                 <img src="../components/images/position.png" class="logo" alt="在招职位">
                                <div class="middleRight">
                                    <p>公司名称</p>
                                    <p>www.aiju.ecbao.cm</p>
                                </div>
                                <div class="rightUrl"></div>
                            </div>
                            <div class="detial">
                                <div class="detialTitle">职位描述</div>
                                <p>职位描述：</p>
                            </div>
                        </div>
                    </div>　
                    <div class="btn">
                        <img src="../components/images/btnLeft.png" alt="">
                        <img src="../components/images/btnRight.png" alt="">
                    </div>
                </div>
             </swiper-item> -->
             <swiper-slide class="swiper-no-swiping">
                 <div class="companyDetial">
                    <img src="../components/images/1.png" class="topLeft" alt="公司简介">
                    <div class="content">
                        <p>等你加我啊!</p>
                        <p>下面是我的联系方式</p>
                        <ul>
                            <li>
                                <img src="../components/images/2.png" alt="">
                                <p>{{ h5.companyAddress }}</p>
                            </li>
                            <li>
                                <img src="../components/images/3.png" alt="">
                                <p>{{ h5.activityPhone }}</p>
                            </li>
                            <li>
                                <img src="../components/images/4.png" alt="">
                                <p> {{ h5.activityEmail }}</p>
                            </li>
                        </ul>
                    </div>　
                    <img class="imgBtm" src="../components/images/boat.png" alt="">
                </div>
             </swiper-slide>
                <div class="swiper-button-next" slot="button-next">
                    <img class="nextPage" @click="nextPageGo()"   src="../components/images/nextButton.png" alt="">
                </div>
        </Swiper>
      </div>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import allcity from "../common/js/allcity";
import loading from "./base/loading/loading.vue";
import Scroll from './base/scroll2'
import footerNav from "../components/base/foot.vue";
import imgSrc2 from "../components/images/bgh5.2.png";
import imgSrc3 from "../components/images/bgh5.3.png";
import { Scroller } from 'vux'

const FPS = 30;
const SECONDS_BETWEEN_FRAMES = 1 / FPS;

var bg0 = new Image();

var x = 0;
const RATE = 10 * SECONDS_BETWEEN_FRAMES;
var WIDTH;//414
var HEIGHT;//376

var canvas;
var canvasBuffer;
var context;
var contextBuffer;

export default {
  data() {
    document.title = "团队";
    return {
        swiper_index: 0,
        imgSrc: imgSrc2,
        height100:0,
        timer: '',
        weActivityId: '',
        companyId: '',
        positionList: '',
        value3: '',
        data: {},
        h5: {
            theme: '',
            recruitingPositionList: [],
            titleDescription: '',
            companyAddress: '',
            activityEmail: '',
            companyDescription: '',
            companyImageUrl: '',
            companyImageId: '',
            activityPhone: ''
        },
        title: '',
        desc:'',
        link: '',
        imgUrl: '',
         swiperOption: {//以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
          // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，<br>　　　　　　　　假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        //   notNextTick: true,
          // swiper configs 所有的配置同swiper官方api配置
          direction : 'vertical',
          preventLinksPropagation : false,//拖动Swiper时阻止click事件。
        }
    };
  },
  methods: {
    toDetial(item){
        clearInterval(this.timer)
        this.$router.push({
            name: 'listDetail',
            query: {
                companyId: this.companyId,
                positionId:item.id,
            }
        })
    },
    swiper_onIndexChange(index){
        if(index == 0){
            this.imgSrc = imgSrc2
        }else{
            this.imgSrc = imgSrc3
        }
        clearInterval(this.timer);
        this.timer = setInterval(() =>{
            this.animation(), SECONDS_BETWEEN_FRAMES
        })
    },
     resize_canvas(){
        canvas = document.getElementById("canvas");
        if (canvas.width  < window.innerWidth)
        {
            WIDTH =window.innerWidth;
            canvas.width  = window.innerWidth;
        }

        if (canvas.height < window.innerHeight)
        {
            HEIGHT = window.innerHeight;
            canvas.height = window.innerHeight;
        }
    },
    init() {
        this.$nextTick(() => {  
            this.resize_canvas();
            canvas = document.getElementById("canvas");
            canvasBuffer = document.createElement("canvas");
            canvasBuffer.width = canvas.width;
            canvasBuffer.height = canvas.height;
            context = canvas.getContext("2d");
            contextBuffer = canvasBuffer.getContext("2d");
            context.clearRect(0, 0, canvas.width, canvas.height);
            contextBuffer.clearRect(0, 0, canvasBuffer.width, canvasBuffer.height);
            x = 0;
            clearInterval(this.timer)
            this.timer = setInterval(() =>{
                this.animation(), SECONDS_BETWEEN_FRAMES
        })
    })},
    animation() {
      x += RATE;
      bg0.src = this.imgSrc;
      context.clearRect(0, 0, canvas.width, canvas.height);
      contextBuffer.clearRect(0, 0, canvasBuffer.width, canvasBuffer.height);

      this.drawBuffer(bg0, 0, 0, 0.5);

      context.drawImage(canvasBuffer, 0, 0);
    },
    drawBuffer(image, dx, dy, factor) {
      var left = (x * factor) % image.width;
      if (left + WIDTH >= image.width) {
        var d0 = image.width - left;
        var d1 = WIDTH - d0;
        contextBuffer.drawImage(image, left, 0, d0, HEIGHT, dx, dy, d0, HEIGHT);
        contextBuffer.drawImage(image, 0, 0, d1, HEIGHT,dx + d0,dy, d1,HEIGHT);
      } else {
        contextBuffer.drawImage(image,left,0,WIDTH,HEIGHT,dx,dy,WIDTH,HEIGHT);
      }
    },
    scroll(pos) {
        console.log(pos)
      this.scrollY = pos.y
    },
    nextPageGo(){
        if(this.swiper.activeIndex < 3){
            this.swiper.slideTo(this.swiper.activeIndex+1, 1000, false)
            this.swiper_onIndexChange(this.swiper.activeIndex)
        }else{
            this.swiper_onIndexChange(0)
            this.swiper.slideTo(0, 200, false)
        }
    },
    getRoute (){
        this.companyId = this.$route.query.companyId;
        this.weActivityId = this.$route.query.weActivityId;
        this.getWeActivityInfo();
    },
      getWeActivityInfo(){//查询微活动具体信息
      var self=this;
      var method="weRecruitActivity/getWeActivityInfo",
          param=JSON.stringify({
            weActivityId:self.weActivityId,
            type: 2,
            companyId: self.companyId
          }),
          successd=function(res){
            var recruitActivity = res.data.data.recruitActivity;
            self.h5.recruitingPositionList=res.data.data.recruitingPositionList;
            self.h5.theme = recruitActivity.theme;
            self.h5.titleDescription = recruitActivity.titleDescription;
            self.h5.companyAddress = recruitActivity.companyAddress;
            self.h5.activityEmail = recruitActivity.activityEmail;
            self.h5.companyDescription = recruitActivity.companyDescription;
            self.h5.companyImageUrl = recruitActivity.companyImageUrl;
            self.h5.activityPhone = recruitActivity.activityPhone;
            self.getSignature();
          };
      self.$http(method,param,successd);
    },
      getSignature(){
      var self=this;
        self.$wechat.ready(function(res){
            console.log(self.h5.titleDescription )
            console.log('self.h5.titleDescription ')
          //分享给朋友
          self.$wechat.onMenuShareAppMessage({
            title:self.h5.theme,
            desc:self.h5.titleDescription,
            // link:'https://aijuhr.com/wx/dist/#/wx/interpolateDetail?companyId='+self.companyId+"&shareOpenId="+self.shareOpenId+"&positionId="+self.positionId+"&empId="+self.empId,//分享链接
            link: '',
            imgUrl:'https://aijuhr.com/images/yidong/h5.png',//分享图标
            type:'',
            dataUrl:'',
            success:function(){
              console.log('分享成功1');
            },
            cancel: function () {
              console.log('用户取消分享后执行的回调函数1');
            }
          });
          //分享朋友圈
          self.$wechat.onMenuShareTimeline({
            title:self.h5.theme,
            desc:self.h5.titleDescription,
            // link:'https://aijuhr.com/wx/dist/#/wx/interpolateDetail?companyId='+self.companyId+"&shareOpenId="+self.shareOpenId+"&positionId="+self.positionId+"&empId="+self.empId,//分享链接
            link: '',
            imgUrl:'https://aijuhr.com/images/yidong/h5.png',//分享图标
            type:'',
            dataUrl:'',
            success:function(){
              console.log('分享成功2');
            },
            cancel: function () {
              console.log('用户取消分享后执行的回调函数2');
            }
          })
      })
    },
  },
  computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }  
  },
  mounted() {
    this.init();
    this.getRoute();
    var self = this;
    self.height100=window.innerHeight;
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
  },
  components: {
    loading, swiper, swiperSlide, Scroller,
  },
  filters: {  
    workCityFilter: function (value) {  
      return value.split(',')[1] || value.split(',')[0];
    },  
    positionTypeFilter: (value)=> {
      var arr = [,'全职', '兼职', '实习']
      return arr[value]
    }
  } 
};
</script>
<style>
@import url(css/main.css);
</style>
<style lang="stylus" rel="stylesheet/stylus">
@import '../common/stylus/mixin.styl';


html, body, #app, #h5, .wrap {
    height: 100%;
}

@keyframes rock-boat {
	50%  { -webkit-transform: rotate(-5deg) translateY(-10px); }
}

@keyframes buttonNext {
        0% {
                transform: translateY(0px);
                opacity: 0
        }

        40% {
                transform: translateY(12px);
                opacity: 1
        }

        100% {
                transform: translateY(42);
                opacity: 0
        }
}

@keyframes earthmove {
        from {
                -webkit-transform: translateX(0) rotate(0);
                transform: translateX(0) rotate(0)
        }

        to {
                -webkit-transform: translateX(0) rotate(2turn);
                transform: translateX(0) rotate(2turn)
        }
}

@keyframes bird-fly {
        0% {
                transform: translateY(0px);
        }

        40% {
                transform: translateY(12px);
        }

        100% {
                transform: translateY(0);
        }
}
#canvas{
    position: fixed;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
}
.wrap {
    position:fixed;
    top :0;
    left :0;
    width : 100%;
    height :100%;
    .nextPage{
        position: absolute;
        width: .5rem;
        bottom: .2rem;
        z-index :4;
        transform: translateX(-50%);
        animation: bird-fly 2s ease-in-out infinite;
    }
    #swiper{
        width :100%;
        height: 100%;
        .swiper-button-next{
            position: absolute;
            bottom: .5rem;
            left: 50%;
            color: #fff;
            font-size: 20px;
            margin-left: -10px;
            background :none;
            top: inherit;
            -webkit-animation: buttonNext 3s ease-in-out infinite;
            img{
                // width: 1rem;
            }
        }
        .vux-swiper ,.swiper-wrapper{
            height: 100%;
            .vux-swiper-item, .swiper-slide{
                height: 100%;
                .theme{
                    color: #4BE0AB;
                    font-size: 20px;
                    text-align: center;
                    position: absolute;
                    top: 190px;
                    left: 50%;
                    width: 276px;
                    transform: translate(-50%);
                    word-break:break-all;
                    font-weight: 600;
                }
                .bird{
                    position: absolute;
                    right: 3%;
                    top: 42%;
                    width: 25%;
                    animation: bird-fly 2s ease-in-out infinite;
                }
                .ship{
                    position :absolute;
                    width : 70%;
                    bottom: 2rem;
                    left : 15%;
                    -webkit-animation: rock-boat 3s ease-in-out infinite;
                }
                >.title{
                    width: 70%;
                    left: 15%;
                    position: absolute;
                    top: 1.5rem;
                }
                >.title1{
                    width: 70%;
                    left: 15%;
                    position: absolute;
                    bottom: 1rem;
                }
                .companyIntro{
                    // background : url(../components/images/bgh5.3.png)no-repeat center top;
                    height : 100%;
                    display: flex;
                    flex-direction: column;
                    align-items : center;
                    .intro{
                        width : 25%;
                        margin-top: 0.4rem;
                        margin-bottom: 0.4rem;
                    }
                    .content{
                        width : 90%;
                        height : 100%;
                        background: #fff;
                        max-height: 70%;
                        border-radius: 10px;
                        border: 2px solid #23FFC9;
                        font-size: 14px;
                        line-height: 25px;
                        overflow: auto;
                        padding: 15px;
                        .introImg{
                            width: 100%;
                        }
                        ul{
                            font-size:14px;
                            position: relative;
                            li{
                                border-b-1px(rgba(229,229,229,0.5));
                                margin-bottom: .3rem;
                                padding-bottom: .2rem;
                                .positionName{
                                    color:rgba(31,45,61,1);
                                }
                                .positionIntroduce{
                                    color:rgba(102,102,102,1);
                                }
                                .details{
                                    width: 1.0rem;
                                    float: right;
                                    top: -0.7rem;
                                    position: relative;
                                }                               
                            }
                        }
                    }
                   
                }
                .companyDetial{
                    position: reletive;
                    font-size: 14px;
                    .topLeft{
                        width: 30%;
                        margin: 1rem 0 0 .5rem;
                    }
                    .content{
                        width : 65%;
                        height : 6rem;
                        background: #fff;
                        border-radius: 10px;
                        border: 2px solid #23FFC9;
                        font-size: 14px;
                        line-height: 25px;
                        overflow: auto;
                        padding: 15px; 
                        float: right;
                        margin-right: .4rem;
                        margin-top: -0.5rem;
                        ul{
                            margin-top: .2rem;
                            overflow: hidden;
                            overflow-scrolling : touch;
                            li{
                                margin-bottom: 0.4rem;
                                img{
                                    width: .6rem;
                                    position: relative;
                                    top: 0.2rem;
                                }
                                p{
                                    display: inline-block;
                                    max-width: 80%;
                                    vertical-align: middle;
                                }
                            }
                        }
                        
                    }
                    .imgBtm{
                        width: 55%;
                        position: absolute;
                        bottom: -2rem;
                        margin-left: -14%;
                        animation: earthmove 45s infinite;
                    }
                }
                .positionDetial{
                    text-align: center;
                    font-size:14px;
                    .intro{
                        margin: .5rem 0 .4rem;
                        width: 25%;
                    }
                    .content{
                        text-align: left;
                        width : 90%;
                        height : 8.8rem;
                        background: #fff;
                        max-height: 70%;
                        border-radius: 10px;
                        border: 2px solid #23FFC9;
                        font-size: 14px;
                        line-height: 25px;
                        overflow: auto;
                        padding: 15px;
                        margin-left: 5%;
                        .header{
                            .title{
                                color: #1F2D3D;
                                span{
                                    color: #FF8A66;
                                    
                                }
                            }
                            .headerContent{
                                span{
                                    margin-right: .3rem;
                                    display: inline-block;
                                    &:nth-child(4){
                                        color: #46BE8A;
                                        float: right;
                                        margin-right: 0;
                                    }
                                }
                            }
                            .middle{
                                position: relative;
                                padding: 0.23rem;
                                border-top: 1px solid #E5E5E5;
                                border-bottom: 1px solid #E5E5E5;
                                margin: .2rem 0;
                                .logo{
                                    width : 1.5rem;
                                    vertical-align : middle;
                                }
                                .middleRight{
                                    display: inline-block;
                                    margin-left: 0.25rem;
                                }
                                .rightUrl{
                                    width: 7px;
                                    height: 7px;
                                    border-top: 2px solid #BCBFC8;
                                    border-right: 2px solid #BCBFC8;
                                    transform: rotate(45deg);
                                    position: absolute;
                                    right: .25rem;
                                    bottom: .25rem;
                                    cursor: pointer;
                                }
                            }
                        }
                    }
                    .btn{
                        margin-top: .62rem;
                        img{
                            width: 30%;
                            float: left;
                            margin-left: .3rem;
                              &:nth-child(2){
                                float: right;
                                margin-right: .3rem; 
                              }
                        }
                    }
                }
            }
        }
    }
}
</style>
