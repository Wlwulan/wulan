<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <!--使用插槽-->
      <!--引用这个插件时候在组件中的dom会显示在这里-->
      <slot></slot>
    </div>

    <div class="dots">
      <span class="dot" v-for="(item,index) in dots" :class="{active: currentPageIndex === index}"></span>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {addClass} from 'common/js/dom.js'
  export default {
    data () {
      return {
        // indicators
        dots: [],
        currentPageIndex: 0
      }
    },
    // 调用者给定的轮播器属性
    props: {
      // 是否支持轮播
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 2000
      }
    },

    // 使用betterScroll;
    mounted () {
      // 保证dom成功渲染, 20ms, 浏览器17ms一次
      setTimeout(() => {
        this._setSliderWidth()
        // 和children长度保持一致
        this._initDots()
        this._initSlider()

        if (this.autoPlay) {
          this._play()
        }
      }, 20)
      // 监听屏幕大小改变事件
      window.addEventListener('resize', () => {
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true)
        this.slider.refresh()
      })
    },

    // destroyed hook
    destroyed () {
//      console.log('slider destoryed')
      clearTimeout(this.timer)
    },

    methods: {
      /**
       *
       * @param isResize 因为this.children变了
       * @private
       */
      _setSliderWidth (isResize) {
        // 获取列表元素
        this.children = this.$refs.sliderGroup.children
        // 设置宽度(计算)
        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')
          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
//        console.log(this.$refs.sliderGroup.style.width)
      },

      // 设置indicator
      _initDots () {
        this.dots = new Array(this.children.length)
      },

      // 初始化slider
      _initSlider () {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
//          click: true,
          momentum: false,
          snap: true,
          snapLoop: this.loop,
          snapThreshold: 0.5,
          snapSpeed: 500
        })

        // 滚动完成触发的事件
        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX
          if (this.loop) {
            pageIndex = pageIndex - 1
          }
          this.currentPageIndex = pageIndex

          if (this.autoPlay) {
            clearTimeout(this.timer)
            this._play()
          }
        })
      },

      // 自动播放
      _play () {
        let pageIndex = this.currentPageIndex + 1
        if (this.loop) {
          pageIndex += 1
        }
        this.timer = setTimeout(() => {
          this.slider.goToPage(pageIndex, 0, 500)
        }, this.interval)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
