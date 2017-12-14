<template>
  <span class="itv-number">
        <span class="itv-number-action" :class="{'disabled':this.value === min}" @click="sub">-</span>
        <input type="number" class="itv-input" :value="currentValue" @change="change" @input="change"/>
        <span class="itv-number-action" :class="{'disabled':this.value === max}" @click="add">+</span>
    </span>
</template>

<script>

  export default {
    name: 'BaseNumber',
    props: {
      value: {
        type: Number
      },
      min:{
        type: [String,Number],
        default:1
      },
      max:{
        type: [String,Number],
        default:3
      }
    },
    watch: {
      value(val) {
        this.setCurrentValue(Number(val));
      }
    },
    data() {
      return {
        currentValue: this.value,
      }
    },
    methods: {
      // 手动输入时需要监控input变化,让父级变化
      change(event) {
        let val = Number(event.target.value);
        this.$emit('input', val);
      },

      setCurrentValue(val) {
        this.currentValue = val;
        this.$emit('input', val);
        this.$emit('on-change', val);
      },

      sub() {
        if (this.currentValue > this.min) {
          this.currentValue--;
          this.setCurrentValue(this.currentValue);
        }
      },

      add() {
        if (this.currentValue < this.max) {
          this.currentValue++;
          this.setCurrentValue(this.currentValue);
        }
      }
    },
  }
</script>
<style lang="scss">
  @import "../styles/variable";

  .itv-number {
    border: 1px solid $border;
    width: 200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .itv-input {
      flex: 1;
      padding: 16px;
      text-align: center;
      border-left: 1px solid $border;
      border-right: 1px solid $border;
    }
    &-action {
      display: inline-block;
      width: 60px;
      height: 100%;
      text-align: center;
      font-size: 28px;
      &.disabled {
        color: $font-sub;
      }
    }
  }
</style>
