<template>
  <div class="itv-address-add">
    <base-input title="收件人" v-model="form.consignee" placeholder="请填写收件人姓名"></base-input>
    <base-input title="联系电话" v-model="form.phone" placeholder="请填写收件人电话"></base-input>
    <base-cell title="所在地" icon :value="selectedAddress" @click.native="addressPicker = true"></base-cell>
    <base-input type="textarea" rows="4" v-model="form.street" placeholder="请填写详细地址"></base-input>
    <yd-cityselect v-model="addressPicker"
                   :callback="setAddress"
                   :items="district"
                   :provance="form.province"
                   :city="form.city"
                   :area="form.district"
    ></yd-cityselect>
    <base-button type="info" size="big" width="100%" position="bottom" @click="create" v-if="$route.name == 'AddressAdd'">新建</base-button>
    <base-button type="info" size="big" width="100%" position="bottom" @click="edit" v-else>保存</base-button>
  </div>
</template>

<script>
  import District from 'ydui-district/dist/gov_province_city_area_id'
  import ApiBuy from '../../api/buy';

  export default {
    name: 'AddressEdit',
    computed: {
      selectedAddress() {
        if (this.form.province === '') {
          return '请选择'
        }
        return `${this.form.province} ${this.form.city} ${this.form.district}`
      }
    },
    created() {
      if (this.$route.name === 'AddressEdit' && this.$bus.address) {
        this.form = {
          consignee: this.$bus.address.consignee,
          phone: this.$bus.address.phone,
          province: this.$bus.address.province,
          city: this.$bus.address.city,
          district: this.$bus.address.district,
          street: this.$bus.address.street,
        };
      }
    },
    data() {
      return {
        form: {
          consignee: '',
          phone: '',
          province: '',
          city: '',
          district: '',
          street: '',
        },
        addressPicker: false,
        district: District,
      }
    },
    methods: {

      /**
       * 设置地址
       * @param value
       */
      setAddress(value) {
        this.form.province = value.itemName1;
        this.form.city = value.itemName2;
        this.form.district = value.itemName3;
      },

      /**
       * 创建地址
       */
      create() {
        ApiBuy.creatdAddress(this.form).then(res => {
          if (res.data.code === 0) {
            this.$bus.address = res.data.data.address;
            history.back();
          }
        })
      },

      /**
       * 修改地址
       */
      edit() {
        ApiBuy.editAddress(this.$bus.address.id,this.form).then(res => {
          if (res.data.code === 0) {
            this.$bus.address = res.data.data.address;
            history.back();
          }
        })
      }
    },
  }
</script>
<style lang="scss">
  @import "../../styles/variable";

  .itv-address-add {
    overflow: hidden;
  }

  .yd-cityselect-title {
    display: none;
  }

  .yd-cityselect-nav > a {
    font-size: 28px;
    height: 80px;
    line-height: 85px;
  }

  .yd-cityselect-content{
    padding-top: 80px;
  }

  .yd-cityselect-item-box{
    & > a{
      font-size: 28px;
      height: 60px;
      line-height: 60px;
      span{
        font-size: 28px;
        line-height: 32px;
      }
    }
  }
</style>
