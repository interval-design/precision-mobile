<template>
  <div class="itv-orders">
    <yd-tab class="itv-orders-nav" active-color="#3C90EF" :callback="tabActive">
      <yd-tab-panel label="全部" :active="$route.query.tab === 'all'"></yd-tab-panel>
      <yd-tab-panel label="待付款" :active="$route.query.tab === 'wait'"></yd-tab-panel>
      <yd-tab-panel label="进行中" :active="$route.query.tab ==='ing'"></yd-tab-panel>
      <yd-tab-panel label="已完成" :active="$route.query.tab === 'done'"></yd-tab-panel>
    </yd-tab>
    <div class="itv-orders-container itv-action-result" v-if="orders.length === 0">
      <img src="../../../assets/images/pic-box-none.png">
      <h1>您还没有订单</h1>
      <div class="itv-services">
        <p>猜你需要</p>
        <section class="section itv-services-nav">
          <img src="../../../assets/index/pic-4.jpg" srcset="../../../assets/images/pic-services.png 2x"
               alt="pic-services">
          <router-link class="item item-1" :to="{name:'ServiceFilter'}"></router-link>
          <router-link class="item item-2" :to="{name:'ServiceChild'}"></router-link>
          <router-link class="item item-3" :to="{name:'ServiceEcosystem'}"></router-link>
        </section>
      </div>
    </div>
    <div class="itv-orders-container" v-else>
      <router-link class="itv-orders-item itv-bg-white" :to="{name:'OrderDetails',params:{order_id:order.id}}"
                   v-for="order in orders" :key="order.id">
        <div class="itv-orders-item_hd">
          <span>订单号 {{ order.code }}</span>
          <span class="itv-highlight-blue" v-if="order.status < 5 ">{{ orderStatus(order.status) }}</span>
          <span class="itv-highlight-red" v-else>{{ orderStatus(order.status) }}</span>
        </div>
        <div class="itv-orders-item_bd itv-product-info">
          <img src="../../../assets/images/pic-filter.png" srcset="../../../assets/images/pic-filter.png 2x"
               v-if="order.product === 1">
          <img src="../../../assets/images/pic-child.png" srcset="../../../assets/images/pic-child.png 2x"
               v-if="order.product === 2">
          <img src="../../../assets/images/pic-ecosystem.png" srcset="../../../assets/images/pic-ecosystem.png 2x"
               v-if="order.product === 3">
          <h1 class="itv-product-info-name">{{ order.product_name }}</h1>
          <span class="itv-product-info-num">x{{ order.quantity }}</span>
        </div>
        <div class="itv-orders-item_footer">
          <p>总金额<span class="itv-highlight-red money">￥{{ order.price / 100 }}</span></p>
          <base-button line size="small" style="margin-left: 16px" v-if="order.status === 0" @click="createTransactions(order.id)">付款</base-button>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
  import ApiOrders from '../../../api/orders';

  export default {
    name: 'Orders',
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
        status: null,
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
            case 'wait':
              this.status = '0';
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
            this.$router.replace({name: 'Orders', query: {tab: 'all'}});
            break;
          case '待付款':
            this.$router.replace({name: 'Orders', query: {tab: 'wait'}});
            break;
          case '进行中':
            this.$router.replace({name: 'Orders', query: {tab: 'ing'}});
            break;
          case '已完成':
            this.$router.replace({name: 'Orders', query: {tab: 'done'}});
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
        let status = ['待付款', '已付款', '试剂盒已寄出', '样本检测中', '已完成', '已关闭'];
        return status[statusCode];
      },

      /**
       * 创建交易
       * @param orderId
       */
      createTransactions(orderId) {
        ApiOrders.createTransactions(orderId, {
          channel: 'WX_JSAPI'
        }).then(res => {
          if (res.data.code === 0) {
            let _data = res.data.data;
            wx.chooseWXPay({
              timestamp: _data.timeStamp,
              nonceStr: _data.nonceStr,
              package: _data.package,
              signType: _data.signType,
              paySign: _data.paySign,
              success: (res) => {
                if (res.errMsg === "chooseWXPay:ok") {
                  this.$router.push({ name: 'TransactionsSuccess' })
                }
              }
            })
          } else {
            this.$router.push({ name: 'TransactionsError' })
          }
        })
      }
    },
  }
</script>
<style lang="scss">
  @import "../../../styles/variable";

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
