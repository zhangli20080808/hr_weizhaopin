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
      click: {
        type: Boolean,
        default: true
      },
      //我们的scroll要不要去监听滚动   推荐页面没有  歌手页面需要 拓展
      listenScroll: {
        type: Boolean,
        default: false
      },
      data: {
        type: Object,
        default: null
      }
      //这个地方我们组件套的数据有可能输动态变化的 refresh我们的scroll保证我们计算的正确
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
    //这里我们去监听data的变化
    watch: {
      data(){
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
