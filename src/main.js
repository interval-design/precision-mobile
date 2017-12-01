import Vue from 'vue'
import App from './App'
import router from './router'
import Bus from './bus'
import * as Cookies from 'tiny-cookie'

Vue.config.productionTip = false;
Vue.prototype.$bus = Bus;
Vue.use(Cookies);

router.afterEach((to, from, next) => {;
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 200)
});

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
