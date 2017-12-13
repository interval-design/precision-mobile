import Vue from 'vue';

export default new Vue({
  data() {
    return {
      title: null,
      user: {},
      weixinUser:{},
      encryptCode:'', // 购买时选券返回的加密码
      addressId:null,
      scrollPosition:null,
      EVENTS: {
        USER_UPDATE: 'USER_UPDATE',
        WEIXIN_USER_UPDATE: 'WEIXIN_USER_UPDATE',
      },
    }
  }
});

