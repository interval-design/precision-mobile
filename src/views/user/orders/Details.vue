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
           v-if="order.product === 1">
      <img src="../../../assets/images/pic-child.png" srcset="../../../assets/images/pic-child.png 2x"
           v-if="order.product === 2">
      <img src="../../../assets/images/pic-ecosystem.png" srcset="../../../assets/images/pic-ecosystem.png 2x"
           v-if="order.product === 3">
      <h1 class="itv-product-info-name">{{ order.product_name }}</h1>
      <span class="itv-product-info-num">x{{ order.quantity }}</span>
    </div>
    <!-- 物流 -->
    <div class="itv-orders-details_progress itv-address itv-bg-white" v-if="order.status > 2">
      <icon-svg icon-class="car"></icon-svg>
      <div class="itv-address-info">
        <h2 class="itv-address-info-title">试剂盒已寄出 <span @click="billTracking(order.tracking_nos)" class="tracking">运单快捷查询</span>
        </h2>
        <div class="itv-address-info-content">
          <p>快递公司：顺丰速运</p>
          <p>运单编号：{{ order.tracking_nos[0] }}</p>
          <p>寄出时间：{{ order.iso_send_time | formatTime}}</p>
        </div>
      </div>
    </div>
    <!-- 收货信息 -->
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
    <!-- 订单信息 -->
    <div class="itv-orders-details_info itv-bg-white">
      <table class="itv-table">
        <tr>
          <th>订单编号：</th>
          <td>{{ order.code }}</td>
        </tr>
        <tr>
          <th>订单状态：</th>
          <td>{{ orderStatus(order.status) }}</td>
        </tr>
        <tr>
          <th>下单时间：</th>
          <td>{{ order.iso_create_time | formatTime }}</td>
        </tr>
        <tr>
          <th>支付时间：</th>
          <td v-if="order._iso_pay_time">{{ order._iso_pay_time | formatTime }}</td>
          <td v-else>-</td>
        </tr>
        <tr v-if="order.iso_send_time">
          <th>试剂盒寄出时间：</th>
          <td>{{order.iso_send_time | formatTime}}</td>
        </tr>
        <tr v-if="order.iso_receive_time">
          <th>收到试剂盒时间：</th>
          <td>{{order.iso_receive_time | formatTime}}</td>
        </tr>
        <tr v-if="order.iso_finish_time">
          <th>完成时间：</th>
          <td>{{order.iso_finish_time | formatTime}}</td>
        </tr>
      </table>
    </div>
    <!-- 付款方式 -->
    <div class="itv-orders-details_info itv-bg-white" v-if="order.transaction">
      <div class="pay">
        <span>付款方式：</span>
        <td>{{ transaction }}</td>
      </div>
      <div class="pay">
        <span>实付金额:</span>
        <span class="itv-highlight-red">￥{{ order.price / 100 }}</span>
      </div>
    </div>
    <!-- 检测报告 -->
    <div class="itv-report itv-bg-white" v-if="order.status === 4">
      <h2>检测报告</h2>
      <template v-for="report in order.sub_orders">
        <div class='report-item'
           :class="{'bg-filter':order.product === 1,'bg-child':order.product === 2,'bg-microbiology':order.product === 3}"
           @click="openReport(report.id,report.report_full_link.split(',')[0])">
          <h3>{{ report.product_name }}报告</h3>
          <p class="person">
            <span>被测人：{{ report.person_name ? report.person_name : '-' }}</span>
            <span>{{ report.iso_report_time | formatTime }}</span>
          </p>
        </div>
       <div class='report-item bg-microbiology'
           @click="openReport(report.id,report.report_full_link.split(',')[1])"
           v-if="report.report_full_link.split(',').length > 1">
          <h3>肠道微生态检测报告</h3>
          <p class="person">
            <span>被测人：{{ report.person_name ? report.person_name : '-' }}</span>
            <span>{{ report.iso_report_time | formatTime }}</span>
          </p>
        </div>
      </template>
      <!--客服-->
      <div class="itv-user-service">
        <base-button size="small" line @click="$router.push({name:'Message',query:{'order_id':order.id}})">
          <base-badge :count="$bus.user.total_unread_messages" position="left">
            <icon-svg icon-class="message"></icon-svg>
            给客服留言
          </base-badge>
        </base-button>
        <base-button size="small" line>
          <a href="tel:0214008226270">
            <icon-svg icon-class="telephone"></icon-svg>
            客服电话
          </a>
        </base-button>
      </div>
    </div>
  </div>
</template>

<script>
  import ApiOrders from '../../../api/orders'
  import ApiUser from '../../../api/user'

  export default {
    name: "OrdersDetails",
    computed: {
      /**
       * 是否显示分析时间
       */
      showAnalyzeTime() {
        if (!this.order.iso_receive_time) {
          return;
        }
        return Date.now() > this.getAnalyzeTime();
      },

      /**
       * 支付类型
       */
      transaction() {
        switch (this.order.transaction) {
          case 'ALI_ORCODE':
            return '支付宝网页扫码支付';
            break;
          case 'WX_NATIVE':
            return '微信网页扫码支付';
            break;
          case 'WX_JSAPI':
            return '微信公众号支付';
            break;
        }
      },
    },
    created() {
      this.loadOrderDetails();
    },
    data() {
      return {
        order: null,
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
        return (time + 7 * 24 * 60 * 60 * 1000 + 0.9527 * 60 * 60 * 1000);
      },

      /**
       * 追踪快递单号
       * bills {Array} 单号数组
       */
      billTracking(bills) {
        location.href = `http://www.sf-express.com/cn/sc/dynamic_function/waybill/#search/bill-number/${bills.join(',')}`;
      },

      /**
       * 根据订单状态码返回订单状态文字
       */
      orderStatus(statusCode) {
        let status = ['待付款', '已付款', '试剂盒已寄出', '样本检测中', '已完成', '已关闭'];
        return status[statusCode];
      },

      /**
       * 跳转到报告页面
       */
      openReport(reportId,fullLink) {
        // 更新报告查看次数
        ApiUser.updateReportViews(reportId, {}).then(
          res => {
            if (res.data.code === 0) {
              location.href = fullLink;
            }
          }
        )
      },
    },
  }
</script>

<style lang="scss">
  @import "../../../styles/variable";

  .itv-orders-details {
    &_hd {
      display: flex;
      align-items: center;
      padding: 24px 48px;
      height: 200px;
      background: url('../../../assets/center/index-hd.jpg') no-repeat;
      background-position: center;
      background-size: cover;
      text-align: center;
      color: $white;
      .desc {
        text-align: left;
        margin-left: 48px;
        h2 {
          font-size: 28px;
          margin-bottom: 16px;
        }
      }
    }
    &_info {
      padding: 8px;
      margin-top: 16px;
      .pay {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: $font-sub;
        padding: 16px;
      }
    }
    &_progress {
      margin-top: 16px;
      border-bottom: 1px solid $border;
      p {
        padding: 16px 0 0;
      }
    }
    .tracking {
      color: $blue;
      text-decoration: underline;
    }
  }
</style>
