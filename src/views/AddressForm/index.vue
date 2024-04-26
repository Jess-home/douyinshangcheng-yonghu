<template>
  <div class="container">
    <nav-bar title="地址管理" />
    <van-form @submit="handlerPut">
      <div class="content">
        <custom-input
          :required="true"
          label="收件人"
          placeholder="请填写收件人"
          :value="form.name"
          @blur="(val) => (form.name = val)"
          :rules="[{ required: true, message: '请填写收件人', trigger: 'onSubmit' }]"
        />
        <custom-input
          :required="true"
          label="手机号"
          placeholder="请填写手机号"
          @blur="(val) => (form.mobile = val)"
          :value="form.mobile"
          :rules="[{ validator: mobileValidator, trigger: 'onSubmit' }]"
        >
        </custom-input>
        <custom-input
          :required="true"
          label="所在地区"
          placeholder="请填写所在地区"
          :rules="[{ required: true, message: '请填写详细地址', trigger: 'onSubmit' }]"
          :value="form.country"
          @blur="(val) => (form.country = val)"
        >
        </custom-input>
        <custom-input
          :required="true"
          label="详细地址"
          placeholder="请填写详细地址"
          type="textarea"
          :value="form.detail"
          @blur="(val) => (form.detail = val)"
          :rules="[{ required: true, message: '请填写详细地址', trigger: 'onSubmit' }]"
        />
        <custom-input
          :required="true"
          label="标签"
          placeholder="请填写标签"
          :value="form.tag"
          @blur="(val) => (form.tag = val)"
          :rules="[{ required: true, message: '请填写标签', trigger: 'onSubmit' }]"
        />
      </div>
      <div class="bottom">
        <van-button block round color="#191919" native-type="submit"> 保存 </van-button>
      </div>
    </van-form>
  </div>
</template>
<script setup>
import CustomInput from '@/components/Input/index.vue'
import { addAddress, getAddressInfo } from '@/api/user.js'
import toast from '@/utils/toast.js'
import { regMobile } from '@/utils/regExp.js'
const form = ref({
  name: undefined,
  mobile: undefined,
  province_id: undefined,
  city_id: undefined,
  area_id: undefined,
  detail: undefined,
  tag: undefined,
  is_default: 0,
  country: undefined
})
const mobileValidator = (val) => {
  if (!val) {
    return '请填写手机号'
  } else {
    if (!regMobile(val)) {
      return '请填写正确的手机号'
    }
    return true
  }
}
const router = useRouter()
const handlerPut = () => {
  toast.loading()
  addAddress(form.value)
    .then((res) => {
      toast.success({ msg: '保存成功' })
      router.back()
    })
    .catch((err) => err)
}
const route = useRoute()
onMounted(() => {
  if (route.params?.id) {
    toast.loading()
    getAddressInfo({ address_id: route.params.id })
      .then((res) => {
        form.value = res.data
      })
      .catch((err) => err)
      .finally(() => {
        toast.close()
      })
  }
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
    ::v-deep(.van-cell) {
      border-radius: 0 !important;
    }
    .bottom {
      position: sticky;
      bottom: 0;
    }
  }
}
</style>
