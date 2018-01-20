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
        height: 0.89rem;
        line-height: 0.89rem;
        text-align: center;
        .img_detail {
          display: inline-block;
          vertical-align: middle;
          width: 106px;
          height: 15px;
          background: url(../../common/image/footLogo2.jpg) no-repeat center;
          background-size: 103px auto;
        }
      }
</style>
