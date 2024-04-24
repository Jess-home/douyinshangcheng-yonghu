<template>
  <div class="cart-item-container">
    <div class="item-img">
      <van-image width="6.5rem" height="auto" :src="product.goods?.image" />
    </div>
    <div class="item-info">
      <span class="name">
        {{ product.goods?.title }}
      </span>
      <div class="price">
        {{ product.goods?.sales_price }}
        <div class="spec">{{ product.goods?.spec || product.spec || '未选规格' }}</div>
      </div>
      <div class="number-ctl">
        <!-- <van-icon name="minus" color="#191919" size="1.4rem" @click="minus" />
                <div class="number-word">{{ product.cart_num }}</div>
                <van-icon name="plus" color="#191919" size="1.4rem" @click="plus" /> -->
        <van-stepper
          v-model="value"
          :before-change="changeCartNum"
          :disabled="readonly && product.cart_id"
        />
      </div>
      <div class="total">总计: &nbsp;${{ product.total_price }}</div>
    </div>
    <van-checkbox
      icon-size="2.2rem"
      v-model="product.checked"
      checked-color="#191919"
      :disabled="readonly"
    />
  </div>
</template>
<script setup>
import { setCartNum } from '@/api/cart.js'
import toast from '@/utils/toast.js'
const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  readonly: {
    type: Boolean,
    required: false,
    default: false
  }
})
const value=computed(()=>{
  return props.product.cart_num
})
const emit = defineEmits(['changeNum'])
const changeCartNum = async (num) => {
  if (props.product.cart_id) {
    toast.loading({
      msg: '数量变更中'
    })
    return new Promise((resolve) => {
      setCartNum({
        cart_id: props.product.cart_id,
        num: num
      })
        .then((res) => {
          resolve(true)
          emit('changeNum')
        })
        .catch((err) => {})
        .finally(() => {
          toast.close()
        })
    })
  } else {
    props.product.cart_num = num
    emit('changeNum')
  }
}
// const emit=defineEmits(['changeNum'])
// const minus=()=>{
//     if(props.product.cart_num===1){
//         return
//     }
//     props.product.cart_num-=1;
//     emit('changeNum')
// }
// const plus=()=>{
//     props.product.cart_num+=1;
//     emit('changeNum')
// }
</script>
<style lang="scss" scoped>
.cart-item-container {
  background: #ffffff;
  padding: 0.72rem;
  border-radius: 0.6rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.05);
  .item-img {
    background: #f7f7f7;
    border-radius: 0.56rem;
    box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.05);
  }
  .item-info {
    padding-left: 1.42rem;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-around;
    align-items: stretch;
    font-size: 1rem;
    font-weight: 600;
    color: #191919;
    line-height: 1.2rem;
    .name {
      width: 12rem;
      padding-bottom: 0.5rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .price {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .spec {
        color: #868686;
      }
    }
    .number-ctl {
      width: 80%;
      padding: 0.4rem 0.8rem;
      border-radius: 1.6rem;
      background: #f5f5f5;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      .number-word {
        padding: 0 1.2rem;
        font-size: 1.2rem;
        font-weight: 600;
        color: #191919;
        line-height: 1.6rem;
      }
      ::v-deep(.van-cell) {
        padding: 0;
        width: 4rem;
      }
      ::v-deep(.van-field__control) {
        text-align: center;
        padding: 0;
        background: #f5f5f5;
      }
    }
    .total {
      padding-top: 0.8rem;
    }
  }
}
</style>
