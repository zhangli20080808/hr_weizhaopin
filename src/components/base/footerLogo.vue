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
        display: flex;
        align-items: center;
        position: absolute;
        bottom:5px;
        left:135px;
        z-index:2;
        height: 48px;        
        text-align: center;
        a{ 
         height: 16px;
         .img_detail {
          width: 103px;
          height: 16px;
          background: url(../../common/image/footLogo2.jpg) no-repeat left top;
          background-size: 103px auto;
         }
        }   
      }
    //  .footer_icon {
    //     display: flex;
    //     align-items: center;
    //     position: absolute;
    //     bottom:5px;
    //     left:50%;
    //     z-index:2;
    //     transform: translate(-52px,-16px);
    //     height: 48px;        
    //     text-align: center;
    //     a{ 
    //      height: 16px;
    //      .img_detail {
    //       width: 103px;
    //       height: 16px;
    //       background: url(../../common/image/footLogo2.jpg) no-repeat left top;
    //       background-size: 103px auto;
    //      }
    //     }   
    //   }
     

</style>
