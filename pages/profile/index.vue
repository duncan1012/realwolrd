<template>
  <div class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <button v-if="!canModify" class="btn btn-sm btn-outline-secondary action-btn" :class="{active: profile.following}" @click="followingAuthor">
              <i class="ion-plus-round"></i>
              &nbsp;
              {{ profile.following ? 'Unfollow' : 'Follow' }} {{ profile.username }} 
            </button>
            <nuxt-link v-else class="btn btn-sm btn-outline-secondary action-btn" to="/settings">
              <i class="ion-gear-a"></i> Edit Profile Settings
            </nuxt-link>
          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link 
                    class="nav-link" 
                    :class="{active: pageType === 'author'}"
                    exact 
                    :to="{
                      name: 'profile', 
                      params: {
                        username: $route.params.username
                      }, 
                      query: {
                        pageType: 'author'
                      }
                    }">My Articles</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link 
                    class="nav-link" 
                    :class="{active: pageType === 'favorited'}"
                    exact 
                    :to="{
                      name: 'profile', 
                      params: {
                        username: $route.params.username
                      }, 
                      query: {
                        pageType: 'favorited'
                      }
                    }">Favorited Articles</nuxt-link>
              </li>
            </ul>
          </div>

          <div 
            class="article-preview"
            v-for="article in articles"
            :key="article.slug">
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
                <nuxt-link 
                      class="author" 
                      :to="{
                        name: 'profile',
                        params: {
                          username: article.author.username
                        }
                      }">{{ article.author.username }}</nuxt-link>
                <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
              </div>
              <button 
                  class="btn btn-outline-primary btn-sm pull-xs-right" 
                  :class="{active: article.favorited}" 
                  @click="onFavorite(article)"
                  :disabled="article.favoriteDisabled">
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link 
                class="preview-link"
                :to="{
                  name: 'article',
                  params: {
                    slug: article.slug
                  }
                }">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { getProfile, getArticles, followUser, unfollowUser, } from '@/api'

export default {
  name: 'UserProfile',
  watchQuery: ['pageType'],
  async asyncData({ params, query }) {
    const pageType = query.pageType || 'author'
    const { username } = params
    const options = {}
    options[pageType] = username
    try {
      const { data } = await getProfile(username)
      const { data: articleData } = await getArticles(options)
      console.log(articleData)
      articleData.articles.forEach(item => item.favoriteDisabled = false)
      return {
        ...data,
        ...articleData,
        pageType
      }
    } catch (error) {
      console.log(error)
    }
  },
  computed: {
    canModify () {
      return this.profile.username === this.$store.state.user.username
    }
  },
  methods: {
    async followingAuthor () {
      if (this.profile.following) {
        await unfollowUser(this.profile.username)
        this.profile.following = false
      } else {
        await followUser(this.profile.username)
        this.profile.following= true
      }
    },
    async onFavorite(row) {
      row.favoriteDisabled = true
      if (row.favorited) {
        // 取消点赞
        await unfavorite(row.slug)
        row.favorited = false
        row.favoritesCount -= 1
      } else {
        // 点赞
        await favorite(row.slug)
        row.favorited = true
        row.favoritesCount += 1
      }
      row.favoriteDisabled = false
    }
  }
}
</script>

<style>

</style>