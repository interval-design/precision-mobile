<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
  export default {
    name: 'IconSvg',
    props: {
      iconClass: {
        type: String,
        required: true
      },
      className: {
        type: String
      }
    },
    computed: {
      iconName() {
        return `#icon-${this.iconClass}`
      },
      svgClass() {
        if (this.className) {
          return 'itv-icon-svg itv-icon-svg--' + this.className
        } else {
          return 'itv-icon-svg'
        }
      }
    }
  }
</script>

<style lang="scss">
  .itv-icon-svg {
    width: 38px;
    height: 38px;
    overflow: hidden;
    fill: currentColor;
    stroke: currentColor;
    vertical-align: middle;
    &--dialog {
      width: 64px;
      height: 64px;
    }
    &--nav{
      width: 42px;
      height: 42px;
    }
    &--user-order{
      width: 50px;
      height: 50px;
    }
    &--order{
      width: 80px;
      height: 80px;
    }
  }
</style>
