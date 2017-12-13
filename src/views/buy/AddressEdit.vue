<template>
  <div class="itv-address-add">
    <base-input title="收件人" v-model="form.consignee" placeholder="请填写收件人姓名"></base-input>
    <base-input title="联系电话" v-model="form.phone" placeholder="请填写收件人电话"></base-input>
    <base-cell title="所在地" icon :value="selectedAddress" @click.native="addressPicker = true"></base-cell>
    <base-input type="textarea" rows="4" v-model="form.street" placeholder="请填写详细地址"></base-input>
    <vue-pickers :show="addressPicker"
                 :selectData="pickData"
                 @cancel="addressPicker = false"
                 @confirm="setAddress"></vue-pickers>
    <base-button type="info" size="big" width="100%" fixed="bottom" @click="create">保存新地址</base-button>
  </div>
</template>

<script>
  import VuePickers from 'vue-pickers'
  import {provs_data, citys_data, dists_data} from 'vue-pickers/lib/areaData';
  import ApiBuy from '../../api/buy';

  export default {
    name: 'AddressAdd',
    components: {
      VuePickers
    },
    computed:{
      selectedAddress(){
        if(this.form.province === ''){
          return '请选择'
        }
        return `${this.form.province} ${this.form.city} ${this.form.district}`
      }
    },
    created() {
      if(this.$route.name === 'AddressEdit' && this.$bus.address){
        this.form = {
          consignee:this.$bus.address.consignee,
          phone:this.$bus.address.phone,
          province:this.$bus.address.province,
          city:this.$bus.address.city,
          district:this.$bus.address.district,
          street:this.$bus.address.street,
        };
        let selected = {
          select1: {
            text: this.$bus.address.province,
          },
          select2:{
            text: this.$bus.address.city,
          },
          select3:{
            text: this.$bus.address.district,
          }
        };
        this.setAddress(selected);
      }
    },
    data() {
      return {
        form:{
          consignee:'',
          phone:'',
          province:'',
          city:'',
          district:'',
          street:'',
        },
        addressPicker:false,
        pickData: {
          columns: 3,
          link: true,
          pData1: provs_data,
          pData2: citys_data,
          pData3: dists_data,
        },
      }
    },
    methods: {

      /**
       * 设置地址
       * @param value
       */
      setAddress(value){
        this.form.province = value.select1.text;
        this.form.city = value.select2.text;
        this.form.district = value.select3.text;
        this.addressPicker = false;
      },

      /**
       * 创建地址
       */
      create(){
        ApiBuy.creatdAddress(this.form).then(res=>{
          if(res.data.code === 0){
            history.back();
          }
        })
      }
    },
  }
</script>
<style lang="scss">
  @import "../../styles/variable";

  .itv-address-add{
    overflow: hidden;
  }

  .area_ctrl{
    font-size: 22px !important;
    background: transparent !important;
  }
  .area_btn_box{
    background: $white;
    &:after,&:before {
      height: 0;
    }
  }
  .area_btn{
    color: $font;
  }
  .area_roll_mask{
    background: $bg;
    -webkit-mask: none;
  }
</style>
