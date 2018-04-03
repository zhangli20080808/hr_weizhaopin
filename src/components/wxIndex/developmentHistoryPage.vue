<template>
  <div class="mainWrap">
      <development-history :historyList="preCompanyMemorabilia"/>
  </div>
</template>
<script>
import developmentHistory from './developmentHistory.vue'

export default {

  data () {
    document.title="发展历程"
    return {
      preCompanyMemorabilia: [],
    }
  },
  mounted () {
    document.getElementsByClassName('mainWrap')[0].style.minHeight = window.innerHeight + 'px'
    this.preCompanyMemorabilia = JSON.parse(this.$route.query.preCompanyMemorabilia)
  },
  components: {
   developmentHistory
  }
}

</script>
<style scoped>
.mainWrap{
  background: #F8F8FC;
  height: 100%;
}
.mainWrap>div{
  padding: 20px;
  background: #fff;
}
body{
  color: #eee;
}
</style>


