<template>
  <div class="container">
    <nav-bar title="Detail">
      <template #right>
        <van-icon size="2.2rem" color="#111111" name="like-o" />
      </template>
    </nav-bar>
    <div class="container-scroll">
      <div class="swiper-container">
        <div class="swiper-imgs">
          <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index">
              <VanImage width="16em" :src="image" />
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <div class="product-info">
        <div class="product-evaluate">
          Office
          <van-space size="0.2em">
            <van-icon size="16" color="#facc15" name="star" />
            <span style="color: #facc15">4.4</span>
            <span>(52)</span>
          </van-space>
        </div>
        <div class="product-name">Dulax Extra Chair</div>
        <div class="product-origin">
          <van-icon size="1em" name="location" color="#9ca4ab" />
          Bali, Indonesia
        </div>
      </div>
      <div class="product-desc">
        <div class="desc-user">
          <VanImage width="4em" height="4em" :src="detailUser" />
          <div class="user-info">
            <div>Wilbur Luettgen</div>
            <div class="location">CS Futuristic</div>
          </div>
        </div>
        <div class="desc-container">
          <div>Description</div>
          <div class="desc-content">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type.
          </div>
        </div>
      </div>
      <div class="product-gallery">
        <div class="gallery-title">
          Gallery
          <div class="gallery-title-tip">See All</div>
        </div>
        <div class="gallery-imgs">
          <!-- <div v-for="(img,index) in galleryImgs"
                        :key="index" class="img-container"
                    >
                        <VanImage 
                            width="80"
                            height="80"
                            :src="img"
                        />
                    </div> -->
          <van-space size="1em">
            <Product-Img
              class="img-container"
              v-for="(img, index) in galleryImgs"
              :key="index"
              :url="img"
            />
          </van-space>
        </div>
      </div>
      <div class="product-review">
        <div class="review-title">
          Review
          <div class="review-title-tip">See All</div>
        </div>
        <div class="review-content">
          <VanImage width="4em" height="4em" round :src="reviewUser" />
          <div class="review-info">
            <div class="review-user">
              <div class="review-user-name">
                Alenzo Endera
                <div class="review-user-date">24 Nov 2022</div>
              </div>
              <div class="review-user-star">
                <van-rate v-model="likeVal" icon="star" color="#ffd21e" void-color="#eee" />
              </div>
            </div>
            <div class="review-desc">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit
              officia consequat duis enim velit mollit.
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-bottom">
      <div class="bottom-price">
        Price
        <div class="price-compare">
          $132
          <span class="old-price">$245</span>
        </div>
      </div>
      <div class="bottom-button">
        <van-button size="large" round block color="#000000"> Add to Cart </van-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import NavBar from '@/components/CustomNavBar/index.vue'
import ProductImg from '@/components/ProductImg/index.vue'
const images = ref([
  new URL('@/assets/image/product1.png', import.meta.url).href,
  new URL('@/assets/image/product1.png', import.meta.url).href
])
const detailUser = new URL('@/assets/image/detail_user.png', import.meta.url).href
const galleryImgs = ref([
  new URL('@/assets/image/product1.png', import.meta.url).href,
  new URL('@/assets/image/product2.png', import.meta.url).href,
  new URL('@/assets/image/product3.png', import.meta.url).href,
  new URL('@/assets/image/product4.png', import.meta.url).href
])
const reviewUser = new URL('@/assets/image/reviewUser.png', import.meta.url).href
const likeVal = ref(5)
</script>
<style lang="scss" scoped>
@import url('@/assets/style/main.scss');
.container {
  font-size: 24px;
  background: #fefefe;
  overflow-y: hidden;
  .container-scroll {
    overflow-y: auto;
    height: calc(100vh - 134px);
    display: flex;
    flex-direction: column;
    .swiper-container {
      padding-top: 1.5em;
      .swiper-imgs {
        text-align: center;
        background: #f6f8fe;
      }
    }
    .product-info {
      padding-top: 2em;
      padding-bottom: 1em;
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid #9ca4ab;
      .product-evaluate {
        font-size: 1em;
        font-weight: 500;
        color: rgba(102, 112, 122, 1);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
      .product-name {
        font-size: 1.4em;
        font-weight: 600;
        color: rgba(17, 17, 17, 1);
      }
      .product-origin {
        font-size: 1em;
        font-weight: 500;
        color: rgba(156, 164, 171, 1);
      }
    }
    .product-desc {
      padding: 1.2em 0;
      display: flex;
      flex-direction: column;
      .desc-user {
        display: flex;
        flex-direction: row;
        align-items: stretch;
        .user-info {
          padding-left: 1em;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          font-size: 1em;
          font-weight: 600;
          color: rgba(17, 17, 17, 1);
          .location {
            font-size: 0.9em;
            font-weight: 500;
            color: rgba(49, 69, 46, 1);
          }
        }
      }
      .desc-container {
        padding-top: 1em;
        font-size: 1em;
        font-weight: 600;
        color: rgba(17, 17, 17, 1);
        .desc-content {
          padding-top: 0.5em;
          font-size: 0.9em;
          font-weight: 400;
          color: rgba(102, 112, 122, 1);
        }
      }
    }
    .product-gallery {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      .gallery-title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        font-size: 1em;
        font-weight: 600;
        color: rgba(17, 17, 17, 1);
        .gallery-title-tip {
          font-size: 0.9em;
          font-weight: 600;
          color: rgba(49, 69, 46, 1);
        }
      }
      .gallery-imgs {
        padding-top: 1em;
        overflow-x: auto;
        .img-container {
          width: 7em;
          height: 6em;
          border-radius: 1.5em;
        }
      }
    }
    .product-review {
      padding-top: 1.5em;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      .review-title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        font-size: 1em;
        font-weight: 600;
        color: rgba(17, 17, 17, 1);
        .review-title-tip {
          font-size: 0.9em;
          font-weight: 600;
          color: rgba(49, 69, 46, 1);
        }
      }
      .review-content {
        padding-top: 1em;
        display: flex;
        flex-direction: row;
        .review-info {
          padding-left: 1em;
          flex: 1;
          .review-user {
            display: flex;
            flex-direction: column;
            .review-user-name {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              font-size: 1em;
              font-weight: 600;
              color: rgba(17, 17, 17, 1);
              .review-user-date {
                font-size: 0.9em;
                font-weight: 400;
                color: rgba(156, 164, 171, 1);
              }
            }
            .review-user-star {
              padding: 0.5em 0 1em 0;
            }
          }
          .review-desc {
            font-size: 1em;
            font-weight: 400;
            color: rgba(17, 17, 17, 1);
          }
        }
      }
    }
  }
  .container-bottom {
    height: 80px;
    background: #ffffff;
    padding: 1em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .bottom-price {
      padding-left: 1em;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      font-size: 1em;
      font-weight: 500;
      color: rgba(102, 112, 122, 1);
      .price-compare {
        font-size: 1.5em;
        font-weight: 700;
        color: rgba(17, 17, 17, 1);
        .old-price {
          padding-left: 0.2em;
          font-size: 0.8em;
          font-weight: 700;
          text-decoration-line: line-through;
          color: rgba(229, 57, 53, 1);
        }
      }
    }
    .bottom-button {
      flex: 1;
    }
  }
}
.container-scroll::-webkit-scrollbar-thumb {
  width: 0 !important;
}
</style>
