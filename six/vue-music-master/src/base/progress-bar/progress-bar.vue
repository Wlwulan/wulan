<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn" @touchstart.prevent="progressTouchStart" @touchmove.prevent="progressTouchMove" @touchend="progressTouchEnd">
        <!--阻止浏览器的默认行为-->
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const progressBtnWidth = 16
  import {prefixStyle} from 'common/js/dom'
  const transfrom = prefixStyle('transform')
  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },

    watch: {
      // 监听父组件传递的percent
      percent (newValue) {
        if (newValue >= 0 && !this.touch.initialted) {
          const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
          const offsetWidth = newValue * barWidth
          this._offset(offsetWidth)
        }
      }
    },

    created () {
      // 不同的函数共享数据使用
      this.touch = {}
    },

    methods: {
      // 开始拖动滚动条
      progressTouchStart (e) {
        // 是否在拖动状态
        this.touch.initialted = true
        this.touch.startX = e.touches[0].pageX
        this.touch.left = this.$refs.progress.clientWidth
      },

      // 按住移动
      progressTouchMove (e) {
        if (!this.touch.initialted) {
          return
        }
        const deltaX = e.touches[0].pageX - this.touch.startX
        const offsetWidth = Math.min(Math.max(0, this.touch.left + deltaX), this.$refs.progressBar.clientWidth - progressBtnWidth) // 防止拖动过长
        this._offset(offsetWidth)
      },

      // 手指抬起
      progressTouchEnd (e) {
        this.touch.initialted = false
        this._triggerPercent()
      },

      progressClick (e) {
        // e.offsetX为点击的位置到dom左边的距离
        if (e.target.getAttribute('class') === 'progress-btn') {
          return
        }

        this._offset(e.offsetX)
        this._triggerPercent()
      },

      _triggerPercent () {
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        const percent = this.$refs.progress.clientWidth / barWidth
        this.$emit('percentChange', percent)
      },

      /**
       * 设置进度条和btn
       * @param offsetWidth
       * @private
       */
      _offset (offsetWidth) {
        this.$refs.progress.style.width = `${offsetWidth}px`
        this.$refs.progressBtn.style[transfrom] = `translate3d(${offsetWidth}px,0,0)`
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>
