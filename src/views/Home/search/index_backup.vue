<template>
  <!-- 头部 -->
  <div class="header">
    <AppNavbar title="Search">
      <template #left>
        <img src="@/assets/image/ArrowBack.png" class="h-10" alt="" />
      </template>
    </AppNavbar>
  </div>
  <!--  搜索框-->
  <div class="search">
    <van-search v-model="value" shape="round" placeholder="Search" :style="{ height: '3.125rem' }">
      <template #right-icon>
        <img
          src="/public/imgs/Filter.png"
          alt="图片描述"
          style="height: 1.125rem; margin: 1.0625rem; line-height: 3.25rem"
        />
      </template>
    </van-search>
  </div>
  <!--  选项卡-->
  <div class="tabs">
    <van-button
      round
      type="success"
      class=""
      style="width: 4.5rem; border-color: #e3e7ec; margin-right: 0.5rem"
      color="#FFFFFF"
      v-for="(item, index) in 4"
      :key="index"
    >
      {{ item }}
    </van-button>
  </div>
  <!--  列表-->
  <div class="list">
    <div class="title">Result(15）</div>
    <List :column="1" />
  </div>
</template>

<script setup>
import AppNavbar from '@/components/AppNavbar/index.vue'
import List from '@/components/List/index.vue'
</script>

<style scoped lang="scss">
.header {
  padding: 1rem;
}

.search {
  margin-top: 2rem;

  :deep(.van-field__control) {
    line-height: 2.125rem;
  }
}

.tabs {
  padding: 1.2rem;
  display: flex;
  flex-wrap: nowrap;
  margin-right: 1.25rem;

  :deep(.van-button__content) {
    color: #e3e7ec;
  }
}

.list {
  padding: 1rem;
}
</style>
