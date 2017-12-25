<template>
  <div class="itv-about">
    <yd-tab class="itv-orders-nav" active-color="#3C90EF" :callback="tabActive">
      <yd-tab-panel label="了解普瑞森" :active="$route.name === 'AboutInfo'"></yd-tab-panel>
      <!-- <yd-tab-panel label="普瑞森团队" :active="$route.name === 'AboutTeam'"></yd-tab-panel> -->
      <yd-tab-panel label="加入我们" :active="$route.name === 'AboutJoin'"></yd-tab-panel>
    </yd-tab>
    <div class="itv-about-content">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'About',
    methods: {
      tabActive(value) {
        switch (value) {
          case '了解普瑞森':
            this.$router.replace({name: 'AboutInfo'});
            break;
          case '普瑞森团队':
            this.$router.replace({name: 'AboutTeam'});
            break;
          case '加入我们':
            this.$router.replace({name: 'AboutJoin'});
            break;
        }
      },
    },
  }
</script>

<style lang="scss">
.itv-about {
  .itv-orders-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  &-content {
    padding-top: 100px;
  }
}
</style>
