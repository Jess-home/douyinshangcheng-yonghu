<template>
  <header>
    <nav-bar title="我的订单" />
    <van-tabs v-model:active="active">
      <van-tab v-for="item in tabs" :key="item.status" :name="item.status" :title="item.title">
      </van-tab>
    </van-tabs>
  </header>
  <main class="overflow-y-auto">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      :immediate-check="false"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div
        class="bg-white mx-3 mt-3 rounded-md back_3 back_4"
        v-for="item in list"
        :key="item.order_id"
      >
        <div class="flex items-center pt-1.5">
          <van-icon class="mx-3" name="ellipsis" size="24" />
          <span class="ml-auto mr-3">待付款</span>
        </div>
        <div class="flex px-3">
          <div>
            <van-image
              :src="item.product[0].image"
              height="100"
              lazy-load
              radius="10px"
              width="100"
            >
              <template v-slot:loading>
                <van-loading size="20" type="spinner" />
              </template>
            </van-image>
          </div>
          <div class="ml-3 mt-3 flex-auto">
            <div class="w-60">
              <span class="van-ellipsis" style="display: block">
                {{ item.product[0].title }}
              </span>
            </div>
            <div>
              <span class="text-neutral-500 text-sm"> 订单号: </span>
              <span class="font-semibold">
                {{ item.order_sn }}
              </span>
            </div>
            <div class="flex">
              <div class="text-right py-1">
                <span class="text-neutral-500 text-sm">数量</span>
                <span class="text-lg font-semibold pl-3">{{ item.total_num }}</span>
              </div>
              <div class="text-right py-1 ml-auto">
                <span class="text-neutral-500 text-sm">总价</span>
                <span class="text-lg font-semibold pl-3">{{ item.total_price }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-list>
  </main>
</template>
<script setup>
import { orderList } from '@/api/user.js'
//状态列表
const tabs = [
  {
    title: '全部',
    status: 'all'
  },
  {
    title: '待付款',
    status: 1
  },
  {
    title: '待发货',
    status: 2
  },
  {
    title: '待收货',
    status: 3
  },
  {
    title: '已完成',
    status: 4
  }
]

//当前选中的状态
const active = ref('all')

//订单列表
const list = ref([])

//列表加载状态
const loading = ref(false)
const finished = ref(false)
const page = ref(1)

//更新列表
const onLoad = () => {
  // 构造请求数据
  const params = {
    page: page.value,
    limit: 10,
    status: active.value
  }
  orderList(params).then((res) => {
    if (res.data.list.length > 0) {
      page.value++
      list.value.push(...res.data.list)
      loading.value = false
    } else {
      finished.value = true
    }
  })
}

//监听active变化
watch(
  active,
  (val) => {
    // const show = showLoadingToast({
    //   message: '加载中...',
    //   forbidClick: true,
    //   duration: 0
    // });
    list.value = []
    page.value = 1
    loading.value = true
    onLoad()
    // onLoad().then(() => {
    //   show.close(); // 在 onLoad 函数执行完毕后关闭 loading 提示
    // });
  },
  { immediate: true }
)
</script>
<style lang="scss" scoped>
:deep(.van-tabs__line) {
  background-color: #191919;
}
</style>
<style>
body {
  overflow-y: auto;
  height: 100vh;
  height: 100dvh;
}
</style>
