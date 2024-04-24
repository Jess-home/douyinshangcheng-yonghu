<template>
  <header>
    <div class="bag-title">My Cart</div>
  </header>
  <main>
    <div v-if="products.length" class="main-container">
      <van-space direction="vertical" fill :size="10">
        <Cart
          v-for="item in products"
          :key="item.productId"
          :product="item"
          @delete="deleteProduct(item)"
        />
      </van-space>
      <div class="main-button">
        <van-button size="large" color="#000000" round block @click="handleCheckOut"
          >Checkout Now</van-button
        >
      </div>
    </div>
    <div v-else class="empty-container">
      <VanImage width="200" height="200" :src="emptyUrl" />
      <div class="empty-info">
        <span>There are no items</span>
        <span>in your cart</span>
      </div>
    </div>
  </main>
  <app-tabbar></app-tabbar>
</template>
<script setup>
import Cart from '@/components/Cart/index.vue'
const products = ref([
  {
    productId: 1,
    num: 0,
    price: 88,
    total: 0,
    title: 'Direka Chair',
    desc: 'Brown',
    src: new URL('@/assets/image/product1.png', import.meta.url).href
  },
  {
    productId: 2,
    num: 0,
    price: 72,
    total: 0,
    title: 'Esacapea Chair',
    desc: 'Brown',
    src: new URL('@/assets/image/product2.png', import.meta.url).href
  }
])
const emptyUrl = new URL('@/assets/image/cart-empty.png', import.meta.url).href
const router = useRouter()
const deleteProduct = (product) => {
  const _index = products.value.indexOf(product)
  products.value.splice(_index, 1)
}
const handleCheckOut = () => {
  router.push({ path: '/checkout', query: { products: JSON.stringify(products.value) } })
}
</script>
<style lang="scss" scoped>
.bag-title {
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 700;
}
.main-container {
  height: calc(100vh - 130px);
  padding: 20px 10px;
  .main-button {
    padding-top: 64px;
  }
}
.empty-container {
  height: calc(100vh - 130px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .empty-info {
    padding-top: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 0.09px;
    line-height: 26px;
    color: rgba(120, 130, 138, 1);
  }
}
</style>
