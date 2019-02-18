/**
 * Created by liuxin on 2017/8/19.
 */
/**
 * 组件和mixin方法进行merge, 组件中的方法会覆盖掉mixin中的方法
 */
import {mapGetters} from 'vuex'
export const playListMixin = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },

  mounted () {
    this.handlePlayList(this.playList)
  },

  // keep-alive组件激活时候触发
  activated () {
    this.handlePlayList(this.playList)
  },

  watch: {
    playList (newValue) {
      this.handlePlayList(newValue)
    }
  },

  methods: {
    // 具体组件去实现
    handlePlayList () {
      throw new Error('component must implement handlePlayList method')
    }
  }
}
