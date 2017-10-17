<template>
  <div id="app">
    <nav-title></nav-title>
      <router-view></router-view>
  </div>
</template>

<script>
  import navTitle from './components/base/back'

  export default {
    name: 'app',
    data() {
      return {}
    },
    components: {
      navTitle
    }
  }
</script>

<style>
  [v-cloak]{
    display:none;
  }
  .el-button--primary {
    background: #5AA2E7;
    border-color: #5AA2E7;
    color: #fff;
  }

  @media all and (max-width: 768px) {
    html {
      font-size: 100px;
    }

    #app {
      background: #fff;
    }
  }
</style>
