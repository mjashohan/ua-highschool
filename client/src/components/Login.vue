<template>
  <div>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <div style="margin-left: 30%;margin-right: 30%">
        <v-app-bar flat dense color="#2196F3" dark>
          <v-toolbar-title>Log In</v-toolbar-title>
        </v-app-bar>
        <br />
        <div>
          <v-text-field
            label="Username"
            type="text"
            v-model="username">
          </v-text-field>
          <br />
          <v-text-field
            label="Password"
            type="password"
            v-model="password">
          </v-text-field>
          <br />
          <div class="error" v-html="error" />
          <br />
          <v-btn color="#2196F3" style="color:white" @click="login">Log In</v-btn>
         <!-- <p v-if="msg">{{ msg }}</p> -->
        </div>
      </div>
    </v-flex>
  </v-layout>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService.js'
export default {
  data () {
    return {
      username: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      let response = await AuthenticationService.login({
          username: this.username,
          password: this.password
        })
      console.log(response.data)
      const user = response.data.user
      const token = response.data.token
      
      this.$store.dispatch('setToken', token)
      this.$store.dispatch('setUser', user)
      this.$router.push('/home')
    }
  }
}
</script>

<style>

</style>