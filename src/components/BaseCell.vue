<template>
  <div class="itv-base-cell">
    <slot name="title">{{ title }}</slot>
    <div class="desc">
      <slot><span>{{ value }}</span></slot>
      <slot name="link-icon" v-if="icon">
        <icon-svg icon-class="arrow-right" style="margin-left: 16px"></icon-svg>
      </slot>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'BaseCell',
    props: {
      title: {
        type: String
      },
      value:{
        type:String
      },
      icon: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        currentValue: this.value,
      }
    }
  }
</script>
<style lang="scss">
  @import "../styles/variable";

  .itv-base-cell {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 32px 24px;
    font-size: 28px;
    background: $white;
    &:not(:last-child){
      border-bottom: 1px solid $border;
    }
    .desc{
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: $font-sub;
    }
  }
</style>
