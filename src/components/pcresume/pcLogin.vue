<template>
  <div id="pcLogin" :style="{'min-height':wh+'px'}">
    <nav>
      <div class="nav_head">
        <div class="logo">
          <img src="../../common/image/new_logo.png" alt="">
        </div>
      </div>
    </nav>
    <router-view></router-view>
    
  </div>
</template>
<script>
export default {
  name:'pcLogin',
  data(){
    var wh=window.innerHeight;
    return{
      wh:wh,
    }
  }
}
</script>
<style scoped>
#pcLogin{background-color: #f7f7f7;}
nav{height: 82px;background-color: #fff;box-shadow: 0 1px 5px 0px #ddd;}
.nav_head{width: 1200px;margin:0 auto;height: 82px;line-height: 100px;vertical-align: middle;}

</style>
