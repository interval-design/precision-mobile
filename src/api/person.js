/**
 * 被测人相关接口
 * @authors Pony <mycnj123@gmail.com>
 */

import axios from 'axios'

export default {
  /**
   * 编辑子订单被测人信息
   * @param kitCode
   * @param params
   * @returns {AxiosPromise<any>}
   * @constructor
   */
  EditPersonInfo(kitCode,params){
    return axios.put(`/api/sub_orders/${kitCode}/person_info/`,params);
  }
}
