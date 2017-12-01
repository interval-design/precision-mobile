<template>
  <div class="it-main">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: 'app',
    created() {
      document.body.addEventListener('touchstart', function() {});
      // response 拦截器
      axios.interceptors.response.use(
        response => {
          // token过期
          if (response.data.code === 1101) {
            // location.reload();
          }
          return response;
        },
        error => {
          return Promise.reject(error.response.data.message)   // 返回接口返回的错误信息
        }
      );
      // title更新事件
      this.$bus.$on(this.$bus.EVENTS.TITLE, (title) => {
        this.$bus.title = title;
      });
      // 用户登录事件
      this.$bus.$on(this.$bus.EVENTS.LOGIN, (user) => {
        this.$bus.user = user;
      });

      //  用户更新事件
      this.$bus.$on(this.$bus.EVENTS.USER_UPDATE, () => {
      });
    },
    methods: {
      /**
       * TODO:获取用户信息
       */
      getCurrentUser() {
      },
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
</style>
