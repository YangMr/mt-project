<script setup lang="ts">
// 获取到聊天记录 (默认消息 患者信息 时间 问诊室状态)
import RoomStatus from './components/RoomStatus.vue'
import RoomAction from './components/RoomAction.vue'
import RoomMessage from './components/RoomMessage.vue'
import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'
import { onMounted, ref, nextTick } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'
import type { Message, TimeMessages } from '@/types/room'
import { MsgType } from '../../enum/index'
import { getOrderDetail } from '@/services/consult'
import type { ConsultOrderItem } from '@/types/consult'
import { OrderType } from '@/enum'
const store = useUserStore()
const route = useRoute()

const list = ref<Message[]>()
let socket: Socket
onMounted(async () => {
  // 连接websocket
  socket = io('https://consult-api.itheima.net/', {
    auth: {
      token: 'Bearer ' + store.user?.token
    },
    query: {
      orderId: route.query.orderId
    }
  })

  // 监听是否连接成功
  socket.on('connect', () => {
    console.log('连接成功')
  })

  // 监听是否断开链接
  socket.on('disconnect', () => {
    console.log('断开链接')
  })

  // 监听是否连接失败
  socket.on('error', (event) => {
    console.log('连接失败', event)
  })

  // 监听默认的聊天信息
  socket.on('chatMsgList', ({ data }: { data: TimeMessages[] }) => {
    const arr: Message[] = []

    console.log('e', data)
    data.forEach((item) => {
      arr.push({
        msgType: MsgType.Notify,
        createTime: item.createTime,
        id: item.createTime,
        msg: { content: item.createTime }
      })
      arr.push(...item.items)
    })
    console.log('arr', arr)
    list.value = arr
  })

  // 监听订单状态是否改变
  socket.on('statusChange', () => {
    console.log('123')
    initOrderDetail()
  })

  // 接收消息
  socket.on('receiveChatMsg', async (event) => {
    list.value?.push(event)
    console.log('list', list.value)

    await nextTick()
    window.scrollTo(0, document.body.scrollHeight)
  })
})

const consult = ref<ConsultOrderItem>()
const initOrderDetail = async () => {
  const orderRes = await getOrderDetail(route.query.orderId as string)
  console.log('orderRes', orderRes)
  consult.value = orderRes.data
}
initOrderDetail()

const sendText = async (text: string) => {
  console.log('text', text)
  socket.emit('sendChatMsg', {
    // 发送人
    from: store.user?.id,
    // 接收人
    to: consult.value?.docInfo?.id,
    // 发送消息的类型
    msgType: MsgType.MsgText,
    // 消息内容
    msg: {
      content: text
    }
  })
}
</script>

<template>
  <div class="room-page">
    <cp-nav-bar title="医生问诊室"></cp-nav-bar>
    <room-status :status="consult?.status" :countdown="consult?.countdown"></room-status>
    <room-message :list="list"></room-message>
    <room-action
      @send-text="sendText"
      :disabled="consult?.status === OrderType.ConsultChat ? false : true"
    ></room-action>
    <!--<van-button @click="$router.push('/order/pay?id=6938560516042752')">购买药品</van-button> -->
  </div>
</template>

<style lang="scss" scoped>
.room-page {
  padding-top: 24vw;
  padding-bottom: 16vw;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: var(--cp-bg);
}
</style>
