webpackJsonp([29],{"M/dV":function(s,t,e){"use strict";function a(s){e("hfee")}Object.defineProperty(t,"__esModule",{value:!0});var r=e("wIDu"),i=e("Z5Fx"),n={name:"BuyIndex",computed:{formatAddress:function(){return this.address.province+" "+this.address.city+" "+this.address.district+" "+this.address.street}},watch:{addresses:function(){0===this.addresses.length&&this.$router.replace({name:"AddressAdd"})}},created:function(){this.loadDetails()},mounted:function(){var s=this;this.$nextTick(function(){if(s.$bus.address)return void(s.address=s.$bus.address);s.loadAddresses()})},data:function(){return{details:null,address:{},number:1}},methods:{loadAddresses:function(){var s=this;r.a.getAddresses().then(function(t){0===t.data.code&&(s.address=s.$bus.address=t.data.data.addresses[0])})},loadDetails:function(){var s=this;r.a.getInviteCodeGroup(this.$bus.encryptCode).then(function(t){0===t.data.code?s.details=t.data.data.invite_code_group:s.$router.replace({name:"BuyError"})})},createOrders:function(){var s=this;i.a.createOrders(this.$bus.encryptCode,{product_id:this.details.product.id,quantity:this.number,address_id:this.$bus.address.id}).then(function(t){if(0===t.data.code){var e=t.data.data.order.id;s.createTransactions(e)}else s.$router.replace({name:"BuyError"})})},createTransactions:function(s){var t=this;i.a.createTransactions(s,{channel:"WX_JSAPI"}).then(function(s){if(0===s.data.code){var e=s.data.data;wx.chooseWXPay({timestamp:e.timeStamp,nonceStr:e.nonceStr,package:e.package,signType:e.signType,paySign:e.paySign,success:function(s){"chooseWXPay:ok"===s.errMsg&&t.$router.push({name:"TransactionsSuccess"})}})}else t.$router.push({name:"TransactionsError"})})}}},d=function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"itv-buy"},[a("router-link",{staticClass:"itv-address itv-bg-white",attrs:{to:{name:"Address"}}},[a("icon-svg",{attrs:{"icon-class":"location"}}),s._v(" "),a("div",{staticClass:"itv-address-info"},[a("h2",{staticClass:"itv-address-info-title"},[s._v("收货信息")]),s._v(" "),a("div",{staticClass:"itv-address-info-content"},[a("p",[s._v(s._s(s.formatAddress))]),s._v(" "),a("div",{staticClass:"consignee"},[a("span",[s._v(s._s(s.address.consignee))]),s._v(" "),a("span",[s._v(s._s(s.address.phone))])])])]),s._v(" "),a("icon-svg",{staticStyle:{"align-self":"center"},attrs:{"icon-class":"arrow-right"}})],1),s._v(" "),s.details?[a("div",{staticClass:"itv-product-info"},[1===s.details.product.id?a("img",{attrs:{src:e("6+qI"),srcset:e("6+qI")+" 2x"}}):s._e(),s._v(" "),2===s.details.product.id?a("img",{attrs:{src:e("lh62"),srcset:e("lh62")+" 2x"}}):s._e(),s._v(" "),3===s.details.product.id?a("img",{attrs:{src:e("Y/cV"),srcset:e("Y/cV")+" 2x"}}):s._e(),s._v(" "),a("h1",{staticClass:"itv-product-info-name"},[s._v(s._s(s.details.product.name))]),s._v(" "),a("base-number",{model:{value:s.number,callback:function(t){s.number=t},expression:"number"}})],1),s._v(" "),a("base-cell",{attrs:{title:"应付金额"}},[a("span",{staticClass:"itv-highlight-red money"},[s._v("￥"+s._s((s.details.product.price-s.details.discount)/100)+" ")])])]:s._e(),s._v(" "),a("base-button",{attrs:{type:"error",size:"big",width:"100%",fixed:"bottom"},on:{click:s.createOrders}},[s._v("支付订单")])],2)},c=[],o={render:d,staticRenderFns:c},u=o,l=e("VU/8"),v=a,p=l(n,u,!1,v,null,null);t.default=p.exports},hfee:function(s,t,e){var a=e("nHBe");"string"==typeof a&&(a=[[s.i,a,""]]),a.locals&&(s.exports=a.locals);e("rjj0")("965802ce",a,!0)},nHBe:function(s,t,e){t=s.exports=e("FZ+f")(!1),t.push([s.i,"\n.itv-buy .itv-product-info {\n  margin: 16px 0;\n}\n.itv-buy .money {\n  font-size: 32px;\n}\n",""])}});