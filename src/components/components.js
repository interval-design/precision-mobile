/**
 * 注册全局组件
 * @authors Pony <mycnj123@gmail.com>
 */

import Vue from 'vue'
import BaseButton from './BaseButton.vue'
import BaseDialog from './BaseDialog.vue'

const PRECISION = {
  BaseButton,
  BaseDialog,
};

export default () =>{
  Object.keys(PRECISION).forEach((key) => {
    Vue.component(key, PRECISION[key])
  })
}


