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
    created() {
      this.initToken();

      //  用户更新事件
      this.$bus.$on(this.$bus.EVENTS.USER_UPDATE, () => {
        this.getCurrentUser()
      });
      // 微信用户更新事件
      this.$bus.$on(this.$bus.EVENTS.WX_USER_UPDATE, () => {
        this.getCurrentWeixinUser()
      });
      this.getCurrentUser();
      this.getCurrentWeixinUser();
    },
    watch:{
      $route(){
        if (this.$route.meta.auth) {
          if(!this.$cookies.getRaw('_prs_wx_user')){
            location.href = process.env.NODE_HOST + `extensions/wx/user/authorize/?state=${location.href}`;
          }
          setTimeout(()=>{
            // 用户存在，手机未绑定，跳转到手机绑定页面
            if (this.$bus.user.mobile === '' || !this.$bus.user.mobile && this.$route.name !== 'Bind') {
              console.log(this.$bus.user.mobile);
              this.$router.push({ name: 'Bind'})
            }
          },500);
        }
      }
    },
    methods: {
      initToken() {
        ApiWx.getWexinToken({url: location.href.split('#')[0]}).then(res => {
          let data = res.data;
          if (data.code === 0) {
            wx.config({
              debug: false,
              appId: data.data.appid,
              timestamp: data.data.timestamp,
              nonceStr: data.data.noncestr,
              signature: data.data.signature,
              jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'addCard', 'chooseCard','chooseWXPay']
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
