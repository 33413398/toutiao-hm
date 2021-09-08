<template>
  <div class="my">
    <!-- 顶部 -->
    <div class="my-header">
      <!-- 已登陆 -->
      <div class="is-login" v-if="user">
        <div class="is-login-top">
          <div class="top-lf">
            <van-image class="is-login-top-img" round :src="userInfo&&userInfo.photo" />
            <div class="is-login-top-name">{{userInfo&&userInfo.name}}</div>
          </div>
          <van-button type="default" size="mini" round class="is-login-top-btn">编辑资料</van-button>
        </div>
        <!-- 底部关注等 -->
        <div class="is-login-bottom">
          <div class="is-login-bottom-item">
            <div class="is-login-bottom-item-num">{{ userInfo&&userInfo.art_count }}</div>
            <div class="is-login-bottom-item-label">头条</div>
          </div>
          <div class="is-login-bottom-item">
            <div class="is-login-bottom-item-num">{{ userInfo&&userInfo.follow_count }}</div>
            <div class="is-login-bottom-item-label">关注</div>
          </div>
          <div class="is-login-bottom-item">
            <div class="is-login-bottom-item-num">{{ userInfo&&userInfo.fans_count }}</div>
            <div class="is-login-bottom-item-label">粉丝</div>
          </div>
          <div class="is-login-bottom-item">
            <div class="is-login-bottom-item-num">{{ userInfo&&userInfo.like_count }}</div>
            <div class="is-login-bottom-item-label">获赞</div>
          </div>
        </div>
      </div>
      <!-- 未登录 -->
      <div class="not-login" @click="$router.push('/login')" v-else>
        <img src="../../assets/images/mobile.png" alt="登录图标">
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- 收藏、历史 -->
    <van-grid clickable :column-num="2" class="my-grid">
      <van-grid-item icon="photo-o" text="收藏">
        <template #icon>
          <i class="iconfont icon-shoucang"></i>
        </template>
      </van-grid-item>
      <van-grid-item icon="photo-o" text="历史">
        <template #icon>
          <i class="iconfont icon-lishi"></i>
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 消息通知、小智同学 -->
    <div class="list-tab">
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </div>
    <!-- 退出登录按钮 -->
    <div class="out-login" v-if="user">
      <van-cell title="退出登录" size="large" clickable @click="outLogin" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getUserInfo } from "@/api/user";
export default {
  name: "my",
  data() {
    return {
      userInfo: null,
    };
  },
  computed: {
    ...mapState({
      user: "user",
    }),
  },
  created() {
    this.getUserInfoHandle();
  },
  methods: {
    outLogin() {
      this.$dialog
        .confirm({
          title: "退出登录",
        })
        .then(() => {
          this.$store.commit("setUser", null);
        })
        .catch(() => {
          // on cancel
        });
    },
    async getUserInfoHandle() {
      if (!this.user) return;
      try {
        const { data } = await getUserInfo();
        this.userInfo = data;
      } catch (error) {
        this.$toast.fail(error.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
// 顶部
.my-header {
  position: relative;
  width: 100%;
  height: 361px;
  background: url("../../assets/images/banner.png");
  background-size: cover;
  // 未登录
  .not-login {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }
    .text {
      display: block;
      color: #fff;
      font-size: 28px;
    }
  }
  // 已登陆
  .is-login {
    .is-login-top {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .top-lf {
        display: flex;
        align-items: center;
        .is-login-top-img {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
          margin-right: 23px;
        }
        .is-login-top-name {
          font-size: 30px;
          color: #fff;
        }
      }
      .is-login-top-btn {
        width: 130px;
        height: 40px;
        color: #666666;
        font-size: 20px;
      }
    }
    // 底部关注等
    .is-login-bottom {
      display: flex;
      padding: 0 50px;
      box-sizing: border-box;
      .is-login-bottom-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .is-login-bottom-item-num {
          text-align: center;
          font-size: 36px;
        }
        .is-login-bottom-item-label {
          text-align: center;
          font-size: 23px;
        }
      }
    }
  }
}
// 宫格菜单
.my-grid {
  .iconfont {
    font-size: 45px;
  }
  .icon-shoucang {
    color: #ee6e6f;
  }
  .icon-lishi {
    color: #ff9d1d;
  }
}
// 消息通知、小智同学
.list-tab {
  margin-top: 10px;
  .van-cell__title {
    span {
      color: #333333;
      font-size: 30px;
    }
  }
}
// 退出登录按钮
.out-login {
  margin-top: 10px;
  text-align: center;
  /deep/ .van-cell__title {
    span {
      color: #d86262;
      font-size: 30px;
    }
  }
}
</style>
