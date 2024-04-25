<template>
    <div class="container">
      <nav-bar title="订单详情" />
      <div class="content">
        <div class="content-item">
            <list-tile title="订单号" :arrow="false" :value="orderData.order_sn" />        
        </div>
        <div class="address content-item">
          收货地址
          <list-tile
            :title="address?.name"
            :label="address?.label"
            :arrow="false"
          >
            <template v-if="!address" #left>
              <div class="choose-address">
                <icon-park name="plus" size="1.6rem" />
                <div class="choose-address-word">添加地址</div>
              </div>
            </template>
          </list-tile>
        </div>
        <div class="info content-item">
          商品详情
          <cart-item
            class="product"
            v-for="(item, index) in orderData.products"
            :key="index + 'product'"
            :product="item"
          >
          </cart-item>
        </div>
        <!-- <div class="promotion content-item">
          <custom-input
            :value="promotion"
            @blur="(val) => (promotion = val)"
            placeholder="输入您的促销码"
          />
        </div> -->
        <div class="content-item">
          <list-tile title="小计" :arrow="false" :value="allTotal + ''" />
        </div>
        <div class="content-item">
          <list-tile title="总" :arrow="false" :value="allTotal + ''" />
        </div>
        <div class="content-item">
          <list-tile title="订单状态" :arrow="false" :value="status" />
        </div>
        <div class="delivery content-item">
          {{ hasDeliveryInfo?'物流信息':'暂无物流信息' }}
          <list-tile 
            v-for="item in orderData.delivery" 
            :key="item"
            title="航运" :arrow="false" :value="orderData.delivery" 
          />
        </div>
      </div>
      <div class="bottom">
        <div class="total-price">
          总计：
          <div class="total-number">${{ allTotal }}</div>
        </div>
        <!-- <div v-if="canPay" class="buttons">
          <van-button 
            block round color="#191919"
            @click="handlerPay"
          >
            立即付款
          </van-button>
          <div style="width:1rem;" />
          <van-button 
            round block
            @click="handlerCancel"
          >
            取消
          </van-button>
        </div>
        <div v-if="canReceived" class="buttons">
          <van-button 
            block round color="#191919"
            @click="handlerConfirmReceived"
          >
            确认收货
          </van-button>
        </div> -->
        <div class="buttons">
          <van-space size="0.25rem">
            <van-button  
              block round
              v-for="btn in _buttons" :key="btn.value"
              :type="btn.type"
              :color="btn.color"
              @click="handlerDeal(btn.value)"
            >
              {{ btn.name }}
            </van-button>
          </van-space>
        </div>
      </div>
      <van-action-sheet :overlay="false" :round="false" v-model:show="showActionSheet">
        <payment 
          :pay-data="orderData" @close="() => (showActionSheet = false)"
          @verify="verifyPwd" 
        />
      </van-action-sheet>
    </div>
    <custom-floating-panel ref="floatingPanel" title="请选择收货地址">
      <van-space direction="vertical" size="1rem">
        <div
          class="address-card"
          v-for="(item, index) in addresses"
          :key="index"
        >
          <div class="name">{{ item.name }}</div>
          <div class="address">{{ item.address }}</div>
        </div>
      </van-space>
    </custom-floating-panel>
</template>
<script setup name="OrderInfo">
import ListTile from '@/components/ListTile/index.vue'
import CartItem from '@/components/CartItem/info.vue'
import CustomFloatingPanel from '@/components/CustomFloatingPanel/index.vue'
import Payment from '@/components/Peyment/index.vue'
import toast from '@/utils/toast.js'
import { detail,pay,cancelOrder,received as confirmReceived,refundOrder} from '@/api/order.js'
import { verifyPay } from '@/api/user.js'
import { order_statuses } from '@/utils/constants.js'
import useUserStore from '@/stores/modules/user.js'
const userStore = useUserStore()
const orderData = ref({})
const status = computed(() => {
  const _status=order_statuses.find(item=>(item.value===(orderData.value.status+'')))
  return _status?.name
})
const buttons=ref([
  { name: '立即付款', statuses: ['0'], value: 'pay',color:'#191919' },
  { name: '取消', statuses: ['0'], value: 'cancel',type:'default' },
  { name: '确认收货', statuses: ['2'], value: 'confirmReceived',type:'success' },
  { name: '申请退款', statuses: ['1','2','3','4'] , value: 'refund',type:'danger' },
])
const _buttons=computed(()=>{
  return buttons.value.filter(item=>{
    return item.statuses.includes(orderData.value.status+'')
  })
})
const handlerDeal=type=>{
  console.log(type)
  switch(type){
    case 'pay': // 付款
      handlerPay()
      break
    case 'cancel':  //  取消订单
      handlerCancel()
      break
    case 'confirmReceived': //  确认收货
      handlerConfirmReceived()
      break
    case 'refund':  //  申请退款
      confirmRefund()
      break
    default:
      break
  }
}
const canPay=computed(()=>{
  return orderData.value.status=== 0
})
const canReceived=computed(()=>{
  return orderData.value.status=== 2
})
const hasDeliveryInfo=computed(()=>{
  return !!orderData.value.delivery_id
})
const address=computed(()=>{
  return {
    name:orderData.value.user_address,
    label:orderData.value.real_name+'  '+orderData.value.user_phone,
  }
})
const allTotal = computed(() => {
    return orderData.value.total_price || 0
})
const floatingPanel = ref(null)
const router=useRouter()
const showActionSheet = ref(false)

const handlerPay = () => {
  if(!userStore.userInfo.have_pay){
    showConfirmDialog({
      message: '你还未设置支付密码?',
      confirmButtonText:'去设置'
    })
      .then(() => {
        router.push({name:'ChangePayPwd'})
      })
      .catch(() => {})
    return
  }
  showActionSheet.value = true
}
const handlerCancel=()=>{
  showConfirmDialog({
      message: '是否确认取消该订单?',
    })
      .then(() => {
        cancel()
      })
      .catch(() => {})
}
const handlerConfirmReceived=()=>{
  showConfirmDialog({
      message: '是否确认收货?',
    })
      .then(() => {
        received()
      })
      .catch(() => {})
}
const confirmRefund=()=>{
  if(orderData.value.refund_status!==0){
    toast.show({msg:'您已经提交了退款申请'})
    return
  }
  showConfirmDialog({
      message: '是否确认申请退款?',
    })
      .then(() => {
        const product_ids=orderData.value.products.map(item=>(item.order_product_id)).join(',')
        router.push({
            name:'Refund',
            params:{
              id:orderData.value.order_id,
              sn:orderData.value.order_sn,
              product_ids:product_ids,
              amount:orderData.value.total_price,
            }
        })
      })
      .catch(() => {})
}
const cancel=()=>{
  toast.loading()
  cancelOrder({order_id:orderData.value.order_id}).then(res=>{
    toast.success({msg:res.msg})
    router.back()
  }).catch(err=>err)
}
const received=()=>{
  toast.loading()
  confirmReceived({order_id:orderData.value.order_id}).then(res=>{
    toast.success({msg:res.msg})
    router.back()
  }).catch(err=>err)
}
const verifyPwd=pwd=>{
  toast.loading()
  verifyPay({
      password_pay:pwd
  }).then(res=>{
      payAction()
  }).catch(err=>err)
}
const payAction=()=>{
  toast.loading({msg:'支付中...'})
  pay({
    order_id:orderData.value.order_id
  }).then(res=>{
    toast.success({msg:'支付成功'})
    showActionSheet.value = false
    router.back()
  }).catch(err=>{
    toast.err({msg:'支付失败'})
  })
}
const route = useRoute()
onMounted(() => {
    console.log(route.params)
    toast.loading()
    detail({order_id:route.params.id}).then((res) => {
        orderData.value = res.data
    }).catch(err => err).finally(() => {
        toast.close()
    })
})
</script>
  <style lang="scss" scoped>
  @import url('@/assets/style/main.scss');
  .container {
    overflow-y: hidden;
    padding: 0;
    .content {
      height: calc(100dvh - (50px + 70px));
      .content-item {
        padding-top: 0.25rem;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        font-size: 1rem;
        font-weight: 500;
        color: #191919;
        line-height: 1.2rem;
      }
      .address {
        padding-top: 1rem;
        .choose-address {
          display: flex;
          flex-direction: row;
          align-items: center;
          .choose-address-word {
            padding-left: 0.6rem;
            font-weight: 400;
            font-size: 1rem;
            color: #191919;
            line-height: 2rem;
          }
        }
      }
      .info {
        padding-top: 1rem;
        .product {
          margin-top: 0.75rem;
        }
      }
      .promotion {
        padding-top: 1rem;
      }
      .delivery{
        padding-top: 1rem;
      }
    }
    .bottom {
      .total-price {
        flex: 2;
        font-weight: 500;
        font-size: 1rem;
        color: #191919;
        line-height: 1.2rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        .total-number {
          padding-left: 0.25rem;
          font-weight: 600;
          font-size: 1.4rem;
          color: #fe4857;
          line-height: 1.6rem;
        }
      }
      .buttons {
        flex: 3;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
      }
    }
    ::v-deep(.van-action-sheet) {
      max-height: 100dvh;
    }
  }
  .address-card {
    background: #ffffff;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.08);
    border-radius: 0.25rem;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .name {
      font-size: 1rem;
      font-weight: 400;
      color: #191919;
      line-height: 1.2rem;
    }
    .address {
      padding-top: 0.2rem;
      width: 16rem;
      font-weight: 400;
      font-size: 1rem;
      color: #757575;
      line-height: 1.2rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  </style>
  