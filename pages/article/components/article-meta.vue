<template>
  <div class="article-meta">
    <nuxt-link :to="{
          name: 'profile',
          params: {
            username: article.author.username
          }
        }">
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link class="author" :to="{
          name: 'profile',
          params: {
            username: article.author.username
          }
        }">{{ article.author.username }}</nuxt-link>
      <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
    </div>
    <span v-if="canModify" class="ng-scope">
      <nuxt-link class="btn btn-outline-secondary btn-sm" :to="{
        name: 'editor',
        query: {
          slug: article.slug
        }
      }">
        <i class="ion-edit"></i> Edit Article
      </nuxt-link>

      <button class="btn btn-outline-danger btn-sm" :class="{disabled: this.deleteDisabled}" @click="deleteArticle()">
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </span>
    <span v-else>
      <button class="btn btn-sm btn-outline-secondary" :class="{active: article.author.following}" :disabled="followDisabled" @click="followingAuthor">
        <i class="ion-plus-round"></i>
        &nbsp;
        {{ article.author.following ? "Unfollow" : "Follow" }} {{ article.author.username }} <!-- <span class="counter">(10)</span> -->
      </button>
      &nbsp;&nbsp;
      <button class="btn btn-sm btn-outline-primary" :class="{active: article.favorited}" :disabled="favoriteDisabled" @click="favoritedArticle">
        <i class="ion-heart"></i>
        &nbsp;
        {{ article.favorited ? "Unfavorite" : "Favorite" }} Article <span class="counter">({{ article.favoritesCount }})</span>
      </button>
    </span>
  </div>
</template>

<script>
import { favorite, unfavorite, followUser, unfollowUser, deleteArticle } from '@/api'

export default {
  name: 'article-meta',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    canModify () {
      console.log(this.$store.state.user)
      console.log(this.article.author)
      return this.article.author.username === this.$store.state.user.username
    }
  },
  data () {
    return {
      favoriteDisabled: false,
      followDisabled: false,
      deleteDisabled: false
    }
  },
  methods: {
    async followingAuthor () {
     this.followDisabled = true
      if (this.article.author.following) {
        await unfollowUser(this.article.author.username)
        this.article.author.following = false
      } else {
        await followUser(this.article.author.username)
        this.article.author.following= true
      }
      this.followDisabled = false
    },
    async favoritedArticle () {
      this.favoriteDisabled = true
      if (this.article.favorited) {
        await unfavorite(this.article.slug)
        this.article.favorited = false
        this.article.favoritesCount -= 1
      } else {
        await favorite(this.article.slug)
        this.article.favorited = true
        this.article.favoritesCount += 1
      }
      this.favoriteDisabled = false
    },
    async deleteArticle() {
      this.deleteDisabled = true
      try {
        await deleteArticle(this.article.slug)
        this.$router.push('/')
        this.deleteDisabled = false
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>