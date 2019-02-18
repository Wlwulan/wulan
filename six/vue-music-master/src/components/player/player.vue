<template>
  <div class="player" v-show="playList.length">
    <!--全屏播放-->
    <transition name="normal"
                @enter="enter"
                @after-enter="afterEnter"
                @leave="leave"
                @after-leave="afterLeave"
    >
      <div class="normal-player" v-show="fullScreen">
        <!--背景图-->
        <div class="background">
          <img :src="currentSong.image" alt="" width="100%" height="100%">
        </div>
        <!--背景图结束-->

        <!--顶部-->
        <div class="top">
          <!--返回按钮-->
          <div class="back" @click="back">
            <i class="icon-back"></i>
          </div>
          <!--歌曲名-->
          <h1 class="title" v-html="currentSong.name"></h1>
          <!--歌手名-->
          <h1 class="subtitle" v-html="currentSong.singer"></h1>
        </div>
        <!--顶部结束-->

        <!--中部-->
        <div class="middle"
             @touchstart.prevent="middleTouchStart"
             @touchmove.prevent="middleTouchMove"
             @touchend.prevent="middleTouchEnd"
        >

          <!--歌曲cd-->
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdClass">
                <img :src="currentSong.image" alt="" class="image">
              </div>
            </div>

            <!--单行歌词-->
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">{{playingLyric}}</div>
            </div>
            <!--单行歌词结束-->
          </div>
          <!--歌曲cd结束-->

          <!--歌词-->
          <scroll class="middle-r" ref="lyricList" :data="currentLyric && currentLyric.lines">
            <div class="lyric-wrapper">
              <div v-if="currentLyric">
                <p ref="lyricLine"
                   class="text"
                   :class="{'current':currentLineNum === index}"
                   v-for="(line, index) in currentLyric.lines">{{line.txt}}</p>
              </div>
            </div>
          </scroll>
          <!--歌词结束-->

        </div>
        <!--中部结束-->

        <!--底部操作区-->
        <div class="bottom">

          <!--dot-->
          <div class="dot-wrapper">
            <span class="dot" :class="{'active': currentShow === 'cd'}"></span>
            <span class="dot" :class="{'active': currentShow === 'lyric'}"></span>
          </div>
          <!--dot结束-->

          <!--进度条-->
          <div class="progress-wrapper">

            <!--左侧已播放时长-->
            <span class="time time-l">{{format(currentTime)}}</span>

            <!--进度条-->
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent" @percentChange="percentChange"></progress-bar>
            </div>

            <!--右侧总时长-->
            <span class="time time-r">{{format(currentSong.duration)}}</span>
          </div>
          <!--进度条结束-->

          <!--上下首-->
          <div class="operators">

            <!--播放模式-->
            <div class="icon i-left">
              <i :class="iconMode" @click="changePlayMode"></i>
            </div>

            <!--上一首-->
            <div class="icon i-left" :class="disableClass">
              <i class="icon-prev" @click="prev"></i>
            </div>

            <!--暂停/开始-->
            <div class="icon i-center" :class="disableClass">
              <i :class="playIcon" @click="togglePlaying"></i>
            </div>

            <!--下一首-->
            <div class="icon i-right" :class="disableClass">
              <i class="icon-next" @click="next"></i>
            </div>

            <div class="icon i-right">
              <i class="icon icon-not-favorite"></i>
            </div>
          </div>
        </div>
        <!--底部操作区结束-->

      </div>
    </transition>
    <!--全屏播放-->


    <!--底部播放-->
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="fullScreenPlayer">

        <!--左侧旋转图片-->
        <div class="icon">
          <img :src="currentSong.image" alt="" width="40" height="40" :class="cdClass">
        </div>
        <!--左侧旋转图片结束-->

        <!--歌曲信息-->
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <!--歌曲信息结束-->

        <!--播放按钮-->
        <div class="control">
          <progress-circle :radius="32" :percent="percent">
            <i :class="miniIcon" @click.stop="togglePlaying" class="icon-mini"></i>
          </progress-circle>
        </div>

        <!--展开歌单-->
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <!--底部播放-->

    <!--使用HTML5的audio标签播放-->
    <audio :src="currentSong.url" ref="audio" @canplay="canPlay" @error="error" @timeupdate="updateTime"
           @ended="end"></audio>
  </div>

</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'

  import createKeyframeAnimation from 'create-keyframe-animation'

  import {prefixStyle} from 'common/js/dom'

  import ProgressBar from 'base/progress-bar/progress-bar'

  import ProgressCircle from 'base/progress-circle/progress-circle'

  import {playMode} from 'common/js/config'

  import {shuffle} from 'common/js/util'

  import Lyric from 'lyric-parser'

  import Scroll from 'base/scroll/scroll'

  const transform = prefixStyle('transform')
  const transitionDuration = prefixStyle('transitionDuration')
  const transitionTimingFunction = prefixStyle('transitionTimingFunction')

  export default {
    components: {
      ProgressBar,
      ProgressCircle,
      Scroll
    },

    data () {
      return {
        // 歌曲是否缓冲完可以播放
        songReady: false,

        // 当前播放时间
        currentTime: 0,

        // 当前歌词
        currentLyric: null,

        // 当前歌词的行数
        currentLineNum: 0,

        // 当前页
        currentShow: 'cd',

        // 当前单句歌词
        playingLyric: null
      }
    },

    created () {
      this.touch = {}
    },

    computed: {
      // 获取vuex store.state中的状态数据
      ...mapGetters([
        'fullScreen',
        'playList',
        'currentSong',
        'playing',
        'currentIndex',
        'mode',
        'sequenceList'
      ]),
      // 根据playing定义播放按钮图标
      playIcon () {
        return this.playing ? 'icon-pause' : 'icon-play'
      },
      miniIcon () {
        return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
      },
      // 根据playing定义cd是否旋转
      cdClass () {
        return this.playing ? 'play' : 'play pause'
      },
      // 不能点击的时候置灰
      disableClass () {
        return this.songReady ? '' : 'disable'
      },
      // 歌曲播放的百分比
      percent () {
        return this.currentTime / this.currentSong.duration
      },
      // 播放模式
      iconMode () {
        return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
      }
    },

    methods: {
      // 全屏播放器点击返回按钮
      back () {
        this.setFullScreen(false)
      },

      // 底部播放器点击显示全屏播放器
      fullScreenPlayer () {
        this.setFullScreen(true)
      },

      // 映射mutation
      ...mapMutations({
        setFullScreen: 'SET_FULLSCREEN',
        setPlayingState: 'SET_PLAYING_STATE',
        setCurrentIndex: 'SET_CURRENTINDEX',
        setPlayMode: 'SET_PLAYMODE',
        setPlayList: 'SET_PLAYLIST'
      }),

      // 点击暂停/开始按钮
      togglePlaying () {
        if (!this.songReady) {
          return
        }
        this.setPlayingState(!this.playing)
        // 暂停歌词播放
        if (this.currentLyric) {
          this.currentLyric.togglePlay()
        }
      },

      // 下一首
      next () {
        if (!this.songReady) {
          return
        }
        // 如果列表只有一首歌, index还是等于0, currentSong不会发生变化, id不变return,后面就不会播放了
        if (this.playList.length === 1) {
          this.loop()
        } else {
          let index = this.currentIndex + 1
          if (index === this.playList.length) {
            index = 0
          }
          this.setCurrentIndex(index)
          if (!this.playing) {
            this.togglePlaying()
          }
        }
        this.songReady = false
      },

      // 上一首
      prev () {
        if (!this.songReady) {
          return
        }
        if (this.playList.length === 1) {
          this.loop()
        } else {
          let index = this.currentIndex - 1
          if (index === -1) {
            index = this.playList.length - 1
          }
          this.setCurrentIndex(index)
          if (!this.playing) {
            this.togglePlaying()
          }
        }
        this.songReady = false
      },

      // 缓冲到可以播放
      canPlay () {
        this.songReady = true
      },

      error () {
        // 保证歌曲播放错误的时候也能正常切换歌曲
        this.songReady = true
      },

      // audio派发的时间
      updateTime (e) {
        // e.target.currentTime是一个可以读写的属性
        this.currentTime = e.target.currentTime
      },

      format (interval) {
        interval = interval | 0
        const minute = interval / 60 | 0
        const second = this._pad(interval % 60)
        return `${minute}:${second}`
      },

      _pad (num) {
        let len = num.toString().length
        if (len === 1) {
          return '0' + num
        }
        return num
      },

      // 监听到子组件的拖动事件调用
      percentChange (percent) {
        const currentTime = percent * this.currentSong.duration
        console.log(currentTime)
        // 需要操作audio的currenttime
        this.$refs.audio.currentTime = percent * this.currentSong.duration
        // 如果歌曲是暂停状态, 拖动进度条之后也会自动播放
        if (!this.playing) {
          this.togglePlaying()
        }
        if (this.currentLyric) {
          this.currentLyric.seek(currentTime * 1000)
        }
      },

      // 改变播放模式
      changePlayMode () {
        const mode = (this.mode + 1) % 3
        this.setPlayMode(mode)

        // 切换state中的playlist
        let list = null
        if (mode === playMode.random) {
          // 随机列表
          // 对sequenceList进行洗牌
          list = shuffle(this.sequenceList)
        } else {
          list = this.sequenceList
        }

        // 重置当前歌曲的索引为在新的列表中的索引
        this._resetCurrentIndex(list)

        // 注意这连个的顺序问题

        // 重置播放列表
        this.setPlayList(list)
      },

      // 重置歌曲在新列表中的索引
      _resetCurrentIndex (list) {
        let newIndex = list.findIndex((value) => {
          return value.id === this.currentSong.id
        })
        this.setCurrentIndex(newIndex)
      },

      // 当前歌曲播放完的时候调用
      end () {
        // 判断模式
        if (this.mode === playMode.loop) {
          this.loop()
        } else {
          this.next()
        }
      },

      // 单曲循环
      loop () {
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
        // 将歌词偏移到开始
        if (this.currentLyric) {
          this.currentLyric.seek(0)
        }
      },

      // 获取歌词
      getLyric () {
        this.currentSong.getLyric().then((lyric) => {
          // 解析
          this.currentLyric = new Lyric(lyric, this.handleLyric)
          if (this.playing) {
            this.currentLyric.play()
          }
        }).catch(() => {
          // 歌词加载失败, 做一些清理操作
          this.currentLyric = null
          this.playingLyric = ''
          this.currentLineNum = 0
        })
      },

      // 当歌词发生改变的时候进行调用
      handleLyric ({lineNum, txt}) {
        // 让当前的歌词高亮显示
        this.currentLineNum = lineNum
        if (this.currentLineNum > 5) {
          let el = this.$refs.lyricLine[this.currentLineNum - 5]
          this.$refs.lyricList.scrollToElement(el, 1000)
        } else {
          this.$refs.lyricList.scrollToElement(0, 0, 1000)
        }
        // 设置当前单句歌词
        this.playingLyric = txt
      },

      // middle滑动的时候调用
      middleTouchStart (e) {
        this.touch.init = true
        const touch = e.touches[0]
        this.touch.startX = touch.pageX
        this.touch.startY = touch.pageY
      },

      middleTouchMove (e) {
        if (!this.touch.init) {
          return
        }
        const touch = e.touches[0]
        const deltaX = touch.pageX - this.touch.startX // 左滑为负
        const deltaY = touch.pageY - this.touch.startY

        // 纵轴的偏移如果大于横轴的偏移, 横向不懂, 滚动歌词
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          // 纵向滚动
          return
        }
        // 歌词需要偏移的位置
        const left = this.currentShow === 'cd' ? 0 : -window.innerWidth
        // 歌词列表偏移的距离
        const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
        // 歌词列表偏移的距离占屏幕比
        this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
        // lyricList是封装的scroll Vue组件, 不能直接.style设置属性, 需要使用$el
        this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
        this.$refs.middleL.style.opacity = 1 - this.touch.percent
        this.$refs.lyricList.$el.style[transitionDuration] = 0
      },

      middleTouchEnd (e) {
        // 决定歌词列表的位置
        let offsetWidth
        let opacity
        if (this.currentShow === 'cd') {
          if (this.touch.percent > 0.1) {
            offsetWidth = -window.innerWidth
            this.currentShow = 'lyric'
            opacity = 0
          } else {
            offsetWidth = 0
            opacity = 1
          }
        } else {
          if (this.touch.percent < 0.9) {
            offsetWidth = 0
            this.currentShow = 'cd'
            opacity = 1
          } else {
            offsetWidth = -window.innerWidth
            opacity = 0
          }
        }
        this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
        this.$refs.lyricList.$el.style[transitionDuration] = `1s`
        this.$refs.lyricList.$el.style[transitionTimingFunction] = `ease`
        this.$refs.middleL.style.opacity = opacity
        this.$refs.middleL.style[transitionDuration] = `1s`
      },

      // 动画钩子函数--------------------------------------------------------------
      /**
       * enter钩子函数
       * @param el 操作的dom元素
       * @param done 回调函数, 执行的时候跳转到下一个动画hook函数
       */
      enter (el, done) {
        // 解构赋值
        const {x, y, scale} = this._getPosAndScale()

        let animation = {

          0: {
            transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
          },
          60: {
            transform: `translate3d(0,0,0) scale(1.1)`
          },
          100: {
            transform: `translate3d(0,0,0) scale(1)`
          }
        }

        // 注册动画
        createKeyframeAnimation.registerAnimation({
          name: 'move',
          animation,
          presets: {
            duration: 700,
            easing: 'linear'
          }
        })

        // 执行动画
        createKeyframeAnimation.runAnimation(this.$refs.cdWrapper, 'move', done)
      },

      afterEnter (el) {
        // unregister
        createKeyframeAnimation.unregisterAnimation('move')
        // 清空
        this.$refs.cdWrapper.style.animation = ''
      },

      leave (el, done) {
        this.$refs.cdWrapper.style.transition = 'all, 1s'
        const {x, y, scale} = this._getPosAndScale()
        this.$refs.cdWrapper.style[transform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`

        // 手动监听动画完成的时机
        this.$refs.cdWrapper.addEventListener('transitionend', done)
      },

      afterLeave (el) {
        this.$refs.cdWrapper.style.transition = ''
        this.$refs.cdWrapper.style[transform] = ''
      },

      /**
       * 获取动画参数
       * @returns {{x: number, y: number, scale: number}}
       * @private
       */
      _getPosAndScale () {
        // 小图宽度
        const targetWidth = 40

        // 小图位置
        const paddingLeft = 40
        const paddingBottom = 30

        // 大图位置
        const paddingTop = 80
        // 大图宽度
        const width = window.innerWidth * 0.8

        // 缩放比例
        const scale = targetWidth / width

        // 动画移动距离
        const x = -(window.innerWidth / 2 - paddingLeft)
        const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
        return {
          x,
          y,
          scale
        }
      }
    },

    watch: {
      currentSong (newSong, oldSong) {
        // 解决暂停状态下切换播放模式自动播放的bug
        if (newSong.id === oldSong.id) {
          return
        }
        if (this.currentLyric) {
          this.currentLyric.stop()
        }
        // 监听数据变化要保证dom已经渲染了
        this.$nextTick(() => {
          this.$refs.audio.play()
//          this.currentSong.getLyric()
          this.getLyric()
        })
      },

      playing (newValue) {
        this.$nextTick(() => {
          const audioDom = this.$refs.audio
          newValue ? audioDom.play() : audioDom.pause()
        })
      }
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .player
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: $color-background
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
        position: relative
        margin-bottom: 25px
        .back
          position absolute
          top: 0
          left: 6px
          z-index: 50
          .icon-back
            display: block
            padding: 9px
            font-size: $font-size-large-x
            color: $color-theme
            transform: rotate(-90deg)
        .title
          width: 70%
          margin: 0 auto
          line-height: 40px
          text-align: center
          no-wrap()
          font-size: $font-size-large
          color: $color-text
        .subtitle
          line-height: 20px
          text-align: center
          font-size: $font-size-medium
          color: $color-text
      .middle
        position: fixed
        width: 100%
        top: 80px
        bottom: 170px
        white-space: nowrap
        font-size: 0
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          padding-top: 80%
          .cd-wrapper
            position: absolute
            left: 10%
            top: 0
            width: 80%
            height: 100%
            .cd
              width: 100%
              height: 100%
              box-sizing: border-box
              border: 10px solid rgba(255, 255, 255, 0.1)
              border-radius: 50%
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state: paused
              .image
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%

          .playing-lyric-wrapper
            width: 80%
            margin: 30px auto 0 auto
            overflow: hidden
            text-align: center
            .playing-lyric
              height: 20px
              line-height: 20px
              font-size: $font-size-medium
              color: $color-text-l
        .middle-r
          display: inline-block
          vertical-align: top
          width: 100%
          height: 100%
          overflow: hidden
          .lyric-wrapper
            width: 80%
            margin: 0 auto
            overflow: hidden
            text-align: center
            .text
              line-height: 32px
              color: $color-text-l
              font-size: $font-size-medium
              &.current
                color: $color-text
      .bottom
        position: absolute
        bottom: 50px
        width: 100%
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            vertical-align: middle
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.active
              width: 20px
              border-radius: 5px
              background: $color-text-ll
        .progress-wrapper
          display: flex
          align-items: center
          width: 80%
          margin: 0px auto
          padding: 10px 0
          .time
            color: $color-text
            font-size: $font-size-small
            flex: 0 0 30px
            line-height: 30px
            width: 30px
            &.time-l
              text-align: left
            &.time-r
              text-align: right
          .progress-bar-wrapper
            flex: 1
        .operators
          display: flex
          align-items: center
          .icon
            flex: 1
            color: $color-theme
            &.disable
              color: $color-theme-d
            i
              font-size: 30px
          .i-left
            text-align: right
          .i-center
            padding: 0 20px
            text-align: center
            i
              font-size: 40px
          .i-right
            text-align: left
          .icon-favorite
            color: $color-sub-theme
      &.normal-enter-active, &.normal-leave-active
        transition: all 0.4s
        .top, .bottom
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter, &.normal-leave-to
        opacity: 0
        .top
          transform: translate3d(0, -100px, 0)
        .bottom
          transform: translate3d(0, 100px, 0)
    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      width: 100%
      height: 60px
      background: $color-highlight-background
      &.mini-enter-active, &.mini-leave-active
        transition: all 0.4s
      &.mini-enter, &.mini-leave-to
        opacity: 0
      .icon
        flex: 0 0 40px
        width: 40px
        padding: 0 10px 0 20px
        img
          border-radius: 50%
          &.play
            animation: rotate 10s linear infinite
          &.pause
            animation-play-state: paused
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          margin-bottom: 2px
          no-wrap()
          font-size: $font-size-medium
          color: $color-text
        .desc
          no-wrap()
          font-size: $font-size-small
          color: $color-text-d
      .control
        flex: 0 0 30px
        width: 30px
        padding: 0 10px
        .icon-play-mini, .icon-pause-mini, .icon-playlist
          font-size: 30px
          color: $color-theme-d
        .icon-mini
          font-size: 32px
          position: absolute
          left: 0
          top: 0

  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>
