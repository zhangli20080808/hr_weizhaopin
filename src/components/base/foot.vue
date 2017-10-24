<template>
  <div class="footer">
    <footer class="hidden-sm hidden-xs ">
      <div class="title"></div>
    </footer>
  </div>
</template>
<script>
  export default {}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .footer
    footer
      height: 100px
      line-height: 100px
      background: #F7F7F7
      width: 100%
    .title
      width :100%
      height: 100px
      line-height: 100px
      color: #999999
      font-size: 28px
      margin :0 auto
      background :url(../../common/image/footer_logo.png)no-repeat center

  @media all and (max-width: 767px)

    .footer
      position :absolute
      width :100%
      bottom: -0.46rem
      left :0
      footer
        height: 1rem
        background: #F7F7F7
        width: 100%
        line-height: 1px

      .title
        height: 1rem
        line-height: 1rem
        text-align: center
        color: #999999
        font-size: 0.14rem

</style>
