<template>
  <div class="singer" ref="singer">
    <!--使用listview展示歌手列表-->
    <list-view :data="singerList" @clickSingerList="clickSingerList" ref="list"></list-view>
    <!--使用listview展示歌手列表结束-->

    <router-view></router-view>

  </div>
</template>

<script type="text/ecmascript-6">
  import {getSingerList} from 'api/singer'
  import {ERR_OK} from 'api/config'

  // 导入listview组件
  import ListView from 'base/listview/listview.vue'

  // 导入vuex的语法糖, 在methods属性最后, 通过拓展运算符的方式调用, 做一个对象映射, mutations的修改映射为一个方法名
  import {mapMutations} from 'vuex'

  import {playListMixin} from 'common/js/mixin'

  const HOT_NAME = '热门'
  const HOT_SINGER_LEN = 10

  export default {

    mixins: [
      playListMixin
    ],

    components: {
      ListView
    },

    data () {
      return {
        singerList: []
      }
    },
    created () {
      this._getSingerList()
    },

    methods: {

      clickSingerList (singer) {
        this.$router.push({
          path: `/singer/${singer.id}`
        })

        // 调用vuex
        this.setSinger(singer)
      },

      // 获取歌手列表
      _getSingerList () {
        getSingerList().then(res => {
          if (res.code === ERR_OK) {
            this.singerList = this._normalizeSinger(res.data.list)
          }
        })
      },

      /**
       * 序列化歌手数据
       * @param list
       * @private
       */
      _normalizeSinger (list) {
        // 遍历list, 热门数据和findex聚合数据
        // 创建对象
        let map = {
          // 热门数据
          hot: {
            title: HOT_NAME,
            items: []
          }
        }

        // 遍历list
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LEN) {
            // 将歌手列表的前十条数据添加到热门数据中
            map.hot.items.push({
              id: item.Fsinger_mid,
              name: item.Fsinger_name,
              avatar: `https://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`
            })
          }
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push({
            id: item.Fsinger_mid,
            name: item.Fsinger_name,
            avatar: `https://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`
          })
        })

//        return map
        // 为了得到有序列表, 需要对map进行排序处理
        let hot = []
        let ret = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        // 排序ret
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      },

      // 使用mutaions的语法糖
      ...mapMutations({
        setSinger: 'SET_SINGER'
      }),

      handlePlayList (playList) {
        const bottom = playList.length > 0 ? '60px' : ''
        this.$refs.singer.style.bottom = bottom
        this.$refs.list.refresh()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /*父元素的高度需要固定, 子元素的内容撑开, 才能滚动*/
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
