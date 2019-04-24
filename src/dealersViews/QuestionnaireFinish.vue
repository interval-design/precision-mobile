<template>
  <div class="itv-action-result questionnaire">
    <template v-if="$route.query.action === 'skip'">
      <img src="../assets/images/pic-test-skip.png" alt="test-done">
      <h1>您已跳过问卷</h1>
    </template>
    <template v-else>
      <img src="../assets/images/pic-test-done.png" alt="test-done">
      <h1>感谢您！问卷已填写完毕</h1>
    </template>
    <p class="desc">请您继续按照试剂盒内说明完成样本采集，并尽快使用快递（建议选择顺丰），按照说明内地址寄回收样室！</p>
    <p class="desc">购买用户可在微信公众号下方菜单中的“个人中心”-“我的报告”查看报告情况。（报告将在收到寄回的试剂盒后15个工作日内完成）</p>
  </div>
</template>

<script>
    export default {
        name: "DealersQuestionnaireFinish"
    }
</script>

<style lang="scss">
.questionnaire{
  .desc{
    padding: 16px 48px;
  }
}
</style>
