import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'

// state修改的时候会打印logger
import createLogger from 'vuex/dist/logger'
// 注册vuex
Vue.use(Vuex)

// vuex的调试工具
const debug = process.env.NODE_ENV !== 'production'

// 单例Store
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  // 检测state的修改是否来源于commit
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
