<template>
  <div class="itv-services">
    <div class="itv-services-banner">
      <img src="../../assets/index/banner-filter.jpg" alt="banner-filter">
    </div>
    <img src="../../assets/filter/pic-1.jpg" srcset="../../assets/filter/pic-1.jpg 2x" alt="pic-1">
    <img src="../../assets/filter/pic-2.jpg" srcset="../../assets/filter/pic-2.jpg 2x" alt="pic-2">
    <img src="../../assets/filter/pic-3.jpg" srcset="../../assets/filter/pic-3.jpg 2x" alt="pic-3">
    <common-part product-id="1"></common-part>
  </div>
</template>

<script>
  import CommonPart from "../../components/CommonPart.vue";

  export default {
    name: 'ServiceFilter',
    components: {CommonPart},
    created() {
    },
    data() {
      return {}
    },
    methods: {},
  }
</script>
<style lang="scss"></style>
