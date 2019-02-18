/**
 * Created by liuxin on 2017/8/9.
 */
import {getLyric} from 'api/song'
import {ERR_OK} from 'api/config'
import {Base64} from 'js-base64'
// TODO 为什么加{}

export default class Song {
  constructor ({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  // 获取歌词
  getLyric () {
    // 判断是否已经有歌词了
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject('no lyric')
        }
      })
    })
  }
}

/**
 * 工厂方法 不提供new, 提供另一种方法创建实例
 * @param musicData
 * @returns {Song}
 */
export function createSong (musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filtersinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
  })
}

/**
 * 处理歌手
 * @param singer 歌手数组
 * @returns {string}
 */
export function filtersinger (singer) {
  let ret = []

  // 边界处理
  if (!singer) {
    return ''
  }

  singer.forEach((item, index) => {
    ret.push(item.name)
  })
  return ret.join('/')
}
