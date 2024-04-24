<script setup>
import AppTabbar from '@/components/AppTabbar/index.vue'
import CartList from '@/components/CartList/index.vue'

// 更新数量
const updateNum = () => {}
</script>
<template>
  <header>
    <div class="flex justify-center items-center py-3 text-lg"><span>My Cart</span></div>
  </header>
  <main>
    <!--商品卡片-->
    <div class="card">
      <CartList />
    </div>
  </main>
  <app-tabbar></app-tabbar>
</template>

<style scoped>
.card {
  .van-card {
    background-color: white;
  }
  :deep(.tag1) {
    display: flex;
    justify-content: flex-end;
    .tag2 {
      width: 20%;
      border-radius: 10%;
      background-color: #f6f6f6;
      padding: 0.2rem 0.8rem;
      display: flex;
      justify-content: space-between;

      .van-button {
        margin: 0;
        background-color: white;
      }

      div {
        width: 1rem;
        text-align: center;
        line-height: 2.2rem;
      }
    }
  }
}
</style>
