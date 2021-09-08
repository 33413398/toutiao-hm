<template>
  <div class="login-container">
    <van-nav-bar class="g-nav-bar" title="登录" left-arrow @click-left="onClickLeft" />
    <van-form @submit="onSubmit" class="my-form" ref="loginRef">
      <van-field clearable v-model="user.mobile" name="mobile" type="number" maxlength="11" placeholder="请输入手机号" :rules="userFormRules.mobile">
        <template #left-icon>
          <i class="iconfont icon-shouji"></i>
        </template>
      </van-field>
      <van-field v-model="user.code" name="code" center clearable placeholder="请输入短信验证码" :rules="userFormRules.code">
        <template #left-icon>
          <i class="iconfont icon-yanzhengma"></i>
        </template>
        <template #button>
          <van-count-down v-if="isCountDownShow" :time="1000 * 5" format="ss s" @finish="isCountDownShow = false" />
          <van-button v-else class="my-btn" size="small" color="#ededed" round type="default" @click="submitSend">获取验证码</van-button>
        </template>
      </van-field>

      <div style="margin: 16px;">
        <van-button hairline block color="#6db4fb" type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <!-- 隐私条款 -->
    <div class="ystk">
      隐私条款
    </div>
  </div>
</template>

<script>
import { login, getSmsCode } from "@/api/user";

export default {
  name: "LoginPage",
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: "", // 手机号
        code: "", // 验证码
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: "手机号格式错误",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
      isCountDownShow: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    async onSubmit() {
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: "登录中...", // 提示消息
      });
      try {
        const { data } = await login(this.user);
        this.$store.commit("setUser", data);
        this.$toast.success("登录成功");
        this.$router.push("/");
      } catch (error) {
        console.log(error);
        this.$toast.fail("登录失败，手机号或验证码错误");
      }
    },
    async submitSend() {
      try {
        await this.$refs.loginRef.validate("mobile");
      } catch (error) {
        return console.log("手机号校验失败");
      }
      // 开始倒计时
      this.isCountDownShow = true;
      try {
        await getSmsCode(this.user.mobile);
        this.$toast.success("验证码发送成功");
      } catch (error) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false;
        if (error.response.status === 429) {
          this.$toast("发送太频繁了，请稍后重试");
        } else {
          this.$toast("发送失败，请稍后重试");
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.my-form {
  .iconfont {
    font-size: 37px;
  }
  .my-btn {
    width: 158px;
    height: 46px;
    line-height: 46px;
    font-size: 22px;
  }
}
.ystk {
  position: absolute;
  bottom: 57px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 25px;
  color: #666666;
}
</style>
