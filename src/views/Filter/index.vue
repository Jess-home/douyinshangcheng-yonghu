<template>
  <div class="container">
    <nav-bar :can-back="false" title="个人中心">
      <!--<template #right>-->
      <!--  <icon-park name="more" size="1.8rem"/>-->
      <!--</template>-->
    </nav-bar>
    <div class="content">
      <div class="user-info">
        <div class="user-avatar">
          <van-image :src="userInfo.avatar||Avatar" round width="4rem"/>
          <div class="user-tips">
            {{ userInfo.username }}
            <div class="welcome">
              {{ user_contacts }}
            </div>
          </div>
        </div>
        <!-- <icon-park name="mail" size="1.8rem" @click="goNotification"/> -->
      </div>
      <div class="user-card">
        <div class="row1">
          <div class="row1">
            我的余额&nbsp;(美元)
            <icon-park
                color="#ffffff"
                :name="showBalance?'preview-close-one':'preview-open'"
                size="1.8rem"
                style="padding-left: 0.6rem;"
                @click.stop="handlerSwitchShowBalance"
            />
          </div>
          <!--{{ balance }}-->
        </div>
        <div class="text-3xl font-semibold">
          {{ balance }}
        </div>
        <div class="row3">
          <div class="draw" @click.stop="handlerDraw">提现</div>
          <div style="flex: 1"/>
          <div class="deposit" @click.stop="handlerTopUp">充值</div>
        </div>
        <!-- <van-divider style="color: #ffffff" dashed /> -->
        <div class="grid grid-cols-2 mt-5">
          <div class="row4-column">
            <div class="rows-amount" style="padding-right:2.5rem;">{{ userInfo.order_unreceived }}</div>
            <span>未收到的商品</span>
          </div>
          <div class="row4-column">
            <div class="rows-amount">{{ userInfo.order_unpaid }}</div>
            <span>未付款的商品</span>
          </div>
        </div>
      </div>
      <div class="user-board">
        <van-image :src="PersonCenterBoard" widht="100%"/>
      </div>
      <div class="user-menus">
        <list-menus :menus="menus1" @click="handlerMenuClick"/>
        <div style="height: 0.5rem"/>
        <list-menus :menus="menus2" @click="handlerMenuClick"/>
      </div>
    </div>
  </div>
  <custom-floating-panel ref="floatingPanel" title="请选择语言">
    <language-item
        v-for="item in languages"
        :key="item.file_name"
        :language="item"
        @click="handlerLanguageChoose(item)"
    />
  </custom-floating-panel>
  <AppTabbar/>
</template>
<script name="Filter" setup>
import NavBar from '@/components/CustomNavBar/index.vue';
import Avatar from '@/assets/image/avatar.png';
import PersonCenterBoard from '@/assets/image/person-center-board.png';
import {formatNumberWithCommas} from '@/utils/filter.js';
import ListMenus from '@/components/ListMenus/index.vue';
import CustomFloatingPanel from '@/components/CustomFloatingPanel/index.vue';
import LanguageItem from '@/components/LanguageItem/index.vue';
import useUserStore from '@/stores/modules/user.js';
import toast from '@/utils/toast.js';
import { languageList,setDefaultLanguage } from '@/api/user.js';
const userStore = useUserStore();
const userInfo = computed(() => {
  return userStore.userInfo|| {};
});
const user_contacts=computed(()=>{
  return userStore.userInfo.email
})
const language = computed(() => {
  return userStore.getLanguage()
});
const router = useRouter();
//  提现
const handlerDraw = () => {
  router.push({name: 'WithDraw'});
};
//  提现
//  充值
const handlerTopUp = () => {
  router.push({name: 'TopUp'});
};
//  充值
const balance = computed(() => {
  if(showBalance.value){
    return formatNumberWithCommas(userInfo.value.money);
  }
  return '******'
});
const menus1 = ref([
  {
    name: '我的订单',
    iconName: 'order',
    routeName: 'MyPurchases'
  },
  {
    name: '资金记录',
    iconName: 'funds',
    routeName: 'CapitalRecord'
  },
  // {
  //   name: '我的喜欢',
  //   iconName: 'like-d06ib93c',
  //   routeName: 'MyFavourite'
  // },
  {
    name: '伙伴关系',
    iconName: 'chart-graph',
    routeName: 'Platform'
  },
  {
    name: '帮助和支持',
    iconName: 'help',
    routeName: 'HelpAndSupport'
  },
  {
    name: '法律和政策',
    iconName: 'shield',
    routeName: 'Law'
  }
]);
const menus2 = ref([
  {
    type: 'language',
    name: '语言',
    iconName: 'earth',
    // routeName: 'Language',
    rightName: language
  },
  {
    type: 'language',
    name: '收货地址',
    iconName: 'local',
    routeName: 'Address',
  },
  {
    name: '设置',
    iconName: 'setting-two',
    routeName: 'Setting'
  }
]);
const languages = ref([
]);
const goNotification = () => {
  router.push({name: 'Notification'});
};
const showBalance = ref(false);
const handlerSwitchShowBalance=()=>{
  showBalance.value = !showBalance.value;
}
const floatingPanel = ref(null);
const handlerMenuClick = (menu) => {
  if (menu.routeName) {
    router.push({name: menu.routeName});
    return;
  }
  switch (menu.type) {
    case 'language':
      floatingPanel.value.show = true;
      break;
    default:
      break;
  }
};
const handlerLanguageChoose = (language) => {
  floatingPanel.value.show = false;
  toast.loading();
  setDefaultLanguage({lang_id:language.id}).then(res=>{
    toast.success({msg:'设置成功'});
    userStore.setLanguage(language);
    getLanguages()
  }).catch(err=>err)

};
const getLanguages= () => {
  // toast.loading();
  languageList({
    page:1,limit:100
  }).then(res=>{
    languages.value = res.data.list;
  }).catch(err=>err)
}
getLanguages()
</script>
<style lang="scss" scoped>
@import url('@/assets/style/main.scss');

.container {
  padding: 0;
  overflow-y: hidden;

  .content {
    padding-top: 0;
    height: calc(100dvh - 100px);
    overflow-y: auto;

    .user-info {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .user-avatar {
        display: flex;
        flex-direction: row;
        align-items: center;

        .user-tips {
          padding-left: 0.8rem;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          font-size: 1rem;
          font-weight: 600;
          line-height: 1.2rem;

          .welcome {
            padding-top: 3px;
            font-weight: 400;
            font-size: 0.8rem;
            line-height: 1rem;
            color: #888888;
          }
        }
      }
    }

    .user-card {
      margin-top: 0.5rem;
      padding: 0.5rem 0.5rem 0.8rem 0.5rem;
      background: linear-gradient(317deg, #6b6b6b 0%, #1c1b1b 100%);
      border-radius: 0.6rem;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      color: #ffffff;

      .row1 {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-weight: 500;
        font-size: 1rem;
        line-height: 1.2rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }

      // .row2 {
      //   font-weight: bold;
      //   font-size: 1.4rem;
      //   line-height: 1.6rem;
      // }
      .row3 {
        padding: 0.5rem 0 1rem 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-weight: 400;
        font-size: 1.2rem;
        line-height: 1.4rem;
        letter-spacing: 0.5rem;
        border-bottom-style: dashed;
        border-bottom-width: 2px; /* 或者你想要的任何值 */
        border-bottom-color: #ffffff;

        .draw {
          flex: 3;
          text-align: center;
          color: #ffffff;
          border: 1px solid #fff;
          border-radius: 0.2rem;
          padding: 0.4rem;
        }

        .deposit {
          flex: 3;
          text-align: center;
          background: #ffffff;
          color: #191919;
          border-radius: 0.2rem;
          padding: 0.4rem;
        }
      }

      .row4 {
        padding-top: 0.6rem;
        display: flex;

        .row4-column {
          display: flex;
          flex-direction: column-reverse;
          font-weight: 400;
          font-size: 1rem;
          color: #ffffff;
          line-height: 1.6rem;

          .rows-amount {
            font-size: 1.2rem;
          }
        }
      }
    }

    .user-board {
      padding-top: 0.5rem;
    }

    .user-menus {
      padding-top: 0.2rem;

      ::v-deep(.menu-container) {
        padding: 0.8rem 0;
      }
    }
  }
}
</style>
