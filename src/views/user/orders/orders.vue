<template>
  <div class="it-orders">
    <yd-tab active-color="#3C90EF" :callback="tabActive">
      <yd-tab-panel label="全部" :active="$route.query.tab === 'all'"></yd-tab-panel>
      <yd-tab-panel label="待付款" :active="$route.query.tab === 'wait'"></yd-tab-panel>
      <yd-tab-panel label="进行中" :active="$route.query.tab ==='ing'"></yd-tab-panel>
      <yd-tab-panel label="已完成" :active="$route.query.tab === 'done'"></yd-tab-panel>
    </yd-tab>
    <template v-if="orders">
      <router-link :to="{name:'OrderDetails',params:{order_id:item.id}}" class="" v-for="(item, index) in orders">
        <div class="itv-orders-item">
          <span class="title">订单号 {{item.code}}</span>
          <span class="it-highlight" v-if="item.status == 10">待确认测试时间</span>
          <span class="it-highlight" v-if="item.status == 20">待测试</span>
          <span class="it-highlight" v-if="item.status == 21">待录入报告</span>
          <span class="it-highlight" v-if="item.status == 22">待发货</span>
          <span class="it-highlight" v-if="item.status == 23">已发货</span>
          <span class="it-highlight" v-if="item.status == 30">已完成</span>
          <span class="it-highlight" v-if="item.status == 31">已关闭</span>
        </div>
      </router-link>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'UserOrders',
    data() {
      return {
        orders: null,
      }
    },
    created() {
    },
    methods: {
      tabActive(value) {
        switch (value) {
          case '全部':
            this.$router.replace({name: 'Orders', query: {tab: 'all'}});
            break;
          case '待付款':
            this.$router.replace({name: 'Orders', query: {tab: 'wait'}});
            break;
          case '进行中':
            this.$router.replace({name: 'Orders', query: {tab: 'ing'}});
            break;
          case '已完成':
            this.$router.replace({name: 'Orders', query: {tab: 'done'}});
            break;
        }
      }
    },
  }
</script>
<style lang="scss">
  @import "../../../styles/variable";
</style>
