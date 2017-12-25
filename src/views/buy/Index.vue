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
    <p class="protocol itv-bg-white" @click="protocol = !protocol">
      <icon-svg :icon-class="protocol ? 'radio-checked':'radio'" style="margin:0 16px 4px 0;"></icon-svg>
      我已阅读并同意
      <router-link :to="{name:'Protocol'}" class="itv-highlight-blue">《普瑞森基因服务知情同意书》</router-link>
    </p>
    <base-button type="error" size="big" width="100%" position="bottom" :disabled="!protocol" @click="createOrders">
      支付订单
    </base-button>
  </div>
</template>

<script>
import ApiBuy from "../../api/buy";
import ApiOrders from "../../api/orders";

export default {
  name: "BuyIndex",
  computed: {
    formatAddress() {
      return `${this.address.province} ${this.address.city} ${this.address
        .district} ${this.address.street}`;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.loadDetails();
      // 判断$bus中是否有地址，如果没选默认为地址列表中的第一个
      if (this.$bus.address) {
        this.address = this.$bus.address;
        return;
      }
      this.loadAddresses();
    });
  },
  data() {
    return {
      details: null,
      address: {},
      number: 1,
      protocol: true
    };
  },
  methods: {
    /**
       * 列出地址列表
       */
    loadAddresses() {
      ApiBuy.getAddresses().then(res => {
        if (res.data.code === 0) {
          if (res.data.data.addresses.length > 0) {
            this.address = this.$bus.address = res.data.data.addresses[0];
          } else {
            this.$router.push({ name: "AddressAdd" });
          }
        }
      });
    },

    /**
       * 根据微信卡券code获取邀请码组详情
       */
    loadDetails() {
      // this.$bus.encryptCode = 'N9Wgb4sYDhlYAgOuhYrtJ1e6kIJMcCXXR2EdJTKKTWM=';
      // this.$bus.productId = 1;
      ApiBuy.getInviteCodeGroup(this.$bus.encryptCode, {
        product_id: this.$bus.productId
      }).then(res => {
        if (res.data.code === 0) {
          this.details = res.data.data.invite_code_group;
        } else {
          if (res.data.code === 1419) {
            alert("非常抱歉，该产品已下架");
          } else {
            this.$router.replace({ name: "BuyError" });
          }
        }
      });
    },

    /**
       * 创建订单
       */
    createOrders() {
      if (!this.protocol) {
        return;
      }
      ApiOrders.createOrders(this.$bus.encryptCode, {
        product_id: this.details.product.id,
        quantity: this.number,
        address_id: this.$bus.address.id
      }).then(res => {
        if (res.data.code === 0) {
          let _orderId = res.data.data.order.id;
          this.createTransactions(_orderId);
        } else {
          this.$router.replace({ name: "BuyError" });
        }
      });
    },

    /**
       * 创建交易
       * @param orderId
       */
    createTransactions(orderId) {
      ApiOrders.createTransactions(orderId, {
        channel: "WX_JSAPI"
      }).then(res => {
        if (res.data.code === 0) {
          let _data = res.data.data;
          wx.chooseWXPay({
            timestamp: _data.timeStamp,
            nonceStr: _data.nonceStr,
            package: _data.package,
            signType: _data.signType,
            paySign: _data.paySign,
            success: res => {
              if (res.errMsg === "chooseWXPay:ok") {
                this.$router.push({ name: "TransactionsSuccess" });
              }
            }
          });
        } else {
          this.$router.push({ name: "TransactionsError" });
        }
      });
    }
  }
};
</script>
<style lang="scss">
@import "../../styles/variable";

.itv-buy {
  .itv-product-info {
    margin: 16px 0;
  }
  .money {
    font-size: 32px;
  }
  .protocol {
    position: absolute;
    left: 0;
    bottom: 95px;
    padding: 0 32px;
    height: 100px;
    width: 100%;
    line-height: 100px;
    font-size: 28px;
    a {
      vertical-align: inherit;
    }
  }
}
</style>
