<script setup lang="ts">
import { getOrderDetail } from '@/services/consult'
import type { ConsultOrderItem } from '@/types/consult'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getIllnessTimeText, getConsultFlagText } from '@/utils/filter'
import { OrderType } from '@/enum'
const route = useRoute()

// 获取订单id
const orderId = route.params.id as string

// 获取订单详情数据
const detailInfo = ref<ConsultOrderItem>()
const initOrderDetail = async () => {
  const orderRes = await getOrderDetail(orderId)
  console.log('orderRes', orderRes)
  detailInfo.value = orderRes.data
}
initOrderDetail()
</script>

<template>
  <div class="consult-detail-page" v-if="detailInfo">
    <cp-nav-bar title="问诊详情"></cp-nav-bar>
    <div class="detail-head">
      <div class="text">
        <h3>图文问诊 {{ detailInfo.payment }} 元</h3>
        <span class="sta green">{{ detailInfo.statusValue }}</span>
        <p class="tip">服务医生信息</p>
      </div>
      <div class="card">
        <img class="avatar" src="@/assets/avatar-doctor.svg" alt="" />
        <p class="doc">
          <span>极速问诊</span>
          <span>{{ detailInfo.docInfo?.name }}</span>
        </p>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="detail-patient">
      <van-cell-group :border="false">
        <van-cell
          title="患者信息"
          :value="`${detailInfo.patientInfo?.name} | ${
            detailInfo.patientInfo?.gender ? '男' : '女'
          } | ${detailInfo.patientInfo?.age}岁`"
        />
        <van-cell
          title="患病时长"
          :value="`${getIllnessTimeText(detailInfo.illnessTime as number)}`"
        />
        <van-cell
          title="就诊情况"
          :value="`${getConsultFlagText(detailInfo.consultFlag as number)}`"
        />
        <van-cell title="病情描述" :label="detailInfo.illnessDesc" />
      </van-cell-group>
    </div>

    <div class="detail-order">
      <h3>订单信息</h3>
      <van-cell-group :border="false">
        <van-cell title="订单编号">
          <template #value>
            <span class="copy">复制</span>
            {{ detailInfo.orderNo }}
          </template>
        </van-cell>
        <van-cell title="创建时间" :value="detailInfo.createTime" />
        <van-cell title="应付款" :value="`￥${detailInfo.payment}`" />
        <van-cell title="优惠券" :value="`-￥${detailInfo.couponDeduction}`" />
        <van-cell title="积分抵扣" :value="`-￥${detailInfo?.pointDeduction}`" />
        <van-cell title="实付款" :value="`￥${detailInfo?.actualPayment}`" class="price" />
      </van-cell-group>
    </div>

    <div class="detail-action van-hairline--top" v-if="detailInfo.status === OrderType.ConsultPay">
      <div class="price">
        <span>需付款</span>
        <span>￥{{ detailInfo.actualPayment }}</span>
      </div>
      <van-button type="default" round>取消问诊</van-button>
      <van-button type="primary" round>继续支付</van-button>
    </div>
    <div class="detail-action van-hairline--top" v-if="detailInfo.status === OrderType.ConsultWait">
      <van-button type="default" round>取消问诊</van-button>
      <van-button type="primary" round :to="`/room?orderId=${detailInfo.id}`">继续沟通</van-button>
    </div>
    <div class="detail-action van-hairline--top" v-if="detailInfo.status === OrderType.ConsultChat">
      <van-button type="default" round v-if="detailInfo.prescriptionId">查看处方</van-button>
      <van-button type="primary" round :to="`/room?orderId=${detailInfo.id}`">继续沟通</van-button>
    </div>
    <div
      class="detail-action van-hairline--top"
      v-if="detailInfo.status === OrderType.ConsultComplete"
    >
      <cp-consult-more></cp-consult-more>
      <van-button type="default" round :to="`/room?orderId=${detailInfo.id}`">问诊记录</van-button>
      <van-button type="primary" round v-if="detailInfo.evaluateId">写评价</van-button>
      <van-button type="default" round v-else>查看评价</van-button>
    </div>
    <div
      class="detail-action van-hairline--top"
      v-if="detailInfo.status === OrderType.ConsultCancel"
    >
      <van-button type="default" round>删除订单</van-button>
      <van-button type="primary" round to="/">咨询其他医生</van-button>
    </div>
  </div>

  <div v-else>
    <cp-nav-bar title="问诊详情"></cp-nav-bar>
    <van-skeleton title :row="4" style="margin-top: 30px" />
    <van-skeleton title :row="4" style="margin-top: 30px" />
  </div>
</template>

<style lang="scss" scoped>
.consult-detail-page {
  padding-top: 46px;

  .detail-head {
    height: 146px;
    position: relative;
    padding: 15px;
    &::before {
      content: '';
      width: 100%;
      height: 135px;
      position: absolute;
      left: 0;
      top: 0;
      background: linear-gradient(180deg, rgba(44, 181, 165, 0), rgba(44, 181, 165, 0.2));
      border-bottom-left-radius: 150px 20px;
      border-bottom-right-radius: 150px 20px;
    }

    .text {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 10px 3px;

      .sta {
        color: var(--cp-tag);
        font-weight: 500;
        font-size: 16px;
        &.green {
          color: var(--cp-primary);
        }
        &.orange {
          color: #f2994a;
        }
      }

      .tip {
        width: 100%;
        color: var(--cp-text3);
        margin-top: 5px;
      }
    }
  }

  .card {
    display: flex;
    align-items: center;
    height: 74px;
    background-color: #fff;
    border-radius: 8px;
    position: relative;
    padding: 0 15px;
    box-shadow: 0px 0px 22px 0px rgba(229, 229, 229, 0.5);

    .avatar {
      width: 38px;
      height: 38px;
    }

    .doc {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding-left: 15px;

      > span {
        font-size: 16px;

        &:last-child {
          font-size: 13px;
          color: var(--cp-text3);
        }
      }
    }
  }

  .detail-patient {
    &::after {
      content: '';
      display: block;
      height: 12px;
      background-color: var(--cp-bg);
    }
  }

  .detail-order {
    > h3 {
      padding: 10px 18px;
      font-weight: normal;
    }
    .copy {
      padding: 2px 10px;
      border: 1px solid var(--cp-primary);
      background-color: var(--cp-plain);
      color: var(--cp-primary);
      font-size: 12px;
      border-radius: 12px;
      margin-right: 10px;
    }
    :deep(.van-cell__title) {
      width: 70px;
      flex: none;
    }
    .price :deep(.van-cell__value) {
      font-size: 16px;
      color: var(--cp-price);
    }
  }

  .detail-action {
    height: 65px;
    width: 100%;
    position: fixed;
    left: 0;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    bottom: 0;
    padding: 0 15px;
    box-sizing: border-box;

    .price {
      flex: 1;

      > span:last-child {
        font-size: 18px;
        color: var(--cp-price);
        padding-left: 5px;
      }
    }

    .van-button {
      margin-left: 10px;
      padding-left: 17px;
      padding-right: 17px;
    }
    :deep(.van-button--default) {
      background-color: var(--cp-bg);
      color: var(--cp-text3);
    }
  }
  .van-cell {
    padding-left: 18px;
    padding-right: 18px;
  }
}
</style>
