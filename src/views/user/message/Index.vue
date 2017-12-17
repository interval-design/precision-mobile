<template>
  <div class="itv-message itv-bg-white">
    <div class="itv-message-list">
      <template v-for="message in messages">
        <div class="timestamp" v-if="showTimestamp(message.iso_create_time) === 'TRUE'">
          <span>{{ message.iso_create_time | timestamp }}</span>
        </div>
        <!-- 用户 -->
        <div class="itv-message-list-item user" v-if="message.user">
          <div class="itv-avatar">
            <img :src="$bus.weixinUser.headimgurl" alt="avatar">
          </div>
          <p class="content">{{ message.content }}</p>
        </div>
        <!-- 管理员 -->
        <div class="itv-message-list-item admin" v-else>
          <p class="content">{{ message.content }}</p>
          <div class="itv-avatar">
            <img src="../../../assets/avatar.png" alt="avatar">
          </div>
        </div>
      </template>
    </div>
    <div class="itv-message-input">
      <base-input type="textarea" v-model="content" placeholder="请输入" rows="6"></base-input>
      <base-button width="100%" @click="createdMessage" v-if="!$route.query.order_id">提交</base-button>
      <base-button width="100%" @click="createdOrderMessage" v-else>提交</base-button>
    </div>
  </div>
</template>

<script>
  import ApiMessages from '../../../api/message';

  export default {
    name: "Message",
    filters: {
      timestamp(val) {
        let _now = new Date();
        // 兼容IOS
        let _time = (() => {
          let _strTime = new Date(val + '+0800');
          if (_strTime == 'Invalid Date') {
            val = val.replace(/T/g, ' ');
            val = val.replace(/-/g, '/');
            _strTime = new Date(val);
          }
          return _strTime;
        })();
        let _interval = _now - _time; // 相差
        let addZero = (num) => {
          return (num < 10 ? '0' : '') + num;
        };
        let year = _time.getFullYear();
        let month = _time.getMonth() + 1;
        let day = _time.getDate();
        let hour = addZero(_time.getHours());
        let min = addZero(_time.getMinutes());
        let _d = 0, _h = 0, _m = 0;
        _d = Math.floor(_interval / 1000 / 3600 / 24);
        _h = Math.floor(_interval / 1000 / 60 / 60 % 24);
        _m = Math.floor(_interval / 1000 / 60 % 60);
        if (_h < 1) {
          return _m + "分钟前";
        } else if (_h >= 1 && _d === 0) {
          return _h + "小时" + _m + '分钟前';
        } else if (_d > 0) {
          switch (_d) {
            case 1:
              return '昨天';
              break;
            case 2:
              return '前天';
              break;
          }
        } else if (_d > 2) {
          return `${year}-${month}-${day} ${hour}:${min}`;
        }
      }
    },
    created() {
      if (this.$route.query.order_id) {
        this.loadOrderMessages();
        return;
      }
      this.loadMessages();
    },
    data() {
      return {
        messages: [],
        content: '',
      }
    },
    methods: {
      /**
       * 列出当前用户的留言
       */
      loadMessages() {
        ApiMessages.getMessages().then(res => {
          if (res.data.code === 0) {
            this.messages = res.data.data.messages;
          }
        })
      },

      /**
       * 创建留言
       */
      createdMessage() {
        ApiMessages.createdMessage({
          content: this.content
        }).then(res => {
          if (res.data.code === 0) {
            this.content = '';
            this.loadMessages();
          }
        })
      },

      /**
       * 根据订单列出留言
       */
      loadOrderMessages() {
        ApiMessages.getOrderMessages(this.$route.query.order_id).then(res => {
          if (res.data.code === 0) {
            this.messages = res.data.data.messages;
          }
        })
      },

      /**
       * 创建订单留言
       */
      createdOrderMessage() {
        ApiMessages.createdOrderMessage(this.$route.query.order_id, {
          content: this.content
        }).then(res => {
          if (res.data.code === 0) {
            this.content = '';
            this.loadOrderMessages();
          }
        })
      },

      showTimestamp(val) {
        let _now = new Date();
        // 兼容IOS
        let _time = (() => {
          let _strTime = new Date(val + '+0800');
          if (_strTime == 'Invalid Date') {
            val = val.replace(/T/g, ' ');
            val = val.replace(/-/g, '/');
            _strTime = new Date(val);
          }
          return _strTime;
        })();
        let _interval = _now - _time; // 相差
        let _m = 0;
        _m = Math.floor(_interval / 1000 / 60 % 60);
        if (_m >= 1) {
          return 'TRUE';
        }
        return 'FALSE';
      }
    },
  }
</script>

<style lang="scss">
  @import "../../../styles/variable";

  .itv-message {
    padding: 48px 32px;
    height: 100vh;
    &-list {
      height: 700px;
      margin-bottom: 72px;
      overflow: scroll;
      .timestamp {
        color: $font-sub;
        text-align: center;
        font-size: 20px;
        span {
          position: relative;
          &:before {
            position: absolute;
            content: "";
            left: -40px;
            top: 50%;
            width: 30px;
            height: 1px;
            background: $font-sub;
          }
          &:after {
            position: absolute;
            content: "";
            right: -40px;
            top: 50%;
            width: 30px;
            height: 1px;
            background: $font-sub;
          }
        }
      }
      &-item {
        display: flex;
        margin: 32px 0;
        .content {
          position: relative;
          padding: 24px;
          max-width: 450px;
          background: $bg;
          color: $font-sub;
          border-radius: 2px;
        }
        &.user {
          justify-content: flex-start;
          .content {
            margin-left: 32px;
            &:before {
              position: absolute;
              content: "";
              top: 20px;
              left: -8px;
              width: 0;
              height: 0;
              border-style: solid;
              border-width: 10px 10px 10px 0;
              border-color: transparent $bg transparent transparent;
              transform: translateY(-50%);
            }
          }
        }
        &.admin {
          justify-content: flex-end;
          .content {
            margin-right: 32px;
            &:before {
              position: absolute;
              content: "";
              top: 20px;
              right: -8px;
              width: 0;
              height: 0;
              border-style: solid;
              border-width: 10px 0 10px 10px;
              border-color: transparent transparent transparent $bg;
            }
          }
        }
      }
    }
    .itv-avatar {
      width: 80px;
      height: 80px;
    }
    .itv-base-input {
      margin-bottom: 32px;
      background: $bg;
      border: 1px solid $border;
    }
  }
</style>
