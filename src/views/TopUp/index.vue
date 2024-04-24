<script setup>
import NavBar from '@/components/CustomNavBar/index.vue'
const list = [
  { path: '/walletTopUp', name: '链上充值', icon: 'bitcoin' },
  // { path: '/cardTopUp', name: '银行卡充值', icon: 'bank-card' },
  { path: '', name: '人工充值', icon: 'headset-one' }
]
const router = useRouter()
const goRoute = (item) => {
  router.push({ path: item.path })
}
const goRecord = () => {
  router.push({ name: 'CapitalRecord' })
}
</script>
<template>
  <NavBar title="充值" @right-click="goRecord">
    <template #right>
      <div style="padding-right: 1rem; font-size: 1.2rem">记录</div>
    </template>
  </NavBar>
  <main class="mx-3">
    <div class="flex justify-center items-center mt-10">
      <img alt="" class="w-3/4" src="@/assets/icons/yan.png" />
    </div>
    <h5 class="mt-3 text-base font-semibold">充值方式</h5>
    <div
      v-for="(item, index) in list"
      :key="index"
      class="bg-white rounded-md mt-3 flex items-center py-3"
      @click="goRoute(item)"
    >
      <div class="mx-3">
        <icon-park :name="item.icon" size="1.8rem" />
      </div>
      <div>
        <span>{{ item.name }}</span>
      </div>
    </div>
  </main>
</template>
<style lang="scss" scoped></style>
