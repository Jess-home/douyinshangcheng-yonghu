<template>
  <div class="container">
    <nav-bar title="我的订单" />
    <div class="content">
      <div class="purchases-menus">
        <div
          class="menu"
          v-for="item in menus"
          :key="item"
          :class="{ active: selected === item }"
          @click="handleSelect(item)"
        >
          {{ item }}
        </div>
      </div>
      <div class="purchases-products">
        <van-space direction="vertical" fill :size="10">
          <Purchase-Cart
            v-for="item in productList"
            :key="item.productId"
            :product="item"
            :status="selected"
            @arrow-click="handleArrowClick"
          />
        </van-space>
      </div>
    </div>
  </div>
</template>
<script setup name="MyPurchases">
import PurchaseCart from '@/components/Cart/purchaseCart.vue'
const products = ref({
  delivered: [
    {
      productId: 1,
      num: 1,
      price: 88,
      total: 88,
      title: 'Direka Chair',
      desc: 'Brown',
      src: new URL('@/assets/image/product1.png', import.meta.url).href
    },
    {
      productId: 2,
      num: 3,
      price: 72,
      total: 216,
      title: 'Esacapea Chair',
      desc: 'Brown',
      src: new URL('@/assets/image/product2.png', import.meta.url).href
    },
    {
      productId: 1,
      num: 1,
      price: 88,
      total: 88,
      title: 'Direka Chair',
      desc: 'Brown',
      src: new URL('@/assets/image/product1.png', import.meta.url).href
    },
    {
      productId: 2,
      num: 3,
      price: 72,
      total: 216,
      title: 'Esacapea Chair',
      desc: 'Brown',
      src: new URL('@/assets/image/product2.png', import.meta.url).href
    },
    {
      productId: 1,
      num: 1,
      price: 88,
      total: 88,
      title: 'Direka Chair',
      desc: 'Brown',
      src: new URL('@/assets/image/product1.png', import.meta.url).href
    },
    {
      productId: 2,
      num: 3,
      price: 72,
      total: 216,
      title: 'Esacapea Chair',
      desc: 'Brown',
      src: new URL('@/assets/image/product2.png', import.meta.url).href
    },
    {
      productId: 1,
      num: 1,
      price: 88,
      total: 88,
      title: 'Direka Chair',
      desc: 'Brown',
      src: new URL('@/assets/image/product1.png', import.meta.url).href
    },
    {
      productId: 2,
      num: 3,
      price: 72,
      total: 216,
      title: 'Esacapea Chair',
      desc: 'Brown',
      src: new URL('@/assets/image/product2.png', import.meta.url).href
    },
    {
      productId: 1,
      num: 1,
      price: 88,
      total: 88,
      title: 'Direka Chair',
      desc: 'Brown',
      src: new URL('@/assets/image/product1.png', import.meta.url).href
    },
    {
      productId: 2,
      num: 3,
      price: 72,
      total: 216,
      title: 'Esacapea Chair',
      desc: 'Brown',
      src: new URL('@/assets/image/product2.png', import.meta.url).href
    },
    {
      productId: 1,
      num: 1,
      price: 88,
      total: 88,
      title: 'Direka Chair',
      desc: 'Brown',
      src: new URL('@/assets/image/product1.png', import.meta.url).href
    },
    {
      productId: 2,
      num: 3,
      price: 72,
      total: 216,
      title: 'Esacapea Chair',
      desc: 'Brown',
      src: new URL('@/assets/image/product2.png', import.meta.url).href
    },
    {
      productId: 1,
      num: 1,
      price: 88,
      total: 88,
      title: 'Direka Chair',
      desc: 'Brown',
      src: new URL('@/assets/image/product1.png', import.meta.url).href
    },
    {
      productId: 2,
      num: 3,
      price: 72,
      total: 216,
      title: 'Esacapea Chair',
      desc: 'Brown',
      src: new URL('@/assets/image/product2.png', import.meta.url).href
    }
  ],
  processing: [
    {
      productId: 2,
      num: 2,
      price: 72,
      total: 144,
      title: 'Esacapea Chair',
      desc: 'Brown',
      src: new URL('@/assets/image/product2.png', import.meta.url).href
    }
  ],
  cancelled: []
})
const menus = ref(['delivered', 'processing', 'cancelled'])
const selected = ref('delivered')
const handleSelect = (menu) => {
  selected.value = menu
}
const productList = computed(() => {
  return products.value[selected.value]
})
const router = useRouter()
const handleArrowClick = () => {
  router.push({ name: 'Platform' })
}
</script>
<style lang="scss" scoped>
@import url('@/assets/style/main.scss');
.container {
  padding: 0;
  overflow-y: hidden;
  .content {
    overflow-y: auto;
    height: calc(100dvh - 50px);
    .purchases-menus {
      background: rgba(246, 248, 254, 1);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border-radius: 100px;
      .menu {
        flex: 1;
        text-align: center;
        padding: 0.72rem 0;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 0.07px;
        line-height: 22px;
        color: rgba(156, 164, 171, 1);
        border-radius: 100px;
      }
      .active {
        background: rgba(49, 69, 46, 1);
        color: #ffffff;
      }
    }
    .purchases-products {
      padding-top: 27px;
    }
  }
}
</style>
