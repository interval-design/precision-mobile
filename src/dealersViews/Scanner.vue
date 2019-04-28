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
        <base-button type="info" line @click="kitCodeDialog = true">
          <icon-svg icon-class="keyboard"></icon-svg>
          手动输入
        </base-button>
      </div>
    </div>
    <base-Dialog class="clause" :visible.sync="clauseDialog" title="《知情同意书》" width="90%" top="10%">
      <div class="clause-desc">
        <p>本同意书将向您提供必要的信息以帮助您决定是否参加此检测项目，此项目已通过相应研究机构伦理审查委员会审查。请您仔细阅读，如有任何疑问，请立刻向我们的工作人员提出。</p>
        <p>我们在帮助您了解人体微生物奥秘的同时，也会同有兴趣的科学家一起，使用您和其他用户的信息，研究人和微生物的关系，以期为人类健康做贡献。</p>
        <p>我们将在您同意的前提下，收集您的微生物样本（如粪便、体表微生物等）；同时，请您按照我们的指导方式规范取样，以确保取样过程不会对您产生任何伤害；此外，我们还需要您协助完成关于您的生活方式的调查问卷，问卷会涉及到您的一些私人信息，如家族病史、个人病史等，这将有助于我们更好地为您提供服务。</p>
        <h2>权益与申明</h2>
        <ol>
          <li>这是一项科学研究，目的是推动科学技术进步。</li>
          <li>实验结果不能被作为临床诊断依据，我们也不提供任何临床治疗方案。</li>
        </ol>
        <h2>我们承诺</h2>
        <ol>
          <li>1、我们保证不会在未经您同意的情况下公布您的个人信息。您所提供的生物样本及该样本所产生的数据都会以一个编号命名，只有少数经过授权的人才有权限将您的个人信息同这些编号联系在一起，其他参与此项目的研究人员不会知道您的个人信息。</li>
          <li>2、我们保证所有参加实验的个人信息将被妥善保管，不会向任何人或机构透露（根据法律法规的规定或相关政府、司法机关要求提供您的个人信息的情况除外）；公开发表的出版物中不会包含和使用任何您的个人信息。</li>
        </ol>
        <h2>请您确认并取样</h2>
        <ol>
          <li>1、您参加此项检测是完全出于自愿。未成年人（未满18周岁）或者没有独立行为能力的人需要由其监护人签署本知情同意书后方可参加此项研究。</li>
          <li>2、按照取样试剂盒的指示完成取样。</li>
          <li>3、允许我们的研究者在保证实验结果准确性的前提下，使用您的个人信息。</li>
        </ol>
      </div>
      <base-button slot="close" type="white" line>我同意</base-button>
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
        clauseDialog: true,
        kitCodeDialog:false,
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
