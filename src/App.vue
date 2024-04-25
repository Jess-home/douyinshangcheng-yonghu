<template>
  <!-- <router-view v-slot="{ Component }">
    <keep-alive :include="['Home', 'Explore', 'Bag','Filter']">
      <component :is="Component" />
    </keep-alive>
  </router-view> -->
  <a-watermark content="演示测试">
    <router-view v-slot="{ Component }">
      <keep-alive :include="['Home', 'Explore', 'Bag','Filter']">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </a-watermark>
</template>
<script setup></script>
<style scoped></style>
