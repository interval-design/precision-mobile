import Vue from 'vue';

export default new Vue({
  data() {
    return {
      title: null,
      user: {},
      weixinUser:{},
      scrollPosition:null,
      EVENTS: {
        TITLE:'TITLE',
        LOGIN: 'LOGIN',
        USER_UPDATE: 'USER_UPDATE',
        WEIXIN_USER_UPDATE: 'WEIXIN_USER_UPDATE',
      },
    }
  }
});

