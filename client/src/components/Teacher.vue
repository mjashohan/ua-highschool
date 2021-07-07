<template>
  <div>
    <h2>Hi {{ fname }}, welcome to your dashboard</h2>
    <input type="button" value="Logout" @click="logout" />
  </div>
</template>
<script>
export default {
  name: 'Admin',
  data () {
    return {
      username: this.$store.getters.getUser.username,
      fname: this.$store.getters.getUser.fname
    }
  },
  // async created() {
  //   if (!this.$store.getters.isLoggedIn) {
  //     this.$router.push('/login');
  //   }
   //   else {
      
    // }
  
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'Login'
      })
    }
  }
}
</script>