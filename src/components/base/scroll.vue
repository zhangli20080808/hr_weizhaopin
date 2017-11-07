<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      //点击是否派发点击事件
      click: {
        type: Boolean,
        default: true
      },
      //我们的scroll要不要去监听滚动   推荐页面没有  歌手页面需要 拓展
      listenScroll: {
        type: Boolean,
        default: false
      },
      //列表的数据
      data: {
        type: Array,
        default: null
      },
      //是否派发滚动到底部的事件,用于上拉加载
      pullup: {
        type: Boolean,
        default: false
      },
      //是否派发列表滚动开始的事件
      beforeScroll: {
        type: Boolean,
        default: false
      },
      //是否派发顶部下拉事件
      pulldown: {
        type: Boolean,
        default: false
      },
      //是否派发顶部下拉事件，用于下拉刷新
    },
    mounted(){
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll(){
        //假设我们的dom没有的时候
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          //这里 外部传入的是什么样的  我们就怎样初始化
          probeType: this.probeType,
          click: this.click
        })
        if (this.listenScroll) {
          let me = this
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos)
          })
        }
        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
            }
          })
        }

        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }

        if (this.pulldown) {
          this.scroll.on('touchend', (pos) => {
            //下拉动作
            console.log(pos)
            if (pos.y > 50) {
              this.$emit('pulldown')
            }
          })
        }
      },
      //可以做一些better-scroll方法的代理
      enable(){
        this.scroll && this.scroll.enable()
      },
      disable(){
        this.scroll && this.scroll.disable()
      },
      refresh(){
        this.scroll && this.scroll.refresh()
      },
      //拓展滚动到具体莫个地方的方法scrollTo(x, y, time, easing) 滚动到某个位置，x,y 代表坐标，time 表示动画时间，easing 表示缓动函数
      //this.scroll指向better－scroll的实例 这个地方scrollTo是要接受一些参数的 我们要把这些参数传递到b里面的scrollTo里面
      scrollTo(){
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement(){
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    //这里我们去监听data的变化,// 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    watch: {
      data(a,b){
          console.log(a,b)
        setTimeout(() => {
          this.refresh()
        }, 20)

      }
    }
  }

</script>

<style scoped>

</style>
<!--
probeType:
1 会截流,只有在滚动结束的时候派发一个 scroll 事件。
2 在手指 move 的时候也会实时派发 scroll 事件，不会截流。
3 除了手指 move 的时候派发scroll事件，在 swipe（手指迅速滑动一小段距离）的情况下，列表会有一个长距离的滚动动画，这个滚动的动画过程中也会实时派发滚动事件
-->
