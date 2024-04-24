<template>
  <NavBar title="资金记录" />
  <div class="container">
    <div style="height: 60px;" class="pl-3 flex items-center py-3">
      <span
        class="font-normal text-black text-base pr-3"
        v-for="item in types"
        :key="item.value"
        :class="queryParams.type == item.value ? 'font-semibold text-black' : ''"
        @click.stop="handlerTypeClick(item)"
      >
        {{ item.label }}
      </span>
    </div>
    <refresh-list
      class="content"
      v-if="data.length"
      :data="refreshData"
      @refresh="onRefresh"
      @load="onLoad"
    >
      <van-space direction="vertical" fill size="0.9rem">
        <div
          style="box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08)"
          class="bg-white h-20 rounded-md flex"
          v-for="item in data"
          :key="item.id"
        >
          <div class="flex justify-center items-center mx-3">
            <icon-park name="finance" size="2.5rem" />
          </div>
          <div class="flex-auto flex flex-col justify-center">
            <span class="text-base font-normal">
              {{ item.type === 'recharge' ? '充值' : '提现' }}
            </span>
            <span class="text-sm opacity-80">
              {{ item.createtime }}
            </span>
          </div>
          <div class="flex justify-center items-center mx-3">
            <icon-park
              :color="item.type === 'recharge' ? '#00B557' : '#fe4857'"
              name="plus"
              size="1.6rem"
            />
            <span
              class="text-base font-medium"
              :class="item.type === 'recharge' ? 'text-green' : 'text-red'"
            >
              {{ item.money }}
            </span>
          </div>
        </div>
      </van-space>
    </refresh-list>
  </div>
</template>
<script setup>
import NavBar from '@/components/CustomNavBar/index.vue'
import RefreshList from '@/components/RefreshList/index.vue'
import { billList as list } from '@/api/user.js'
import toast from '@/utils/toast.js'
const types = ref([
  { value: 'all', label: '全部' },
  { value: 'recharge', label: '充值' },
  { value: 'extract', label: '提现' }
])
const handlerTypeClick = (type) => {
  queryParams.value.type = type.value
  queryParams.value.page = 1
  handleQuery()
}
const queryParams = ref({
  page: 1,
  limit: 10,
  type: 'all'
})
const refreshData = ref({
  loading: false,
  listLoading: false,
  finished: false,
  disabled: true
})
const data = ref([])
const count = ref(0)
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
handleQuery()
</script>
<style lang="scss" scoped>
@import url('@/assets/style/main.scss');
.container {
  padding: 0;
  overflow-y: hidden;
  .content {
    padding: 1rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    overflow-y: auto;
    height: calc(100dvh - 110px);
    .text-green {
      color: #00b557;
    }
    .text-red {
      color: #fe4857;
    }
  }
}
</style>
