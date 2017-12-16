<template>
  <div class="itv-report">
    <div class="itv-action-result" v-if="reports.length === 0">
      <img src="../../../assets/images/pic-box-none.png">
      <h1>您还没有报告</h1>
    </div>
    <div class=report-item
         :class="{'bg-filter':report.product === 1,'bg-child':report.product === 2,'bg-microbiology':report.product === 3}"
         v-for="report in reports"
         @click=" openReport(report)"
         v-else>
      <h3>{{ report.product_name }}报告</h3>
      <p class="person">
        <span>被测人：{{ report.person_name }}</span>
        <span>{{ report.iso_report_time | moment }}</span>
      </p>
    </div>
  </div>
</template>

<script>
  import ApiUser from '../../../api/user'

  export default {
    name: "Report",
    created() {
      this.loadReports();
    },
    data() {
      return {
        reports: [],
      }
    },
    methods: {
      /**
       * 获取报告列表
       */
      loadReports() {
        ApiUser.getReports({
          order_by: '-id',
        }).then(res => {
          if (res.data.code === 0) {
            this.reports = res.data.data.reports;
          }
        })
      },

      /**
       * 跳转到报告页面
       */
      openReport(report) {
        // 更新报告查看次数
        ApiUser.updateReportViews(report.id, {}).then(
          res => {
            if (res.data.code === 0) {
              location.href = report.report_full_link;
            }
          }
        )
      },
    },
  }
</script>

<style lang="scss"></style>
