/**
 * 订单相关接口
 * @authors Pony <mycnj123@gmail.com>
 */

import axios from 'axios'

export default {
  /**
   * 由微信卡券code创建订单
   * @param WxCardCode
   * @param params
   * @returns {AxiosPromise<any>}
   */
  createOrders(WxCardCode, params) {
    return axios.post(`/api/invite_codes/${WxCardCode}/orders/`, params);
  },

  /**
   * 创建交易
   * @param orderId
   * @param params
   * @returns {AxiosPromise<any>}
   */
  createTransactions(orderId, params) {
    return axios.post(`/api/orders/${orderId}/transactions/`, params);
  },

  /**
   * 列出当前用户的订单
   * @param params
   * @returns {AxiosPromise<any>}
   */
  getOrders(params) {
    return axios.get('/api/current_user/orders/', {params: params});
  },

  /**
   * 获取订单详情
   * @param orderId
   * @param params
   * @returns {AxiosPromise<any>}
   */
  getOrdersDetails(orderId, params) {
    return axios.get(`/api/orders/${orderId}/`, {params: params});
  }
}
