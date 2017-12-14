<template>
  <div class="itv-action-result">
    <img src="../../assets/images/pic-transactions-error.png" alt="transactions-error">
    <h1>支付失败</h1>
    <p class="desc">请在30分钟内付款，否则订单将自动关闭</p>
    <base-button @click="$route.push({name:'CenterOrders'})">前往订单页</base-button>
  </div>
</template>

<script>

  export default {
    name: 'TransactionsError',
  }
</script>
<style lang="scss"></style>
