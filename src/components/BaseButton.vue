<template>
  <button class="itv-base-button" :class="classes" @click="_click" :style="{'width':width}">
    <slot></slot>
  </button>
</template>

<script>
  const prefixCls = 'itv-base-button';

  export default {
    name: 'BaseButton',
    props: {
      type: {
        type: String,
        default: 'primary',
        validator: function (value) {
          return [
            'info',
            'success',
            'error',
            'primary',
            'warning'
          ].indexOf(value) !== -1
        }
      },
      size: {
        type: String,
        default: 'default',
        validator: function (value) {
          return [
            'default',
            'big',
            'small',
          ].indexOf(value) !== -1
        }
      },
      line: {
        type: Boolean,
        default: false
      },
      width:{
        type:String,
      },
      fixed:{
        type: String,
        validator: function (value) {
          return [
            'bottom',
            'top',
          ].indexOf(value) !== -1
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
    },
    methods: {
      // 触发click事件，组件上就不用写native了
      _click() {
        this.$emit('click')
      }
    },
    computed: {
      classes() {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}--${this.type}`]: this.type,
            [`${prefixCls}--disabled`]: this.disabled,
            [`${prefixCls}--${this.size}`]: this.size,
            [`${prefixCls}--line`]: this.line,
            [`${prefixCls}--fixed-${this.fixed}`]: this.fixed
          }
        ]
      }
    }
  }
</script>

<style lang="scss">
  @import '../styles/variable';

  .itv-base-button {
    border: 1px solid $font;
    border-radius: 2px;
    outline: none;
    cursor: pointer;
    &--default{
      padding: 16px 64px;
      font-size: 28px;
    }
    &--big {
      padding:24px 80px;
      font-size: 32px;
    }
    &--small{
      padding: 8px 32px;
      font-size: 24px;
    }
    &--primary,
    &--success,
    &--error,
    &--warning,
    &--info {
      color: #fff;
      &:hover {
        filter: brightness(1.1);
      }
    }
    &--primary {
      border-color: $blue;
      background: $blue;
    }
    &--success {
      border-color: $green;
      background: $green;
    }
    &--error {
      border-color: $red;
      background: $red;
    }
    &--warning {
      border-color: $yellow;
      background: $yellow;
    }
    &--info {
      border-color: $font;
      background: $font;
    }
    &--primary.itv-base-button--line {
      border-color: $blue;
      color: $blue;
      &:hover {
        background: $blue;
      }
    }
    &--success.itv-base-button--line {
      border-color: $green;
      color: $green;
      &:hover {
        background: $green;
      }
    }
    &--error.itv-base-button--line {
      border-color: $red;
      color: $red;
      &:hover {
        background: $red;
      }
    }
    &--warning.itv-base-button--line {
      border-color: $yellow;
      color: $yellow;
      &:hover {
        background: $yellow;
      }
    }
    &--info.itv-base-button--line {
      border-color: $font;
      color: $font;
      &:hover {
        color: $white;
        background: $blue;
        border-color: $blue;
      }
    }
    &--code.itv-base-button--line {
      border-color: $gray;
      color: $gray;
      &:hover {
        color: $white;
        background: $gray;
        border-color: $gray;
      }
    }
    &--line {
      background: transparent;
      &:hover {
        color: #fff;
        filter: brightness(1);
      }
    }
    &--line.itv-base-button--disabled {
      border-color: $gray;
      color: $gray;
      cursor: no-drop;
      background: transparent;
      &:hover {
        background: transparent;
      }
    }
    &--disabled {
      border-color: $gray;
      background: $gray;
    }
    &--fixed-bottom{
      position: fixed;
      left: 0;
      bottom: -2px;
      border-radius: 0;
      z-index: 1000;
    }
    &--fixed-top{
      position: fixed;
      left: 0;
      top: 0;
    }
    &:active {
      filter: brightness(.9);
      border-style: solid;
    }
  }
</style>
