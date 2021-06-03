<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                  <input type="text" class="form-control form-control-lg" placeholder="Article Title" v-model="article.title">
              </fieldset>
              <fieldset class="form-group">
                  <input type="text" class="form-control" placeholder="What's this article about?" v-model="article.description">
              </fieldset>
              <fieldset class="form-group">
                  <textarea class="form-control" rows="8" placeholder="Write your article (in markdown)" v-model="article.body"></textarea>
              </fieldset>
              <fieldset class="form-group">
                  <input type="text" class="form-control" placeholder="Enter tags" @change="addTag">
                  <div class="tag-list">
                    <span v-for="(tag, index) in article.tagList" :key="tag" class="tag-default tag-pill ng-binding ng-scope">
                      <i class="ion-close-round" @click="removeTag(index)"></i>{{tag}}
                    </span>
                  </div>
              </fieldset>
              <button v-if="slug" class="btn btn-lg pull-xs-right btn-primary" type="button" @click="editArticle">
                  Publish Article
              </button>
              <button v-else class="btn btn-lg pull-xs-right btn-primary" type="button" @click="crearteArticle">
                  Publish Article
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { getArticle, createArticles, editArticles } from '@/api'

export default {
  name: 'editor',
  // 在路由匹配渲染之前会先执行中间件处理， 多个可以放在数组中
  middleware: 'authenticated',
  data () {
    return {
      article: {
        title: "",
        description: "",
        body: "",
        tagList: []
      },
      slug: ''
    }
  },
  mounted () {
    this.slug = this.$route.query.slug
    if (this.slug) {
      this.getArticle()
    }
  },
  methods: {
    async getArticle() {
      try {
        const { data } = await getArticle(this.slug)
        this.article = data.article
      } catch(error) {
        console.log(error)
      }
    },
    addTag (event) {
      this.article.tagList.push(event.target.value)
      event.target.value = ''
    },
    removeTag(index) {
      this.article.tagList.splice(index, 1)
    },
    async crearteArticle() {
      try {
        const { data } = await createArticles({ article: this.article })
        this.$router.push({
          name: 'article',
          params: {
            slug: data.article.slug
          }
        })
      } catch (error) {
        
      }
    },
    async editArticle() {
      try {
        const { data } = await editArticles(this.slug, { article: this.article })
        this.$router.push({
          name: 'article',
          params: {
            slug: data.article.slug
          }
        })
      } catch (error) {
        
      }
    }
  }
}
</script>

<style>

</style>