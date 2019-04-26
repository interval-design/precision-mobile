<template>
  <div class="itv-main">
    <transition name="fade" mode="out-in">
      <keep-alive include="Orders">
        <router-view></router-view>
      </keep-alive>
    </transition>
    <nav class="itv-nav" v-show="$route.meta.nav">
      <router-link class="itv-nav-item" :to="{name:'Index'}">
        <icon-svg class-name="nav" :icon-class="$route.name == 'Index' ? 'home-active':'home'" ></icon-svg>
        <span>首页</span>
      </router-link>
      <router-link class="itv-nav-item" :to="{name:'Precision'}">
        <icon-svg class-name="nav" :icon-class="$route.name == 'Precision' ? 'about-active':'about'"></icon-svg>
        <span>关于普瑞森</span>
      </router-link>
      <router-link class="itv-nav-item" :to="{name:'Services'}">
        <icon-svg class-name="nav" :icon-class="$route.name == 'Services' ? 'services-active':'services'"></icon-svg>
        <span>购买服务</span>
      </router-link>
      <router-link class="itv-nav-item" :to="{name:'User'}">
        <icon-svg class-name="nav" :icon-class="$route.name == 'User' ? 'user-active':'user'"></icon-svg>
        <span>个人中心</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
  import ApiUser from './api/user';
  import ApiWx from './api/wx';

  export default {
    name: 'app',
    data() {
      return {
        firstEnter: true
      }
    },
    created() {
      if (window.entryUrl === undefined || window.entryUrl === '') {
        window.entryUrl = location.href.split('#')[0]
      }
    },
    watch:{
      $route(){
        this.initToken();
        if(this.firstEnter){
          this.checkLink()
          this.firstEnter = false
        }
        if(this.$route.path.indexOf('dealers') === -1){
          this.authCheck();
        }
      }
    },
    methods: {
      checkLink(){
        //  用户更新事件
        this.$bus.$on(this.$bus.EVENTS.USER_UPDATE, () => {
          this.getCurrentUser()
        });
        this.getCurrentUser();
        // 主入口
        if(this.$route.path.indexOf('dealers') === -1){
          // 微信用户更新事件
          this.$bus.$on(this.$bus.EVENTS.WX_USER_UPDATE, () => {
            this.getCurrentWeixinUser()
          });
          this.getCurrentWeixinUser();
          document.title = '普瑞森'
        } else {
          document.title = '肠道菌群基因检测'
        }
      },

      initToken() {
        let signLink = /(Android)/i.test(navigator.userAgent) ? location.href.split('#')[0] : window.entryUrl
        ApiWx.getWexinToken({url:signLink}).then(res => {
          let data = res.data;
          if (data.code === 0) {
            wx.config({
              debug: false,
              appId: data.data.appid,
              timestamp: data.data.timestamp,
              nonceStr: data.data.noncestr,
              signature: data.data.signature,
              jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'addCard', 'chooseCard','chooseWXPay','scanQRCode']
            });
          }
        });
      },

      /**
       * 获取当前用户详情
       * @param callback
       */
      getCurrentUser() {
        ApiUser.getCurrentUser().then(res => {
          if (res.data.code === 0) {
            this.$bus.user = res.data.data.user;
            return
          }
          if(res.data.code === 1101){
            if(this.$route.path.indexOf('dealers') !== -1){
              this.$router.push({name:'DealersLogin',query:{next:this.$route.path}})
            }
          }
        })
      },

      /**
       * 获取当前微信用户详情
       */
      getCurrentWeixinUser() {
        ApiUser.getCurrentWeixinUser().then(res => {
          if (res.data.code === 0) {
            this.$bus.weixinUser = res.data.data.wx_user;
          }
        })
      },

      /**
       * 检查页面权限，是否需要授权/绑定手机号
       */
      authCheck(){
        if (this.$route.meta.auth) {
          if(!this.$cookies.getRaw('_prs_wx_user')){
            location.href = process.env.NODE_HOST + `extensions/wx/user/authorize/?state=${encodeURIComponent(location.href)}.`;
          }
          setTimeout(()=>{
            // 用户存在，手机未绑定，跳转到手机绑定页面
            if (this.$bus.user.mobile === '' || !this.$bus.user.mobile && this.$route.name !== 'Bind') {
              this.$router.push({ name: 'Bind'})
            }
          },500);
        }
      }
    }
  }
</script>

<style lang="scss">
  @import 'styles/custom.scss';

  .itv-main {
    position: relative;
    min-height: 100%;
    width: 100%;
    overflow-x: hidden;
    .bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
    }
  }
</style>
