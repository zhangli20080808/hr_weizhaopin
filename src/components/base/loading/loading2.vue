<template>
  <div class="mask">
    <div class="mask-content">
      <div class="spinner">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
  }
</script>
<style scoped rel="stylesheet/stylus">
  .spinner {
    margin: 100px auto;
    width: 50px;
    height: 60px;
    text-align: center;
    font-size: 10px;
  }

  .spinner > div {
    background-color: #5aa2e7;
    height: 100%;
    width: 6px;
    display: inline-block;

    -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
    animation: stretchdelay 1.2s infinite ease-in-out;
  }

  .spinner .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }

  .spinner .rect3 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }

  .spinner .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }

  .spinner .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }

  @-webkit-keyframes stretchdelay {
    0%, 40%, 100% { -webkit-transform: scaleY(0.4) }
    20% { -webkit-transform: scaleY(1.0) }
  }

  @keyframes stretchdelay {
    0%, 40%, 100% {
      transform: scaleY(0.4);
      -webkit-transform: scaleY(0.4);
    }  20% {
         transform: scaleY(1.0);
         -webkit-transform: scaleY(1.0);
       }
  }


  .mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 2000;
  }
  .mask .mask-content{
    position: absolute;
    width: 300px;
    height: 300px;
    top: 50%;
    left: 50%;
    margin-top: -150px;
    margin-left: -150px;
  }

</style>
