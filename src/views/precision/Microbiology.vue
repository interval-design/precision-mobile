<template>
  <div class="itv-microbiology">
    <img src="../../assets/microbiology/pic-1.jpg" alt="pic-1">
    <img src="../../assets/microbiology/pic-2.jpg" alt="pic-2">
    <img src="../../assets/microbiology/pic-3.jpg" alt="pic-3">
    <img src="../../assets/microbiology/pic-4.jpg" alt="pic-4">
    <img src="../../assets/microbiology/pic-5.jpg" alt="pic-5">
    <div class="itv-microbiology-buy">
      <img src="../../assets/microbiology/pic-6.jpg" alt="pic-6">
      <router-link :to="{name: 'ServiceFilter'}" class="itv-microbiology-buy-1"></router-link>
      <router-link :to="{name: 'ServiceChild'}" class="itv-microbiology-buy-2"></router-link>
      <router-link :to="{name: 'ServiceEcosystem'}" class="itv-microbiology-buy-3"></router-link>
    </div>
  </div>
</template>

<script>

</script>

<style lang="scss">
.itv-microbiology {
  img {
    width: 750px;
  }
  &-buy {
    position: relative;
    &-1,
    &-2,
    &-3 {
      position: absolute;
      left: 24px;
      width: 702px;
      height: 199px;
    }
    &-1 {
      top: 103px;
    }
    &-2 {
      top: 323px;
    }
    &-3 {
      top: 549px;
    }
  }
}
</style>
