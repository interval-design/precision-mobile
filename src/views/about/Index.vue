<template>
  <div class="itv-about">
    <header class="itv-about-header">
      <router-link :to="{name:'AboutInfo'}" active-class="itv-about-active" class="itv-about-header-item">了解普瑞森</router-link>
      <router-link :to="{name:'AboutTeam'}" active-class="itv-about-active" class="itv-about-header-item">普瑞森团队</router-link>
      <router-link :to="{name:'AboutJoin'}" active-class="itv-about-active" class="itv-about-header-item">加入我们</router-link>
    </header>
    
    <div class="itv-about-content">
      <transition :name="transitionName" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'About',
    data() {
      return {
        transitionName: 'fade'
      }
    },
    // watch: {
    //   '$route'(to,from) {
    //     console.log(to);
    //     if (to.meta.index>from.meta.index) {
    //       this.transitionName = 'vux-pop-out';
    //     }else {
    //       this.transitionName = 'vux-pop-in';
    //     }
    //   }
    // }
  }
</script>

<style lang="scss">
@import '../../styles/variable.scss';
.itv-about {
  &-header {
    position: fixed;
    width: 100%;
    display: flex;
    text-align: center;
    font-size: 28px;
    line-height: 40px;
    background: $white;
    box-shadow: 0 0 1px $border;
    &-item {
      flex: 1;
      padding: 30px 8px;
      margin: 0 40px;
      border-bottom: 4px solid transparent;
    }
  }
  &-content {
    padding-top: 120px;
  }
}
.itv-about-active {
  color: $blue;
  border-color: $blue;
}


 .vux-pop-out-enter-active,
 .vux-pop-out-leave-active,
 .vux-pop-in-enter-active,
 .vux-pop-in-leave-active {
 will-change: transform;
 transition: all 250ms;
 height: 100%;
 position: absolute;
 backface-visibility: hidden;
 perspective: 1000;
 }
 
 .vux-pop-out-enter {
 opacity: 0;
 transform: translate3d(-100%, 0, 0);
 }
 
 .vux-pop-out-leave-active {
 opacity: 0;
 transform: translate3d(100%, 0, 0);
 }
 
 .vux-pop-in-enter {
 opacity: 0;
 transform: translate3d(100%, 0, 0);
 }
 
 .vux-pop-in-leave-active {
 opacity: 0;
 transform: translate3d(-100%, 0, 0);
 }
</style>
