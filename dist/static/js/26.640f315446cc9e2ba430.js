webpackJsonp([26],{dOrt:function(t,i,e){"use strict";function n(t){e("rbhM")}Object.defineProperty(i,"__esModule",{value:!0});var l=e("viA7"),s={name:"Articles",created:function(){this.getArticles()},data:function(){return{articles:[]}},methods:{getArticles:function(){var t=this;l.a.getArticles({params:{channel:1,order_by:"-weight",page:"",per_page:""}}).then(function(i){0===i.data.code&&(t.articles=i.data.data.articles)})}},filters:{time:function(t){return t=new Date(t),t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()},text:function(t){return t.length>=40&&(t=t.substr(0,38)+"……"),t}}},a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"itv-article"},[e("ul",{staticClass:"itv-article-list"},t._l(t.articles,function(i){return e("li",{key:i.id,staticClass:"itv-article-list-item",on:{click:function(e){t.$router.push({name:"ArticleDetail",params:{articleId:i.id}})}}},[e("div",{staticClass:"itv-article-list-item__img"},[e("img",{attrs:{src:i.image,alt:""}})]),t._v(" "),e("div",{staticClass:"itv-article-list-item__text"},[e("h3",{staticClass:"itv-article-list-item__title"},[t._v(t._s(i.title))]),t._v(" "),e("p",{staticClass:"itv-article-list-item__summary"},[t._v(t._s(t._f("text")(i.summary)))]),t._v(" "),e("span",{staticStyle:{flex:"1"}}),t._v(" "),e("p",{staticClass:"itv-article-list-item__info"},[e("span",[t._v(t._s(i.author))]),t._v(" "),e("span",[t._v(t._s(t._f("time")(i.iso_create_time)))])])])])})),t._v(" "),0===t.articles.length?e("p",{staticStyle:{padding:"40px"}},[t._v("暂无动态")]):t._e()])},r=[],c={render:a,staticRenderFns:r},o=c,_=e("VU/8"),p=n,m=_(s,o,!1,p,null,null);i.default=m.exports},pjiX:function(t,i,e){i=t.exports=e("FZ+f")(!1),i.push([t.i,"\n.itv-article-list-item {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  border-bottom: 1px solid #EAEAEA;\n  background: #FFFFFF;\n}\n.itv-article-list-item__img {\n    padding: 20px;\n}\n.itv-article-list-item__img img {\n      width: 160px;\n      height: 160px;\n}\n.itv-article-list-item__text {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    padding: 20px;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n}\n.itv-article-list-item__title {\n    font-size: 28px;\n    line-height: 40px;\n}\n.itv-article-list-item__summary, .itv-article-list-item__info {\n    font-size: 24px;\n    color: #8D99A6;\n}\n.itv-article-list-item__info {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n}\n",""])},rbhM:function(t,i,e){var n=e("pjiX");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);e("rjj0")("3dae7897",n,!0)},viA7:function(t,i,e){"use strict";var n=e("mtWM"),l=e.n(n);i.a={getArticles:function(t){return l.a.get("/api/articles/",t)},getArticleDetail:function(t,i){return l.a.get("/api/articles/"+t+"/",i)}}}});