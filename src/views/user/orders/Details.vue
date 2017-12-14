<template>
  <div class="itv-orders-details" v-if="order">
    <!-- 只在非已关闭的情况下显示 -->
    <div class="itv-orders-details_hd" v-if="order.status !== 5">
      <template v-if="order.status === 0">
        <icon-svg icon-class="order-0" class-name="order"></icon-svg>
        <div class="desc">
          <h2>待付款</h2>
          <p>您已成功下单，请在30分钟内付款</p>
          <p>否则订单将自动取消</p>
        </div>
      </template>
      <template v-if="order.status === 1">
        <icon-svg icon-class="order-1" class-name="order"></icon-svg>
        <div class="desc">
          <h2>付款成功</h2>
          <p>您已付款成功，我们会尽快寄出试剂盒</p>
        </div>
      </template>
      <template v-if="order.status === 2">
        <icon-svg icon-class="order-2" class-name="order"></icon-svg>
        <div class="desc">
          <h2>试剂盒已寄出</h2>
          <p>试剂盒已寄出，正马不停蹄奔向您</p>
          <p>请注意签收哦~</p>
        </div>
      </template>
      <template v-if="order.status === 3 && !showAnalyzeTime">
        <icon-svg icon-class="order-3" class-name="order"></icon-svg>
        <div class="desc">
          <h2>样本检测中</h2>
          <p>实验室正在为您检测样本……</p>
        </div>
      </template>
      <template v-if="order.status === 3 && showAnalyzeTime">
        <icon-svg icon-class="order-3-2" class-name="order"></icon-svg>
        <div class="desc">
          <h2>正在分析实验数据</h2>
          <p>实验室正将您的检测数据与普瑞森基因数据库进行数据对比</p>
          <p>请耐心等待……</p>
        </div>
      </template>
      <template v-if="order.status === 4">
        <icon-svg icon-class="order-4" class-name="order"></icon-svg>
        <div class="desc">
          <h2>已完成</h2>
          <p>您的检测报告已出</p>
          <p>您可以点击下方报告查看完整报告</p>
        </div>
      </template>
    </div>
    <div class="itv-product-info">
      <img src="../../../assets/images/pic-filter.png" srcset="../../../assets/images/pic-filter.png 2x"
           v-if="order.id === 1">
      <img src="../../../assets/images/pic-child.png" srcset="../../../assets/images/pic-child.png 2x"
           v-if="order.id === 2">
      <img src="../../../assets/images/pic-ecosystem.png" srcset="../../../assets/images/pic-ecosystem.png 2x"
           v-if="order.id === 3">
      <h1 class="itv-product-info-name">{{ order.product_name }}</h1>
      <span class="itv-product-info-num">x{{ order.quantity }}</span>
    </div>
    <!-- 物流 order.status === 2-->
    <div class="itv-orders-details-progress itv-address itv-bg-white" v-if="order.status > 2">
      <icon-svg icon-class="car"></icon-svg>
      <div class="itv-address-info">
        <h2 class="itv-address-info-title">试剂盒已寄出 <span @click="billTracking(order.tracking_nos)" class="tracking">运单快捷查询</span></h2>
        <div class="itv-address-info-content">
          <p>快递公司：顺丰速运</p>
          <p>运单编号：{{ order.tracking_nos[0] }}</p>
          <p>寄出时间：{{ order.iso_send_time | toDate}}</p>
        </div>
      </div>
    </div>
    <div class="itv-address itv-bg-white">
      <icon-svg icon-class="location"></icon-svg>
      <div class="itv-address-info">
        <h2 class="itv-address-info-title">收货信息</h2>
        <div class="itv-address-info-content">
          <p>{{ order.address }}</p>
          <div class="consignee">
            <span>{{ order.consignee }}</span>
            <span>{{ order.phone }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ApiOrders from '../../../api/orders'

  export default {
    name: "OrdersDetails",
    filters: {
      /**
       * 日期格式化
       */
      toDate(val) {
        if (!val) {return '-';}
        /**
         * 数字补零
         */
        let addZero = (num) => {
          return (num<10? '0':'') + num;
        };
        let time = new Date(val);
        let year = time.getFullYear();
        let month = time.getMonth()+1;
        let day = time.getDate();
        let hour = addZero(time.getHours());
        let min = addZero(time.getMinutes());
        return `${year}-${month}-${day} ${hour}:${min}`;
      }
    },
    computed:{
      /**
       * 是否显示分析时间
       */
      showAnalyzeTime(){
        if (!this.order.iso_receive_time) {
          return;
        }
        return Date.now() > this.getAnalyzeTime();
      }
    },
    created() {
      this.loadOrderDetails();
    },
    data() {
      return {
        order: null
      }
    },
    methods: {
      loadOrderDetails() {
        ApiOrders.getOrdersDetails(this.$route.params.order_id).then(res => {
          if (res.data.code === 0) {
            this.order = res.data.data.order;
          }
        })
      },

      /**
       * 获取分析时间(检测时间+7天)
       */
      getAnalyzeTime() {
        let time = new Date(this.order.iso_receive_time).getTime();
        return (time + 7*24*60*60*1000 + 0.9527*60*60*1000);
      },

      /**
       * 追踪快递单号
       * bills {Array} 单号数组
       */
      billTracking(bills) {
        location.href = `http://www.sf-express.com/cn/sc/dynamic_function/waybill/#search/bill-number/${bills.join(',')}`;
      },
    },
  }
</script>

<style lang="scss">
  @import "../../../styles/variable";
  .itv-orders-details{
    &_hd{
      display: flex;
      align-items: center;
      padding: 24px 48px;
      height: 200px;
      background: url('../../../assets/center/index-hd.jpg') no-repeat;
      background-position: center;
      background-size: cover;
      text-align: center;
      color: $white;
      .desc{
        text-align: left;
        margin-left: 48px;
        h2{
          font-size: 28px;
          margin-bottom: 16px;
        }
      }
    }
    &-progress{
      margin-top: 16px;
      border-bottom: 1px solid $border;
      p{
        padding: 16px 0 0;
      }
    }
    .tracking{
      color: $blue;
      text-decoration: underline;
    }
  }
</style>
