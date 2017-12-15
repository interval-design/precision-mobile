<template>
  <div class="itv-article">
    <ul class="itv-article-list">
      <li class="itv-article-list-item" v-for="item in articles" :key="item.id"
          @click="$router.push({name: 'ArticleDetail', params: {articleId: item.id}})">
        <div class="itv-article-list-item__img">
          <img :src="item.image" alt="" >
        </div>
        <div class="itv-article-list-item__text">
          <h3 class="itv-article-list-item__title">{{item.title}}</h3>
          <p class="itv-article-list-item__summary">{{item.summary | text}}</p>
          <span style="flex: 1"></span>
          <p class="itv-article-list-item__info">
            <span>{{item.author}}</span>
            <span>{{item.iso_create_time | time}}</span>  
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>


<script>
  import ApiArticle from '../../api/article.js'; 
  export default {
    name: 'Articles',
    created() {
      this.getArticles();
    },
    data() {
      return {
        articles: []
      }
    },
    methods: {
      /**
       * 列出文章
       */
      getArticles() {
        ApiArticle.getArticles({
          params: {
            channel: 1,
            order_by: '-weight',
            page: '',
            per_page: ''
          }
        }).then(
          res => {
            if (res.data.code === 0) {
              this.articles = res.data.data.articles;
            }
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
      },
      
      /**
       * 文本超长缩略
       */
      text(val) {
        if (val.length >= 40) {
          val = val.substr(0,38) + '……'
        }
        return val;
      }
    }
  }
</script>

<style lang="scss">
@import '../../styles/variable.scss';
.itv-article {
  &-list {
    &-item {
      display: flex;
      border-bottom: 1px solid $border;
      background: $white;
      &__img {
        padding: 20px;
        img {
          width: 160px;
          height: 160px;
        }
      }
      &__text {
        flex: 1;
        padding: 20px;
        display: flex;
        flex-direction: column;
      }
      &__title {
        font-size: 28px;
        line-height: 40px;
      }
      &__summary,
      &__info {
        font-size: 24px;
        color: $font-sub;
      }
      &__info {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
