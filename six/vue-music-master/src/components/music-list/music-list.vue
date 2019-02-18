<template>
  <div class="music-list">
    <!--返回按钮-->
    <div class="back">
      <i class="icon-back" @click="back"></i>
    </div>
    <!--返回按钮结束-->

    <!--歌手名-->
    <h1 class="title" v-html="title"></h1>
    <!--歌手名结束-->

    <!--歌手头图-->
    <div class="bg-image" :style="bgStyle" ref="bgImage">

      <!--随机播放当前歌单的按钮-->
      <div class="play-wrapper">
        <div class="play" v-show="songs.length>0" ref="playBtn" @click="randomPlayCurrentList">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>

      <div class="filter" ref="filter"></div>
    </div>
    <!--歌手头图结束-->

    <!--带着歌曲列表上滑的层-->
    <div class="bg-layer" ref="layer"></div>

    <!--使用scroll包装歌曲列表组件-->
    <scroll :data="songs" class="list" ref="list" :probe-type="probeType" :listen-scroll="listenScroll" @scroll="scroll">
      <div class="song-list-wrapper">
        <song-list :songs="songs" @selectItem="selectItem" :isRank="isRank"></song-list>
      </div>

      <!--loading-->
      <div class="loading-container" v-show="!songs.length">
        <loading></loading>
      </div>
      <!--loading结束-->
    </scroll>
    <!--使用scroll包装歌曲列表组件结束-->
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import SongList from 'base/song-list/song-list'

  // loading
  import Loading from 'base/loading/loading'

  // 使用vender prefix前缀函数
  import {prefixStyle} from 'common/js/dom.js'

  // 使用mapActions
  import {mapActions} from 'vuex'

  import {playListMixin} from 'common/js/mixin'

  const transform = prefixStyle('transform')
  const backdrop = prefixStyle('backdrop-filter')

  // 预留title的位置高度
  const RESERVED_HEIGHT = 40

  export default {
    mixins: [
      playListMixin
      // 组件和mixin方法进行merge, 组件中的方法会覆盖掉mixin中的方法
    ],
    components: {
      Scroll,
      SongList,
      Loading
    },
    props: {
      bgImage: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: ''
      },
      isRank: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      bgStyle () {
        return `background-image:url(${this.bgImage})`
      }
    },
    created () {
      this.probeType = 3
      this.listenScroll = true
    },
    mounted () {
      // 缓存图片高度
      this.imageHeight = this.$refs.bgImage.clientHeight
      this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT
      this.$refs.list.$el.style.top = this.$refs.bgImage.clientHeight + 'px'
    },
    methods: {
      selectItem (song, index) {
        // '调用'actions方法
        this.selectPlay({
          // 子组件不关心外部怎样, 尽可能多的传递数据给外界
          list: this.songs,
          index: index
        })
      },

      /**
       * 代理actions,通过vuex的语法糖, 将actions封装为类似可以调用的方法
       */
      ...mapActions([
        'selectPlay',
        'randomPlay'
      ]),

      // 滚动的时候调用
      scroll (pos) {
        this.scrollY = pos.y
      },

      // 返回上一页
      back () {
        this.$router.back()
      },

      // 随机播放当前歌单
      randomPlayCurrentList () {
        this.randomPlay({
          list: this.songs
        })
      },

      // mixin中的方法
      handlePlayList (playList) {
        const bottom = playList.length > 0 ? '60px' : ''
        this.$refs.list.$el.style.bottom = bottom
        this.$refs.list.refresh()
      }
    },
    data () {
      return {
        scrollY: 0
      }
    },
    watch: {
      // 滚动的时候调用
      scrollY (newY) {
        let zIndex = 0

        // 控制歌手头图的大小
        let scale = 1

        // 模糊度
        let blur = 0

        // layer层的滚动距离限制
        let maxScrollY = Math.max(this.minTranslateY, newY)

        // 滚动占图片高度的比值
        const percent = Math.abs(newY / this.imageHeight)

        if (newY > 0) {
          scale = 1 + percent
          zIndex = 10
        } else {
          blur = Math.min(20 * percent, 20)
        }
        this.$refs.layer.style[transform] = `translate3d(0,${maxScrollY}px,0)`
        this.$refs.filter.style[backdrop] = `blur(${blur}px)`
        this.$refs.bgImage.style[transform] = `scale(${scale})`

        if (newY < this.minTranslateY) {
          // 图片遮盖滚动菜单
          this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
          this.$refs.bgImage.style.paddingTop = 0
          zIndex = 10
          this.$refs.playBtn.style.display = 'none'
        } else {
          this.$refs.bgImage.style.height = 0
          this.$refs.bgImage.style.paddingTop = '70%'
          this.$refs.playBtn.style.display = ''
        }
        this.$refs.bgImage.style.zIndex = zIndex
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
