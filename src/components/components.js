/**
 * 注册全局组件
 * @authors Pony <mycnj123@gmail.com>
 */

import Vue from 'vue'
import BaseButton from './BaseButton.vue'
import BaseDialog from './BaseDialog.vue'
import BaseInput from './BaseInput.vue'
import BaseCell from './BaseCell.vue'
import BaseNumber from './BaseNumber.vue'

const PRECISION = {
  BaseButton,
  BaseDialog,
  BaseInput,
  BaseCell,
  BaseNumber
};

export default () => {
  Object.keys(PRECISION).forEach((key) => {
    Vue.component(key, PRECISION[key])
  })
}


