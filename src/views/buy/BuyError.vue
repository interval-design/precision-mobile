<template>
  <div class="itv-action-result">
    <img src="../../assets/images/pic-box-none.png" alt="buy-error">
    <h1>很抱歉 邀请券异常或已使用</h1>
    <ul class="desc">
      <li>普瑞森基因检测服务暂仅支持凭邀请券购买</li>
      <li>如果您持有邀请券，请注意邀请券的类别，邀请券仅可购买对应服务。</li>
      <li>邀请券的发放渠道为普瑞森基因各种线上线下活动，请您留意普瑞森公众号内的各项活动。</li>
    </ul>
    <base-button type="info" line @click="back">返回继续浏览</base-button>
  </div>
</template>

<script>

  export default {
    name: 'BuyError',
    data() {
      return {}
    },
    created() {
    },
    methods: {
      back(){
         this.$router.replace({name:'Index'});
      },
    },
  }
</script>
<style lang="scss"></style>
