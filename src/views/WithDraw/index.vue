<template>
  <div class="container">
    <nav-bar title="提现">
      <template #right>
        <div 
          style="font-size:1.2rem;padding-right:1rem;"
          @click.stop="goRecord"
        >记录</div>
      </template>
    </nav-bar>
    <van-form @submit="handlerSubmit">
      <div class="content">
        <Custom-Input
          label="提现类型"
          :value="typeName"
          readonly
          @click="handlerShowChooseType"
        >
          <template #right>
            <icon-park @click.stop="handlerShowChooseType" name="right" size="1.5rem" />
          </template>
        </Custom-Input>
        <custom-input
          :label="priceLabel"
          placeholder="请输入提现金额"
          required
         :value="form.price"
          type="number"
          @blur="formatNumber"
          :rules="[{ validator:priceValidator, trigger:'onSubmit' }]"
        />
        <template v-if="form.extract_type===0">
          <!-- <custom-input
            label="银行卡号"
            required readonly
            :value="form.bank_card"
            :rules="[{ required: true, message: '请选择银行卡', trigger:'onSubmit' }]"
            @click="handlerShowChooseCard"
          >
          <template #right>
            <icon-park name="right" size="1.5rem" @click.stop="handlerShowChooseCard" />
          </template>
          </custom-input> -->
          <custom-input
            label="银行卡号"
            placeholder="请输入银行卡号"
            required
            defa
            :value="form.bank_card"
            @blur="(val) => (form.bank_card = val)"
            :rules="[{ required: true, message: '请输入银行卡号', trigger:'onSubmit' }]"
          />
          <custom-input
            label="银行名称"
            placeholder="请输入银行名称"
            required
            :value="form.bank_name"
            @blur="(val) => (form.bank_name = val)"
            :rules="[{ required: true, message: '请输入银行名称', trigger:'onSubmit' }]"
          />
        </template>
        <template v-else>
          <Custom-Input
            label="充值网络"
            placeholder="请选择充值网络"
            required
            :value="form.network"
            readonly
            :rules="[{ required: true, message: '请选择充值网络', trigger:'onSubmit' }]"
            @click="handlerShowNetwork"
          >
          <template #right>
            <icon-park 
              name="right" size="1.5rem" 
              @click="handlerShowNetwork"
            />
          </template>
        </Custom-Input>
        <Custom-Input
            label="充值地址"
            placeholder="请输入充值地址"
            :value="form.blockchain"
            @blur="(val) => (form.blockchain = val)"
            :rules="[{ required: true, message: '请输入充值地址', trigger:'onSubmit' }]"
          >
        </Custom-Input>
      </template>
      <div class="tips">
        <div class="balance">余额: {{ info.balance }}</div>
        <div @click="form.price=info.balance">全部提现</div>
      </div>
      </div>
      <div class="bottom">
        <van-button 
            round block color="#000000"
            native-type="submit"
        > Submit </van-button>
      </div>
    </van-form>
  </div>
  <van-action-sheet 
    v-model:show="showChooseType" :actions="types" @select="handlerChooseType" 
  />
  <van-action-sheet 
    v-model:show="showChooseCard" :actions="cards" @select="handlerChooseCard" 
  />
  <custom-floating-panel
    ref="floatingPanel"
    height="800px"
    title="选择充币网络"
    tip="请选择与提币平台一致的网络"
  >
    <van-space direction="vertical" size="1rem">
      <div
        class="coin-card"
        v-for="(item, index) in nets"
        :key="index"
        @click.stop="handlerChooseNetwork(item)"
      >
        <div class="name-row">{{ item.network }}</div>
        <!-- <div class="other-row">{{ item.blockchain }} USDT</div> -->
      </div>
    </van-space>
  </custom-floating-panel>
</template>

<script setup>
import CustomInput from '@/components/Input/index.vue'
import { deposit,depositInfo } from '@/api/user.js'
import toast from '@/utils/toast.js';
import { multiply } from '@/utils/math.js'
const router = useRouter()
const goRecord = () => {
  router.push({ name: 'CapitalRecord' })
}
const types=ref([
  {name:'银行卡',value:0},
  {name:'链上充值',value:1}
])
const priceValidator=val=>{
  const _val=Number(val)
  if(_val<=0){
    return '提现金额不能小于等于0或为空'
  }
  if(_val>info.value.balance){
    return '提现金额不能大于余额'
  }
  return true
}
const info=ref({})
const form=ref({
  extract_type:0,
  price: undefined,
  blockchain: undefined,
  network: undefined,
  real_name: undefined,
  bank_card:undefined,
  bank_name:undefined
})
const priceLabel=computed(()=>{
  const _val=multiply(info.value.service_charge||0.03,100).toFixed(2)+'%'
  return '提现金额'+`(手续费${_val})`
})
const formatNumber=val=>{
  form.value.price=Number(val).toFixed(2)
}
const typeName=computed(()=>{
  const _type=types.value.find(item=>item.value===form.value.extract_type)
  return _type? _type.name : ''
})
const showChooseType=ref(false)
const handlerShowChooseType=()=>{
  showChooseType.value=true
}
const handlerChooseType=val=>{
  form.value.extract_type=val.value
  showChooseType.value=false
}
const cards=computed(()=>{
  if(info.value.card_list){
    return info.value.card_list.map(item=>{
      return {
        name:item.bank_name,
        value:item.bank_card,
      }
    })
  }
  return []
})
const showChooseCard=ref(false)
const handlerShowChooseCard=()=>{
  showChooseCard.value=true
}
const handlerChooseCard=val=>{
  form.value.bank_card=val.value
  form.value.bank_name=val.name
  showChooseCard.value=false
}
const nets = ref([
  { network:'USDT-TRC20' },
  { network:'USDT-ERC20'}
])
const floatingPanel = ref(null)
const handlerShowNetwork=()=>{
  floatingPanel.value.show = true
}
const handlerChooseNetwork = (net) => {
  form.value.network = net.network
  floatingPanel.value.show = false
}
const handlerSubmit=()=>{
  toast.loading()
  deposit(form.value).then(res=>{
      router.back()
      toast.success({msg:'提现成功'})
  }).catch(err=>err)
}
const getData=()=>{
  toast.loading()
  depositInfo().then(res=>{
    info.value=res.data
  }).catch(err=>err).finally(()=>{
    toast.close()
  })
}
getData()
</script>
<style lang="scss" scoped>
@import url('@/assets/style/main.scss');
.container{
  padding: 0;
  overflow-y: auto;
  .content{
    overflow-y: auto;
    .tips{
      padding-top: 1.5rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-weight: 500;
      font-size: 0.86rem;
      color: #191919;
      line-height: 1rem;
      .balance{
        font-weight: 400;
      }
    }
    height: calc(100dvh - 120px);
    ::v-deep(.van-cell) {
      border-radius: 0 !important;
    }
  }
}
</style>