<script setup lang="ts">
import type { MedicineResponseType } from '@/types/order.d.ts'
defineProps<{
  medicineInfo: MedicineResponseType
}>()
</script>

<template>
  <div class="order-medical">
    <div class="head">
      <h3>优医药房</h3>
      <small>优医质保 假一赔十</small>
    </div>
    <div
      class="item van-hairline--top"
      v-for="(item, index) in medicineInfo.medicines"
      :key="index"
    >
      <img class="img" :src="item.avatar" alt="" />
      <div class="info">
        <p class="name">
          <span>{{ item.name }}</span>
          <span>x{{ item.quantity }}</span>
        </p>
        <p class="size">
          <van-tag v-if="item.prescriptionFlag === 1">处方药</van-tag>
          <span>{{ item.specs }}</span>
        </p>
        <p class="price">￥{{ item.amount }}</p>
      </div>
      <div class="desc">用法用量: {{ item.usageDosag }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
