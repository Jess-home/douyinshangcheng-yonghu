<template>
  <!-- 内容 -->
  <header class="pt-10 pb-3 mb-3" style="background-color: #fff">
    <div class="avatar">
      <div class="left flex items-center">
        <van-image
          width="48"
          height="48"
          round
          lazy-load
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
        <div class="flex flex-col ml-3.5">
          <span class="font-semibold text-xl">Hi,Andy</span>
          <span class="" style="color: #78828a">Hi,Andy</span>
        </div>
      </div>
      <div class="flex">
        <div class="center">
          <img class="w-8" src="/public/imgs/Notification.png" alt="" />
        </div>
        <div class="right pl-3">
          <img class="w-8" src="/public/imgs/Message.png" alt="" />
        </div>
      </div>
    </div>
  </header>
  <main>
    <!-- 头像 -->

    <!-- 介绍 -->
    <div class="introduction mx-3 mb-3">
      <div class="text-4xl mb-3">Find you dream</div>
      <div class="text-4xl mb-6">interior now</div>
    </div>
    <!-- 搜索框 -->
    <div class="search">
      <van-search
        v-model="value"
        shape="round"
        placeholder="Search"
        style="height: 3.125rem"
        @click="toSearch()"
      >
        <template #right-icon>
          <img
            src="/public/imgs/Filter.png"
            alt="图片描述"
            style="height: 1.125rem; margin: 1.0625rem; line-height: 3.25rem"
          />
        </template>
      </van-search>
    </div>
    <!-- 轮播图 -->
    <div class="productSwipe">
      <van-swipe :autoplay="3000" lazy-render :show-indicators="false">
        <van-swipe-item
          v-for="image in images"
          :key="image"
          style="object-fit: cover; padding: 1rem"
        >
          <img :src="image" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 列表 -->
    <div class="mx-3 my-3">
      <h5 class="font-semibold">热门商品</h5>
    </div>
    <grid-list></grid-list>
  </main>
  <!-- 底部导航栏 -->
  <AppTabbar />
</template>

<script setup>
import AppTabbar from '@/components/AppTabbar/index.vue'
import List from '@/components/List/index.vue'
import GridList from '@/components/GridList/index.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

//进入搜索页面
const toSearch = () => {
  router.push({ name: 'Search' })
}

//轮播图
const images = ['/public/imgs/swipe.png', '/public/imgs/swipe.png']
</script>
<style scoped lang="scss">
.van-search {
  background-color: transparent;
}

.avatar {
  height: 2.875rem;
  display: flex;
  margin: 0 0.75rem;
  align-items: center;
  justify-content: space-between;
}

//.introduction {
//  width: 20.3125rem;
//  height: 5rem;
//  font-size: 2rem;
//  margin: 1.25rem auto;
//
//  div {
//    line-height: 2.5rem;
//  }
//}

.search {
  width: 100%;
}

.productSwipe {
  margin: 1rem 0;
}

.info {
  height: 11.25rem;
  background-color: #31452e;
  border-radius: 0.3125rem;
  margin: 1.5rem 0.75rem;
  display: flex;

  .left {
    width: 9.3125rem;
    height: 7.25rem;
    margin: 0.625rem;
    /* background-color: red; */

    div {
      color: white;

      &:nth-of-type(1) {
        font-size: 1.275rem;
        margin: 0.625rem 0rem;
      }

      &:nth-of-type(2) {
        font-size: 1rem;
        margin: 0.625rem 0rem;
      }

      &:nth-of-type(3) {
        color: black;
        font-size: 1rem;
        background-color: white;
        border-radius: 30%;
        text-align: center;
      }
    }
  }

  .right {
    /* background-color: green; */

    img {
      width: 13.125rem;
      height: 11.25rem;
      position: relative;
      left: 1rem;
    }
  }
}

.popular {
  width: 20.3125rem;
  height: 1.625rem;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
}
</style>
