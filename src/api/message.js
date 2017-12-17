/**
 * 留言相关接口
 * @authors Pony <mycnj123@gmail.com>
 */
import axios from 'axios'

export default {
  /**
   * 列出当前用户的留言
   * @param params
   * @returns {AxiosPromise<any>}
   */
  getMessages(params) {
    return axios.get('/api/current_user/messages/', {params: params});
  },

  /**
   * 创建留言
   * @param params
   * @returns {AxiosPromise<any>}
   */
  createdMessage(params) {
    return axios.post('/api/messages/', params);
  },

  /**
   * 根据订单列出留言
   * @param orderId
   * @param prams
   * @returns {AxiosPromise<any>}
   */
  getOrderMessages(orderId, params) {
    return axios.get(`/api/orders/${orderId}/messages/`, {params: params});
  },

  /**
   * 创建订单留言
   * @param orderId
   * @param params
   * @returns {AxiosPromise<any>}
   */
  createdOrderMessage(orderId, params) {
    return axios.post(`/api/orders/${orderId}/messages/`, params);
  }
}
