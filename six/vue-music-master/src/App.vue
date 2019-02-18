<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <!--使用keep-alive进行缓存-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <!--播放器不属于任何路由-->
    <player></player>

  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header.vue'
  import Tab from 'components/tab/tab'
  import Player from 'components/player/player.vue'

  export default {
    components: {
      MHeader,
      Tab,
      Player
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">


</style>
