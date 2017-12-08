/**
 * 用户相关接口
 * @authors Pony <mycnj123@gmail.com>
 */
import axios from 'axios'

export default {
  /**
   * 获取微信配置
   * @param {*} params
   * @returns {AxiosPromise<any>}
   */
  getWexinToken(params) {
    return axios.get("/api/wx/js_sdk_config/", {params: params});
  },

  /**
   * 获取当前微信用户详情
   * @param params
   * @returns {AxiosPromise<any>}
   */
  getCurrentWeixinUser(params) {
    return axios.get("/api/current_wx_user/", {params: params});
  },

  /**
   * 获取添加微信卡券配置参数
   * @returns {AxiosPromise<any>}
   */
  cardConfig() {
    return axios.get(`/api/wx/card/${cardId}/add_card_config/`, {params: params});
  }
}
