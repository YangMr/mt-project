<script setup lang="ts">
const onSubmit = () => {}
</script>

<template>
  <div class="order-pay-page">
    <cp-nav-bar title="药品订单详情"></cp-nav-bar>
    <div class="head">
      <div class="card">
        <div class="logistics">
          <p>【东莞市】您的包裹已由物流公司揽收</p>
          <p>2019-07-14 17:42:12</p>
        </div>
        <van-icon name="arrow" />
      </div>
    </div>

    <!-- <OrderMedical :medicine-info="medicineInfo" /> -->

    <div class="order-detail">
      <van-cell-group>
        <van-cell title="药品金额" :value="1000"></van-cell>
        <van-cell title="运费" :value="100"></van-cell>
        <van-cell title="优惠卷" :value="10"></van-cell>
        <van-cell title="实付款" :value="900" class="price"></van-cell>
      </van-cell-group>
    </div>

    <van-submit-bar
      button-type="primary"
      text-align="left"
      :price="900 * 100"
      button-text="立即支付"
      @submit="onSubmit"
    />
  </div>

  <!-- <div class="order-pay-page" v-else>
    <cp-nav-bar title="药品支付" />
    <van-skeleton title avatar row="2" style="margin-top: 15px" />
    <van-skeleton title row="4" style="margin-top: 50px" />
    <van-skeleton title row="4" style="margin-top: 50px" />
  </div> -->
</template>

<style lang="scss" scoped>
.order-pay-page {
  padding: 46px 0 65px;
}
.head {
  position: relative;
  padding: 15px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 80px;
    background: linear-gradient(180deg, rgba(44, 181, 165, 0), rgba(44, 181, 165, 0.2));
    border-bottom-left-radius: 150px 20px;
    border-bottom-right-radius: 150px 20px;
  }

  .card {
    height: 74px;
    background-color: #fff;
    border-radius: 8px;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 15px;
    box-shadow: 0px 0px 22px 0px rgba(229, 229, 229, 0.5);
  }

  .logistics {
    flex: 1;
    p {
      &:first-child {
        color: var(--cp-primary);
      }
      &:last-child {
        color: var(--cp-tag);
        font-size: 13px;
        margin-top: 5px;
      }
    }
  }
  .van-icon {
    color: var(--cp-tip);
  }
}

.order-medical {
  padding: 0 15px;
  background-color: #fff;
  .head {
    display: flex;
    height: 54px;
    align-items: center;

    h3 {
      font-size: 16px;
      font-weight: normal;
    }

    small {
      font-size: 13px;
      color: var(--cp-tag);
      margin-left: 10px;
    }
  }

  .item {
    display: flex;
    flex-wrap: wrap;
    padding: 15px 0;

    .img {
      width: 80px;
      height: 70px;
      border-radius: 2px;
      overflow: hidden;
    }
    .info {
      padding-left: 15px;
      width: 250px;

      .name {
        display: flex;
        font-size: 15px;
        margin-bottom: 5px;
        > span:first-child {
          width: 200px;
        }
        > span:last-child {
          width: 50px;
          text-align: right;
        }
      }

      .size {
        margin-bottom: 5px;
        .van-tag {
          background-color: var(--cp-primary);
          vertical-align: middle;
        }
        span:not(.van-tag) {
          margin-left: 10px;
          color: var(--cp-tag);
          vertical-align: middle;
        }
      }
      .price {
        font-size: 16px;
        color: #eb5757;
      }
    }

    .desc {
      width: 100%;
      background-color: var(--cp-bg);
      border-radius: 4px;
      margin-top: 10px;
      padding: 4px 10px;
      color: var(--cp-tip);
    }
  }
}

.order-tip {
  padding: 0 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
  .tip {
    font-size: 12px;
    color: var(--cp-tag);
    width: 100%;
    &::before {
      content: '*';
      color: var(--cp-price);
      font-size: 14px;
    }
    margin-bottom: 30px;
  }
  .van-checkbox {
    a {
      color: var(--cp-primary);
    }
  }
}
:deep(.van-submit-bar) {
  border-top: 1px solid #eee;
}
</style>
