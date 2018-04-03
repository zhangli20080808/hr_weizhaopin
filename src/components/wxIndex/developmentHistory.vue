<template>
  <div>
    <div class="slide">
      <div  v-if="index < maxLenth" class="list-item" :class="{'active': preCompanyMemorabiliaImg}" v-for="(item, index) in historyList" :key="item.data">
        <div class="inner">
          <div class="g-flex">
            <div class="gamma-left">
              <img v-show="!preCompanyMemorabiliaImg" class="link-image" :src="item.imageUrl">
              <span v-show="preCompanyMemorabiliaImg"  :class="{'active': index ==0 }" class="preCompanyMemorabiliaNum"></span>
            </div>
            <div class="g-column gamma-right">
              <div class="gamma-right-height">
                <span>{{filterTime(item.date)}}</span>
                <div class="gamma-description">
                  {{item.description}}
                </div>
                <div class="gamma-text-cover"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    historyList: {
      type: Array,
      default: []
    },
    maxLenth: {
      type: Number,
      default: 99999
    }
  },
  data() {
    return {};
  },
  methods: {
    filterTime(item) {
      if (item) {
        return item.substr(0, 10);
      } else {
        return "";
      }
    }
  },
  computed: {
    preCompanyMemorabiliaImg() {
      var bol = this.historyList.some(function(item) {
        console.log(item.imageUrl);
        return item.imageUrl == "" || item.imageUrl == null;
      });
      console.log(bol);
      return bol;
    }
  }
};
</script>
<style scoped>
.slide {
  z-index: 1;
  background-color: #fff;
  position: relative;
  width: 100%;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
  -webkit-animation-duration: 0.5s;
  animation-duration: 0.5s;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  padding-left: 10px;
}
.list-item.active {
  border-left: 1px solid #d8d8d8;
}
.slide .list-item:nth-last-child(1){
     border: none;
}
.slide .list-item {
  padding-bottom: 0.6rem;
}
.inner {
  font-size: 14px;
}
.slide .list-item .inner .g-flex {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  position: relative;
}
.link-image {
  position: relative;
  display: inline-block;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  border: 0;
  width: 2.52rem;
  height: 1.56rem;
  border-radius: 2px;
  background: #ccc;
}
.preCompanyMemorabiliaNum {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: inline-block;
  background: #d8d8d8;
  position: absolute;
  left: -8px;
}
.preCompanyMemorabiliaNum.active {
  background: #ff9e2f;
}
.g-flex .gamma-right {
  overflow: hidden;
  -webkit-box-flex: 2;
  -ms-flex-positive: 2;
  flex-grow: 2;
  padding-left: 14px;
}
.list-item .inner .g-flex .gamma-right .gamma-right-height {
  max-height: 1.56rem;
  overflow: hidden;
  position: relative;
}
.list-item .inner .g-flex .gamma-right .gamma-right-height span {
  margin-bottom: 2px;
  display: inline-block;
}
.list-item .inner .g-flex .gamma-right .gamma-right-height .gamma-description {
  color: #999;
  line-height: 0.4rem;
  z-index: 0;
}
</style>


