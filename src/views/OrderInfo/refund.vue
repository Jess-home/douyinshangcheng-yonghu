<template>
  <div class="container">
    <nav-bar title="申请退款" />
    <van-form @submit="handlerSubmit">
      <div class="content">
        <custom-input label="订单号" readonly :value="form.sn" />
        <custom-input
          label="退款类型"
          readonly
          :value="form.typeName"
          @click="showChooseType = true"
        >
          <template #right>
            <icon-park name="right" size="1.8rem" />
          </template>
        </custom-input>
        <custom-input
          label="货物状态"
          readonly
          :value="form.statusName"
          @click="showChooseStatus = true"
        >
          <template #right>
            <icon-park name="right" size="1.8rem" />
          </template>
        </custom-input>
        <custom-input
          label="退款金额"
          required
          placeholder="请输入退款金额"
          type="number"
          :value="form.amount"
          @blur="(val) => (form.amount = val)"
          :rules="[{ validator: amountValidator, trigger: 'onSubmit' }]"
        />
        <custom-input
          label="原因"
          required
          placeholder="请输入原因"
          :value="form.reason_type"
          @blur="(val) => (form.reason_type = val)"
          type="textarea"
          :rules="[{ required: true, message: '请输入原因', trigger: 'onSubmit' }]"
        />
        <custom-input
          label="说明"
          required
          placeholder="请输入说明"
          :value="form.refund_explain"
          @blur="(val) => (form.refund_explain = val)"
          type="textarea"
          :rules="[{ required: true, message: '请输入说明', trigger: 'onSubmit' }]"
        />
        <div class="uploader-label">附件</div>
        <van-uploader
          ref="uploadRef"
          v-model="fileList"
          upload-icon="plus"
          :after-read="afterRead"
          @delete="handlerDeleteFile"
        >
        </van-uploader>
      </div>
      <div class="bottom">
        <van-button block round color="#191919" native-type="submit"> 提交 </van-button>
      </div>
    </van-form>
    <van-action-sheet v-model:show="showChooseType" :actions="types" @select="handlerChooseType" />
    <van-action-sheet
      v-model:show="showChooseStatus"
      :actions="statuses"
      @select="handlerChooseStatus"
    />
  </div>
</template>
<script setup>
import { refundOrder } from '@/api/order.js'
import { uploadFile } from '@/api/common.js'
import toast from '@/utils/toast.js'
import CustomInput from '@/components/Input/index.vue'
const form = ref({
  order_id: undefined,
  sn: undefined,
  amount: undefined,
  service_type: '0',
  typeName: '我要退款(无需退货)',
  receiving_status: '0',
  statusName: '未收到',
  reason_type: undefined,
  refund_explain: undefined,
  images: undefined,
  order_product_id: undefined
})
const amountValidator = (val) => {
  if (!val) {
    return '请输入退款金额'
  } else {
    if (val < 0) {
      return '退款金额不能为负数'
    } else {
      return true
    }
  }
}
const showChooseType = ref(false)
const types = ref([
  { name: '我要退款(无需退货)', value: '0' },
  { name: '我要退货退款', value: '1' }
])
const handlerChooseType = (item) => {
  showChooseType.value = false
  form.value.service_type = item.value
  form.value.typeName = item.name
}
const showChooseStatus = ref(false)
const statuses = ref([
  { name: '未收到', value: '0' },
  { name: '已收到', value: '1' }
])
const handlerChooseStatus = (item) => {
  showChooseStatus.value = false
  form.value.receiving_status = item.value
  form.value.statusName = item.name
}
const fileList = ref([])
const urls = ref([])
const afterRead = (file) => {
  toast.loading({ msg: '上传中...' })
  const formData = new FormData()
  formData.append('file', file.file)
  uploadFile(formData)
    .then((res) => {
      toast.success({ msg: '上传成功' })
      urls.value.push(res.data.fullurl)
    })
    .catch((err) => {})
}
const handlerDeleteFile = (data) => {
  const _url = data.objectUrl.slice(data.objectUrl.indexOf(':') + 1)
  urls.value.splice(urls.value.indexOf(_url), 1)
}
const route = useRoute()
const router = useRouter()
const handlerSubmit = () => {
  if (!urls.value.length) {
    toast.show({ msg: '请上传证明附件' })
    return
  }
  toast.loading()
  form.value.images = urls.value.join(',')
  refundOrder(form.value)
    .then((res) => {
      toast.success({ msg: '申请成功' })
      router.back()
    })
    .catch((err) => err)
}
onMounted(() => {
  form.value.order_id = route.params.id
  form.value.sn = route.params.sn
  form.value.order_product_id = route.params.product_ids
  form.value.amount = parseFloat(route.params.amount)
})
</script>
<style lang="scss" scoped>
@import url('@/assets/style/main.scss');
.container {
  padding: 0;
  overflow-y: hidden;
  .content {
    overflow-y: auto;
    height: calc(100dvh - 120px);
    .uploader-label {
      padding: 1em 0 0 0;
      font-size: 1em;
      font-weight: 600;
      letter-spacing: 0.07px;
      color: rgba(120, 130, 138, 1);
    }
    ::v-deep(.van-cell) {
      border-radius: 0 !important;
    }
  }
}
::v-deep(.van-uploader__upload) {
  margin-top: 1rem;
  background: #ffffff;
  width: 6rem;
  height: 6rem;
  border-radius: 1rem;
}
::v-deep(.van-image .van-uploader__preview-cover) {
  width: 6rem;
  height: 6rem;
  border-radius: 1rem;
}
::v-deep(.van-uploader__preview) {
  margin: 1rem 1rem 0 0;
}
</style>
