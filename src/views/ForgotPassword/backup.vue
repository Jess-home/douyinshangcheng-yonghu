<template>
  <div class="container">
    <App-Header title="忘记密码" />
    <van-form @submit="handlerGoChangePwd">
      <div class="content">
        <div class="forgot-content-top">
          <div class="forgot-tip">
            <van-icon color="#bdbdbd" size="28px" name="info" />
            <div class="tip-words">
              We will send the OTP code to your email for security in forgetting your password
            </div>
          </div>
          <div class="forms">
            <custom-input
              :value="form.email"
              label="e-mail"
              @blur="(val) => (form.email = val)"
              :rules="[{ validator: emailValidator, trigger: 'onSubmit' }]"
            />
          </div>
        </div>
      </div>
      <div class="bottom">
        <van-button round block color="#000000" native-type="submit"> Submit </van-button>
      </div>
    </van-form>
  </div>
</template>
<script setup>
import AppHeader from '@/components/CustomNavBar/index.vue'
import CustomInput from '@/components/Input/index.vue'
import toast from '@/utils/toast.js'
import { regEmail } from '@/utils/regExp.js'
const form = ref({
  email: undefined
})
const emailValidator = (val) => {
  if (!val) {
    return '请填写邮箱'
  } else {
    if (!regEmail(val)) {
      return '请填写正确的邮箱'
    }
    return true
  }
}
const router = useRouter()
const handlerGoChangePwd = () => {
  router.push({ name: 'ChangePassword' })
}
</script>
<style lang="scss" scoped>
@import url('@/assets/style/main.scss');
.container {
  padding: 0;
  .content {
    height: calc(100dvh - 120px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .forgot-content-top {
      padding: 2rem 0 1rem 0;
      .forgot-tip {
        padding: 1rem;
        background: #ffffff;
        display: flex;
        flex-direction: row;
        align-items: center;
        .tip-words {
          padding-left: 1.4rem;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.3px;
          line-height: 1.4rem;
          color: #191919;
        }
      }
    }
    .forms {
      padding-top: 2rem;
      ::v-deep(.van-cell) {
        border-radius: 0 !important;
      }
    }
  }
}
</style>
