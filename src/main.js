import Vue from 'vue'
import App from './App'
import router from './router'
import Bus from './bus'
import axios from 'axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import * as Cookies from 'tiny-cookie'
import {CitySelect} from 'vue-ydui/dist/lib.px/cityselect';
import {Tab, TabPanel} from 'vue-ydui/dist/lib.rem/tab';
import 'vue-ydui/dist/ydui.base.css';
import CustomComponents from './components/components'
import './icons'

Vue.config.productionTip = false;
Vue.prototype.$bus = Bus;
Vue.prototype.$cookies = Cookies;
Vue.use(Cookies);
Vue.use(VueAwesomeSwiper);
Vue.use(CustomComponents);
Vue.component(CitySelect.name, CitySelect);
Vue.component(Tab.name, Tab);
Vue.component(TabPanel.name, TabPanel);


router.beforeEach((to, from, next) => {
  if (from.name === 'OrderDetails') {
    to.meta.isBack = true;
  }
  next();
});


Vue.filter('formatTime', (val) => {
  if (!val) {
    return '-';
  }
  /**
   * 数字补零
   */
  let addZero = (num) => {
    return (num < 10 ? '0' : '') + num;
  };
  let time = new Date(val);
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  let day = time.getDate();
  let hour = addZero(time.getHours());
  let min = addZero(time.getMinutes());
  return `${year}-${month}-${day} ${hour}:${min}`;
});

// 滚动到顶部
router.afterEach((to, from, next) => {
  if (to.name !== 'Orders') {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100)
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});

new Vue({
  el: "title",
  computed: {
    title() {
      return this.$bus.title;
    }
  }
});
