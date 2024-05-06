<template>
  <div class="container">
    <nav-bar :title="$t('register')" />
    <van-form @submit="handlerRegister">
      <div class="content">
        <custom-input
          :required="true"
          :label="$t('familyName')"
          :placeholder="$t('placeholderFamilyName')"
          :value="form.username"
          @blur="(val) => (form.username = val)"
          :rules="[{ required: true, message: $t('placeholderFamilyName'), trigger: 'onSubmit' }]"
        />
        <custom-input
          :required="true"
          :label="$t('givenName')"
          :placeholder="$t('placeholderGivenName')"
          :value="form.nickname"
          @blur="(val) => (form.nickname = val)"
          :rules="[{ required: true, message: $t('placeholderGivenName'), trigger: 'onSubmit' }]"
        />
        <custom-input
          :required="true"
          :label="$t('password')"
          :placeholder="$t('placeholderPassword')"
          :value="form.password"
          @blur="(val) => (form.password = val)"
          :type="showPwd ? 'text' : 'password'"
          auto-complete=""
          :rules="[{ required: true, message: $t('placeholderPassword'), trigger: 'onSubmit' }]"
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
          :label="$t('confirmPassword')"
          :placeholder="$t('pleaseConfirmPassword')"
          :value="form.repPwd"
          @blur="(val) => (form.repPwd = val)"
          :type="showRepPwd ? 'text' : 'password'"
          auto-complete=""
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
          :label="$t('email')"
          :placeholder="$t('placeholderEmail')"
          :value="form.email"
          @blur="(val) => (form.email = val)"
          :rules="[{ validator: validatorEmail, trigger: 'onSubmit' }]"
        />
        <custom-input
          :required="true"
          :label="$t('mobile')"
          :placeholder="$t('placeholderMobilePhone')"
          :value="form.mobile"
          @blur="(val) => (form.mobile = val)"
          :rules="[{ validator: validatorMobile, trigger: 'onSubmit' }]"
        />
      </div>
      <div class="bottom">
        <van-button round block color="#191919" native-type="submit">{{
          $t('register')
        }}</van-button>
      </div>
    </van-form>
  </div>
</template>
<script setup>
import { register } from '@/api/user.js'
import toast from '@/utils/toast.js'
import CustomInput from '@/components/Input/index.vue'
import {  regEmail } from '@/utils/regExp.js'
const { proxy } = getCurrentInstance()
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
    return proxy.t('pleaseConfirmPassword')
  } else {
    if (val !== form.value.password) {
      return proxy.t('twoPasswordsNotMatch')
    }
    return true
  }
}
const validatorEmail = (val) => {
  if (!val) {
    return proxy.t('placeholderEmail')
  } else {
    if (!regEmail(val)) {
      return proxy.t('pleasFillCorrectEmail')
    }
    return true
  }
}
const validatorMobile = (val) => {
  if (!val) {
    return proxy.t('placeholderMobilePhone')
  } else {
    // if (!regMobile(val)) {
    //   return proxy.t('pleasFillCorrectMobilePhoneNumber')
    // }
    return true
  }
}
const router = useRouter()
const handlerRegister = () => {
  toast.loading()
  register(form.value)
    .then((res) => {
      toast.success({ msg: proxy.t('registerSuccess') })
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
