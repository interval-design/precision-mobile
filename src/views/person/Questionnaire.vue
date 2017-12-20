<template>
  <div class="itv-questionnaire">
    <router-link class="skip" :to="{name:'QuestionnaireFinish',query:{action:'skip'}}">跳过</router-link>
    <div class="itv-services-banner">
      <img src="../../assets/banner-questionnaire.jpg" alt="banner-questionnaire">
    </div>
    <p class="itv-questionnaire-desc itv-bg-white">普瑞森基因检测前置健康问卷能帮助我们了解您的生活习惯、健康状况和病史，会影响我们对您所出分析报告结果和对您的健康建议，请您如实填写</p>
    <div class="itv-question itv-bg-white">
      <p class="itv-question-hd">
        <icon-svg icon-class="issue"></icon-svg>
        <span class="itv-question-hd_text">{{ current.question }}</span>
        <span class="itv-question-hd_progress">{{ page + 1 }}/15</span>
      </p>
      <div class="itv-radio-group" v-for="option in current.options">
        <input class="itv-radio" type="radio" :id="option.id" :value="option.text" v-model="current.selected">
        <label :for="option.id">{{ option.text }}</label>
      </div>
      <base-button fixed="bottom" width="100%" size="big" @click.native="next" :disabled="current.selected === ''">
        {{ page === 14 ? '完成' :'下一题'  }}
      </base-button>
    </div>
  </div>
</template>

<script>
  import ApiPerson from '../../api/person';

  export default {
    name: "Questionnaire",
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
            question: '您是否吸烟及每天的吸烟量？',
            options: [
              {id: '1-1', text: '不吸烟'},
              {id: '1-2', text: '半包'},
              {id: '1-3', text: '1包'},
              {id: '1-4', text: '1-2包'},
              {id: '1-5', text: '2包以上'},
            ],
            selected: '',
          },
          {
            id: 2,
            question: '三餐饮食的规律性',
            options: [
              {id: '1-1', text: '三餐比较规律'},
              {id: '2-2', text: '不吃早餐'},
              {id: '2-3', text: '不吃午餐'},
              {id: '2-4', text: '不吃晚餐'},
              {id: '2-5', text: '少量多餐'},
            ],
            selected: '',
          },
          {
            id: 3,
            question: '您日常饮食中是否包含全谷类食品？(全谷类包括麦麸、麦片、全麦粉及糙米、燕麦、豆类)',
            options: [
              {id: '3-1', text: '是'},
              {id: '3-2', text: '否'},
            ],
            selected: '',
          },
          {
            id: 4,
            question: '您日常饮食中是否包含益生菌(包括酸奶)或益生元?',
            options: [
              {id: '4-1', text: '是'},
              {id: '4-2', text: '否'},
            ],
            selected: '',
          },
          {
            id: 5,
            question: '您平常运动的频率？',
            options: [
              {id: '5-1', text: '经常'},
              {id: '5-2', text: '偶尔'},
              {id: '5-3', text: '从不'},
            ],
            selected: '',
          },
          {
            id: 6,
            question: '您的排便情况？',
            options: [
              {id: '6-1', text: '经常性腹泻'},
              {id: '6-2', text: '偶尔腹泻'},
              {id: '6-3', text: '经常性便秘'},
              {id: '6-4', text: '偶尔便秘'},
            ],
            selected: '',
          },
          {
            id: 7,
            question: '您近期是否有便血症状？',
            options: [
              {id: '7-1', text: '是'},
              {id: '7-2', text: '否'},
            ],
            selected: '',
          },
          {
            id: 8,
            question: '您是否患过阑尾炎或者接受过阑尾切除手术？',
            options: [
              {id: '8-1', text: '是'},
              {id: '8-2', text: '否'},
            ],
            selected: '',
          },
          {
            id: 9,
            question: '您最近5年是否接受过肠镜检查？',
            options: [
              {id: '9-1', text: '是'},
              {id: '9-2', text: '否'},
            ],
            selected: '',
          },
          {
            id: 10,
            question: '您本人是否有肠息肉病史？',
            options: [
              {id: '10-1', text: '是'},
              {id: '10-2', text: '否'},
            ],
            selected: '',
          },
          {
            id: 11,
            question: '您本人是否有癌症病史(包括任何恶性癌症)？',
            options: [
              {id: '11-1', text: '是'},
              {id: '11-2', text: '否'},
            ],
            selected: '',
          },
          {
            id: 12,
            question: '您的父母，同胞兄弟姐妹，或者子女是否有人患过肠癌？',
            options: [
              {id: '12-1', text: '是'},
              {id: '12-2', text: '否'},
            ],
            selected: '',
          },
          {
            id: 13,
            question: '您是否长期感觉精神压力大？',
            options: [
              {id: '13-1', text: '是'},
              {id: '13-2', text: '否'},
            ],
            selected: '',
          },
          {
            id: 14,
            question: '您在近20年内是否由于某些生活事件(例如离婚，丧偶，近亲死亡等)遭受过重大并且持续的精神创伤？',
            options: [
              {id: '14-1', text: '是'},
              {id: '14-2', text: '否'},
            ],
            selected: '',
          },
          {
            id: 15,
            question: '您再采样前48h是否使用过抗生素？',
            options: [
              {id: '15-1', text: '是'},
              {id: '15-2', text: '否'},
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
        this.result.push(this.current.selected);
        if (this.current.id === 15) {
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
          if(red.data.code === 0){
            this.$router.push({name: 'QuestionnaireFinish'});
          }
        });
      }
    },
  }
</script>

<style lang="scss">
  @import "../../styles/variable";

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
    margin: 10px 0;
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
