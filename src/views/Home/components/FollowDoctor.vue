<script setup lang="ts">
import DoctorCard from './DoctorCard.vue'
</script>

<template>
  <div class="follow-foctor-page">
    <div className="follow-foctor-page-header">
      <p>推荐关注</p>
      <a href="javascript:;"> 查看更多<i class="van-icon van-icon-arrow" /></a>
    </div>
    <div class="follow-foctor-page-body">
      <van-swipe :width="150" :show-indicators="false" :loop="false">
        <van-swipe-item v-for="(item, index) in 5" :key="index">
          <DoctorCard></DoctorCard>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.follow-foctor-page {
  background-color: var(--cp-bg);
  height: 250px;

  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 45px;
    padding: 0 15px;
    font-size: 13px;

    > a {
      color: var(--cp-tip);
    }
  }

  &-body {
    width: 100%;
    overflow: hidden;
  }
}
</style>
