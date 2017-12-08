<template>
  <div class="it-main">
    <transition name="fade" mode="out-in">
      <router-view class="itv-view"></router-view>
    </transition>
  </div>
</template>

<script>
  import ApiUser from './api/user';

  export default {
    name: 'app',
    created() {
      document.body.addEventListener('touchstart',()=>{});
      this.initToken();

      // title更新事件
      this.$bus.$on(this.$bus.EVENTS.TITLE, (title) => {
        this.$bus.title = title;
      });
      // 用户登录事件
      this.$bus.$on(this.$bus.EVENTS.LOGIN, (user) => {
        this.$bus.user = user;
      });

      //  用户更新事件
      this.$bus.$on(this.$bus.EVENTS.USER_UPDATE, (callback) => {
        this.getCurrentUser(callback)
      });
    },
    methods: {
      initToken() {
        ApiUser.getWexinToken({url: location.href.split('#')[0]}).then(res => {
          let data = res.data;
          if (data.code === 0) {
            wx.config({
              debug: false,
              appId: data.data.appid,
              timestamp: data.data.timestamp,
              nonceStr: data.data.noncestr,
              signature: data.data.signature,
              jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'addCard']
            });
          }
        });
      },

      /**
       * TODO:获取当前用户详情
       * @param callback
       */
      getCurrentUser(callback) {},

      /**
       * 获取当前微信用户详情
       */
      getCurrentWeixinUser(){
        ApiUser.getCurrentWeixinUser().then(res=>{
          if(res.data.code === 0){
            this.$bus.weixinUser = res.data.data.wx_user;
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "styles/custom.scss";

  .it-main {
    position: relative;
    background-color: $bg;
    min-height: 100%;
    max-width: 100%;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .itv-view {
    min-height: 100%;
    width: 100%;
    height: 100%;
    .bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
    }
  }
</style>
