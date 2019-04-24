<template>
  <div class="itv-center">
    <div class="itv-center-hd">
      <div class="itv-avatar">
        <img src="../assets/avatar.png" alt="avatar">
      </div>
      <p>{{ $bus.dealersUser.mobile }}</p>
    </div>
    <div class="itv-center-order">
      <router-link :to="{name:'DealersOrders',query:{tab:'all'}}">
        <base-cell title="我的订单" value="查看全部" size="small" icon>
          <icon-svg slot="icon" icon-class="arrow-right-small"
                    style="width: 24px;height: 24px;margin-left: 16px"></icon-svg>
        </base-cell>
      </router-link>
      <div class="itv-center-order-bd">
        <router-link :to="{name:'DealersOrders',query:{tab:'ing'}}">
          <icon-svg icon-class="order-ing" class-name="user-order"></icon-svg>
          <span>进行中</span>
        </router-link>
        <router-link :to="{name:'DealersOrders',query:{tab:'done'}}">
          <icon-svg icon-class="order-done" class-name="user-order"></icon-svg>
          <span>已完成</span>
        </router-link>
      </div>
    </div>
    <router-link :to="{name:'DealersReports'}" class="itv-center-report">
      <h2>我的报告<span class="new" v-if="$bus.dealersUser.total_unread_reports > 0">有新报告</span></h2>
      <div><span class="total">{{ $bus.dealersUser.total_reports }}</span>份</div>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'DealersUser',
    data() {
      return {}
    },
    methods: {},
  }
</script>
<style lang="scss">
  @import '../styles/variable';

  .itv-center {
    &-hd {
      padding: 24px 0;
      height: 250px;
      background: url('../assets/center/index-hd.jpg') no-repeat;
      background-position: center;
      background-size: cover;
      text-align: center;
      color: $white;
      p {
        padding-top: 16px;
        span {
          vertical-align: middle;
        }
      }
      .mobile {
        margin: 0 8px;
      }
    }
    &-order {
      &-bd {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 64px 88px 24px;
        background: $white;
        border-top: 1px solid $border;
        a {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          color: $font-sub;
          line-height: 2;
        }
      }
    }
    &-report {
      display: inline-block;
      margin: 16px 0;
      height: 150px;
      width: 100%;
      padding: 16px 88px;
      background: url("../assets/center/pic-report.jpg") no-repeat;
      background-position: right;
      h2 {
        display: flex;
        align-items: center;
        font-size: 28px;
      }
      .new {
        padding: 4px 8px;
        margin-left: 16px;
        background: $red;
        color: $white;
        font-size: 20px;
        border-radius: 20px;
      }
      .total {
        padding: 0 16px;
        font-size: 64px;
        color: $blue;
      }
    }
  }
</style>
