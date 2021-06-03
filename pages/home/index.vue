<template>
  <div class="home-page">

  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">

      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item" v-if="user">
              <nuxt-link 
                  class="nav-link" 
                  :class="{active: tab === 'your_feed'}"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed'
                    }
                  }">
                Your Feed
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link 
                  class="nav-link" 
                  :class="{active: tab === 'global_feed'}"
                  exact
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed'
                    }
                  }">
                Global Feed
              </nuxt-link>
            </li>
            <li class="nav-item" v-if="tag">
              <nuxt-link class="nav-link active" to="">#{{ tag }}</nuxt-link>
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

        <nav>
          <ul class="pagination">
            <li 
                class="page-item ng-scope" 
                :class="{active: pageNumber === current}"
                v-for="pageNumber in pageRange"
                :key="pageNumber">
              <nuxt-link class="page-link ng-binding" :to="{
                name: 'home',
                query: {
                  current: pageNumber,
                  tag: $route.query.tag
                }
              }">{{ pageNumber }}</nuxt-link>
            </li>
          </ul>
        </nav>
      </div>

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>

          <div class="tag-list">
            <nuxt-link 
                v-for="item in tags"
                :key="item"
                :to="{
                  name: 'home',
                  query: {
                    tag: item
                  }
                }" 
                class="tag-pill tag-default">{{ item }}</nuxt-link>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
</template>

<script>
import { mapState } from 'vuex'
import { getArticles, getTags, getFeedArticles, favorite, unfavorite } from '@/api'

export default {
  name: 'HomeIndex',
  computed: {
    ...mapState(['user']),
    pageRange () {
      return Math.ceil(this.articlesCount / this.size)
    }
  },
  watchQuery: ['current', 'tag', 'tab'],
  async asyncData ({ query, store }) {
    try {
      const current = Number(query.current || 1)
      const size = 10
      const { tag, tab } = query
      const loadArticles = store.state.user && tab === 'your_feed' ? getFeedArticles : getArticles
      const [{ data }, {data: tagData}] = await Promise.all([
        loadArticles({ limit: size, offset: (current - 1) * size, tag }),
        getTags()
      ])
      data.articles.forEach(item => item.favoriteDisabled = false)
      return {
        ...data,
        tags: tagData.tags,
        tag,
        tab: tab || tag || 'global_feed',
        current,
        size
      }
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
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