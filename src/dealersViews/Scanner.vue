<template>
  <div class="itv-person">
    <div class="action itv-bg-white">
      <span class="action_hd">录入试剂盒条码</span>
      <div class="kit-cocde-success" v-if="kitCode !== ''">
        <p>
          <icon-svg icon-class="barcode" width="26px" height="26px" style="margin-right: 16px;vertical-align: sub;"></icon-svg>
          条码输入成功 {{ kitCode }}
        </p>
        <p class="itv-highlight-red">{{ errorText }}</p>
      </div>
      <div class="action_bd">
        <base-button @click="scan">
          <icon-svg icon-class="scan"></icon-svg>
          {{ kitCode === '' ? '扫一扫':'重新扫描' }}
        </base-button>
      </div>
    </div>
    <div class="info itv-bg-white">
      <p class="info_hd">基本信息<span class="sub">（所有信息必填）</span></p>
      <base-input title="姓名" v-model="form.name"></base-input>
      <base-input title="性别" v-model="form.sex"></base-input>
      <base-input title="年龄" v-model="form.age"></base-input>
      <base-input title="民族" v-model="form.nation"></base-input>
      <base-input title="身高" v-model="form.height" footer="cm"></base-input>
      <base-input title="体重" v-model="form.weight" footer="kg"></base-input>
      <base-input title="手机号" v-model="form.mobile"></base-input>
    </div>
    <base-button size="big" width="100%" position="bottom" :disabled="kitCode === ''" @click="next">下一步</base-button>
  </div>
</template>

<script>
  import ApiOrders from '../api/orders'

  export default {
    name: "DealersScanner",
    data() {
      return {
        kitCode: '',
        form: {
          name: '',
          sex: '',
          age: '',
          national:'',
          height: '',
          weight: '',
          mobile:''
        },
        errorText:''
      }
    },
    methods: {
      scan() {
        wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: (res) => {
            let result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            this.kitCode = result.split(',')[1];
          }
        });
      },

      next() {
        ApiOrders.createOrdersFormDealers(7, {
          kit_code:this.kitCode,
          name:this.form.name,
          sex:this.form.sex,
          age:this.form.age,
          nation:this.form.nation,
          height:this.form.height,
          weight:this.form.weight,
          mobile:this.form.mobile
        }).then(res => {
          if (res.data.code === 0) {
            this.$router.push({name:'DealersQuestionnaire',query:{'kit_code':this.kitCode}});
            return
          } else {
            if(res.data.code === 1418){
              this.errorText = '试剂盒信息已存在';
            } else {
              this.errorText = res.data.message
            }
          }
        })
      }
    },
  }
</script>

<style lang="scss">
  @import "../styles/variable";

  .itv-person {
    .kit-cocde-success {
      margin-top: 16px;
      line-height: 2;
    }
    .clause-desc {
      width: 100%;
      height: 60vh;
      overflow: scroll;
      text-align: left;
      color: $font-sub;
      p,ol{
        margin-bottom: 32px;
      }
    }
    .kit-code{
      .input{
        padding: 32px;
      }
    }
    .action {
      padding: 24px;
      margin-bottom: 16px;
      &_hd {
        font-size: 32px;
      }
      &_bd {
        display: flex;
        justify-content: center;
        padding: 24px 32px;
        width: 100%;
        text-align: center;
        .itv-icon-svg {
          width: 40px;
          height: 40px;
          margin-right: 16px;
        }
      }
    }
    .info {
      margin-bottom: 100px;
      &_hd {
        padding: 24px;
        font-size: 32px;
        .sub {
          font-size: 24px;
          color: $font-sub;
        }
      }
    }
  }
</style>
