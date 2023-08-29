<script setup lang="ts">
import { getPatientList } from '@/services/patient'
import type { PatientList, PatientType } from '@/types/user'
import { ref, computed } from 'vue'
import { showToast } from 'vant'
import Validator from 'id-validator'

// 创建一个变量,保存患者列表
const list = ref<PatientList>()

// 初始化患者列表数据
const initPatientList = async () => {
  const patienRes = await getPatientList()
  list.value = patienRes.data
}
initPatientList()

// 创建性别数据
const options = [
  { label: '男', value: 1 },
  { label: '女', value: 0 }
]

// 控制弹出层显示与隐藏
const show = ref(false)

// 打开弹出层
const showPopup = () => {
  show.value = true
}

// 关闭弹出层
const backPopup = () => {
  patient.value = { ...initPatient }
  show.value = false
}

// 监听保存按钮
const submit = () => {
  if (!patient.value.name) return showToast('请输入真实姓名')
  if (!patient.value.idCard) return showToast('请输入身份证号')
  const validator = new Validator()
  if (!validator.isValid(patient.value.idCard)) return showToast('身份证格式错误')
  const { sex } = validator.getInfo(patient.value.idCard)
  if (patient.value.gender !== sex) return showToast('性别和身份证不符')
}

const initPatient: PatientType = {
  name: '',
  idCard: '',
  defaultFlag: 0,
  gender: 1
}

// 定义接收表单输入的数据
const patient = ref<PatientType>({ ...initPatient })

const defaultFlag = computed({
  get() {
    console.log('123')
    return patient.value.defaultFlag === 1 ? true : false
  },
  set(value) {
    patient.value.defaultFlag = value ? 1 : 0
  }
})
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

      <div class="patient-add" @click="showPopup" v-if="list && list?.length <= 6">
        <cp-icons name="user-add"></cp-icons>
        <p>添加患者</p>
      </div>

      <div class="patient-tip">最多可添加6人</div>
    </div>
    <!-- 右侧弹出 -->
    <van-popup v-model:show="show" position="right">
      <cp-nav-bar
        :back="backPopup"
        title="添加患者"
        rightText="保存"
        @click-right="submit"
      ></cp-nav-bar>

      <van-form autocomplete="off">
        <van-field label="真实姓名" v-model="patient.name" placeholder="请输入真实姓名"></van-field>
        <van-field label="身份证号" v-model="patient.idCard" placeholder="请输入身份证号" />
        <van-field label="性别">
          <template #input>
            <cp-radio-btn :options="options" v-model="patient.gender"></cp-radio-btn>
          </template>
        </van-field>
        <van-field label="默认就诊人">
          <template #input>
            <van-checkbox round v-model="defaultFlag" />
          </template>
        </van-field>
      </van-form>
    </van-popup>
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

  ::v-deep() {
    .van-popup {
      width: 100%;
      height: 100%;

      .van-form {
        padding-top: 46px;
      }
    }
  }
}
</style>
