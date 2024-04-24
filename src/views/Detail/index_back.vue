<template>
  <!--头部-->
  <div class="header">
    <AppNavbar title="Detail">
      <template #left>
        <img src="@/assets/image/ArrowBack.png" class="h-12" alt="" />
      </template>
      <template #right>
        <div class="right">
          <img src="/public/imgs/ArrowBack_1.png" class="h-12" alt="" />
        </div>
      </template>
    </AppNavbar>
  </div>
  <!--  产品介绍-->
  <div class="productInfo">
    <div class="imgs">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <!-- <img style="width:100%" v-lazy="image" /> -->
          <VanImage width="100%" :src="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="introduction">
      <div class="top">
        <div>{{ product.office }}</div>
        <div class="right">
          <img :src="product.star" alt="" />
          <div>{{ product.score }}</div>
          <div>({{ product.number }})</div>
        </div>
      </div>
      <div class="center">
        {{ product.title }}
      </div>
      <div class="bottom">
        <span>{{ product.currentPrice }}</span>
        <span>{{ product.originalPrice }}</span>
      </div>
    </div>
  </div>
  <!-- 描述 -->
  <div class="description">
    <div class="avatar">
      <div class="left">
        <img src="/public/imgs/avatar.png" alt="" />
      </div>
      <div class="right">
        <div class="box1"><img src="/public/imgs/heart2.png" alt="" /></div>
        <div class="box2"><img src="/public/imgs/heart2.png" alt="" /></div>
      </div>
    </div>
    <div class="info">
      <div class="title text-2xl">Description</div>
      <div class="van-multi-ellipsis--l3">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to make a type.
      </div>
    </div>
  </div>
  <!--  加入购物车-->
  <div class="cart">
    <van-submit-bar :price="product.currentPrice" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>

<script setup>
// import AppNavbar from '@/components/AppNavbar/index.vue'
import AppHeader from '@/components/CustomNavBar/index.vue'
import { ref } from 'vue'

const images = ref([
  new URL('@/assets/image/product1.png', import.meta.url).href,
  new URL('@/assets/image/product2.png', import.meta.url).href
])
const product = ref({
  proid: 1,
  img: '/public/imgs/Preview.png',
  discount: '50% Off',
  office: 'Office',
  star: '/public/imgs/star.png',
  score: '4.4',
  title: 'Dulax Estra Chair',
  currentPrice: 48,
  originalPrice: 99,
  love: '',
  number: 52
})

//购物车提交
const onSubmit = () => showToast('点击按钮')
</script>

<style scoped>
.cart {
  :deep(.van-submit-bar__button--danger) {
    background-color: #000000;
  }
  :deep(.van-submit-bar__price) {
    color: #000000;
  }
}

.header {
  .right {
    background-color: white;
    border-radius: 50%;
    width: 2.85rem;
    height: 2.85rem;
    text-align: center;
    position: relative;

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}

.productInfo {
  padding: 4rem 1rem;
  border-bottom: 0.1rem solid #e3e9ed;
  .imgs {
    background: #f6f8fe;
  }
  .introduction {
    padding-top: 2rem;

    .top {
      height: 1.25rem;
      display: flex;
      justify-content: space-between;

      .right {
        display: flex;
        margin-right: 2rem;

        img {
          width: 0.875rem;
          height: 0.875rem;
          margin-right: 0.3125rem;
        }

        div {
          font-size: 0.8rem;
          color: #ffcd1a;
        }
      }
    }

    .center {
      margin: 0.625rem 0;
    }

    .bottom {
      span {
        margin-right: 0.625rem;

        &:last-child {
          color: red;
        }
      }
    }
  }
}

.description {
  padding: 2rem;

  .avatar {
    display: flex;
    justify-content: space-between;

    .right {
      display: flex;
      justify-content: space-between;

      div {
        background-color: #e3e9ed;
        border-radius: 50%;
      }

      .box1 {
        margin-right: 1rem;
      }
    }
  }
}
</style>
