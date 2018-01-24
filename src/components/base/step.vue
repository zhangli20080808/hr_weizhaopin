<template>
  <div class="stepWrap" ref="stepWrap">
    <div class="step-item" v-for="(item, index) in stepName" :class="{'active': step > index}">
      <div class="item-tail"></div>
      <div class="step-item-icon">
        <img v-if="step > index" src="../../assets/img/right.png" alt="">
        <span v-if="step <= index">{{ index + 1 }}</span>
      </div>
      <div class="step-item-name">{{ item }}</div>
      <div class="step-item-line"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: {
      step: {
        type: Number,
        default: 1
      },
      stepName: {
        type: Array,
        default: () => ['推荐成功', '面试', '入职']
      }
    },
    created() {

    },
    mounted(){
      console.log(this.step);
    },
    methods: {},
  }
</script>
<style scoped lang="less">
  @import "../../common/stylus/boder.less";

  .stepWrap {
    width: 100%;
    padding: 30px 0px 10px;
    position: relative;
    .borderBottom(1px,#e5e5e5);
  }

  .step-item {
    width: 33%;
    text-align: center;
    display: inline-block;
  }

  .active .item-tail, .item-tail {
    background: #5aa2e7 none repeat scroll 0 0;
    height: 1px;
    position: relative;
    top: 14px;
    left: -50px;
    margin: 0 10px;
    width: 68%;
  }

  .item-tail {
    background: #ccc none repeat scroll 0 0;
  }

  .step-item:nth-child(1) .item-tail {
    background: none;
  }

  .step-item-icon {
    background: #C9C9C9 ;
    border: 2px solid #C9C9C9;
    color: #fff;
    width: 0.48rem;
    height: 0.48rem;
    margin: 0 auto;
    z-index: 22;
    border-radius: 50%;
    line-height: 0.44rem;
    z-index: 22;
  }

  .active .step-item-icon {
    background: #5aa2e7;
    border: none;
  }

  .step-item-icon img {
    display: inline-block;
    width: 0.25rem;
    height: 0.25rem;
    vertical-align: middle;
  }

  .step-item-name {
    color: #999;
    margin: 10px 0;
  }
  .active .step-item-name{
    color: #000000;
    font-size: 0.32rem;
  }

</style>

