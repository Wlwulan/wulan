<template>
  <div class="search-box">
    <!--放大镜图标-->
    <i class="icon-search"></i>
    <!--放大镜图标结束-->

    <!--输入框-->
    <input type="text" class="box" :placeholder="placeholder" v-model="query">
    <!--输入框结束-->

    <!--关闭清空搜索框按钮-->
    <i class="icon-dismiss" v-show="query" @click="clearQuery"></i>
    <!--关闭清空搜索框按钮结束-->
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      // 搜索框占位文字
      placeholder: {
        type: String,
        default: '搜索歌曲、歌手'
      }
    },
    data () {
      return {
        // 输入数据
        query: ''
      }
    },
    methods: {
      /**
       * 点击清空搜索框按钮
       */
      clearQuery () {
        this.query = ''
      },

      /**
       * 给父组件调用, 父组件通过$refs能够获取这个Vue实例, 从而调用方法
       * @param query
       */
      setQuery (query) {
        this.query = query
      }
    },

    created () {
      // 监听this.query的改变, 基础组件只派发事件给外界, 不处理其他逻辑
      this.$watch('query', (newValue) => {
        this.$emit('queryChange', newValue)
      })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    padding: 0 6px
    height: 40px
    background: $color-highlight-background
    border-radius: 6px
    .icon-search
      font-size: 24px
      color: $color-background
    .box
      flex: 1
      margin: 0 5px
      line-height: 18px
      background: $color-highlight-background
      color: $color-text
      font-size: $font-size-medium
      &::placeholder
        color: $color-text-d
    .icon-dismiss
      font-size: 16px
      color: $color-background
</style>
