<template>
  <div class="itv-address-group">
    <base-left-delete :value="address.id" @del="delAddress" v-for="address in addresses">
      <div class="itv-address itv-bg-white" @click="selected(address)">
        <icon-svg :icon-class="$bus.address.id === address.id ? 'radio-checked':'radio'"></icon-svg>
        <div class="itv-address-info">
          <div class="itv-address-info-content">
            <p>{{ address.province }} {{ address.city }} {{ address.district }} {{ address.street }}</p>
            <div class="consignee">
              <span>{{ address.consignee }}</span>
              <span>{{ address.phone }}</span>
            </div>
          </div>
        </div>
        <icon-svg icon-class="edit" @click.native.stop="edit(address)"></icon-svg>
      </div>
    </base-left-delete>
    <base-button type="info" size="big" width="100%" fixed="bottom" @click="$router.push({name:'AddressAdd'})">添加新地址
    </base-button>
  </div>
</template>

<script>
  import ApiBuy from '../../api/buy';

  export default {
    name: 'AddressSelect',
    created() {
      this.loadAddresses();
    },
    data() {
      return {
        addresses: [],
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
            if(!this.$bus.address){
              this.$bus.address = res.data.data.addresses[0];
            }
          }
        })
      },

      /**
       * 设置当前选中的地址Id,并返回购买页面
       * @param address
       */
      selected(address){
        this.$bus.address = address;
        history.back();
      },

      /**
       * 设置当前选中的地址Id,并去往编辑页面
       * @param address
       */
      edit(address){
        this.$bus.address = address;
        this.$router.push({name:'AddressEdit'});
      },

      /**
       * 删除地址
       * @param id
       */
      delAddress(id){
        ApiBuy.delAddress(id).then(res=>{
          if(res.data.code === 0){
           this.loadAddresses();
          }
        })
      },
    },
  }
</script>
<style lang="scss">
  .itv-address-group {
    .itv-address {
      align-items: center;
    }
  }
</style>
