<script setup lang="ts">
import { ref } from 'vue'
import { showLoadingToast, closeToast, showToast } from 'vant'
import { uploadImage } from '@/services/consult'
defineProps<{
  disabled: boolean
}>()

const emit = defineEmits<{
  (e: 'send-text', text: string): void
  (e: 'send-image', { id: string, url: string }): void
}>()

// 将输入框输入的内容传递给父组件
// 父组件将接收到的消息通过websocket发送给服务端

const text = ref<string>('')

const sendText = () => {
  if (text.value.trim() === '') {
    return showToast('请输入内容')
  }
  emit('send-text', text.value)
  text.value = ''
}

// 图片上传
const afterRead = async (data) => {
  console.log('file', data)
  if (!data.file) return

  showLoadingToast('正在上传')

  const res = await uploadImage(data.file)
  closeToast()

  emit('send-image', res.data)
}
</script>

<template>
  <div class="room-action">
    <van-field
      type="text"
      class="input"
      :border="false"
      placeholder="问医生"
      autocomplete="off"
      :disabled="disabled"
      v-model="text"
      @keyup.enter="sendText"
    ></van-field>
    <van-uploader :preview-image="false" :disabled="disabled" :after-read="afterRead">
      <cp-icons name="consult-img" />
    </van-uploader>
  </div>
</template>

<style lang="scss" scoped>
.room-action {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  z-index: 1;
  box-sizing: border-box;
  .input {
    background-color: var(--cp-bg);
    border: none;
    border-radius: 25px;
    margin-right: 10px;
    padding: 8px 15px;
  }
  .cp-icon {
    width: 24px;
    height: 24px;
  }
}
</style>
