<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">{{comment.body}}</p>
    </div>
    <div class="card-footer">
      <a href="" class="comment-author">
        <img :src="comment.author.image" class="comment-author-img" />
      </a>
      &nbsp;
      <a href="" class="comment-author">{{comment.author.username}}</a>
      <span class="date-posted">{{comment.createdAt | date('MMM Do')}}</span>
      <span class="mod-options">
        <i class="ion-trash-a" v-if="user && (user.username === comment.author.username || user.username === article.author.username)" @click="removeComment"></i>
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { removeArticleComment } from '@/api'

export default {
  name: 'article-comment',
  props: ['comment', 'article'],
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async removeComment () {
      try {
        await removeArticleComment(this.article.slug, this.comment.id)
        this.$emit('reload-comments')
      } catch (error) {
        
      }
    }
  }
}
</script>

<style>

</style>