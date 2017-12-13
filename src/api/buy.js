/**
 * 下单相关接口
 * @authors Pony <mycnj123@gmail.com>
 */
import axios from 'axios'

export default {
  /**
   * 根据微信卡券code获取邀请码组详情
   * @param WxCardCode
   * @param params
   * @returns {AxiosPromise<any>}
   */
  getInviteCodeGroup(WxCardCode, params) {
    return axios.get(`/api/invite_codes/${WxCardCode}/invite_code_group/`, {params: params});
  },

  /**
   * 列出当前用户的收货地址列表
   * @param params
   * @returns {AxiosPromise<any>}
   */
  getAddresses(params) {
    return axios.get('/api/current_user/addresses/', {params: params});
  },

  /**
   * 创建收货人地址
   * @param params
   * @returns {AxiosPromise<any>}
   */
  creatdAddress(params) {
    return axios.post('/api/addresses/', params);
  },
}
