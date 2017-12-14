<template>
  <div class="itv-buy">
    <router-link :to="{name:'Address'}" class="itv-address itv-bg-white">
      <icon-svg icon-class="location"></icon-svg>
      <div class="itv-address-info">
        <h2 class="itv-address-info-title">收货信息</h2>
        <div class="itv-address-info-content">
          <p>{{ formatAddress }}</p>
          <div class="consignee">
            <span>{{ address.consignee }}</span>
            <span>{{ address.phone }}</span>
          </div>
        </div>
      </div>
      <icon-svg icon-class="arrow-right" style="align-self: center"></icon-svg>
    </router-link>
    <template v-if="details">
      <div class="itv-product-info">
        <img src="../../assets/images/pic-filter.png" srcset="../../assets/images/pic-filter.png 2x"
             v-if="details.product.id === 1">
        <img src="../../assets/images/pic-child.png" srcset="../../assets/images/pic-child.png 2x"
             v-if="details.product.id === 2">
        <img src="../../assets/images/pic-ecosystem.png" srcset="../../assets/images/pic-ecosystem.png 2x"
             v-if="details.product.id === 3">
        <h1 class="itv-product-info-name">{{ details.product.name }}</h1>
        <base-number v-model="number"></base-number>
      </div>
      <base-cell title="应付金额">
        <span class="itv-highlight-red money">￥{{(details.product.price - details.discount) / 100 }} </span>
      </base-cell>
    </template>
    <base-button type="error" size="big" width="100%" fixed="bottom" @click="createOrders">支付订单</base-button>
  </div>
</template>

<script>
  import ApiBuy from '../../api/buy';
  import ApiOrders from '../../api/orders';

  export default {
    name: 'BuyIndex',
    computed: {
      formatAddress() {
        return `${this.address.province} ${this.address.city} ${this.address.district} ${this.address.street}`
      }
    },
    watch: {
      addresses() {
        if (this.addresses.length === 0) {
          this.$router.replace({name: 'AddressAdd'});
        }
      }
    },
    created() {
      this.loadDetails();
    },
    mounted() {
      this.$nextTick(() => {
        // 判断$bus中是否有地址，如果没选默认为地址列表中的第一个
        if (this.$bus.address) {
          this.address = this.$bus.address;
          return;
        }
        this.loadAddresses();
      })
    },
    data() {
      return {
        details: null,
        address: {},
        number: 1
      }
    },
    methods: {

      /**
       * 列出地址列表
       */
      loadAddresses() {
        ApiBuy.getAddresses().then(res => {
          if (res.data.code === 0) {
            this.address = this.$bus.address = res.data.data.addresses[0];
          }
        })
      },

      /**
       * 根据微信卡券code获取邀请码组详情
       */
      loadDetails() {
        // this.$bus.encryptCode = 'N9Wgb4sYDhlYAgOuhYrtJ/sgH+TeKlf2uVcKRd+A0us=';
        ApiBuy.getInviteCodeGroup(this.$bus.encryptCode).then(res => {
          if (res.data.code === 0) {
            this.details = res.data.data.invite_code_group;
          } else {
            this.$router.replace({name: 'BuyError'});
          }
        })
      },

      /**
       * 创建订单
       */
      createOrders() {
        ApiOrders.createOrders(this.$bus.encryptCode, {
          product_id: this.details.product.id,
          quantity: this.number,
          address_id: this.$bus.address.id
        }).then(res => {
          if (res.data.code === 0) {
            let _orderId = res.data.data.order.id;
            this.createTransactions(_orderId);
          } else {
            this.$router.replace({name: 'BuyError'});
          }
        })
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
  @import "../../styles/variable";

  .itv-buy {
    .itv-product-info{
      margin: 16px 0;
    }
    .money {
      font-size: 32px;
    }
  }
</style>
