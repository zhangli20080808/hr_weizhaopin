<template>
  <div id="back">
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
          console.log(to, from)
          if (to.path == '/list' ||
            to.path == '/list/' + this.$route.params.id ||
            to.path == '/apply' ) {
            this.show = true
          }else if(to.path == '/'){
            console.log('sgdg')
            this.show = false
          }
        }
      }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  #back
    height :0.92rem
    line-height :0.92rem
    text-align: center;
    position: fixed;
    top: 0;
    z-index: 1000;
    width: 100%;
    background :#fff
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


</style>
