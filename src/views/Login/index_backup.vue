<script setup>
import useUserStore from '@/stores/modules/user.js'
import toast from '@/utils/toast.js'
const userStore = useUserStore()
const router = useRouter()
const form = ref({
  account: undefined,
  password: undefined
})
const handlerLogin = async () => {
  toast.loading({ msg: '登录中...' })
  userStore
    .login(form.value)
    .then(() => {
      router.push({ name: 'Home' })
    })
    .catch((err) => {})
    .finally(() => {
      toast.close()
    })
}
</script>

<template>
  <div class="container">
    <div class="header flex justify-center pt-10 items-center flex-col">
      <span class="text-white mt-5 font-semibold text-3xl"> Hi, Welcome Back!👋 </span>
      <span class="text-white mt-3 font-semibold text-1xl"> Lorem ipsum dolor sit amet </span>
    </div>
    <div class="bg-white fixed bottom-0 w-dvw rounded-t-3xl" style="height: 75vh">
      <div class="mt-20 mx-3">
        <div class="py-3">
          <span style="color: #78828a">Username</span>
        </div>
        <input
          v-model.trim="form.account"
          type="text"
          placeholder="手机号或者邮箱"
          class="w-full h-12 rounded-3xl pl-3"
          style="background-color: #f6f8fe"
        />
        <div class="py-3">
          <span style="color: #78828a">Password</span>
        </div>
        <input
          v-model="form.password"
          type="text"
          placeholder="手机号或者邮箱"
          class="w-full h-12 rounded-3xl pl-3"
          style="background-color: #f6f8fe"
        />
        <div
          @click="handlerLogin"
          class="bg-black text-white h-14 rounded-3xl flex justify-center items-center mt-10"
        >
          <span>登录</span>
        </div>
        <div class="flex justify-center items-center mt-10">
          <span style="color: #6c6c6c">Don’ t have an account? </span>
          <span style="color: #31452e" @click="router.push('/register')">Sign Up</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  background-color: #fe2c55;
  height: 100vh;

  .header {
  }
}
</style>
