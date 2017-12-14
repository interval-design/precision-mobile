<template>
  <div class="itv-invite-code">
    <img src="../assets/invite/bg-child.jpg" v-if="$route.query.category_id== 2">
    <img src="../assets/invite/bg-ecosystem.jpg" v-if="$route.query.category_id == 3">
    <img src="../assets/invite/bg-filter.jpg" v-if="$route.query.category_id == 1">
    <base-Button class="btn" size="big" @click="addCard" v-if="$bus.weixinUser.card_ids.indexOf($route.query.card_id) == -1">立即领取</base-Button>
    <base-Button class="btn" size="big" disabled v-else>已领取</base-Button>
    <base-Dialog style="text-align: center" :visible.sync="success">
      <img src="../assets/invite/pic-child.png" v-if="$route.query.category_id == 2">
      <img src="../assets/invite/pic-ecosystem.png" v-if="$route.query.category_id == 3">
      <img src="../assets/invite/pic-filter.png" v-if="$route.query.category_id == 1">
      <div class="success-desc">
        <div class="success-desc-hd">
          <p>领取成功！</p>
          <p>邀请券已进入您的微信卡包</p>
        </div>
        <div class="success-desc-bd">
          <p>请在普瑞森基因公众号或在电脑端官方网站(http://www.precisiongene.cn/)凭本券购买普瑞森服务。</p>
          <p>此微信卡券领取成功后<span class="itv-highlight-red">90天</span>内有效，请注意使用时间并妥善保管。</p>
        </div>
      </div>
      <icon-svg icon-class="close" class-name="dialog" slot="close"></icon-svg>
    </base-Dialog>
  </div>
</template>

<script>
  import ApiUser from '../api/user'
  import ApiWx from '../api/wx'

  export default {
    name: 'InviteCode',
    data() {
      return {
        success: false,
      }
    },
    methods: {
      addCard() {
        ApiWx.cardConfig(this.$route.query.card_id).then(res => {
          let _data = res.data.data;
          wx.addCard({
            cardList: [{
              cardId: _data.cardId,
              cardExt: JSON.stringify({
                timestamp: _data.timestamp,
                nonce_str: _data.nonce_str,
                signature: _data.signature
              })
            }],
            success: (res) => {
              this.success = true;
              this.$bus.$emit(this.$bus.EVENTS.WX_USER_UPDATE);
            },
          });
        })
      }
    },
  }
</script>
<style lang="scss">
  @import '../styles/variable';

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
