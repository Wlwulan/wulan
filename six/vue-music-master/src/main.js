import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'

// 导入store
import store from './store'

import 'common/stylus/index.styl'

// 使用vue-lazyload
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

// 对vue-lazyload组件进行注册
Vue.use(VueLazyLoad, {
  // 设置加载图片options
  loading: require('common/images/default.png')
})

// 使用fastclick
fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,

  // 注册vuex store
  store,
  render: h => h(App)
})
