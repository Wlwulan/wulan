/**
 * Created by liuxin on 2017/8/20.
 */
import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

/**
 * 获取关键词数据
 */
export function getHotKey () {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  const data = Object.assign({}, commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })

  return jsonp(url, data, options)
}

/**
 * 获取搜索结果
 * @param keyWord 搜索关键词
 * @param pageNum 搜索结果页数
 * @param isSearchSinger 是否搜索歌手
 */
export function getSearchResult (keyWord, pageNum, isSearchSinger, perpage) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'

  const data = Object.assign({}, commonParams, {
    w: keyWord,
    p: pageNum,
    perpage,
    n: perpage,
    catZhida: isSearchSinger ? 1 : 0,
    zhidaqu: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    remoteplace: 'txt.mqq.all',
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })

  return jsonp(url, data, options)
}
