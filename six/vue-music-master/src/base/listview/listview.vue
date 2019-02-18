<template>
  <scroll
    :data="data"
    class="listview"
    ref="listview"
    :listenScroll="listenScroll"
    @scroll="scroll"
    :probeType="probeType"
  >
    <!--歌手列表-->
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items" class="list-group-item" @click="clickItem(item)">
            <img v-lazy="item.avatar" class="avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <!--歌手列表结束-->

    <!--右侧字母索引区域-->
    <div
      class="list-shortcut"
      @touchstart="onShortcutTouchStart"
      @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li
          v-for="(item, index) in shortcutList"
          class="item"
          :data-index="index"
          :class="{'current': currentIndex === index}"
        >
          {{item}}
        </li>
      </ul>
    </div>
    <!--右侧字母索引区域结束-->

    <!--吸顶部分-->
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <h1 class="fixed-title">{{fixedTitle}}</h1>
    </div>
    <!--吸顶部分结束-->

    <!--loading-->
    <div class="loading-container" v-show="!data.length">
      <loading></loading>
    </div>
    <!--loading结束-->
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll.vue'

  import {getData} from 'common/js/dom.js'

  import Loading from 'base/loading/loading'

  // 定义高度
  const ANCHOR_HEIGHT = 18

  // title高度
  const TITLE_HEIGHT = 30

  export default {

    data () {
      return {
        // 左侧列表滚动的距离
        scrollY: -1,

        // 右侧高亮的索引
        currentIndex: 0,

        // 滚动差
        diff: -1
      }
    },

    components: {
      Scroll,
      Loading
    },

    props: {
      // 歌手列表
      data: {
        type: Array,
        default: []
      }
    },

    // 计算型属性
    computed: {
      /**
       * 获得右侧字母索引数据
       */
      shortcutList () {
        // map方法: 返回一个新数组, 数组中的元素调用方法后的值
        return this.data.map((group) => {
          return group.title.substring(0, 1)
        })
      },

      // 计算fixedTitle
      fixedTitle () {
        if (this.scrollY > 0) {
          return null
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    },

    // 生命周期hook, props和data的属性会被添加getter和setter, 系统观测变化, 动态渲染dom
    created () {
      // 不需要观测变化, 不需要渲染dom的数据可以写在这个方法中

      // 触摸对象
      this.touch = {}

      // 是否监听scroll滚动
      this.listenScroll = true

      // 每一组的高度数组
      this.listHeight = []

      // 解决滑动滚动的节流问题
      this.probeType = 3
    },

    watch: {
      // 当监测到data数据发生变化的时候进行调用
      data () {
        setTimeout(() => {
          // 计算listHeight
          this._calculateHeight()
        }, 20)
      },

      // 滚动的时候进行调用
      scrollY (newY) {
        const listHeight = this.listHeight

        // 滚动的情况

        // 滚动到页面的顶部
        if (newY > 0) {
          this.currentIndex = 0
          return
        }

        // 在页面中间部分
        for (let i = 0; i < listHeight.length - 1; i++) {
          let height1 = listHeight[i]
          let height2 = listHeight[i + 1]
          if (-newY >= height1 && -newY < height2) {
            this.currentIndex = i
            // 计算diff
            this.diff = height2 + newY
            return
          }
        }

        // 滚动到底部, -newY大于最后一个元素的上线
        this.currentIndex = listHeight.length - 2
      },

      diff (newVal) {
        let fixedTopVal = (newVal > 0 && newVal < TITLE_HEIGHT) ? (newVal - TITLE_HEIGHT) : 0
        // 进行节流, 因为频繁设置style比较消耗系统性能
        if (this.fixedTopVal === fixedTopVal) {
          return
        }
        this.fixedTopVal = fixedTopVal
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTopVal}px,0)`
        // translate3d可以开启gpu加速
      }
    },

    methods: {

      // 点击歌手列表然后触发这个方法
      clickItem (item) {
        // 发送通知
        // 基础组件, 不写业务逻辑, 将对象派发就可以了
        this.$emit('clickSingerList', item)
      },

      // 点击右侧快速索引的时候进行调用
      onShortcutTouchStart (e) {
        // 点击的时候记录手指的初始位置, 为滚动提供数据
        let firstTouch = e.touches[0]
        this.touch.y1 = firstTouch.pageY

        // 获取锚点索引
        let anchorIndex = getData(e.target, 'index')
        this.touch.anchorIndex = anchorIndex

        // 让scroll滚动到对应的位置
        this._scrollTo(anchorIndex)
      },

      /**
       * 滚动列表的时候调用
       * @param e
       */
      onShortcutTouchMove (e) {
        let currentTouch = e.touches[0]
        this.touch.y2 = currentTouch.pageY
        // 滚动了几个锚点
        let delta = Math.floor((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT)
        // TODO 为什么|0 就可以向下取整呢?
        let targetIndex = parseInt(this.touch.anchorIndex) + delta
        this._scrollTo(targetIndex)
      },

      /**
       * 监听到scroll发出scroll的时候进行调用
       * @param pos
       */
      scroll (pos) {
        this.scrollY = pos.y
      },

      /**
       * 让左侧的歌手列表滚动到指定的位置
       * @param index
       * @private
       */
      _scrollTo (index) {
        if (index === null || index < 0 || index > this.listHeight.length - 2) {
          return
        }
        this.currentIndex = parseInt(index)
        // TODO 视频中的写法
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
      },

      /**
       * 当listview的data发生变化的时候计算每一个组的高度
       * @private
       */
      _calculateHeight () {
        this.listHeight = []
        const list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },

      // 暴露scroll刷新的方法给外界调用
      refresh () {
        this.$refs.listview.refresh()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
