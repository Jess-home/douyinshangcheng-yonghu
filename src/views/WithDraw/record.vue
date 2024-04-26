<template>
  <nav-bar title="提现记录" />
  <div class="container">
    <div class="tabs">
      <van-tabs v-model:active="tabActive" @change="statusChange">
        <van-tab v-for="item in tabs" :key="item.value" :name="item.value" :title="item.name" />
      </van-tabs>
    </div>
    <refresh-list class="content" :data="refreshData" @refresh="onRefresh" @load="onLoad">
      <div
        v-if="data.length"
        style="box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08)"
        class="bg-white mx-3 mt-2 h-30 pt-3 pb-3 rounded-md flex"
        v-for="item in data"
        :key="item.id"
      >
        <div class="flex justify-center items-center mx-1">
          <icon-park name="finance" size="2.5rem" />
        </div>
        <div class="flex-auto flex flex-col justify-center mx-2">
          <span 
            class="text-base font-normal line-clamp-3 overflow-hidden text-gray-900" style="width: 220px"
          >
            {{ item.mark }}
          </span>
          <span class="text-sm opacity-80">
            {{ item.createtime }}
          </span>
          <span class="text-sm opacity-80"> 审核结果: {{ item.admin_msg }} </span>
        </div>
        <div class="flex flex-col justify-around items-stretch mx-0">
            <div class="flex flex-row justify-between mx-1 text-red">
                充值
                <span
                  class="text-base font-medium flex flex-col"
                >
                  {{ item.extract_price }}
                </span>
            </div>
            <div class="flex flex-row justify-between mx-1 text-black">
                手续费
                <span
                  class="text-base font-medium flex flex-col"
                >
                  {{ item.fee }}
                </span>
            </div>
            <div class="flex flex-row justify-between mx-1 text-green">
                实际到账
                <span
                  class="text-base font-medium flex flex-col"
                >
                  {{ item.real_price }}
                </span>
            </div>
        </div>
      </div>
      <van-empty v-else description="暂无相关记录"> </van-empty>
    </refresh-list>
  </div>
</template>
<script setup>
import NavBar from '@/components/CustomNavBar/index.vue'
import RefreshList from '@/components/RefreshList/index.vue'
import { depositRecord as list } from '@/api/user.js'
import toast from '@/utils/toast.js'
import { fund_record_statuses } from '@/utils/constants.js'
const tabActive = ref('all')
const tabs = ref(fund_record_statuses)
const data = ref([])
const count = ref(0)
const queryParams = ref({
  page: 1,
  limit: 10,
  status:'all',
})
const refreshData = ref({
  loading: false,
  listLoading: false,
  finished: false,
  disabled: true
})
const listData = async () => {
  const res = await list(queryParams.value)
  count.value = res.data.count
  if (res.data.list.length < queryParams.value.limit) {
    refreshData.value.finished = true
  }
  return res
}
const onRefresh = async () => {
  queryParams.value.page = 1
  refreshData.value.finished = false
  const res = await listData()
  data.value = res.data.list
  refreshData.value.loading = false
}
const onLoad = async () => {
  refreshData.value.listLoading = true
  queryParams.value.page += 1
  const res = await listData()
  data.value.push(...res.data.list)
  refreshData.value.listLoading = false
}
const handleQuery = async () => {
  toast.loading({ msg: '加载中...' })
  const res = await listData()
  data.value = res.data.list
  refreshData.value.disabled = false
  toast.close()
}
const statusChange = (val) => {
  queryParams.value.status = val
  queryParams.value.page = 1
  handleQuery()
}
handleQuery()
</script>
<style lang="scss" scoped>
@import url('@/assets/style/main.scss');
.container {
  overflow-y: hidden;
  padding: 0;
  .content {
    padding: 0;
    overflow-y: auto;
    height: calc(100dvh - 50px);
    .text-green {
      color: #00b557;
    }
    .text-red {
      color: #fe4857;
    }
  }
}
</style>
