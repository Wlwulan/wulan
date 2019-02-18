<template>
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getDiscSongList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'

  export default {
    data () {
      return {
        songs: []
      }
    },
    components: {
      MusicList
    },
    computed: {
      ...mapGetters([
        'disc'
      ]),
      title () {
        return this.disc.dissname
      },
      bgImage () {
        return this.disc.imgurl
      }
    },
    created () {
      this._getDiscSongList()
    },
    methods: {
      _getDiscSongList () {
        // 如果用户刷新了
        if (!this.disc.dissid) {
          this.$router.push('/recommend')
          return
        }
        getDiscSongList(this.disc.dissid).then((res) => {
          if (res.code === ERR_OK) {
            console.log(res.cdlist[0].songlist)
            this.songs = this._normalizeSongs(res.cdlist[0].songlist)
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      _normalizeSongs (songList) {
        let ret = []
        songList.forEach((musicData) => {
          if (musicData.songid && musicData.albumid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
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
