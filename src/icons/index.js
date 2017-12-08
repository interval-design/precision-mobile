/**
 * 封装icons
 * @authors Pony <mycnj123@gmail.com>
 */
import Vue from 'vue';
import IconSvg from '../components/IconSvg.vue'

Vue.component('icon-svg', IconSvg);

const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./svg', false, /\.svg$/);
requireAll(req);
