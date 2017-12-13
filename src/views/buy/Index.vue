<template>
  <!-- TODO: 还没写 -->
  <div class="itv-buy">
    <div class="itv-address itv-bg-white">
      <icon-svg icon-class="location"></icon-svg>
      <div class="itv-address-info">
        <h2 class="itv-address-info-title">收货信息</h2>
        <div class="itv-address-info-content">
          <p>上海市浦东新区草高公路 距离市中心约15406米距离市中心约15406米</p>
          <div class="consignee">
            <span>猴子收</span>
            <span>111111111</span>
          </div>
        </div>
      </div>
      <icon-svg icon-class="arrow-right" style="align-self: center"></icon-svg>
    </div>
    <div class="product-info"></div>
  </div>
</template>

<script>
  import ApiBuy from '../../api/buy';

  export default {
    name: 'BuyIndex',
    watch:{
      addresses(){
        if(this.addresses.length  === 0){
          this.$router.replace({name:'AddressAdd'});
        }
      }
    },
    created() {
      this.loadAddresses();
//      this.loadDetails();
    },
    data() {
      return {
        details: null,
        addresses: null,
      }
    },
    methods: {
      /**
       * 列出当前用户的收货地址
       */
      loadAddresses() {
        ApiBuy.getAddresses().then(res => {
          if (res.data.code === 0) {
            this.addresses = res.data.data.addresses;
          }
        })
      },

      /**
       * 根据微信卡券code获取邀请码组详情
       */
      loadDetails() {
        ApiBuy.getInviteCodeGroup(this.$bus.encryptCode).then(res => {
          if (res.data.code === 0) {
            this.details = res.data.data.invite_code_group;
          }
        })
      }
    },
  }
</script>
<style lang="scss"></style>
