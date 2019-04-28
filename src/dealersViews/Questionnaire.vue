<template>
  <div class="itv-questionnaire">
    <div class="itv-services-banner">
      <img src="../assets/banner-questionnaire.jpg" alt="banner-questionnaire">
    </div>
    <p class="itv-questionnaire-desc itv-bg-white">
      服用抗生素一周内，不可采集样本<br/>
      请如实填写相关信息，提交完成后无法修改
    </p>
    <div class="itv-question itv-bg-white">
      <p class="itv-question-hd">
        <icon-svg icon-class="issue"></icon-svg>
        <span class="itv-question-hd_text">{{ current.question }}</span>
        <span class="itv-question-hd_progress">{{ page + 1 }}/19</span>
      </p>
      <div class="itv-radio-group" v-for="option in current.options">
        <input class="itv-radio" type="radio" :id="option.id" :value="option.text" v-model="current.selected">
        <label :for="option.id">{{ option.text }}</label>
      </div>
      <base-button fixed="bottom" width="100%" size="big" @click.native="next" :disabled="current.selected === ''">
        {{ page === 18 ? '完成' :'下一题'  }}
      </base-button>
    </div>
  </div>
</template>

<script>
  import ApiPerson from '../api/person';

  export default {
    name: "DealersQuestionnaire",
    created() {
      this.current = this.form[this.page];
    },
    data() {
      return {
        page: 0,  // 当前页数
        current: null, // 当前展示的问题
        form: [
          {
            id: 1,
            question: '吸烟频率（每天）？',
            options: [
              {id: '1-1', text: '不吸烟'},
              {id: '1-2', text: '偶尔'},
              {id: '1-3', text: '半包'},
              {id: '1-4', text: '1包'},
              {id: '1-5', text: '1-2包'},
              {id: '1-6', text: '2包以上'},
            ],
            selected: '',
          },
          {
            id: 2,
            question: '饮酒频率？',
            options: [
              {id: '2-1', text: '从不饮酒'},
              {id: '2-2', text: '每月1-2次'},
              {id: '2-3', text: '每周1-2次'},
              {id: '2-4', text: '每周>3次'},
            ],
            selected: '',
          },
          {
            id: 3,
            question: '饮食习惯？',
            options: [
              {id: '3-1', text: '三餐比较规律'},
              {id: '3-2', text: '不吃早餐'},
              {id: '3-3', text: '不吃午餐'},
              {id: '3-4', text: '不吃晚餐'},
              {id: '3-5', text: '少量多餐'},
            ],
            selected: '',
          },
          {
            id: 4,
            question: '饮食情况？',
            options: [
              {id: '4-1', text: '较均衡'},
              {id: '4-2', text: '偏肉型'},
              {id: '4-3', text: '偏素型'},
            ],
            selected: '',
          },
          {
            id: 5,
            question: '持续服用过一段时间的益生菌补充剂？',
            options: [
              {id: '5-1', text: '是'},
              {id: '5-2', text: '否'},
            ],
            selected: '',
          },
          {
            id: 6,
            question: '您平常运动的频率？',
            options: [
              {id: '6-1', text: '定期（3-5次/周）'},
              {id: '6-2', text: '偶尔（1-2次/周）'},
              {id: '6-3', text: '很少（不到1次/周）'},
              {id: '6-4', text: '没有'},
            ],
            selected: '',
          },
          {
            id: 7,
            question: '长期感到精神压抑或有过重大精神创伤（例如：离异，亲人离世等）？',
            options: [
              {id: '7-1', text: '是'},
              {id: '7-2', text: '否'},
            ],
            selected: '',
          },
          {
            id: 8,
            question: '最近5年是否接受过肠镜检查？',
            options: [
              {id: '8-1', text: '是'},
              {id: '8-2', text: '否'},
            ],
            selected: '',
          },
          {
            id: 9,
            question: '本人是否有肠息肉病史？',
            options: [
              {id: '9-1', text: '是'},
              {id: '9-2', text: '否'},
            ],
            selected: '',
          },
          {
            id: 10,
            question: '一级亲属有肠癌史或肠息肉史（一级亲属：父母、同胞兄弟姐妹、子女）？',
            options: [
              {id: '10-1', text: '是'},
              {id: '10-2', text: '否'},
            ],
            selected: '',
          },
          {
            id: 11,
            question: '您是否患阑尾炎或者接受过阑尾切除手术？',
            options: [
              {id: '11-1', text: '是'},
              {id: '11-2', text: '否'},
            ],
            selected: '',
          },
          {
            id: 12,
            question: '您是否患慢性胆囊炎或者接受过胆囊切除手术？',
            options: [
              {id: '12-1', text: '是'},
              {id: '12-2', text: '否'},
            ],
            selected: '',
          },
          {
            id: 13,
            question: '近半年有便血或黏液便？',
            options: [
              {id: '13-1', text: '是'},
              {id: '13-2', text: '否'},
            ],
            selected: '',
          },
          {
            id: 14,
            question: '出现腹泻的情况？',
            options: [
              {id: '14-1', text: '排便比较规律'},
              {id: '14-2', text: '经常每周多次'},
              {id: '14-3', text: '经常每月多次'},
            ],
            selected: '',
          },
          {
            id: 15,
            question: '便秘情况？（正常排便频率：1~2次/(每1~2天)）',
            options: [
              {id: '15-1', text: '排便比较规律'},
              {id: '15-2', text: '偶尔便秘（每月会发生几次）'},
              {id: '15-3', text: '经常性便秘（每周都出现）'},
            ],
            selected: '',
          },
          {
            id: 16,
            question: '存在过敏源？',
            options: [
              {id: '16-1', text: '无'},
              {id: '16-2', text: '食物过敏'},
              {id: '16-3', text: '呼吸道过敏（例如：花粉过敏、过敏性鼻炎、过敏性哮喘）'},
              {id: '16-4', text: '均有（食物+呼吸道过敏）'},
            ],
            selected: '',
          },
          {
            id: 17,
            question: '最近一次使用抗生素是？（药名包含：沙星、头孢、环素、霉素、硝唑、西林（例如：阿莫西林））',
            options: [
              {id: '17-1', text: '近3天'},
              {id: '17-2', text: '本周'},
              {id: '17-3', text: '本月'},
              {id: '17-4', text: '半年内'},
              {id: '17-5', text: '一年内'},
              {id: '17-6', text: '一年以上'},
            ],
            selected: '',
          },
          {
            id: 18,
            question: '有癌症病史？',
            options: [
              {id: '18-1', text: '是'},
              {id: '18-2', text: '否'},
            ],
            selected: '',
          },
          {
            id: 19,
            question: '近一年有住院或手术经历？',
            options: [
              {id: '19-1', text: '是'},
              {id: '19-2', text: '否'},
            ],
            selected: '',
          },
          {
            id: 20,
            question: '在长期服用一些药物？',
            options: [
              {id: '20-1', text: '是'},
              {id: '20-2', text: '否'},
            ],
            selected: '',
          },
        ],
        result: [],
      }
    },
    methods: {
      next() {
        if(this.current.selected === ''){
          return;
        }
        this.result.push({q:this.current.question,a:this.current.selected});
        if (this.current.id === 20) {
          this.finish();
          return;
        }
        this.page++;
        this.current = this.form[this.page];
      },

      finish() {
        ApiPerson.EditQuestionnaire(this.$route.query.kit_code, {
          questionnaire: this.result,
        }).then(res => {
          if(res.data.code === 0){
            this.$router.push({name: 'DealersQuestionnaireFinish'});
          }
        });
      }
    },
  }
</script>

<style lang="scss">
  @import "../styles/variable";

  .itv-questionnaire {
    .skip {
     position: absolute;
      right: 16px;
      top: 16px;
      color: $blue;
      font-size: 28px;
    }
    &-desc {
      padding: 24px;
      font-size: 28px;
      color: $font-sub;
      margin-bottom: 16px;
    }
  }

  .itv-question {
    margin: 10px 0 80px;
    padding: 32px;
    &-hd {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 16px 24px;
      margin-bottom: 20px;
      border-radius: 5px;
      box-shadow: 0 1px 5px 0 rgba(177, 177, 177, 0.50);
      font-size: 28px;
      &_text {
        flex: .8;
      }
      &_progress {
        color: $blue;
      }
    }
    .itv-radio-group {
      font-size: 28px;
      color: $font-sub;
    }
  }
</style>
