<template>
  <div class="itv-orders">
    <yd-tab class="itv-orders-nav" active-color="#3C90EF" :callback="tabActive">
      <yd-tab-panel label="全部" :active="$route.query.tab === 'all'"></yd-tab-panel>
      <yd-tab-panel label="进行中" :active="$route.query.tab ==='ing'"></yd-tab-panel>
      <yd-tab-panel label="已完成" :active="$route.query.tab === 'done'"></yd-tab-panel>
    </yd-tab>
    <div class="itv-orders-container itv-action-result" v-if="orders.length === 0">
      <img src="../../assets/images/pic-box-none.png">
      <h1>您还没有订单</h1>
    </div>
    <div class="itv-orders-container" v-else>
      <router-link class="itv-orders-item itv-bg-white" :to="{name:'DealersOrderDetails',params:{order_id:order.id}}"
                   v-for="order in orders" :key="order.id">
        <div class="itv-orders-item_hd">
          <span>订单号 {{ order.code }}</span>
          <span class="itv-highlight-blue" v-if="order.status < 5 ">{{ orderStatus(order.status) }}</span>
          <span class="itv-highlight-red" v-else>{{ orderStatus(order.status) }}</span>
        </div>
        <div class="itv-orders-item_bd itv-product-info">
          <img src="../../assets/images/pic-filter.png" srcset="../../assets/images/pic-filter.png 2x"
               v-if="order.product === 1">
          <img src="../../assets/images/pic-child.png" srcset="../../assets/images/pic-child.png 2x"
               v-if="order.product === 2">
          <img src="../../assets/images/pic-ecosystem.png" srcset="../../assets/images/pic-ecosystem.png 2x"
               v-if="order.product === 3">
          <h1 class="itv-product-info-name">{{ order.product_name }}</h1>
          <span class="itv-product-info-num">x{{ order.quantity }}</span>
        </div>
        <div class="itv-orders-item_footer">
          <p>总金额<span class="itv-highlight-red money">￥{{ order.price ? ((order.price / 100) === 0 ? '-': order.price / 100 ) : '-'  }}</span></p>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
  import ApiOrders from '../../api/orders';

  export default {
    name: 'DealersOrders',
    watch: {
      $route() {
        this.setStatus();
      },
      status() {
        this.loadOrders();
      },
    },
    created() {
      this.isFirstEnter = true;
      this.setStatus();
    },
    activated() {
      if (!this.$route.meta.isBack || this.isFirstEnter) {
        this.orders = [];
        this.setStatus().then(res => {
          this.loadOrders();
        });
      }
      this.$route.meta.isBack = false;
      this.isFirstEnter = false;
    },
    data() {
      return {
        orders: [],
        status: undefined,
        isFirstEnter: false
      }
    },
    methods: {
      setStatus() {
        // 这里要确保一定是在status变换完成之后请求数据，所以使用Promise
        return new Promise((resolve, reject) => {
          switch (this.$route.query.tab) {
            case 'all':
              this.status = null;
              break;
            case 'ing':
              this.status = '1,2,3';
              break;
            case 'done':
              this.status = '4';
              break;
          }
          resolve();
        })
      },

      tabActive(value) {
        switch (value) {
          case '全部':
            this.$router.replace({name: 'DealersOrders', query: {tab: 'all'}});
            break;
          case '进行中':
            this.$router.replace({name: 'DealersOrders', query: {tab: 'ing'}});
            break;
          case '已完成':
            this.$router.replace({name: 'DealersOrders', query: {tab: 'done'}});
            break;
        }
      },

      loadOrders() {
        ApiOrders.getOrders({
          order_by: '-id',
          statuses: this.status
        }).then(res => {
          if (res.data.code === 0) {
            this.orders = res.data.data.orders;
          }
        })
      },

      /**
       * 根据订单状态码返回订单状态文字
       */
      orderStatus(statusCode) {
        let status = ['待付款','已付款', '被测人信息已登记', '样本检测中', '已完成', '已关闭'];
        return status[statusCode];
      }
    },
  }
</script>
<style lang="scss">
  @import "../../styles/variable";

  .itv-orders {
    &-nav {
      position: fixed;
      width: 100%;
    }
    &-container {
      padding: 100px 0;
    }
    &-item {
      display: inline-block;
      width: 100%;
      margin-top: 16px;
      &_hd,
      &_footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 24px;
        border-bottom: 1px solid $border;
        font-size: 28px;
      }
      &_bd {
        border-bottom: 1px solid $border;
      }
      &_footer {
        justify-content: flex-end;
        .money {
          margin-left: 16px;
        }
      }
    }
    .itv-services {
      color: $font-sub;
      p {
        padding: 24px;
        font-size: 28px;
        text-align: left;
      }
      img {
        padding-top: 0;
      }
      .item {
        &-1 {
          top: 0;
        }
        &-2 {
          top: 220px;
        }
        &-3 {
          top: 450px;
        }
      }
    }
  }
</style>
