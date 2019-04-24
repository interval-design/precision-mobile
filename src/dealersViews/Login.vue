<template>
  <div class="itv-bind">
    <header class="header">肠道菌群基因检测</header>
    <div class="itv-form">
      <div class="itv-input-group" :class="{'active':focus === 1}">
        <icon-svg :icon-class="focus === 1 ? 'phone' : 'phone-disabled'"></icon-svg>
        <input class="itv-input" type="text" v-model="bindForm.mobile" placeholder="请输入手机号" @focus="focus = 1">
      </div>
      <div class="itv-input-group" :class="{'active':focus === 3}">
        <icon-svg :icon-class="focus === 3 ? 'code' : 'code-disabled'"></icon-svg>
        <input class="itv-input" type="text" v-model="bindForm.code" placeholder="输入验证码" @focus="focus = 3">
        <base-button size="small" :disabled="codeStatus.sending || bindForm.captchaCode === ''" @click="sendCode">{{ codeStatus.statusText}}
        </base-button>
      </div>
      <div class="info-tip">{{ bindForm.errorText }}</div>
    </div>
    <base-button width="100%" @click="submit">立即绑定</base-button>
  </div>
</template>

<script>
  import ApiUser from '../api/user';

  export default {
    name: "DealersLogin",
    mounted(){
      // TODO: 通过cookie存在与否，来判断是否前往扫码页面
    },
    data() {
      return {
        bindForm: {
          mobile: '',
          code: '',
          errorText: ''
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
          code: this.bindForm.code
        }).then(res => {
          if (res.data.code === 0) {
            this.bindForm.errorText = '';
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
            this.bindForm.errorText = res.data.message;
          }
        });
      },

      /**
       * 提交绑定
       */
      submit() {
        // TODO: 接口要改
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
<style lang="scss" scope>
  @import "../styles/variable";

  .itv-bind {
    padding: 96px 72px;
    text-align: center;
    color: $blue;
    .header{
      font-size: 58px;
      font-weight: bold;
      margin-bottom: 48px;
      letter-spacing: 10px;
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
