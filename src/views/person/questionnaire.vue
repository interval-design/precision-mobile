<template>
  <div class="itv-questionnaire">
    <div class="itv-services-banner"></div>
    <p class="itv-questionnaire-desc itv-bg-white">普瑞森基因检测前置健康问卷能帮助我们了解您的生活习惯、健康状况和病史，会影响我们对您所出分析报告结果和对您的健康建议，请您如实填写</p>
    <div class="itv-question itv-bg-white">
      <p class="itv-question-hd">
        <icon-svg icon-class="issue"></icon-svg>
        <span class="itv-question-hd_text">{{ current.question }}</span>
        <span class="itv-question-hd_progress">{{ page + 1 }}/13</span>
      </p>
      <div class="it-radio-group" v-if="current.type === 'radio'" v-for="option in current.options">
        <input class="it-radio" type="radio" :id="option.id" :value="option.id" v-model="current.selected">
        <label :for="option.id">{{ option.text }}</label>
      </div>
      <base-button fixed="bottom" width="100%" size="big" @click.native="next" :disabled="isDisabled()">下一题
      </base-button>
    </div>
  </div>
</template>

<script>
  import BaseButton from "../../components/BaseButton";

  export default {
    components: {BaseButton},
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
            type: 'radio',
            question: '您是否吸烟及每天的吸烟量？',
            options: [
              {id: '1', text: '是'},
              {id: '2', text: '否'},
            ],
            selected: '',
          },
        ]
      }
    },
    methods: {
      isDisabled() {
        if (this.current.type === 'radio') {
          return this.current.selected === '';
        }
      },

      next() {
        this.page++;
        this.current = this.form[this.page];
      }
    },
  }
</script>

<style lang="scss">
  @import "../../styles/variable";

  .itv-questionnaire {
    &-desc {
      padding: 24px;
      font-size: 28px;
      color: $font-sub;
      margin-bottom: 16px;
    }
  }
  .itv-question {
    margin: 10px 0;
    padding: 24px;
    &-hd {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 16px 24px;
      margin-bottom: 20px;
      border-radius: 5px;
      box-shadow: 0 1px 5px 0 rgba(177, 177, 177, 0.50);
      font-size: 28px;
      &_text{
        flex: .8;
      }
      &_progress{
        color: $blue;
      }
    }
  }
  .it-radio-group {
    .group_title {
      display: inline-block;
      width: 80px;
    }
    .group_bd {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      .it-radio-group {
        padding: 5px 10px;
      }
    }
  }
</style>
