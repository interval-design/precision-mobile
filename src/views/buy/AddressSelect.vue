<template>
  <div class="itv-address-group">
    <div class="itv-address itv-bg-white">
      <!-- TODO:选择图标需要替换 -->
      <icon-svg icon-class="location"></icon-svg>
      <div class="itv-address-info">
        <div class="itv-address-info-content">
          <p>上海市浦东新区草高公路 距离市中心约15406米距离市中心约15406米</p>
          <div class="consignee">
            <span>猴子收</span>
            <span>111111111</span>
          </div>
        </div>
      </div>
      <icon-svg icon-class="edit"></icon-svg>
    </div>
    <div class="itv-address itv-bg-white">
      <icon-svg icon-class="location"></icon-svg>
      <div class="itv-address-info">
        <div class="itv-address-info-content">
          <p>上海市浦东新区草高公路 距离市中心约15406米距离市中心约15406米</p>
          <div class="consignee">
            <span>猴子收</span>
            <span>111111111</span>
          </div>
        </div>
      </div>
      <icon-svg icon-class="edit"></icon-svg>
    </div>
    <base-button type="info" size="big" width="100%" fixed="bottom" @click="$route.push({name:'AddressAdd'})">添加新地址</base-button>
  </div>
</template>

<script>

  export default {
    name: 'AddressAdd',
    created() {
    },
    data() {
      return {
        selected:'',
      }
    },
    methods: {},
  }
</script>
<style lang="scss">
  .itv-address-group{
    .itv-address{
      align-items: center;
    }
  }
</style>
