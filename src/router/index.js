import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      setTimeout(() => {
        window.scrollTo(savedPosition.x, savedPosition.y)
      }, 200)
    }
  },
  routes: [
    // 绑定手机
    {
      path: '/bind',
      name: 'Bind',
      component: (resolve) => require(["@/views/Bind"], resolve)
    },
    {
      path: '/bind-success',
      name: 'BindSuccess',
      component: (resolve) => require(["@/views/BindSuccess"], resolve)
    },

    // 首页
    {
      path: '/',
      name: 'Index',
      meta:{nav:true},
      component: (resolve) => require(["@/views/Index"], resolve)
    },

    // 服务
    {
      path: '/services',
      name: 'Services',
      meta:{nav:true},
      component: (resolve) => require(["@/views/services/Index"], resolve)
    },
    {
      path: '/services/child',
      name: 'ServiceChild',
      component: (resolve) => require(["@/views/services/Child"], resolve)
    },
    {
      path: '/services/filter',
      name: 'ServiceFilter',
      component: (resolve) => require(["@/views/services/Filter"], resolve)
    },
    {
      path: '/services/ecosystem',
      name: 'ServiceEcosystem',
      component: (resolve) => require(["@/views/services/Ecosystem"], resolve)
    },

    // 下单
    {
      path: '/buy',
      name: 'Buy',
      meta:{auth:true},
      component: (resolve) => require(["@/views/buy/Index"], resolve)
    },
    // 购买失败
    {
      path: '/buy-error',
      name: 'BuyError',
      meta:{auth:true},
      component: (resolve) => require(["@/views/buy/BuyError"], resolve)
    },
    // 交易失败
    {
      path: '/transactions-error',
      name: 'TransactionsError',
      meta:{auth:true},
      component: (resolve) => require(["@/views/buy/TransactionsError"], resolve)
    },
    // 交易成功
    {
      path: '/transactions-success',
      name: 'TransactionsSuccess',
      meta:{auth:true},
      component: (resolve) => require(["@/views/buy/TransactionsSuccess"], resolve)
    },

    // 收货地址
    {
      path: '/address',
      name: 'Address',
      meta:{auth:true},
      component: (resolve) => require(["@/views/buy/AddressSelect"], resolve)
    },
    {
      path: '/address-add',
      name: 'AddressAdd',
      meta:{auth:true},
      component: (resolve) => require(["@/views/buy/AddressEdit"], resolve)
    },
    {
      path: '/address-edit',
      name: 'AddressEdit',
      meta:{auth:true},
      component: (resolve) => require(["@/views/buy/AddressEdit"], resolve)
    },

    // 个人中心
    {
      path: '/user',
      name: 'User',
      meta:{nav:true},
      component: (resolve) => require(["@/views/user/Index"], resolve)
    },

    // 订单
    {
      path: '/orders',
      name: 'Orders',
      meta:{nav:true},
      component: (resolve) => require(["@/views/user/orders/Index"], resolve)
    },
    {
      path: '/orders/:order_id',
      name: 'OrderDetails',
      meta:{auth:true},
      component: (resolve) => require(["@/views/user/orders/Details"],resolve)
    },

    // 报告
    {
      path: '/reports',
      name: 'Reports',
      component: (resolve) => require(["@/views/user/reports/Index"], resolve)
    },

    // 领取体验码
    {
      path: '/invite-code',
      name: 'InviteCode',
      component: (resolve) => require(["@/views/InviteCode"], resolve)
    },

    // 关于普瑞森
    {
      path: '/precision',
      name: 'Precision',
      meta:{nav:true},
      component: (resolve) => require(["@/views/precision/Index"], resolve)
    },

    // 微生物组学
    {
      path: '/microbiology',
      name: 'Microbiology',
      component: (resolve) => require(["@/views/precision/Microbiology"], resolve)
    },

    // 关于普瑞森
    {
      path: '/about',
      name: 'About',
      component: (resolve) => require(["@/views/about/Index"], resolve),
      children: [
        {
          path: 'info',
          name: 'AboutInfo',
          meta: {index: 1},
          component: (resolve) => require(["@/views/about/Info"], resolve),
        },
        {
          path: 'team',
          name: 'AboutTeam',
          meta: {index: 2},
          component: (resolve) => require(["@/views/about/Team"], resolve),
        },
        {
          path: 'join',
          name: 'AboutJoin',
          meta: {index: 3},
          component: (resolve) => require(["@/views/about/Join"], resolve),
        }
      ]
    },

    // 科研动态
    {
      path: '/article',
      name: 'Articles',
      component: (resolve) => require(["@/views/article/Index"], resolve)
    },

    // 动态详情
    {
      path: '/article/:articleId',
      name: 'ArticleDetail',
      component: (resolve) => require(["@/views/article/Details"], resolve),
    }
  ]
})
