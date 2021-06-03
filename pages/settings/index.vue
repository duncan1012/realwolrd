<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <form>
            <fieldset>
                <fieldset class="form-group">
                  <input class="form-control" type="text" v-model="currentUser.image"  placeholder="URL of profile picture">
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" v-model="currentUser.username" type="text" placeholder="Your Name">
                </fieldset>
                <fieldset class="form-group">
                  <textarea class="form-control form-control-lg" v-model="currentUser.bio" rows="8" placeholder="Short bio about you"></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" v-model="currentUser.email" type="text" placeholder="Email">
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="password" v-model="currentUser.password" placeholder="Password">
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right" @click="updateSettings">
                  Update Settings
                </button>
            </fieldset>
          </form>
          <hr>
          <button class="btn btn-outline-danger" @click="logout">
            Or click here to logout.
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { updateUser } from '@/api'

// 仅在客户端加载 js-cookie
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  name: 'SettingsIndex',
  middleware: 'authenticated',
  data() {
    return {
      currentUser: { ...this.$store.state.user }
    }
  },
  methods: {
    async updateSettings(event) {
      event.preventDefault()
      try {
        const { data } = await updateUser(this.currentUser)
        console.log(data)
        this.$router.push({
          name: 'profile',
          params: {
            username: this.currentUser.username
          }
        })
      } catch (error) {
        console.log(err)
      }
    },
    logout() {
      this.$store.commit('setUser', null)
      Cookie.remove('user')
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>