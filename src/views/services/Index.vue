<template>
  <div class="itv-services index">
    <div class="itv-services-banner">
      <img src="../../assets/banner-services.jpg" alt="banner-services">
    </div>
    <section class="section itv-services-nav">
      <img src="../../assets/index/pic-4.jpg" srcset="../../assets/images/pic-services.png 2x" alt="pic-services">
      <router-link class="item item-1" :to="{name:'ServiceFilter'}"></router-link>
      <router-link class="item item-2" :to="{name:'ServiceChild'}"></router-link>
      <router-link class="item item-3" :to="{name:'ServiceEcosystem'}"></router-link>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'ServicesIndex'
  }
</script>
<style lang="scss">
  .itv-services{
    &.index{
      .section{
        margin: 16px 0;
      }
      .item {
        &-1{
          top:0;
        }
        &-2{
          top:220px;
        }
        &-3{
          top:450px;
        }
      }
    }
  }
</style>
