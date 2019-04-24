import Vue from 'vue';

export default new Vue({
  data() {
    return {
      title: null,
      user: {},
      dealersUser:{},
      weixinUser:{},
      encryptCode:'', // 购买时选券返回的加密码
      proudctId:'',
      address:null,
      scrollPosition:null,
      EVENTS: {
        USER_UPDATE: 'USER_UPDATE',
        WX_USER_UPDATE: 'WX_USER_UPDATE',
      },
    }
  }
});

