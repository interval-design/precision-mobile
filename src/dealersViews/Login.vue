<template>
  <div class="itv-bind">
    <p class="tit">肠道菌群基因检测</p>
    <div class="itv-form">
      <div class="itv-input-group" :class="{'active':focus === 1}">
        <icon-svg :icon-class="focus === 1 ? 'phone' : 'phone-disabled'"></icon-svg>
        <input class="itv-input" type="text" v-model="form.mobile" placeholder="请输入手机机号" @focus="focus = 1">
      </div>
      <div class="itv-input-group" :class="{'active':focus === 2}">
        <icon-svg :icon-class="focus === 2 ? 'captcha' : 'captcha-disabled'"></icon-svg>
        <input class="itv-input" type="text" v-model="form.captchaCode" placeholder="请输入验证码" @focus="focus = 2">
        <div class="captcha-group">
          <img class="img" :src="'data:img/jpg;base64,' + form.captchaImage" alt="captchaImage" v-if='form.captchaImage'>
          <span class="refresh" @click="getCaptcha">刷新</span>
        </div>
      </div>
      <div class="itv-input-group" :class="{'active':focus === 3}">
        <icon-svg :icon-class="focus === 3 ? 'code' : 'code-disabled'"></icon-svg>
        <input class="itv-input" type="text" v-model="form.code" placeholder="输入验证码" @focus="focus = 3">
        <base-button size="small" :disabled="codeStatus.sending || form.captchaCode === ''" @click="sendCode">{{ codeStatus.statusText}}
        </base-button>
      </div>
      <div class="info-tip">{{ form.errorText }}</div>
    </div>
    <base-button width="100%" @click="login">登 录</base-button>
  </div>
</template>

<script>
  import ApiUser from '../api/user';
  // 链接地址 http://192.168.31.200:8080/dealers/login?dealer_id=7
  export default {
    name: 'DealersLogin',
    mounted(){
      this.getCaptcha();
      if (this.$cookies.getRaw('_prs_user')) {
        this.$router.push({name:'DealersScanner'});
      }
    },
    data() {
      return {
        form: {
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
            this.form.captchaImage = _data.image;
            this.form.captchaToken = _data.token;
          }
        })
      },

      /**
       * 获取验证码
       */
      sendCode() {
        let _seconds = 30;
        if (this.form.mobile === "") {
          this.form.errorText = "手机号不能为空";
          return;
        }
        ApiUser.sendSmsLogin({
          mobile: this.form.mobile,
          captcha_token: this.form.captchaToken,
          captcha_code: this.form.captchaCode,
          dealer:7
        }).then(res => {
          if (res.data.code === 0) {
            this.form.errorText = '';
            this.codeStatus.sending = true;
            this.codeStatus.statusText = _seconds + 's';
            this.codeStatus.interval = setInterval(() => {
              if (_seconds === 1) {
                this.codeStatus.sending = false;
                this.codeStatus.statusText = "获取验证码";
                clearInterval(this.codeStatus.interval);
                return;
              }
              _seconds--;
              this.codeStatus.statusText = _seconds + "s";
            }, 1000);
          }
          else {
            this.form.errorText = res.data.message;
          }
        });
      },

      login() {
        if(this.form.mobile === '' || this.form.code === '' || this.form.captchaCode === ''){
          this.form.errorText = '信息填写不完整，请检查';
          return
        }
        ApiUser.login({
          mobile: this.form.mobile,
          code: this.form.code
        }).then(res => {
          let _data = res.data.data;
          if (res.data.code === 0) {
            this.$bus.$emit(this.$bus.EVENTS.USER_UPDATE, _data.user);
            this.$cookies.setRaw('_prs_user', _data.token, {expires: '30D'});
            if(this.$route.query.next){
              this.$router.replace({path:this.$route.query.next});
            } else {
              this.$router.replace({name:'DealersUser'});
            }
          } else {
            this.form.errorText = res.data.message;
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
    .tit{
      font-size:48px;
      letter-spacing: 10px;
    }
  }
</style>
