<template>
  <div class="container">
    <div class="row">{{ userStore.user?.account }}</div>
    <button @click="handleLogin">登录</button>
    <van-button type="danger">hello</van-button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores'
import { Button as VanButton } from 'vant'

const userStore = useUserStore()
const info = {
  id: '1',
  token: '123',
  account: '章三',
  mobile: '111',
  avatar: 'https://www.nbaou.com'
}
const handleLogin = () => {
  userStore.setUser(info)
  localStorage.setItem('user', JSON.stringify(info))
}
</script>
