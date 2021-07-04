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
            v-model="text">
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
          <p v-if="msg">{{ msg }}</p>
        </div>
      </div>
    </v-flex>
  </v-layout>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService.js'
export default {
    data() {
        return {
            username: '',
            password: '',
            msg: ''
        }
    },
     methods: {
        async login() {
            try {
                const credentials = {
                username: this.username,
                password: this.password
                };
                const response = await AuthService.login(credentials);
                this.msg = response.msg;
                const token = response.token;
                const user = response.user;
                this.$store.dispatch('login', { token, user });
                this.$router.push('/');
                } catch (error) {
                    this.msg = error.response.data.msg;
            }
        }
    }
}
</script>

<style>

</style>