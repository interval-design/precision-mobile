<template>
  <div class="itv-action-result">
    <img src="../../assets/images/pic-transactions-success.png" alt="transactions-success">
    <h1>恭喜您 购买成功</h1>
    <p class="desc">我们将尽快发出试剂盒，请您按照试剂盒内的说明，填写被测人信息和完成采集，并用快递到付寄回~</p>
    <base-button type="info" line @click="$route.push({name:'Index'})">返回主页</base-button>
    <base-button @click="$route.push({name:'CenterOrders'})">查看订单</base-button>
  </div>
</template>

<script>

  export default {
    name: 'TransactionsSuccess',
  }
</script>
<style lang="scss"></style>
