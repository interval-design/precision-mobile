<template>
  <div class="itv-services">
    <div class="itv-services-banner"></div>
    <img src="../../assets/child/pic-1.jpg" srcset="../../assets/child/pic-1.jpg 2x" alt="pic-1">
    <img src="../../assets/child/pic-2.jpg" srcset="../../assets/child/pic-2.jpg 2x" alt="pic-2">
    <common-part></common-part>
  </div>
</template>

<script>
  import CommonPart from "../../components/CommonPart.vue";

  export default {
    name: 'ServiceChild',
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
