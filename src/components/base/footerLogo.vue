<template>
    <div class="footer_icon">
        <a href="https://aijuhr.com">
            <div class="img_detail"></div>
        </a>
    </div>
</template>
<script>
  export default {
    props: []
  }
</script>
<style lang="less" scoped>
     .footer_icon {
        // position: absolute;
        // bottom:15px;
        // left:135px;
        // z-index:2;
        height: 0.89rem;
        line-height: 0.89rem;
        text-align: center;
        .img_detail {
          display: inline-block;
          vertical-align: middle;
          width: 103px;
          height: 16px;
          background: url(../../common/image/footLogo2.jpg) no-repeat center;
          background-size: 103px auto;
        }
      }
</style>
