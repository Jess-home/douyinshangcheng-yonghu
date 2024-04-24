<script setup>
import AppNavbar from '@/components/AppNavbar/index.vue'
const router = useRouter()
</script>
<template>
  <AppNavbar title="注册">
    <template #left>
      <img @click="router.back" src="@/assets/image/ArrowBack.png" class="h-10" alt="" />
    </template>
    <template #right> </template>
  </AppNavbar>
  <main class="mx-3">
    <div class="text-black pt-20 flex flex-col justify-center items-center">
      <span class="text-3xl"> Complet your account </span>
      <span style="color: #69737d" class="mt-3"> Lorem ipsum dolor sit amet </span>
    </div>
    <div class="mt-5 mx-3">
      <div class="py-3">
        <span style="color: #78828a">First Name</span>
      </div>
      <input
        type="text"
        placeholder="手机号或者邮箱"
        class="w-full h-12 rounded-3xl pl-3"
        style="background-color: #f6f8fe"
      />
      <div class="py-3">
        <span style="color: #78828a">Last Name</span>
      </div>
      <input
        type="text"
        placeholder="手机号或者邮箱"
        class="w-full h-12 rounded-3xl pl-3"
        style="background-color: #f6f8fe"
      />
      <div class="py-3">
        <span style="color: #78828a">Email</span>
      </div>
      <input
        type="text"
        placeholder="手机号或者邮箱"
        class="w-full h-12 rounded-3xl pl-3"
        style="background-color: #f6f8fe"
      />
      <div class="py-3">
        <span style="color: #78828a">E-mail</span>
      </div>
      <input
        type="text"
        placeholder="手机号或者邮箱"
        class="w-full h-12 rounded-3xl pl-3"
        style="background-color: #f6f8fe"
      />
      <div class="py-3">
        <span style="color: #78828a">Password</span>
      </div>
      <input
        type="text"
        placeholder="手机号或者邮箱"
        class="w-full h-12 rounded-3xl pl-3"
        style="background-color: #f6f8fe"
      />
      <div class="py-3">
        <span style="color: #78828a">Confirm Password</span>
      </div>
      <input
        type="text"
        placeholder="手机号或者邮箱"
        class="w-full h-12 rounded-3xl pl-3"
        style="background-color: #f6f8fe"
      />
      <div class="bg-black text-white h-14 rounded-3xl flex justify-center items-center mt-10">
        <span>登录</span>
      </div>
      <div class="flex justify-center items-center mt-10">
        <span style="color: #6c6c6c">Already have an account? </span>
        <span style="color: #31452e" @click="router.push('/login')">Login</span>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
