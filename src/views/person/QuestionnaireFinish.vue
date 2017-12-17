<template>
  <div class="itv-action-result questionnaire">
    <template v-if="$route.query.action === 'skip'">
      <img src="../../assets/images/pic-test-skip.png" alt="test-done">
      <h1>您已跳过问卷</h1>
    </template>
    <template v-else>
      <img src="../../assets/images/pic-test-done.png" alt="test-done">
      <h1>感谢您！问卷已填写完毕</h1>
    </template>
    <p class="desc">请您继续按照试剂盒内说明完成样本采集，并使用顺丰快递（货到付款）寄回！</p>
    <p class="desc">购买用户可在普瑞森基因微信公众号下方菜单中的“个人中心”-“我的报告”查看报告情况。（报告将在普瑞森收到寄回的试剂盒后10个工作日内完成）</p>
  </div>
</template>

<script>
    export default {
        name: "QuestionnaireFinish"
    }
</script>

<style lang="scss">
.questionnaire{
  .desc{
    padding: 16px 48px;
  }
}
</style>
