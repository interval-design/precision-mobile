<template>
  <div class="itv-bind">
    <img class="logo" src="../assets/logo.png" alt="logo">
    <p>绑定手机即可体验普瑞森服务</p>
    <div class="itv-form">
      <div class="itv-input-group" :class="{'active':focus === 1}">
        <icon-svg :icon-class="focus === 1 ? 'phone' : 'phone-disabled'"></icon-svg>
        <input class="itv-input" type="text" v-model="bindForm.mobile" placeholder="请输入新手机号" @focus="focus = 1">
      </div>
      <div class="itv-input-group" :class="{'active':focus === 2}">
        <icon-svg :icon-class="focus === 2 ? 'captcha' : 'captcha-disabled'"></icon-svg>
        <input class="itv-input" type="text" v-model="bindForm.captchaCode" placeholder="请输入验证码" @focus="focus = 2">
        <div class="captcha-group">
          <img class="img" :src="'data:img/jpg;base64,' + bindForm.captchaImage" alt="captchaImage">
          <span class="refresh" @click="getCaptcha">刷新</span>
        </div>
      </div>
      <div class="itv-input-group" :class="{'active':focus === 3}">
        <icon-svg :icon-class="focus === 3 ? 'code' : 'code-disabled'"></icon-svg>
        <input class="itv-input" type="text" v-model="bindForm.code" placeholder="输入验证码" @focus="focus = 3">
        <base-button size="small" :disabled="codeStatus.sending || bindForm.captchaCode === ''" @click="sendCode">获取验证码
        </base-button>
      </div>
      <div class="info-tip">{{ bindForm.errorText }}</div>
    </div>
    <base-button width="100%" @click="submitBind">立即绑定</base-button>
  </div>
</template>

<script>
  import ApiUser from '../api/user';

  export default {
    name: 'Login',
    created() {
      this.getCaptcha();
    },
    data() {
      return {
        bindForm: {
          mobile: '',
          code: '',
          captchaCode: '',
          errorText: '',
          captchaImage: null,
          captchaToken: null
        },
        codeStatus: {
          statusText: "获取验证码",
          sending: false,
          interval: undefined,
        },
        focus: 1,
      }
    },
    methods: {
      /**
       * 获取图形验证码
       */
      getCaptcha() {
        ApiUser.getCaptcha({
          width: 100,
          height: 50
        }).then(res => {
          let _data = res.data.data;
          if (res.data.code === 0) {
            this.bindForm.captchaImage = _data.image;
            this.bindForm.captchaToken = _data.token;
          }
        })
      },

      /**
       * 获取验证码
       */
      sendCode() {
        let _seconds = 30;
        if (this.bindForm.mobile === "") {
          this.bindForm.errorText = "手机号不能为空";
          return;
        }
        ApiUser.sendBind({
          mobile: this.bindForm.mobile,
          captcha_token: this.bindForm.captchaToken,
          captcha_code: this.bindForm.captchaCode
        }).then(res => {
          if (res.data.code === 0) {
            this.bindForm.errorText = '';
            this.codeStatus.sending = true;
            this.codeStatus.statusText = _seconds + 's';
            this.codeStatus.interval = setInterval(() => {
              if (_seconds === 1) {
                this.codeStatus.sending = false;
                this.codeStatus.statusText = "获取验证码";
                clearInterval(this.status.interval);
                return;
              }
              _seconds--;
              this.codeStatus.statusText = _seconds + "s";
            }, 1000);
          }
          else {
            this.bindForm.errorText = res.data.message;
          }
        });
      },

      /**
       * 提交绑定
       */
      submitBind() {
        ApiUser.bind({
          mobile: this.bindForm.mobile,
          code: this.bindForm.code
        }).then(res => {
          let _data = res.data.data;
          if (res.data.code === 0) {
            this.$bus.$emit(this.$bus.EVENTS.USER_UPDATE, _data.user);
            this.$cookies.setRaw('_prs_user', _data.token, {expires: '30D'});
            this.$router.push({name:'BindSuccess'});
          } else {
            this.bindForm.errorText = res.data.message;
          }
        });
      },

    },
  }
</script>
<style lang="scss">
  @import "../styles/variable";

  .itv-bind {
    padding: 96px 72px;
    text-align: center;
    color: $blue;
    .logo {
      margin-bottom: 48px;
    }
    .itv-form{
      padding: 64px 0;
    }
    .info-tip {
      padding: 16px 0;
      color: $red;
      text-align: right;
    }
  }
</style>
