<template>
  <nav-bar title="测试" />
  <div class="container">
    <div class="scroll-row">
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>22</div>
      <div>33</div>
      <div>33</div>
    </div>
    <div class="bottom-row" />
  </div>
</template>
<script setup>
import NavBar from '@/components/CustomNavBar/index.vue'
</script>
<style lang="scss" scoped>
@import url('@/assets/style/main.scss');
.container {
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  padding: 0;
  .scroll-row {
    padding: 1rem;
    overflow-y: auto;
    height: calc(dvh - 100px);
    display: flex;
    flex-direction: column;
  }
  .bottom-row {
    width: 100%;
    height: 70px;
    background: red;
    position: relative;
    bottom: 0;
  }
}
</style>
