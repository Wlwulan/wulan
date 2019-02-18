<template>
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImage" :songs="songList" :isRank="isRank"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getTopListSongs} from 'api/rank'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'

  export default {
    data () {
      return {
        songList: [],
        isRank: true
      }
    },
    components: {
      MusicList
    },
    created () {
      this._getTopListSongs()
    },
    methods: {
      _getTopListSongs () {
        console.log(this.topList.length)
        if (!this.topList.id) {
          this.$router.push('/rank')
        }
        getTopListSongs(this.topList.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songList = this._normalizeSongs(res.songlist)
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      _normalizeSongs (list) {
        let ret = []
        list.forEach((item) => {
          const musicData = item.data
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    },
    computed: {
      ...mapGetters([
        'topList'
      ]),
      title () {
        return this.topList.topTitle
      },
      bgImage () {
//        return this.topList.picUrl
        if (this.songList.length) {
          return this.songList[0].image
        } else {
          return ''
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.5s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
