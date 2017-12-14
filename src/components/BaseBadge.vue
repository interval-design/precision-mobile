<template>
    <span class="itv-base-badge">
      <slot></slot>
      <span :class="classes" :style="styles" v-if="count > 0">{{ count }}</span>
    </span>
</template>

<script>
  const prefixCls = 'itv-base-badge-dot';

  export default {
    name: "BaseBadge",
    props: {
      count: {
        type: [String, Number]
      },
      type: {
        type: String,
        default: 'default',
        validator(value) {
          return [
            'default',
            'line'
          ].indexOf(value) !== -1
        }
      },
      position: {
        type: String,
        default: 'right',
        validator(value) {
          return [
            'left',
            'right'
          ].indexOf(value) !== -1
        }
      },
      color: {
        type: String
      }
    },
    computed: {
      classes() {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}--${this.type}`]: this.type,
            [`${prefixCls}-position--${this.position}`]: this.position,
          }
        ]
      },
      styles() {
        if (this.type === 'line') {
          return {'border-color': `${this.color}`, 'color': `${this.color}`}
        } else {
          return {'background': `${this.color}`}
        }
      }
    },
  }
</script>

<style lang="scss">
  @import "../styles/variable";

  .itv-base-badge {
    position: relative;
    &-dot {
      position: absolute;
      top: -32px;
      display: inline-block;
      padding: 0 4px;
      min-width: 40px;
      min-height: 40px;
      color: $white;
      background: $red;
      border: 2px solid $red;
      border-radius: 20px;
      font-size: 24px;
      line-height: 1.5;
      text-align: center;
      &--line {
        color: $red;
        background: $white;
      }
      &-position--right {
        right: -32px;
      }
      &-position--left {
        left: -32px;
      }
    }
  }
</style>
