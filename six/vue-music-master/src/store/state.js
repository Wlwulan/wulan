/**
 * Created by liuxin on 2017/8/8.
 */
import {playMode} from 'common/js/config'
const state = {
  singer: {},
  // 共享播放器的数据
  playing: false, // 播放状态
  fullScreen: false, // 是否全屏播放
  playList: [], // 播放列表
  sequenceList: [], // 顺序播放列表哦
  mode: playMode.sequence, // 播放模式
  currentIndex: -1, // 当前播放的索引
  // 不需要currentSong, 歌曲计算而来

  disc: {}, // 歌单对象
  topList: [] // 排行榜总体列表
}

export default state
