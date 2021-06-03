<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <article-meta :article="article" />
      </div>
    </div>
    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
        <ul class="tag-list">
          <li class="tag-default tag-pill tag-outline ng-binding ng-scope" v-for="tag in article.tagList" :key="tag">
            {{tag}}
          </li>
        </ul>
      </div>
      <hr />
      <div class="article-actions">
        <article-meta :article="article" />
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form v-if="user" class="card comment-form">
            <div class="card-block">
              <textarea class="form-control" placeholder="Write a comment..." rows="3" v-model="comment"></textarea>
            </div>
            <div class="card-footer">
              <img :src="user.image" class="comment-author-img" />
              <button class="btn btn-sm btn-primary" :disabled="commentDisabled" @click="addComment">
              Post Comment
              </button>
            </div>
          </form>
          <p v-else style="display: inherit;">
            <nuxt-link to='/login'>Sign in</nuxt-link> or <nuxt-link to="/register">sign up</nuxt-link> to add comments on this article.
          </p>
          <article-comment v-for="item in comments" :key="item.id" :comment="item" :article="article" @reload-comments="getComments"/> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getArticle, getArticleComments, addArticleComment } from '@/api'
import MarkdownIt from 'markdown-it'
import articleMeta from './components/article-meta.vue'
import ArticleComment from './components/article-comment.vue'

export default {
  name: 'ArticleIndex',
  head () {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.description
        }
      ]
    }
  },
  data () {
    return {
      comments: [],
      comment: '',
      commentDisabled: false
    }
  },
  async asyncData ({ params }) {
    try {
      const { data } = await getArticle(params.slug)
      const { article } = data
      const md = new MarkdownIt()
      article.body = md.render(article.body)
      return {
        article
      }
    } catch (error) {
      console.log(error)
    }
  },
  computed: {
    ...mapState(['user'])
  },
  components: { articleMeta, ArticleComment },
  mounted () {
    this.getComments()
  },
  methods: {
    async getComments () {
      try {
        const { data } = await getArticleComments(this.$route.params.slug)
        this.comments = data.comments
      } catch (error) {
        
      }
    },
    async addComment (event) {
      event.preventDefault()
      try {
        const body = {
          "comment": {
            "body": this.comment
          }
        }
        await addArticleComment(this.$route.params.slug, body)
        this.getComments()
      } catch (error) {
        
      }
    }
  }
}
</script>

<style>

</style>