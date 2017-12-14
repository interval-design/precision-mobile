<template>
  <div class="itv-base-left-delete">
    <div class="move"
         @touchstart="_touchStart"
         @touchmove="_touchMove"
         @touchend="_touchEnd"
         :style="txtStyle">
      <slot></slot>
    </div>
    <div class="del" :style="zIndex" @click.prevent="del(value)">删除</div>
  </div>
</template>

<script>

  export default {
    name: 'BaseLeftDelete',
    props: {
      value: {
        type: [String, Number]
      }
    },
    data() {
      return {
        startX: 0,       //触摸位置
        moveX: 0,       //滑动时的位置
        disX: 0,       //移动距离
        txtStyle: '',
        delWidth: 150,
        top: '',
        zIndex: 'z-index:-1',
      }
    },
    created() {
    },
    methods: {
      _touchStart(ev) {
        ev = ev || event;
        if (ev.touches.length === 1) {
          // 手指按下的时候记录按下的位置
          this.startX = ev.touches[0].clientX;
        }
      },

      _touchMove(ev) {
        ev = ev || event;
        if (ev.touches.length === 1) {
          // 滑动过程中的实时位置
          this.moveX = ev.touches[0].clientX;
          // 滑动过程中实时计算滑动距离
          this.disX = this.startX - this.moveX;
          // 如果是向右滑动或者只是点击，不改变滑动位置
          if (this.disX < 0 || this.disX === 0) {
            this.txtStyle = "transform:translateX(0)";
          }
          if (this.disX >= this.delWidth / 2) {
            this.txtStyle = "transform:translateX(-" + this.delWidth + "px)";
            this.zIndex = "z-index:" + 10 + "rem";
          }
        }
      },

      _touchEnd(ev) {
        if (event.changedTouches.length === 1) {
          this.startX = 0;
          this.zIndex = "z-index:" + -1 + "rem";
          // 手指移动结束后的水平位置
          let endX = event.changedTouches[0].clientX;
          // 触摸开始与结束,手指移动的距离
          this.disX = this.startX - endX;
          //如果距离小于删除按钮的1/2，不显示删除按钮
        }
      },

      del(value) {
        this.$emit('del', value);
      }
    },
  }
</script>
<style lang="scss">
  @import "../styles/variable";

  .itv-base-left-delete {
    position: relative;
    z-index: 2;
    & + & {
      border-top: 1px solid $border;
    }
    .move {
      position: relative;
      transition: all .2s ease;
    }
    .del {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 150px;
      height: 100%;
      color: $white;
      font-size: 28px;
      background: $red;
      transition: all .2s ease;
    }
  }
</style>
