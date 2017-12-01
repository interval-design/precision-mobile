import Vue from 'vue';

export default new Vue({
  data() {
    return {
      title: null,
      user: {},
      scrollPosition:null,
      EVENTS: {
        TITLE:'TITLE',
        LOGIN: 'LOGIN',
        USER_UPDATE: 'USER_UPDATE',
      },
    }
  }
});

