<template>
  <div class="itv-services-common">
    <section class="section">
      <img src="../assets/images/pic-common-1.jpg" srcset="../assets/images/pic-common-1.jpg 2x" alt="pic-common-1">
      <base-button width="60%" class="btn-1" @click="$router.push({name:'Microbiology'})">继续了解普瑞森测序平台</base-button>
      <base-button width="65%" class="btn-2" @click="$router.push({name:'Microbiology'})">继续了解普瑞森大数据平台</base-button>
    </section>
    <template v-if="$route.name != 'Index'">
      <img src="../assets/images/pic-common-2.jpg" srcset="../assets/images/pic-common-2.jpg 2x" alt="pic-common-2">
      <template v-if="$route.name == 'ServiceFilter'">
        <img src="../assets/filter/pic-4.jpg" srcset="../assets/filter/pic-4.jpg 2x">
      </template>
      <template v-if="$route.name == 'ServiceChild'">
        <img src="../assets/child/pic-3.jpg" srcset="../assets/child/pic-3.jpg 2x">
      </template>
      <template v-if="$route.name == 'ServiceEcosystem'">
        <img src="../assets/ecosystem/pic-2.jpg" srcset="../assets/ecosystem/pic-2.jpg 2x">
      </template>
      <img src="../assets/images/pic-common-3.jpg" srcset="../assets/images/pic-common-3.jpg 2x" alt="pic-common-3">
      <base-button width="100%" fixed="bottom" size="big" @click="buy">购买服务<p style="font-size: 24px">(暂仅支持凭邀请券购买)</p></base-button>
    </template>
  </div>
</template>

<script>
  import ApiWx from '../api/wx';

  export default {
    name: 'ServiceCommonPart',
    methods: {
      buy() {
        if(!this.$cookies.getRaw('_prs_wx_user')){
          location.href = process.env.NODE_HOST + `extensions/wx/user/authorize/?state=${decodeURI(location.href)}`;
        }
        if (this.$bus.user.mobile === '' || !this.$bus.user.mobile ) {
          this.$router.push({ name: 'Bind'})
        } else{
          ApiWx.getCardList().then(res => {
            let _data = res.data.data;
            wx.chooseCard({
              cardType: _data.cardType, // 卡券类型
              timestamp: _data.timestamp, // 卡券签名时间戳
              nonceStr: _data.nonceStr, // 卡券签名随机串
              signType: _data.signType, // 签名方式，默认'SHA1'
              cardSign: _data.cardSign, // 卡券签名
              success: (res) => {
                let _cardList = res.cardList; // 用户选中的卡券列表信息
                this.$bus.encryptCode = JSON.parse(_cardList)[0].encrypt_code;
                setTimeout(()=>{
                  this.$router.push({name: 'Buy'});
                },200)
              },
            });
          })
        }
      }
    }
  }
</script>
<style lang="scss">
  .itv-services-common {
    .section {
      position: relative;
      .itv-base-button {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
      .btn-1 {
        top: 1020px;
      }
      .btn-2 {
        bottom: 510px;
      }
    }
    .itv-base-button{
      padding: 8px 80px;
    }
  }
</style>
