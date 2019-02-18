/**
 * Created by liuxin on 2017/8/1.
 */
import jsonp from 'common/js/jsonp.js'

import {commonParams, options} from './config.js'

import axios from 'axios'

export function getRecommend () {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

export function getDiscList () {
  // const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'

  const url = '/api/getDiscList'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    loginUin: 0,
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getDiscSongList (dissid) {
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

  /*
   * type:1
   json:1
   utf8:1
   onlysong:0
   disstid:1772331184
   format:jsonp
   g_tk:5381
   jsonpCallback:playlistinfoCallback
   loginUin:0
   hostUin:0
   format:jsonp
   inCharset:utf8
   outCharset:utf-8
   notice:0
   platform:yqq
   needNewCode:0
   * */
  const data = Object.assign({}, commonParams, {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    disstid: dissid,
    // g_tk: 1308511924,
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0
  })

  const options = {
    param: 'jsonpCallback',
    prefix: 'playlistinfoCallback'
  }

  return jsonp(url, data, options)
}
