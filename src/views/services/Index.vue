<template>
  <div class="itv-services">
    <div class="itv-services-banner"></div>
    <section>
      <!-- TODO:图需要替换 -->
      <img src="../../assets/index/pic-4.jpg" srcset="../../assets/index/pic-4.jpg 2x" alt="pic-4">
      <router-link class="link link-1" :to="{name:'ServiceFilter'}"></router-link>
      <router-link class="link link-2" :to="{name:'ServiceChild'}"></router-link>
      <router-link class="link link-3" :to="{name:'ServiceEcosystem'}"></router-link>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'ServicesIndex'
  }
</script>
<style lang="scss"></style>
