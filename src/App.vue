<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  .el-button--primary{
    background: #5AA2E7 ;
    border-color: #5AA2E7;
    color: #fff;
  }
  @media all and (max-width: 768px) {
    html {
      font-size: 100px;
    }
  }
</style>
