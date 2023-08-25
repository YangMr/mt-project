<template>
  <div class="container">
    <button @click="login">登录</button>
    <button @click="getInfo">获取用户信息</button>
  </div>
</template>

<script setup lang="ts">
import request from '../utils/request'
import { useUserStore } from '../stores/user'
import type { User } from '../types/user.d.ts'

const store = useUserStore()

const login = () => {
  request<User>('/login/password', 'post', {
    password: 'abc12345',
    mobile: '13211112222'
  })
    .then((res) => {
      console.log('res=>', res.data)
      store.setUser(res.data)
    })
    .catch((err) => {
      console.log('err', err)
    })
}

const getInfo = () => {
  request('/patient/myUser')
    .then((res) => {
      console.log('info', res)
    })
    .catch((err) => {})
}
</script>
<style></style>
