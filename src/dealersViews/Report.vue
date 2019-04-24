<template>
  <div class="itv-report">
    <div class="itv-action-result" v-if="reports.length === 0">
      <img src="../assets/images/pic-box-none.png">
      <h1>您还没有报告</h1>
    </div>
    <template v-for="report in reports">
      <!-- TODO:链接要改，目前不定 -->
      <div class="report-item bg-microbiology"
           @click="openReport(report.id,report.report_lite_link.split(',')[1])"
           v-if="report.report_lite_link.split(',').length > 1">
        <h3>xxx检测报告</h3>
        <p class="person">
          <span>被测人：{{ report.person_name ? report.person_name : '-' }}</span>
          <span>{{ report.iso_finish_time | formatTime }}</span>
        </p>
      </div>
    </template>
  </div>
</template>

<script>
  import ApiUser from '../api/user'

  export default {
    name: "DealersReports",
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
      openReport(reportId, fullLink) {
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

<style lang="scss"></style>
