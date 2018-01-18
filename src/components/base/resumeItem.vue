<template>
      <div class="resume-item">
           <div class="avatar">
              <img src="../../common/image/default_avatar.png" alt="头像">
           </div>
           <div class="content">
              <div class="top-box">
                <div class="name">叶秋<img src="../../common/image/sex_male.png" alt="sex"></div>
                <div class="state">待率先</div>

              </div>
              <div class="middle-box">
                <p class="base-info"><span>26岁</span><span>大专</span><span>6年</span><span>杭州市西湖区</span></p>
                <p class="company">杭州爱聚科技有限公司</p>
              </div>
              <div class="bottom-box">
                <label class="label" for="">应聘</label>
                <span class="position-name">前端开发</span>
              </div>
           </div>
        </div>
</template>

<script>
export default {
 props:[], 
}
</script>

<style lang="less" scoped>
    .resume-item{
      display: flex;
      justify-content: space-between;
      padding:.24rem .24rem .3rem .3rem;
      margin-bottom:.25rem;
      background-color: #ffffff;
      .avatar{
        width:1.28rem;
        height:1.28rem;
        overflow: hidden;
        margin-right:.25rem;
        img{
          width:100%;
          height:100%;
          vertical-align: top;
        }
      }
      .content{
        flex:1;
        padding-top:.1rem;
        .top-box{
          display: flex;
          justify-content: space-between;
          .name{
            position: relative;
            padding-right:.4rem;
            font-size:.36rem;
            line-height: .5rem;
            img{
              position: absolute;
              right:0;
              bottom:0.08rem;
              width:.28rem;
              height:.28rem;
            }
          }
          .state{
            height: .45rem;
            line-height: .45rem;
            padding-left:4px;
            padding-right:4px;
            background-color: #E8F1F8;
            font-size:.26rem;
            color: #5AA2E7;
            border-radius: 3px;
          }
        }
        .middle-box{
          font-size:.26rem;
          color:#9B9B9B;
          line-height: 1.5;
          .base-info{
            span{
              margin-right:.2rem;
            }
          }
          .company{
            padding-left:.35rem;
            background: url("../../common/image/industry-lg.png") left center no-repeat;
            background-size: .3rem .25rem;
          }
        }
        .bottom-box{
          display: flex;
          align-items: center;
          color: #5AA2E7;
          font-size: .26rem;
          margin-top:.2rem;
          .label{
            height: .36rem;
            line-height: .36rem;
            border-radius: .18rem;
            padding:0 .1rem;
            margin-right: .12rem;
            border:1px solid #5AA2E7;
            color: #5AA2E7;
            font-weight: normal;
          }
        }
      }
    }
</style>


