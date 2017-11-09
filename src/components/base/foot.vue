<template>
  <div class="footer">
    <footer>
      <a href="https://aijuhr.com">
        <div class="title"></div>
      </a>
    </footer>
  </div>
</template>
<script>
  export default {
    prop: {
      data: {
        type: Object
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .footer
    footer
      height: 100px
      line-height: 100px
      background: #F7F7F7
      width: 100%
    .title
      width: 100%
      height: 100px
      line-height: 100px
      color: #999999
      font-size: 28px
      margin: 0 auto
      background: url(../../common/image/footer_logo.png) no-repeat center

  @media all and (max-width: 767px)

    .footer
      position: relative
      width: 100%
      bottom: 0
      footer
        height: 0.64rem
        background: #F7F7F7
        width: 100%
        line-height: 0.64rem

      .title
        height: 0.64rem !important
        line-height: 0.64rem !important
        text-align: center !important
        color: #999999 !important
        font-size: 0.14rem !important
        background: url(../../common/image/footLogo.png) no-repeat center !important
        background-size: 100% !important

</style>
