<template>
  <div>
    <h1>Hi {{ username }}</h1>
    <input type="button" value="Logout" @click="logout" />
  </div>
</template>
<script>
export default {
  name: 'Pupil',
  data () {
    return {
      username: this.$store.getters.getUser.username
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