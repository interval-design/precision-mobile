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
          return 'icon-svg-' + this.className
        } else {
          return 'icon-svg'
        }
      }
    }
  }
</script>

<style>
  .icon-svg {
    width: 64px;
    height: 64px;
    fill: currentColor;
    overflow: hidden;
  }
</style>
