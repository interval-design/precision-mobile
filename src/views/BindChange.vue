<template>
  <div class="itv-bind-change">
    <ul class="progress">
      <li class="progress-item" :class="{'now': progress.num===1,'success': progress.num>1}">
        <div class="progress-item__num">1</div>
        <p class="progress-item__text">验证当前手机号</p>
      </li>
      <li class="progress-line"><span></span></li>
      <li class="progress-item" :class="{'now': progress.num===2,'success': progress.num>2}">
        <div class="progress-item__num">2</div>
        <p class="progress-item__text">验证新的手机号</p>
      </li>
      <li class="progress-line"><span></span></li>
      <li class="progress-item" :class="{'success': progress.num===3}">
        <div class="progress-item__num">3</div>
        <p class="progress-item__text">完成改绑</p>
      </li>
    </ul>
    <div v-if="progress.num<3">
      <div class="itv-form">
        <div class="itv-input-group" :class="{'active':focus === 1}">
          <icon-svg :icon-class="focus === 1 ? 'phone' : 'phone-disabled'"></icon-svg>
          <input class="itv-input" type="text" v-model="bindForm.mobile" :placeholder="progress.phoneText" @focus="focus = 1">
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
      <base-button v-if="progress.num === 1" width="100%" @click="testPhone">{{progress.btnText}}</base-button>
      <base-button v-else width="100%" @click="bindPhone">{{progress.btnText}}</base-button>
      <div class="itv-bind-change-tips" v-if="progress.num === 1">
        <p>旧手机号无法使用？</p>
        <p>请您联系普瑞森客服进行人工申诉找回。（工作时间：工作日9:00-17:00）<a href="tel:4008226270">立即拨打</a></p>
      </div>
    </div>
    <div v-else class="itv-bind-change-success">
      <img src="../assets/images/pic-phone-done.png" alt="phone-done">
      <h1>恭喜您绑定成功</h1>
    </div>
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
        progress: {
          num: 1,
          phoneText: '请输入当前手机号',
          btnText: '下一步'
        }
      }
    },
    methods: {
      /**
       * 验证当前手机
       */
      testPhone() {
        this.progress = {
          num: 2,
          phoneText: '请输入新手机号',
          btnText: '立即绑定'
        }
      },

      /**
       * 绑定新手机
       */
      bindPhone() {
        this.progress.num = 3;
      },

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

  .itv-bind-change {
    padding: 96px 72px;
    text-align: center;
    color: $font-sub;
    .progress {
      display: flex;
      justify-content: space-between;
      &-line {
        margin: auto -50px;
        width: 120px;
        height: 56px;
        span {
          display: block;
          border-bottom: 2px dashed $font-sub;
        }
      }
      &-item {
        width: 168px;
        text-align: center;
        &__num {
          display: inline-block;
          vertical-align: top;
          width: 56px;
          height: 56px;
          line-height: 52px;
          border: 2px solid $font-sub;
          border-radius: 50%;
        }
        &__text {
          margin-top: 30px;
        }
        &.now {
          .progress-item__num {
            color: $white;
            background: $blue;
            border-color: $blue;
          }
          .progress-item__text {
            color: $blue;
          }
        }
        &.success {
          .progress-item__num {
            color: $white;
            background: $green;
            border-color: $green;
          }
          .progress-item__text {
            color: $green;
          }
        }
      }
    }
    .logo {
      margin-bottom: 48px;
    }
    .itv-form{
      padding: 64px 0;
    }
    .itv-input-group {
      display: flex;
      align-items: center;
      padding: 16px 8px;
      text-align: left;
      border-bottom: 1px solid $border;
      transition: all .3s;
      &:not(:first-child){
        margin-top: 64px;
      }
      .itv-input {
        flex: 1;
      }
      .icon-svg {
        margin-right: 16px;
      }
      .captcha-group {
        .img {
          display: inline-block;
          width: 120px;
          object-fit: contain;
        }
        .refresh {
          display: inline-block;
          color: $blue;
          font-size: 28px;
          vertical-align: bottom;
          cursor: pointer;
        }
      }
      &.active {
        border-bottom: 1px solid $blue;
        transition: all .3s;
      }
    }
    .info-tip {
      padding: 16px 0;
      color: $red;
      text-align: right;
    }
  }
  .itv-bind-change-success {
    margin-top: 130px;
    h1 {
      margin-top: 90px;
      font-size: 28px;
    }
  }
  .itv-bind-change-tips {
    margin-top: 64px;
    p:nth-of-type(1) {
      font-size: 28px;
      color: $yellow;
    }
    p:nth-of-type(2) {
      margin-top: 16px;
      padding: 0 32px;
      color: $font-sub;
      a {
        color: $blue;
        text-decoration: underline;
      }
    }
  }
</style>
