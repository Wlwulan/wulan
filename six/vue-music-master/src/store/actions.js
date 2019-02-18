/**
 * Created by liuxin on 2017/8/8.
 */
// 在一个动作中提交大量的mutation, 封装在actions中
import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'

function findIndex (list, song) {
  return list.findIndex((currentSong) => {
    return currentSong.id === song.id
  })
}

/**
 * 歌手页面点击歌曲的action
 * @param commit
 * @param state
 * @param list
 * @param index
 */
export const selectPlay = function ({commit, state}, {list, index}) {
  // 提交mutation
  // 判断当前的播放状态
  if (state.mode === playMode.random) {
    // 改变当前的playlist和currentindex
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)

    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENTINDEX, index)
  commit(types.SET_SEQUENCELIST, list)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = function ({commit}, {list}) {
  commit(types.SET_PLAYMODE, playMode.random)
  commit(types.SET_SEQUENCELIST, list)
  commit(types.SET_PLAYLIST, shuffle(list))
  commit(types.SET_CURRENTINDEX, 0)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const clickSearchSong = function ({commit, state}, song) {
  let playList = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex

  // 当前歌曲
  let currentSong = playList[currentIndex]

  // 点击的歌曲在播放列表中的索引, 如果没有这首歌曲返回-1
  let fpIndex = findIndex(playList, song)

  // 插入位置, 在当前播放歌曲位置的后面插入
  currentIndex++

  // 插入这首歌到 (当前歌曲的后面)
  playList.splice(currentIndex, 0, song)

  // 点击的歌曲在播放列表中, 添加的歌曲覆盖原来的歌曲, (删除原来的歌曲)
  if (fpIndex !== -1) {
    if (currentIndex > fpIndex) {
      // 插入的位置在原来位置的后面, 删除前面的(原来的)
      playList.splice(fpIndex, 1)

      // 删除之后修正currentIndex
      currentIndex--
    } else {
      // 插入的位置在原来位置的前面, 删除后面的(原来的)
      playList.splice(fpIndex + 1, 1)
    }
  }
  // 如果点击的歌曲不在当前歌曲列表的话, 就不做操作

  // 操作sequenceList -------------------------
  // 要插入的位置
  let currentSIndex = findIndex(sequenceList, currentSong) + 1

  // 检查现有列表中有没有要插入的歌曲
  let fsIndex = findIndex(sequenceList, song)

  // 插入
  sequenceList.splice(currentSIndex, 0, song)

  // 如果列表中有, 删除原来的歌曲
  if (fsIndex !== -1) {
    if (currentSIndex > fsIndex) {
      // 删除前面的
      sequenceList.splice(fsIndex, 1)
    } else {
      // 删除后面的
      sequenceList.splice(fsIndex + 1, 1)
    }
  }

  // 提交
  commit(types.SET_SEQUENCELIST, sequenceList)
  commit(types.SET_PLAYLIST, playList)
  commit(types.SET_CURRENTINDEX, currentIndex)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}
