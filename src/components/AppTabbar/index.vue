<template>
  <div class="h-10"></div>
  <van-tabbar v-model="active">
    <van-tabbar-item v-for="(item, index) in icon" :key="index" :to="item.route" replace>
      <template #icon="{ active }">
        <!--<img :src="active ? item.icon_1 : item.icon_2" alt=""/>-->
        <icon-park :name="active ? item.icon_1 : item.icon_2" size="1.8rem" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { onActivated } from 'vue'

const active = ref(0)

const route = useRoute()

const icon = [
  {
    route: '/home',
    icon_1: '1',
    icon_2: 'home'
  },
  {
    route: '/explore',
    icon_1: '2',
    icon_2: 'commodity'
  },
  {
    route: '/bag',
    icon_1: '3',
    icon_2: 'buy'
  },
  {
    route: '/filter',
    icon_1: '4',
    icon_2: 'user'
  }
]

onActivated(() => {
  icon.forEach((item, index) => {
    if (item.route === route.path) {
      active.value = index
    }
  })
})
</script>
<style scoped></style>
