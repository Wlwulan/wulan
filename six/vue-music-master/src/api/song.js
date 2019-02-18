/**
 * Created by liuxin on 2017/8/18.
 */
import {commonParams} from './config.js'
import axios from 'axios'

/**
 * 获取歌词
 * @param mid 歌曲id
 */
export function getLyric (mid) {
  const url = '/api/getLyric'
  const data = Object.assign({}, commonParams, {
    /*
    * callback:MusicJsonCallback_lrc
     pcachetime:1503034016380
     songmid:003aAYrm3GE0Ac
     g_tk:593065735
     jsonpCallback:MusicJsonCallback_lrc
     loginUin:784532927
     hostUin:0
     format:jsonp
     inCharset:utf8
     outCharset:utf-8
     notice:0
     platform:yqq
     needNewCode:0
    * */
    pcachetime: +new Date(),
    songmid: mid,
    g_tk: 593065735,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    platform: 'yqq',
    needNewCode: 0
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
