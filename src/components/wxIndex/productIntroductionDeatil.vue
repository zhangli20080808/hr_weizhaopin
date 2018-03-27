<template>
  <div id="productIntroductionDeatil">
      <tab :line-width="1" custom-bar-width="60px" active-color="#5AA2E7" bar-active-color="#5AA2E7">
        <tab-item v-for="item in productIntroductionList" @on-item-click="handler" :key="item.productImageId ">{{item.productName }}</tab-item>
        </tab>
      <!-- <h3>{{productIntroductionNow.productName}}</h3> -->
      <div class="hr"></div>
      <img :src="productIntroductionNow.productImageUrl" alt="暂无图片">
      <div class="hr"></div>
      <div class="textWrap">
        <b class="title">
          产品描述
      </b>
      <p>{{productIntroductionNow.productDescription}}</p>
      </div>
  </div>
</template>
<script>
import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'
export default {
  data(){
      return{
        productIntroductionList: this.$route.query.productIntroductionList,
        // productIntroductionNow: '',
        productImageUrl: '',
        productName: '',
        productDescription: '',
        index: this.$route.query.index,
      }
  },
  mounted () {
      console.log(this.$route.query)
      
      console.log(this.productIntroductionList)
      console.log('productIntroductionList')
  },
  computed: {
      productIntroductionNow(){
          return this.productIntroductionList[this.index];
      }
  },
  methods: {
      handler(e){
          this.index = e;
      }
  },
   components: {
    Tab,
    TabItem,
    Sticky,
    Divider,
    XButton,
    Swiper,
    SwiperItem
  },
}
</script>
<style scoped>
h3{
    background-color: #fff;
    font-size: 20px;
    font-weight: 400;
    color: #425062;
    line-height: 1.3;
    text-align: center;
    padding: 20px;
}
.hr{
    width: 100%;
    display: inline-block;
    height: .4rem;
    background: #F8F8FC;
}
img{
    width: 100%;
    height: 3.6rem;
    padding: 3%;
}
.title{
    background-color: #fff;
    height:24px; 
    font-size:17px;
    font-family:PingFangSC-Regular;
    color:rgba(0,0,0,1);
    line-height:24px;
}
.textWrap{
    background-color: #fff;
    width: 100%;
    padding: 20px 5%;
}
p{
    margin-top: 20px;
    font-size: 13px;
    color: #666;
}
</style>


