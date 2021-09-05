<template>
  <div class="home">
    <router-view></router-view>
    <van-tabbar route class="my-tabbar">
      <van-tabbar-item to="/">
        <template #icon>
          <i class="iconfont icon-shouye"></i>
        </template>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <template #icon>
          <i class="iconfont icon-wenda"></i>
        </template>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template #icon>
          <i class="iconfont icon-shipin"></i>
        </template>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <template #icon>
          <i class="iconfont icon-wode"></i>
        </template>
        <span class="text">我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>
<style scoped lang="less">
.my-tabbar {
  .iconfont {
    font-size: 40px;
  }
  span.text {
    font-size: 20px;
  }
}
</style>
