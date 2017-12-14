<template>
  <div id="h5">
       <canvas ref="canvas" id="canvas" width="100%" height="auto">  
            <p>Your browser does not support the canvas element</p>  
        </canvas> 
      <div class="wrap">
           <swiper :options="swiperOption" ref="mySwiper" id="swiper">
                <!-- slides -->
                <swiper-slide>
                    <img class="title" src="../components/images/bgh5.1.png" alt="">
                    <img class="ship" src="../components/images/ship.png" alt="">
                </swiper-slide>
                 <swiper-slide>
                    <div class="companyIntro">
                        <img src="../components/images/intro.png" class="intro" alt="公司简介">
                        <div class="content">
                            <div>
                                电商宝（杭州爱聚科技有限公司），是一家专门从事电商企业数据产品开发的科技创新公司，创始团队组建于2012年。我们诞生在信息社会从IT走向DT（Data technology），从电商单一渠道、粗放经营走向电商全渠道精细化经营的背景下，着眼数据技术，立足电商经营数据，立志成为一家世界级中小微企业软件及数据服务公司。
　　公司研发的电商宝产品目前基于淘宝、天猫、京东、唯品会、当当、1688、速卖通、亚马逊等30余个国内外电商平台，主打产品涵盖功能模块：财务管理、订单管理、商品管理、进销存管理、OA企业管理、HRM管理等，日处理近一个亿的订单数据，经营数据处理及管理能力业界领先。</div>
                        　 <img src="../components/images/go.png" class="introImg" alt="公司简介">
                        </div>　
                    </div>
                </swiper-slide>
                 <swiper-slide>
                    <img class="title" src="../components/images/bgh5.1.png" alt="">
                    <img class="ship" src="../components/images/ship.png" alt="">
                </swiper-slide>
                
                <!-- Optional controls -->
                <!-- <div class="swiper-pagination" slot="pagination"></div> -->
                <!--<div class="swiper-button-prev" slot="button-prev"></div>-->
                <div class="swiper-button-next" slot="button-next">
                    <img src="../components/images/go.png" alt="">
                </div>
            </swiper>
      </div>
  </div>
</template>


<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import allcity from "../common/js/allcity";
import loading from "./base/loading/loading.vue";
import scroll from "../components/base/scroll.vue";
import footerNav from "../components/base/foot.vue";
import imgSrc2 from "../components/images/bgh5.2.png";
import imgSrc3 from "../components/images/bgh5.3.png";


import {
  XDialog,
  Scroller,
  Divider,
  Spinner,
  XButton,
  Group,
  Cell,
  LoadMore,
  TransferDomDirective as TransferDom
} from "vux";

const FPS = 30;
const SECONDS_BETWEEN_FRAMES = 1 / FPS;

var bg0 = new Image();

var x = 0;
const RATE = 50 * SECONDS_BETWEEN_FRAMES;
var WIDTH = 414;
var HEIGHT = 736;

var canvas;
var canvasBuffer;
var context;
var contextBuffer;

export default {
  data() {
    document.title = "团队";
    return {
        imgSrc: imgSrc2,
       swiperOption: {//以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
          // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，<br>　　　　　　　　假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
          // notNextTick: true,
          // swiper configs 所有的配置同swiper官方api配置
          autoplay: false,
          direction: 'vertical',
          grabCursor: false,
          setWrapperSize: true,///在Wrapper上添加等于slides相加的宽高
        //   autoHeight: true,
        //   pagination: '.swiper-pagination',
        //   paginationClickable: false,
          prevButton: '.swiper-button-prev',//上一张
          nextButton: '.swiper-button-next',//下一张
          mousewheelControl: false,
          // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
          debugger: true,
          loop: false,
     
        },
    };
  },
  methods: {
      alla(){
alert(1)
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

            setInterval(() =>{
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
        contextBuffer.drawImage(
          image,
          left,
          0,
          WIDTH,
          HEIGHT,
          dx,
          dy,
          WIDTH,
          HEIGHT
        );
      }
    }
  },
  directives: {
    TransferDom
  },

  mounted() {
    this.init();
    var self = this;
    
  },
  components: {
    loading,
    Scroller,
    Divider,
    Spinner,
    XButton,
    Group,
    Cell,
    LoadMore,
    scroll,
    XDialog,
    footerNav
  },
  watch: {

  },
  computed: {
      swiper(){
          return this.$refs.mySwiper.swiper
      }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../common/stylus/mixin.styl';


html, body, #app, #h5, .wrap {
    height: 100%;
}

@-webkit-keyframes rock-boat {
	50%  { -webkit-transform: rotate(-5deg) translateY(-10px); }
}

@-webkit-keyframes buttonNext {
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

.wrap {
    position:fixed;
    top :0;
    left :0;
    width : 100%;
    height :100%;
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
            -webkit-animation: buttonNext 3s ease-in-out infinite;
            img{
                width: 1rem;
            }
        }
        .swiper-wrapper{
            height: 100%;
            .swiper-slide{
                height: 100%;
                .ship{
                    position :relative;
                    width : 70%;
                    bottom: 5rem;
                    left : 15%;
                    -webkit-animation: rock-boat 3s ease-in-out infinite;
                }
                >.title{
                    width: 70%;
                    left: 15%;
                    position: relative;
                    top: 1.5rem;
                }
                .companyIntro{
                    background : url(../components/images/bgh5.3.png)no-repeat center top;
                    height : 100%;
                    display: flex;
                    flex-direction: column;
                    align-items : center;
                    .intro{
                        width : 25%;
                        height : 0.4rem;
                        margin-top: 0.4rem;
                        margin-bottom: 0.4rem;
                    }
                    .content{
                        width : 90%;
                        height : auto;
                        max-height: 70%;
                        border-radius: 10px;
                        border: 2px solid #23FFC9;
                        font-size: 14px;
                        line-height: 25px;
                    }
                }
            }
        }
    }
}
</style>
