<template>
  <div id="preview">
    <div class="preview">  
      <dl class="information">
        <dt>
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515143038658&di=dcb6111be8b8b2aaa9974f7098bcfc79&imgtype=0&src=http%3A%2F%2Fwww.th7.cn%2Fd%2Ffile%2Fp%2F2014%2F06%2F25%2F63eed3e30fc9c896b7fc9d80e50e4993.jpg" alt="">
        </dt>
        <dd>
          <h2><span>姓名</span><em>女</em></h2>
          <p>介绍介绍介绍大劫案好大厦</p>
          <p class="phone">18812341234</p>
          <p class="email">18812341234@qq.com</p>
        </dd>
      </dl>
      <dl class="self-introduction">
        <dt>自我介绍</dt>
        <dd class="none">你还没有自我介绍,快去点击右上角编辑吧!</dd>
      </dl>
      <dl class="experience">
        <dt class="">工作经历</dt>
        <dd class="work_list">
          <div class="work_list_left"><img src="../../common/image/micresume/company.png" alt=""></div>
          <div class="work_list_right">
            <h3>公司名称</h3>
            <p>ios开发</p>
            <p>ios开发</p>
          </div>
          <div class="work_list_edit"></div>
        </dd>
        <dd class="add vux-1px-t">新增工作经历</dd>
      </dl>
      <dl class="experience">
        <dt class="">教育经历</dt>
        <dd class="work_list">
          <div class="work_list_left"><img src="../../common/image/micresume/edu.png" alt=""></div>
          <div class="work_list_right">
            <h3>公司名称</h3>
            <p>ios开发</p>
            <p>ios开发</p>
          </div>
          <div class="work_list_edit"></div>
          <div class="work_list_referral">这是一个教育经历的描述</div>
        </dd>
        <dd class="add vux-1px-t">新增教育经历</dd>
      </dl>
      <dl class="experience">
        <dt class="vux-1px-b">项目经历</dt>
        <dd class="add">新增工作经历</dd>
      </dl>
      <dl class="experience">
        <dt class="vux-1px-b">语言经历</dt>
        <dd class="add">新增语言经历</dd>
      </dl>
      <dl class="experience">
        <dt class="vux-1px-b">技能</dt>
        <dd class="add">新增技能</dd>
      </dl>
      <dl class="experience">
        <dt class="vux-1px-b">证书</dt>
        <dd class="add">新增证书</dd>
      </dl>
      <dl class="experience">
        <dt class="vux-1px-b">获得奖项</dt>
        <dd class="add">新增奖项</dd>
      </dl>
      <dl class="experience">
        <dt class="vux-1px-b">个人链接</dt>
        <dd class="add">新增奖项</dd>
      </dl>
      <dl class="will">
        <dt class="vux-1px-b">求职意愿<span>(仅HR可见)</span></dt>
      </dl>
    </div>
  </div>
</template>
<script>
export default {
  name:'resumePreview',
  data(){
    return{}
  },
  methods:{},
  mounted(){
    document.title="简历预览";
  },
  components:{}
}
</script>
<style scoped lang="less">
@import '~vux/src/styles/1px.less';
#preview{background-color: #f8f8fc;padding-bottom: 1rem;}
.information{padding:0.24rem 0.3rem;background-color: #fff;}
.information dt{width: 1.3rem;overflow: hidden;float: left;text-align: center;}
.information dt img{width: 1.28rem;height: 1.28rem;border-radius: 50%;}
.information dd{margin-left:1.56rem;}
.information {
  dd {
    h2{
      font-size: 0.36rem;
      span{
        font-weight: 500;
      }
      em{font-style: normal;font-size: .2rem;width: 0.4rem;height: 0.4rem;background-color: #FB5C7F;color: #fff;display: inline-block;text-align: center;border-radius: 50%;line-height: 0.4rem;margin-left:0.2rem;}
    }
    p{
      color:#9b9b9b;
      font-size: 0.26rem;
      margin-top:0.12rem;
    }
    .phone{
      padding-left:0.35rem;
    }
    .email{
      padding-left: 0.35rem;
    }
  }
}
.self-introduction{
  margin-top: 0.24rem;
  background-color: #fff;
  padding: 0.24rem .3rem;
  dt{
    font-size: .34rem;
    font-weight: 500;
    line-height: .48rem;
  }
  dd.none{
    height: .7rem;
    background-color: #f8f8f8;
    border:1px solid #eee;
    margin-top:.25rem;
    line-height: .7rem;
    color:#b2b2b2;
    text-align: center;
    border-radius: 4px;
  }
}
.experience{
  margin-top: 0.24rem;
  background-color: #fff;
  padding: 0.24rem .3rem;
  dt{
    font-size: .34rem;
    font-weight: 500;
    line-height: .48rem;
    padding-bottom:.2rem;
  }
  dd.add{
    color:#5aa2e7;
    padding-left:.4rem;
    margin-top:.2rem;
    padding-top:.2rem;
  }
}
.will{
  padding:.2rem .3rem;
  margin-top:.2rem;
  background-color: #fff;
  dt{
    font-size: .34rem;
    font-weight: 500;
    line-height: .48rem;
    padding-bottom:.2rem;
  }
}
.work_list{padding: .2rem 0 0;position: relative;}
.work_list_left{width:1.2rem;height: 1.2rem;overflow: hidden;padding: .3rem;border:1px solid #e5e5e5;border-radius: 50%;float: left;}
.work_list_left img{width:.6rem;}
.work_list_right{margin-left:1.4rem;}
.work_list_right h3{font-size: .34rem;line-height: .5rem;}
.work_list_right p{font-size: .26rem;color: #999;line-height: .4rem;}
.work_list_edit{width:.3rem;height:.3rem;background: url(../../common/image/micresume/edit.png) no-repeat center center;background-size: 100% 100%;position: absolute;right:0;top:.1rem;}
.work_list_referral{}
</style>
