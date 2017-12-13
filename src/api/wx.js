/**
 * 微信相关接口
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
   * 获取添加微信卡券配置参数
   * @param cardId
   * @param params
   * @returns {AxiosPromise<any>}
   */
  cardConfig(cardId, params) {
    return axios.get(`/api/wx/card/${cardId}/add_card_config/`, {params: params});
  },

  /**
   * 获取拉取适用微信卡券列表配置参数
   * @param params
   * @returns {AxiosPromise<any>}
   */
  getCardList(params){
    return axios.get('/api/wx/card/choose_card_config/',{params:params});
  }
}
