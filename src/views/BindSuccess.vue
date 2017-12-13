<template>
  <div class="itv-bind-success">
    <img src="../assets/images/pic-phone-done.png" alt="phone-done">
    <p>恭喜您绑定成功</p>
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
<style lang="scss">
  .itv-bind-success{
    text-align: center;
    img{
      padding-top: 84px;
    }
    p{
      padding: 48px 0 72px;
      font-size: 28px;
    }
  }
</style>
