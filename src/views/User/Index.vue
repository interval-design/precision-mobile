<template>
  <div class="itv-center">
    <div class="itv-center-hd">
      <div class="itv-avatar">
        <img :src="$bus.weixinUser.headimgurl" alt="avatar">
      </div>
      <p>{{ $bus.weixinUser.nickname }}</p>
      <p>
        <icon-svg icon-class="phone-white" style="width: 26px; height: 26px;"></icon-svg>
        <span class="mobile">{{ $bus.user.mobile }}</span>
        <span class="itv-highlight-yellow">去改绑</span>
      </p>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'UserIndex',
    created() {
    },
    data() {
      return {}
    },
    methods: {},
  }
</script>
<style lang="scss">
  @import '../../styles/variable';

  .itv-center {
    &-hd {
      padding: 24px 0;
      height: 250px;
      background: url('../../assets/center/index-hd.jpg') no-repeat;
      background-position: center;
      background-size: cover;
      text-align: center;
      color: $white;
      p{
        padding-top: 16px;
        span{
          vertical-align: middle;
        }
      }
      .mobile{
        margin: 0 8px;
      }
    }
  }
</style>
