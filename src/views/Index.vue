<template>
  <div class="itv-index itv-services">
    <!-- banner -->
    <swiper class="itv-swiper" :options="bannerOption">
      <swiper-slide>
        <img src="../assets/index/banner-child.jpg" srcset="../assets/index/banner-child.jpg 2x" alt="banner-child">
        <base-button size="small" line @click="$route.push({name:'ServiceChild'})">了解更多</base-button>
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/index/banner-filter.jpg" srcset="../assets/index/banner-filter.jpg 2x" alt="banner-filter">
        <base-button size="small" line @click="$route.push({name:'ServiceFilter'})">了解更多</base-button>
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/index/banner-ecosystem.jpg" srcset="../assets/index/banner-ecosystem.jpg 2x"
             alt="banner-ecosystem">
        <base-button size="small" line @click="$route.push({name:'ServiceEcosystem'})">了解更多</base-button>
      </swiper-slide>
    </swiper>
    <div class="section-link itv-bg-white">
      <router-link class="section-link-item" :to="{name:'ServiceFilter'}">
        <img src="../assets/index/icon-filter.png" alt="icon-filter">
        <span>肠癌风险评估</span>
      </router-link>
      <router-link class="section-link-item" :to="{name:'ServiceChild'}">
        <img src="../assets/index/icon-child.png" alt="icon-child">
        <span>儿童肠道检测</span>
      </router-link>
      <router-link class="section-link-item" :to="{name:'ServiceEcosystem'}">
        <img src="../assets/index/icon-ecosystem.png" alt="icon-ecosystem">
        <span>肠道微生态检测</span>
      </router-link>
    </div>
    <section class="section section-1">
      <img src="../assets/index/pic-1.jpg" srcset="../assets/index/pic-1.jpg 2x" alt="pic-1">
      <base-button @click="$router.push({name:'ResearchMicrobiology'})">了解微生物组学</base-button>
    </section>
    <swiper class="itv-swiper" :options="bacteriaOption">
      <swiper-slide>
        <img src="../assets/index/pic-2.jpg" srcset="../assets/index/pic-2.jpg 2x" alt="pic-2">
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/index/pic-2-2.jpg" srcset="../assets/index/pic-2-2.jpg 2x" alt="pic-2-2">
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/index/pic-2-3.jpg" srcset="../assets/index/pic-2-3.jpg 2x" alt="pic-2-3">
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/index/pic-2-4.jpg" srcset="../assets/index/pic-2-4.jpg 2x" alt="pic-2-4">
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
    <img src="../assets/index/pic-3.jpg" srcset="../assets/index/pic-3.jpg 2x" alt="pic-3">
    <common-part></common-part>
    <section class="section itv-services-nav">
      <img src="../assets/index/pic-4.jpg" srcset="../assets/index/pic-4.jpg 2x" alt="pic-4">
      <router-link class="item item-1" :to="{name:'ServiceFilter'}"></router-link>
      <router-link class="item item-2" :to="{name:'ServiceChild'}"></router-link>
      <router-link class="item item-3" :to="{name:'ServiceEcosystem'}"></router-link>
    </section>
  </div>
</template>
<script>
  import CommonPart from '../components/CommonPart.vue';

  export default {
    name: 'Index',
    components: {CommonPart},
    data() {
      return {
        bannerOption: {
          loop: true,
          autoplay: true
        },
        bacteriaOption: {
          loop: true,
          autoplay: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        }
      }
    }
  }
</script>
<style lang="scss">
  @import "../styles/variable";

  .itv-index {
    .section-link {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px 64px;
      &-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        span {
          margin-top: 24px;
        }
      }
    }
    .section-1 {
      .itv-base-button {
        left: 50%;
        bottom: 64px;
        transform: translateX(-50%);
      }
    }
    .section-4 {
      .link {
        position: absolute;
        height: 200px;
        width: 100%;
        &-1{
          top:100px;
        }
        &-2{
          top:320px;
        }
        &-3{
          top:550px;
        }
      }
    }
  }
</style>
