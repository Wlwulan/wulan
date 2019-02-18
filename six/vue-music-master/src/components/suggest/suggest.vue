<template>
  <scroll class="suggest" :data="result" :pullup="pullup" @scrollToEnd="searchMore" ref="suggest">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="item in result" @click="clickResultSinger(item)">
        <!--歌曲或者歌手图标-->
        <div class="icon">
          <i :class="getIconClass(item)"></i>
        </div>

        <!--歌曲/歌手名-->
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading></loading>
    </ul>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import {getSearchResult} from 'api/search'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import Singer from 'common/js/singer'
  import {mapMutations, mapActions} from 'vuex'

  const TYPE_SINGER = 'singer'
  const perpage = 20

  export default {
    components: {
      Scroll,
      Loading
    },
    data () {
      return {
        // 搜索页码
        pageNum: 1,
        // 处理过的搜索结果
        result: [],
        // 是否滚动刷新
        pullup: true,
        // 标识是否还有更多数据, 用来判断是否继续进行数据请求
        hasMore: true
      }
    },
    props: {
      // 外部组件提供的检索词
      query: {
        type: String,
        default: ''
      },
      // 是否在搜索结果中显示歌手
      isSearchSinger: {
        type: Boolean,
        default: true
      }
    },

    watch: {
      // 监测query检索词的变化
      query () {
        // 请求检索结果数据
        this.search()
      }
    },
    methods: {
      // 同一个关键字第一次请求结果
      search () {
        this.page = 1
        this.hasMore = true
        this.$refs.suggest.scrollTo(0, 0)
        // 请求服务端检索数据
        getSearchResult(this.query, this.pageNum, this.isSearchSinger, perpage).then((res) => {
          if (res.code === ERR_OK) {
            this.result = this._normalizeData(res.data)
            // 检查
            this.checkMore(res.data)
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      _normalizeData (data) {
        let ret = []
        if (data.zhida && data.zhida.singerid) {
          // 有歌手结果
          ret.push({...data.zhida, ...{type: TYPE_SINGER}})
        }
        if (data.song) {
          ret = ret.concat(this._normalizeSongs(data.song.list))
        }
        return ret
      },
      getIconClass (item) {
        if (item.type === TYPE_SINGER) {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      },
      getDisplayName (item) {
        if (item.type === TYPE_SINGER) {
          return item.singername
        } else {
          return `${item.name}-${(item.singer)}`
        }
      },
      _normalizeSongs (list) {
        let ret = []
        list.forEach((musicData) => {
          ret.push(createSong(musicData))
        })
        return ret
      },
      /**
       * 上拉加载更多
       */
      searchMore () {
        if (!this.hasMore) {
          alert('没有更多数据了')
          return
        }
        // 有更多数据
        // 请求数据
        this.pageNum += 1
        getSearchResult(this.query, this.pageNum, this.isSearchSinger).then((res) => {
          if (res.code === ERR_OK) {
            this.result = this.result.concat(this._normalizeData(res.data))
            // 检查
            this.checkMore(res.data)
          }
        })
      },
      // 检查还有没有更多
      checkMore (data) {
        const song = data.song
        if (!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum) {
          this.hasMore = false
        }
      },

      // 点击歌手
      clickResultSinger (item) {
        if (item.type === TYPE_SINGER) {
          // 跳转路由
          this.$router.push({
            path: `/search/${item.singermid}`
          })
          const singer = new Singer({
            id: item.singermid,
            name: item.singername
          })
          this.setSinger(singer)
        } else {
          // 提交action
          this.clickSearchSong(item)
        }
      },

      ...mapMutations({
        setSinger: 'SET_SINGER'
      }),

      // 映射actions为一个字符串, 可以在其他方法中直接调用
      ...mapActions([
        'clickSearchSong'
      ])
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
