webpackJsonp([21],{IQmx:function(t,e,s){var r=s("L57p");"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);s("rjj0")("8eb43082",r,!0,{})},L57p:function(t,e,s){var r=s("kxFB");e=t.exports=s("FZ+f")(!1),e.push([t.i,"\n.itv-orders-details_hd {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 24px 48px;\n  height: 200px;\n  background: url("+r(s("NE4k"))+") no-repeat;\n  background-position: center;\n  background-size: cover;\n  text-align: center;\n  color: #FFFFFF;\n}\n.itv-orders-details_hd .desc {\n    text-align: left;\n    margin-left: 48px;\n}\n.itv-orders-details_hd .desc h2 {\n      font-size: 28px;\n      margin-bottom: 16px;\n}\n.itv-orders-details_info {\n  padding: 8px;\n  margin-top: 16px;\n}\n.itv-orders-details_info .pay {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    color: #8D99A6;\n    padding: 16px;\n}\n.itv-orders-details_progress {\n  margin-top: 16px;\n  border-bottom: 1px solid #EAEAEA;\n}\n.itv-orders-details_progress p {\n    padding: 16px 0 0;\n}\n.itv-orders-details .tracking {\n  color: #3C90EF;\n  text-decoration: underline;\n}\n",""])},NE4k:function(t,e,s){t.exports=s.p+"static/img/index-hd.012cd04.jpg"},XVdU:function(t,e,s){"use strict";function r(t){s("IQmx")}Object.defineProperty(e,"__esModule",{value:!0});var i=s("Z5Fx"),n=s("vMJZ"),a={name:"OrdersDetails",computed:{showAnalyzeTime:function(){if(this.order.iso_receive_time)return Date.now()>this.getAnalyzeTime()},transaction:function(){switch(this.order.transaction){case"ALI_ORCODE":return"支付宝网页扫码支付";case"WX_NATIVE":return"微信网页扫码支付";case"WX_JSAPI":return"微信公众号支付"}}},created:function(){this.loadOrderDetails()},data:function(){return{order:null}},methods:{loadOrderDetails:function(){var t=this;i.a.getOrdersDetails(this.$route.params.order_id).then(function(e){0===e.data.code&&(t.order=e.data.data.order)})},getAnalyzeTime:function(){return new Date(this.order.iso_receive_time).getTime()+6048e5+3429720},billTracking:function(t){location.href="http://www.sf-express.com/cn/sc/dynamic_function/waybill/#search/bill-number/"+t.join(",")},orderStatus:function(t){return["待付款","已付款","试剂盒已寄出","样本检测中","已完成","已关闭"][t]},openReport:function(t,e){n.a.updateReportViews(t,{}).then(function(t){0===t.data.code&&(location.href=e)})}}},o=function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.order?r("div",{staticClass:"itv-orders-details"},[5!==t.order.status?r("div",{staticClass:"itv-orders-details_hd"},[0===t.order.status?[r("icon-svg",{attrs:{"icon-class":"order-0","class-name":"order"}}),t._v(" "),t._m(0)]:t._e(),t._v(" "),1===t.order.status?[r("icon-svg",{attrs:{"icon-class":"order-1","class-name":"order"}}),t._v(" "),t._m(1)]:t._e(),t._v(" "),2===t.order.status?[r("icon-svg",{attrs:{"icon-class":"order-2","class-name":"order"}}),t._v(" "),t._m(2)]:t._e(),t._v(" "),3!==t.order.status||t.showAnalyzeTime?t._e():[r("icon-svg",{attrs:{"icon-class":"order-3","class-name":"order"}}),t._v(" "),t._m(3)],t._v(" "),3===t.order.status&&t.showAnalyzeTime?[r("icon-svg",{attrs:{"icon-class":"order-3-2","class-name":"order"}}),t._v(" "),t._m(4)]:t._e(),t._v(" "),4===t.order.status?[r("icon-svg",{attrs:{"icon-class":"order-4","class-name":"order"}}),t._v(" "),t._m(5)]:t._e()],2):t._e(),t._v(" "),r("div",{staticClass:"itv-product-info"},[1===t.order.product?r("img",{attrs:{src:s("6+qI"),srcset:s("6+qI")+" 2x"}}):t._e(),t._v(" "),2===t.order.product?r("img",{attrs:{src:s("lh62"),srcset:s("lh62")+" 2x"}}):t._e(),t._v(" "),3===t.order.product?r("img",{attrs:{src:s("Y/cV"),srcset:s("Y/cV")+" 2x"}}):t._e(),t._v(" "),r("h1",{staticClass:"itv-product-info-name"},[t._v(t._s(t.order.product_name))]),t._v(" "),r("span",{staticClass:"itv-product-info-num"},[t._v("x"+t._s(t.order.quantity))])]),t._v(" "),t.order.status>2?r("div",{staticClass:"itv-orders-details_progress itv-address itv-bg-white"},[r("icon-svg",{attrs:{"icon-class":"car"}}),t._v(" "),r("div",{staticClass:"itv-address-info"},[r("h2",{staticClass:"itv-address-info-title"},[t._v("试剂盒已寄出 "),r("span",{staticClass:"tracking",on:{click:function(e){t.billTracking(t.order.tracking_nos)}}},[t._v("运单快捷查询")])]),t._v(" "),r("div",{staticClass:"itv-address-info-content"},[r("p",[t._v("快递公司：顺丰速运")]),t._v(" "),r("p",[t._v("运单编号："+t._s(t.order.tracking_nos[0]))]),t._v(" "),r("p",[t._v("寄出时间："+t._s(t._f("formatTime")(t.order.iso_send_time)))])])])],1):t._e(),t._v(" "),r("div",{staticClass:"itv-address itv-bg-white"},[r("icon-svg",{attrs:{"icon-class":"location"}}),t._v(" "),r("div",{staticClass:"itv-address-info"},[r("h2",{staticClass:"itv-address-info-title"},[t._v("收货信息")]),t._v(" "),r("div",{staticClass:"itv-address-info-content"},[r("p",[t._v(t._s(t.order.address))]),t._v(" "),r("div",{staticClass:"consignee"},[r("span",[t._v(t._s(t.order.consignee))]),t._v(" "),r("span",[t._v(t._s(t.order.phone))])])])])],1),t._v(" "),r("div",{staticClass:"itv-orders-details_info itv-bg-white"},[r("table",{staticClass:"itv-table"},[r("tr",[r("th",[t._v("订单编号：")]),t._v(" "),r("td",[t._v(t._s(t.order.code))])]),t._v(" "),r("tr",[r("th",[t._v("订单状态：")]),t._v(" "),r("td",[t._v(t._s(t.orderStatus(t.order.status)))])]),t._v(" "),r("tr",[r("th",[t._v("下单时间：")]),t._v(" "),r("td",[t._v(t._s(t._f("formatTime")(t.order.iso_create_time)))])]),t._v(" "),r("tr",[r("th",[t._v("支付时间：")]),t._v(" "),t.order._iso_pay_time?r("td",[t._v(t._s(t._f("formatTime")(t.order._iso_pay_time)))]):r("td",[t._v("-")])]),t._v(" "),t.order.iso_send_time?r("tr",[r("th",[t._v("试剂盒寄出时间：")]),t._v(" "),r("td",[t._v(t._s(t._f("formatTime")(t.order.iso_send_time)))])]):t._e(),t._v(" "),t.order.iso_receive_time?r("tr",[r("th",[t._v("收到试剂盒时间：")]),t._v(" "),r("td",[t._v(t._s(t._f("formatTime")(t.order.iso_receive_time)))])]):t._e(),t._v(" "),t.order.iso_finish_time?r("tr",[r("th",[t._v("完成时间：")]),t._v(" "),r("td",[t._v(t._s(t._f("formatTime")(t.order.iso_finish_time)))])]):t._e()])]),t._v(" "),t.order.transaction?r("div",{staticClass:"itv-orders-details_info itv-bg-white"},[r("div",{staticClass:"pay"},[r("span",[t._v("付款方式：")]),t._v(" "),r("td",[t._v(t._s(t.transaction))])]),t._v(" "),r("div",{staticClass:"pay"},[r("span",[t._v("实付金额:")]),t._v(" "),r("span",{staticClass:"itv-highlight-red"},[t._v("￥"+t._s(t.order.price/100))])])]):t._e(),t._v(" "),4===t.order.status?r("div",{staticClass:"itv-report itv-bg-white"},[r("h2",[t._v("检测报告")]),t._v(" "),t._l(t.order.sub_orders,function(e){return[r("div",{staticClass:"report-item",class:{"bg-filter":1===t.order.product,"bg-child":2===t.order.product,"bg-microbiology":3===t.order.product},on:{click:function(s){t.openReport(e.id,e.report_full_link.split(",")[0])}}},[r("h3",[t._v(t._s(e.product_name)+"报告")]),t._v(" "),r("p",{staticClass:"person"},[r("span",[t._v("被测人："+t._s(e.person_name?e.person_name:"-"))]),t._v(" "),r("span",[t._v(t._s(t._f("formatTime")(e.iso_finish_time)))])])]),t._v(" "),e.report_full_link.split(",").length>1?r("div",{staticClass:"report-item bg-microbiology",on:{click:function(s){t.openReport(e.id,e.report_full_link.split(",")[1])}}},[r("h3",[t._v("肠道微生态检测报告")]),t._v(" "),r("p",{staticClass:"person"},[r("span",[t._v("被测人："+t._s(e.person_name?e.person_name:"-"))]),t._v(" "),r("span",[t._v(t._s(t._f("formatTime")(e.iso_finish_time)))])])]):t._e()]}),t._v(" "),r("div",{staticClass:"itv-user-service"},[r("base-button",{attrs:{size:"small",line:""},on:{click:function(e){t.$router.push({name:"Message",query:{order_id:t.order.id}})}}},[r("base-badge",{attrs:{count:t.$bus.user.total_unread_messages,position:"left"}},[r("icon-svg",{attrs:{"icon-class":"message"}}),t._v("\n          给客服留言\n        ")],1)],1),t._v(" "),r("base-button",{attrs:{size:"small",line:""}},[r("a",{attrs:{href:"tel:0214008226270"}},[r("icon-svg",{attrs:{"icon-class":"telephone"}}),t._v("\n          客服电话\n        ")],1)])],1)],2):t._e()]):t._e()},_=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"desc"},[s("h2",[t._v("待付款")]),t._v(" "),s("p",[t._v("您已成功下单，请在30分钟内付款")]),t._v(" "),s("p",[t._v("否则订单将自动取消")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"desc"},[s("h2",[t._v("付款成功")]),t._v(" "),s("p",[t._v("您已付款成功，我们会尽快寄出试剂盒")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"desc"},[s("h2",[t._v("试剂盒已寄出")]),t._v(" "),s("p",[t._v("试剂盒已寄出，正马不停蹄奔向您")]),t._v(" "),s("p",[t._v("请注意签收哦~")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"desc"},[s("h2",[t._v("样本检测中")]),t._v(" "),s("p",[t._v("实验室正在为您检测样本……")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"desc"},[s("h2",[t._v("正在分析实验数据")]),t._v(" "),s("p",[t._v("实验室正将您的检测数据与普瑞森基因数据库进行数据对比")]),t._v(" "),s("p",[t._v("请耐心等待……")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"desc"},[s("h2",[t._v("已完成")]),t._v(" "),s("p",[t._v("您的检测报告已出")]),t._v(" "),s("p",[t._v("您可以点击下方报告查看完整报告")])])}],d={render:o,staticRenderFns:_},c=d,v=s("VU/8"),l=r,p=v(a,c,!1,l,null,null);e.default=p.exports}});