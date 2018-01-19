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


Vue.filter('formatTime', (time, cFormat) => {
  if (!time) {
    return '-';
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date = new Date(time);
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  });
  return time_str
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
