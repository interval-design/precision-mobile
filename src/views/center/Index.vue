<template>
  <div class="itv-center">
    <div class="itv-center-hd">
      <div class="itv-avatar">
        <img :src="$bus.weixinUser.headimgurl" alt="avatar">
      </div>
      <p>{{ $bus.weixinUser.nickname }}</p>
      <p>
        <icon-svg icon-class="phone-white"></icon-svg>
        {{ $bus.user.mobile }}</p>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'CenterIndex',
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
      }
    }
  }
</style>
