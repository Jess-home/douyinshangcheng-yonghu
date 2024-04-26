<template>
  <div class="container">
    <nav-bar title="注册" />
    <van-form @submit="handlerRegister">
      <div class="content">
        <custom-input
          :required="true"
          label="姓氏"
          placeholder="请输入姓氏"
          :value="form.username"
          @blur="(val) => (form.username = val)"
          :rules="[{ required: true, message: '请输入姓氏', trigger: 'onSubmit' }]"
        />
        <custom-input
          :required="true"
          label="名称"
          placeholder="请输入名称"
          :value="form.nickname"
          @blur="(val) => (form.nickname = val)"
          :rules="[{ required: true, message: '请输入名称', trigger: 'onSubmit' }]"
        />
        <custom-input
          :required="true"
          label="密码"
          placeholder="请输入密码"
          :value="form.password"
          @blur="(val) => (form.password = val)"
          :type="showPwd ? 'text' : 'password'"
          :rules="[{ required: true, message: '请输入密码', trigger: 'onSubmit' }]"
        >
          <template #right>
            <icon-park
              :name="showPwd ? 'preview-close-one' : 'preview-open'"
              size="1.5rem"
              @click.stop="showPwd = !showPwd"
            />
          </template>
        </custom-input>
        <custom-input
          :required="true"
          label="密码确认"
          placeholder="请确认密码"
          :value="form.repPwd"
          @blur="(val) => (form.repPwd = val)"
          :type="showRepPwd ? 'text' : 'password'"
          :rules="[{ validator: validatorRepeatPwd, trigger: 'onSubmit' }]"
        >
          <template #right>
            <icon-park
              :name="showRepPwd ? 'preview-close-one' : 'preview-open'"
              size="1.5rem"
              @click.stop="showRepPwd = !showRepPwd"
            />
          </template>
        </custom-input>
        <custom-input
          :required="true"
          label="邮箱"
          placeholder="请输入邮箱"
          :value="form.email"
          @blur="(val) => (form.email = val)"
          :rules="[{ validator: validatorEmail, trigger: 'onSubmit' }]"
        />
        <custom-input
          :required="true"
          label="手机号"
          placeholder="请输入手机号"
          :value="form.mobile"
          @blur="(val) => (form.mobile = val)"
          :rules="[{ validator: validatorMobile, trigger: 'onSubmit' }]"
        />
      </div>
      <div class="bottom">
        <van-button round block color="#191919" native-type="submit">注册</van-button>
      </div>
    </van-form>
  </div>
</template>
<script setup>
import { register } from '@/api/user.js'
import toast from '@/utils/toast.js'
import CustomInput from '@/components/Input/index.vue'
import { regMobile, regEmail } from '@/utils/regExp.js'
const form = ref({
  username: undefined,
  nickname: undefined,
  password: undefined,
  repPwd: undefined,
  email: undefined,
  mobile: undefined
})
const showPwd = ref(false)
const showRepPwd = ref(false)
const validatorRepeatPwd = (val) => {
  if (!val) {
    return '请确认密码'
  } else {
    if (val !== form.value.password) {
      return '两次密码不一致'
    }
    return true
  }
}
const validatorEmail = (val) => {
  if (!val) {
    return '请输入邮箱'
  } else {
    if (!regEmail(val)) {
      return '请填写正确的邮箱'
    }
    return true
  }
}
const validatorMobile = (val) => {
  if (!val) {
    return '请输入手机号'
  } else {
    if (!regMobile(val)) {
      return '请填写正确的手机号'
    }
    return true
  }
}
const router = useRouter()
const handlerRegister = () => {
  toast.loading()
  register(form.value)
    .then((res) => {
      toast.success({ msg: '注册成功' })
      router.push({ name: 'Login' })
    })
    .catch((err) => err)
}
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
  }
}
</style>
