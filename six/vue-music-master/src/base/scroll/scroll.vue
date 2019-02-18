<template>
  <div ref="wrapper">
    <!--使用插槽-->
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    props: {
      // 监听滚动事件的类型
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: null
      },
      // 是否需要监听滚动
      listenScroll: {
        type: Boolean,
        default: false
      },
      // 是否需要上拉刷新
      pullup: {
        type: Boolean,
        default: false
      }
    },

    // 生命周期hook
    mounted () {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },

    methods: {
      _initScroll () {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click
        })

        if (this.listenScroll) {
          let self = this
          // 监听滚动事件
          this.scroll.on('scroll', (pos) => {
            self.$emit('scroll', pos)
          })
        }

        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= this.scroll.maxScrollY + 50) {
              // 滚动到底部了,  scroll组件是基础组件, 在合适的时机派发一个事件给外界
              this.$emit('scrollToEnd')
            }
          })
        }
      },

      // 方法代理
      enable () {
        // 启用better-scroll
        this.scroll && this.scroll.enable()
      },
      disable () {
        // 禁用better-scroll
        this.scroll && this.scroll.disable()
      },
      refresh () {
        this.scroll && this.scroll.refresh()
      },
      scrollTo () {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement () {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },

    watch: {
      // 如果data变化了, 刷新
      data () {
        setTimeout(() => {
          this.refresh()
        }, 20)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
