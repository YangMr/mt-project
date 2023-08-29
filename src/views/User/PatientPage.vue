<script setup lang="ts">
import { getPatientList } from '@/services/patient'
import type { PatientList } from '@/types/user'
import { ref } from 'vue'

// 创建一个变量,保存患者列表
const list = ref<PatientList>()

// 初始化患者列表数据
const initPatientList = async () => {
  const patienRes = await getPatientList()
  list.value = patienRes.data
}
initPatientList()
</script>

<template>
  <div class="patient-page">
    <cp-nav-bar title="家庭档案"></cp-nav-bar>
    <div class="patient-page-list">
      <div class="patient-item" v-for="(item, index) in list" :key="index">
        <div class="info">
          <span class="name">{{ item.name }}</span>
          <span class="id">{{ item.idCard.replace(/^(.{6})(?:\d+)(.{4})$/, '\$1******\$2') }}</span>
          <span class="sex">{{ item.gender ? '男' : '女' }}</span>
          <span class="age">{{ item.age }}岁</span>
        </div>
        <div class="icon"><cp-icons name="user-edit"></cp-icons></div>
        <div class="tag" v-if="item.defaultFlag === 1">默认</div>
      </div>

      <div class="patient-add" v-if="list && list?.length <= 6">
        <cp-icons name="user-add"></cp-icons>
        <p>添加患者</p>
      </div>

      <div class="patient-tip">最多可添加6人</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.patient-page {
  padding: 46px 0 80px;
  &-list {
    padding: 15px;

    .patient-item {
      background-color: var(--cp-bg);
      padding: 15px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      overflow: hidden;
      position: relative;
      margin-bottom: 15px;
      .info {
        display: flex;
        flex: 1;
        flex-wrap: wrap;

        span {
          margin-right: 20px;
          line-height: 30px;
          color: var(--cp-tip);
          &.name {
            width: 60px;
            font-size: 16px;
            color: var(--cp-text1);
            // margin-right: 0;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          &.id {
            width: 180px;
            color: var(--cp-text1);
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
      .icon {
        color: var(--cp-tag);
        width: 20px;
        text-align: center;
      }
      .tag {
        position: absolute;
        color: white;
        font-size: 10px;
        width: 30px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 3px;
        background-color: var(--cp-primary);
        right: 60px;
        top: 21px;
      }
    }

    .patient-add {
      background-color: var(--cp-bg);
      padding: 15px;
      border-radius: 8px;
      text-align: center;
      color: var(--cp-primary);
      .cp-icon {
        font-size: 24px;
      }
    }

    .patient-tip {
      color: var(--cp-tag);
      padding: 12px 0;
    }
  }
}
</style>
