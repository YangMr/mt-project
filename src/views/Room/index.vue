<script setup lang="ts"></script>

<template>
  <div class="room-page">
    <cp-nav-bar title="医生问诊室"></cp-nav-bar>
    聊天内容

    <van-button @click="$router.push('/order/pay?id=6938464898215936')">购买药品</van-button>
  </div>
</template>

<style lang="scss" scoped>
.room-page {
  padding-top: 46px;
}
</style>
