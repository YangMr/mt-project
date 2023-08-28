<script setup lang="ts">
import { getUserInfo } from '@/services/user'
import { ref } from 'vue'
import type { UserInfo } from '@/types/user'

// 初始化一个变量, 用来保存用户信息
const user = ref<UserInfo>()

// 获取用户信息
const initUserInfo = async () => {
  const userRes = await getUserInfo()
  user.value = userRes.data
  console.log('user.value ', user.value)
}
initUserInfo()
</script>

<template>
  <div class="user-page" v-if="user">
    <div class="user-page-header">
      <div class="top">
        <van-image width="70px" height="70px" round :src="user?.avatar" />
        <div class="name">
          <p>{{ user?.account }}</p>
          <p><van-icon name="edit" /></p>
        </div>
      </div>
      <van-row>
        <van-col span="6">
          <p>{{ user?.collectionNumber }}</p>
          <p>收藏</p>
        </van-col>
        <van-col span="6">
          <p>0</p>
          <p>关注</p>
        </van-col>
        <van-col span="6">
          <p>0</p>
          <p>积分</p>
        </van-col>
        <van-col span="6">
          <p>0</p>
          <p>优惠卷</p>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-page {
  min-height: calc(100vh - 50px);
  background-color: var(--cp-bg);
  padding: 0 15px 65px;

  &-header {
    height: 200px;
    background: linear-gradient(180deg, rgba(44, 181, 165, 0.46), rgba(44, 181, 165, 0));
    margin: 0 -15px;
    padding: 0 15px;
    .top {
      display: flex;
      align-items: center;
      padding-top: 50px;

      .name {
        padding-left: 15px;

        p {
          &:first-child {
            font-size: 18px;
            font-weight: 500;
          }
          &:last-child {
            margin-top: 10px;
            color: var(--cp-primary);
            font-size: 16px;
          }
        }
      }
    }

    .van-row {
      padding-top: 15px;
      margin: 0 -15px;
      p {
        text-align: center;

        &:first-child {
          font-size: 18px;
          font-weight: 500;
        }

        &:last-child {
          color: var(--cp-dark);
          font-size: 12px;
          padding-top: 4px;
        }
      }
    }
  }
}
</style>
