import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode: 'history',
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
      component: (resolve) => require(["@/views/buy/Index"], resolve)
    },
    {
      path: '/buy-error',
      name: 'BuyError',
      component: (resolve) => require(["@/views/buy/Error"], resolve)
    },
    {
      path: '/address',
      name: 'Address',
      component: (resolve) => require(["@/views/buy/AddressSelect"], resolve)
    },
    {
      path: '/address-add',
      name: 'AddressAdd',
      component: (resolve) => require(["@/views/buy/AddressEdit"], resolve)
    },
    {
      path: '/address-edit',
      name: 'AddressEdit',
      component: (resolve) => require(["@/views/buy/AddressEdit"], resolve)
    },

    // 个人中心
    {
      path: '/center',
      name: 'Center',
      meta:{nav:true},
      component: (resolve) => require(["@/views/center/Index"], resolve)
    },

    // 技术
    {
      path: '/research/microbiology',
      name: 'ResearchMicrobiology',
      component: (resolve) => require(["@/views/research/Microbiology"], resolve)
    },

    // 领取体验码
    {
      path: '/invite-code',
      name: 'InviteCode',
      component: (resolve) => require(["@/views/InviteCode"], resolve)
    },
  ]
})
