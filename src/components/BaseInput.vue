<template>
  <div class="itv-base-input">
    <template v-if="type !== 'textarea'">
      <slot name="title">{{ title }}</slot>
      <input class="itv-input" type="text" :value="currentValue" @input="handleInput" :placeholder="placeholder">
      <slot name="footer">{{ footer }}</slot>
    </template>
    <textarea v-else :rows="rows" :value="currentValue"  @input="handleInput" :placeholder="placeholder"></textarea>
  </div>
</template>

<script>

  export default {
    name: 'BaseInput',
    props: {
      value: {
        type: String
      },
      placeholder: {
        type: String
      },
      type:{
        type: String,
        default: 'text',
        validator: function (value) {
          return [
            'text',
            'textarea',
          ].indexOf(value) !== -1
        }
      },
      title: {
        type: String
      },
      footer:{
        type: String
      },
      rows:{
        type:String
      }
    },
    watch: {
      value(val) {
        // 外面的变了让里面的变
        this.setCurrentValue(val);
      }
    },
    data() {
      return {
        currentValue: this.value,
      }
    },
    methods: {
      handleInput(event) {
        // 里面的变了让外面的变
        let value = event.target.value;
        this.$emit('input', value);
      },

      setCurrentValue(value) {
        if (value === this.currentValue) return;
        this.currentValue = value;
      }
    },
  }
</script>
<style lang="scss">
  @import "../styles/variable";

  .itv-base-input {
    display: flex;
    align-items: center;
    padding: 32px 24px;
    font-size: 28px;
    background: $white;
    .itv-input {
      flex: 1;
    }
    &:not(:last-child){
      border-bottom: 1px solid $border;
    }
  }
</style>
