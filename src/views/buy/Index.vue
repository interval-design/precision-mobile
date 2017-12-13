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
      <div class="product-info">
        <img src="../../assets/images/pic-filter.png" srcset="../../assets/images/pic-filter.png 2x" v-if="details.product.id === 1">
        <img src="../../assets/images/pic-child.png" srcset="../../assets/images/pic-child.png 2x" v-if="details.product.id === 2">
        <img src="../../assets/images/pic-ecosystem.png" srcset="../../assets/images/pic-ecosystem.png 2x" v-if="details.product.id === 3">
        <h1 class="product-info-name">{{ details.product.name }}</h1>
        <base-number v-model="number"></base-number>
      </div>
      <base-cell title="应付金额">
        <span class="itv-highlight-red money">￥{{(details.product.price - details.discount) / 100 }} </span>
      </base-cell>
    </template>
    <base-button type="error" size="big" width="100%" fixed="bottom" @click="">支付订单</base-button>
  </div>
</template>

<script>
  import ApiBuy from '../../api/buy';

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
    mounted(){
      this.$nextTick(()=>{
        // 判断$bus中是否有地址，如果没选默认为地址列表中的第一个
        if(this.$bus.address){
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
        number:1
      }
    },
    methods: {

      /**
       * 列出地址列表
       */
      loadAddresses() {
        ApiBuy.getAddresses().then(res => {
          if (res.data.code === 0) {
            this.address = res.data.data.addresses[0];
          }
        })
      },

      /**
       * 根据微信卡券code获取邀请码组详情
       */
      loadDetails() {
        this.$bus.encryptCode = 'N9Wgb4sYDhlYAgOuhYrtJ6lIQyo+RIi5RwR0gguMC58=';
        ApiBuy.getInviteCodeGroup(this.$bus.encryptCode).then(res => {
          if (res.data.code === 0) {
            this.details = res.data.data.invite_code_group;
          }
        })
      }
    },
  }
</script>
<style lang="scss">
  @import "../../styles/variable";
  .itv-buy{
    .product-info{
      background: white;
      margin: 16px 0;
      padding: 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      img{
        width: 100px;
        height: 100px;
        margin-right: 32px;
      }
      &-name{
        flex: 1;
        font-size: 28px;
      }
    }
    .money{
      font-size: 32px;
    }
  }
</style>
