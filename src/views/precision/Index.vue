<template>
  <div class="itv-precision">
    <router-link :to="{name: 'Microbiology'}">
      <img src="../../assets/precision/pic-1.jpg" alt="pic-1">
    </router-link>
    <router-link :to="{name: 'Article'}">
      <img src="../../assets/precision/pic-2.jpg" alt="pic-2">
    </router-link>
    <router-link :to="{name: 'AboutInfo'}">
      <img src="../../assets/precision/pic-3.jpg" alt="pic-3">
    </router-link>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss">
.itv-precision {
  img {
    padding-bottom: 16px;
    width: 750px;
  }
}
</style>
