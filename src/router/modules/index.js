/**
 * 作者TG:https://t.me/aicode8
 * 路由模块参数说明:
 * 在该配置文件中，每个路由模块的对象包含以下参数：
 * - path: 路由路径
 * - name: 路由名称
 * - component: 路由组件，使用懒加载方式导入
 * - meta: 路由元信息，包含以下属性：
 *   - title: 页面标题
 *   - requireAuth: 是否需要登录权限，true表示需要登录，false表示不需要登录
 *   - keepAlive: 是否需要缓存，true表示需要缓存，false表示不需要缓存
 */
import i18n from '@/lang/index.js'

export default [
  // 首页
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home/index.vue'),
    meta: {
      title: 'home',
      lang:'home',
      requireAuth: false,
      keepAlive: true
    }
  },
  //发现
  {
    path: '/explore',
    name: 'Explore',
    component: () => import('@/views/Explore/index.vue'),
    meta: {
      title: 'explore',
      lang:'explore',
      requireAuth: false,
      keepAlive: true
    }
  },
  //购物车
  {
    path: '/bag',
    name: 'Bag',
    component: () => import('@/views/Bag/index.vue'),
    meta: {
      title: '购物车',
      lang:'cart',
      requireAuth: false,
      keepAlive: true
    }
  },
  //  order
  {
    path: '/order',
    name: 'Order',
    component: () => import('@/views/Order/index.vue'),
    meta: {
      title: 'order',
      lang:'order',
      requireAuth: false,
      keepAlive: true
    }
  },
  {
    path: '/orderInfo/:id?',
    name: 'OrderInfo',
    component: () => import('@/views/OrderInfo/index.vue'),
    meta: {
      title: 'orderDetail',
      lang:'orderDetail',
      requireAuth: false,
      keepAlive: true
    }
  },
  //  退款申请
  {
    path: '/refund/:id?/:sn?/:product_ids?/:amount?',
    name: 'Refund',
    component: () => import('@/views/OrderInfo/refund.vue'),
    meta: {
      title: 'appDrawBack',
      lang:'appDrawBack',
      requireAuth: false,
      keepAlive: true
    }
  },
  //  结算
  {
    path: '/checkout',
    name: 'CheckOut',
    component: () => import('@/views/CheckOut/index.vue'),
    meta: {
      title: 'settle',
      lang:'settle',
      requireAuth: false,
      keepAlive: true
    }
  },
  //  我的购买
  {
    path: '/myPurchases/:status?',
    name: 'MyPurchases',
    component: () => import('@/views/MyPurchases/index.vue'),
    meta: {
      title: 'myOrders',
      lang:'myOrders',
      requireAuth: false,
      keepAlive: true
    }
  },
  //  语言
  {
    path: '/language',
    name: 'Language',
    component: () => import('@/views/Language/index.vue'),
    meta: {
      title: 'language',
      lang:'language',
      requireAuth: false,
      keepAlive: true
    }
  },
  //  通知
  {
    path: '/notification',
    name: 'Notification',
    component: () => import('@/views/Notifications/index.vue'),
    meta: {
      title: 'notification',
      lang:'notification',
      requireAuth: false,
      keepAlive: true
    }
  },
  //  profile
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile/index.vue'),
    meta: {
      title: 'profile',
      requireAuth: false,
      keepAlive: true
    }
  },
  //  forget password
  {
    path: '/forgotPassword',
    name: 'ForgotPassword',
    component: () => import('@/views/ForgotPassword/index.vue'),
    meta: {
      title: 'forgetPassword',
      requireAuth: false,
      keepAlive: true
    }
  },
  // change password
  {
    path: '/changePassword',
    name: 'ChangePassword',
    component: () => import('@/views/ChangePassword/index.vue'),
    meta: {
      title: 'changePassword',
      requireAuth: false,
      keepAlive: true
    }
  },
  {
    path: '/changePayPwd',
    name: 'ChangePayPwd',
    component: () => import('@/views/ChangePayPwd/index.vue'),
    meta: {
      title: 'paymentCode',
      requireAuth: false,
      keepAlive: true
    }
  },
  //  help and support
  {
    path: '/helpAndSupport',
    name: 'HelpAndSupport',
    component: () => import('@/views/HelpAndSupport/index.vue'),
    meta: {
      title: 'helpAndSupport',
      requireAuth: false,
      keepAlive: true
    }
  },
  //  提现
  {
    path: '/withDraw',
    name: 'WithDraw',
    component: () => import('@/views/WithDraw/index.vue'),
    meta: {
      title: 'draw',
      requireAuth: false,
      keepAlive: true
    }
  },
  {
    path: '/depositRecord',
    name: 'DepositRecord',
    component: () => import('@/views/WithDraw/record.vue'),
    meta: {
      title: 'drawRecord',
      requireAuth: false,
      keepAlive: true
    }
  },
  //  TopUp
  {
    path: '/topUp',
    name: 'TopUp',
    component: () => import('@/views/TopUp/index.vue'),
    meta: {
      title: 'recharge',
      requireAuth: false,
      keepAlive: true
    }
  },
  //  WalletTopUp
  {
    path: '/walletTopUp',
    name: 'WalletTopUp',
    component: () => import('@/views/WalletTopUp/index.vue'),
    meta: {
      title: 'rechargeOnChain',
      requireAuth: false,
      keepAlive: true
    }
  },
  //  cardTopUp
  {
    path: '/cardTopUp',
    name: 'CardTopUp',
    component: () => import('@/views/CardTopUp/index.vue'),
    meta: {
      title: 'rechargeCard',
      requireAuth: false,
      keepAlive: true
    }
  },
  {
    path: '/topUpRecord',
    name: 'TopUpRecord',
    component: () => import('@/views/WalletTopUp/record.vue'),
    meta: {
      title: 'rechargeRecord',
      requireAuth: false,
      keepAlive: true
    }
  },
  //  capitalRecord
  {
    path: '/capitalRecord',
    name: 'CapitalRecord',
    component: () => import('@/views/CapitalRecord/index.vue'),
    meta: {
      title: 'fundRecord',
      requireAuth: false,
      keepAlive: true
    }
  },
  {
    path: '/myFavourite',
    name: 'MyFavourite',
    component: () => import('@/views/MyFavourite/index.vue'),
    meta: {
      title: '我的喜欢',
      requireAuth: false,
      keepAlive: true
    }
  },
  //  payment
  {
    path: '/payment',
    name: 'Payment',
    component: () => import('@/views/Payment/index.vue'),
    meta: {
      title: 'payment',
      requireAuth: false,
      keepAlive: true
    }
  },
  //  Security
  {
    path: '/security',
    name: 'Security',
    component: () => import('@/views/Security/index.vue'),
    meta: {
      title: 'security',
      requireAuth: false,
      keepAlive: true
    }
  },
  //喜爱
  {
    path: '/heart',
    name: 'Heart',
    component: () => import('@/views/Heart/index.vue'),
    meta: {
      title: '喜爱',
      requireAuth: false,
      keepAlive: true
    }
  },
  //我的
  {
    path: '/filter',
    name: 'Filter',
    component: () => import('@/views/Filter/index.vue'),
    meta: {
      title: 'me',
      lang:'me',
      requireAuth: false,
      keepAlive: true
    }
  },
  //  设置
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('@/views/Setting/index.vue'),
    meta: {
      title: 'setting',
      requireAuth: false,
      keepAlive: true
    }
  },
  //列表页
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/Home/search/index.vue'),
    meta: {
      title: 'search',
      requireAuth: false,
      keepAlive: true
    }
  },
  //popular product
  {
    path: '/popular', // 子路由的路径为空表示它是默认子路由
    name: 'Popular',
    component: () => import('@/views/PopularList/index.vue'),
    meta: {
      title: '流行商品',
      requireAuth: false,
      keepAlive: true
    }
  },
  //detail
  {
    path: '/detail/:product?/:mer?', // 子路由的路径为空表示它是默认子路由
    name: 'Detail',
    component: () => import('@/views/Detail/index.vue'),
    meta: {
      title: 'detail',
      requireAuth: false,
      keepAlive: false
    }
  },
  //登录
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/index.vue'),
    meta: {
      title: 'login',
      requireAuth: false,
      keepAlive: true
    }
  },
  // 注册
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register/index.vue'),
    meta: {
      title: 'register',
      requireAuth: false,
      keepAlive: true
    }
  },
  //  平台信息
  {
    path: '/platform',
    name: 'Platform',
    component: () => import('@/views/Platform/index.vue'),
    meta: {
      title: '平台信息',
      requireAuth: false,
      keepAlive: true
    }
  },
  //  法律和政策
  {
    path: '/law',
    name: 'Law',
    component: () => import('@/views/Law/index.vue'),
    meta: {
      title: '法律和政策',
      requireAuth: false,
      keepAlive: true
    }
  },
  {
    path: '/address',
    name: 'Address',
    component: () => import('@/views/Address/index.vue'),
    meta: {
      title: '收货地址',
      requireAuth: false,
      keepAlive: true
    }
  },
  {
    path: '/addressForm/:id?',
    name: 'AddressForm',
    component: () => import('@/views/AddressForm/index.vue'),
    meta: {
      title: '收货地址管理',
      requireAuth: false,
      keepAlive: true
    }
  },
  {
    path: '/shop/:id?',
    name: 'Shop',
    component: () => import('@/views/Shop/index.vue'),
    meta: {
      title: '商铺信息',
      requireAuth: false,
      keepAlive: true
    }
  },
  //  全部商品
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/views/Products/index.vue'),
    meta: {
      title: '全部商品',
      requireAuth: false,
      keepAlive: true
    }
  },
  {
    path: '/service',
    name: 'Service',
    component: () => import('@/views/Service/index.vue'),
    meta: {
      title: '客服',
      requireAuth: false,
      keepAlive: true
    }
  },
  {
    path: '/passwords',
    name: 'Passwords',
    component: () => import('@/views/Passwords/index.vue'),
    meta: {
      title: '修改密码',
      requireAuth: false,
      keepAlive: true
    }
  },
]
