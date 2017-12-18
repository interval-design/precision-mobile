/**
 * 用户相关接口
 * @authors Pony <mycnj123@gmail.com>
 */
import axios from 'axios'

export default {

  /**
   * 获取当前用户详情
   * @returns {*}
   */
  getCurrentUser(params){
    return axios.get('/api/current_user/',params);
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
   * 获取图形验证码
   * @param params
   * @returns {*}
   */
  getCaptcha(params) {
    return axios.get('/api/captcha/', {params: params});
  },

  /**
   * 发送微信用户绑定手机验证码短信
   * @returns {AxiosPromise<any>}
   */
  sendBind(params) {
    return axios.post('/api/sms/bind/', params);
  },

  /**
   * 微信用户绑定手机
   * @param params
   * @returns {AxiosPromise<any>}
   */
  bind(params) {
    return axios.put('/api/user/bind/', params);
  },

  /**
   * 发送用户改绑手机旧手机验证码短信
   * @param params
   * @returns {AxiosPromise<any>}
   */
  sendBindChangeOld(params){
    return axios.post('/api/sms/switch/old/', params);
  },

  /**
   * 发送用户改绑手机新手机验证码短信
   * @param params
   * @returns {AxiosPromise<any>}
   */
  sendBindChangeNew(params){
    return axios.post('/api/sms/switch/new/', params);
  },

  /**
   * 用户改绑手机验证
   * @param params
   * @returns {AxiosPromise<any>}
   */
  bindChangeCheck(params){
    return axios.put('/api/user/switch/check/', params);
  },

  /**
   * 用户改绑手机
   * @param params
   * @returns {AxiosPromise<any>}
   */
  bindChange(params){
    return axios.put('/api/user/switch/', params);
  },

  /**
   * 列出当前用户的报告
   * @param params
   * @returns {AxiosPromise<any>}
   */
  getReports(params){
    return axios.get('/api/current_user/reports/', params);
  },

  /**
   * 更新报告查看次数
   * @param subOrderId
   * @param params
   * @returns {AxiosPromise<any>}
   */
  updateReportViews(subOrderId,params){
    return axios.put(`/api/sub_orders/${subOrderId}/report_views/`, params);
  }
}
