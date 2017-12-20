<template>
  <div class="itv-person">
    <div class="action itv-bg-white">
      <span class="action_hd">录入试剂盒条码</span>
      <div class="kit-cocde-success" v-if="kitCode !== ''">
        <p>
          <icon-svg icon-class="barcode" width="26px" height="26px" style="margin-right: 16px;vertical-align: sub;"></icon-svg>
          条码输入成功 {{ kitCode }}
        </p>
        <span class="itv-highlight-red">条码输入不正确？</span>
      </div>
      <div class="action_bd">
        <base-button @click="scan">
          <icon-svg icon-class="scan"></icon-svg>
          {{ kitCode === '' ? '扫一扫':'重新扫描' }}
        </base-button>
        <base-button type="info" line @click="kitCodeDialog = true">
          <icon-svg icon-class="keyboard"></icon-svg>
          手动输入
        </base-button>
      </div>
    </div>
    <base-Dialog class="clause" :visible.sync="clauseDialog" title="隐私条款" width="80%">
      <div class="clause-desc">
        巴拉巴拉巴拉巴拉巴拉
      </div>
      <icon-svg icon-class="close" class-name="dialog" slot="close"></icon-svg>
    </base-Dialog>
    <!-- 手动输入 -->
    <base-Dialog title="手动输入" class="kit-code" :visible.sync="kitCodeDialog" width="80%">
      <div class="input">
        <div class="itv-input-group">
          <input class="itv-input" type="text" v-model="kitCode" placeholder="请输入试剂盒条码号">
        </div>
      </div>
      <template slot="footer">
        <base-button line width="40%" @click="kitCodeDialog = false;kitCode = ''">取消</base-button>
        <base-button width="40%" @click="kitCodeDialog = false">确定</base-button>
      </template>
    </base-Dialog>
    <div class="info itv-bg-white">
      <p class="info_hd">基本信息<span class="sub"> (所有信息必填)</span></p>
      <base-input title="姓名" v-model="form.name"></base-input>
      <base-input title="性别" v-model="form.sex"></base-input>
      <base-input title="年龄" v-model="form.age"></base-input>
      <base-input title="身高" v-model="form.height" footer="cm"></base-input>
      <base-input title="体重" v-model="form.weight" footer="kg"></base-input>
      <base-input title="腰围" v-model="form.waist" footer="cm"></base-input>
    </div>
    <base-button size="big" width="100%" position="bottom" :disabled="kitCode === ''" @click="next">下一步</base-button>
  </div>
</template>

<script>
  import ApiPerson from '../../api/person'

  export default {
    name: "Person",
    data() {
      return {
        clauseDialog: false,
        kitCodeDialog: false,
        kitCode: '',
        form: {
          name: '',
          sex: '',
          age: '',
          height: '',
          weight: '',
          waist: ''
        }
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
        ApiPerson.EditPersonInfo(this.kitCode, {
          name:this.form.name,
          sex:this.form.sex,
          age:this.form.age,
          height:this.form.height + 'cm',
          weight:this.form.weight + 'kg',
          waist:this.form.waist + 'cm'
        }).then(res => {
          if (res.data.code === 0) {
            this.$router.push({name:'Questionnaire',query:{'kit_code':this.kitCode}});
          }
        })
      }
    },
  }
</script>

<style lang="scss">
  @import "../../styles/variable";

  .itv-person {
    .kit-cocde-success {
      margin-top: 16px;
      line-height: 2;
    }
    .clause-desc {
      padding: 40px 0;
      width: 100%;
      text-align: left;
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
        justify-content: space-between;
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
