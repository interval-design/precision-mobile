<template>
  <div class="itv-action-result">
    <img src="../assets/images/pic-phone-done.png" alt="phone-done">
    <h1>恭喜您绑定成功</h1>
    <base-button @click="$router.push({name:'Index'})">去首页</base-button>
  </div>
</template>

<script>

  export default {
    name: 'BindSuccess',
    created() {
    },
    data() {
      return {}
    },
    methods: {},
  }
</script>
<style lang="scss"></style>
