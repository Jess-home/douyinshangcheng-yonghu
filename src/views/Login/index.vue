<template>
  <div class="container">
    <div class="login-container">
      <div class="to-home" @click="goHome">
        <icon-park name="left" size="1.6rem" />
        &nbsp;回到首页
      </div>
      <div class="welcome">欢迎来到SHOP</div>
      <div class="login-type">
        <van-space size="1rem">
          <div
            v-for="(item, index) in types"
            :key="index"
            :class="type === item.value ? 'type-selected' : ''"
            @click="type = item.value"
          >
            {{ item.name }}
          </div>
        </van-space>
      </div>
      <div class="login-forms">
        <div class="form-input">
          <custom-input
            :value="form.account"
            @blur="(val) => (form.account = val)"
            placeholder="请输入账号"
          >
            <template #left>
              <div class="form-label">账号</div>
            </template>
          </custom-input>
        </div>
        <div class="form-input pwd-input">
          <custom-input
            :value="form.password"
            @blur="(val) => (form.password = val)"
            :type="showPwd ? 'text' : 'password'"
            placeholder="请输入密码"
          >
            <template #left>
              <div class="form-label">密码</div>
            </template>
            <template #right>
              <icon-park
                :name="showPwd ? 'preview-close-one' : 'preview-open'"
                size="1.5rem"
                @click.stop="showPwd = !showPwd"
              />
            </template>
          </custom-input>
        </div>
        <div v-if="type === 1" class="form-input pwd-input">
          <custom-input
            :value="form.repPassword"
            @blur="(val) => (form.repPassword = val)"
            :type="showRepPwd ? 'text' : 'password'"
            placeholder="请再次输入密码"
          >
            <template #left>
              <div class="form-label">密码确认</div>
            </template>
            <template #right>
              <icon-park
                :name="showRepPwd ? 'preview-close-one' : 'preview-open'"
                size="1.5rem"
                @click.stop="showRepPwd = !showRepPwd"
              />
            </template>
          </custom-input>
        </div>
        <div v-else class="forget-pwd" @click="handlerForgetPwd">忘记密码</div>
      </div>
      <div class="login-button">
        <van-button @click.stop="handlerLogin" color="#191919" block round>
          {{ type === 0 ? '登录' : '注册' }}
        </van-button>
      </div>
      <div @click="handlerRegister" class="go-register">
        去注册
        <!-- <van-icon style="padding-left: 0.5rem" name="arrow" size="1.2rem" /> -->
      </div>
    </div>
    <!-- <div class="social-container">
      <van-divider>社交账号登录</van-divider>
      <div class="social-items">
        <van-image @click="handlerSocialLogin" width="4rem" height="auto" :src="Twitter" />
        <van-image @click="handlerSocialLogin" width="4rem" height="auto" :src="FaceBook" />
        <van-image @click="handlerSocialLogin" width="4rem" height="auto" :src="Google" />
      </div>
    </div> -->
  </div>
</template>

<script setup name="Login">
import FaceBook from '@/assets/image/facebook.png'
import Google from '@/assets/image/google.png'
import Twitter from '@/assets/image/twitter.png'
import toast from '@/utils/toast.js'
import CustomInput from '@/components/Input/index.vue'
import useUserStore from '@/stores/modules/user.js'
import { register } from '@/api/user.js'
const type = ref(0)
const types = ref([
  { name: '账号登录', value: 0 }
  // { name: '账号注册', value: 1 }
])
const userStore = useUserStore()
const router = useRouter()
const form = ref({
  account: undefined,
  password: undefined,
  repPassword: undefined
})
const showPwd = ref(false)
const showRepPwd = ref(false)
const goHome = () => {
  router.replace({ name: 'Home' })
}
const handlerLogin = async () => {
  if (!form.value.account || !form.value.password) {
    toast.show({ msg: '请输入账号和密码' })
    return
  }
  toast.loading({ msg: '登录中...' })
  userStore
    .login(form.value)
    .then(() => {
      toast.success({ msg: '登录成功' })
      router.push({ name: 'Home' })
    })
    .catch((err) => {})
}
const handlerRegister = () => {
  router.push({ name: 'Register' })
}
const handlerForgetPwd = () => {
  router.push({ name: 'ForgotPassword' })
}
const handlerSocialLogin = () => {
  toast.show({ msg: '暂未开放', duration: 2000 })
}
</script>
<style lang="scss" scoped>
@import url('@/assets/style/main.scss');
.container {
  padding: 2rem;
  height: 100dvh;
  background: #ffffff;
  .login-container {
    flex: 5;
    padding-top: 1.8rem;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    .to-home {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-weight: 500;
      font-size: 1rem;
      color: #191919;
      line-height: 1.6rem;
    }
    .welcome {
      padding-top: 2rem;
      font-weight: 600;
      font-size: 2rem;
      color: #191919;
      line-height: 2.2rem;
    }
    .login-type {
      padding-top: 4.5rem;
      font-weight: 400;
      font-size: 1.2rem;
      color: #191919;
      line-height: 1.4rem;
      display: flex;
      flex-direction: row;
      .type-selected {
        font-weight: 600;
        font-size: 1.2rem;
        color: #191919;
        line-height: 1.4rem;
      }
    }
    .login-forms {
      padding-top: 2.2rem;
      .form-input {
        .form-label {
          font-weight: 400;
          font-size: 1rem;
          color: #191919;
          line-height: 2rem;
          background: #f7f7f7;
          padding-left: 1rem;
        }
        ::v-deep(.van-cell) {
          padding: 0;
          border-radius: 24px;
        }
        ::v-deep(.van-field__control) {
          padding: 10px;
          background: #f7f7f7;
        }
        ::v-deep(.input-field) {
          background: #f7f7f7;
        }
      }
      .pwd-input {
        padding-top: 2rem;
      }
    }
    .forget-pwd {
      padding: 2rem 1rem 0 0;
      font-weight: 400;
      font-size: 0.72rem;
      color: #000000;
      line-height: 0.9rem;
      text-align: right;
    }
    .login-button {
      padding-top: 6.5rem;
    }
    .go-register {
      padding-top: 3rem;
      font-weight: 500;
      font-size: 1rem;
      color: #191919;
      line-height: 1.6rem;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
    }
  }
  .social-container {
    flex: 2;
    .social-items {
      padding-top: 2rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
