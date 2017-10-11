<template>
  <div id="back" class="visible-xs visible-sm">
    <i class="el-icon-arrow-left icon" @click="back" v-show="show"></i>
    <h2 class="title">爱聚hr</h2>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        show: false
      }
    },

    methods: {
      back() {
        this.$router.back()
      }
    },
    watch: {
      $route(to, from) {
//        console.log(to, from)
        if (to.path == '/list' ||
          to.path == '/list/' + this.$route.params.id ||
          to.path == '/apply' ) {
          this.show = true
        }else if(to.path == '/'){
          this.show = false
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  @media (max-width: 767px)
    #back
      height :0.92rem
      line-height :0.92rem
      text-align: center
      position: fixed
      top: 0
      z-index: 1000
      width: 100%
      background :#fff
      border:1px solid #E5E9F2

      .icon
        display: inline-block
        position :absolute
        left :10px
        top :13px
        color :#5AA2E7
        font-size :0.4rem

      .title
        width :100%
        height :0.92rem
        line-height :0.92rem
        font-family :"HiraginoSansGB-W6"
        color :#1F2D3D
        font-size :0.34rem



  @media (min-width: 768px) and (max-width: 920px)
    #back
      height :0.84rem
      line-height :0.84rem
      text-align: center
      position: fixed
      top: 0
      z-index: 1000
      width: 100%
      background :#fff
      border:1px solid #E5E9F2

      .icon
        display: inline-block
        position :absolute
        left :10px
        top :22px
        color :#5AA2E7
        font-size :0.4rem

      .title
        width :100%
        height :0.84rem
        line-height :0.84rem
        font-family :"HiraginoSansGB-W6"
        color :#1F2D3D
        font-size :30px


</style>
