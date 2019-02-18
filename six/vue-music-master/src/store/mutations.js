/**
 * Created by liuxin on 2017/8/8.
 */
import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER] (state, singer) {
    state.singer = singer
  },

  [types.SET_PLAYING_STATE] (state, flag) {
    state.playing = flag
  },

  [types.SET_FULLSCREEN] (state, flag) {
    state.fullScreen = flag
  },

  [types.SET_PLAYLIST] (state, list) {
    state.playList = list
  },

  [types.SET_SEQUENCELIST] (state, list) {
    state.sequenceList = list
  },

  [types.SET_PLAYMODE] (state, mode) {
    state.mode = mode
  },

  [types.SET_CURRENTINDEX] (state, index) {
    state.currentIndex = index
  },

  [types.SET_DISC] (state, disc) {
    state.disc = disc
  },

  [types.SET_TOPLIST] (state, topList) {
    state.topList = topList
  }
}

export default mutations
