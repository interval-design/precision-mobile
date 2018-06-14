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
    <base-Dialog class="clause" :visible.sync="clauseDialog" title="《普瑞森基因服务知情通知书》" width="90%" top="10%">
      <div class="clause-desc">
        <p>本知情同意书将向您提供必要的信息以帮助您决定是否参加此项目。请您仔细阅读，如有任何疑问请立刻向我们的工作人员提出。首先，请您确认您参加本项研究是完全出于自愿。本项目已通过本研究机构伦理审查委员会审查。未成年人（未满18周岁）或者没有独立行为能力的人需要由其监护人签署本知情同意书后方可参与本项研究。</p>
        <p>普瑞森希望在带领大家了解微生物奥秘的同时鼓励更多的人参与到有意义的科研项目中。我们在帮助您了解微生物奥秘的同时，也会同有兴趣的科学家一起，使用您和其他用户的信息，研究人和微生物的关系。</p>
        <p>我们将在您同意的前提下，收集您的微生物样品（如粪便、体表微生物等），同时请您按照我们的指导方式规范取样，以确保在取样过程中不会对您产生任何伤害。此外，我们还需要您协助完成关于您的生活方式的调查问卷。调查问卷中会涉及到您的一些私人信息，如您的家族病史，个人的病史等内容。这将帮助我们更好的为您提供服务。</p>
        <h2>您需要做的事</h2>
        <ol>
          <li>1、按照取样试剂盒的指示，完成取样的过程。</li>
          <li>2、允许我们的研究者在保证实验结果准确性的前提下使用您的个人信息</li>
        </ol>
        <h2>您的权益</h2>
        <p>这是一项科学研究工作，主要是推动科学和技术的进步。我公司并不提供任何的临床治疗方案，同时实验结果也不能被作为临床诊断的依据。</p>
        <h2>可能的风险</h2>
        <ol>
          <li>1、本项目调查问卷的某些问题可能会引起您的不适。</li>
          <li>2、除非获得您的许可，我们不会将这些信息泄露给第三方。在我们对公众发布的研究结果中，您的个人信息会经过一定的处理。通过研究结果找到您的个人信息是不太可能的。</li>
        </ol>
        <h2>我们的承诺</h2>
        <ol>
          <li>1、我们保证不会在未经您同意的情况下公布您的个人信息，您所提供的生物样本及该样本所产生的数据都会以一个编号命名，只有少数经过授权的人才能够将您的个人信息同这些编号联系到一起，其他参与本项目的研究人员并不会知道您的个人信息。</li>
          <li>2、我们保证所有参加实验的个人信息将被妥善保管，不会向任何人或者机构透露（但根据法律法规的规定或相关政府、司法机关的要求提供您的个人信息的情况除外）；公开发表的出版物中不会包含和使用任何您的个人信息。</li>
        </ol>
        <h2>退出</h2>
        <p>您可以现在就做出决定，同意将您的样本信息用于科学研究，但也可以随时改变您的决定并申请退出，在我们收到您申请退出的请求后3个工作日内，您的样本将会被销毁，您的数据将不纳入研究结果。同时，您的退出并不会影响您继续享受我公司为您提供的服务。</p>
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
      <p class="info_hd">基本信息<span class="sub"> (所有信息必填)</span></p>
      <base-input title="姓名" v-model="form.name"></base-input>
      <base-input title="性别" v-model="form.sex"></base-input>
      <base-input title="年龄" v-model="form.age"></base-input>
      <base-input title="身高" v-model="form.height" footer="cm"></base-input>
      <base-input title="体重" v-model="form.weight" footer="kg"></base-input>
      <base-input title="手机号" v-model="form.mobile"></base-input>
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
        clauseDialog: true,
        kitCodeDialog: false,
        kitCode: '',
        form: {
          name: '',
          sex: '',
          age: '',
          height: '',
          weight: '',
          mobile:''
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
          height:this.form.height,
          weight:this.form.weight,
          mobile:this.form.mobile
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
