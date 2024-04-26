<template>
  <div class="container">
    <nav-bar title="登录密码" />
    <van-form @submit="handlerChangePwd">
      <div class="content">
        <div class="forms">
          <div class="tips">
            <div>
              <van-icon name="success" />
              &nbsp; 密码长度至少为6
            </div>
          </div>
          <Custom-Input
            label="手机号"
            :value="form.mobile"
            @blur="(val) => (form.mobile = val)"
            type="digit"
            placeholder="请输入手机号"
            :rules="[{ validator: mobileValidator, trigger: 'onSubmit' }]"
          >
          </Custom-Input>
          <Custom-Input
            label="新密码"
            :value="form.newPassword"
            @blur="(val) => (form.newPassword = val)"
            :type="showNewPwd ? 'text' : 'password'"
            placeholder="请输入新密码"
            :rules="[{ validator: newPwdValidator, trigger: 'onSubmit' }]"
          >
            <template #right>
              <icon-park
                :name="showNewPwd ? 'preview-close-one' : 'preview-open'"
                size="1.5rem"
                @click.stop="showNewPwd = !showNewPwd"
              />
            </template>
          </Custom-Input>
          <Custom-Input
            label="新密码确认"
            :value="form.repeatPwd"
            @blur="(val) => (form.repeatPwd = val)"
            :type="showRepNewPwd ? 'text' : 'password'"
            placeholder="请确认新密码"
            :rules="[{ validator: repeatNewPwdValidator, trigger: 'onSubmit' }]"
          >
            <template #right>
              <icon-park
                :name="showRepNewPwd ? 'preview-close-one' : 'preview-open'"
                size="1.5rem"
                @click.stop="showRepNewPwd = !showRepNewPwd"
              />
            </template>
          </Custom-Input>
        </div>
      </div>
      <div class="bottom">
        <van-button round block color="#000000" native-type="submit"> Submit </van-button>
      </div>
    </van-form>
  </div>
</template>
<script setup>
import NavBar from '@/components/CustomNavBar/index.vue'
import CustomInput from '@/components/Input/index.vue'
import toast from '@/utils/toast.js'
import { resetpwd } from '@/api/user.js'
import useUserStore from '@/stores/modules/user.js'
const userStore = useUserStore()
const form = ref({
  mobile: undefined,
  newPassword: undefined,
  repeatPwd: undefined
})
const showPwd = ref(false)
const showNewPwd = ref(false)
const showRepNewPwd = ref(false)
const mobileValidator = (val) => {
  if (!val) {
    return '请输入手机号'
  }
}
const newPwdValidator = (val) => {
  if (!val) {
    return '请输入新密码'
  } else {
    if (val.length < 6) {
      return '请按要求填写密码'
    }
    return true
  }
}
const repeatNewPwdValidator = (val) => {
  if (!val) {
    return '请确认新密码'
  } else {
    if (val !== form.value.newPassword) {
      return '两次密码不一致'
    }
    return true
  }
}
const router = useRouter()
const handlerChangePwd = () => {
  toast.loading()
  resetpwd({
    newpassword: form.value.newPassword,
    mobile: form.value.mobile
  })
    .then((res) => {
      toast.success('修改成功')
      userStore.afterRePwd().then(() => {
        router.push({ name: 'Login' })
      })
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
    padding-top: 1rem;
    height: calc(100dvh - (50px + 70px));
    .forms {
      .tips {
        padding: 1.2em 0 0.5em 0;
        display: flex;
        flex-direction: column;
        font-size: 0.8em;
        font-weight: 500;
        color: rgba(0, 197, 102, 1);
      }
      ::v-deep(.van-cell) {
        border-radius: 0 !important;
      }
    }
  }
}
</style>
