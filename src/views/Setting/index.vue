<template>
  <div class="container">
    <nav-bar title="设置" />
    <div class="top">
      <list-menus :menus="menus" @click="handlerMenuClick" />
    </div>
    <div class="bottom">
      <van-button @click="handlerCancel" block round color="#191919"> 退出 </van-button>
    </div>
  </div>
</template>
<script setup>
import ListMenus from '@/components/ListMenus/index.vue'
import useUserStore from '@/stores/modules/user.js'
import { showConfirmDialog } from 'vant'
import toast from '@/utils/toast.js'
const menus = ref([
  // {
  //   name: '忘记密码',
  //   iconName: 'setting-two',
  //   routeName: 'ForgotPassword'
  // },
  {
    name: '修改密码',
    iconName: 'shield',
    routeName: 'Passwords'
  },
  {
    name: '帮助与支持',
    iconName: 'help',
    routeName: 'HelpAndSupport'
  },
  {
    name: '客服',
    iconName: 'headset-one',
    routeName: 'Service'
  }
])
const router = useRouter()
const userStore = useUserStore()
const handlerMenuClick = (menu) => {
  if (menu.routeName) {
    router.push({ name: menu.routeName })
    return
  }
}
const handlerCancel = () => {
  showConfirmDialog({
    title: '退出确认',
    message: '是否确认退出?'
  })
    .then(() => {
      toast.loading({ msg: '退出中...' })
      userStore
        .logOut()
        .then(() => {
          router.push({ name: 'Login' })
        })
        .finally(() => {
          toast.close()
        })
    })
    .catch(() => {})
}
</script>
<style lang="scss" scoped>
@import url('@/assets/style/main.scss');
.container {
  padding: 0;
  position: relative;
  .top {
    padding: 1rem 1rem 0 1rem;
  }
  .bottom {
    padding: 1rem;
    width: 100%;
    position: fixed;
    bottom: 0;
  }
}
</style>
