<template>
  <!-- <div class="test-container">
        <div class="item lvh-container">
            <div>top</div>
            <div>bottom</div>
        </div>
        <div class="item svh-container">
            <div>top</div>
            <div>bottom</div>
        </div>
    </div> -->
  <div class="container">
    <nav-bar title="测试" />
    <div class="scroll">
      <van-space direction="vertical" size="1rem">
        <div class="item" v-for="item in 20" :key="item">{{ item }}</div>
        <div class="item">末尾</div>
      </van-space>
    </div>
    <div class="bottom">
      <van-button color="#191919" round block>测试</van-button>
    </div>
  </div>
</template>
<script setup>
import NavBar from '@/components/CustomNavBar/index.vue'
</script>
<style lang="scss" scoped>
@import url('@/assets/style/main.scss');
.container {
  padding: 0;
  overflow-y: hidden;
  .scroll {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    overflow-y: auto;
    height: calc(100dvh - 50px - 80px);
    .item {
      padding: 1rem;
      background: #ffffff;
      color: #191919;
      text-align: center;
    }
  }
  .bottom {
    background: red;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 80px;
  }
}
.test-container {
  display: flex;
  flex-direction: row;
  height: 2rem;
  .item {
    padding: 1rem 0;
    flex: 1;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .lvh-container {
    height: 100lvh;
    background: red;
  }
  .svh-container {
    height: 100svh;
    background: blue;
  }
}
</style>
