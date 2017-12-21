<template>
  <div class="itv-services">
    <div class="itv-services-banner">
      <img src="../../assets/index/banner-ecosystem.jpg" alt="banner-ecosystem">
    </div>
    <swiper class="itv-swiper" :options="bacteriaOption">
      <swiper-slide>
        <img src="../../assets/index/pic-2.jpg" srcset="../../assets/index/pic-2.jpg 2x" alt="pic-2">
      </swiper-slide>
      <swiper-slide>
        <img src="../../assets/index/pic-2-2.jpg" srcset="../../assets/index/pic-2-2.jpg 2x" alt="pic-2-2">
      </swiper-slide>
      <swiper-slide>
        <img src="../../assets/index/pic-2-3.jpg" srcset="../../assets/index/pic-2-3.jpg 2x" alt="pic-2-3">
      </swiper-slide>
      <swiper-slide>
        <img src="../../assets/index/pic-2-4.jpg" srcset="../../assets/index/pic-2-4.jpg 2x" alt="pic-2-4">
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
    <img src="../../assets/ecosystem/pic-1.jpg" srcset="../../assets/ecosystem/pic-1.jpg 2x" alt="pic-1">
    <common-part product-id="3"></common-part>
  </div>
</template>

<script>
  import CommonPart from "../../components/CommonPart.vue";

  export default {
    name: 'ServiceEcosystem',
    components: {CommonPart},
    created() {
    },
    data() {
      return {
        bacteriaOption: {
          loop: true,
          autoplay: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        }
      }
    },
    methods: {},
  }
</script>
<style lang="scss"></style>
