<script setup>
import AppTabbar from '@/components/AppTabbar/index.vue'

const personal_info = [
  {
    name: 'Profile',
    icon: new URL('@/assets/image/person.png', import.meta.url).href,
    path: '/profile'
  },
  {
    name: 'Payment Method',
    icon: new URL('@/assets/image/Work.png', import.meta.url).href,
    path: '/payment'
  }
]

const security = [
  {
    name: 'Change Password',
    icon: new URL('@/assets/image/Icon_Lock.png', import.meta.url).href,
    path: '/changePassword'
  },
  {
    name: 'Forgot Password',
    icon: new URL('@/assets/image/Unlock.png', import.meta.url).href,
    path: '/forgotPassword'
  },
  {
    name: 'Security',
    icon: new URL('@/assets/image/Shield_Done.png', import.meta.url).href,
    path: '/security'
  }
]
const General = [
  {
    name: 'Language',
    icon: new URL('@/assets/image/globe.png', import.meta.url).href,
    path: '/language'
  },
  {
    name: 'Notification',
    icon: new URL('@/assets/image/trash.png', import.meta.url).href,
    path: '/notification'
  }
]

const About = [
  {
    name: 'Legal and Policies',
    icon: new URL('@/assets/image/shield.png', import.meta.url).href,
    path: '/about'
  },
  {
    name: 'Help & Support',
    icon: new URL('@/assets/image/question.png', import.meta.url).href,
    path: '/helpAndSupport'
  },
  {
    name: 'Dark Mode',
    icon: new URL('@/assets/image/Activity.png', import.meta.url).href,
    path: '/logout'
  }
]
const show = ref(false)
const router = useRouter()
const showLogout = () => {
  show.value = !show.value
}
const goRoute = (item) => {
  router.push({ path: item.path })
}
</script>

<template>
  <header class="pt-10 pb-3 mb-3 mx-3">
    <div class="flex items-center">
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
  </header>
  <main>
    <div class="mx-3 safari_only">
      <div class="">
        <h5 class="text-sm font-semibold py-2">Personal info</h5>
        <div
          class="flex justify-between items-center py-3"
          @click="goRoute(item)"
          v-for="(item, index) in personal_info"
          :key="index"
        >
          <div class="flex items-center">
            <van-icon :name="item.icon" />
            <span class="pl-3 text-base font-semibold">{{ item.name }}</span>
          </div>
          <div>
            <van-icon name="arrow" color="#888888" style="font-weight: bold" />
          </div>
        </div>
      </div>
      <div class="py-3">
        <h5 class="text-sm font-semibold py-2">Security</h5>
        <div
          class="flex justify-between items-center py-3"
          @click="goRoute(item)"
          v-for="(item, index) in security"
          :key="index"
        >
          <div class="flex items-center">
            <van-icon :name="item.icon" />
            <span class="pl-3 text-base font-semibold">{{ item.name }}</span>
          </div>
          <div>
            <van-icon name="arrow" color="#888888" style="font-weight: bold" />
          </div>
        </div>
      </div>
      <div>
        <h5 class="text-sm font-semibold py-2">General</h5>
        <div
          class="flex justify-between items-center py-3"
          @click="goRoute(item)"
          v-for="(item, index) in General"
          :key="index"
        >
          <div class="flex items-center">
            <van-icon :name="item.icon" />
            <span class="pl-3 text-base font-semibold">{{ item.name }}</span>
          </div>
          <div>
            <van-icon name="arrow" color="#888888" style="font-weight: bold" />
          </div>
        </div>
      </div>
      <div>
        <h5 class="text-sm font-semibold py-2">About</h5>
        <div
          class="flex justify-between items-center py-3"
          @click="goRoute(item)"
          v-for="(item, index) in About"
          :key="index"
        >
          <div class="flex items-center">
            <van-icon :name="item.icon" />
            <span class="pl-3 text-base font-semibold">{{ item.name }}</span>
          </div>
          <div>
            <van-icon name="arrow" color="#888888" style="font-weight: bold" />
          </div>
        </div>
      </div>
      <div
        @click="showLogout"
        class="h-16 bg-black text-white flex justify-center items-center rounded-3xl mt-10"
      >
        <span class="text-lg">Log Out</span>
      </div>
    </div>
  </main>
  <app-tabbar></app-tabbar>
  <van-dialog v-model:show="show" :showConfirmButton="false">
    <div class="logout-container">
      <div class="row-close">
        <van-icon size="24" color="#000000" name="cross" @click="showLogout" />
      </div>
      <div class="logout-content">
        <div class="content-words">Are you sure you want to</div>
        <div class="content-words">logout?</div>
        <div class="buttons-container">
          <div class="logout-button cancel" @click="showLogout">Cancel</div>
          <div class="logout-button logout">Log out</div>
        </div>
      </div>
    </div>
  </van-dialog>
</template>

<style scoped lang="scss">
@import url('@/assets/style/gj.scss');
:deep(.van-icon__image) {
  width: 22px;
  height: 22px;
}
.logout-container {
  padding: 24px 24px 34px 24px;
  display: flex;
  flex-direction: column;
  .row-close {
    text-align: right;
  }
  .logout-content {
    padding-top: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .content-words {
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 0.09px;
      line-height: 26px;
      color: rgba(17, 17, 17, 1);
    }
    .buttons-container {
      padding-top: 32px;
      display: flex;
      flex-direction: column;
      .logout-button {
        border-radius: 20px;
        padding: 12px 66px;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0.07px;
      }
      .cancel {
        background: rgba(49, 69, 46, 1);
        color: #ffffff;
      }
      .logout {
        background: #ffffff;
        color: rgba(229, 57, 53, 1);
      }
    }
  }
}
</style>
