import Vue from 'vue'
import App from './App'
import router from './router'
import Bus from './bus'
import axios from 'axios'
import CustomComponents from './components/components'
import * as Cookies from 'tiny-cookie'
import './icons'


Vue.config.productionTip = false;
Vue.prototype.$bus = Bus;
Vue.use(Cookies);
Vue.use(CustomComponents);

router.afterEach((to, from, next) => {;
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 200)
});

// request 拦截器
axios.interceptors.request.use(
  config => {
    if (!Cookies.get('_prs_user')) {
      // TODO:等待测试
      // location.href = process.env.NODE_HOST + `extensions/wx/user/login?status=${location.href}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// response 拦截器
axios.interceptors.response.use(
  response => {
    // token过期
    if (response.data.code === 1101) {
      // location.reload();
    }
    return response;
  },
  error => {
    return Promise.reject(error.response.data.message)   // 返回接口返回的错误信息
  }
);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});

new Vue({
  el: "title",
  computed: {
    title() {
      return this.$bus.title;
    }
  }
});
