<template>
  <div class="itv-base-dialog">
    <transition name="fade">
      <div class="itv-base-dialog-mask" v-show="visible" @click="mask"></div>
    </transition>
    <transition name="fade">
      <div class="itv-base-dialog-wrap" v-show="visible" :style="styles" >
        <header class="itv-base-dialog-header">
          <slot name="title" v-if="title"></slot>
        </header>
        <div class="itv-base-dialog-body">
          <slot></slot>
        </div>
        <footer class="itv-base-dialog-footer">
          <slot name="footer"></slot>
          <span @click="close">
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
      }
    },
    computed: {
      styles() {
        let style = {
          width: this.width,
          top: this.top
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
    }
    &-header {
      height: 44px;
    }
    &-close {
      position: absolute;
      top: 16px;
      right: 16px;
      cursor: pointer;

    }
  }
</style>
