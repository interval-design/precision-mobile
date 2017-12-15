<template>
  <div class="itv-article-detail">
    <header class="itv-article-detail-header">
      <p class="itv-article-detail-title">{{article.title}}</p>
      <p class="itv-article-detail-info">
        <span>{{article.author}}</span>
        <span>{{article.iso_create_time | time}}</span>
      </p>
    </header>
    <div class="itv-article-detail-content" v-html="article.content"></div>
  </div>
</template>

<script>
  import ApiArticle from '../../api/article.js'; 
  export default {
    name: 'ArticleDetail',
    created() {
      this.getArticleDetail(this.$route.params.articleId);
    },
    data() {
      return {
        article: {},
      }
    },
    methods: {
      getArticleDetail(ArticleId) {
        ApiArticle.getArticleDetail(ArticleId).then(
          res => {
            this.article = res.data.data.article;
          }
        )
      }
    },
    filters: {
      /**
       * 日期格式化
       */
      time(val) {
        val = new Date(val);
        let year = val.getFullYear();
        let month = val.getMonth()+1;
        let day = val.getDate();
        return `${year}-${month}-${day}`;
      }
    }
  }
</script>

<style lang="scss">
@import '../../styles/variable.scss';
.itv-article-detail {
  padding: 0 40px 40px;
  &-header {
    padding: 32px 0;
  }
  &-title {
    font-size: 32px;
  }
  &-info {
    margin-top: 24px;
    color: $font-sub;
    span {
      margin-right: 40px;
    }
  }
}
</style>
