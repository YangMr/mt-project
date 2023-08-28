<script setup lang="ts">
import { ref } from 'vue'
import { mobileRules, passwordRules } from '@/utils/rules'
import { loginByPassword } from '@/services/user'
import { useUserStore } from '@/stores/user'
import { showToast } from 'vant'
import { useRouter, useRoute } from 'vue-router'

// 初始化store
const store = useUserStore()

// 初始化router与route
const router = useRouter()
const route = useRoute()

// 手机号// 密码
import type { loginParamsRules } from '@/services/types/user.d'
const loginForm = ref<loginParamsRules>({
  mobile: '13230000001',
  password: 'abc12345'
})

// 协议状态
const agree = ref<boolean>(false)
// 密码状态
const show = ref<boolean>(false)
// 登录方法
const hanleLogin = async () => {
  if (!agree.value) {
    showToast('请勾选我已同意')
    return
  }

  // 第一种, 不是因为token过期进入到登录页面, 而是我们打开项目自己进入登录页, 没有携带当前页面的地址
  // 第二种 token过期, 自动跳转到登录页, 如果是第二种情况的话, 会携带当前的页面地址

  try {
    // 调用登录接口
    const loginRes = await loginByPassword(loginForm.value)

    // 将登录成功的token存储搭配本地和pinia
    store.setUser(loginRes.data)

    // 跳转到主页
    router.push((route.query.returnUrl as string) || '/user')

    // 提示登录成功
    showToast('登录成功')
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="login-page">
    <!-- navbar -->
    <cp-nav-bar right-text="注册" @click-right="$router.push('/register')"></cp-nav-bar>

    <!-- head -->
    <div class="login-head">
      <h3>密码登录</h3>
      <a href="javascript:;">
        <span>短信验证码登录</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>

    <!-- form表单 -->
    <van-form autocomplete="off" @submit="hanleLogin">
      <van-field
        :rules="mobileRules"
        v-model="loginForm.mobile"
        placeholder="请输入手机号码"
        type="tel"
      />
      <van-field
        :rules="passwordRules"
        v-model="loginForm.password"
        placeholder="请输入密码"
        :type="show ? 'text' : 'password'"
      >
        <template #button>
          <cp-icons :name="`login-eye-${show ? 'on' : 'off'}`" @click="show = !show"></cp-icons>
        </template>
      </van-field>
      <div class="cp-cell">
        <van-checkbox v-model="agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button block round type="primary" native-type="submit">登 录</van-button>
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码</a>
      </div>
    </van-form>

    <!-- footer -->
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="@/assets/qq.svg" alt="qq" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  &-page {
    padding-top: 46px;
  }
  &-head {
    padding: 30px 30px 50px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    h3 {
      font-weight: normal;
      font-size: 24px;
    }

    a {
      font-size: 15px;
    }
  }
  &-other {
    margin-top: 60px;
    padding: 0 30px;

    .icon {
      display: flex;
      justify-content: center;

      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}

.van-form {
  padding: 0 15px;

  .cp-cell {
    height: 52px;
    line-height: 24px;
    padding: 14px 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
  .van-checkbox {
    a {
      color: var(--cp-primary);
      padding: 0 5px;
    }
  }
}
</style>
