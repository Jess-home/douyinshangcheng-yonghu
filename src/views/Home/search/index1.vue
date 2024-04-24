<template>
  <div class="container safari_only">
    <App-Header title="Search" />
    <div class="search-container">
      <Custom-input class="border-input" :value="searchVal" @blur="(val) => (searchVal = val)">
        <template #left>
          <van-icon class-prefix="icon" size="22" name="search" />
        </template>
        <template #right>
          <div class="right-icon-container">
            <div class="right-icon">
              <van-icon class-prefix="icon" size="26" name="classify" />
            </div>
          </div>
        </template>
      </Custom-input>
      <div class="search-classes">
        <van-space fill size="0.8em">
          <div
            class="classes-item"
            :class="selectedClass === item.name ? 'selected' : 'no-selected'"
            v-for="item in classes"
            :key="item.name"
            @click="() => (selectedClass = item.name)"
          >
            {{ item.name }}
          </div>
        </van-space>
      </div>
    </div>
    <div v-if="results.length" class="results-scroll">
      <div class="results-amount">
        {{ resultAmount }}
      </div>
      <div class="results-items">
        <div v-for="(item, index) in results" :key="index" class="results-item">
          <!-- <div class="item-img">
                        <VanImage 
                            :src="item.src"
                        />
                    </div> -->
          <Product-Img class="item-img" :url="item.src" />
          <div class="item-info">
            <div class="item-info-row1">
              {{ item.type }}
              <div class="item-info-star">
                <van-icon name="star" />
                {{ item.score }}
              </div>
            </div>
            <div class="item-info-name">
              {{ item.name }}
            </div>
            <div class="item-info-price">${{ item.price }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="empty-container">
      <van-empty description="暂无相关情况,请修改过滤条件后试试">
        <template #image>
          <van-icon class-prefix="icon" size="108" name="empty" color="#bfc6cc" />
        </template>
      </van-empty>
    </div>
  </div>
</template>
<script setup>
import AppHeader from '@/components/CustomNavBar/index.vue'
import CustomInput from '@/components/Input/index.vue'
import ProductImg from '@/components/ProductImg/index.vue'
const searchVal = ref(undefined)
const classes = ref([
  { name: 'All' },
  { name: 'Chair' },
  { name: 'Sofa' },
  { name: 'Table' },
  { name: 'Bed' }
])
const selectedClass = ref('All')
const results = ref([
  {
    type: 'Office',
    name: 'Direka Chair',
    price: 100,
    score: 4.5,
    src: new URL('@/assets/image/product3.png', import.meta.url).href
  }
])
const resultAmount = computed(() => {
  return `Result (${results.value.length})`
})
const emptyUrl = new URL('@/assets/image/empty.png', import.meta.url).href
</script>
<style lang="scss" scoped>
.container {
  .search-container {
    padding: 2em;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    .border-input {
      border-radius: 24px;
      border: 1px solid rgba(49, 69, 46, 1);
      .right-icon-container {
        padding-left: 0.2em;
        .right-icon {
          padding-left: 0.5em;
          border-left: 0.2em solid rgb(189, 194, 200);
          line-height: 1.8em;
          height: auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      }
    }
    .search-classes {
      height: 70px; //  60px
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow-x: auto;
      // scrollbar-width: none;
      // ::-webkit-scrollbar {
      //     display: none;
      // }
      .classes-item {
        width: 3.5em;
        height: 1.8em;
        border-radius: 2.2em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 1.6em;
        font-weight: 400;
        letter-spacing: 0.06px;
      }
      .selected {
        color: #ffffff;
        background: #000000;
      }
      .no-selected {
        color: rgba(191, 198, 204, 1);
        border: 2px solid rgba(227, 231, 236, 1);
      }
    }
  }
  .results-scroll {
    padding: 0em 2em 2em 2em;
    height: calc(100vh - 50px - 70px);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    .results-amount {
      font-size: 1.2em;
      font-weight: 600;
      letter-spacing: 0.08px;
      line-height: 1.2em;
      color: rgba(17, 17, 17, 1);
    }
    .results-items {
      .results-item {
        padding-top: 1em;
        display: flex;
        flex-direction: row;
        align-items: stretch;
        .item-img {
          width: 12em;
          height: 10em;
          border-radius: 1em;
        }
        .item-info {
          padding-left: 0.5em;
          display: flex;
          flex: 1;
          flex-direction: column;
          align-items: stretch;
          .item-info-row1 {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            font-size: 1.2em;
            font-weight: 600;
            letter-spacing: 0.06px;
            line-height: 1.5em;
            color: rgba(102, 112, 122, 1);
            .item-info-star {
              color: #ffcd1a;
            }
          }
          .item-info-name {
            font-size: 1.5em;
            font-weight: 700;
            letter-spacing: 0.08px;
            line-height: 2em;
            color: rgba(17, 17, 17, 1);
          }
          .item-info-price {
            font-size: 1.2em;
            line-height: 1em;
          }
        }
      }
    }
  }
  .empty-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ::v-deep(.van-empty__image) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
