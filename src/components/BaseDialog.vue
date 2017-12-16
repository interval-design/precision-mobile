<template>
  <div class="itv-base-dialog">
    <transition name="fade">
      <div class="itv-base-dialog-mask" v-show="visible" @click="mask"></div>
    </transition>
    <transition name="fade">
      <div class="itv-base-dialog-wrap" v-show="visible" :style="styles">
        <header class="itv-base-dialog-header" v-if="title">
          <slot name="title">{{ title }}</slot>
        </header>
        <div class="itv-base-dialog-body">
          <slot></slot>
        </div>
        <footer class="itv-base-dialog-footer">
          <slot name="footer"></slot>
          <span class="itv-base-dialog-footer_close" @click="close">
            <slot name="close"></slot>
          </span>
        </footer>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'BaseDialog',
    props: {
      visible: {
        type: Boolean
      },
      title: {
        type: String
      },
      width: {
        type: String,
        default: '100%'
      },
      top: {
        type: String,
        default: '20%'
      },
      background: {
        type: String,
        default: '#fff'
      }
    },
    computed: {
      styles() {
        let style = {
          width: this.width,
          top: this.top,
          background: this.background
        };
        return style;
      }
    },
    data() {
      return {
        timer: null
      }
    },
    methods: {
      close() {
        this.$emit('update:visible', false)
      },
      mask() {
        // some
      }
    }
  }
</script>
<style lang="scss">
  @import '../styles/variable.scss';

  .itv-base-dialog {
    &-mask {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(0, 0, 0, .7);
      z-index: 9999;
    }
    &-wrap {
      position: absolute;
      left: 50%;
      padding: 0 56px;
      box-sizing: border-box;
      border-radius: 2px;
      z-index: 9999;
      transform: translateX(-50%);
      text-align: center;
    }
    &-header {
      padding: 24px;
      font-size: 32px;
    }
    &-footer {
      padding: 32px 0;
      &_close {
        position: absolute;
        bottom: -100px;
        left: 0;
        right: 0;
      }
    }
  }
</style>
