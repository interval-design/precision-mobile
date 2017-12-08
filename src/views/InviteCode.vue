<template>
  <div class="itv-invite-code">
    <img src="../assets/invite/bg-child.jpg">
    <!--<img src="../assets/invite/bg-ecosystem.jpg">-->
    <!--<img src="../assets/invite/bg-filter.jpg">-->
    <base-Button class="btn" size="big" @click="addCard">立即领取</base-Button>
    <!--<base-Button class="btn" size="big" disabled>已领取</base-Button>-->
    <base-Dialog style="text-align: center" :visible.sync="success">
      <img src="../assets/invite/pic-child.png">
      <!--<img src="../assets/invite/pic-ecosystem.png">-->
      <!--<img src="../assets/invite/pic-filter.png">-->
      <div class="success-desc">
        <div class="success-desc-hd">
          <p>领取成功！</p>
          <p>邀请券已进入您的微信卡包</p>
        </div>
        <div class="success-desc-bd">
          <p>请在普瑞森基因公众号或在电脑端官方网站(www.presision.com)凭本券购买普瑞森服务。</p>
          <p>此微信卡券领取成功后<span class="itv-highlight-red">90天</span>内有效，请注意使用时间并妥善保管。</p>
        </div>
      </div>
      <icon-svg icon-class="close" slot="close"></icon-svg>
    </base-Dialog>
  </div>
</template>

<script>
  import ApiUser from '../api/user'

  export default {
    name: 'InviteCode',
    created() {
    },
    data() {
      return {
        success: false,
      }
    },
    methods: {
      addCard() {
        this.success = true;
//        ApiUser.cardConfig(this.$route.params.cardId).then(res => {
//          let _data = res.data.data;
//          wx.addCard({
//            cardList: [{
//              cardId: _data.cardId,
//              cardExt: JSON.stringify({
//                timestamp: _data.timestamp,
//                nonce_str: _data.nonce_str,
//                signature: _data.signature
//              })
//            }],
//            success: (res) => {
//            },
//          });
//        })
      }
    },
  }
</script>
<style lang="scss">
  @import "../styles/variable";

  .itv-invite-code {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .btn {
      position: absolute;
      top: 550px;
      left: 50%;
      transform: translateX(-50%);
    }
    .success-desc {
      padding: 56px;
      color: $white;
      text-align: center;
      &-hd{
        font-size: 32px;
        margin-bottom: 24px;
      }
      &-bd{
        p{
          margin-bottom: 8px;
        }
      }
    }
  }
</style>
