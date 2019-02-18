/**
 * Created by liuxin on 2017/8/19.
 */
import jsonp from 'common/js/jsonp.js'

import {commonParams, options} from './config.js'

export function getTopList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

  const data = Object.assign({}, commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })

  return jsonp(url, data, options)
}

export function getTopListSongs (topId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  const data = Object.assign({}, commonParams, {
    /*
    * tpl:3
     page:detail
     date:2017_33
     topid:26
     type:top
     song_begin:0
     song_num:30
     g_tk:5381
     jsonpCallback:MusicJsonCallbacktoplist
     loginUin:0
     hostUin:0
     format:jsonp
     inCharset:utf8
     outCharset:utf-8
     notice:0
     platform:yqq
     needNewCode:0
    * */
    topid: topId,
    needNewCode: 1,
    uin: 0,
    tpl: 3,
    page: 'detail',
    type: 'top',
    platform: 'h5'
  })

  return jsonp(url, data, options)
}
